import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { stations } from '../data/mock'

export default function SessionSummary() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const station = stations.find((s) => s.id === id) ?? stations[0]
  const [paid, setPaid] = useState(false)

  const session = location.state ?? { kwh: '0.0', cost: '0.00', mins: 0 }
  const rows = [
    ['Station', station.name, false],
    ['Duration', `${session.mins} min`, true],
    ['Energy delivered', `${session.kwh} kWh`, true],
    ['Rate', `$${station.priceKwh.toFixed(2)} / kWh`, true],
    ['Payment method', 'Visa •••• 4821', true],
  ]

  if (paid) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-stone px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="mt-4 font-heading text-xl font-normal text-ink">Payment successful</h1>
        <p className="mt-2 text-graphite">${session.cost} charged to Visa •••• 4821</p>
        <button
          onClick={() => navigate('/home')}
          className="mt-6 rounded-xl bg-brand px-6 py-3 font-heading font-medium text-ink active:opacity-90"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-stone pb-10">
      <TopBar title="Session Summary" back />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-3">
        <div className="rounded-card border border-line bg-surface p-5 text-center">
          <p className="text-[11px] tracking-[0.14em] text-mist">Total amount due</p>
          <p className="mt-1 font-mono text-4xl font-bold text-brand-mid">${session.cost}</p>
        </div>

        <div className="mt-4 divide-y divide-line rounded-card border border-line bg-surface">
          {rows.map(([label, value, numeric]) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-graphite">{label}</span>
              <span className={`text-sm font-normal text-ink ${numeric ? 'font-mono' : ''}`}>{value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPaid(true)}
          className="mt-auto w-full rounded-xl bg-brand py-4 text-center font-heading font-medium text-ink active:opacity-90"
        >
          Pay ${session.cost}
        </button>
      </main>
    </div>
  )
}
