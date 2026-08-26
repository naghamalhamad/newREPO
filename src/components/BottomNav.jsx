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
      style={{ bottom: 'max(env(safe-area-inset-bottom), 16px)' }}
    >
      <div className="flex items-center gap-1 rounded-full border border-line/60 bg-stone/70 px-2.5 py-2 shadow-[0_8px_30px_rgba(20,23,28,0.16)] backdrop-blur-xl">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/home'}
            className="flex flex-col items-center gap-0.5 px-3.5 py-1 font-heading text-[11px]"
          >
            {({ isActive }) => (
              <>
                <motion.span whileTap={{ scale: 0.88 }} className="relative flex h-9 w-11 items-center justify-center">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-brand-tint"
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  )}
                  <span className={`relative transition-colors duration-200 ${isActive ? 'text-brand-mid' : 'text-graphite'}`}>
                    <Icon active={isActive} />
                  </span>
                </motion.span>
                <span className={isActive ? 'font-medium text-ink' : 'font-normal text-graphite'}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6}>
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BoltIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" strokeLinejoin="round" />
    </svg>
  )
}
function UserIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" strokeLinecap="round" />
    </svg>
  )
}
