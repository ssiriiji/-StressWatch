export default function StepProgress({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <div className="mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          ขั้นตอน {currentStep} จาก {totalSteps}
        </span>
        <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
