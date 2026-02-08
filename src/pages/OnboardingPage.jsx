import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { completeOnboarding } = useAuth()
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const [formData, setFormData] = useState({
    exerciseFrequency: '',
    coffeeIntake: '',
    coffeeTime: [],
    sleepHours: '',
  })

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      completeOnboarding(formData)
      navigate('/dashboard')
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const toggleCoffeeTime = (time) => {
    if (formData.coffeeTime.includes(time)) {
      setFormData({
        ...formData,
        coffeeTime: formData.coffeeTime.filter(t => t !== time)
      })
    } else {
      setFormData({
        ...formData,
        coffeeTime: [...formData.coffeeTime, time]
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <span className="text-4xl">💙</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">เริ่มต้นใช้งาน</h1>
          <p className="text-gray-600">ช่วยเราทำความรู้จักคุณมากขึ้น</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">ขั้นตอน {step} จาก {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-scale-in">
          {/* Step 1: Exercise */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💪</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">การออกกำลังกาย</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  คุณออกกำลังกายบ่อยแค่ไหน?
                </label>
                <div className="space-y-3">
                  {['ไม่เคยเลย', '1-2 ครั้ง/สัปดาห์', '3-4 ครั้ง/สัปดาห์', '5+ ครั้ง/สัปดาห์', 'ทุกวัน'].map((option) => (
                    <label 
                      key={option} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.exerciseFrequency === option 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="exerciseFrequency"
                        value={option}
                        checked={formData.exerciseFrequency === option}
                        onChange={(e) => setFormData({ ...formData, exerciseFrequency: e.target.value })}
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Coffee */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">☕</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">การดื่มกาแฟ</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  คุณดื่มกาแฟหรือคาเฟอีนบ่อยแค่ไหน?
                </label>
                <div className="space-y-3">
                  {['ไม่ดื่มเลย', '1 แก้ว/วัน', '2-3 แก้ว/วัน', '4+ แก้ว/วัน'].map((option) => (
                    <label 
                      key={option} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.coffeeIntake === option 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="coffeeIntake"
                        value={option}
                        checked={formData.coffeeIntake === option}
                        onChange={(e) => setFormData({ ...formData, coffeeIntake: e.target.value })}
                        className="w-5 h-5 text-amber-600"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.coffeeIntake !== 'ไม่ดื่มเลย' && formData.coffeeIntake && (
                <div className="animate-slide-up">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ช่วงเวลาที่ดื่มกาแฟ (เลือกได้หลายตัวเลือก)
                  </label>
                  <div className="space-y-3">
                    {['ตอนเช้า (6-9 น.)', 'สาย (9-12 น.)', 'บ่าย (12-15 น.)', 'เย็น (15-18 น.)', 'ค่ำ (18 น. เป็นต้นไป)'].map((option) => (
                      <label 
                        key={option} 
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.coffeeTime.includes(option)
                            ? 'border-amber-500 bg-amber-50' 
                            : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.coffeeTime.includes(option)}
                          onChange={() => toggleCoffeeTime(option)}
                          className="w-5 h-5 text-amber-600 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Sleep */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">😴</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">การนอนหลับ</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  คุณนอนหลับเฉลี่ยวันละกี่ชั่วโมง?
                </label>
                <div className="space-y-3">
                  {['น้อยกว่า 5 ชม.', '5-6 ชม.', '7-8 ชม.', '9+ ชม.'].map((option) => (
                    <label 
                      key={option} 
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.sleepHours === option 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sleepHours"
                        value={option}
                        checked={formData.sleepHours === option}
                        onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                        className="w-5 h-5 text-indigo-600"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>🔒 ความเป็นส่วนตัว:</strong> ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อปรับปรุงความแม่นยำในการวัดความเครียดเท่านั้น
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleBack}
              disabled={step === 1}
              variant="outline"
            >
              ← ย้อนกลับ
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.exerciseFrequency) ||
                (step === 2 && !formData.coffeeIntake) ||
                (step === 3 && !formData.sleepHours)
              }
            >
              {step === totalSteps ? '✓ เริ่มใช้งาน' : 'ถัดไป →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
