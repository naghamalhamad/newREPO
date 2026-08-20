import { useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { chargingHistory } from '../data/mock'

export default function ReceiptDetail() {
  const { id } = useParams()
  const r = chargingHistory.find((x) => x.id === id) ?? chargingHistory[0]
  const rows = [
    ['Station', r.station],
    ['Date', r.date],
    ['Duration', `${r.mins} min`],
    ['Energy delivered', `${r.kwh} kWh`],
    ['Rate', `$${(r.cost / r.kwh).toFixed(2)} / kWh`],
    ['Payment method', 'Visa •••• 4821'],
  ]
  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Receipt" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="rounded-card border border-line bg-paper-raised p-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Total charged</p>
          <p className="mt-1 font-display text-4xl font-semibold text-copper">${r.cost.toFixed(2)}</p>
        </div>

        <div className="mt-4 divide-y divide-line rounded-card border border-line bg-paper-raised">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-ink-soft">{label}</span>
              <span className="font-mono text-sm font-medium text-ink">{value}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
