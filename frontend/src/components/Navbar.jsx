import logo from '../assets/logo.png'

function Navbar({ connected }) {
    return (
        <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-3">
                <img src={logo} className="w-8 h-8 hover:opacity-80 transition-opacity cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${connected ? 'bg-green-400' : 'bg-red-500'}`}></div>
                <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
            </div>
        </nav>
    )
}

export default Navbar