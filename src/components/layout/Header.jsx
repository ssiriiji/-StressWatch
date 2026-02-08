import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-blue-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-2xl">💙</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              StressWatch
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              สวัสดี, {user?.name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
