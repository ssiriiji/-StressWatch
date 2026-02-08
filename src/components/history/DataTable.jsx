export default function DataTable({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เวลา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ระดับ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">HR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">HRV</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(item.timestamp).toLocaleString('th-TH')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    item.status === 'stressed' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {item.status === 'stressed' ? 'เครียด' : 'ปกติ'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{Math.round(item.stressLevel)}%</td>
                <td className="px-6 py-4 text-sm text-gray-900">{Math.round(item.hr)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{Math.round(item.hrv)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
