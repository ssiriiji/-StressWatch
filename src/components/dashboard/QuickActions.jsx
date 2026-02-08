import { Link } from 'react-router-dom'

export default function QuickActions() {
  const actions = [
    {
      title: 'วิเคราะห์',
      icon: '📊',
      path: '/analysis',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'ประวัติ',
      icon: '📅',
      path: '/history',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'กิจกรรม',
      icon: '🎯',
      path: '/activities',
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'ปรึกษา',
      icon: '💬',
      path: '/consultation',
      color: 'from-pink-400 to-pink-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.path}
          to={action.path}
          className={`p-6 bg-gradient-to-br ${action.color} rounded-2xl text-white text-center hover:scale-105 hover:shadow-xl transition-all duration-300`}
        >
          <div className="text-4xl mb-2">{action.icon}</div>
          <div className="font-semibold">{action.title}</div>
        </Link>
      ))}
    </div>
  )
}
