export default function EmergencyContact() {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-3xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">🚨</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-red-900 mb-2">สายด่วนฉุกเฉิน</h2>
          <p className="text-red-700 mb-4">หากคุณรู้สึกว่าอยู่ในภาวะวิกฤติหรือต้องการความช่วยเหลือด่วน</p>
          <div className="space-y-2">
            <a 
              href="tel:1323" 
              className="flex items-center gap-3 text-red-900 font-semibold hover:underline"
            >
              <span className="text-xl">📞</span>
              <span>สายด่วนสุขภาพจิต: 1323</span>
            </a>
            <a 
              href="tel:1669" 
              className="flex items-center gap-3 text-red-900 font-semibold hover:underline"
            >
              <span className="text-xl">🚑</span>
              <span>ฉุกเฉินการแพทย์: 1669</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
