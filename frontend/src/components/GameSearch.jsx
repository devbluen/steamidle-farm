import { useEffect } from "react"

function GameSearch({ searchTerms, setSearchTerms, sendMessage, searchResults, addGame, setSearchResults }) {

    useEffect(() => {
        if (searchTerms.length >= 3) {
            sendMessage('gameSearch', { term: searchTerms })
        } else {
            setSearchResults([])
        }
    }, [searchTerms, sendMessage, setSearchResults])

    return (
    <div className="flex flex-col items-center px-6 mt-8">
        <div className="flex gap-2 w-full max-w-lg">
            <input 
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
                placeholder="Search for a game..."
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none border border-gray-700 focus:border-blue-500"
            />
        </div>

        <div className="w-full max-w-lg mt-1 bg-gray-900/95 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
            {searchResults.map((game) => (
                <div key={game.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 border-b border-gray-800">
                    <span className="text-sm">{game.name}</span>
                    <button onClick={() => addGame(game)} className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs ml-2">+</button>
                </div>
            ))}
        </div>
    </div>
)
}

export default GameSearch