import { useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import InstrumentStrip from '../components/InstrumentStrip'
import { stations } from '../data/mock'

export default function StationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const s = stations.find((st) => st.id === id) ?? stations[0]
  const freeSlots = s.total - s.occupied

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.address)}`

  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Station" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <h2 className="font-display text-2xl font-semibold text-ink">{s.name}</h2>
        <p className="mt-0.5 text-sm text-ink-soft">{s.address}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <InstrumentStrip
            eyebrow="Occupancy"
            value={`${freeSlots}/${s.total}`}
            detail="free now"
            fillPct={(s.occupied / s.total) * 100}
            accent="spark"
            live
          />
          <InstrumentStrip
            eyebrow="Next slot"
            value={s.etaFreeMin === 0 ? 'now' : `${s.etaFreeMin}`}
            unit={s.etaFreeMin === 0 ? '' : 'min'}
            accent="spark"
          />
        </div>

        <section className="mt-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Connectors</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {s.connectors.map((c) => (
              <span key={c} className="rounded-pill border border-line bg-paper-raised px-3 py-1.5 font-mono text-xs text-ink">
                {c}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 flex items-center justify-between rounded-card border border-line bg-paper-raised p-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Price</p>
            <p className="font-display text-2xl font-semibold text-copper">${s.priceKwh.toFixed(2)} <span className="text-sm font-normal text-ink-soft">/ kWh</span></p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Hours</p>
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
