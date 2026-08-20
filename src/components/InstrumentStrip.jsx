const accents = {
  spark: { text: 'text-spark-ink', bar: 'bg-spark', dim: 'bg-spark-dim' },
  tide: { text: 'text-tide-ink', bar: 'bg-tide', dim: 'bg-tide-dim' },
  copper: { text: 'text-copper', bar: 'bg-copper', dim: 'bg-copper-dim' },
}

// Signature component: a dashboard-style readout strip reused across
// Home (battery/range), Charging (station occupancy/ETA) and Wash (queue).
export default function InstrumentStrip({
  eyebrow,
  value,
  unit,
  detail,
  fillPct,
  accent = 'spark',
  live = false,
}) {
  const a = accents[accent]
  return (
    <div
      className={`instrument-ticks rounded-card border border-line bg-paper-raised px-4 py-3 ${live ? 'instrument-live' : ''}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          {live && <span className={`pulse-dot h-1.5 w-1.5 rounded-full ${a.bar}`} aria-hidden="true" />}
          {eyebrow}
        </span>
        {detail && (
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
            {detail}
          </span>
        )}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className={`font-display text-[40px] leading-none font-bold tabular ${a.text}`}>
          {value}
        </span>
        {unit && <span className="font-mono text-sm text-ink-soft">{unit}</span>}
      </div>
      {typeof fillPct === 'number' && (
        <div className={`mt-2.5 h-1.5 w-full overflow-hidden rounded-full ${a.dim}`}>
          <div
            className={`h-full rounded-full ${a.bar} transition-all duration-700`}
            style={{ width: `${Math.min(100, Math.max(0, fillPct))}%` }}
          />
        </div>
      )}
    </div>
  )
}
