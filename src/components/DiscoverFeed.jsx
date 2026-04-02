import TopNav from './TopNav'

const DISCOVER_CARDS = [
  {
    country: 'Portugal',
    flag: '🇵🇹',
    fact: 'Portugal has a dedicated job seeker visa that lets you enter without a job offer, look for work on the ground for 120 days, and extend once for another 60 days.',
    stat: '120 + 60 days to job hunt in-country',
    source: 'Source: Portuguese Ministry of Foreign Affairs visa guidance',
    theme: 'from-rose-900 via-orange-700 to-amber-500',
    accent: 'bg-rose-300 text-rose-950',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    fact: 'Germany’s Opportunity Card can give skilled workers up to one year in-country to find a qualified job, and it allows trial work plus part-time work while you search.',
    stat: 'Up to 1 year stay, plus 20 hours/week of work',
    source: 'Source: Make it in Germany, Opportunity Card',
    theme: 'from-slate-950 via-rose-900 to-amber-500',
    accent: 'bg-amber-200 text-amber-950',
  },
  {
    country: 'UAE',
    flag: '🇦🇪',
    fact: 'The UAE Golden Visa is not just for investors. Qualified professionals can secure long-term residency without a local sponsor if they meet the official criteria.',
    stat: '5- or 10-year residency, depending on category',
    source: 'Source: UAE Government Portal, Golden Visa',
    theme: 'from-emerald-950 via-slate-900 to-red-700',
    accent: 'bg-emerald-200 text-emerald-950',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    fact: 'Canada publishes multi-year permanent resident targets in advance, which is unusual globally and gives applicants a clearer sense of immigration volume planning.',
    stat: '395,000 PR targets in 2025, 380,000 in 2026, 365,000 in 2027',
    source: 'Source: IRCC Levels Plan briefing, October 21, 2025',
    theme: 'from-red-950 via-rose-800 to-red-500',
    accent: 'bg-red-200 text-red-950',
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    fact: 'If you graduate in the Netherlands, or from a qualifying top university abroad, you can apply for an orientation year permit and work freely while looking for your long-term role.',
    stat: '1 full year to work and search, if you apply within 3 years of graduating',
    source: 'Source: Government.nl, Orientation Year for Highly Educated Persons',
    theme: 'from-sky-950 via-indigo-900 to-orange-500',
    accent: 'bg-sky-200 text-sky-950',
  },
  {
    country: 'New Zealand',
    flag: '🇳🇿',
    fact: 'New Zealand has a Straight to Residence route for certain Green List jobs, which means some migrants can skip the usual long wait between a work visa and residence.',
    stat: 'Tier 1 Green List roles can lead straight to residence; 80% processed within 5 months',
    source: 'Source: Immigration New Zealand, Straight to Residence Visa',
    theme: 'from-sky-950 via-blue-900 to-cyan-500',
    accent: 'bg-cyan-200 text-cyan-950',
  },
  {
    country: 'Estonia',
    flag: '🇪🇪',
    fact: 'Estonia’s digital nomad visa set one of Europe’s earliest official remote-work frameworks, but it also sets a clear income bar rather than leaving it vague.',
    stat: '€4,500 net monthly income threshold',
    source: 'Source: Estonian e-Residency, Digital Nomad Visa',
    theme: 'from-slate-950 via-cyan-900 to-slate-400',
    accent: 'bg-slate-100 text-slate-950',
  },
  {
    country: 'Japan',
    flag: '🇯🇵',
    fact: 'International students in Japan can keep job hunting after graduation by switching to Designated Activities, even if they have not secured a full-time offer yet.',
    stat: 'Up to 1 year to job hunt after graduation',
    source: 'Source: Study in Japan, Changing Status of Residence',
    theme: 'from-zinc-950 via-rose-900 to-pink-400',
    accent: 'bg-pink-200 text-pink-950',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    fact: 'Spain’s digital nomad pathway does not require you to cut all ties with local clients. If you are self-employed, part of your income can still come from Spain.',
    stat: 'Up to 20% of self-employed income can come from Spanish clients; 3 years of experience can substitute for a degree',
    source: 'Source: Spanish Consular guidance on the Digital Nomad Visa',
    theme: 'from-red-950 via-amber-700 to-yellow-400',
    accent: 'bg-yellow-200 text-yellow-950',
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    fact: 'Australia’s Working Holiday route can stretch beyond one year if you do the right regional or sector work, turning a short stay into a longer test-run before a bigger move.',
    stat: 'Second-year visa after 3 months of specified work; third-year visa after 6 months',
    source: 'Source: Australian Department of Home Affairs, Working Holiday Maker Program',
    theme: 'from-indigo-950 via-blue-900 to-amber-500',
    accent: 'bg-indigo-200 text-indigo-950',
  },
]

function ScrollArrow() {
  return (
    <div className="flex flex-col items-center gap-2 text-white/60">
      <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
      <svg className="discover-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 5v14" />
        <path d="M6 13l6 6 6-6" />
      </svg>
    </div>
  )
}

export default function DiscoverFeed({ onOpenPassport, onSelectTab, theme, onToggleTheme }) {
  return (
    <div className="theme-bg relative h-screen overflow-hidden">
      <div className="theme-nav fixed inset-x-0 top-0 z-20 backdrop-blur-xl">
        <TopNav
          activeTab="discover"
          onSelectTab={onSelectTab}
          rightLabel="Swipe countries · source-backed facts"
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </div>

      <div className="discover-scroll h-screen overflow-y-auto snap-y snap-mandatory">
        {DISCOVER_CARDS.map((card) => (
          <section
            key={card.country}
            className={`relative min-h-screen snap-start overflow-hidden bg-gradient-to-br ${card.theme}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_28%)]" />

            <div className="relative flex min-h-screen flex-col justify-between px-6 pb-10 pt-28 sm:px-10">
              <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
                <div className="rounded-[2rem] border border-white/15 bg-black/20 p-8 shadow-2xl backdrop-blur-md sm:p-12">
                  <div className="text-6xl sm:text-7xl">{card.flag}</div>
                  <div className="mt-6 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                    Did you know?
                  </div>
                  <p className="mt-6 text-3xl font-bold leading-tight text-white sm:text-5xl">
                    {card.fact}
                  </p>
                  <div className={`mt-8 inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${card.accent}`}>
                    {card.stat}
                  </div>
                  <p className="mt-8 text-sm text-white/60">
                    {card.source}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mx-auto flex w-full max-w-3xl items-end justify-between gap-4">
                <button
                  onClick={() => onOpenPassport(card.country)}
                  className="rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-150 hover:scale-[1.02]"
                >
                  Build my passport for {card.country} →
                </button>
                <ScrollArrow />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
