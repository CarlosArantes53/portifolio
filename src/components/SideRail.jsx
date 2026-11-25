import { PROFILE, SOCIAL_LINKS } from '../data/profileData'

const ITEMS = [
  { id: null, label: 'Espaço', icon: SpaceIcon },
  { id: 'sobre', label: 'Sobre', icon: UserIcon },
  { id: 'projetos', label: 'Projetos', icon: LayersIcon },
  { id: 'skills', label: 'Stack', icon: CpuIcon },
  { id: 'contato', label: 'Contato', icon: MailIcon },
]

export default function SideRail({ activeSection, onSelect, onPreloadModal, theme }) {
  const isDark = theme === 'dark'

  return (
    <>
      {/* Desktop Left Icon Rail */}
      <aside
        aria-label="Navegação principal"
        className={`fixed left-0 top-0 bottom-0 z-30 hidden w-14 flex-col items-center justify-between py-4 border-r backdrop-blur-xl transition-colors duration-500 lg:flex ${
          isDark
            ? 'bg-[#070a14]/75 border-white/10 text-slate-300'
            : 'bg-[#ffedd5]/85 border-orange-900/15 text-[#2c1508]'
        }`}
      >
        {/* Brand Monogram */}
        <button
          type="button"
          onClick={() => onSelect(null)}
          title="Voltar ao Espaço"
          className={`flex h-9 w-9 items-center justify-center rounded-xl font-display text-xs font-bold tracking-wider transition-all hover:scale-105 ${
            isDark
              ? 'bg-white/10 text-white hover:bg-white/20 ring-1 ring-white/15'
              : 'bg-[#1c0f06] text-amber-50 hover:bg-orange-800 shadow-sm'
          }`}
        >
          {PROFILE.initials}
        </button>

        {/* Section Buttons */}
        <nav className="flex flex-col items-center gap-2">
          {ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id
            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelect(id)}
                onPointerEnter={id !== null ? onPreloadModal : undefined}
                onFocus={id !== null ? onPreloadModal : undefined}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? 'bg-white/15 text-sky-300 ring-1 ring-sky-300/35'
                      : 'bg-orange-600/15 text-orange-900 ring-1 ring-orange-700/30'
                    : isDark
                    ? 'text-slate-400 hover:bg-white/10 hover:text-white'
                    : 'text-[#5c2f14] hover:bg-orange-950/10 hover:text-[#1c0f06]'
                }`}
              >
                <Icon />
                {isActive && (
                  <span
                    className={`absolute -left-1.5 h-4 w-1 rounded-r-full ${
                      isDark ? 'bg-sky-300' : 'bg-orange-700'
                    }`}
                  />
                )}
                {/* Hover Tooltip */}
                <span
                  className={`pointer-events-none absolute left-12 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium opacity-0 shadow-lg transition-all duration-150 group-hover:left-14 group-hover:opacity-100 ${
                    isDark
                      ? 'bg-slate-900/95 text-white border border-white/10'
                      : 'bg-[#1c0f06] text-amber-50'
                  }`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom Social Links */}
        <div className="flex flex-col items-center gap-2">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              isDark
                ? 'text-slate-400 hover:bg-white/10 hover:text-white'
                : 'text-[#5c2f14] hover:bg-orange-950/10 hover:text-[#1c0f06]'
            }`}
          >
            <GithubMiniIcon />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              isDark
                ? 'text-slate-400 hover:bg-white/10 hover:text-white'
                : 'text-[#5c2f14] hover:bg-orange-950/10 hover:text-[#1c0f06]'
            }`}
          >
            <LinkedinMiniIcon />
          </a>
        </div>
      </aside>

      {/* Mobile / Tablet Floating Bottom Dock */}
      <nav
        aria-label="Navegação rápida"
        className={`fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-2xl border px-2 py-1.5 backdrop-blur-xl shadow-2xl transition-colors duration-500 lg:hidden ${
          isDark
            ? 'bg-[#090d1a]/85 border-white/15 text-slate-200'
            : 'bg-[#ffedd5]/90 border-orange-900/15 text-[#2c1508] shadow-[0_10px_30px_rgba(124,45,18,0.18)]'
        }`}
      >
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(id)}
              onPointerEnter={id !== null ? onPreloadModal : undefined}
              onFocus={id !== null ? onPreloadModal : undefined}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 text-[10px] font-medium transition-all ${
                isActive
                  ? isDark
                    ? 'bg-white/15 text-sky-300'
                    : 'bg-orange-600/15 text-orange-900'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-[#5c2f14] hover:text-[#1c0f06]'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}

function SpaceIcon({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-28 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(28 12 12)" />
    </svg>
  )
}

function UserIcon({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function LayersIcon({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function CpuIcon({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  )
}

function MailIcon({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GithubMiniIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinMiniIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
