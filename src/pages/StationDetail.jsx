import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { stations } from '../data/mock'

export default function StationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const s = stations.find((st) => st.id === id) ?? stations[0]
  const freeSlots = s.total - s.occupied
  const occupancyPct = (s.occupied / s.total) * 100
  const availableNow = s.etaFreeMin === 0

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.address)}`

  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Station" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <h2 className="font-heading text-xl font-medium uppercase tracking-wide text-ink">{s.name}</h2>
        <p className="mt-0.5 text-sm text-ink-soft">{s.address}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-card border border-line bg-paper-raised p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Occupancy</p>
              {availableNow && (
                <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-status" aria-hidden="true" />
              )}
            </div>
            <p className="mt-2 flex items-baseline gap-1 tabular">
              <span className="text-4xl font-extrabold text-spark-ink">{freeSlots}</span>
              <span className="text-base text-ink-faint">/{s.total} free</span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-spark-dim">
              <div className="h-full rounded-full bg-spark transition-all duration-700" style={{ width: `${occupancyPct}%` }} />
            </div>
          </div>

          <div className="flex flex-col rounded-card border border-line bg-paper-raised p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Next slot</p>
            {availableNow ? (
              <div className="mt-2 flex flex-1 flex-col justify-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-status-dim text-status">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                    <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="mt-2 font-semibold text-status">Available now</p>
              </div>
            ) : (
              <p className="mt-2 tabular">
                <span className="text-4xl font-extrabold text-spark-ink">{s.etaFreeMin}</span>
                <span className="ml-1 text-base text-ink-faint">min</span>
              </p>
            )}
          </div>
        </div>

        <section className="mt-6">
          <h3 className="font-heading text-base font-medium uppercase tracking-wide text-ink">Connectors</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {s.connectors.map((c) => (
              <span key={c} className="rounded-pill border border-line bg-paper-raised px-3 py-1.5 text-xs text-ink">
                {c}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 flex items-center justify-between rounded-card border border-line bg-paper-raised p-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">Price</p>
            <p className="text-2xl font-extrabold text-copper">${s.priceKwh.toFixed(2)} <span className="text-sm font-normal text-ink-soft">/ kWh</span></p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">Hours</p>
            <p className="font-semibold text-ink">24 / 7</p>
          </div>
        </section>

        <div className="mt-6 flex gap-2.5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper-raised py-3.5 font-semibold text-ink active:bg-line/40"
          >
            Navigate
          </a>
          <button
            onClick={() => navigate(`/charge/${s.id}/session`)}
            className="flex-1 rounded-xl bg-spark py-3.5 text-center font-semibold text-white active:opacity-90"
          >
            Start & pay
          </button>
        </div>
      </main>
    </div>
  )
}
