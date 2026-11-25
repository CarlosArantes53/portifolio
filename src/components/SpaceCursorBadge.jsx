import { useEffect, useRef, useState } from 'preact/hooks'

export default function SpaceCursorBadge({ theme, hidden }) {
  const badgeRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const pointerRef = useRef({ x: -200, y: -200 })
  const currentRef = useRef({ x: -200, y: -200 })
  const overInteractiveRef = useRef(false)
  const insideRef = useRef(false)
  const hiddenRef = useRef(hidden)
  const startAnimRef = useRef(() => {})

  useEffect(() => {
    hiddenRef.current = hidden
    if (hidden) {
      setVisible(false)
    } else if (insideRef.current && !overInteractiveRef.current) {
      setVisible(true)
      startAnimRef.current()
    }
  }, [hidden])

  useEffect(() => {
    const finePointer = window.matchMedia?.('(pointer: fine)')?.matches
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!finePointer || reducedMotion) return
    setEnabled(true)

    let rafId = null

    const stopAnimate = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    const animate = () => {
      if (hiddenRef.current || document.hidden || !insideRef.current) {
        rafId = null
        return
      }
      const dx = pointerRef.current.x - currentRef.current.x
      const dy = pointerRef.current.y - currentRef.current.y
      currentRef.current.x += dx * 0.18
      currentRef.current.y += dy * 0.18

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${(currentRef.current.x + 18).toFixed(1)}px, ${(
          currentRef.current.y + 18
        ).toFixed(1)}px, 0)`
      }

      if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25) {
        rafId = null
        return
      }
      rafId = requestAnimationFrame(animate)
    }

    const startAnimate = () => {
      if (rafId === null && !hiddenRef.current && !document.hidden && insideRef.current) {
        rafId = requestAnimationFrame(animate)
      }
    }
    startAnimRef.current = startAnimate

    const onMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY }
      if (!insideRef.current) {
        currentRef.current = { x: e.clientX, y: e.clientY }
      }
      insideRef.current = true
      const interactive = e.target?.closest?.(
        'button, a, input, textarea, [role="button"], [role="switch"]'
      )
      overInteractiveRef.current = Boolean(interactive)
      setVisible(!overInteractiveRef.current && !hiddenRef.current)
      startAnimate()
    }

    const onLeave = () => {
      insideRef.current = false
      setVisible(false)
      stopAnimate()
    }

    const onVisibilityChange = () => {
      if (document.hidden) stopAnimate()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stopAnimate()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  if (!enabled) return null

  const isDark = theme === 'dark'

  return (
    <div
      ref={badgeRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-40 hidden lg:flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium shadow-md transition-opacity duration-200 ${
        visible ? 'opacity-90' : 'opacity-0'
      } ${
        isDark
          ? 'bg-white/15 text-white backdrop-blur-md border border-white/20'
          : 'bg-stone-900/85 text-amber-50 backdrop-blur-md border border-amber-900/20'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isDark ? 'bg-sky-400' : 'bg-amber-400'}`} />
      <span>Você</span>
    </div>
  )
}
