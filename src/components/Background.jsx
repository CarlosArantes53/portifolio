import { useEffect, useRef } from 'react'

const COLORS = [
  'rgba(0, 15, 60, 0.70)',
  'rgba(10, 40, 140, 0.60)',
  'rgba(25, 70, 210, 0.50)',
  'rgba(45, 0, 100, 0.65)',
  'rgba(85, 20, 190, 0.55)',
  'rgba(120, 55, 255, 0.45)',
]

class LiquidBubble {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.w
    this.y = Math.random() * this.h
    this.radius = Math.random() * 150 + 50
    this.speedX = (Math.random() - 0.5) * 1.5
    this.speedY = (Math.random() - 0.5) * 1.5
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x + this.radius > this.w || this.x - this.radius < 0) this.speedX *= -1
    if (this.y + this.radius > this.h || this.y - this.radius < 0) this.speedY *= -1
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    let bubbles = Array.from({ length: 20 }, () => new LiquidBubble(canvas.width, canvas.height))
    let rafId

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.filter = 'blur(30px)'
      bubbles.forEach(b => { b.update(); b.draw(ctx) })
      ctx.filter = 'none'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      setSize()
      bubbles = Array.from({ length: 20 }, () => new LiquidBubble(canvas.width, canvas.height))
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
