import { useState, useEffect } from 'react'

const STEPS = [
  { id: 1, label: 'Extracting your profile', sublabel: 'Reading your background...', duration: 2500 },
  { id: 2, label: 'Matching resources', sublabel: 'Scanning 15 scholarships, 12 organizations...', duration: 2500 },
  { id: 3, label: 'Building your passport', sublabel: 'Personalizing your roadmap...', duration: 3000 },
]

const FACTS = [
  '"What used to take Youssef 3 weeks of Googling now takes 8 seconds."',
  '"400,000+ immigrants arrive in Canada every year. Most spend their first month lost."',
  '"The people who need information most have the least access to it in a usable form."',
  '"PassportAI doesn\'t replace the immigration system. It makes it navigable."',
]

export default function LoadingState({ profile }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [factIndex, setFactIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const elapsedTimer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(elapsedTimer)
  }, [])

  useEffect(() => {
    let stepIdx = 0

    const advance = () => {
      if (stepIdx < STEPS.length - 1) {
        setCompletedSteps(prev => [...prev, stepIdx])
        stepIdx++
        setCurrentStep(stepIdx)
        setTimeout(advance, STEPS[stepIdx].duration)
      }
    }

    setTimeout(advance, STEPS[0].duration)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex(i => (i + 1) % FACTS.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const name = profile?.name && profile.name !== 'Newcomer' ? profile.name : null
  const nationality = profile?.nationality
  const city = profile?.city

  return (
    <div className="min-h-screen mesh-bg dot-grid flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-10">

        {/* Passport Icon Animation */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-24 h-24 rounded-full border-2 border-amber-400/20 animate-pulse-slow" />
            {/* Inner ring spinning */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-amber-400 border-r-amber-400/30 spinner" />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 3v18M3 9h6M3 15h6"/>
                  <path d="M13 8h5M13 12h5M13 16h5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2 animate-fade-in">
          <h2 className="text-2xl font-bold text-white">
            {name
              ? `Building ${name}'s Life Passport`
              : 'Building Your Life Passport'}
          </h2>
          {(nationality || city) && (
            <p className="text-slate-500 text-sm">
              {[nationality, city].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const isCompleted = completedSteps.includes(idx)
            const isCurrent = currentStep === idx && !isCompleted
            const isPending = idx > currentStep

            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  isCompleted
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : isCurrent
                    ? 'border-amber-400/30 bg-amber-400/5'
                    : 'border-white/5 bg-white/2 opacity-40'
                }`}
              >
                {/* Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isCurrent
                    ? 'bg-amber-400/20 text-amber-400'
                    : 'bg-white/5 text-slate-600'
                }`}>
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  ) : isCurrent ? (
                    <span className="w-3 h-3 border-2 border-amber-400/40 border-t-amber-400 rounded-full spinner" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-current" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    isCompleted ? 'text-emerald-400' : isCurrent ? 'text-amber-300' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-slate-500 mt-0.5 animate-fade-in">{step.sublabel}</p>
                  )}
                  {isCompleted && (
                    <p className="text-xs text-emerald-600 mt-0.5">Done</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(((completedSteps.length) / STEPS.length) * 100 + 15, 95)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600 font-mono">
            <span>Processing...</span>
            <span>{elapsed}s</span>
          </div>
        </div>

        {/* Rotating Fact */}
        <div className="text-center px-4 py-4 rounded-xl border border-white/5 bg-white/2 min-h-[72px] flex items-center justify-center">
          <p
            key={factIndex}
            className="text-slate-500 text-sm italic leading-relaxed animate-fade-in"
          >
            {FACTS[factIndex]}
          </p>
        </div>

      </div>
    </div>
  )
}
