import { useEffect, useRef, useState } from 'react'

export default function SpaceCursorBadge({ theme, hidden }) {
  const badgeRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const pointerRef = useRef({ x: -200, y: -200 })
  const currentRef = useRef({ x: -200, y: -200 })
  const overInteractiveRef = useRef(false)
  const insideRef = useRef(false)

  useEffect(() => {
    const finePointer = window.matchMedia?.('(pointer: fine)')?.matches
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!finePointer || reducedMotion) return
    setEnabled(true)

    const onMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY }
      insideRef.current = true
      const interactive = e.target?.closest?.(
        'button, a, input, textarea, [role="button"], [role="switch"]'
      )
      overInteractiveRef.current = Boolean(interactive)
      setVisible(!overInteractiveRef.current && !hidden)
    }

    const onLeave = () => {
      insideRef.current = false
      setVisible(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    let rafId = null
    const animate = () => {
      currentRef.current.x += (pointerRef.current.x - currentRef.current.x) * 0.18
      currentRef.current.y += (pointerRef.current.y - currentRef.current.y) * 0.18
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${currentRef.current.x + 18}px, ${
          currentRef.current.y + 18
        }px, 0)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [hidden])

  useEffect(() => {
    if (hidden) setVisible(false)
    else if (insideRef.current && !overInteractiveRef.current) setVisible(true)
  }, [hidden])

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
