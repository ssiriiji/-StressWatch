import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, hasCompletedOnboarding } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.name && formData.age) {
      login({
        name: formData.name,
        age: parseInt(formData.age),
      })
      
      if (hasCompletedOnboarding) {
        navigate('/dashboard')
      } else {
        navigate('/onboarding')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce-slow">
            <span className="text-5xl">💙</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            StressWatch
          </h1>
          <p className="text-gray-600">ระบบติดตามและจัดการความเครียด</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">เข้าสู่ระบบ</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="กรอกชื่อของคุณ"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อายุ
              </label>
              <input
                type="number"
                min="16"
                max="19"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="16-19 ปี"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              เข้าสู่ระบบ
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-800 text-center">
              💡 ระบบนี้ออกแบบสำหรับวัยรุ่น 16-19 ปี
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          ระบบติดตามความเครียดแบบไม่รู้ตัว<br />
          เพื่อสุขภาพจิตที่ดีของคุณ
        </p>
      </div>
    </div>
  )
}
