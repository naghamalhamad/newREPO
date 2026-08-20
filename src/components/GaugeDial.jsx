import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

const START = 135
const SWEEP = 270

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const clampedEnd = Math.max(endAngle, startAngle + 0.01)
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, clampedEnd)
  const largeArcFlag = clampedEnd - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

// The one bold instrument in the app: a radial charge gauge, reserved for the
// moment a session is actually live so it carries real weight when it appears.
export default function GaugeDial({ value, unit = '%', label, accent = '#2452ff' }) {
  const [display, setDisplay] = useState(0)
  const size = 240
  const cx = size / 2
  const cy = size / 2
  const r = 96

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    })
    return () => controls.stop()
  }, [value])

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[260px]" role="img" aria-label={`${label ?? 'Value'}: ${Math.round(value)}${unit}`}>
      <path d={describeArc(cx, cy, r, START, START + SWEEP)} fill="none" stroke="var(--color-line)" strokeWidth={12} strokeLinecap="round" />
      <path
        d={describeArc(cx, cy, r, START, START + SWEEP * (display / 100))}
        fill="none"
        stroke={accent}
        strokeWidth={12}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${accent}55)` }}
      />
      {Array.from({ length: 11 }, (_, i) => i).map((i) => {
        const angle = START + SWEEP * (i / 10)
        const major = i % 5 === 0
        const outer = polarToCartesian(cx, cy, r + 16, angle)
        const inner = polarToCartesian(cx, cy, r + (major ? 6 : 9), angle)
        return (
          <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--color-ink-faint)" strokeWidth={major ? 2 : 1} />
        )
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight={800} fontSize={52} className="fill-ink tabular">
        {Math.round(display)}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight={500} fontSize={14} className="fill-ink-soft">
        {unit}
      </text>
      {label && (
        <text x={cx} y={cy + 50} textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight={500} fontSize={11} letterSpacing="1.2" className="fill-ink-faint">
          {label}
        </text>
      )}
    </svg>
  )
}
