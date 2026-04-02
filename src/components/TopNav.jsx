import { Moon, Sun } from 'lucide-react'

export default function TopNav({
  activeTab,
  onSelectTab,
  rightLabel = 'Gemini-powered · Multi-country',
  theme = 'dark',
  onToggleTheme,
  actions = null,
}) {
  const tabs = [
    { id: 'passport', label: 'Passport' },
    { id: 'discover', label: 'Discover' },
  ]

  const isLight = theme === 'light'

  return (
    <nav className="theme-nav flex items-center justify-between gap-4 px-6 py-5 border-b">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-sm">
          P
        </div>
        <span className="theme-text font-semibold tracking-tight">PassportAI</span>
      </div>

      <div className="theme-pill flex items-center gap-1 rounded-full border p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                isActive
                  ? isLight
                    ? 'theme-surface theme-text shadow-sm'
                    : 'bg-white text-slate-950 shadow-sm'
                  : 'theme-muted hover:text-[var(--app-text)]'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="theme-muted hidden items-center gap-2 text-xs font-mono md:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {rightLabel}
        </div>
        {actions}
        <button
          onClick={onToggleTheme}
          className="theme-pill inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:text-[var(--app-text)]"
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {isLight ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </nav>
  )
}
