import { useState } from 'react'
import { useStressData } from '../hooks/useStressData'
import AppLayout from '../components/layout/AppLayout'
import Badge from '../components/common/Badge'
import HistoryChart from '../components/history/HistoryChart'

export default function HistoryPage() {
  const { history } = useStressData()
  const [filter, setFilter] = useState('all')
  const [chartType, setChartType] = useState('line')

  // ✅ กรองเฉพาะข้อมูลวันนี้
  const today = new Date()
  const todayHistory = history.filter(item => {
    const itemDate = new Date(item.timestamp)
    return (
      itemDate.getFullYear() === today.getFullYear() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getDate() === today.getDate()
    )
  })

  const filteredHistory = filter === 'all'
    ? todayHistory
    : todayHistory.filter(item => item.status === filter)

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

  // ✅ stats คำนวณจาก todayHistory
  const stats = {
    total: todayHistory.length,
    normal: todayHistory.filter(h => h.status === 'normal').length,
    stressed: todayHistory.filter(h => h.status === 'stressed').length,
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ประวัติความเครียด</h1>
          {/* ✅ เปลี่ยน subtitle */}
          <p className="text-gray-600">ข้อมูลการวัดความเครียดวันนี้ (24 ชั่วโมง)</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl p-6 text-white shadow-soft">
            <div className="text-sm opacity-90 mb-1">ทั้งหมด</div>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">ครั้ง</div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl p-6 text-white shadow-soft">
            <div className="text-sm opacity-90 mb-1">ปกติ</div>
            <div className="text-3xl font-bold">{stats.normal}</div>
            <div className="text-sm opacity-90">
              {stats.total > 0 ? Math.round((stats.normal / stats.total) * 100) : 0}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-orange-400 rounded-2xl p-6 text-white shadow-soft">
            <div className="text-sm opacity-90 mb-1">เครียด</div>
            <div className="text-3xl font-bold">{stats.stressed}</div>
            <div className="text-sm opacity-90">
              {stats.total > 0 ? Math.round((stats.stressed / stats.total) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-blue-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">กราฟแสดงแนวโน้ม</h2>
              {/* ✅ แสดงวันที่ของวันนี้ใต้หัวข้อกราฟ */}
              <p className="text-sm text-gray-500 mt-0.5">
                {today.toLocaleDateString('th-TH', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType('line')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chartType === 'line'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                เส้น
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chartType === 'area'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                พื้นที่
              </button>
            </div>
          </div>
          {/* ✅ ส่ง todayHistory แทน history */}
          <HistoryChart data={todayHistory} type={chartType} timeRange="day" />
        </div>

        {/* Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-soft p-4 border border-blue-50">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-soft'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setFilter('normal')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'normal'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-green-50'
              }`}
            >
              ปกติ
            </button>
            <button
              onClick={() => setFilter('stressed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'stressed'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50'
              }`}
            >
              เครียด
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-12 text-center border border-blue-50">
              <span className="text-6xl mb-4 block">📊</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่มีข้อมูล</h3>
              <p className="text-gray-600">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</p>
            </div>
          ) : (
            filteredHistory.map((item, index) => (
              <div
                key={index}
                className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-soft p-5 transition-all hover:shadow-soft-lg border-l-4 ${
                  item.status === 'stressed' ? 'border-red-400' : 'border-green-400'
                } border-t border-r border-b border-blue-50`}
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
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">ระดับเครียด</div>
                    <div className="text-lg font-bold text-gray-900">{Math.round(item.stressLevel)}%</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">HR</div>
                    <div className="text-lg font-bold text-gray-900">{Math.round(item.hr)}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">HRV</div>
                    <div className="text-lg font-bold text-gray-900">{Math.round(item.hrv)}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
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
