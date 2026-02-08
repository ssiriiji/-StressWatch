export default function ActivityDetail({ activity }) {
  if (!activity) return null

  return (
    <div className="space-y-6">
      <div className={`h-40 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center`}>
        <span className="text-8xl">{activity.icon}</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {activity.title}
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {activity.category}
          </span>
          <span className="text-gray-600">⏱️ {activity.duration}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-2">💡 ช่วยอย่างไร</h3>
        <p className="text-gray-700 leading-relaxed">
          {activity.description}
        </p>
      </div>

      {activity.steps && (
        <div className="bg-green-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">📋 ขั้นตอน</h3>
          <ol className="space-y-2">
            {activity.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">ประสิทธิภาพ</span>
          <span className="text-2xl font-bold text-blue-600">{activity.effectiveness}%</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            style={{ width: `${activity.effectiveness}%` }}
          />
        </div>
      </div>
    </div>
  )
}
