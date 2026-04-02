import { useMemo, useState } from 'react'
import ProfileBadge from './ProfileBadge'
import TopNav from './TopNav'

function VisaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function EducationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function CareerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  )
}

const SECTION_META = {
  visa: {
    title: 'Visa & Legal',
    teaser: (data) => `${data?.next_steps?.length || 0} urgent visa actions waiting`,
    icon: <VisaIcon />,
    accentColor: 'rose',
    glowClass: 'glow-rose',
  },
  education: {
    title: 'Education & Scholarships',
    teaser: (data) => `${data?.matched_scholarships?.length || 0} scholarships matched`,
    icon: <EducationIcon />,
    accentColor: 'amber',
    glowClass: 'glow-amber',
  },
  career: {
    title: 'Career & Credentials',
    teaser: (data) => `${data?.credential_steps?.length || 0} career moves mapped`,
    icon: <CareerIcon />,
    accentColor: 'emerald',
    glowClass: 'glow-emerald',
  },
  community: {
    title: 'Community',
    teaser: (data) => `${data?.organizations?.length || 0} local groups to explore`,
    icon: <CommunityIcon />,
    accentColor: 'blue',
    glowClass: 'glow-blue',
  },
}

function getSectionColors(accentColor) {
  const colors = {
    rose: {
      border: 'border-rose-500/25',
      header: 'from-rose-500/14 to-transparent',
      icon: 'text-rose-300 bg-rose-400/12',
      title: 'text-rose-200',
      teaser: 'text-rose-100/80',
      stripe: 'bg-rose-500',
      surface: 'bg-rose-500/6',
      timeline: 'bg-rose-400',
    },
    amber: {
      border: 'border-amber-500/25',
      header: 'from-amber-500/14 to-transparent',
      icon: 'text-amber-300 bg-amber-400/12',
      title: 'text-amber-200',
      teaser: 'text-amber-100/80',
      stripe: 'bg-amber-500',
      surface: 'bg-amber-500/6',
      timeline: 'bg-amber-400',
    },
    emerald: {
      border: 'border-teal-500/25',
      header: 'from-teal-500/14 to-transparent',
      icon: 'text-teal-300 bg-teal-400/12',
      title: 'text-teal-200',
      teaser: 'text-teal-100/80',
      stripe: 'bg-teal-500',
      surface: 'bg-teal-500/6',
      timeline: 'bg-teal-400',
    },
    blue: {
      border: 'border-sky-500/25',
      header: 'from-sky-500/14 to-transparent',
      icon: 'text-sky-300 bg-sky-400/12',
      title: 'text-sky-200',
      teaser: 'text-sky-100/80',
      stripe: 'bg-sky-500',
      surface: 'bg-sky-500/6',
      timeline: 'bg-sky-400',
    },
  }

  return colors[accentColor]
}

function normalizeContact(contact) {
  if (!contact) return null
  if (/^https?:\/\//i.test(contact)) return contact
  if (contact.includes('@')) return `mailto:${contact}`
  return `https://${contact}`
}

function priorityTone(priority) {
  switch (priority) {
    case 'high':
      return 'bg-rose-400 shadow-[0_0_18px_rgba(251,113,133,0.35)]'
    case 'medium':
      return 'bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.35)]'
    case 'low':
      return 'bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.28)]'
    default:
      return 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.28)]'
  }
}

function VisaContent({ data, isOpen }) {
  if (!data) return null

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-rose-500/10 bg-white/[0.02] p-4">
        <p className="text-sm leading-relaxed text-slate-300">{data.status_summary}</p>
      </div>

      {data.next_steps?.length > 0 && (
        <div className="relative pl-4">
          <div className="absolute left-[17px] top-3 bottom-3 w-px bg-gradient-to-b from-rose-500/30 via-amber-400/30 to-sky-400/30" />
          <div className="space-y-4">
            {data.next_steps.map((item, index) => (
              <div
                key={`${item.step}-${index}`}
                className={`visa-step-item relative flex gap-4 rounded-2xl border border-white/6 bg-white/[0.02] p-4 ${isOpen ? 'is-visible' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative z-10 mt-1 h-4 w-4 rounded-full ${priorityTone(item.priority)}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{item.step}</h4>
                    {item.priority && (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-slate-300">
                        {item.priority}
                      </span>
                    )}
                  </div>
                  {item.deadline && <p className="mt-1 text-xs text-slate-500">{item.deadline}</p>}
                  {item.details && <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {data.upcoming_milestone && (
          <div className="rounded-2xl border border-rose-500/12 bg-rose-500/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-rose-300/70">Upcoming milestone</p>
            <p className="mt-2 text-sm text-rose-100">{data.upcoming_milestone}</p>
          </div>
        )}
        {data.warnings?.length > 0 && (
          <div className="rounded-2xl border border-amber-500/12 bg-amber-500/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300/70">Warnings</p>
            <div className="mt-2 space-y-2">
              {data.warnings.map((warning, index) => (
                <p key={`${warning}-${index}`} className="text-sm text-amber-100/85">
                  {warning}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EducationContent({ data }) {
  if (!data) return null

  return (
    <div className="space-y-5">
      {data.matched_scholarships?.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.matched_scholarships.map((item, index) => (
            <div key={`${item.name}-${index}`} className="scholarship-flip h-56">
              <div className="scholarship-flip-inner">
                <div className="scholarship-face scholarship-front border border-amber-500/15 bg-gradient-to-br from-amber-500/10 to-amber-500/0 p-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-amber-300/75">Matched grant</p>
                  <h4 className="mt-4 text-lg font-semibold leading-tight text-white">{item.name}</h4>
                  <p className="mt-8 text-3xl font-bold text-amber-300">{item.amount}</p>
                </div>
                <div className="scholarship-face scholarship-back border border-amber-500/18 bg-[#16120a] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70">Details</p>
                  {item.deadline && <p className="mt-3 text-sm text-slate-300">Deadline: {item.deadline}</p>}
                  {item.match_reason && <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.match_reason}</p>}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/12 px-4 py-2 text-sm font-medium text-amber-200 hover:bg-amber-400/18"
                    >
                      Apply <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.tip && (
        <div className="rounded-2xl border border-amber-500/12 bg-amber-500/6 p-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300/70">Education tip</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-100/85">{data.tip}</p>
        </div>
      )}
    </div>
  )
}

function CareerContent({ data, activeNode, onSelectNode }) {
  if (!data) return null

  const nodes = data.credential_steps?.map((step, index) => ({
    title: step,
    detail: data.internship_programs?.[index] || data.tip || 'Use this step as part of your career plan.',
  })) || []

  const selectedNode = nodes[activeNode] || nodes[0]

  return (
    <div className="space-y-6">
      {nodes.length > 0 && (
        <div className="rounded-2xl border border-teal-500/12 bg-white/[0.02] p-5">
          <div className="career-roadmap flex flex-wrap items-center gap-4 md:flex-nowrap">
            {nodes.map((node, index) => (
              <div key={`${node.title}-${index}`} className="flex flex-1 items-center gap-4 min-w-[180px]">
                <button
                  onClick={() => onSelectNode(index)}
                  className={`career-node w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                    activeNode === index
                      ? 'border-teal-400/35 bg-teal-400/12 text-white'
                      : 'border-white/8 bg-[#141821] text-slate-300 hover:border-teal-400/20'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-[0.24em] text-teal-300/70">Step {index + 1}</span>
                  <p className="mt-2 text-sm font-semibold leading-snug">{node.title}</p>
                </button>
                {index < nodes.length - 1 && <div className="hidden h-px flex-1 border-t border-dashed border-teal-400/25 md:block" />}
              </div>
            ))}
          </div>

          {selectedNode && (
            <div className="mt-5 rounded-2xl border border-teal-500/12 bg-[#0f1117] p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-teal-300/70">Selected node</p>
              <h4 className="mt-2 text-sm font-semibold text-white">{selectedNode.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{selectedNode.detail}</p>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {data.job_boards?.length > 0 && (
          <div className="rounded-2xl border border-teal-500/12 bg-teal-500/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-teal-300/70">Job boards</p>
            <div className="mt-3 space-y-2">
              {data.job_boards.map((board, index) => (
                <a
                  key={`${board.name}-${index}`}
                  href={board.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-black/10 px-3 py-2 text-sm text-teal-100 hover:border-teal-400/25"
                >
                  <span>{board.name}</span>
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>
          </div>
        )}

        {data.top_employers?.length > 0 && (
          <div className="rounded-2xl border border-teal-500/12 bg-teal-500/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-teal-300/70">Top employers</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.top_employers.map((employer, index) => (
                <span key={`${employer}-${index}`} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
                  {employer}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.internship_programs?.length > 0 && (
          <div className="rounded-2xl border border-teal-500/12 bg-teal-500/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-teal-300/70">Internships</p>
            <div className="mt-3 space-y-2">
              {data.internship_programs.map((program, index) => (
                <p key={`${program}-${index}`} className="text-sm text-slate-300">
                  {program}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.tip && (
        <div className="rounded-2xl border border-teal-500/12 bg-teal-500/6 p-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-teal-300/70">Career tip</p>
          <p className="mt-2 text-sm leading-relaxed text-teal-100/80">{data.tip}</p>
        </div>
      )}
    </div>
  )
}

function CommunityContent({ data }) {
  if (!data) return null

  return (
    <div className="space-y-5">
      {data.organizations?.length > 0 && (
        <div className="grid gap-3">
          {data.organizations.map((org, index) => (
            <div key={`${org.name}-${index}`} className="flex gap-4 rounded-2xl border border-sky-500/12 bg-white/[0.02] p-4">
              <div className="mt-1 text-sky-300">
                <MapPinIcon />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-white">{org.name}</h4>
                <p className="mt-1 text-xs text-sky-300/75">{[org.city, org.description].filter(Boolean).join(' · ')}</p>
                {org.contact && (
                  <a
                    href={normalizeContact(org.contact)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-sky-200 hover:text-white"
                  >
                    {org.contact}
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {data.quick_wins?.length > 0 && (
          <div className="rounded-2xl border border-sky-500/12 bg-sky-500/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300/70">Quick wins</p>
            <div className="mt-3 space-y-2">
              {data.quick_wins.map((win, index) => (
                <p key={`${win}-${index}`} className="text-sm text-slate-300">{win}</p>
              ))}
            </div>
          </div>
        )}
        {data.tip && (
          <div className="rounded-2xl border border-sky-500/12 bg-sky-500/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-sky-300/70">Community tip</p>
            <p className="mt-3 text-sm leading-relaxed text-sky-100/80">{data.tip}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SectionStamp({ sectionKey, data, isOpen, onToggle, children }) {
  const meta = SECTION_META[sectionKey]
  const colors = getSectionColors(meta.accentColor)

  return (
    <div
      className={`passport-stamp relative overflow-hidden rounded-[28px] border bg-[#121722] transition-all duration-300 ${colors.border} ${meta.glowClass} ${isOpen ? 'md:col-span-2' : ''}`}
    >
      <div className={`absolute inset-x-0 top-0 h-px ${colors.stripe} opacity-65`} />
      <button
        onClick={onToggle}
        className={`w-full px-5 py-5 text-left bg-gradient-to-b ${colors.header}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`passport-stamp-icon mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 ${colors.icon} ${isOpen ? 'is-open' : ''}`}>
              {meta.icon}
            </div>
            <div>
              <p className={`text-xs uppercase tracking-[0.28em] ${colors.title}`}>Section</p>
              <h3 className={`mt-2 text-lg font-semibold ${colors.title}`}>{meta.title}</h3>
              <p className={`mt-2 text-sm ${colors.teaser}`}>{meta.teaser(data)}</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">
            {isOpen ? 'Close' : 'Open'}
          </span>
        </div>
      </button>

      <div className={`passport-expand ${isOpen ? 'is-open' : ''}`}>
        <div className="border-t border-white/6 px-5 pb-5 pt-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function PassportDashboard({ profile, passport, onReset, activeTab, onSelectTab }) {
  const [openSection, setOpenSection] = useState(null)
  const [careerNode, setCareerNode] = useState(0)
  const name = profile?.name && profile.name !== 'Newcomer' ? profile.name : 'Your'
  const city = profile?.city

  const sections = useMemo(() => ([
    { key: 'visa', data: passport?.visa },
    { key: 'education', data: passport?.education },
    { key: 'career', data: passport?.career },
    { key: 'community', data: passport?.community },
  ]), [passport])

  const toggleSection = (sectionKey) => {
    setOpenSection((current) => current === sectionKey ? null : sectionKey)
    if (sectionKey === 'career') setCareerNode(0)
  }

  return (
    <div className="min-h-screen bg-[#0f1117] dot-grid">
      <div className="sticky top-0 z-10 border-b border-white/5 bg-[#0f1117]/90 backdrop-blur">
        <TopNav
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          rightLabel="Life Passport Generated"
        />
        <div className="mx-auto flex max-w-6xl items-center justify-end px-6 pb-4">
          <button
            onClick={() => onReset()}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition-all hover:border-white/20 hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            New passport
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 space-y-6">
        <div className="passport-book rounded-[32px] border border-amber-400/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
          <div className="space-y-3 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="animate-stamp">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {name === 'Your' ? 'Your' : `${name}'s`} Life Passport
                </h1>
                <p className="text-sm text-slate-500">
                  Your Life Passport — click a section to open it
                </p>
              </div>
            </div>

            <ProfileBadge profile={profile} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {sections.map((section) => {
              const isOpen = openSection === section.key
              return (
                <SectionStamp
                  key={section.key}
                  sectionKey={section.key}
                  data={section.data}
                  isOpen={isOpen}
                  onToggle={() => toggleSection(section.key)}
                >
                  {section.key === 'visa' && <VisaContent data={section.data} isOpen={isOpen} />}
                  {section.key === 'education' && <EducationContent data={section.data} />}
                  {section.key === 'career' && (
                    <CareerContent
                      data={section.data}
                      activeNode={careerNode}
                      onSelectNode={setCareerNode}
                    />
                  )}
                  {section.key === 'community' && <CommunityContent data={section.data} />}
                </SectionStamp>
              )
            })}
          </div>
        </div>

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
