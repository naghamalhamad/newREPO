import { motion } from 'framer-motion'

// App identity mark: a bolt (charging) inside a dark rounded-square badge,
// wrapped by a partial mint ring — echoes the circular progress motif used
// throughout the app (battery bar, occupancy bar, charging session).
export default function Logo({ size = 64, ring = true, animate = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Car Care logo">
      <rect x="4" y="4" width="56" height="56" rx="18" className="fill-ink" />
      {ring && (
        <motion.g
          style={{ transformOrigin: '32px 32px' }}
          animate={animate ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
        >
          <circle
            cx="32"
            cy="32"
            r="21"
            fill="none"
            className="stroke-brand"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="82 50"
            transform="rotate(-90 32 32)"
          />
        </motion.g>
      )}
      <path d="M33.8 20.8 24.3 33.4 30.6 33.4 29.2 43.2 40.4 29.2 34.1 29.2Z" className="fill-brand" strokeLinejoin="round" />
    </svg>
  )
}
