import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const items = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/charge', label: 'Charge', icon: BoltIcon },
  { to: '/profile', label: 'Account', icon: UserIcon },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 z-20 flex justify-center px-4"
      style={{ bottom: 'calc(max(env(safe-area-inset-bottom), 16px) + 12px)' }}
    >
      <div className="relative flex items-center gap-4 overflow-hidden rounded-full border border-white/50 bg-stone/60 px-4 py-1 shadow-[0_8px_30px_rgba(20,23,28,0.18)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/50 to-transparent" />
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/home'} aria-label={label}>
            {({ isActive }) => (
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                whileTap={{ scale: 0.92 }}
                className={`relative flex h-12 items-center justify-center gap-2 rounded-full ${isActive ? 'px-5' : 'w-16'}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-brand/40 bg-brand/25 backdrop-blur-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 shrink-0 transition-colors duration-200 ${isActive ? 'text-brand-mid' : 'text-graphite'}`}>
                  <Icon active={isActive} />
                </span>
                {isActive && (
                  <span className="relative z-10 whitespace-nowrap font-heading text-sm font-medium text-brand-mid">{label}</span>
                )}
              </motion.span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function HomeIcon({ active }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6}>
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BoltIcon({ active }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" strokeLinejoin="round" />
    </svg>
  )
}
function UserIcon({ active }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" strokeLinecap="round" />
    </svg>
  )
}
