import GameItem from './GameItem'

function GameList({ activeGames, removeGames }) {
    return (
        <div className="flex flex-col">
            {activeGames.map((game) => (
                <GameItem key={game.id} game={game} removeGames={removeGames} />
            ))}
            {activeGames.length === 0 && (
                <p className="text-gray-400 text-sm text-center">No active games</p>
            )}
        </div>
    )
}

export default GameList