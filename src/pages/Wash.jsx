import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { services, nextBooking } from '../data/mock'

const groups = [
  { label: 'Wash', items: services.filter((s) => s.accent === 'care') },
  { label: 'Maintenance', items: services.filter((s) => s.accent === 'maintenance') },
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
    <div className="min-h-dvh bg-stone pb-24">
      <TopBar title="Services" />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="rounded-card bg-brand p-5 text-ink">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-ink/70">Next booking</p>
              <p className="mt-1 text-xl font-semibold">{nextBooking.service}</p>
              <p className="mt-1 text-sm text-ink/80">{nextBooking.provider}</p>
              <p className="text-sm text-ink/80">{nextBooking.when}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c3.5 4 6 7.4 6 10.5a6 6 0 1 1-12 0C6 10.4 8.5 7 12 3Z" /></svg>
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 font-mono text-xs font-bold tabular">
              {nextBooking.queuePosition}
            </span>
            <span className="text-sm text-ink/85">people ahead of you in the queue</span>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
 <Link to="/wash/history" className="font-heading text-xs font-medium text-graphite">
            View bookings
          </Link>
        </div>

        <Link
          to="/wash/rebook?rebook=1"
          className="mt-2 flex items-center justify-between rounded-card border border-dashed border-brand/40 bg-brand-tint/40 px-4 py-3 font-heading text-sm font-semibold text-brand-mid"
        >
          Rebook “{nextBooking.service}” in one tap
          <span>›</span>
        </Link>

        <Link
          to="/wash/subscribe"
          className="mt-3 flex items-center justify-between rounded-card bg-ink px-4 py-4 font-heading text-sm text-stone"
        >
          <span>
            <span className="block font-semibold">2× per week wash</span>
            <span className="block text-stone/60">Subscribe & save 20%</span>
          </span>
          <span>›</span>
        </Link>

        {groups.map((g) => (
          <section key={g.label} className="mt-7">
 <h2 className="font-heading text-base font-medium text-ink">{g.label}</h2>
            <motion.div variants={list} initial="hidden" animate="show" className="mt-3 flex flex-col gap-3">
              {g.items.map((s) => (
                <motion.div key={s.id} variants={row}>
                  <Link
                    to={`/wash/book/${s.id}`}
                    className="flex items-center justify-between rounded-card border border-line bg-surface p-4 transition-colors active:bg-brand-tint/30"
                  >
                    <span>
                      <span className="block font-semibold text-ink">{s.name}</span>
                      <span className="block text-sm text-graphite">{s.desc} · {s.mins} min</span>
                    </span>
                    <span className="font-mono text-sm font-semibold text-brand-mid">
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
