import { useEffect, useState } from 'react'
import LandingHero from './components/LandingHero'
import LoadingState from './components/LoadingState'
import PassportDashboard from './components/PassportDashboard'
import FollowUpChat from './components/FollowUpChat'
import DiscoverFeed from './components/DiscoverFeed'
import { extractProfile, generatePassport } from './api/claude'

// App states: 'landing' | 'loading' | 'passport'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('passport-theme') || 'dark')
  const [activeTab, setActiveTab] = useState('passport')
  const [appState, setAppState] = useState('landing')
  const [profile, setProfile] = useState(null)
  const [passport, setPassport] = useState(null)
  const [error, setError] = useState(null)
  const [draftText, setDraftText] = useState('')

  useEffect(() => {
    localStorage.setItem('passport-theme', theme)
  }, [theme])

  const handleSubmit = async (userText) => {
    setError(null)
    setAppState('loading')
    setActiveTab('passport')
    setDraftText(userText)

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

  const handleReset = (nextDraft = '') => {
    setAppState('landing')
    setProfile(null)
    setPassport(null)
    setError(null)
    setDraftText(nextDraft)
  }

  const handleDiscoverSelect = (country) => {
    const prompt = `I want to immigrate to ${country}`
    handleReset(prompt)
    setActiveTab('passport')
  }

  return (
    <div className={`app-shell min-h-screen font-sans ${theme === 'light' ? 'light' : ''}`}>
      {activeTab === 'discover' && (
        <DiscoverFeed
          onOpenPassport={handleDiscoverSelect}
          onSelectTab={setActiveTab}
          theme={theme}
          onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
        />
      )}

      {activeTab === 'passport' && appState === 'landing' && (
        <div>
          {error && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm max-w-md text-center shadow-xl">
              {error}
            </div>
          )}
          <LandingHero
            onSubmit={handleSubmit}
            isLoading={false}
            value={draftText}
            onChange={setDraftText}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            theme={theme}
            onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
          />
        </div>
      )}

      {activeTab === 'passport' && appState === 'loading' && (
        <LoadingState profile={profile} />
      )}

      {activeTab === 'passport' && appState === 'passport' && profile && passport && (
        <div>
          <PassportDashboard
            profile={profile}
            passport={passport}
            onReset={handleReset}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            theme={theme}
            onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
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
