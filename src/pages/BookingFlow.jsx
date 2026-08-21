import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import TopBar from '../components/TopBar'
import { services, timeSlots } from '../data/mock'

export default function BookingFlow() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const isRebook = params.get('rebook') === '1'
  const service = services.find((s) => s.id === id) ?? services[0]
  const [slot, setSlot] = useState(isRebook ? timeSlots[2] : null)
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-stone px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
 <h1 className="mt-4 font-heading text-xl font-medium text-ink">Booking confirmed</h1>
        <p className="mt-2 text-graphite">{service.name} · {slot} · Suds & Co — Downtown</p>
        <Link to="/wash" className="mt-6 rounded-xl bg-brand px-6 py-3 font-heading font-semibold text-white">
          Back to Services
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-stone pb-10">
      <TopBar title="Book service" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        {isRebook && (
          <div className="mb-3 rounded-card border border-brand/30 bg-brand-tint/50 px-4 py-3 text-sm text-brand-mid">
            Rebooking your usual — same vehicle, same provider.
          </div>
        )}
        <div className="rounded-card border border-line bg-surface p-4">
 <p className="font-heading text-lg font-medium text-ink">{service.name}</p>
          <p className="mt-1 text-sm text-graphite">{service.desc} · {service.mins} min</p>
          <p className="mt-2 font-mono text-sm font-semibold text-brand-mid">
            {service.priceFrom === 0 ? 'Free' : `from $${service.priceFrom}`}
          </p>
        </div>

        <section className="mt-6">
 <h3 className="font-heading text-base font-medium text-ink">Vehicle</h3>
          <div className="mt-2 rounded-card border border-line bg-surface p-4 font-semibold text-ink">
            My Model Y · EV 402 CC
          </div>
        </section>

        <section className="mt-6">
 <h3 className="font-heading text-base font-medium text-ink">Today — pick a time</h3>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setSlot(t)}
                className={`rounded-xl border px-2 py-3 font-mono text-sm ${
                  slot === t
                    ? 'border-brand bg-brand text-white'
                    : 'border-line bg-surface text-graphite'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
 <h3 className="font-heading text-base font-medium text-ink">Payment</h3>
          <div className="mt-2 flex items-center justify-between rounded-card border border-line bg-surface p-4">
            <span className="font-mono font-semibold text-ink">Visa •••• 4821</span>
 <button className="font-heading text-xs font-medium text-brand-mid">Change</button>
          </div>
        </section>

        <button
          disabled={!slot}
          onClick={() => setConfirmed(true)}
          className="mt-7 w-full rounded-xl bg-brand py-4 text-center font-heading font-semibold text-white disabled:bg-line disabled:text-disabled-text"
        >
          Confirm & pay {service.priceFrom > 0 ? `$${service.priceFrom}` : ''}
        </button>
      </main>
    </div>
  )
}
