import { useState, useEffect } from 'react'

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

function GameItem({ game, removeGames }) {
    const [elapsed, setElapsed] = useState(() => Date.now() - game.startTime)

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Date.now() - game.startTime)
        }, 1000)
        return () => clearInterval(interval)
    }, [game.startTime])

    return (
        <div className="flex flex-col bg-black/20 hover:bg-black/40">
            <div className="flex items-center gap-3 px-3 py-2">
                <img src={game.tiny_image} className="w-16 h-10 rounded object-cover" />
                <span className="flex-1 text-sm truncate">{game.name}</span>
                <span className="text-xs text-blue-400">{formatTime(elapsed)}</span>
                <button onClick={() => removeGames(game)} className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs">X</button>
            </div>
            <div className="h-0.5 bg-gray-700 mx-3 mb-2">
                <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${(elapsed % 3600000) / 3600000 * 100}%` }}
                />
            </div>
        </div>
    )
}

export default GameItem