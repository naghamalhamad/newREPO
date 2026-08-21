import { useState } from 'react'
import TopBar from '../components/TopBar'
import { bookingHistory } from '../data/mock'

export default function BookingHistory() {
  const [cancelled, setCancelled] = useState([])
  const upcoming = bookingHistory.filter((b) => b.status === 'upcoming' && !cancelled.includes(b.id))
  const past = bookingHistory.filter((b) => b.status === 'completed')
  const justCancelled = bookingHistory.filter((b) => cancelled.includes(b.id))

  return (
    <div className="min-h-dvh bg-stone pb-10">
      <TopBar title="Bookings" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <section>
 <h2 className="font-heading text-base font-medium text-ink">Upcoming</h2>
          <div className="mt-2 flex flex-col gap-3">
            {upcoming.length === 0 && (
              <p className="rounded-card border border-dashed border-line px-4 py-6 text-center text-sm text-graphite">
                Nothing booked. Head to Services to book one.
              </p>
            )}
            {upcoming.map((b) => (
              <div key={b.id} className="rounded-card border border-line bg-surface p-4">
                <div className="flex items-start justify-between">
                  <span>
                    <span className="block font-semibold text-ink">{b.service}</span>
                    <span className="block text-sm text-graphite">{b.provider} · {b.when}</span>
                  </span>
                  <span className="font-mono font-semibold text-brand-mid">${b.cost}</span>
                </div>
                <button
                  onClick={() => setCancelled((c) => [...c, b.id])}
                  className="mt-3 w-full rounded-xl border border-danger/30 bg-danger-tint py-3 text-sm font-heading font-semibold text-danger"
                >
                  Cancel booking
                </button>
              </div>
            ))}
            {justCancelled.map((b) => (
              <div key={b.id} className="rounded-card border border-line bg-stone px-4 py-3 text-sm text-mist line-through">
                {b.service} · {b.when} — cancelled
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
 <h2 className="font-heading text-base font-medium text-ink">Past</h2>
          <div className="mt-2 flex flex-col gap-3">
            {past.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-card border border-line bg-surface p-4">
                <span>
                  <span className="block font-semibold text-ink">{b.service}</span>
                  <span className="block text-sm text-graphite">{b.provider} · {b.when}</span>
                </span>
                <span className="font-mono text-sm text-graphite">${b.cost}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
