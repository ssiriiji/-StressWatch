import { useState } from 'react'
import Button from '../common/Button'

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.name && formData.age) {
      onSubmit({
        name: formData.name,
        age: parseInt(formData.age),
      })
    }
  }

  return (
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
  )
}
