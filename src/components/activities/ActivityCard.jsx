export default function ActivityCard({ activity, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-32 bg-gradient-to-br ${activity.color} flex items-center justify-center`}>
        <span className="text-6xl">{activity.icon}</span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {activity.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {activity.category}
          </span>
          <span className="text-sm text-gray-600">⏱️ {activity.duration}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {activity.description}
        </p>

        <div>
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>ประสิทธิภาพ</span>
            <span className="font-semibold">{activity.effectiveness}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${activity.effectiveness}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
