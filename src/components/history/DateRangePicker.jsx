import { useState } from 'react'

export default function DateRangePicker({ onRangeChange }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleApply = () => {
    if (startDate && endDate) {
      onRangeChange({ startDate, endDate })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-end gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เริ่มต้น</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">วันที่สิ้นสุด</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        onClick={handleApply}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        ค้นหา
      </button>
    </div>
  )
}
