import { useState } from 'react'
import { useStressData } from '../hooks/useStressData'
import AppLayout from '../components/layout/AppLayout'
import Badge from '../components/common/Badge'

export default function HistoryPage() {
  const { history } = useStressData()
  const [filter, setFilter] = useState('all') // 'all', 'normal', 'stressed'

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.status === filter)

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const stats = {
    total: history.length,
    normal: history.filter(h => h.status === 'normal').length,
    stressed: history.filter(h => h.status === 'stressed').length,
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ประวัติความเครียด</h1>
          <p className="text-gray-600">ข้อมูลการวัดความเครียดย้อนหลัง 7 วัน</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">ทั้งหมด</div>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">ครั้ง</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">ปกติ</div>
            <div className="text-3xl font-bold">{stats.normal}</div>
            <div className="text-sm opacity-90">{Math.round((stats.normal / stats.total) * 100)}%</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-1">เครียด</div>
            <div className="text-3xl font-bold">{stats.stressed}</div>
            <div className="text-sm opacity-90">{Math.round((stats.stressed / stats.total) * 100)}%</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setFilter('normal')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'normal' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ปกติ
            </button>
            <button
              onClick={() => setFilter('stressed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'stressed' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              เครียด
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <span className="text-6xl mb-4 block">📊</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่มีข้อมูล</h3>
              <p className="text-gray-600">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</p>
            </div>
          ) : (
            filteredHistory.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md p-5 transition-all hover:shadow-lg ${
                  item.status === 'stressed' ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {item.status === 'stressed' ? '😰' : '😊'}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {formatDate(item.timestamp)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(item.timestamp)}
                      </div>
                    </div>
                  </div>
                  <Badge variant={item.status === 'stressed' ? 'red' : 'green'}>
                    {item.status === 'stressed' ? 'เครียด' : 'ปกติ'}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">ระดับเครียด</div>
                    <div className="text-lg font-bold text-gray-900">{Math.round(item.stressLevel)}%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">HR</div>
                    <div className="text-lg font-bold text-gray-900">{Math.round(item.hr)}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">HRV</div>
                    <div className="text-lg font-bold text-gray-900">{Math.round(item.hrv)}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">SCL</div>
                    <div className="text-lg font-bold text-gray-900">{item.scl.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  )
}
