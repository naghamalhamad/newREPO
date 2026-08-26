// App identity mark: a bolt (charging) inside a dark rounded-square badge,
// wrapped by a partial mint ring — echoes the circular progress motif used
// throughout the app (battery bar, occupancy bar, charging session).
export default function Logo({ size = 64, ring = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Car Care logo">
      <rect x="4" y="4" width="56" height="56" rx="18" className="fill-ink" />
      {ring && (
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
      )}
      <path d="M34.5 16 21 34h9l-2 14 16-20h-9l-.5-12Z" className="fill-brand" strokeLinejoin="round" />
    </svg>
  )
}
