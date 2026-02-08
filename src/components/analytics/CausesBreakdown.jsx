import { useStressData } from '../../hooks/useStressData'
import { thresholds } from '../../data/mockStressData'

export default function CausesBreakdown() {
  const { currentData, currentMode } = useStressData()

  if (currentMode !== 'stressed') return null

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">สาเหตุของความเครียด</h2>
      <div className="space-y-4">
        {currentData.hr > thresholds.hr.normal.max && (
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
            <span className="text-2xl">❤️</span>
            <div>
              <h4 className="font-semibold text-red-900">อัตราการเต้นของหัวใจสูง</h4>
              <p className="text-sm text-red-700">
                ค่า HR อยู่ที่ {Math.round(currentData.hr)} bpm สูงกว่าเกณฑ์ปกติ
              </p>
            </div>
          </div>
        )}

        {currentData.hrv < thresholds.hrv.normal.min && (
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="font-semibold text-orange-900">ค่า HRV ต่ำ</h4>
              <p className="text-sm text-orange-700">
                ค่า HRV อยู่ที่ {Math.round(currentData.hrv)} ms ต่ำกว่าเกณฑ์ปกติ
              </p>
            </div>
          </div>
        )}

        {currentData.scl > thresholds.scl.normal.max && (
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
            <span className="text-2xl">💧</span>
            <div>
              <h4 className="font-semibold text-yellow-900">การนำไฟฟ้าของผิวหนังสูง</h4>
              <p className="text-sm text-yellow-700">
                ค่า SCL อยู่ที่ {currentData.scl.toFixed(1)} µS สูงกว่าเกณฑ์ปกติ
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
