import { useStressData } from '../hooks/useStressData'
import AppLayout from '../components/layout/AppLayout'
import StressGauge from '../components/dashboard/StressGauge'
import StatusToggle from '../components/dashboard/StatusToggle'
import MetricsCard from '../components/dashboard/MetricsCard'
import QuickActions from '../components/dashboard/QuickActions'
import HistoryChart from '../components/history/HistoryChart'

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
        <div className="bg-amber-50/80 backdrop-blur-sm border-2 border-amber-300 rounded-2xl p-4 shadow-soft">
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
          <div className="bg-red-50/90 backdrop-blur-sm border-l-4 border-red-500 rounded-xl p-4 animate-slide-up shadow-soft">
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
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-200 shadow-soft">
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
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft-lg p-6 lg:col-span-1 border border-blue-50">
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

        {/* Weekly Trend Chart - Recharts */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft-lg p-6 border border-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-xl">📈</span>
              กราฟแนวโน้ม 7 วัน
            </h3>
            <a 
              href="/history" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              ดูทั้งหมด 
              <span>→</span>
            </a>
          </div>
          
          <HistoryChart data={history} type="area" />
          
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded"></div>
              <span className="text-xs text-gray-600">ระดับเครียด</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            เมนูด่วน
          </h2>
          <QuickActions />
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Best Time */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">ช่วงเวลาที่ดีที่สุด</h3>
                <p className="text-sm text-gray-600">ความเครียดต่ำสุด</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">09:00 - 12:00</div>
            <p className="text-sm text-gray-600 mt-2">
              คุณมักมีระดับความเครียดต่ำในช่วงเช้า
            </p>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">คำแนะนำ</h3>
                <p className="text-sm text-gray-600">สำหรับคุณ</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>ออกกำลังกายอย่างน้อย 30 นาที/วัน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>ฝึกการหายใจเมื่อรู้สึกเครียด</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>นอนหลับให้เพียงพอ 7-8 ชั่วโมง</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
