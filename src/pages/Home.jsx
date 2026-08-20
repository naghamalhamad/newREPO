import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
    <div className="min-h-dvh bg-stone pb-24">
      <TopBar title="Home" action={<NotifBell />} />
      <motion.main variants={container} initial="hidden" animate="show" className="mx-auto max-w-md px-4 pt-4">
 <motion.p variants={item} className="text-[11px] tracking-[0.1em] text-mist">
          {greeting()}, Nagham
        </motion.p>

        <motion.section variants={item} className="mt-2">
          <div className="rounded-card bg-ink p-5 text-stone">
            <div className="flex items-start justify-between">
              <div>
 <p className="text-[11px] tracking-[0.1em] text-stone/45">Your vehicle</p>
 <p className="mt-1 font-heading text-xl font-medium">{vehicle.name}</p>
              </div>
              <span className="rounded-pill border border-white/15 px-3 py-1 font-mono text-[11px] text-stone/70">
                {vehicle.plate}
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-5xl font-extrabold leading-none tabular">{vehicle.batteryPct}</span>
                <span className="text-sm text-stone/50">%</span>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-stone/80">{vehicle.rangeMi} mi range</p>
                <p className="mt-1 text-xs text-stone/45">{vehicle.connector} connector</p>
              </div>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand transition-all duration-700"
                style={{ width: `${vehicle.batteryPct}%` }}
              />
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} className="mt-7">
          <div className="flex items-baseline justify-between">
 <h2 className="font-heading text-base font-medium text-ink">Nearest charger</h2>
 <Link to="/charge" className="font-heading text-xs font-medium text-brand-mid">
              See map
            </Link>
          </div>
          <Link
            to={`/charge/${nearest.id}`}
            className="mt-3 flex items-center gap-3 rounded-card border border-line bg-surface p-4 transition-colors active:bg-brand-tint/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" /></svg>
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-ink">{nearest.name}</span>
              <span className="block text-sm text-graphite">{nearest.distanceMi} mi · {nearest.total - nearest.occupied} of {nearest.total} free</span>
            </span>
            <span className="text-mist">›</span>
          </Link>
        </motion.section>

        <motion.section variants={item} className="mt-7">
          <div className="flex items-baseline justify-between">
 <h2 className="font-heading text-base font-medium text-ink">Upcoming booking</h2>
 <Link to="/wash" className="font-heading text-xs font-medium text-brand-mid">
              Book more
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-card border border-line bg-surface p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c3.5 4 6 7.4 6 10.5a6 6 0 1 1-12 0C6 10.4 8.5 7 12 3Z" /></svg>
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-ink">{nextBooking.service}</span>
              <span className="block text-sm text-graphite">{nextBooking.provider} · {nextBooking.when}</span>
            </span>
            <span className="rounded-pill bg-success-tint px-2 py-1 text-[11px] font-medium text-success">confirmed</span>
          </div>
        </motion.section>
      </motion.main>
      <BottomNav />
    </div>
  )
}
