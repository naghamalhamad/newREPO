import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { services, nextBooking } from '../data/mock'

const groups = [
  { label: 'Wash', items: services.filter((s) => s.accent === 'tide') },
  { label: 'Maintenance', items: services.filter((s) => s.accent === 'copper') },
]

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const row = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
}

export default function Wash() {
  return (
    <div className="min-h-dvh bg-paper pb-24">
      <TopBar title="Wash & Care" />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="rounded-card bg-tide p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Next in queue</p>
              <p className="mt-1 text-5xl font-extrabold leading-none tabular">{nextBooking.queuePosition}</p>
              <p className="mt-2 text-sm text-white/85">{nextBooking.when}</p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c3.5 4 6 7.4 6 10.5a6 6 0 1 1-12 0C6 10.4 8.5 7 12 3Z" /></svg>
            </span>
          </div>
        </div>

        <div className="mt-2.5 flex justify-end">
          <Link to="/wash/history" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            View bookings
          </Link>
        </div>

        <Link
          to="/wash/rebook?rebook=1"
          className="mt-2 flex items-center justify-between rounded-card border border-dashed border-tide/40 bg-tide-dim/40 px-4 py-3 text-sm font-semibold text-tide-ink"
        >
          Rebook “{nextBooking.service}” in one tap
          <span>›</span>
        </Link>

        <Link
          to="/wash/subscribe"
          className="mt-2.5 flex items-center justify-between rounded-card bg-ink px-4 py-3.5 text-sm text-paper"
        >
          <span>
            <span className="block font-semibold">2× per week wash</span>
            <span className="block text-paper/60">Subscribe & save 20%</span>
          </span>
          <span>›</span>
        </Link>

        {groups.map((g) => (
          <section key={g.label} className="mt-7">
            <h2 className="font-heading text-base font-medium uppercase tracking-wide text-ink">{g.label}</h2>
            <motion.div variants={list} initial="hidden" animate="show" className="mt-2.5 flex flex-col gap-2.5">
              {g.items.map((s) => (
                <motion.div key={s.id} variants={row}>
                  <Link
                    to={`/wash/book/${s.id}`}
                    className="flex items-center justify-between rounded-card border border-line bg-paper-raised p-3.5 transition-colors active:bg-tide-dim/30"
                  >
                    <span>
                      <span className="block font-semibold text-ink">{s.name}</span>
                      <span className="block text-sm text-ink-soft">{s.desc} · {s.mins} min</span>
                    </span>
                    <span className="text-sm font-semibold text-copper">
                      {s.priceFrom === 0 ? 'Free' : `from $${s.priceFrom}`}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </main>
      <BottomNav />
    </div>
  )
}
