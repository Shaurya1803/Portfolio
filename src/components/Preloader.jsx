import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useReducedMotion } from 'framer-motion'

/**
 * Preloader - Ek vertical "time-picker" jo 0 se 100 tak scroll hota hai.
 * 
* param {number} [duration=4.2] - Total travel time seconds mein.
* param {number} [holdMs=700] - 100% hone ke baad screen fade hone se pehle kitni der center me rukega.
* param {number} [revealLeadMs=200] - Fade shuru hone se pehle onReveal trigger karega, taaki hero section pehle hi mount ho sake.
* param {number} [maxWaitMs=6000] - Fonts aur images load hone ka maximum waiting time.
* param {Function} [onReveal] - Fade-out shuru hone ke just pehle chalne wala callback function.
* param {Function} [onComplete] - Poora fade-out khatam hone ke baad chalne wala callback (unmount karne ke liye).
 * 
 * Performance: High-performance ke liye sirf center ke 5 rows me transform + opacity use kiya hai direct DOM par.
 * Isme koi baar-baar hone wala React re-render ya heavy motion values nahi hain.
 */


const COUNT = 101 // 0..100
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const assetsReady = (maxWait) =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, maxWait)
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const loaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener('load', r, { once: true }))
    Promise.all([fonts, loaded]).then(() => {
      clearTimeout(timer)
      resolve()
    })
  })

const useRowHeight = () => {
  const get = () =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 96 : 144
  const [h, setH] = useState(get)
  useEffect(() => {
    const onResize = () => setH(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return h
}

const Preloader = ({
  duration = 4.2,
  holdMs = 700,
  revealLeadMs = 200,
  maxWaitMs = 6000,
  onReveal,
  onComplete,
}) => {
  const reduceMotion = useReducedMotion()
  const rowH = useRowHeight()
  const progress = useMotionValue(0)
  const [phase, setPhase] = useState('loading') // loading | exiting

  const rowRefs = useRef([])
  const revealRef = useRef(onReveal)
  const completeRef = useRef(onComplete)
  revealRef.current = onReveal
  completeRef.current = onComplete

  /* --------- Draw the wheel: touch only the rows near the centre --------- */
  useEffect(() => {
    let prevLo = 0
    let prevHi = COUNT - 1

    const draw = (v) => {
      const lo = Math.max(0, Math.floor(v) - 2)
      const hi = Math.min(COUNT - 1, Math.ceil(v) + 2)

      // Hide rows that just left the active window
      for (let i = prevLo; i <= prevHi; i++) {
        if ((i < lo || i > hi) && rowRefs.current[i]) {
          rowRefs.current[i].style.opacity = '0'
        }
      }

      for (let i = lo; i <= hi; i++) {
        const el = rowRefs.current[i]
        if (!el) continue
        const d = i - v // 0 = selected
        const a = Math.abs(d)

        // Size: 1 at centre -> 0.58 one row away
        const scale = 1 - 0.42 * Math.min(a, 1)
        // Brightness: 1 -> 0.28 one row away -> 0 two rows away
        const opacity = a <= 1 ? 1 - 0.72 * a : Math.max(0, 0.28 * (2 - a))

        el.style.transform = `translate3d(0, ${(d + 1) * rowH}px, 0) scale(${scale})`
        el.style.opacity = String(opacity)
      }

      prevLo = lo
      prevHi = hi
    }

    draw(progress.get())
    const unsubscribe = progress.on('change', draw)
    return unsubscribe
  }, [progress, rowH])

  /* ---------------- Timeline ---------------- */
  useEffect(() => {
    let cancelled = false
    const running = []
    const total = reduceMotion ? 1.2 : duration

    const run = async () => {
      // Start waiting for fonts/images straight away, in parallel
      const ready = assetsReady(maxWaitMs)

      // One continuous roll from 0 to 100, no stop in between
      const roll = animate(progress, 100, {
        duration: total,
        ease: [0.65, 0, 0.35, 1],
      })
      running.push(roll)
      await roll
      if (cancelled) return

      // Rarely needed: if the page is still loading, hold on 100%
      await ready
      if (cancelled) return

      // Hold 100%. Mount the hero a moment before the fade, while the
      // screen is still black and nothing is animating.
      await wait(Math.max(0, holdMs - revealLeadMs))
      if (cancelled) return
      revealRef.current?.()
      await wait(revealLeadMs)
      if (cancelled) return
      setPhase('exiting')
    }

    run()
    return () => {
      cancelled = true
      running.forEach((c) => c.stop())
    }
  }, [duration, holdMs, revealLeadMs, maxWaitMs, progress, reduceMotion])

  /* ------- Block scrolling/input underneath while loading ------- */
  useEffect(() => {
    if (phase !== 'loading') return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const block = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const scrollKeys = [
      'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'End', 'Home', ' ', 'Spacebar',
    ]
    const blockKey = (e) => {
      if (scrollKeys.includes(e.key)) block(e)
    }

    window.addEventListener('wheel', block, { capture: true, passive: false })
    window.addEventListener('touchmove', block, { capture: true, passive: false })
    window.addEventListener('keydown', blockKey, true)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('wheel', block, true)
      window.removeEventListener('touchmove', block, true)
      window.removeEventListener('keydown', blockKey, true)
    }
  }, [phase])

  const exiting = phase === 'exiting'
  const fontSize = rowH * 0.72

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{ pointerEvents: exiting ? 'none' : 'auto', willChange: 'opacity' }}
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (exiting) completeRef.current?.()
      }}
    >
      <motion.div
        initial={false}
        animate={{ scale: exiting ? 1.1 : 1, opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative flex items-center text-white"
          style={{
            height: rowH * 3,
            fontSize,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {/* Clipped viewport: exactly three rows tall */}
          <div
            className="relative overflow-hidden"
            style={{ width: '3ch', height: rowH * 3 }}
          >
            {Array.from({ length: COUNT }, (_, i) => (
              <div
                key={i}
                ref={(el) => (rowRefs.current[i] = el)}
                aria-hidden="true"
                className="absolute left-0 top-0 flex w-full items-center justify-end leading-none"
                style={{
                  height: rowH,
                  opacity: 0,
                  transformOrigin: 'right center',
                  willChange: 'transform, opacity',
                }}
              >
                {i}
              </div>
            ))}
          </div>

          {/* % stays fixed, aligned with the selected (middle) row */}
          <span
            aria-hidden="true"
            className="ml-[0.1em] leading-none text-white/80"
            style={{ fontSize: '0.42em' }}
          >
            %
          </span>

          {/* Selection separators */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-20%] right-[-20%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ top: rowH }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-20%] right-[-20%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ top: rowH * 2 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Preloader