import { useEffect, useRef } from 'react'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/CarlosArantes53',
    description: 'Código & projetos',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/carlos-eduardo-de-paula-arantes-5415181aa/',
    description: 'Perfil profissional',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Lattes',
    href: 'http://lattes.cnpq.br/2955071584883186',
    description: 'Currículo acadêmico',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:carlos.arantes05@gmail.com',
    description: 'carlos.arantes05@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contato" className="py-32 px-6">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto text-center">
        <p
          className="font-mono text-sm tracking-widest mb-4"
          style={{ color: '#fd8d3c', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {'// contato'}
        </p>

        <h2
          className="font-syne font-bold text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Vamos conversar
        </h2>

        <p className="text-white/50 max-w-md mx-auto mb-12">
          Aberto a oportunidades, colaborações e projetos interessantes.
          Entre em contato por qualquer canal abaixo.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {LINKS.map(({ label, href, description, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(254,210,114,0.15)',
              }}
            >
              <span
                className="text-white/50 group-hover:text-amber-300 transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {icon}
              </span>
              <span
                className="font-syne font-semibold text-sm"
                style={{ fontFamily: "'Syne', sans-serif", color: '#fed272' }}
              >
                {label}
              </span>
              <span
                className="font-mono text-xs text-white/35 text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {description}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs font-mono"
          style={{ borderColor: 'rgba(255,255,255,0.06)', fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span>© 2025 Carlos Eduardo de Paula Arantes</span>
          <span style={{ color: '#fd8d3c' }}>Feito com React + Vite</span>
        </div>
      </div>
    </section>
  )
}
