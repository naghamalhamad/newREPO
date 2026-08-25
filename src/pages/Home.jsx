import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import NotifBell from '../components/NotifBell'
import { vehicle, stations } from '../data/mock'

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

const AVG_MPH = 45 // used only to turn remaining range into a rough drive-time estimate

function driveTimeLabel(rangeMi) {
  const totalMin = Math.round((rangeMi / AVG_MPH) * 60)
  const h = Math.floor(totalMin / 60)
  const m = String(totalMin % 60).padStart(2, '0')
  return `${h}h ${m}m`
}

export default function Home() {
  const nearest = stations[0]
  return (
    <div className="min-h-dvh bg-stone pb-24">
      <TopBar title="Home" action={<NotifBell />} />
      <motion.main variants={container} initial="hidden" animate="show" className="mx-auto max-w-md px-4 pt-4">
 <motion.p variants={item} className="font-heading text-lg font-medium text-ink">
          {greeting()}, Jordan
        </motion.p>

        <motion.section variants={item} className="mt-2 grid grid-cols-2 gap-3">
          <div className="rounded-card bg-ink p-4 text-stone">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="7" width="18" height="10" rx="2.5" />
                  <path d="M22 10v4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-heading text-sm font-semibold">Battery</span>
            </div>

            <div className="mt-4 flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-extrabold leading-none tabular">{vehicle.batteryPct}</span>
              <span className="text-base text-stone/50">%</span>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-light transition-all duration-700"
                style={{ width: `${vehicle.batteryPct}%` }}
              />
            </div>

            <p className="mt-2 truncate text-xs text-stone/45">{vehicle.name}</p>
          </div>

          <div className="rounded-card border border-line bg-surface p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-tint text-brand-mid">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-heading text-sm font-semibold text-ink">Remaining</span>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-xl font-extrabold tabular text-ink">{vehicle.rangeMi} mi</span>
              <span className="rounded-pill bg-brand-tint px-2 py-1 font-mono text-[11px] font-semibold text-brand-mid">
                {driveTimeLabel(vehicle.rangeMi)}
              </span>
            </div>

            <p className="mt-2 text-xs text-graphite">Remaining distance and time</p>
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
      </motion.main>
      <BottomNav />
    </div>
  )
}
