import { useEffect, useRef } from 'react'
import { DEFAULT_COLORS } from '../hooks/useMoodPalette'

function parseRgba(str) {
  const m = str.match(/[\d.]+/g).map(Number)
  return { r: m[0], g: m[1], b: m[2], a: m[3] }
}

function lerp(a, b, t) { return a + (b - a) * t }

function lerpColor(from, to, t) {
  return {
    r: lerp(from.r, to.r, t),
    g: lerp(from.g, to.g, t),
    b: lerp(from.b, to.b, t),
    a: lerp(from.a, to.a, t),
  }
}

function toRgba({ r, g, b, a }) {
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a.toFixed(3)})`
}

class LiquidBubble {
  constructor(w, h, colors) {
    this.w = w
    this.h = h
    this.reset(colors)
  }

  reset(colors) {
    this.x = Math.random() * this.w
    this.y = Math.random() * this.h
    this.radius = Math.random() * 150 + 50
    this.speedX = (Math.random() - 0.5) * 1.5
    this.speedY = (Math.random() - 0.5) * 1.5
    const c = parseRgba(colors[Math.floor(Math.random() * colors.length)])
    this.current = { ...c }
    this.target = { ...c }
  }

  setTarget(colors) {
    this.target = parseRgba(colors[Math.floor(Math.random() * colors.length)])
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x + this.radius > this.w || this.x - this.radius < 0) this.speedX *= -1
    if (this.y + this.radius > this.h || this.y - this.radius < 0) this.speedY *= -1
    this.current = lerpColor(this.current, this.target, 0.012)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = toRgba(this.current)
    ctx.fill()
  }
}

export default function Background({ colors = DEFAULT_COLORS }) {
  const canvasRef = useRef(null)
  const bubblesRef = useRef(null)

  useEffect(() => {
    if (!bubblesRef.current) return
    bubblesRef.current.forEach(b => b.setTarget(colors))
  }, [colors])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    bubblesRef.current = Array.from(
      { length: 20 },
      () => new LiquidBubble(canvas.width, canvas.height, DEFAULT_COLORS)
    )

    let rafId
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.filter = 'blur(30px)'
      bubblesRef.current.forEach(b => { b.update(); b.draw(ctx) })
      ctx.filter = 'none'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      setSize()
      bubblesRef.current = Array.from(
        { length: 20 },
        () => new LiquidBubble(canvas.width, canvas.height, DEFAULT_COLORS)
      )
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        display: 'block',
      }}
    />
  )
}
