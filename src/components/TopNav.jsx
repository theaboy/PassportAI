export default function TopNav({ activeTab, onSelectTab, rightLabel = 'Gemini-powered · Multi-country' }) {
  const tabs = [
    { id: 'passport', label: 'Passport' },
    { id: 'discover', label: 'Discover' },
  ]

  return (
    <nav className="flex items-center justify-between gap-4 px-6 py-5 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-sm">
          P
        </div>
        <span className="font-semibold text-white tracking-tight">PassportAI</span>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                isActive
                  ? 'bg-white text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="hidden items-center gap-2 text-xs text-slate-500 font-mono md:flex">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {rightLabel}
      </div>
    </nav>
  )
}
