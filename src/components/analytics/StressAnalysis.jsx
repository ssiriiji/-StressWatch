import { useStressData } from '../../hooks/useStressData'
import { thresholds } from '../../data/mockStressData'

export default function StressAnalysis() {
  const { currentData, currentMode } = useStressData()

  return (
    <div className={`p-6 rounded-3xl ${
      currentMode === 'stressed' 
        ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200' 
        : 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
          currentMode === 'stressed' ? 'bg-red-100' : 'bg-green-100'
        }`}>
          {currentMode === 'stressed' ? '😰' : '😊'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {currentMode === 'stressed' ? 'กำลังเครียด' : 'สถานะปกติ'}
          </h2>
          <p className="text-gray-600">ระดับความเครียด: {Math.round(currentData.stressLevel)}%</p>
        </div>
      </div>
    </div>
  )
}
