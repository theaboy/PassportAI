import { useState, useRef, useEffect } from 'react'

const EXAMPLES = [
  {
    label: '🇲🇦 Youssef — Montreal',
    text: "I'm a 23-year-old Moroccan software engineer, I just arrived in Montreal on a student visa. I speak French and Arabic. I want to find scholarships, connect with the Moroccan community, and eventually get permanent residency."
  },
  {
    label: '🇸🇳 Amara — Toronto',
    text: "I'm Amara, 28, from Senegal. I have a master's in mechanical engineering and moved to Toronto on a work permit 6 months ago. I'm looking for credential recognition, a professional network, and the fastest path to PR."
  },
  {
    label: '🇨🇳 Li Wei — Vancouver',
    text: "My name is Li Wei, I'm 26 and I'm from Shanghai. I'm studying data science at UBC on a student visa. I speak Mandarin and English. I want to find research scholarships and tech internships in Vancouver."
  },
]

const PLACEHOLDER = `Example: "I'm a 23-year-old Moroccan software engineer, I just arrived in Montreal on a student visa. I speak French and Arabic. I'm looking for scholarships, the Moroccan community, and guidance on getting permanent residency."`

export default function LandingHero({ onSubmit, isLoading }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    if (text.trim().length < 20) return
    onSubmit(text.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  const fillExample = (example) => {
    setText(example.text)
    textareaRef.current?.focus()
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="min-h-screen mesh-bg dot-grid flex flex-col">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-sm">
            P
          </div>
          <span className="font-semibold text-white tracking-tight">PassportAI</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Claude-powered · Canada
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl space-y-8">

          {/* Badge */}
          <div className="flex justify-center animate-fade-in-up stagger-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              AI-Powered Immigrant Life Navigator
            </span>
          </div>

          {/* Headline */}
          <div className="text-center space-y-4 animate-fade-in-up stagger-2">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">
              Your new life in Canada,
              <br />
              <span className="text-gradient">mapped in 8 seconds.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
              Describe yourself in one paragraph. Get your complete personalized roadmap — visa steps, scholarships, career guidance, and community.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex justify-center gap-8 animate-fade-in-up stagger-3">
            {[
              { value: '20+ hrs', label: 'saved per newcomer' },
              { value: '99.9%', label: 'faster than manual search' },
              { value: '400k+', label: 'immigrants/year in Canada' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-amber-400 font-bold text-lg">{stat.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Input Card */}
          <div className="border-gradient rounded-2xl p-1 animate-fade-in-up stagger-4 glow-amber">
            <div className="bg-passport-card rounded-xl overflow-hidden">
              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={PLACEHOLDER}
                rows={4}
                className="w-full bg-transparent px-5 pt-5 pb-3 text-slate-200 placeholder:text-slate-600 text-base leading-relaxed outline-none font-sans min-h-[120px]"
              />

              {/* Footer bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 font-mono">
                    {wordCount > 0 ? `${wordCount} words` : '⌘↵ to submit'}
                  </span>
                  {wordCount > 0 && wordCount < 15 && (
                    <span className="text-xs text-amber-500/60">Add more detail for better results</span>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={text.trim().length < 20 || isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:from-amber-400 hover:to-amber-300 transition-all duration-150 active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full spinner" />
                      Building...
                    </>
                  ) : (
                    <>
                      Build My Passport
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Example Chips */}
          <div className="space-y-2 animate-fade-in-up stagger-5">
            <p className="text-center text-xs text-slate-600 uppercase tracking-widest">Try an example</p>
            <div className="flex flex-wrap justify-center gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => fillExample(ex)}
                  className="px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-slate-400 text-xs hover:border-amber-400/30 hover:text-amber-300 hover:bg-amber-400/5 transition-all duration-150"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center py-4 text-xs text-slate-700 border-t border-white/5">
        Built at McGill Data Network Hackathon · April 2026 · Theme: Automate. Optimize. Innovate.
      </div>
    </div>
  )
}
