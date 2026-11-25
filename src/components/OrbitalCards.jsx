import { useEffect, useRef, useState } from 'preact/hooks'
import { PROFILE } from '../data/profileData'

function CursorPill({ label, color, className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 flex items-center gap-1 select-none ${className}`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill={color}
        className="-mt-3 drop-shadow"
      >
        <path d="M2 1.5l11.5 5.2-5 1.8-2.3 5L2 1.5z" />
      </svg>
      <span
        className="rounded-md px-2 py-0.5 text-[10px] font-semibold text-white shadow-md whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    </div>
  )
}

function TypewriterNote({ active = false }) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [text, setText] = useState(() => PROFILE.notePhrases[0])
  const [deleting, setDeleting] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (!active || !isVisible) return
    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (prefersReduced) return

    const current = PROFILE.notePhrases[phraseIdx]
    let timer

    if (!deleting) {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 65)
      } else {
        timer = setTimeout(() => setDeleting(true), 1700)
      }
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 35)
    } else {
      setDeleting(false)
      setPhraseIdx((prev) => (prev + 1) % PROFILE.notePhrases.length)
    }

    return () => clearTimeout(timer)
  }, [active, isVisible, text, deleting, phraseIdx])

  return (
    <span className="inline-flex items-center min-h-[1.25rem]">
      <span>{text}</span>
      <span className="ml-0.5 inline-block h-3.5 w-0.5 bg-slate-900/80 animate-pulse" />
    </span>
  )
}

function SobreArtifactCard({ theme, typewriterActive }) {
  const isLight = theme === 'light'
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 text-left transition-shadow duration-300 ${
        isLight
          ? 'bg-[#f25f3a] text-slate-950 shadow-[0_18px_40px_rgba(240,90,55,0.28)] ring-1 ring-black/10'
          : 'bg-[#f05a37] text-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/20'
      }`}
    >
      <div className="mb-2.5 flex items-center justify-between text-[10px] font-mono text-slate-950">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-950/35" />
          <span className="h-2 w-2 rounded-full bg-slate-950/25" />
          <span className="ml-1 font-medium">sobre.md</span>
        </div>
        <span className="rounded bg-white/25 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-950">
          Perfil
        </span>
      </div>

      <h2 className="font-display text-lg font-bold leading-tight text-slate-950 xl:text-xl">
        Notas do dev:
      </h2>
      <p className="mt-1 text-xs font-semibold text-slate-950">
        <TypewriterNote active={typewriterActive} />
      </p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-950">
          22+ repos
        </span>
        <span className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-950">
          CV &amp; AI
        </span>
      </div>

      <CursorPill label="Carlos" color="#0369a1" className="bottom-4 right-5 animate-patrol-1" />
    </div>
  )
}

function ProjetosArtifactCard({ theme, idSuffix = 'desktop' }) {
  const isLight = theme === 'light'
  const gradId = `planetGrad-${idSuffix}`
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white p-3.5 text-left text-slate-900 transition-shadow duration-300 ${
        isLight
          ? 'shadow-[0_18px_42px_rgba(15,23,42,0.13)] ring-1 ring-slate-900/10'
          : 'shadow-[0_22px_52px_rgba(0,0,0,0.6)] ring-1 ring-white/40'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-amber-800">
          Projetos • 06
        </span>
        <span className="text-[10px] font-mono text-slate-600">SPA / IA</span>
      </div>

      <h2 className="font-display text-sm font-bold leading-snug text-slate-900 xl:text-base">
        CosmosView — NASA_MBA
      </h2>

      {/* Miniature cosmic banner */}
      <div className="relative my-2.5 h-16 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#090d24] via-[#1a1f4d] to-[#0c4a6e]">
        <svg viewBox="0 0 220 72" className="h-full w-full" aria-hidden="true">
          <circle cx="28" cy="18" r="1.2" fill="#fff" opacity="0.8" />
          <circle cx="54" cy="48" r="0.9" fill="#bae6fd" opacity="0.9" />
          <circle cx="178" cy="14" r="1.3" fill="#fde68a" opacity="0.85" />
          <circle cx="195" cy="50" r="1" fill="#fff" opacity="0.7" />
          <circle cx="96" cy="15" r="0.8" fill="#fff" opacity="0.6" />
          <defs>
            <radialGradient id={gradId} cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="55%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
          </defs>
          <circle cx="116" cy="37" r="18" fill={`url(#${gradId})`} />
          <ellipse
            cx="116"
            cy="37"
            rx="34"
            ry="8"
            fill="none"
            stroke="#bae6fd"
            strokeOpacity="0.65"
            strokeWidth="1.4"
            transform="rotate(-14 116 37)"
          />
        </svg>
      </div>

      <div className="space-y-1 text-[10px] font-mono text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="truncate">Libras • MediaPipe Hands</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          <span className="truncate">TFC • Segmentação Copernicus</span>
        </div>
      </div>

      <CursorPill label="6 projetos" color="#b45309" className="top-12 right-4 animate-patrol-2" />
    </div>
  )
}

function StackArtifactCard({ theme }) {
  const isLight = theme === 'light'
  const previewSkills = [
    { name: 'Python', level: 95 },
    { name: 'MediaPipe', level: 90 },
    { name: 'OpenCV', level: 85 },
    { name: 'React', level: 75 },
  ]

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#f8fafc] text-left text-slate-900 transition-shadow duration-300 ${
        isLight
          ? 'shadow-[0_18px_42px_rgba(15,23,42,0.13)] ring-1 ring-slate-900/10'
          : 'shadow-[0_22px_52px_rgba(0,0,0,0.6)] ring-1 ring-white/35'
      }`}
    >
      {/* macOS style chrome */}
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-100/90 px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] font-mono font-medium text-slate-600">stack.dev</span>
      </div>

      <div className="p-3.5">
        <div className="space-y-2">
          {previewSkills.map(({ name, level }) => (
            <div key={name}>
              <div className="mb-0.5 flex items-center justify-between text-[10px] font-mono">
                <span className="font-semibold text-slate-700">{name}</span>
                <span className="text-indigo-600">{level}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-sky-400"
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {['YOLO', 'Three.js', 'Blender'].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[9px] font-mono text-slate-700"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <CursorPill label="Python 95%" color="#047857" className="bottom-8 right-5 animate-patrol-3" />
    </div>
  )
}

function ContatoArtifactCard({ theme }) {
  const isLight = theme === 'light'
  return (
    <div
      className={`blueprint-grid relative overflow-hidden rounded-2xl bg-[#1b3b9c] p-3.5 text-left text-white transition-shadow duration-300 ${
        isLight
          ? 'shadow-[0_18px_42px_rgba(27,59,156,0.3)] ring-1 ring-indigo-950/20'
          : 'shadow-[0_22px_52px_rgba(0,0,0,0.65)] ring-1 ring-sky-300/25'
      }`}
    >
      <div className="mb-1.5 flex items-center justify-between text-[9px] font-mono text-sky-200/85">
        <span>BLUEPRINT // REDE</span>
        <span>04 CANAIS</span>
      </div>

      {/* Constellation / Blueprint Node SVG */}
      <svg viewBox="0 0 210 112" className="w-full h-24" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="3 3">
          <line x1="105" y1="54" x2="36" y2="26" />
          <line x1="105" y1="54" x2="174" y2="24" />
          <line x1="105" y1="54" x2="40" y2="90" />
          <line x1="105" y1="54" x2="170" y2="88" />
        </g>

        {/* Center hub */}
        <circle cx="105" cy="54" r="14" fill="rgba(125,211,252,0.16)" stroke="#7dd3fc" strokeWidth="1.2" />
        <text x="105" y="57" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          CA
        </text>

        {/* Peripheral nodes */}
        <circle cx="36" cy="26" r="4.5" fill="#fff" />
        <text x="36" y="15" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontFamily="JetBrains Mono, monospace">
          GitHub
        </text>

        <circle cx="174" cy="24" r="4.5" fill="#7dd3fc" />
        <text x="174" y="14" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontFamily="JetBrains Mono, monospace">
          LinkedIn
        </text>

        <circle cx="40" cy="90" r="4.5" fill="#fde68a" />
        <text x="40" y="104" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontFamily="JetBrains Mono, monospace">
          Lattes
        </text>

        <circle cx="170" cy="88" r="4.5" fill="#fff" />
        <text x="170" y="104" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontFamily="JetBrains Mono, monospace">
          E-mail
        </text>
      </svg>

      <CursorPill label="Conectar" color="#7c3aed" className="top-8 left-6 animate-patrol-4" />
    </div>
  )
}

const ARTIFACT_SLOTS = [
  {
    id: 'sobre',
    ariaLabel: 'Abrir seção Sobre Mim',
    positionClass: 'top-[7%] left-[calc(3.5rem+2.8vw)]',
    tilt: -3.5,
    depth: 1.25,
    floatClass: 'animate-orbital-slow',
    Card: SobreArtifactCard,
  },
  {
    id: 'projetos',
    ariaLabel: 'Abrir seção Projetos',
    positionClass: 'top-[8%] right-[3.5vw]',
    tilt: 4,
    depth: 1.0,
    floatClass: 'animate-orbital-alt',
    Card: ProjetosArtifactCard,
  },
  {
    id: 'skills',
    ariaLabel: 'Abrir seção Stack Técnico',
    positionClass: 'bottom-[6%] left-[calc(3.5rem+3.8vw)]',
    tilt: 2.8,
    depth: 1.4,
    floatClass: 'animate-orbital-alt',
    Card: StackArtifactCard,
  },
  {
    id: 'contato',
    ariaLabel: 'Abrir seção Contato',
    positionClass: 'bottom-[6%] right-[4vw]',
    tilt: 5.5,
    depth: 1.15,
    floatClass: 'animate-orbital-slow',
    Card: ContatoArtifactCard,
  },
]

function DesktopOrbitalSlot({
  slot,
  parallax,
  theme,
  onSelectSection,
  onPreloadModal,
  isDimmed,
  typewriterActive,
}) {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const mqDesktop = window.matchMedia?.('(min-width: 1024px)')
    let unsubscribe = null

    const syncSubscription = () => {
      const isDesktop = mqDesktop ? mqDesktop.matches : true
      if (isDesktop && !prefersReduced) {
        if (!unsubscribe) {
          unsubscribe = parallax.subscribe((px, py) => {
            if (!parallaxRef.current) return
            const dx = px * slot.depth * 18
            const dy = py * slot.depth * 14
            const rx = -py * 4.5
            const ry = px * 5.5
            parallaxRef.current.style.transform = `perspective(900px) translate3d(${dx.toFixed(
              2
            )}px, ${dy.toFixed(2)}px, 0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
          })
        }
      } else {
        if (unsubscribe) {
          unsubscribe()
          unsubscribe = null
        }
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = 'none'
        }
      }
    }

    syncSubscription()
    mqDesktop?.addEventListener?.('change', syncSubscription)

    return () => {
      mqDesktop?.removeEventListener?.('change', syncSubscription)
      if (unsubscribe) unsubscribe()
    }
  }, [parallax, slot.depth])

  const { Card } = slot

  return (
    <div
      className={`fixed z-20 hidden lg:block w-[212px] xl:w-[244px] 2xl:w-[266px] transition-all duration-500 ${
        slot.positionClass
      } ${isDimmed ? 'opacity-20 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
    >
      <div ref={parallaxRef} style={{ willChange: 'transform' }}>
        <div className={slot.floatClass}>
          <button
            type="button"
            onClick={() => onSelectSection(slot.id)}
            onPointerEnter={onPreloadModal}
            onFocus={onPreloadModal}
            aria-label={slot.ariaLabel}
            style={{ transform: `rotate(${slot.tilt}deg)` }}
            className="block w-full rounded-2xl transition-transform duration-300 ease-out hover:scale-[1.05] hover:!rotate-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Card theme={theme} idSuffix="desktop" typewriterActive={typewriterActive} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OrbitalCards({
  parallax,
  theme,
  onSelectSection,
  onPreloadModal,
  isDimmed,
}) {
  const [isDesktop, setIsDesktop] = useState(null)

  useEffect(() => {
    const mqDesktop = window.matchMedia?.('(min-width: 1024px)')
    const sync = () => setIsDesktop(mqDesktop ? mqDesktop.matches : true)
    sync()
    mqDesktop?.addEventListener?.('change', sync)
    return () => mqDesktop?.removeEventListener?.('change', sync)
  }, [])

  return (
    <>
      {/* Desktop Quadrant Orbital Cards */}
      {ARTIFACT_SLOTS.map((slot) => (
        <DesktopOrbitalSlot
          key={slot.id}
          slot={slot}
          parallax={parallax}
          theme={theme}
          onSelectSection={onSelectSection}
          onPreloadModal={onPreloadModal}
          isDimmed={isDimmed}
          typewriterActive={isDesktop === true}
        />
      ))}

      {/* Mobile / Tablet Responsive Grid */}
      <div className="relative z-20 mx-auto mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 px-4 pb-24 sm:grid-cols-2 lg:hidden">
        {ARTIFACT_SLOTS.map(({ id, ariaLabel, Card }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelectSection(id)}
            onPointerEnter={onPreloadModal}
            onFocus={onPreloadModal}
            aria-label={ariaLabel}
            className="block w-full rounded-2xl transition-transform duration-200 active:scale-[0.98] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Card theme={theme} idSuffix="mobile" typewriterActive={isDesktop === false} />
          </button>
        ))}
      </div>
    </>
  )
}
