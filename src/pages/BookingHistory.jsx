import { useState } from 'react'
import TopBar from '../components/TopBar'
import { bookingHistory } from '../data/mock'

export default function BookingHistory() {
  const [cancelled, setCancelled] = useState([])
  const upcoming = bookingHistory.filter((b) => b.status === 'upcoming' && !cancelled.includes(b.id))
  const past = bookingHistory.filter((b) => b.status === 'completed')
  const justCancelled = bookingHistory.filter((b) => cancelled.includes(b.id))

  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Bookings" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <section>
          <h2 className="font-heading text-[11px] uppercase tracking-[0.08em] text-ink-faint">Upcoming</h2>
          <div className="mt-2 flex flex-col gap-2.5">
            {upcoming.length === 0 && (
              <p className="rounded-card border border-dashed border-line px-4 py-6 text-center text-sm text-ink-soft">
                Nothing booked. Head to Wash & Care to book a service.
              </p>
            )}
            {upcoming.map((b) => (
              <div key={b.id} className="rounded-card border border-line bg-paper-raised p-3.5">
                <div className="flex items-start justify-between">
                  <span>
                    <span className="block font-semibold text-ink">{b.service}</span>
                    <span className="block text-sm text-ink-soft">{b.provider} · {b.when}</span>
                  </span>
                  <span className="font-mono font-semibold text-copper">${b.cost}</span>
                </div>
                <button
                  onClick={() => setCancelled((c) => [...c, b.id])}
                  className="mt-2.5 w-full rounded-lg border border-alert/30 py-2 text-sm font-heading font-semibold text-alert"
                >
                  Cancel booking
                </button>
              </div>
            ))}
            {justCancelled.map((b) => (
              <div key={b.id} className="rounded-card border border-line bg-paper px-3.5 py-2.5 text-sm text-ink-faint line-through">
                {b.service} · {b.when} — cancelled
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="font-heading text-[11px] uppercase tracking-[0.08em] text-ink-faint">Past</h2>
          <div className="mt-2 flex flex-col gap-2.5">
            {past.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-card border border-line bg-paper-raised p-3.5">
                <span>
                  <span className="block font-semibold text-ink">{b.service}</span>
                  <span className="block text-sm text-ink-soft">{b.provider} · {b.when}</span>
                </span>
                <span className="font-mono text-sm text-ink-soft">${b.cost}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
