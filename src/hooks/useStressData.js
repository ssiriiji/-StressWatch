import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'

export function useStressData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useStressData must be used within DataProvider')
  }
  return context
}
