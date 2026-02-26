import {
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
  ReferenceLine,
} from 'recharts'

// ✅ สร้าง ticks ทุก 2 ชั่วโมงของวันนี้
function getTodayTicks() {
  const now = new Date()
  const ticks = []
  for (let h = 0; h < 24; h += 2) {
    ticks.push(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, 0, 0).getTime()
    )
  }
  return ticks
}

// ✅ domain 00:00 – 23:59 ของวันนี้
function getTodayDomain() {
  const now = new Date()
  return [
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,  0,  0).getTime(),
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime(),
  ]
}

export default function HistoryChart({ data, type = 'line' }) {
  const todayTicks  = getTodayTicks()
  const todayDomain = getTodayDomain()
  const nowTime     = new Date().getTime()

  // ✅ แปลง timestamp → milliseconds (ใช้กับ type="number" scale="time")
  const chartData = [...data]
    .map(item => ({
      time:        new Date(item.timestamp).getTime(),
      ระดับเครียด: Math.round(item.stressLevel),
      HR:          Math.round(item.hr),
      HRV:         Math.round(item.hrv),
      timestamp:   item.timestamp,
    }))
    .sort((a, b) => a.time - b.time)

  // ✅ Custom Tooltip (เหมือนเดิม)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-soft-lg border border-blue-100">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            {new Date(payload[0].payload.timestamp).toLocaleString('th-TH')}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> {entry.value}
              {entry.name === 'ระดับเครียด' ? '%' : entry.name === 'HR' ? ' bpm' : ' ms'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // ✅ XAxis props รวมศูนย์ — ใช้ type="number" + scale="time" เพื่อล็อก 24 ชม.
  const xAxisProps = {
    dataKey:       'time',
    type:          'number',
    scale:         'time',
    domain:        todayDomain,
    ticks:         todayTicks,
    tickFormatter: (v) =>
      new Date(v).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    tick:   { fill: '#6b7280', fontSize: 12 },
    stroke: '#cbd5e1',
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis {...xAxisProps} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} stroke="#cbd5e1" />
          <Tooltip content={<CustomTooltip />} />
          {/* ✅ เส้นแดงแสดงเวลาปัจจุบัน */}
          <ReferenceLine
            x={nowTime}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{ value: 'ตอนนี้', position: 'top', fontSize: 11, fill: '#ef4444' }}
          />
          <Area
            type="monotone"
            dataKey="ระดับเครียด"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorStress)"
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
        <XAxis {...xAxisProps} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} stroke="#cbd5e1" />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
          iconType="line"
        />
        {/* ✅ เส้นแดงแสดงเวลาปัจจุบัน */}
        <ReferenceLine
          x={nowTime}
          stroke="#ef4444"
          strokeDasharray="4 4"
          label={{ value: 'ตอนนี้', position: 'top', fontSize: 11, fill: '#ef4444' }}
        />
        <Line
          type="monotone"
          dataKey="ระดับเครียด"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: '#3b82f6', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="HR"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: '#10b981', r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="HRV"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ fill: '#f59e0b', r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
