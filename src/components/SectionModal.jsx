import { useEffect, useRef, useState } from 'preact/hooks'
import {
  ABOUT_PARAGRAPHS,
  CONTACT_LINKS,
  COSMOSVIEW_URL,
  PROFILE,
  PROJECT_CATEGORIES,
  PROJECTS,
  SKILL_CATEGORIES,
  SKILLS,
  STATS,
} from '../data/portfolioData'

const TABS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'skills', label: 'Stack' },
  { id: 'contato', label: 'Contato' },
]

export default function SectionModal({ activeSection, onSelectSection, onClose, theme }) {
  const [category, setCategory] = useState('Todos')
  const [copied, setCopied] = useState(false)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)
  const copyTimerRef = useRef(null)

  useEffect(() => {
    if (!activeSection) return
    previousFocusRef.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus()
      }
    }
  }, [activeSection, onClose])

  useEffect(() => {
    setCategory('Todos')
  }, [activeSection])

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  if (!activeSection) return null

  const isDark = theme === 'dark'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Seção ${activeSection}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:pl-20"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 backdrop-blur-md transition-opacity ${
          isDark ? 'bg-black/65' : 'bg-orange-950/35'
        }`}
      />

      {/* Frosted Modal Container */}
      <div
        className={`animate-panel-enter relative z-10 flex max-h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border backdrop-blur-2xl ${
          isDark
            ? 'bg-[#090e1c]/90 border-white/15 text-slate-100 shadow-[0_32px_90px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-br from-[#ffedd5] via-[#ffe2bd] to-[#fed39f] border-orange-900/20 text-[#1c0f06] shadow-[0_32px_90px_rgba(124,45,18,0.28)]'
        }`}
      >
        {/* Top Bar with Tabs & Close */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5 sm:px-7 ${
            isDark ? 'border-white/10' : 'border-orange-900/15'
          }`}
        >
          <div role="tablist" aria-label="Seções do portfólio" className="flex flex-wrap items-center gap-1.5">
            {TABS.map(({ id, label }) => {
              const active = activeSection === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectSection(id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono font-medium transition-all ${
                    active
                      ? isDark
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'bg-[#1c0f06] text-amber-50 shadow-sm font-semibold'
                      : isDark
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-[#4a2511] hover:bg-orange-950/10 hover:text-[#1c0f06]'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className={`flex h-8 w-8 items-center justify-center rounded-full text-lg transition-colors ${
              isDark
                ? 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                : 'bg-orange-950/10 text-[#3b1c0b] hover:bg-orange-950/20 hover:text-[#1c0f06]'
            }`}
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8">
          {activeSection === 'sobre' && <SobreTab isDark={isDark} />}
          {activeSection === 'projetos' && (
            <ProjetosTab isDark={isDark} category={category} setCategory={setCategory} />
          )}
          {activeSection === 'skills' && <StackTab isDark={isDark} />}
          {activeSection === 'contato' && (
            <ContatoTab isDark={isDark} copied={copied} onCopyEmail={copyEmail} />
          )}
        </div>
      </div>
    </div>
  )
}

function SobreTab({ isDark }) {
  return (
    <div>
      <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-sky-300' : 'text-orange-800 font-semibold'}`}>
        {'// sobre mim'}
      </p>
      <h2 className={`mt-1.5 font-display text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#1a0c04]'}`}>
        Quem sou eu
      </h2>

      <div className={`mt-6 grid gap-5 text-sm leading-relaxed md:grid-cols-2 sm:text-base ${isDark ? 'text-slate-300' : 'text-[#2c1508]'}`}>
        <div className="space-y-4">
          <p>{ABOUT_PARAGRAPHS[0]}</p>
          <p>{ABOUT_PARAGRAPHS[1]}</p>
        </div>
        <div className="space-y-4">
          <p>
            No campo web, gosto de criar experiências imersivas com canvas, WebGL e animações. Meus projetos combinam técnica e estética, como o{' '}
            <a
              href={COSMOSVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-4 ${
                isDark ? 'font-semibold text-sky-300 hover:text-sky-200' : 'font-bold text-orange-800 hover:text-orange-950'
              }`}
            >
              CosmosView
            </a>
            , um blog de astronomia interativo.
          </p>
          <p>{ABOUT_PARAGRAPHS[3]}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className={`rounded-2xl border p-4 text-center ${
              isDark
                ? 'border-white/10 bg-white/5'
                : 'border-orange-900/15 bg-[#fff7ec]/85 shadow-sm'
            }`}
          >
            <p className={`font-display text-2xl font-bold ${isDark ? 'text-sky-300' : 'text-orange-700'}`}>
              {value}
            </p>
            <p className={`mt-1 text-xs font-mono ${isDark ? 'text-slate-400' : 'text-[#4a2511] font-medium'}`}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjetosTab({ isDark, category, setCategory }) {
  const filtered =
    category === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.category === category)

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-sky-300' : 'text-orange-800 font-semibold'}`}>
            {'// projetos'}
          </p>
          <h2 className={`mt-1.5 font-display text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#1a0c04]'}`}>
            O que construí
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {PROJECT_CATEGORIES.map((cat) => {
            const active = category === cat
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-mono transition-all ${
                  active
                    ? isDark
                      ? 'bg-sky-300 text-slate-950 font-semibold'
                      : 'bg-orange-700 text-white font-semibold shadow-sm'
                    : isDark
                    ? 'border border-white/15 text-slate-300 hover:bg-white/10'
                    : 'border border-orange-900/20 bg-[#fff7ec]/60 text-[#3b1c0b] hover:bg-[#fff7ec]'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <div
            key={project.title}
            className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${
              isDark
                ? 'border-white/10 bg-white/[0.04] hover:border-sky-300/35'
                : 'border-orange-900/15 bg-[#fff7ec]/85 shadow-sm hover:border-orange-700/45 hover:bg-[#fffaf3]'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className={`font-display text-lg font-bold ${isDark ? '' : 'text-[#1a0c04]'}`}>{project.title}</h3>
                <div className="flex shrink-0 items-center gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub - ${project.title}`}
                      className={`rounded-lg p-1.5 transition-colors ${
                        isDark
                          ? 'text-slate-400 hover:bg-white/10 hover:text-white'
                          : 'text-[#4a2511] hover:bg-orange-950/10 hover:text-[#1c0f06]'
                      }`}
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Demo - ${project.title}`}
                      className={`rounded-lg p-1.5 transition-colors ${
                        isDark
                          ? 'text-sky-300 hover:bg-sky-300/15'
                          : 'text-orange-700 hover:bg-orange-700/15'
                      }`}
                    >
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>
              <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#2c1508]'}`}>
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono ${
                    isDark
                      ? 'border border-sky-300/25 bg-sky-300/10 text-sky-200'
                      : 'border border-orange-700/25 bg-orange-500/15 text-orange-950 font-medium'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 text-center">
        <a
          href="https://github.com/CarlosArantes53?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 font-mono text-sm hover:underline ${
            isDark ? 'font-medium text-sky-300' : 'font-semibold text-orange-800 hover:text-orange-950'
          }`}
        >
          Ver todos os repositórios no GitHub →
        </a>
      </div>
    </div>
  )
}

function StackTab({ isDark }) {
  return (
    <div>
      <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-sky-300' : 'text-orange-800 font-semibold'}`}>
        {'// habilidades'}
      </p>
      <h2 className={`mt-1.5 font-display text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#1a0c04]'}`}>
        Stack técnico
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {SKILLS.map(({ name, level }) => (
          <div key={name}>
            <div className="mb-1 flex items-center justify-between text-xs font-mono">
              <span className={isDark ? 'text-slate-200' : 'text-[#1c0f06] font-semibold'}>{name}</span>
              <span className={isDark ? 'text-sky-300' : 'text-orange-800 font-semibold'}>{level}%</span>
            </div>
            <div className={`h-2 overflow-hidden rounded-full ${isDark ? 'bg-white/10' : 'bg-orange-950/15'}`}>
              <div
                className={`h-full rounded-full bg-gradient-to-r ${
                  isDark ? 'from-indigo-500 to-sky-400' : 'from-orange-600 to-amber-500'
                }`}
                style={{ width: `${level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {SKILL_CATEGORIES.map(({ title, items }) => (
          <div
            key={title}
            className={`rounded-2xl border p-5 ${
              isDark
                ? 'border-white/10 bg-white/[0.04]'
                : 'border-orange-900/15 bg-[#fff7ec]/85 shadow-sm'
            }`}
          >
            <h3 className={`font-display text-sm font-bold ${isDark ? 'text-sky-300' : 'text-orange-800'}`}>
              {title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono ${
                    isDark
                      ? 'border border-white/15 bg-white/5 text-slate-200'
                      : 'border border-orange-900/15 bg-[#ffedd5]/80 text-[#2c1508] font-medium'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContatoTab({ isDark, copied, onCopyEmail }) {
  return (
    <div className="text-center">
      <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-sky-300' : 'text-orange-800 font-semibold'}`}>
        {'// contato'}
      </p>
      <h2 className={`mt-1.5 font-display text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#1a0c04]'}`}>
        Vamos conversar
      </h2>
      <p className={`mx-auto mt-2 max-w-md text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-[#2c1508]'}`}>
        Aberto a oportunidades, colaborações e projetos interessantes. Entre em contato por qualquer canal abaixo.
      </p>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={onCopyEmail}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-medium transition-all hover:scale-[1.03] ${
            copied
              ? 'bg-emerald-500 text-white'
              : isDark
              ? 'bg-white text-slate-950 hover:bg-sky-200'
              : 'bg-[#1c0f06] text-amber-50 hover:bg-orange-800 shadow-sm'
          }`}
        >
          <span>{copied ? 'Copiado!' : `Copiar e-mail (${PROFILE.email})`}</span>
        </button>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {CONTACT_LINKS.map(({ id, label, href, description }) => (
          <a
            key={id}
            href={href}
            target={href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={`group flex flex-col items-center gap-2.5 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${
              isDark
                ? 'border-white/10 bg-white/[0.04] hover:border-sky-300/40'
                : 'border-orange-900/15 bg-[#fff7ec]/85 shadow-sm hover:border-orange-700/45 hover:bg-[#fffaf3]'
            }`}
          >
            <span className={isDark ? 'text-sky-300' : 'text-orange-700'}>
              <ContactIcon id={id} />
            </span>
            <span className={`font-display text-sm font-bold ${isDark ? '' : 'text-[#1a0c04]'}`}>{label}</span>
            <span className={`text-[11px] font-mono break-all ${isDark ? 'text-slate-400' : 'text-[#4a2511]'}`}>
              {description}
            </span>
          </a>
        ))}
      </div>

      <div
        className={`mt-8 flex flex-col items-center justify-between gap-2 border-t pt-5 text-xs font-mono sm:flex-row ${
          isDark ? 'border-white/10 text-slate-400' : 'border-orange-900/15 text-[#4a2511]'
        }`}
      >
        <span>© 2026 {PROFILE.fullName}</span>
        <span>Preact + Vite</span>
      </div>
    </div>
  )
}

function ContactIcon({ id }) {
  if (id === 'github') return <GithubIcon size={22} />
  if (id === 'linkedin') {
    return (
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
  if (id === 'lattes') {
    return (
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GithubIcon({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}
