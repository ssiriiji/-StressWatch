import { useStressData } from '../hooks/useStressData'
import AppLayout from '../components/layout/AppLayout'
import { thresholds } from '../data/mockStressData'
import Badge from '../components/common/Badge'

export default function AnalysisPage() {
  const { currentData, currentMode } = useStressData()

  const analyzeMetric = (type, value) => {
    const threshold = thresholds[type]
    
    if (threshold.inverse) {
      // สำหรับ HRV (ค่าต่ำ = เครียด)
      if (value < threshold.stressed.max) {
        return {
          status: 'stressed',
          message: 'ต่ำกว่าเกณฑ์ปกติ - บ่งชี้ความเครียด',
          color: 'red'
        }
      } else if (value >= threshold.normal.min) {
        return {
          status: 'normal',
          message: 'อยู่ในเกณฑ์ปกติ',
          color: 'green'
        }
      } else {
        return {
          status: 'warning',
          message: 'ต่ำกว่าปกติเล็กน้อย',
          color: 'yellow'
        }
      }
    } else {
      // สำหรับ HR, RHR, SCL (ค่าสูง = เครียด)
      if (value > threshold.stressed.min) {
        return {
          status: 'stressed',
          message: 'สูงกว่าเกณฑ์ปกติ - บ่งชี้ความเครียด',
          color: 'red'
        }
      } else if (value <= threshold.normal.max) {
        return {
          status: 'normal',
          message: 'อยู่ในเกณฑ์ปกติ',
          color: 'green'
        }
      } else {
        return {
          status: 'warning',
          message: 'สูงกว่าปกติเล็กน้อย',
          color: 'yellow'
        }
      }
    }
  }

  const metrics = [
    { type: 'hr', value: currentData.hr, icon: '❤️' },
    { type: 'hrv', value: currentData.hrv, icon: '📊' },
    { type: 'rhr', value: currentData.rhr, icon: '💓' },
    { type: 'scl', value: currentData.scl, icon: '💧' },
  ]

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">วิเคราะห์ความเครียด</h1>
          <p className="text-gray-600">ข้อมูลเชิงลึกและสาเหตุของความเครียด</p>
        </div>

        {/* Overall Status */}
        <div className={`p-6 rounded-3xl ${
          currentMode === 'stressed' 
            ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200' 
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
        }`}>
          <div className="flex items-center gap-4 mb-4">
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
          
          {currentMode === 'stressed' && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-gray-700">
                💡 <strong>คำแนะนำ:</strong> ควรหยุดพักและทำกิจกรรมคลายเครียด เช่น ฝึกหายใจลึก หรือเดินเล่น
              </p>
            </div>
          )}
        </div>

        {/* Metrics Analysis */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">การวิเคราะห์ค่าต่างๆ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map(({ type, value, icon }) => {
              const threshold = thresholds[type]
              const analysis = analyzeMetric(type, value)
              
              return (
                <div 
                  key={type}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    analysis.status === 'stressed' 
                      ? 'bg-red-50 border-red-300' 
                      : analysis.status === 'warning'
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-green-50 border-green-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{threshold.label}</h3>
                        <p className="text-xs text-gray-600">({type.toUpperCase()})</p>
                      </div>
                    </div>
                    <Badge variant={analysis.color}>
                      {analysis.status === 'stressed' ? 'เกินเกณฑ์' : analysis.status === 'warning' ? 'เฝ้าระวัง' : 'ปกติ'}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold ${
                        analysis.status === 'stressed' ? 'text-red-600' : 
                        analysis.status === 'warning' ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {Math.round(value * 10) / 10}
                      </span>
                      <span className="text-gray-500">{threshold.unit}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">เกณฑ์ปกติ:</span>
                      <span className="font-medium text-gray-900">
                        {threshold.normal.min}-{threshold.normal.max} {threshold.unit}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-300">
                      <p className={`font-medium ${
                        analysis.status === 'stressed' ? 'text-red-700' : 
                        analysis.status === 'warning' ? 'text-yellow-700' : 
                        'text-green-700'
                      }`}>
                        {analysis.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Causes Breakdown */}
        {currentMode === 'stressed' && (
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">สาเหตุของความเครียด</h2>
            <div className="space-y-4">
              {currentData.hr > thresholds.hr.normal.max && (
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                  <span className="text-2xl">❤️</span>
                  <div>
                    <h4 className="font-semibold text-red-900">อัตราการเต้นของหัวใจสูง</h4>
                    <p className="text-sm text-red-700">
                      ค่า HR อยู่ที่ {Math.round(currentData.hr)} bpm ซึ่งสูงกว่าเกณฑ์ปกติ ({thresholds.hr.normal.max} bpm) 
                      บ่งชี้ว่าร่างกายอยู่ในภาวะตื่นตัวหรือเครียด
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
                      ค่า HRV อยู่ที่ {Math.round(currentData.hrv)} ms ซึ่งต่ำกว่าเกณฑ์ปกติ ({thresholds.hrv.normal.min} ms)
                      แสดงว่าระบบประสาทอยู่ในภาวะเครียดและการฟื้นตัวลดลง
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
                      ค่า SCL อยู่ที่ {currentData.scl.toFixed(1)} µS ซึ่งสูงกว่าเกณฑ์ปกติ ({thresholds.scl.normal.max} µS)
                      บ่งบอกถึงความตึงเครียดทางอารมณ์
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border-2 border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💡 คำแนะนำ</h2>
          {currentMode === 'stressed' ? (
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <p className="text-gray-700">ฝึกหายใจลึก 4-7-8 เพื่อลด HR และเพิ่ม HRV</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <p className="text-gray-700">เดินเล่นหรือออกกำลังกายเบา ๆ 10-15 นาที</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <p className="text-gray-700">หลีกเลี่ยงคาเฟอีนและงดหน้าจอ 20-30 นาที</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <p className="text-gray-700">หากอาการยังคงอยู่ ควรปรึกษาผู้เชี่ยวชาญ</p>
              </li>
            </ul>
          ) : (
            <p className="text-gray-700">
              ✨ สถานะของคุณดีมาก! รักษาสุขภาพจิตและร่างกายให้แข็งแรงต่อไปด้วยการนอนหลับพอเพียง ออกกำลังกายสม่ำเสมอ และจัดการความเครียดอย่างเหมาะสม
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
