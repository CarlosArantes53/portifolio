import { useEffect, useMemo, useRef } from 'react'

/**
 * Smooth 60fps pointer parallax engine with idle ambient drift.
 * Exposes coordsRef ({ x, y } in [-1, 1]) and a subscribe() callback registry
 * so canvas and DOM elements animate without triggering React re-renders.
 */
export default function useParallax() {
  const coordsRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const subscribersRef = useRef(new Set())
  const lastPointerAtRef = useRef(0)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    const onPointerMove = (e) => {
      const vw = window.innerWidth || 1
      const vh = window.innerHeight || 1
      const nx = (e.clientX / vw) * 2 - 1
      const ny = (e.clientY / vh) * 2 - 1
      targetRef.current.x = Math.max(-1, Math.min(1, nx))
      targetRef.current.y = Math.max(-1, Math.min(1, ny))
      lastPointerAtRef.current = performance.now()
    }

    const onPointerLeave = () => {
      targetRef.current.x = 0
      targetRef.current.y = 0
      lastPointerAtRef.current = 0
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)

    let rafId = null
    const tick = (now) => {
      const idleElapsed = now - lastPointerAtRef.current
      const isIdle = lastPointerAtRef.current === 0 || idleElapsed > 3200

      let desiredX = targetRef.current.x
      let desiredY = targetRef.current.y

      if (isIdle && !prefersReduced) {
        const t = now * 0.001
        desiredX = Math.sin(t * 0.42) * 0.22
        desiredY = Math.cos(t * 0.31) * 0.16
      } else if (prefersReduced) {
        desiredX *= 0.25
        desiredY *= 0.25
      }

      const ease = prefersReduced ? 0.12 : 0.075
      coordsRef.current.x += (desiredX - coordsRef.current.x) * ease
      coordsRef.current.y += (desiredY - coordsRef.current.y) * ease

      const { x, y } = coordsRef.current
      subscribersRef.current.forEach((cb) => cb(x, y))

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [])

  return useMemo(
    () => ({
      coordsRef,
      subscribe(cb) {
        subscribersRef.current.add(cb)
        return () => subscribersRef.current.delete(cb)
      },
    }),
    []
  )
}
