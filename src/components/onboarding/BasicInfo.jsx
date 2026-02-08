export default function BasicInfo({ data, onChange }) {
  return (
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
                data.exerciseFrequency === option 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <input
                type="radio"
                name="exerciseFrequency"
                value={option}
                checked={data.exerciseFrequency === option}
                onChange={(e) => onChange({ exerciseFrequency: e.target.value })}
                className="w-5 h-5 text-blue-600"
              />
              <span className="ml-3 text-gray-700 font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
