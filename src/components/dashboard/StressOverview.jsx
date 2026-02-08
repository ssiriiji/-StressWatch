import { useStressData } from '../../hooks/useStressData'
import StressGauge from './StressGauge'
import MetricsCard from './MetricsCard'

export default function StressOverview() {
  const { currentData, currentMode } = useStressData()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stress Gauge */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
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
  )
}
