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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
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
