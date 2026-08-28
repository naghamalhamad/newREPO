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
 <motion.p variants={item} className="font-heading text-lg font-normal text-ink">
          {greeting()}, Jordan
        </motion.p>
        <motion.p variants={item} className="font-heading text-sm font-medium text-brand-mid">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long' })}, {new Date().getDate()} {new Date().toLocaleDateString('en-GB', { month: 'long' })}
        </motion.p>

        <motion.section variants={item} className="mt-2">
          <div className="relative overflow-hidden rounded-card bg-ink p-5 text-stone">
            <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
            <svg
              className="pointer-events-none absolute -bottom-2 -right-4 h-24 w-44 text-stone/[0.07]"
              viewBox="0 0 220 100"
              fill="currentColor"
            >
              <path d="M14 70c-5 0-9-4-9-9v-6c0-8 6-14 14-15l20-2c10-19 29-31 51-31h24c22 0 41 13 49 33l18 2c8 1 14 7 14 15v4c0 5-4 9-9 9h-6a20 20 0 1 0-40 0H60a20 20 0 1 0-40 0h-6z" />
            </svg>

            <div className="relative flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="7" width="18" height="10" rx="2.5" />
                  <path d="M22 10v4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-heading text-sm font-medium">Battery</span>
            </div>

            <div className="relative mt-4 flex items-end justify-between">
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-5xl font-bold leading-none tabular">{vehicle.batteryPct}</span>
                <span className="text-sm text-stone/50">%</span>
              </div>
              <p className="text-xs text-stone/60">{vehicle.name}</p>
            </div>

            <div className="relative mt-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-brand-light via-brand to-brand-mid shadow-[0_0_12px_rgba(41,218,153,0.7)] transition-all duration-700"
                style={{ width: `${vehicle.batteryPct}%` }}
              />
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} className="mt-3">
          <div className="rounded-card bg-surface p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-tint text-brand-mid">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-heading text-sm font-medium text-ink">Remaining</span>
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold tabular text-ink">{vehicle.rangeMi} mi</span>
              <span className="rounded-pill bg-brand-tint px-2.5 py-1 font-mono text-xs font-medium text-brand-mid">
                {driveTimeLabel(vehicle.rangeMi)}
              </span>
            </div>

            <p className="mt-2 text-sm text-graphite">Remaining distance and time</p>
          </div>
        </motion.section>

        <motion.section variants={item} className="mt-7">
          <div className="flex items-baseline justify-between">
 <h2 className="font-heading text-base font-normal text-ink">Nearest charger</h2>
 <Link to="/charge" className="font-heading text-xs font-normal text-brand-mid">
              See map
            </Link>
          </div>
          <Link
            to={`/charge/${nearest.id}`}
            className="mt-3 flex items-center gap-3 rounded-card bg-surface p-4 transition-colors active:bg-brand-tint/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" /></svg>
            </span>
            <span className="flex-1">
              <span className="block font-medium text-ink">{nearest.name}</span>
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
