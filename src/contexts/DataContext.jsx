import { createContext, useContext, useState, useEffect } from 'react'

function generateTodayHistory() {
  const now = new Date()
  const history = []
  const currentHour = now.getHours()

  for (let h = 0; h <= currentHour; h++) {
    const timestamp = new Date(
      now.getFullYear(), now.getMonth(), now.getDate(), h, 0, 0
    )
    const stressLevel = Math.random() * 60 + 10
    const hr          = Math.random() * 40 + 60
    const hrv         = Math.random() * 50 + 30
    const scl         = Math.random() * 3  + 1
    const rhr         = Math.random() * 20 + 55

    history.push({
      timestamp: timestamp.toISOString(),
      stressLevel,
      hr, hrv, scl, rhr,
      status: stressLevel > 50 ? 'stressed' : 'normal',
    })
  }
  return history
}

const DataContext = createContext(null)

// ✅ Provider ครอบทั้งแอป — state อยู่ที่นี่ที่เดียว
export function DataProvider({ children }) {
  const [history, setHistory]         = useState([])
  const [currentMode, setCurrentMode] = useState('normal')

  useEffect(() => {
    setHistory(generateTodayHistory())
  }, [])

  const toggleMode = () => {
    setCurrentMode(prev => prev === 'normal' ? 'stressed' : 'normal')
  }

  const defaultData = {
    stressLevel: 0, hr: 70, hrv: 50, rhr: 60, scl: 1.0, status: 'normal',
  }

  const currentData = history.length > 0
    ? history[history.length - 1]
    : defaultData

  return (
    <DataContext.Provider value={{ currentData, currentMode, toggleMode, history }}>
      {children}
    </DataContext.Provider>
  )
}

// ✅ hook ที่ทุก component ใช้ร่วมกัน — ได้ state ตัวเดียวกัน
export function useStressData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useStressData must be used within DataProvider')
  return context
}
