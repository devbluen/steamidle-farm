const SteamUser = require('steam-user');
const dotenv = require('dotenv');
const ws = require('ws')
const fs = require('fs')

dotenv.config({ quiet: true });

const wss = new ws.WebSocketServer({ port: 8080 });
const client = new SteamUser();

let activeSocket = null;
let steamGuardCallback = null;
let activeGames = []

wss.on('connection', (socket) => {
    console.log('🚀 | Client connected');
    activeSocket = socket;
    socket.on('message', async (message) => {
        const data = JSON.parse(message.toString())
        if (data.type === 'login') {
            if(client.steamID) {
                activeSocket.send(JSON.stringify({ type: 'loggedOn', data: '✅ | Already logged in!' }))
            } else if (fs.existsSync('token.txt')) {
                const token = fs.readFileSync('token.txt', 'utf8')
                client.logOn({ refreshToken: token })
            } else {
                client.logOn({
                    accountName: process.env.STEAM_USERNAME,
                    password: process.env.STEAM_PASSWORD
                })
            }
        } else if (data.type === 'steamGuard') {
            console.log('🔑 | Steam Guard code received:', data.data.code)
            steamGuardCallback(data.data.code)
        } else if (data.type === 'gameSearch') {
            try {
                const response = await fetch(`https://store.steampowered.com/api/storesearch/?term=${data.data.term}&l=english&cc=US`)
                const json = await response.json()
                activeSocket.send(JSON.stringify({ type: 'searchResults', data: json.items.slice(0, 20) }))
            } catch (error) {
                activeSocket.send(JSON.stringify({ type: 'error', data: error.message }))
            }
        } else if (data.type === 'searchResults') {
            setSearchResults(data.data)
        } else if (data.type === 'addGame') {
            activeGames.push(data.data)
            client.gamesPlayed(activeGames.map((game) => game.id))
        } else if (data.type === 'removeGame') {
            activeGames = activeGames.filter((g) => g.id !== data.data.id)
            client.gamesPlayed(activeGames.map((game) => game.id))
        } else if (data.type === 'disconnect') {
            client.logOff()
            activeGames = []
        }
    })

    socket.on('close', (close) => {
        activeSocket = null;
        console.log('💤 | Client disconnected!')
    })
})

client.on('loggedOn', () => {
    console.log('🚀 | User connected')
    client.setPersona(SteamUser.EPersonaState.Online)
    activeSocket.send(JSON.stringify({ type: 'loggedOn', data: '✅ | Login successfully!' }))

    if (activeGames.length > 0) {
        client.gamesPlayed(activeGames.map((game) => game.id))
    }
})

client.on('error', (err) => {
    console.log('⚠️ | Founded an error:', err.message)
    activeSocket.send(JSON.stringify({ type: 'error', data: err.message }))
})

client.on('steamGuard', (domain, callback) => {
    steamGuardCallback = callback
    activeSocket.send(JSON.stringify({ type: 'steamGuard', data: '⌛ | Waiting code'}))
})

client.on('disconnected', () => {
    console.log('💤 | Disconnected from Steam')
    if (activeSocket) {
        activeSocket.send(JSON.stringify({ type: 'disconnected' }))
    }
})

client.on('refreshToken', (token) => {
    fs.writeFileSync('token.txt', token)
    console.log('🔑 | Token saved!')
})