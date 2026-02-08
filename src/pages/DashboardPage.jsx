import { useStressData } from '../hooks/useStressData'
import AppLayout from '../components/layout/AppLayout'
import StressGauge from '../components/dashboard/StressGauge'
import StatusToggle from '../components/dashboard/StatusToggle'
import MetricsCard from '../components/dashboard/MetricsCard'
import QuickActions from '../components/dashboard/QuickActions'

export default function DashboardPage() {
  const { currentData, currentMode, history } = useStressData()

  // คำนวณสถิติจากประวัติ
  const stats = {
    totalRecords: history.length,
    normalCount: history.filter(h => h.status === 'normal').length,
    stressedCount: history.filter(h => h.status === 'stressed').length,
    avgStressLevel: Math.round(
      history.reduce((sum, h) => sum + h.stressLevel, 0) / history.length
    ),
    highestStress: Math.round(
      Math.max(...history.map(h => h.stressLevel))
    ),
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ภาพรวมความเครียด</h1>
          <p className="text-gray-600">ติดตามและจัดการความเครียดของคุณ</p>
        </div>

        {/* Demo Toggle with Stats */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-sm text-amber-800 font-medium mb-1">
                🎯 โหมดสาธิต: สลับสถานะเพื่อดูความแตกต่าง
              </p>
              <p className="text-xs text-amber-700">
                มีสถิติประวัติ 7 วันย้อนหลัง: {stats.normalCount} ครั้งปกติ, {stats.stressedCount} ครั้งเครียด
              </p>
            </div>
            <StatusToggle />
          </div>

          {/* Mini Statistics */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-200">
            <div className="bg-white/70 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 mb-1">ทั้งหมด</div>
              <div className="text-lg font-bold text-gray-900">{stats.totalRecords}</div>
            </div>
            <div className="bg-white/70 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 mb-1">เฉลี่ย</div>
              <div className="text-lg font-bold text-blue-600">{stats.avgStressLevel}%</div>
            </div>
            <div className="bg-white/70 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 mb-1">สูงสุด</div>
              <div className="text-lg font-bold text-red-600">{stats.highestStress}%</div>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        {currentMode === 'stressed' && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 animate-slide-up">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-red-900">ระดับความเครียดสูง!</p>
                <p className="text-sm text-red-700">แนะนำให้พักผ่อนหรือทำกิจกรรมคลายเครียด</p>
              </div>
            </div>
          </div>
        )}

        {/* Today's Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-xl">📊</span>
            สรุปวันนี้
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <div className="text-gray-600">บันทึกทั้งหมด</div>
              <div className="text-xl font-bold text-blue-600">
                {history.filter(h => {
                  const today = new Date().toDateString()
                  return new Date(h.timestamp).toDateString() === today
                }).length}
              </div>
            </div>
            <div>
              <div className="text-gray-600">ปกติ</div>
              <div className="text-xl font-bold text-green-600">
                {history.filter(h => {
                  const today = new Date().toDateString()
                  return new Date(h.timestamp).toDateString() === today && h.status === 'normal'
                }).length}
              </div>
            </div>
            <div>
              <div className="text-gray-600">เครียด</div>
              <div className="text-xl font-bold text-red-600">
                {history.filter(h => {
                  const today = new Date().toDateString()
                  return new Date(h.timestamp).toDateString() === today && h.status === 'stressed'
                }).length}
              </div>
            </div>
            <div>
              <div className="text-gray-600">อัตราความเครียด</div>
              <div className="text-xl font-bold text-amber-600">
                {stats.totalRecords > 0 
                  ? Math.round((stats.stressedCount / stats.totalRecords) * 100)
                  : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stress Gauge */}
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ระดับความเครียดปัจจุบัน</h2>
            <StressGauge value={currentData.stressLevel} />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <MetricsCard type="hr" value={currentData.hr} status={currentMode} />
            <MetricsCard type="hrv" value={currentData.hrv} status={currentMode} />
            <MetricsCard type="rhr" value={currentData.rhr} status={currentMode} />
            <MetricsCard type="scl" value={currentData.scl} status={currentMode} />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">เมนูด่วน</h2>
          <QuickActions />
        </div>

        {/* Weekly Trend Preview */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">แนวโน้ม 7 วันล่าสุด</h3>
            <a href="/history" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              ดูทั้งหมด →
            </a>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-32 gap-2">
            {Array.from({ length: 7 }).map((_, index) => {
              const dayData = history.filter(h => {
                const date = new Date()
                date.setDate(date.getDate() - (6 - index))
                const targetDate = date.toDateString()
                return new Date(h.timestamp).toDateString() === targetDate
              })
              
              const avgStress = dayData.length > 0
                ? dayData.reduce((sum, h) => sum + h.stressLevel, 0) / dayData.length
                : 0
              
              const height = `${avgStress}%`
              const color = avgStress < 30 ? 'bg-green-500' : avgStress < 60 ? 'bg-yellow-500' : avgStress < 80 ? 'bg-orange-500' : 'bg-red-500'
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-24">
                    <div 
                      className={`w-full ${color} rounded-t transition-all duration-500 hover:opacity-80`}
                      style={{ height: avgStress > 0 ? height : '4%', minHeight: '4px' }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'][new Date(new Date().setDate(new Date().getDate() - (6 - index))).getDay()]}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">ปกติ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-600">เล็กน้อย</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-xs text-gray-600">ปานกลาง</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">สูง</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
