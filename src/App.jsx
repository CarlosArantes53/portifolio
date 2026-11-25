import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import CosmicBackground from './components/CosmicBackground'
import OrbitalCards from './components/OrbitalCards'
import SideRail from './components/SideRail'
import SpaceCursorBadge from './components/SpaceCursorBadge'
import ThemeSwitch from './components/ThemeSwitch'
import { PROFILE } from './data/profileData'
import useParallax from './hooks/useParallax'

const THEME_STORAGE_KEY = 'portfolio-cosmic-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Ignore storage access restrictions
  }
  return 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeSection, setActiveSection] = useState(null)
  const [ModalComponent, setModalComponent] = useState(null)
  const modalPromiseRef = useRef(null)
  const parallax = useParallax()
  const heroParallaxRef = useRef(null)

  const preloadModal = useCallback(() => {
    if (ModalComponent) return
    if (!modalPromiseRef.current) {
      modalPromiseRef.current = import('./components/SectionModal')
        .then((mod) => {
          setModalComponent(() => mod.default)
          return mod.default
        })
        .catch(() => {
          modalPromiseRef.current = null
        })
    }
  }, [ModalComponent])

  const openSection = useCallback(
    (section) => {
      setActiveSection(section)
      if (section !== null) {
        preloadModal()
      }
    },
    [preloadModal]
  )

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.classList.toggle('dark', theme === 'dark')
    const themeMeta = document.querySelector('meta[name="theme-color"]')
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#04060c' : '#fff7e6')
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore storage access restrictions
    }
  }, [theme])

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
            if (!heroParallaxRef.current) return
            heroParallaxRef.current.style.transform = `translate3d(${(px * 6).toFixed(2)}px, ${(
              py * 4
            ).toFixed(2)}px, 0)`
          })
        }
      } else {
        if (unsubscribe) {
          unsubscribe()
          unsubscribe = null
        }
        if (heroParallaxRef.current) {
          heroParallaxRef.current.style.transform = 'none'
        }
      }
    }

    syncSubscription()
    mqDesktop?.addEventListener?.('change', syncSubscription)

    return () => {
      mqDesktop?.removeEventListener?.('change', syncSubscription)
      if (unsubscribe) unsubscribe()
    }
  }, [parallax])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'
  const hasModal = Boolean(activeSection)

  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden ${
        isDark ? 'selection:bg-sky-400/30' : 'selection:bg-amber-400/35'
      }`}
    >
      <CosmicBackground theme={theme} parallax={parallax} />

      <SideRail
        activeSection={activeSection}
        onSelect={openSection}
        onPreloadModal={preloadModal}
        theme={theme}
      />

      {/* Top-right 2-state cosmic switch */}
      <div className="fixed right-4 top-4 z-40 sm:right-6 sm:top-5">
        <ThemeSwitch theme={theme} onToggle={toggleTheme} />
      </div>

      {/* Main Spatial Viewport */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-8 lg:pl-20 lg:pr-8 lg:py-8">
        {/* Centered Hero Anchor */}
        <div
          ref={heroParallaxRef}
          style={{ willChange: 'transform' }}
          className={`relative z-30 mx-auto max-w-xl text-center transition-all duration-500 ${
            hasModal ? 'pointer-events-none scale-95 opacity-25' : 'opacity-100'
          }`}
        >
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono backdrop-blur-md transition-colors duration-300 ${
              isDark
                ? 'border-sky-400/30 bg-sky-400/10 text-sky-300'
                : 'border-amber-600/30 bg-amber-500/15 text-amber-900'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isDark ? 'bg-sky-300' : 'bg-orange-500'
              }`}
            />
            <span className={isDark ? 'text-sky-200' : 'text-amber-900 font-semibold'}>
              Computer Vision &amp; IA
            </span>
          </div>

          <h1
            className={`font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-[3.4rem] md:leading-[1.08] ${
              isDark ? 'text-white' : 'text-stone-950'
            }`}
          >
            {PROFILE.name}
          </h1>

          <p
            className={`mx-auto mt-3.5 max-w-md text-sm leading-relaxed sm:text-base ${
              isDark ? 'text-slate-300/90' : 'text-stone-700'
            }`}
          >
            {PROFILE.tagline}
          </p>

          {/* Center CTAs matching ChatGPT Space rhythm */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openSection('projetos')}
              onPointerEnter={preloadModal}
              onFocus={preloadModal}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${
                isDark
                  ? 'bg-white text-slate-950 shadow-[0_0_28px_rgba(255,255,255,0.22)] hover:bg-sky-100'
                  : 'bg-stone-950 text-amber-50 shadow-[0_12px_28px_rgba(120,53,15,0.24)] hover:bg-amber-700'
              }`}
            >
              Explorar projetos
            </button>

            <button
              type="button"
              onClick={() => openSection('sobre')}
              onPointerEnter={preloadModal}
              onFocus={preloadModal}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all duration-200 hover:scale-[1.03] ${
                isDark
                  ? 'border-white/20 bg-white/8 text-slate-100 hover:bg-white/15'
                  : 'border-amber-950/15 bg-white/75 text-stone-800 hover:bg-white shadow-sm'
              }`}
            >
              Sobre mim
            </button>

            <button
              type="button"
              onClick={() => openSection('contato')}
              onPointerEnter={preloadModal}
              onFocus={preloadModal}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all duration-200 hover:scale-[1.03] ${
                isDark
                  ? 'border-white/20 bg-white/8 text-slate-100 hover:bg-white/15'
                  : 'border-amber-950/15 bg-white/75 text-stone-800 hover:bg-white shadow-sm'
              }`}
            >
              Contato
            </button>
          </div>

          <p
            className={`mt-5 text-[11px] font-mono ${
              isDark ? 'text-slate-300/90' : 'text-stone-600'
            }`}
          >
            Clique em qualquer card ou navegue pelo menu
          </p>
        </div>

        {/* Floating Orbital Quadrant Cards (desktop) & Responsive Grid (mobile/tablet) */}
        <OrbitalCards
          parallax={parallax}
          theme={theme}
          onSelectSection={openSection}
          onPreloadModal={preloadModal}
          isDimmed={hasModal}
        />
      </main>

      <SpaceCursorBadge theme={theme} hidden={hasModal} />

      {hasModal && ModalComponent && (
        <ModalComponent
          activeSection={activeSection}
          onSelectSection={openSection}
          onClose={() => openSection(null)}
          theme={theme}
        />
      )}
    </div>
  )
}
