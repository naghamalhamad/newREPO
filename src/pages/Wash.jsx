import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import InstrumentStrip from '../components/InstrumentStrip'
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
        <InstrumentStrip
          eyebrow="Next in queue"
          value={nextBooking.queuePosition}
          detail={nextBooking.when}
          accent="tide"
          live
        />

        <div className="mt-2.5 flex justify-end">
          <Link to="/wash/history" className="font-mono text-xs uppercase tracking-wide text-ink-soft">
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
          <span className="font-mono">›</span>
        </Link>

        {groups.map((g) => (
          <section key={g.label} className="mt-7">
            <h2 className="font-display text-lg font-semibold text-ink">{g.label}</h2>
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
                    <span className="font-mono text-sm font-semibold text-copper">
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
