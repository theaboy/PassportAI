import ProfileBadge from './ProfileBadge'
import TopNav from './TopNav'

// ---- Section Icons (inline SVG) ----

function VisaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  )
}

function EducationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  )
}

function CareerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  )
}

// ---- Priority Badge ----
function PriorityBadge({ priority }) {
  const styles = {
    high: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    low: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${styles[priority] || styles.low}`}>
      {priority}
    </span>
  )
}

// ---- Section Card ----
function SectionCard({ title, icon, accentColor, glowClass, children, delay = 0 }) {
  const colors = {
    rose: {
      border: 'border-rose-500/20',
      header: 'from-rose-500/10 to-transparent',
      icon: 'text-rose-400 bg-rose-400/10',
      title: 'text-rose-300',
      stripe: 'bg-rose-500',
    },
    amber: {
      border: 'border-amber-500/20',
      header: 'from-amber-500/10 to-transparent',
      icon: 'text-amber-400 bg-amber-400/10',
      title: 'text-amber-300',
      stripe: 'bg-amber-500',
    },
    emerald: {
      border: 'border-emerald-500/20',
      header: 'from-emerald-500/10 to-transparent',
      icon: 'text-emerald-400 bg-emerald-400/10',
      title: 'text-emerald-300',
      stripe: 'bg-emerald-500',
    },
    blue: {
      border: 'border-blue-500/20',
      header: 'from-blue-500/10 to-transparent',
      icon: 'text-blue-400 bg-blue-400/10',
      title: 'text-blue-300',
      stripe: 'bg-blue-500',
    },
  }
  const c = colors[accentColor]

  return (
    <div
      className={`relative rounded-2xl border ${c.border} bg-passport-card overflow-hidden ${glowClass} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      {/* Top stripe */}
      <div className={`h-0.5 w-full ${c.stripe} opacity-60`} />

      {/* Header */}
      <div className={`bg-gradient-to-b ${c.header} px-5 py-4 flex items-center gap-3 border-b border-white/5`}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
          {icon}
        </div>
        <h3 className={`font-semibold text-sm tracking-wide uppercase ${c.title}`}>
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="px-5 py-4 space-y-3">
        {children}
      </div>
    </div>
  )
}

// ---- Visa Section ----
function VisaSection({ data }) {
  if (!data) return <p className="text-slate-500 text-sm">No visa data available.</p>

  return (
    <>
      {/* Status */}
      <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/10">
        <p className="text-slate-300 text-sm leading-relaxed">{data.status_summary}</p>
        {data.urgency === 'high' && (
          <p className="mt-1.5 text-xs text-rose-400 font-medium">⚠ Requires immediate attention</p>
        )}
      </div>

      {/* Next Steps */}
      {data.next_steps?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Action Items</p>
          {data.next_steps.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/2">
              <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-slate-200 text-sm font-medium">{item.step}</p>
                  <PriorityBadge priority={item.priority} />
                </div>
                {item.deadline && (
                  <p className="text-xs text-slate-500 mt-0.5">📅 {item.deadline}</p>
                )}
                {item.details && (
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Milestone */}
      {data.upcoming_milestone && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-rose-500/10 bg-rose-500/5">
          <span className="text-rose-400 text-xs">🎯</span>
          <p className="text-xs text-rose-300">{data.upcoming_milestone}</p>
        </div>
      )}

      {/* Warnings */}
      {data.warnings?.length > 0 && (
        <div className="space-y-1">
          {data.warnings.map((w, i) => (
            <p key={i} className="text-xs text-amber-500/80 bg-amber-500/5 border border-amber-500/10 rounded px-3 py-1.5">
              ⚠ {w}
            </p>
          ))}
        </div>
      )}
    </>
  )
}

// ---- Education Section ----
function EducationSection({ data }) {
  if (!data) return <p className="text-slate-500 text-sm">No education data available.</p>

  return (
    <>
      {data.matched_scholarships?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Matched Scholarships</p>
          {data.matched_scholarships.map((s, i) => (
            <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/2 hover:border-amber-400/20 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-slate-200 text-sm font-medium leading-tight">{s.name}</p>
                  <p className="text-amber-400 text-sm font-bold mt-0.5">{s.amount}</p>
                  {s.deadline && (
                    <p className="text-xs text-slate-500 mt-1">📅 Deadline: {s.deadline}</p>
                  )}
                  {s.match_reason && (
                    <p className="text-xs text-emerald-400/70 mt-1">✓ {s.match_reason}</p>
                  )}
                </div>
                {s.link && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1 text-xs text-amber-400/60 hover:text-amber-400 transition-colors mt-0.5"
                  >
                    Apply <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.tip && (
        <div className="p-3 rounded-lg border border-amber-400/10 bg-amber-400/5">
          <p className="text-xs text-amber-300/80 leading-relaxed">💡 {data.tip}</p>
        </div>
      )}
    </>
  )
}

// ---- Career Section ----
function CareerSection({ data }) {
  if (!data) return <p className="text-slate-500 text-sm">No career data available.</p>

  return (
    <>
      {data.credential_steps?.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Credential Recognition</p>
          {data.credential_steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className="text-emerald-400 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
              <span className="leading-snug">{step}</span>
            </div>
          ))}
        </div>
      )}

      {data.job_boards?.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Job Boards</p>
          <div className="flex flex-wrap gap-2">
            {data.job_boards.map((board, i) => (
              <a
                key={i}
                href={board.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-xs hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all"
              >
                {board.name}
                <ExternalLinkIcon />
              </a>
            ))}
          </div>
        </div>
      )}

      {data.top_employers?.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Top Employers in Your Field</p>
          <div className="flex flex-wrap gap-1.5">
            {data.top_employers.map((emp, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-slate-300 text-xs">
                {emp}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.internship_programs?.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Internship Programs</p>
          {data.internship_programs.map((prog, i) => (
            <p key={i} className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-emerald-400">→</span> {prog}
            </p>
          ))}
        </div>
      )}

      {data.tip && (
        <div className="p-3 rounded-lg border border-emerald-400/10 bg-emerald-400/5">
          <p className="text-xs text-emerald-300/80 leading-relaxed">💡 {data.tip}</p>
        </div>
      )}
    </>
  )
}

// ---- Community Section ----
function CommunitySection({ data }) {
  if (!data) return <p className="text-slate-500 text-sm">No community data available.</p>

  return (
    <>
      {data.organizations?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Organizations Near You</p>
          {data.organizations.map((org, i) => (
            <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/2 hover:border-blue-400/20 transition-colors">
              <p className="text-slate-200 text-sm font-medium">{org.name}</p>
              {org.city && <p className="text-xs text-blue-400/70 mt-0.5">📍 {org.city}</p>}
              {org.description && (
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{org.description}</p>
              )}
              {org.contact && (
                <p className="text-xs text-slate-600 mt-1">✉ {org.contact}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.quick_wins?.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Do This Week</p>
          {data.quick_wins.map((win, i) => (
            <p key={i} className="text-xs text-slate-400 flex items-start gap-2">
              <span className="text-blue-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="leading-snug">{win}</span>
            </p>
          ))}
        </div>
      )}

      {data.tip && (
        <div className="p-3 rounded-lg border border-blue-400/10 bg-blue-400/5">
          <p className="text-xs text-blue-300/80 leading-relaxed">💡 {data.tip}</p>
        </div>
      )}
    </>
  )
}

// ---- Main Dashboard ----
export default function PassportDashboard({ profile, passport, onReset, activeTab, onSelectTab }) {
  const name = profile?.name && profile.name !== 'Newcomer' ? profile.name : 'Your'
  const city = profile?.city

  return (
    <div className="min-h-screen bg-passport-navy dot-grid">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-passport-navy/80 backdrop-blur border-b border-white/5">
        <TopNav
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          rightLabel="Life Passport Generated"
        />
        <div className="max-w-5xl mx-auto px-6 pb-4 flex items-center justify-end">
          <button
            onClick={() => onReset()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 text-xs hover:border-white/20 hover:text-white transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            New passport
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Hero Row */}
        <div className="space-y-3 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <div className="animate-stamp">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {name === 'Your' ? 'Your' : `${name}'s`} Life Passport
              </h1>
              <p className="text-slate-500 text-sm">
                {city ? `Personalized for ${city}, Canada` : 'Personalized for Canada'} · Generated just now
              </p>
            </div>
          </div>

          {/* Profile Badge */}
          <ProfileBadge profile={profile} />
        </div>

        {/* 4 Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionCard
            title="Visa & Legal"
            icon={<VisaIcon />}
            accentColor="rose"
            glowClass="glow-rose"
            delay={50}
          >
            <VisaSection data={passport?.visa} />
          </SectionCard>

          <SectionCard
            title="Education & Scholarships"
            icon={<EducationIcon />}
            accentColor="amber"
            glowClass="glow-amber"
            delay={100}
          >
            <EducationSection data={passport?.education} />
          </SectionCard>

          <SectionCard
            title="Career & Credentials"
            icon={<CareerIcon />}
            accentColor="emerald"
            glowClass="glow-emerald"
            delay={150}
          >
            <CareerSection data={passport?.career} />
          </SectionCard>

          <SectionCard
            title="Community"
            icon={<CommunityIcon />}
            accentColor="blue"
            glowClass="glow-blue"
            delay={200}
          >
            <CommunitySection data={passport?.community} />
          </SectionCard>
        </div>

        {/* Footer stat */}
        <div className="flex items-center justify-center gap-2 py-2 animate-fade-in">
          <span className="text-xs text-slate-600">This roadmap used to take</span>
          <span className="text-xs font-semibold text-slate-400 line-through">~20 hours</span>
          <span className="text-xs text-slate-600">of manual research.</span>
          <span className="text-xs font-semibold text-amber-400">You just saved it all.</span>
        </div>

      </div>
    </div>
  )
}
