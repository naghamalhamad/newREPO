import { useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { chargingHistory } from '../data/mock'

export default function ReceiptDetail() {
  const { id } = useParams()
  const r = chargingHistory.find((x) => x.id === id) ?? chargingHistory[0]
  const rows = [
    ['Station', r.station, false],
    ['Date', r.date, false],
    ['Duration', `${r.mins} min`, true],
    ['Energy delivered', `${r.kwh} kWh`, true],
    ['Rate', `$${(r.cost / r.kwh).toFixed(2)} / kWh`, true],
    ['Payment method', 'Visa •••• 4821', true],
  ]
  return (
    <div className="min-h-dvh bg-stone pb-10">
      <TopBar title="Receipt" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="rounded-card border border-line bg-surface p-5 text-center">
 <p className="text-[11px] tracking-[0.14em] text-mist">Total charged</p>
          <p className="mt-1 font-mono text-4xl font-extrabold text-brand-mid">${r.cost.toFixed(2)}</p>
        </div>

        <div className="mt-4 divide-y divide-line rounded-card border border-line bg-surface">
          {rows.map(([label, value, numeric]) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-graphite">{label}</span>
              <span className={`text-sm font-medium text-ink ${numeric ? 'font-mono' : ''}`}>{value}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
