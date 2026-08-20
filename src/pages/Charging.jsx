import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { stations } from '../data/mock'

function busyLabel(s) {
  const ratio = s.occupied / s.total
  if (ratio >= 1) return { text: 'Full', tone: 'text-alert' }
  if (ratio >= 0.6) return { text: 'Busy', tone: 'text-copper' }
  return { text: 'Open', tone: 'text-status' }
}

export default function Charging() {
  return (
    <div className="min-h-dvh bg-paper pb-24">
      <TopBar title="Charging" />

      {/* Map placeholder — stylized to match the instrument-panel language */}
      <div className="relative mx-4 mt-3 h-44 overflow-hidden rounded-card border border-line bg-spark-dim">
        <div className="instrument-ticks absolute inset-0 opacity-60" />
        {stations.map((s, i) => (
          <span
            key={s.id}
            className="absolute flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-spark text-[10px] font-bold text-white shadow"
            style={{ left: `${18 + i * 22}%`, top: `${30 + (i % 2) * 34}%` }}
          >
            {s.total - s.occupied}
          </span>
        ))}
        <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-wide text-spark-ink/60">
          Map preview
        </span>
      </div>

      <main className="mx-auto max-w-md px-4">
        <div className="mt-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">{stations.length} stations nearby</h2>
          <button className="font-mono text-xs uppercase tracking-wide text-ink-soft">Filter</button>
        </div>

        <ul className="mt-2 flex flex-col gap-2.5">
          {stations.map((s) => {
            const busy = busyLabel(s)
            return (
              <li key={s.id}>
                <Link
                  to={`/charge/${s.id}`}
                  className="flex flex-col gap-2 rounded-card border border-line bg-paper-raised p-3.5 active:bg-spark-dim/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-ink">{s.name}</p>
                      <p className="text-sm text-ink-soft">{s.address}</p>
                    </div>
                    <span className="whitespace-nowrap font-mono text-sm text-ink-soft">{s.distanceMi} mi</span>
                  </div>
                  <div className="flex items-center gap-3 border-t border-line pt-2.5 font-mono text-xs">
                    <span className={`font-semibold ${busy.tone}`}>{busy.text}</span>
                    <span className="text-ink-faint">·</span>
                    <span className="tabular text-ink-soft">{s.occupied}/{s.total} in use</span>
                    <span className="text-ink-faint">·</span>
                    <span className="tabular text-ink-soft">
                      {s.etaFreeMin === 0 ? 'slot free now' : `free in ~${s.etaFreeMin}m`}
                    </span>
                    <span className="ml-auto tabular font-semibold text-copper">${s.priceKwh.toFixed(2)}/kWh</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
      <BottomNav />
    </div>
  )
}
