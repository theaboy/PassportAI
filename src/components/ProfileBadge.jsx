const GOAL_LABELS = {
  scholarships: '🎓 Scholarships',
  community: '🤝 Community',
  career: '💼 Career',
  visa: '🛂 Visa',
  pr: '🇨🇦 Permanent Residency',
  language: '🗣 Language',
  housing: '🏠 Housing',
  networking: '🌐 Networking',
}

export default function ProfileBadge({ profile }) {
  if (!profile) return null

  const {
    name,
    nationality,
    city,
    field,
    visa_type,
    languages = [],
    goals = [],
    education_level,
  } = profile

  const displayName = name && name !== 'Newcomer' ? name : null

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 px-4 rounded-xl border border-amber-400/15 bg-amber-400/5 animate-fade-in-up">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
        {displayName ? displayName[0].toUpperCase() : nationality?.[0]?.toUpperCase() || '?'}
      </div>

      {/* Name */}
      {displayName && (
        <span className="text-amber-300 font-semibold text-sm">{displayName}</span>
      )}

      <div className="flex flex-wrap gap-1.5">
        {nationality && <Chip icon="🌍" label={nationality} color="amber" />}
        {city && <Chip icon="📍" label={city} color="blue" />}
        {field && <Chip icon="⚡" label={field} color="indigo" />}
        {education_level && <Chip icon="📚" label={education_level} color="purple" />}
        {visa_type && <Chip icon="🛂" label={`${capitalize(visa_type)} visa`} color="rose" />}
        {languages.slice(0, 3).map(lang => (
          <Chip key={lang} icon="🗣" label={lang} color="slate" />
        ))}
        {goals.slice(0, 4).map(goal => (
          <Chip key={goal} label={GOAL_LABELS[goal] || goal} color="emerald" />
        ))}
      </div>
    </div>
  )
}

function Chip({ icon, label, color }) {
  const colors = {
    amber: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    blue: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
    indigo: 'bg-indigo-400/10 text-indigo-300 border-indigo-400/20',
    purple: 'bg-purple-400/10 text-purple-300 border-purple-400/20',
    rose: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    emerald: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    slate: 'bg-slate-400/10 text-slate-300 border-slate-400/20',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${colors[color] || colors.slate}`}>
      {icon && <span>{icon}</span>}
      {label}
    </span>
  )
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str
}
