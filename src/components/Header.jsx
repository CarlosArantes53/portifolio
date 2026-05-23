import { useState, useEffect } from 'react'

const NAV = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#topo"
          className="font-syne font-bold text-lg tracking-widest text-amber-400 hover:text-amber-300 transition-colors"
          style={{ color: '#fed272' }}
        >
          CA
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-sm text-white/60 hover:text-amber-300 transition-colors tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-white/70 hover:text-amber-300 transition-colors tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
