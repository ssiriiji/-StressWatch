export const generateHistoryData = () => {
  const history = []
  const now = new Date()
  
  for (let day = 6; day >= 0; day--) {
    const date = new Date(now)
    date.setDate(date.getDate() - day)
    
    const timeSlots = [
      { hour: 9, isStressed: false },
      { hour: 12, isStressed: day % 3 === 0 },
      { hour: 15, isStressed: day === 1 || day === 4 },
      { hour: 20, isStressed: false },
    ]
    
    timeSlots.forEach(({ hour, isStressed }) => {
      const timestamp = new Date(date)
      timestamp.setHours(hour, 0, 0, 0)
      
      if (isStressed) {
        history.push({
          timestamp: timestamp.toISOString(),
          stressLevel: 70 + Math.random() * 20,
          hr: 90 + Math.random() * 15,
          hrv: 20 + Math.random() * 10,
          scl: 6 + Math.random() * 2,
          status: 'stressed',
        })
      } else {
        history.push({
          timestamp: timestamp.toISOString(),
          stressLevel: 15 + Math.random() * 20,
          hr: 68 + Math.random() * 12,
          hrv: 45 + Math.random() * 15,
          scl: 3 + Math.random() * 1.5,
          status: 'normal',
        })
      }
    })
  }
  
  return history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
}

export const historyData = generateHistoryData()
