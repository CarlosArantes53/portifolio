import { useEffect, useRef } from 'react'

const GALAXY_COLORS = [
  '255, 255, 255', // crisp white
  '186, 230, 253', // ice cyan (#bae6fd)
  '221, 214, 254', // soft lavender (#ddd6fe)
  '254, 243, 199', // warm starlight (#fef3c7)
]

const SOLAR_PARTICLE_COLORS = [
  '245, 158, 11', // solar gold (#f59e0b)
  '234, 88, 12',  // coronal orange (#ea580c)
  '217, 119, 6',  // intense amber (#d97706)
  '220, 68, 38',  // solar flare crimson-orange (#dc4426)
  '180, 83, 9',   // copper ember (#b45309)
]

function createGaussianGlowSprite(r, g, b, size = 256) {
  const sprite = document.createElement('canvas')
  sprite.width = size
  sprite.height = size
  const sctx = sprite.getContext('2d')
  if (!sctx) return sprite

  const half = size * 0.5
  const grad = sctx.createRadialGradient(half, half, 0, half, half, half)
  const stops = 11
  for (let i = 0; i <= stops; i++) {
    const u = i / stops
    const alpha = i === stops ? 0 : Math.exp(-4.8 * u * u)
    grad.addColorStop(u, `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(4)})`)
  }
  sctx.fillStyle = grad
  sctx.fillRect(0, 0, size, size)
  return sprite
}

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

function createSolarWindParticles(maxRadius) {
  const layers = [
    { count: 65, depth: 0.3, speed: 0.42, sizeMin: 1.0, sizeMax: 2.0 },
    { count: 60, depth: 0.65, speed: 0.78, sizeMin: 1.3, sizeMax: 2.7 },
    { count: 50, depth: 1.05, speed: 1.22, sizeMin: 1.8, sizeMax: 3.4 },
  ]
  const particles = []
  for (const layer of layers) {
    for (let i = 0; i < layer.count; i++) {
      const color = SOLAR_PARTICLE_COLORS[Math.floor(Math.random() * SOLAR_PARTICLE_COLORS.length)]
      particles.push({
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.0028,
        radius: 18 + Math.random() * maxRadius,
        maxRadius,
        depth: layer.depth,
        baseSpeed: layer.speed * (0.75 + Math.random() * 0.55),
        size: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
        color,
        alpha: 0.38 + Math.random() * 0.48,
        phase: Math.random() * Math.PI * 2,
        waveFreq: 1.2 + Math.random() * 1.8,
        waveAmp: 0.05 + Math.random() * 0.14,
        glowSpriteKey: Math.random() > 0.45 ? 'gold' : 'amber',
      })
    }
  }
  return particles
}

function createSolarHalos() {
  const spriteKeys = ['gold', 'amber', 'flareOrange', 'whiteGold', 'gold', 'amber', 'flareOrange', 'gold']
  const halos = []
  for (let i = 0; i < 8; i++) {
    halos.push({
      spriteKey: spriteKeys[i],
      aspectX: 1.15 + Math.random() * 0.8,
      aspectY: 0.68 + Math.random() * 0.57,
      radiusFactor: 0.42 + (i % 4) * 0.13 + Math.random() * 0.08,
      offsetAngle: (i / 8) * Math.PI * 2 + Math.random() * 0.5,
      offsetDistFactor: 0.02 + Math.random() * 0.06,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (i % 2 === 0 ? 1 : -1) * (0.015 + Math.random() * 0.025),
      pulseSpeed: 0.35 + Math.random() * 0.45,
      pulsePhase: Math.random() * Math.PI * 2,
      alpha: 0.11 + Math.random() * 0.15,
    })
  }
  return halos
}

function randomizeStormPlume(plume, initialProgress = 0) {
  const paletteCycle = ['gold', 'amber', 'flareOrange', 'crimsonGlow']
  plume.angle = Math.random() * Math.PI * 2
  plume.curl = (Math.random() > 0.5 ? 1 : -1) * (0.14 + Math.random() * 0.31)
  plume.waveFreq = 1.4 + Math.random() * 1.8
  plume.waveAmp = 0.04 + Math.random() * 0.09
  plume.wavePhase = Math.random() * Math.PI * 2
  plume.reach = 0.62 + Math.random() * 0.52
  plume.widthScale = 0.78 + Math.random() * 0.58
  plume.speed = 0.04 + Math.random() * 0.045
  plume.progress = initialProgress
  plume.alpha = 0.2 + Math.random() * 0.14
  plume.puffs = Array.from({ length: 5 }, (_, idx) => ({
    longOffset: -idx * 0.085 + (Math.random() - 0.5) * 0.03,
    crossOffset: (Math.random() - 0.5) * 0.1,
    sizeFactor: 0.72 + idx * 0.22 + Math.random() * 0.15,
    spriteKey: paletteCycle[Math.min(paletteCycle.length - 1, Math.floor(idx * 0.85))],
    alphaWeight: 1 - idx * 0.13,
  }))
  return plume
}

function createSolarStormPlumes() {
  return Array.from({ length: 12 }, (_, i) => {
    const initialProgress = ((i / 12) + Math.random() * 0.06) % 1
    return randomizeStormPlume({}, initialProgress)
  })
}

function createSolarProminences() {
  const spriteKeys = ['gold', 'amber', 'flareOrange', 'amber', 'gold']
  return Array.from({ length: 5 }, (_, i) => ({
    baseAngle: (i / 5) * Math.PI * 2 + Math.random() * 0.45,
    driftSpeed: (i % 2 === 0 ? 1 : -1) * (0.018 + Math.random() * 0.022),
    span: 0.48 + Math.random() * 0.44,
    innerFactor: 0.16 + Math.random() * 0.06,
    peakFactor: 0.27 + Math.random() * 0.11,
    waveSpeed: 0.6 + Math.random() * 0.7,
    wavePhase: Math.random() * Math.PI * 2,
    alpha: 0.14 + Math.random() * 0.1,
    spriteKey: spriteKeys[i],
    nodeCount: 9,
  }))
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
    let solarWindParticles = createSolarWindParticles(maxRadius)
    const solarSprites = {
      whiteGold: createGaussianGlowSprite(255, 251, 230, 256),
      gold: createGaussianGlowSprite(251, 191, 36, 256),
      amber: createGaussianGlowSprite(249, 115, 22, 256),
      flareOrange: createGaussianGlowSprite(234, 88, 12, 256),
      crimsonGlow: createGaussianGlowSprite(220, 68, 38, 256),
    }
    const solarHalos = createSolarHalos()
    const solarStormPlumes = createSolarStormPlumes()
    const solarProminences = createSolarProminences()
    const nebulae = createNebulae()
    const shootingStars = []
    let nextShootAt = performance.now() + 2600 + Math.random() * 2500

    let blend = themeRef.current === 'light' ? 1 : 0
    let lastTime = performance.now()
    let rafId = null

    const onResize = () => {
      setSize()
      stars = createStars(width, height)
      solarWindParticles = createSolarWindParticles(maxRadius)
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

    const drawSun = (dt, t, px, py, opacity) => {
      ctx.save()
      ctx.globalAlpha = opacity

      const cx = width * 0.5 + px * 14
      const cy = height * 0.5 + py * 14
      const minDim = Math.min(width, height)

      const stampGlow = (sprite, x, y, rx, ry, rotation, localAlpha) => {
        if (localAlpha <= 0.002) return
        ctx.save()
        ctx.globalAlpha = opacity * localAlpha
        ctx.translate(x, y)
        if (rotation) ctx.rotate(rotation)
        ctx.drawImage(sprite, -rx, -ry, rx * 2, ry * 2)
        ctx.restore()
      }

      // 1. Warm luminous solar atmosphere backdrop
      const bgGrad = ctx.createRadialGradient(cx, cy, 12, cx, cy, maxRadius * 1.15)
      bgGrad.addColorStop(0, '#fffef7')
      bgGrad.addColorStop(0.24, '#fff7e0')
      bgGrad.addColorStop(0.52, '#ffecd1')
      bgGrad.addColorStop(0.78, '#fde0be')
      bgGrad.addColorStop(1, '#f8d5b0')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // 2. Diffuse asymmetric solar halos (overlapping Gaussian layers, no geometric borders)
      for (const halo of solarHalos) {
        const animTime = prefersReduced ? 0 : t
        const pulse = 1 + Math.sin(animTime * halo.pulseSpeed + halo.pulsePhase) * 0.09
        const baseR = minDim * halo.radiusFactor * pulse
        const rot = halo.rotation + animTime * halo.rotSpeed
        const driftAngle = halo.offsetAngle + animTime * 0.03
        const offsetDist = minDim * halo.offsetDistFactor
        const hx = cx + Math.cos(driftAngle) * offsetDist + px * 10
        const hy = cy + Math.sin(driftAngle) * offsetDist + py * 10
        stampGlow(
          solarSprites[halo.spriteKey],
          hx,
          hy,
          baseR * halo.aspectX,
          baseR * halo.aspectY,
          rot,
          halo.alpha
        )
      }

      // 3. Solar storms / CME plumes (organic curved multi-puff eruptions)
      for (const plume of solarStormPlumes) {
        if (!prefersReduced) {
          plume.progress += plume.speed * dt
          if (plume.progress >= 1) {
            randomizeStormPlume(plume, 0)
          }
        }

        const envelope = Math.pow(Math.sin(plume.progress * Math.PI), 1.15)
        if (envelope <= 0.005) continue

        for (const puff of plume.puffs) {
          const u = Math.max(0.02, Math.min(1, plume.progress + puff.longOffset))
          const radialDist = minDim * 0.06 + u * maxRadius * plume.reach
          const wave = Math.sin(u * Math.PI * plume.waveFreq + plume.wavePhase) * plume.waveAmp
          const localAngle = plume.angle + plume.curl * u * u + wave + puff.crossOffset * (0.4 + u)

          const x = cx + Math.cos(localAngle) * radialDist + px * (16 + u * 24)
          const y = cy + Math.sin(localAngle) * radialDist + py * (16 + u * 24)

          const puffSpread = minDim * (0.09 + u * 0.24) * plume.widthScale * puff.sizeFactor
          const stretchAlong = puffSpread * (1.28 + u * 0.55)
          const localAlpha = plume.alpha * envelope * puff.alphaWeight

          stampGlow(
            solarSprites[puff.spriteKey],
            x,
            y,
            stretchAlong,
            puffSpread,
            localAngle,
            localAlpha
          )
        }
      }

      // 4. Soft coronal prominences (undulating magnetic plasma arcs built from Gaussian nodes)
      for (const prom of solarProminences) {
        const animTime = prefersReduced ? 0 : t
        const centerAngle = prom.baseAngle + animTime * prom.driftSpeed

        for (let n = 0; n < prom.nodeCount; n++) {
          const u = n / (prom.nodeCount - 1)
          const arcShape = Math.sin(u * Math.PI)
          const harmonic =
            Math.sin(u * Math.PI * 2.5 + animTime * prom.waveSpeed + prom.wavePhase) * 0.032
          const a = centerAngle + (u - 0.5) * prom.span
          const r = minDim * (prom.innerFactor + (prom.peakFactor - prom.innerFactor) * arcShape + harmonic)

          const nx = cx + Math.cos(a) * r + px * 18
          const ny = cy + Math.sin(a) * r + py * 18
          const nodeRadius = minDim * (0.065 + arcShape * 0.065)
          const nodeAlpha = prom.alpha * (0.35 + 0.65 * arcShape)

          stampGlow(
            solarSprites[prom.spriteKey],
            nx,
            ny,
            nodeRadius * 1.35,
            nodeRadius * 0.85,
            a + Math.PI * 0.5,
            nodeAlpha
          )
        }
      }

      // 5. Diffuse pulsating solar core (overlapping offset sprites, no geometric disc)
      const coreTime = prefersReduced ? 0 : t
      const coreLayers = [
        { key: 'gold', ox: -0.025, oy: 0.015, scale: 0.34, speed: 0.9, phase: 0, alpha: 0.42 },
        { key: 'whiteGold', ox: 0.02, oy: -0.02, scale: 0.28, speed: 1.25, phase: 2.1, alpha: 0.62 },
        { key: 'whiteGold', ox: 0, oy: 0.01, scale: 0.21, speed: 1.55, phase: 4.2, alpha: 0.55 },
      ]
      for (const cl of coreLayers) {
        const breathe = 1 + Math.sin(coreTime * cl.speed + cl.phase) * 0.075
        const cr = minDim * cl.scale * breathe
        stampGlow(
          solarSprites[cl.key],
          cx + minDim * cl.ox,
          cy + minDim * cl.oy,
          cr * 1.12,
          cr * 0.96,
          coreTime * 0.08 + cl.phase,
          cl.alpha
        )
      }

      // 6. Curved, turbulent solar wind particles
      for (const p of solarWindParticles) {
        if (!prefersReduced) {
          const speedBoost = 1 + (p.radius / p.maxRadius) * 1.9
          p.radius += p.baseSpeed * speedBoost * dt * 60
          p.angle += p.spin * dt * 60
          if (p.radius > p.maxRadius + 24) {
            p.radius = 18 + Math.random() * 36
            p.angle = Math.random() * Math.PI * 2
          }
        }

        const normR = Math.min(1, p.radius / p.maxRadius)
        const flowPhase = prefersReduced ? p.phase : t * 0.75 + p.phase
        const waveOffset = Math.sin(normR * Math.PI * p.waveFreq + flowPhase) * p.waveAmp
        const curvedAngle = p.angle + normR * 0.28 + waveOffset

        const perspectiveScale = 0.55 + normR * 0.9
        const x = cx + Math.cos(curvedAngle) * p.radius + px * p.depth * 62
        const y = cy + Math.sin(curvedAngle) * p.radius + py * p.depth * 62

        // Fade near core so center text stays crisp, and fade smoothly at outer rim
        const coreClearance = Math.min(1, Math.max(0, (p.radius - 48) / 95))
        const outerFade = normR > 0.8 ? (1 - normR) / 0.2 : 1
        const particleAlpha = Math.max(0, p.alpha * coreClearance * outerFade)

        if (particleAlpha <= 0.01) continue

        if (p.depth >= 0.65) {
          const haloR = p.size * perspectiveScale * 3.4
          stampGlow(solarSprites[p.glowSpriteKey], x, y, haloR, haloR, 0, particleAlpha * 0.26)
        }

        // Subtle curved solar wind trail along local flow tangent
        const tangentAngle = curvedAngle + Math.cos(normR * Math.PI * p.waveFreq + flowPhase) * p.waveAmp * 1.2
        const tailLen = (6 + normR * 17) * p.depth
        const tx = x - Math.cos(tangentAngle) * tailLen
        const ty = y - Math.sin(tangentAngle) * tailLen
        const trailGrad = ctx.createLinearGradient(x, y, tx, ty)
        trailGrad.addColorStop(0, `rgba(${p.color}, ${particleAlpha * 0.58})`)
        trailGrad.addColorStop(1, `rgba(${p.color}, 0)`)

        ctx.strokeStyle = trailGrad
        ctx.lineWidth = Math.max(0.8, p.size * 0.58 * perspectiveScale)
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        // Warm ionized plasma mote
        ctx.fillStyle = `rgba(${p.color}, ${particleAlpha})`
        ctx.beginPath()
        ctx.arc(x, y, p.size * perspectiveScale, 0, Math.PI * 2)
        ctx.fill()
      }

      // 7. Soft warm solar readability cushion directly behind central Hero typography
      const cushionRadius = minDim * 0.29
      const heroCushion = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        cushionRadius
      )
      heroCushion.addColorStop(0, 'rgba(255, 253, 245, 0.78)')
      heroCushion.addColorStop(0.65, 'rgba(255, 248, 228, 0.30)')
      heroCushion.addColorStop(1, 'rgba(255, 246, 220, 0)')
      ctx.fillStyle = heroCushion
      ctx.beginPath()
      ctx.arc(width * 0.5, height * 0.5, cushionRadius, 0, Math.PI * 2)
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
        grad.addColorStop(0.5, `rgba(255, 251, 235, ${alpha})`)
        grad.addColorStop(0.72, `rgba(251, 191, 36, ${alpha * 0.85})`)
        grad.addColorStop(0.88, `rgba(234, 88, 12, ${alpha * 0.55})`)
        grad.addColorStop(1, 'rgba(234, 88, 12, 0)')
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
        drawSun(dt, t, px, py, blend)
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
