import { useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'

const PROJECTS = [
  {
    title: 'CosmosView — NASA_MBA',
    description:
      'Blog de astronomia e exploração espacial com integração à NASA API (APOD, Earth, EPIC). Background 3D em Three.js, temas dark/light e roteamento SPA em React.',
    tags: ['React', 'Three.js', 'NASA API', 'Vite', 'Tailwind'],
    url: 'https://github.com/CarlosArantes53/NASA_MBA',
    demo: 'https://carlosarantes53.github.io/NASA_MBA/',
  },
  {
    title: 'Libras Inference — MediaPipe',
    description:
      'Reconhecimento em tempo real de sinais da Língua Brasileira de Sinais (Libras) usando MediaPipe Hands e modelos de classificação com OpenCV.',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'YOLO', 'CV'],
    url: 'https://github.com/CarlosArantes53/LibrasInferenciaMediapipeHands',
  },
  {
    title: 'MediaPipe Tests',
    description:
      'Coleção de experimentos com rastreamento de pose, mãos e rosto usando MediaPipe. Notebooks Jupyter com visualizações e análises de landmarks.',
    tags: ['Python', 'Jupyter', 'MediaPipe', 'NumPy'],
    url: 'https://github.com/CarlosArantes53/MediaPipe-tests',
  },
  {
    title: 'TTRPG Web Tools',
    description:
      'Ferramentas web para RPG de mesa: fichas de personagem cyberpunk e sistema de tabelas para D&D. Interface imersiva com HTML/CSS/JS puro.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/CarlosArantes53/Cyberpunk_ttrpg',
  },
  {
    title: 'Blender 3D Tools',
    description:
      'Scripts Python para automação no Blender: gerador de logos 3D, construtor de dados para poliedros e gerador de litofanias a partir de imagens.',
    tags: ['Python', 'Blender', 'Automação 3D'],
    url: 'https://github.com/CarlosArantes53/logo_3d_maker',
  },
  {
    title: 'TFC — Segmentação Geoespacial',
    description:
      'Trabalho final de curso: segmentação de imagens geoespaciais usando deep learning. Inferência sobre dados do satélite Copernicus com máscaras de rio.',
    tags: ['Python', 'Jupyter', 'Deep Learning', 'Geoespacial'],
    url: 'https://github.com/CarlosArantes53/TFC',
  },
]

export default function Projects() {
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
    <section id="projetos" className="py-32 px-6">
      <div ref={ref} className="fade-in-section max-w-6xl mx-auto">
        <p
          className="font-mono text-sm tracking-widest mb-4"
          style={{ color: '#818cf8', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {'// projetos'}
        </p>

        <h2
          className="font-syne font-bold text-4xl md:text-5xl mb-12"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          O que construí
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/CarlosArantes53?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm hover:underline transition-colors"
            style={{ color: '#7dd3fc', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Ver todos os repositórios →
          </a>
        </div>
      </div>
    </section>
  )
}
