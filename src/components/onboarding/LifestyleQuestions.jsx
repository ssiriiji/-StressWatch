export default function LifestyleQuestions({ data, onChange }) {
  const toggleCoffeeTime = (time) => {
    const currentTimes = data.coffeeTime || []
    if (currentTimes.includes(time)) {
      onChange({ coffeeTime: currentTimes.filter(t => t !== time) })
    } else {
      onChange({ coffeeTime: [...currentTimes, time] })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
          <span className="text-2xl">☕</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">พฤติกรรมการดื่มกาแฟและการนอน</h2>
      </div>

      {/* Coffee Intake */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          คุณดื่มกาแฟหรือคาเฟอีนบ่อยแค่ไหน?
        </label>
        <div className="space-y-3">
          {['ไม่ดื่มเลย', '1 แก้ว/วัน', '2-3 แก้ว/วัน', '4+ แก้ว/วัน'].map((option) => (
            <label 
              key={option} 
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                data.coffeeIntake === option 
                  ? 'border-amber-500 bg-amber-50' 
                  : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
              }`}
            >
              <input
                type="radio"
                name="coffeeIntake"
                value={option}
                checked={data.coffeeIntake === option}
                onChange={(e) => onChange({ coffeeIntake: e.target.value })}
                className="w-5 h-5 text-amber-600"
              />
              <span className="ml-3 text-gray-700 font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Coffee Time (conditional) */}
      {data.coffeeIntake && data.coffeeIntake !== 'ไม่ดื่มเลย' && (
        <div className="animate-slide-up">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ช่วงเวลาที่ดื่มกาแฟ (เลือกได้หลายตัวเลือก)
          </label>
          <div className="space-y-3">
            {['ตอนเช้า (6-9 น.)', 'สาย (9-12 น.)', 'บ่าย (12-15 น.)', 'เย็น (15-18 น.)', 'ค่ำ (18 น. เป็นต้นไป)'].map((option) => (
              <label 
                key={option} 
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  data.coffeeTime && data.coffeeTime.includes(option)
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.coffeeTime && data.coffeeTime.includes(option)}
                  onChange={() => toggleCoffeeTime(option)}
                  className="w-5 h-5 text-amber-600 rounded"
                />
                <span className="ml-3 text-gray-700 font-medium">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Sleep Hours */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">😴</span>
          <label className="text-sm font-medium text-gray-700">
            คุณนอนหลับเฉลี่ยวันละกี่ชั่วโมง?
          </label>
        </div>
        <div className="space-y-3">
          {['น้อยกว่า 5 ชม.', '5-6 ชม.', '7-8 ชม.', '9+ ชม.'].map((option) => (
            <label 
              key={option} 
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                data.sleepHours === option 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
            >
              <input
                type="radio"
                name="sleepHours"
                value={option}
                checked={data.sleepHours === option}
                onChange={(e) => onChange({ sleepHours: e.target.value })}
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
  )
}
