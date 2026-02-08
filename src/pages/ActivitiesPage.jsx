import { useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { activities } from '../data/activitiesData'
import Modal from '../components/common/Modal'

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [filter, setFilter] = useState('all')

  const categories = ['all', 'การเคลื่อนไหว', 'การหายใจ', 'การผ่อนคลาย', 'จิตใจ', 'สังคม', 'สุขภาพกาย']

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.category === filter)

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">กิจกรรมคลายเครียด</h1>
          <p className="text-gray-600">เลือกกิจกรรมที่เหมาะกับคุณเพื่อลดความเครียด</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filter === cat 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'ทั้งหมด' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedActivity(activity)}
            >
              {/* Card Header */}
              <div className={`h-32 bg-gradient-to-br ${activity.color} flex items-center justify-center`}>
                <span className="text-6xl">{activity.icon}</span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">
                    {activity.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {activity.category}
                  </span>
                  <span className="text-sm text-gray-600">⏱️ {activity.duration}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {activity.description}
                </p>

                {/* Effectiveness Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>ประสิทธิภาพ</span>
                    <span className="font-semibold">{activity.effectiveness}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                      style={{ width: `${activity.effectiveness}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Detail Modal */}
        <Modal
          isOpen={selectedActivity !== null}
          onClose={() => setSelectedActivity(null)}
          title="รายละเอียดกิจกรรม"
        >
          {selectedActivity && (
            <div className="space-y-6">
              <div className={`h-40 bg-gradient-to-br ${selectedActivity.color} rounded-2xl flex items-center justify-center`}>
                <span className="text-8xl">{selectedActivity.icon}</span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedActivity.title}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {selectedActivity.category}
                  </span>
                  <span className="text-gray-600">⏱️ {selectedActivity.duration}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">💡 ช่วยอย่างไร</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedActivity.description}
                </p>
              </div>

              {selectedActivity.steps && (
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">📋 ขั้นตอน</h3>
                  <ol className="space-y-2">
                    {selectedActivity.steps.map((step, index) => (
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
                  <span className="text-2xl font-bold text-blue-600">{selectedActivity.effectiveness}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: `${selectedActivity.effectiveness}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppLayout>
  )
}
