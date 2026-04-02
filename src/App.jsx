import { useState } from 'react'
import LandingHero from './components/LandingHero'
import LoadingState from './components/LoadingState'
import PassportDashboard from './components/PassportDashboard'
import FollowUpChat from './components/FollowUpChat'
import { extractProfile, generatePassport } from './api/claude'

// App states: 'landing' | 'loading' | 'passport'

export default function App() {
  const [appState, setAppState] = useState('landing')
  const [profile, setProfile] = useState(null)
  const [passport, setPassport] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (userText) => {
    setError(null)
    setAppState('loading')

    try {
      // Call 1: Extract profile
      const extractedProfile = await extractProfile(userText)
      setProfile(extractedProfile)

      // Call 2: Generate passport
      const generatedPassport = await generatePassport(extractedProfile)
      setPassport(generatedPassport)

      setAppState('passport')
    } catch (err) {
      console.error(err)
      setError(err.message)
      setAppState('landing')
    }
  }

  const handleReset = () => {
    setAppState('landing')
    setProfile(null)
    setPassport(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-passport-navy font-sans">
      {appState === 'landing' && (
        <div>
          {error && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm max-w-md text-center shadow-xl">
              {error}
            </div>
          )}
          <LandingHero onSubmit={handleSubmit} isLoading={false} />
        </div>
      )}

      {appState === 'loading' && (
        <LoadingState profile={profile} />
      )}

      {appState === 'passport' && profile && passport && (
        <div>
          <PassportDashboard
            profile={profile}
            passport={passport}
            onReset={handleReset}
          />
          <FollowUpChat
            profile={profile}
            passport={passport}
          />
        </div>
      )}
    </div>
  )
}
