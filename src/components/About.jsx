import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="sobre" className="py-32 px-6">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto">
        <p
          className="font-mono text-sm tracking-widest mb-4"
          style={{ color: '#fd8d3c', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {'// sobre mim'}
        </p>

        <h2
          className="font-syne font-bold text-4xl md:text-5xl mb-8"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Quem sou eu
        </h2>

        <div className="grid md:grid-cols-2 gap-10 text-white/70 text-base leading-relaxed">
          <div>
            <p className="mb-4">
              Sou um desenvolvedor de software apaixonado por <span style={{ color: '#fed272' }}>Visão Computacional</span> e Inteligência Artificial.
              Trabalho com Python e JavaScript para construir soluções que vão de reconhecimento de linguagem de sinais com MediaPipe
              a blogs astronômicos com Three.js e NASA API.
            </p>
            <p>
              Tenho interesse em acessibilidade digital — com projetos voltados para comunicação em{' '}
              <span style={{ color: '#fed272' }}>Libras (Língua Brasileira de Sinais)</span> — e em ferramentas criativas
              para automação 3D com Blender e geração de conteúdo visual.
            </p>
          </div>
          <div>
            <p className="mb-4">
              No campo web, gosto de criar experiências imersivas com canvas, WebGL e animações. Meus projetos combinam
              técnica e estética, como o{' '}
              <a
                href="https://carlosarantes53.github.io/NASA_MBA/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fed272' }}
                className="hover:underline"
              >
                CosmosView
              </a>
              , um blog de astronomia interativo.
            </p>
            <p>
              Busco constantemente aprender e aplicar novas tecnologias, seja em ciência de dados, automação de processos
              ou desenvolvimento de ferramentas open-source.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
          {[
            { value: '22+', label: 'Repositórios' },
            { value: 'Python', label: 'Linguagem principal' },
            { value: 'CV & AI', label: 'Foco técnico' },
            { value: 'Open Source', label: 'Filosofia' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="border rounded-xl p-5 text-center"
              style={{ borderColor: 'rgba(254,210,114,0.2)', background: 'rgba(0,0,0,0.3)' }}
            >
              <p className="font-syne font-bold text-2xl mb-1" style={{ color: '#fed272', fontFamily: "'Syne', sans-serif" }}>
                {value}
              </p>
              <p className="text-white/50 text-xs font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
