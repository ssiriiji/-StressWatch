import Card from '../common/Card'

export default function ConsultantList({ consultants }) {
  return (
    <div className="space-y-4">
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
    </div>
  )
}
