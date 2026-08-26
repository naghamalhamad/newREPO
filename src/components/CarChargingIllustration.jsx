// Side-view car + charging pillar. When `connected` is true the cable reaches
// the car's port and animated dots flow along it; otherwise the cable hangs
// short of the car to read as "not yet plugged in".
export default function CarChargingIllustration({ connected = false, charging = false }) {
  const portX = 122
  const portY = 100

  const cablePath = connected
    ? `M66 95 C 90 78, 104 118, ${portX} ${portY}`
    : 'M66 95 C 84 84, 92 104, 98 108'

  return (
    <svg viewBox="0 0 320 160" className="mx-auto w-full max-w-[280px]" role="img" aria-label={connected ? 'Charger connected to car' : 'Charger not yet connected'}>
      {/* ground shadow */}
      <ellipse cx="205" cy="140" rx="100" ry="8" className="fill-line/60" />

      {/* charging pillar */}
      <rect x="40" y="55" width="26" height="85" rx="6" className="fill-ink" />
      <rect x="47" y="66" width="12" height="16" rx="2" className={connected ? 'fill-brand' : 'fill-mist'} />
      {charging && (
        <rect x="47" y="66" width="12" height="16" rx="2" className="fill-brand">
          <animate attributeName="opacity" values="1;0.35;1" dur="1.4s" repeatCount="indefinite" />
        </rect>
      )}

      {/* cable */}
      <path d={cablePath} fill="none" stroke="var(--color-brand-mid)" strokeWidth="4" strokeLinecap="round" />
      {connected && charging && (
        <>
          <circle r="4" className="fill-brand">
            <animateMotion dur="1.6s" repeatCount="indefinite" path={cablePath} begin="0s" />
          </circle>
          <circle r="4" className="fill-brand">
            <animateMotion dur="1.6s" repeatCount="indefinite" path={cablePath} begin="0.55s" />
          </circle>
          <circle r="4" className="fill-brand">
            <animateMotion dur="1.6s" repeatCount="indefinite" path={cablePath} begin="1.1s" />
          </circle>
        </>
      )}

      {/* car body */}
      <path
        d="M108 118c-4 0-6-3-6-7 0-14 11-25 25-25h9c9-13 25-22 44-22 21 0 39 12 46 30h20c9 0 16 7 16 16v8c0 7-6 13-13 13Z"
        className="fill-ink"
      />
      <path
        d="M158 66c9-8 21-13 34-13 15 0 28 8 34 20h-58Z"
        className="fill-stone"
        opacity="0.22"
      />
      <circle cx="150" cy="128" r="13" className="fill-graphite" />
      <circle cx="150" cy="128" r="5.5" className="fill-mist" />
      <circle cx="255" cy="128" r="13" className="fill-graphite" />
      <circle cx="255" cy="128" r="5.5" className="fill-mist" />

      {/* charging port */}
      <circle cx={portX} cy={portY} r="6" className={connected ? 'fill-brand' : 'fill-mist'} />

      {charging && (
        <path d="M292 40 l-9 16h7l-9 16 18-18h-8Z" className="fill-brand">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
        </path>
      )}
    </svg>
  )
}
