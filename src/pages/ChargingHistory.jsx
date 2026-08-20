import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { chargingHistory } from '../data/mock'

export default function ChargingHistory() {
  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Charging history" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        {chargingHistory.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="flex flex-col gap-2.5">
            {chargingHistory.map((r) => (
              <li key={r.id}>
                <Link to={`/charge/history/${r.id}`} className="flex items-center justify-between rounded-card border border-line bg-paper-raised p-3.5 active:bg-spark-dim/30">
                  <span>
                    <span className="block font-semibold text-ink">{r.station}</span>
                    <span className="block text-sm text-ink-soft">{r.date} · {r.kwh} kWh · {r.mins} min</span>
                  </span>
                  <span className="font-semibold text-copper">${r.cost.toFixed(2)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-card border border-dashed border-line px-6 py-10 text-center">
      <p className="font-heading text-base font-medium uppercase tracking-wide text-ink">No charging sessions yet</p>
      <p className="mt-1 text-sm text-ink-soft">Sessions and receipts show up here once you charge.</p>
    </div>
  )
}
