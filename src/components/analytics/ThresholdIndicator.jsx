import { thresholds } from '../../data/mockStressData'

export default function ThresholdIndicator({ type, value }) {
  const threshold = thresholds[type]
  const isExceeded = threshold.inverse 
    ? value < threshold.normal.min 
    : value > threshold.normal.max

  return (
    <div className={`p-4 rounded-xl border-2 ${
      isExceeded ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{threshold.label}</span>
        {isExceeded && (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
            เกินเกณฑ์
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {Math.round(value)} {threshold.unit}
      </div>
      <div className="text-xs text-gray-600 mt-1">
        ปกติ: {threshold.normal.min}-{threshold.normal.max} {threshold.unit}
      </div>
    </div>
  )
}
