export default function StressTimeline({ history }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
      <div className="space-y-3">
        {history.slice(0, 5).map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              item.status === 'stressed' ? 'bg-red-500' : 'bg-green-500'
            }`} />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {new Date(item.timestamp).toLocaleString('th-TH')}
              </div>
              <div className="text-xs text-gray-600">
                ระดับ: {Math.round(item.stressLevel)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
