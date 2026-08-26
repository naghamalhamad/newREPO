import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { stations, timeSlots } from '../data/mock'

function nextDays(n) {
  const days = []
  const today = new Date()
  for (let i = 0; i < n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' })
    const sub = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    days.push({ key: i, label, sub })
  }
  return days
}

export default function ReserveSlot() {
  const { id } = useParams()
  const navigate = useNavigate()
  const station = stations.find((s) => s.id === id) ?? stations[0]
  const days = useMemo(() => nextDays(5), [])
  const [day, setDay] = useState(days[0])
  const [time, setTime] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-stone px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="mt-4 font-heading text-xl font-medium text-ink">Slot reserved</h1>
        <p className="mt-2 text-graphite">{station.name} · {day.label}, {time}</p>
        <p className="mt-1 text-sm text-mist">We'll hold a connector for you 10 minutes past your slot.</p>
        <Link to="/home" className="mt-6 rounded-xl bg-brand px-6 py-3 font-heading font-semibold text-ink">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-stone pb-10">
      <TopBar title="Reserve a slot" back />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-3">
        <div className="rounded-card border border-line bg-surface p-4">
          <p className="font-heading text-lg font-medium text-ink">{station.name}</p>
          <p className="mt-1 text-sm text-graphite">{station.address}</p>
        </div>

        <section className="mt-6">
          <h3 className="font-heading text-base font-medium text-ink">Day</h3>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {days.map((d) => (
              <button
                key={d.key}
                onClick={() => setDay(d)}
                className={`flex flex-col items-center gap-0.5 rounded-xl border px-1 py-3 ${
                  day.key === d.key ? 'border-brand bg-brand text-ink' : 'border-line bg-surface text-graphite'
                }`}
              >
                <span className="text-xs font-semibold">{d.label}</span>
                <span className={`text-[11px] ${day.key === d.key ? 'text-ink/70' : 'text-mist'}`}>{d.sub}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-heading text-base font-medium text-ink">Time</h3>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`rounded-xl border px-2 py-3 font-mono text-sm ${
                  time === t ? 'border-brand bg-brand text-ink' : 'border-line bg-surface text-graphite'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-6 rounded-card border border-brand/30 bg-brand-tint/40 px-4 py-3 text-sm text-brand-mid">
          Reserving holds an open connector for you — no payment until you plug in.
        </div>

        <button
          disabled={!time}
          onClick={() => setConfirmed(true)}
          className="mt-auto w-full rounded-xl bg-brand py-4 text-center font-heading font-semibold text-ink active:opacity-90 disabled:bg-line disabled:text-disabled-text"
        >
          {time ? `Reserve ${day.label}, ${time}` : 'Pick a time'}
        </button>
      </main>
    </div>
  )
}
