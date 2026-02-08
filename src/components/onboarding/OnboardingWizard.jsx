import { useState } from 'react'
import BasicInfo from './BasicInfo'
import LifestyleQuestions from './LifestyleQuestions'
import StepProgress from './StepProgress'
import Button from '../common/Button'

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1)
  const totalSteps = 2

  const [formData, setFormData] = useState({
    exerciseFrequency: '',
    coffeeIntake: '',
    coffeeTime: [],
    sleepHours: '',
  })

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepProgress currentStep={step} totalSteps={totalSteps} />

      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mt-6">
        {step === 1 && (
          <BasicInfo 
            data={formData} 
            onChange={updateFormData}
          />
        )}

        {step === 2 && (
          <LifestyleQuestions 
            data={formData} 
            onChange={updateFormData}
          />
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={handleBack}
            disabled={step === 1}
            variant="outline"
          >
            ← ย้อนกลับ
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.exerciseFrequency) ||
              (step === 2 && !formData.sleepHours)
            }
          >
            {step === totalSteps ? '✓ เริ่มใช้งาน' : 'ถัดไป →'}
          </Button>
        </div>
      </div>
    </div>
  )
}
