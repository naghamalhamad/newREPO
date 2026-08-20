import { Link } from 'react-router-dom'
import { notifications } from '../data/mock'

export default function NotifBell() {
  const unread = notifications.filter((n) => n.unread).length
  return (
    <Link to="/notifications" aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
      </svg>
      {unread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-copper px-1 font-mono text-[9px] font-semibold text-white">
          {unread}
        </span>
      )}
    </Link>
  )
}
