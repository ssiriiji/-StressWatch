import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/logo.png'

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
          {/* โลโก้เต็มๆ + ชื่อแอป */}
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg p-1 hover:shadow-soft-lg transition-all"
          >
            {/* โลโก้เต็มๆ ไม่มี bg สี */}
            <img 
              src={logo} 
              alt="PulseOne Logo"
              className="w-11 h-11 rounded-xl object-contain shadow-soft-lg hover:shadow-soft-lg transition-all"
            />
            
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              PulseOne
            </span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              สวัสดี, {user?.name || 'ผู้ใช้งาน'}
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
