import { NavLink } from 'react-router-dom'

const items = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/charge', label: 'Charge', icon: BoltIcon },
  { to: '/profile', label: 'Account', icon: UserIcon },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-stone/95 shadow-[0_-4px_16px_rgba(20,23,28,0.06)] backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-between gap-1 px-3 pt-2 pb-[max(env(safe-area-inset-bottom),10px)]">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/home'}
            className="flex flex-1 flex-col items-center gap-1 py-1 font-heading text-[11px]"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-12 items-center justify-center rounded-full transition-colors duration-200 ${
                    isActive ? 'bg-brand-tint text-brand-mid' : 'text-graphite'
                  }`}
                >
                  <Icon active={isActive} />
                </span>
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
