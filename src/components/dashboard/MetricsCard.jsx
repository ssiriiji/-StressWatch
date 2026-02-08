import { thresholds } from '../../data/mockStressData'

export default function MetricsCard({ type, value, status }) {
  const threshold = thresholds[type]
  const isExceeded = threshold.inverse 
    ? value < threshold.normal.min 
    : value > threshold.normal.max

  return (
    <div className={`p-5 rounded-xl border-2 transition-all duration-300 ${
      isExceeded 
        ? 'bg-red-50 border-red-300' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">{threshold.label}</h3>
        {isExceeded && (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
            เกินเกณฑ์
          </span>
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-3xl font-bold ${isExceeded ? 'text-red-600' : 'text-gray-900'}`}>
          {Math.round(value)}
        </span>
        <span className="text-sm text-gray-500">{threshold.unit}</span>
      </div>
      
      <div className="text-xs text-gray-500">
        ปกติ: {threshold.normal.min}-{threshold.normal.max} {threshold.unit}
      </div>
    </div>
  )
}
