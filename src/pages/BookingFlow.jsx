import { useParams, useSearchParams } from 'react-router-dom'
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
      <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-tide-dim text-tide-ink">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="mt-4 font-heading text-xl font-medium uppercase tracking-wide text-ink">Booking confirmed</h1>
        <p className="mt-1.5 text-ink-soft">{service.name} · {slot} · Suds & Co — Downtown</p>
        <a href="/wash" className="mt-6 rounded-xl bg-tide px-6 py-3 font-semibold text-white">
          Back to Wash & Care
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Book service" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        {isRebook && (
          <div className="mb-3 rounded-card border border-tide/30 bg-tide-dim/50 px-3.5 py-2.5 text-sm text-tide-ink">
            Rebooking your usual — same vehicle, same provider.
          </div>
        )}
        <div className="rounded-card border border-line bg-paper-raised p-4">
          <p className="font-heading text-lg font-medium uppercase tracking-wide text-ink">{service.name}</p>
          <p className="mt-0.5 text-sm text-ink-soft">{service.desc} · {service.mins} min</p>
          <p className="mt-2 text-sm font-semibold text-copper">
            {service.priceFrom === 0 ? 'Free' : `from $${service.priceFrom}`}
          </p>
        </div>

        <section className="mt-6">
          <h3 className="font-heading text-base font-medium uppercase tracking-wide text-ink">Vehicle</h3>
          <div className="mt-2 rounded-card border border-line bg-paper-raised p-3.5 font-semibold text-ink">
            My Model Y · EV 402 CC
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-heading text-base font-medium uppercase tracking-wide text-ink">Today — pick a time</h3>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setSlot(t)}
                className={`rounded-xl border px-2 py-2.5 text-sm ${
                  slot === t
                    ? 'border-tide bg-tide text-white'
                    : 'border-line bg-paper-raised text-ink-soft'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-heading text-base font-medium uppercase tracking-wide text-ink">Payment</h3>
          <div className="mt-2 flex items-center justify-between rounded-card border border-line bg-paper-raised p-3.5">
            <span className="font-semibold text-ink">Visa •••• 4821</span>
            <button className="text-xs font-medium uppercase tracking-wide text-tide-ink">Change</button>
          </div>
        </section>

        <button
          disabled={!slot}
          onClick={() => setConfirmed(true)}
          className="mt-7 w-full rounded-xl bg-tide py-3.5 text-center font-semibold text-white disabled:opacity-40"
        >
          Confirm & pay {service.priceFrom > 0 ? `$${service.priceFrom}` : ''}
        </button>
      </main>
    </div>
  )
}
