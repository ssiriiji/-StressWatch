import { useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    urgency: 'normal',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const consultants = [
    {
      name: 'ดร. สมหญิง ใจดี',
      title: 'นักจิตวิทยาคลินิก',
      expertise: 'ความเครียด, ความวิตกกังวล',
      image: '👩‍⚕️',
      available: true,
    },
    {
      name: 'ดร. สมชาย รักษาใจ',
      title: 'จิตแพทย์',
      expertise: 'ปัญหาสุขภาพจิต, การนอนหลับ',
      image: '👨‍⚕️',
      available: true,
    },
    {
      name: 'คุณสมศรี ช่วยเหลือ',
      title: 'นักปรึกษา',
      expertise: 'ปัญหาวัยรุ่น, ครอบครัว',
      image: '👩‍💼',
      available: false,
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ติดต่อผู้เชี่ยวชาญ</h1>
          <p className="text-gray-600">พูดคุยกับนักจิตวิทยาและผู้เชี่ยวชาญด้านความเครียด</p>
        </div>

        {/* Emergency Contact */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <Card className="h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">ส่งคำขอปรึกษา</h2>
            
            {submitted ? (
              <div className="py-12 text-center animate-scale-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">ส่งคำขอสำเร็จ!</h3>
                <p className="text-gray-600">
                  เราจะติดต่อกลับภายใน 24 ชั่วโมง
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ระดับความเร่งด่วน *
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  >
                    <option value="low">ไม่เร่งด่วน</option>
                    <option value="normal">ปานกลาง</option>
                    <option value="high">เร่งด่วน</option>
                    <option value="urgent">เร่งด่วนมาก</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รายละเอียด
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    placeholder="บอกเราเพิ่มเติมเกี่ยวกับสิ่งที่คุณต้องการปรึกษา..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  ส่งคำขอ
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  ข้อมูลของคุณจะถูกเก็บเป็นความลับตามกฎหมาย
                </p>
              </form>
            )}
          </Card>

          {/* Consultants List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">ทีมผู้เชี่ยวชาญ</h2>
            
            {consultants.map((consultant, index) => (
              <Card key={index} className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                  {consultant.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{consultant.name}</h3>
                      <p className="text-sm text-gray-600">{consultant.title}</p>
                    </div>
                    {consultant.available ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ว่าง
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        ไม่ว่าง
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>ความเชี่ยวชาญ:</strong> {consultant.expertise}
                  </p>
                </div>
              </Card>
            ))}

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">💡 ข้อมูลเพิ่มเติม</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• การปรึกษาครั้งแรกฟรี 30 นาที</li>
                <li>• เวลาทำการ: จันทร์-ศุกร์ 9:00-18:00 น.</li>
                <li>• สามารถนัดหมายล่วงหน้าได้</li>
                <li>• รองรับการปรึกษาออนไลน์</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
