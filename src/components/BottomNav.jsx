import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/charge', label: 'Charge', icon: BoltIcon },
  { to: '/wash', label: 'Wash', icon: DropIcon },
  { to: '/profile', label: 'Profile', icon: UserIcon },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper-raised/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[max(env(safe-area-inset-bottom),8px)]">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 font-heading text-[11px] font-medium ${
                isActive ? 'text-ink' : 'text-ink-faint'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon active={isActive} />
                <span>{label}</span>
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
function DropIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6}>
      <path d="M12 3c3.5 4 6 7.4 6 10.5a6 6 0 1 1-12 0C6 10.4 8.5 7 12 3Z" strokeLinejoin="round" />
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
