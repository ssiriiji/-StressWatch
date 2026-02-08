import { useStressData } from '../../hooks/useStressData'

export default function StatusToggle() {
  const { currentMode, toggleMode } = useStressData()

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-xl shadow-md">
      <span className={`text-sm font-medium ${currentMode === 'normal' ? 'text-blue-600' : 'text-gray-500'}`}>
        ปกติ
      </span>
      
      <button
        onClick={toggleMode}
        className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
          currentMode === 'stressed' ? 'bg-red-500' : 'bg-green-500'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            currentMode === 'stressed' ? 'translate-x-8' : 'translate-x-0'
          }`}
        />
      </button>
      
      <span className={`text-sm font-medium ${currentMode === 'stressed' ? 'text-red-600' : 'text-gray-500'}`}>
        เครียด
      </span>
    </div>
  )
}
