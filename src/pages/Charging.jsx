import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { stations } from '../data/mock'

function busyLabel(s) {
  const ratio = s.occupied / s.total
  if (ratio >= 1) return { text: 'Full', bg: 'bg-danger-tint', text_: 'text-danger' }
  if (ratio >= 0.6) return { text: 'Busy', bg: 'bg-warning-tint', text_: 'text-warning' }
  return { text: 'Open', bg: 'bg-success-tint', text_: 'text-success' }
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const row = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
}

export default function Charging() {
  return (
    <div className="min-h-dvh bg-stone pb-24">
      <TopBar title="Charging" />

      <div className="relative mx-4 mt-3 h-44 overflow-hidden rounded-card border border-line bg-brand-tint">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="0" y="0" width="400" height="180" fill="var(--color-brand-tint)" />
          <rect x="-20" y="10" width="150" height="90" rx="16" fill="#ffffff" opacity="0.55" />
          <rect x="210" y="95" width="130" height="100" rx="16" fill="#ffffff" opacity="0.4" />
          <rect x="150" y="-10" width="110" height="70" rx="14" fill="#ffffff" opacity="0.35" />
          <path d="M0 60 C 90 30, 140 110, 240 70 S 360 40, 400 90" stroke="#ffffff" strokeWidth="10" fill="none" opacity="0.7" strokeLinecap="round" />
          <path d="M40 180 C 90 130, 60 90, 130 60 S 260 20, 300 -10" stroke="#ffffff" strokeWidth="8" fill="none" opacity="0.5" strokeLinecap="round" />
        </svg>
        {stations.map((s, i) => {
          const open = s.occupied < s.total
          return (
            <span
              key={s.id}
              className="absolute flex h-7 w-7 items-center justify-center"
              style={{ left: `${18 + i * 22}%`, top: `${30 + (i % 2) * 34}%` }}
            >
              {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/40" />}
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-brand text-[10px] font-bold text-white shadow">
                {s.total - s.occupied}
              </span>
            </span>
          )
        })}
 <span className="absolute bottom-2 right-3 rounded-pill bg-white/70 px-2 py-1 text-[10px] font-medium text-brand-mid/70 backdrop-blur-sm">
          Map preview
        </span>
      </div>

      <main className="mx-auto max-w-md px-4">
        <div className="mt-4 flex items-center justify-between">
 <h2 className="font-heading text-base font-medium text-ink">{stations.length} stations nearby</h2>
 <button className="font-heading text-xs font-medium text-graphite">Filter</button>
        </div>

        <motion.ul variants={list} initial="hidden" animate="show" className="mt-2 flex flex-col gap-3">
          {stations.map((s) => {
            const busy = busyLabel(s)
            return (
              <motion.li key={s.id} variants={row}>
                <Link
                  to={`/charge/${s.id}`}
                  className="flex flex-col gap-3 rounded-card border border-line bg-surface p-4 transition-colors active:bg-brand-tint/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{s.name}</p>
                      <p className="mt-1 text-sm text-graphite">{s.address}</p>
                    </div>
                    <span className="whitespace-nowrap font-mono text-sm text-graphite">{s.distanceMi} mi</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-line pt-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${busy.bg} ${busy.text_}`}>
                        {busy.text}
                      </span>
                      <span className="tabular font-mono text-sm text-graphite">{s.total - s.occupied}/{s.total} free</span>
                    </div>
                    <span className="tabular font-mono text-sm font-semibold text-brand-mid">${s.priceKwh.toFixed(2)}/kWh</span>
                  </div>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </main>
      <BottomNav />
    </div>
  )
}
