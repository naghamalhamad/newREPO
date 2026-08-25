import { Link, useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { stations } from '../data/mock'
import { stationStatus } from '../utils/station'

export default function StationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const s = stations.find((st) => st.id === id) ?? stations[0]
  const freeSlots = s.total - s.occupied
  const occupancyPct = (s.occupied / s.total) * 100
  const availableNow = s.etaFreeMin === 0
  const status = stationStatus(s)

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.address)}`

  return (
    <div className="flex min-h-dvh flex-col bg-stone pb-10">
      <TopBar title="Station" back />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-3">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" /></svg>
          </span>
          <div className="flex-1">
            <h2 className="font-heading text-xl font-medium text-ink">{s.name}</h2>
            <p className="mt-1 text-sm text-graphite">{s.address}</p>
            <span className={`mt-2 inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold ${status.bg} ${status.color}`}>
              {status.text} · {freeSlots}/{s.total} free
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-card border border-line bg-surface p-4">
            <p className="font-heading text-xs font-medium text-mist">Occupancy</p>
            <p className="mt-2 flex items-baseline gap-1 font-mono tabular">
              <span className="text-4xl font-extrabold text-ink">{freeSlots}</span>
              <span className="text-base text-mist">/{s.total} free</span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div className={`h-full rounded-full ${status.bar} transition-all duration-700`} style={{ width: `${occupancyPct}%` }} />
            </div>
          </div>

          <div className="flex flex-col rounded-card border border-line bg-surface p-4">
 <p className="font-heading text-xs font-medium text-mist">Next slot</p>
            {availableNow ? (
              <div className="mt-2 flex flex-1 flex-col justify-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-tint text-success">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                    <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="mt-2 font-semibold text-success">Available now</p>
              </div>
            ) : (
              <p className="mt-2 font-mono tabular">
                <span className="text-4xl font-extrabold text-brand-mid">{s.etaFreeMin}</span>
                <span className="ml-1 text-base text-mist">min</span>
              </p>
            )}
          </div>
        </div>

        <section className="mt-6">
 <h3 className="font-heading text-base font-medium text-ink">Connectors</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {s.connectors.map((c) => (
              <span key={c} className="rounded-pill border border-line bg-surface px-3 py-2 text-xs text-ink">
                {c}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 flex items-center justify-between rounded-card border border-line bg-surface p-4">
          <div>
 <p className="text-[11px] tracking-[0.14em] text-mist">Price</p>
            <p className="font-mono text-2xl font-extrabold text-brand-mid">${s.priceKwh.toFixed(2)} <span className="text-sm font-normal text-graphite">/ kWh</span></p>
          </div>
          <div className="text-right">
 <p className="text-[11px] tracking-[0.14em] text-mist">Hours</p>
            <p className="font-semibold text-ink">24 / 7</p>
          </div>
        </section>

        <Link
          to={`/charge/${s.id}/reserve`}
          className="mt-6 flex items-center justify-between rounded-card border border-dashed border-brand/40 bg-brand-tint/40 px-4 py-3 font-heading text-sm font-semibold text-brand-mid"
        >
          Reserve a slot in advance
          <span>›</span>
        </Link>

        <div className="mt-auto flex gap-3 pt-6">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand bg-surface py-4 font-heading font-semibold text-brand active:bg-brand-tint/40"
          >
            Navigate
          </a>
          <button
            onClick={() => navigate(`/charge/${s.id}/session`)}
            className="flex-1 rounded-xl bg-brand py-4 text-center font-heading font-semibold text-white active:opacity-90"
          >
            Start & pay
          </button>
        </div>
      </main>
    </div>
  )
}
