import { NavLink } from 'react-router-dom'

export default function Navigation() {
  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'หน้าหลัก' },
    { path: '/analysis', icon: '📊', label: 'วิเคราะห์' },
    { path: '/history', icon: '📅', label: 'ประวัติ' },
    { path: '/activities', icon: '🎯', label: 'กิจกรรม' },
    { path: '/consultation', icon: '💬', label: 'ปรึกษา' },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-soft'
                    : 'text-gray-600 hover:bg-blue-50'
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
