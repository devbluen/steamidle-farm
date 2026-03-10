import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import GameSearch from './components/GameSearch'
import GameList from './components/GameList'
import logo from './assets/logo.png'
import background from './assets/background.jpg'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [connected, setConnected] = useState(false)
  const [activeGames, setActiveGames] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchTerms, setSearchTerms] = useState('')
  const [showSteamGuard, setShowSteamGuard]  = useState(false)
  const [steamGuardCode, setSteamGuardCode] = useState('')

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080')
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'loggedOn') {
        setConnected(true)
        setShowSteamGuard(false)
        toast.success('Connected to Steam!')
      } else if (data.type === 'error') {
        toast.error(data.data)
      } else if (data.type === 'steamGuard') {
        setShowSteamGuard(true)
      } else if (data.type === 'searchResults') {
        setSearchResults(data.data)
      } else if (data.type === 'disconnected') {
        setConnected(false)
        toast('Disconnected from Steam', { icon: '👋' })
      }
    }
  }, [])

  const sendMessage = useCallback((type, data) => {
    socketRef.current.send(JSON.stringify({ type, data }))
}, [])

  const addGame = (game) => {
    if (activeGames.length >= 32) return
    setActiveGames([...activeGames, { ...game, startTime: Date.now() }])
    sendMessage('addGame', game)
  }

  const removeGame = (game) => {
    setActiveGames(activeGames.filter((g) => g.id !== game.id))
    sendMessage('removeGame', game)
  }

    return (
        <div 
            className="min-h-screen text-white relative"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Toaster position="bottom-right" />
            <div className="min-h-screen bg-black/60 flex flex-col">
                <Navbar connected={connected}/>
                
                <div className="flex flex-1">
                    {/* Left panel */}
                    {connected && (
                        <div className="w-96 bg-black/40 p-4 flex flex-col gap-3 animate-slide-in">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">
                                Active Games ({activeGames.length}/32)
                            </h2>
                            <GameList activeGames={activeGames} removeGames={removeGame} />
                            <button 
                                onClick={() => sendMessage('disconnect', {})}
                                className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full"
                            >
                                Disconnect
                            </button>
                        </div>
                    )}

                    {/* Center panel */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-6">
                        <img src={logo} className="w-32 h-32" />
                        <h1 className="text-6xl font-bold">SteamIdle Farm</h1>
                        <p className="text-xl text-gray-300">Farm your Steam hours effortlessly</p>

                        {!connected && (
                            <button 
                                onClick={() => sendMessage('login', {})}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
                            >
                                Connect
                            </button>
                        )}

                        {showSteamGuard && (
                            <div className="flex gap-2 w-full max-w-lg">
                                <input 
                                    value={steamGuardCode}
                                    onChange={(e) => setSteamGuardCode(e.target.value)}
                                    placeholder="Enter Steam Guard code..."
                                    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-blue-500"
                                />
                                <button 
                                    onClick={() => sendMessage('steamGuard', { code: steamGuardCode })}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        )}

                        {connected && (
                            <GameSearch 
                                searchTerms={searchTerms}
                                setSearchTerms={setSearchTerms}
                                setSearchResults={setSearchResults}
                                sendMessage={sendMessage}
                                searchResults={searchResults}
                                addGame={addGame}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App