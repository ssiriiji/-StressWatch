import { useEffect, useState } from 'react'

export default function StressGauge({ value }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [rotation, setRotation] = useState(-90)

  useEffect(() => {
    // Animate the number counting up
    const duration = 1500 // 1.5 seconds
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setDisplayValue(Math.round(increment * currentStep))
      } else {
        clearInterval(timer)
      }
    }, stepDuration)

    // Animate the needle rotation
    const targetRotation = (value / 100) * 180 - 90
    setTimeout(() => {
      setRotation(targetRotation)
    }, 100)

    return () => clearInterval(timer)
  }, [value])

  const getColor = () => {
    if (value < 30) return '#10b981'
    if (value < 60) return '#fbbf24'
    if (value < 80) return '#f97316'
    return '#ef4444'
  }

  const getLabel = () => {
    if (value < 30) return 'ปกติ'
    if (value < 60) return 'เครียดเล็กน้อย'
    if (value < 80) return 'เครียดปานกลาง'
    return 'เครียดสูง'
  }

  const getGradient = () => {
    if (value < 30) return 'from-green-400 to-emerald-500'
    if (value < 60) return 'from-yellow-400 to-amber-500'
    if (value < 80) return 'from-orange-400 to-orange-600'
    return 'from-red-400 to-red-600'
  }

  return (
    <div className="relative w-full max-w-sm mx-auto pb-12">
      {/* SVG Gauge */}
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Background Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="20"
          strokeLinecap="round"
        />
        
        {/* Colored Arc with Animation */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={getColor()}
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * 251.2} 251.2`}
          style={{
            transition: 'stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 1s ease'
          }}
        />
        
        {/* Needle with Smooth Animation */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="35"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            transformOrigin: '100px 100px',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {/* Center Circle */}
        <circle cx="100" cy="100" r="8" fill="#374151" />
        
        {/* Small Shadow for Depth */}
        <circle cx="100" cy="100" r="6" fill="#1f2937" />
      </svg>
      
      {/* Value Display - ปรับตำแหน่งให้ไม่ซ้อน */}
      <div className="absolute left-0 right-0 bottom-0 text-center space-y-1">
        <div 
          className={`text-5xl font-bold bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent transition-all duration-500`}
        >
          {displayValue}
        </div>
        <div className="text-sm text-gray-500 font-medium">
          {getLabel()}
        </div>
      </div>

      {/* Pulsing Ring Effect when Stressed */}
      {value >= 70 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-48 h-48 rounded-full border-4 border-red-400 animate-ping opacity-20"
            style={{ animationDuration: '2s' }}
          />
        </div>
      )}
    </div>
  )
}
