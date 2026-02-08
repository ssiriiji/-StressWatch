export const generateStressData = (status = 'normal') => {
  if (status === 'stressed') {
    return {
      status: 'stressed',
      stressLevel: 70 + Math.random() * 25,
      hr: 90 + Math.random() * 20,
      hrv: 20 + Math.random() * 10,
      rhr: 75 + Math.random() * 15,
      scl: 6 + Math.random() * 3,
      timestamp: new Date().toISOString(),
    }
  }
  
  return {
    status: 'normal',
    stressLevel: 15 + Math.random() * 20,
    hr: 65 + Math.random() * 15,
    hrv: 45 + Math.random() * 20,
    rhr: 62 + Math.random() * 10,
    scl: 2.5 + Math.random() * 2,
    timestamp: new Date().toISOString(),
  }
}

export const generateHistoryData = (days = 7) => {
  const history = []
  const now = new Date()
  
  for (let day = days - 1; day >= 0; day--) {
    const date = new Date(now)
    date.setDate(date.getDate() - day)
    
    // สุ่มข้อมูล 4 ช่วงเวลาต่อวัน
    const timeSlots = [
      { hour: 9, isStressed: false },
      { hour: 12, isStressed: day % 3 === 0 },
      { hour: 15, isStressed: day === 1 || day === 4 },
      { hour: 20, isStressed: false },
    ]
    
    timeSlots.forEach(({ hour, isStressed }) => {
      const timestamp = new Date(date)
      timestamp.setHours(hour, 0, 0, 0)
      
      history.push(generateStressData(isStressed ? 'stressed' : 'normal'))
      history[history.length - 1].timestamp = timestamp.toISOString()
    })
  }
  
  return history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
}
