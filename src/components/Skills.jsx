import { useEffect, useRef } from 'react'

const SKILLS = [
  { name: 'Python', level: 95 },
  { name: 'JavaScript', level: 80 },
  { name: 'React', level: 75 },
  { name: 'MediaPipe', level: 90 },
  { name: 'OpenCV', level: 85 },
  { name: 'YOLO', level: 80 },
  { name: 'Three.js', level: 65 },
  { name: 'Blender', level: 70 },
  { name: 'Jupyter', level: 90 },
  { name: 'Tailwind CSS', level: 75 },
  { name: 'Vite', level: 70 },
  { name: 'HTML/CSS', level: 85 },
]

const CATEGORIES = [
  {
    title: 'Visão Computacional & IA',
    items: ['Python', 'MediaPipe', 'OpenCV', 'YOLO', 'Jupyter', 'NumPy'],
  },
  {
    title: 'Web & Frontend',
    items: ['JavaScript', 'React', 'Three.js', 'HTML/CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    title: '3D & Automação',
    items: ['Blender', 'Python Scripts', 'Power BI', 'PDF Processing', 'Git'],
  },
]

export default function Skills() {
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
    <section id="skills" className="py-32 px-6">
      <div ref={ref} className="fade-in-section max-w-6xl mx-auto">
        <p
          className="font-mono text-sm tracking-widest mb-4"
          style={{ color: '#818cf8', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {'// habilidades'}
        </p>

        <h2
          className="font-syne font-bold text-4xl md:text-5xl mb-12"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Stack técnico
        </h2>

        {/* Skill bars */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {SKILLS.map(({ name, level }) => (
            <div key={name}>
              <div className="flex justify-between mb-1">
                <span
                  className="font-mono text-sm text-white/70"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {name}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: '#7dd3fc', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {level}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${level}%`,
                    background: 'linear-gradient(90deg, #6366f1, #7dd3fc)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Category cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map(({ title, items }) => (
            <div
              key={title}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(125,211,252,0.12)',
              }}
            >
              <h3
                className="font-syne font-semibold mb-4 text-base"
                style={{ color: '#7dd3fc', fontFamily: "'Syne', sans-serif" }}
              >
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
