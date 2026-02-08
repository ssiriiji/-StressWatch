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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-soft-lg animate-bounce-slow">
            <span className="text-5xl">💙</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
            StressWatch
          </h1>
          <p className="text-gray-600">ระบบติดตามและจัดการความเครียด</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-soft-lg p-8 animate-slide-up border border-blue-50">
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
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
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
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                placeholder="16-19 ปี"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              เข้าสู่ระบบ
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50/70 rounded-xl border border-blue-100">
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