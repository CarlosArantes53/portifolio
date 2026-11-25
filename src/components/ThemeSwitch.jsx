export default function ThemeSwitch({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Alternar para tema Galáxia escuro' : 'Alternar para tema Sol claro'}
      onClick={onToggle}
      className={`group relative inline-flex h-10 w-[150px] items-center rounded-full p-1 transition-all duration-500 focus:outline-none focus-visible:ring-2 ${
        isLight
          ? 'focus-visible:ring-amber-400 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-200/90 border border-amber-900/15 shadow-[0_8px_24px_rgba(234,88,12,0.22)]'
          : 'focus-visible:ring-sky-400 bg-gradient-to-r from-[#070b18] via-[#0d142c] to-[#131836] border border-white/15 shadow-[0_8px_28px_rgba(79,70,229,0.28)]'
      }`}
    >
      {/* Track cosmic atmosphere */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        {!isLight ? (
          <>
            <span className="animate-star-twinkle absolute left-[52%] top-2.5 h-1 w-1 rounded-full bg-white/90" />
            <span
              className="animate-star-twinkle absolute left-[68%] bottom-2.5 h-0.5 w-0.5 rounded-full bg-sky-300"
              style={{ animationDelay: '0.6s' }}
            />
            <span
              className="animate-star-twinkle absolute left-[82%] top-3 h-1 w-1 rounded-full bg-indigo-200/80"
              style={{ animationDelay: '1.2s' }}
            />
            <span
              className="animate-star-twinkle absolute left-[58%] bottom-2 h-0.5 w-0.5 rounded-full bg-amber-100/75"
              style={{ animationDelay: '1.7s' }}
            />
          </>
        ) : (
          <>
            <span className="absolute left-3 top-1/2 h-4 w-12 -translate-y-1/2 rounded-full bg-amber-300/55 blur-md" />
            <span className="absolute right-7 top-1/2 h-5 w-10 -translate-y-1/2 rounded-full bg-orange-400/40 blur-md" />
          </>
        )}
      </span>

      {/* State label */}
      <span
        className={`pointer-events-none relative z-10 w-full text-[11px] font-mono font-medium tracking-wide transition-all duration-300 ${
          isLight
            ? 'pr-10 pl-3 text-center text-amber-950 font-semibold'
            : 'pl-9 pr-3 text-right text-slate-100/90'
        }`}
      >
        {isLight ? 'Sol' : 'Galáxia'}
      </span>

      {/* Sliding Celestial Orb Knob */}
      <span
        className={`absolute top-1 left-1 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isLight
            ? 'translate-x-[108px] bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_18px_rgba(245,158,11,0.85),0_0_8px_rgba(234,88,12,0.55)] ring-1 ring-amber-200/90'
            : 'translate-x-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-900 shadow-[0_0_14px_rgba(129,140,248,0.6)] ring-1 ring-sky-300/40'
        }`}
      >
        {isLight ? (
          <span className="relative flex items-center justify-center">
            <span className="animate-corona-pulse absolute h-7 w-7 rounded-full bg-amber-300/60 blur-[3px]" />
            <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-amber-100 via-yellow-50 to-white shadow-[0_0_10px_rgba(255,251,235,1)]" />
          </span>
        ) : (
          <svg
            aria-hidden="true"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="text-sky-200 transition-transform duration-300 group-hover:rotate-12"
          >
            <path
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              fill="currentColor"
            />
            <circle cx="17.5" cy="6.5" r="1.2" fill="#fde68a" />
          </svg>
        )}
      </span>
    </button>
  )
}
