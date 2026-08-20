import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import InstrumentStrip from '../components/InstrumentStrip'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import NotifBell from '../components/NotifBell'
import { vehicle, stations, nextBooking } from '../data/mock'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Still up'
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const nearest = stations[0]
  return (
    <div className="min-h-dvh bg-paper pb-24">
      <TopBar title="Home" action={<NotifBell />} />
      <motion.main variants={container} initial="hidden" animate="show" className="mx-auto max-w-md px-4 pt-4">
        <motion.p variants={item} className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          {greeting()}, Nagham
        </motion.p>

        <motion.section variants={item} className="mt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">Your vehicle</p>
              <p className="font-display text-xl font-semibold text-ink">{vehicle.name}</p>
            </div>
            <span className="rounded-pill border border-line px-2.5 py-1 font-mono text-[11px] text-ink-soft">
              {vehicle.plate}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <InstrumentStrip eyebrow="Battery" value={vehicle.batteryPct} unit="%" fillPct={vehicle.batteryPct} accent="spark" />
            <InstrumentStrip eyebrow="Range" value={vehicle.rangeMi} unit="mi" detail={vehicle.connector} accent="spark" />
          </div>
        </motion.section>

        <motion.section variants={item} className="mt-7">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Nearest charger</h2>
            <Link to="/charge" className="font-mono text-xs uppercase tracking-wide text-spark">
              See map
            </Link>
          </div>
          <Link
            to={`/charge/${nearest.id}`}
            className="mt-2.5 flex items-center gap-3 rounded-card border border-line bg-paper-raised p-3.5 transition-colors active:bg-spark-dim/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-spark-dim text-spark-ink">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" /></svg>
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-ink">{nearest.name}</span>
              <span className="block text-sm text-ink-soft">{nearest.distanceMi} mi · {nearest.total - nearest.occupied} of {nearest.total} free</span>
            </span>
            <span className="font-mono text-sm text-ink-faint">›</span>
          </Link>
        </motion.section>

        <motion.section variants={item} className="mt-7">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Upcoming booking</h2>
            <Link to="/wash" className="font-mono text-xs uppercase tracking-wide text-tide-ink">
              Book more
            </Link>
          </div>
          <div className="mt-2.5 flex items-center gap-3 rounded-card border border-line bg-paper-raised p-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tide-dim text-tide-ink">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c3.5 4 6 7.4 6 10.5a6 6 0 1 1-12 0C6 10.4 8.5 7 12 3Z" /></svg>
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-ink">{nextBooking.service}</span>
              <span className="block text-sm text-ink-soft">{nextBooking.provider} · {nextBooking.when}</span>
            </span>
            <span className="rounded-pill bg-status-dim px-2 py-1 font-mono text-[11px] text-status">confirmed</span>
          </div>
        </motion.section>

        <motion.section variants={item} className="mt-7 grid grid-cols-2 gap-3">
          <Link to="/charge" className="rounded-card bg-spark p-4 text-white transition-transform active:scale-[0.98]">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">Module</span>
            <span className="mt-1 block font-display text-2xl font-semibold">Charge</span>
          </Link>
          <Link to="/wash" className="rounded-card bg-tide p-4 text-white transition-transform active:scale-[0.98]">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">Module</span>
            <span className="mt-1 block font-display text-2xl font-semibold">Wash & Care</span>
          </Link>
        </motion.section>
      </motion.main>
      <BottomNav />
    </div>
  )
}
