import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

// The flow ring — Circuit's one signature component. A circular progress
// ring reused wherever status is a "progress toward completion": copper
// stroke while charging, aqua while in a wash/service, and a copper->aqua
// gradient reserved exclusively for things that genuinely span both areas
// (subscription cycle, account health). Track is --line at 9px, rounded cap.
export default function GaugeDial({ value, unit = '%', label, accent = '#c97a3b', gradient = false }) {
  const [display, setDisplay] = useState(0)
  const size = 240
  const cx = size / 2
  const cy = size / 2
  const r = 104
  const strokeWidth = 9
  const circumference = 2 * Math.PI * r

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    })
    return () => controls.stop()
  }, [value])

  const offset = circumference * (1 - Math.min(100, Math.max(0, display)) / 100)
  const stroke = gradient ? 'url(#flowRingGradient)' : accent

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[260px]" role="img" aria-label={`${label ?? 'Value'}: ${Math.round(value)}${unit}`}>
      {gradient && (
        <defs>
          <linearGradient id="flowRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-charge)" />
            <stop offset="100%" stopColor="var(--color-care)" />
          </linearGradient>
        </defs>
      )}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-line)" strokeWidth={strokeWidth} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Poppins', sans-serif" fontWeight={600} fontSize={48} className="fill-ink tabular">
        {Math.round(display)}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontFamily="'Poppins', sans-serif" fontWeight={500} fontSize={14} className="fill-graphite">
        {unit}
      </text>
      {label && (
        <text x={cx} y={cy + 50} textAnchor="middle" fontFamily="'Poppins', sans-serif" fontWeight={500} fontSize={11} letterSpacing="1.2" className="fill-mist">
          {label}
        </text>
      )}
    </svg>
  )
}
