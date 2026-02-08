export const calculateStressLevel = (hr, hrv, rhr, scl) => {
  // คำนวณคะแนนความเครียดจากค่าต่างๆ (0-100)
  
  // HR Score (ค่าสูง = เครียด)
  const hrScore = Math.min(100, Math.max(0, ((hr - 60) / 50) * 100))
  
  // HRV Score (ค่าต่ำ = เครียด) - inverse
  const hrvScore = Math.min(100, Math.max(0, ((65 - hrv) / 50) * 100))
  
  // RHR Score (ค่าสูง = เครียด)
  const rhrScore = Math.min(100, Math.max(0, ((rhr - 60) / 30) * 100))
  
  // SCL Score (ค่าสูง = เครียด)
  const sclScore = Math.min(100, Math.max(0, ((scl - 2) / 8) * 100))
  
  // รวมคะแนนถ่วงน้ำหนัก
  const totalScore = (hrScore * 0.3) + (hrvScore * 0.3) + (rhrScore * 0.2) + (sclScore * 0.2)
  
  return Math.round(totalScore)
}

export const getStressStatus = (stressLevel) => {
  if (stressLevel < 30) return 'normal'
  if (stressLevel < 60) return 'mild'
  if (stressLevel < 80) return 'moderate'
  return 'high'
}

export const getStressLabel = (stressLevel) => {
  if (stressLevel < 30) return 'ปกติ'
  if (stressLevel < 60) return 'เครียดเล็กน้อย'
  if (stressLevel < 80) return 'เครียดปานกลาง'
  return 'เครียดสูง'
}

export const getStressColor = (stressLevel) => {
  if (stressLevel < 30) return '#10b981' // green
  if (stressLevel < 60) return '#fbbf24' // yellow
  if (stressLevel < 80) return '#f97316' // orange
  return '#ef4444' // red
}
