import { useEffect, useRef } from 'react'

const GALAXY_COLORS = [
  '255, 255, 255', // crisp white
  '186, 230, 253', // ice cyan (#bae6fd)
  '221, 214, 254', // soft lavender (#ddd6fe)
  '254, 243, 199', // warm starlight (#fef3c7)
]

const WHITE_DWARF_COLORS = [
  '2, 132, 199',   // ionized azure (#0284c7)
  '79, 70, 229',   // deep cosmic indigo (#4f46e5)
  '217, 119, 6',   // incandescent gold (#d97706)
  '234, 88, 12',   // plasma coral (#ea580c)
  '100, 116, 139', // slate-silver speck (#64748b)
]

function createStars(width, height) {
  const layers = [
    { count: 145, depth: 0.2, minSize: 0.55, maxSize: 1.25, speed: 0.04 },
    { count: 100, depth: 0.5, minSize: 0.9, maxSize: 1.85, speed: 0.09 },
    { count: 55, depth: 1.0, minSize: 1.3, maxSize: 2.6, speed: 0.16 },
  ]
  const stars = []
  for (const layer of layers) {
    for (let i = 0; i < layer.count; i++) {
      const color = GALAXY_COLORS[Math.floor(Math.random() * GALAXY_COLORS.length)]
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        depth: layer.depth,
        size: layer.minSize + Math.random() * (layer.maxSize - layer.minSize),
        vx: (Math.random() - 0.5) * layer.speed,
        vy: (Math.random() - 0.35) * layer.speed,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.8 + Math.random() * 2.2,
        baseAlpha: 0.35 + Math.random() * 0.65,
        color,
        sparkle: layer.depth === 1.0 && Math.random() > 0.62,
      })
    }
  }
  return stars
}

function createBigBangParticles(maxRadius) {
  const layers = [
    { count: 80, depth: 0.3, speed: 0.45, sizeMin: 1.0, sizeMax: 2.0 },
    { count: 75, depth: 0.65, speed: 0.85, sizeMin: 1.3, sizeMax: 2.7 },
    { count: 55, depth: 1.1, speed: 1.35, sizeMin: 1.8, sizeMax: 3.6 },
  ]
  const particles = []
  for (const layer of layers) {
    for (let i = 0; i < layer.count; i++) {
      const color = WHITE_DWARF_COLORS[Math.floor(Math.random() * WHITE_DWARF_COLORS.length)]
      particles.push({
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.0022,
        radius: 14 + Math.random() * maxRadius,
        maxRadius,
        depth: layer.depth,
        baseSpeed: layer.speed * (0.75 + Math.random() * 0.6),
        size: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
        color,
        alpha: 0.45 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      })
    }
  }
  return particles
}

function createNebulae() {
  return [
    { rx: 0.24, ry: 0.28, radiusFactor: 0.42, color: '79, 70, 229', alpha: 0.14, phase: 0.2 },
    { rx: 0.76, ry: 0.34, radiusFactor: 0.38, color: '14, 116, 144', alpha: 0.12, phase: 2.1 },
    { rx: 0.52, ry: 0.76, radiusFactor: 0.45, color: '124, 58, 237', alpha: 0.11, phase: 4.3 },
  ]
}

export default function CosmicBackground({ theme, parallax }) {
  const canvasRef = useRef(null)
  const themeRef = useRef(theme)
  const shockwaveRef = useRef({ active: false, progress: 0, toLight: theme === 'light' })
  const isFirstMountRef = useRef(true)

  useEffect(() => {
    themeRef.current = theme
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false
      return
    }
    shockwaveRef.current = {
      active: true,
      progress: 0,
      toLight: theme === 'light',
    }
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let maxRadius = Math.hypot(width * 0.55, height * 0.55)

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      maxRadius = Math.hypot(width * 0.55, height * 0.55)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()

    let stars = createStars(width, height)
    let bigBangParticles = createBigBangParticles(maxRadius)
    const nebulae = createNebulae()
    const shootingStars = []
    let nextShootAt = performance.now() + 2600 + Math.random() * 2500

    let blend = themeRef.current === 'light' ? 1 : 0
    let lastTime = performance.now()
    let rafId = null

    const onResize = () => {
      setSize()
      stars = createStars(width, height)
      bigBangParticles = createBigBangParticles(maxRadius)
    }
    window.addEventListener('resize', onResize)

    const drawGalaxy = (dt, t, px, py, opacity) => {
      ctx.save()
      ctx.globalAlpha = opacity

      // Deep space backdrop
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + px * 16,
        height * 0.45 + py * 16,
        width * 0.05,
        width * 0.5,
        height * 0.5,
        maxRadius * 1.15
      )
      bgGrad.addColorStop(0, '#090f22')
      bgGrad.addColorStop(0.55, '#050814')
      bgGrad.addColorStop(1, '#020308')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Drifting soft nebulae
      for (const neb of nebulae) {
        const nx = width * neb.rx + Math.sin(t * 0.14 + neb.phase) * 28 + px * 14
        const ny = height * neb.ry + Math.cos(t * 0.12 + neb.phase) * 22 + py * 14
        const rad = Math.min(width, height) * neb.radiusFactor
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, rad)
        g.addColorStop(0, `rgba(${neb.color}, ${neb.alpha})`)
        g.addColorStop(0.55, `rgba(${neb.color}, ${neb.alpha * 0.35})`)
        g.addColorStop(1, `rgba(${neb.color}, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(nx, ny, rad, 0, Math.PI * 2)
        ctx.fill()
      }

      // 3-layer twinkling parallax starfield
      for (const s of stars) {
        if (!prefersReduced) {
          s.x += s.vx * dt * 60
          s.y += s.vy * dt * 60
          if (s.x < -20) s.x = width + 20
          if (s.x > width + 20) s.x = -20
          if (s.y < -20) s.y = height + 20
          if (s.y > height + 20) s.y = -20
        }

        const sx = s.x + px * s.depth * 56
        const sy = s.y + py * s.depth * 56
        const twinkle = prefersReduced
          ? 1
          : 0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.phase)
        const alpha = Math.min(1, s.baseAlpha * twinkle)

        if (s.depth >= 0.5) {
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size * 4.2)
          glow.addColorStop(0, `rgba(${s.color}, ${alpha * 0.65})`)
          glow.addColorStop(1, `rgba(${s.color}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(sx, sy, s.size * 4.2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(${s.color}, ${alpha})`
        ctx.beginPath()
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2)
        ctx.fill()

        // 4-point diffraction spikes on bright foreground stars
        if (s.sparkle && alpha > 0.62) {
          const spikeLen = s.size * 4.6
          ctx.strokeStyle = `rgba(${s.color}, ${alpha * 0.55})`
          ctx.lineWidth = 0.85
          ctx.beginPath()
          ctx.moveTo(sx - spikeLen, sy)
          ctx.lineTo(sx + spikeLen, sy)
          ctx.moveTo(sx, sy - spikeLen)
          ctx.lineTo(sx, sy + spikeLen)
          ctx.stroke()
        }
      }

      // Periodic shooting stars
      const now = performance.now()
      if (!prefersReduced && now >= nextShootAt) {
        nextShootAt = now + 3400 + Math.random() * 3400
        const fromLeft = Math.random() > 0.35
        const startX = fromLeft ? Math.random() * width * 0.65 : width * (0.35 + Math.random() * 0.6)
        const startY = Math.random() * height * 0.45
        const angle = fromLeft ? 0.42 + Math.random() * 0.3 : Math.PI - (0.42 + Math.random() * 0.3)
        const speed = 780 + Math.random() * 420
        shootingStars.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          len: 105 + Math.random() * 65,
          life: 0,
          maxLife: 0.72 + Math.random() * 0.35,
        })
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i]
        st.life += dt
        if (st.life >= st.maxLife) {
          shootingStars.splice(i, 1)
          continue
        }
        st.x += st.vx * dt
        st.y += st.vy * dt
        const p = st.life / st.maxLife
        const fade = p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75
        const mag = Math.hypot(st.vx, st.vy)
        const tx = st.x - (st.vx / mag) * st.len
        const ty = st.y - (st.vy / mag) * st.len

        const lineGrad = ctx.createLinearGradient(st.x, st.y, tx, ty)
        lineGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * fade})`)
        lineGrad.addColorStop(0.35, `rgba(125, 211, 252, ${0.55 * fade})`)
        lineGrad.addColorStop(1, 'rgba(125, 211, 252, 0)')

        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.moveTo(st.x, st.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`
        ctx.beginPath()
        ctx.arc(st.x, st.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const drawWhiteDwarf = (dt, t, px, py, opacity) => {
      ctx.save()
      ctx.globalAlpha = opacity

      const cx = width * 0.5 + px * 14
      const cy = height * 0.5 + py * 14

      // Luminous high-key porcelain-cosmos backdrop
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, maxRadius * 1.15)
      bgGrad.addColorStop(0, '#ffffff')
      bgGrad.addColorStop(0.28, '#f5f9ff')
      bgGrad.addColorStop(0.58, '#eef3ff')
      bgGrad.addColorStop(0.82, '#fff7ed')
      bgGrad.addColorStop(1, '#e2e8f8')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Subtle rotating volumetric rays from the White Dwarf core
      const rayCount = 10
      const baseAngle = prefersReduced ? 0 : t * 0.045
      for (let i = 0; i < rayCount; i++) {
        const a = baseAngle + (i / rayCount) * Math.PI * 2
        const spread = 0.09
        const rayLen = maxRadius * 1.05
        const rayGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, rayLen)
        const isWarm = i % 2 === 0
        rayGrad.addColorStop(0, isWarm ? 'rgba(251, 191, 36, 0.10)' : 'rgba(56, 189, 248, 0.10)')
        rayGrad.addColorStop(0.45, isWarm ? 'rgba(251, 191, 36, 0.035)' : 'rgba(99, 102, 241, 0.035)')
        rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = rayGrad
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(a - spread) * rayLen, cy + Math.sin(a - spread) * rayLen)
        ctx.lineTo(cx + Math.cos(a + spread) * rayLen, cy + Math.sin(a + spread) * rayLen)
        ctx.closePath()
        ctx.fill()
      }

      // Pulsating White Dwarf Singularity corona behind center hero
      const pulse = prefersReduced ? 1 : 1 + Math.sin(t * 1.4) * 0.06
      const outerCoronaRadius = Math.min(width, height) * 0.42 * pulse
      const outerCorona = ctx.createRadialGradient(cx, cy, 12, cx, cy, outerCoronaRadius)
      outerCorona.addColorStop(0, 'rgba(255, 255, 255, 0.96)')
      outerCorona.addColorStop(0.24, 'rgba(125, 211, 252, 0.24)')
      outerCorona.addColorStop(0.52, 'rgba(251, 191, 36, 0.14)')
      outerCorona.addColorStop(0.78, 'rgba(99, 102, 241, 0.06)')
      outerCorona.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = outerCorona
      ctx.beginPath()
      ctx.arc(cx, cy, outerCoronaRadius, 0, Math.PI * 2)
      ctx.fill()

      // Continuous Big Bang inflation rings expanding outward
      const ringCount = 4
      for (let i = 0; i < ringCount; i++) {
        const phase = prefersReduced ? (i + 0.35) / ringCount : (t * 0.16 + i / ringCount) % 1
        const ringRadius = 36 + phase * maxRadius * 0.95
        const ringAlpha = Math.sin(phase * Math.PI) * 0.24
        ctx.strokeStyle = i % 2 === 0 ? `rgba(2, 132, 199, ${ringAlpha})` : `rgba(217, 119, 6, ${ringAlpha * 0.85})`
        ctx.lineWidth = 1.25 - phase * 0.55
        ctx.beginPath()
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Outward-expanding Big Bang / stellar wind particles
      for (const p of bigBangParticles) {
        if (!prefersReduced) {
          const speedBoost = 1 + (p.radius / p.maxRadius) * 2.1
          p.radius += p.baseSpeed * speedBoost * dt * 60
          p.angle += p.spin * dt * 60
          if (p.radius > p.maxRadius + 24) {
            p.radius = 16 + Math.random() * 34
            p.angle = Math.random() * Math.PI * 2
          }
        }

        const normR = Math.min(1, p.radius / p.maxRadius)
        const perspectiveScale = 0.55 + normR * 0.95
        const x = cx + Math.cos(p.angle) * p.radius + px * p.depth * 62
        const y = cy + Math.sin(p.angle) * p.radius + py * p.depth * 62

        // Fade near core so center text stays crisp, and fade smoothly at outer rim
        const coreClearance = Math.min(1, Math.max(0, (p.radius - 45) / 95))
        const outerFade = normR > 0.8 ? (1 - normR) / 0.2 : 1
        const particleAlpha = Math.max(0, p.alpha * coreClearance * outerFade)

        if (particleAlpha <= 0.01) continue

        // Subtle radial velocity trail on mid/outer fast particles
        const tailLen = (6 + normR * 18) * p.depth
        const tx = x - Math.cos(p.angle) * tailLen
        const ty = y - Math.sin(p.angle) * tailLen
        const trailGrad = ctx.createLinearGradient(x, y, tx, ty)
        trailGrad.addColorStop(0, `rgba(${p.color}, ${particleAlpha * 0.65})`)
        trailGrad.addColorStop(1, `rgba(${p.color}, 0)`)

        ctx.strokeStyle = trailGrad
        ctx.lineWidth = Math.max(0.8, p.size * 0.6 * perspectiveScale)
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        // Iridescent particle core
        ctx.fillStyle = `rgba(${p.color}, ${particleAlpha})`
        ctx.beginPath()
        ctx.arc(x, y, p.size * perspectiveScale, 0, Math.PI * 2)
        ctx.fill()
      }

      // Soft pure-white readability cushion directly behind central Hero typography
      const heroCushion = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.28
      )
      heroCushion.addColorStop(0, 'rgba(255, 255, 255, 0.72)')
      heroCushion.addColorStop(0.65, 'rgba(255, 255, 255, 0.28)')
      heroCushion.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = heroCushion
      ctx.beginPath()
      ctx.arc(width * 0.5, height * 0.5, Math.min(width, height) * 0.28, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawShockwave = (dt) => {
      const sw = shockwaveRef.current
      if (!sw.active) return

      sw.progress += dt / 0.75
      if (sw.progress >= 1) {
        sw.active = false
        sw.progress = 0
        return
      }

      const easeOut = 1 - Math.pow(1 - sw.progress, 3)
      const cx = width * 0.5
      const cy = height * 0.5
      const r = 16 + easeOut * maxRadius * 1.25
      const alpha = (1 - sw.progress) * 0.7

      ctx.save()
      const grad = ctx.createRadialGradient(cx, cy, Math.max(0, r - 48), cx, cy, r + 20)
      if (sw.toLight) {
        grad.addColorStop(0, 'rgba(251, 191, 36, 0)')
        grad.addColorStop(0.55, `rgba(255, 255, 255, ${alpha})`)
        grad.addColorStop(0.78, `rgba(56, 189, 248, ${alpha * 0.75})`)
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)')
      } else {
        grad.addColorStop(0, 'rgba(99, 102, 241, 0)')
        grad.addColorStop(0.6, `rgba(129, 140, 248, ${alpha * 0.8})`)
        grad.addColorStop(0.85, `rgba(125, 211, 252, ${alpha * 0.55})`)
        grad.addColorStop(1, 'rgba(125, 211, 252, 0)')
      }
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, r + 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const render = (now) => {
      const dt = Math.min(0.05, (now - lastTime) * 0.001)
      lastTime = now
      const t = now * 0.001

      const targetBlend = themeRef.current === 'light' ? 1 : 0
      blend += (targetBlend - blend) * (prefersReduced ? 0.35 : 0.065)
      if (Math.abs(targetBlend - blend) < 0.002) blend = targetBlend

      const { x: px, y: py } = parallax.coordsRef.current

      ctx.clearRect(0, 0, width, height)

      if (blend < 0.995) {
        drawGalaxy(dt, t, px, py, 1 - blend)
      }
      if (blend > 0.005) {
        drawWhiteDwarf(dt, t, px, py, blend)
      }

      drawShockwave(dt)

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [parallax])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
