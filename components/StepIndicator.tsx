'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps?: number
}

export default function StepIndicator({ currentStep, totalSteps = 4 }: StepIndicatorProps) {
  return (
    <div className="flex gap-2 px-5 py-4">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
        <div
          key={s}
          className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
            s <= currentStep ? 'bg-paw-orange' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}