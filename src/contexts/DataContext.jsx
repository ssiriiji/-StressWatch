import { createContext, useState } from 'react'
import { normalData, stressedData } from '../data/mockStressData'
import { historyData } from '../data/mockHistoryData'

export const DataContext = createContext()

export function DataProvider({ children }) {
  const [currentMode, setCurrentMode] = useState('normal')
  const [currentData, setCurrentData] = useState(normalData)
  const [history] = useState(historyData)

  const toggleMode = () => {
    const newMode = currentMode === 'normal' ? 'stressed' : 'normal'
    setCurrentMode(newMode)
    setCurrentData(newMode === 'normal' ? normalData : stressedData)
  }

  const setMode = (mode) => {
    setCurrentMode(mode)
    setCurrentData(mode === 'normal' ? normalData : stressedData)
  }

  return (
    <DataContext.Provider value={{
      currentMode,
      currentData,
      history,
      toggleMode,
      setMode
    }}>
      {children}
    </DataContext.Provider>
  )
}
