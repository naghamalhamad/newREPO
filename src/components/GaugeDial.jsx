import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

// The flow ring — the system's one signature component. A circular progress
// ring reused wherever status is a "progress toward completion" (charging
// session, wash/service progress, subscription cycle). Dark teal stroke,
// track is --line at 9px, rounded cap.
export default function GaugeDial({ value, unit = '%', label, accent = '#0a3f3b' }) {
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

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[260px]" role="img" aria-label={`${label ?? 'Value'}: ${Math.round(value)}${unit}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-line)" strokeWidth={strokeWidth} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight={700} fontSize={48} className="fill-ink tabular">
        {Math.round(display)}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight={500} fontSize={14} className="fill-graphite">
        {unit}
      </text>
      {label && (
        <text x={cx} y={cy + 50} textAnchor="middle" fontFamily="'Inter', sans-serif" fontWeight={500} fontSize={11} letterSpacing="1.2" className="fill-mist">
          {label}
        </text>
      )}
    </svg>
  )
}
