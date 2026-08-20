import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { notifications } from '../data/mock'

const kindStyles = {
  charging: { bg: 'bg-spark-dim', text: 'text-spark-ink' },
  booking: { bg: 'bg-tide-dim', text: 'text-tide-ink' },
  subscription: { bg: 'bg-copper-dim', text: 'text-copper' },
}

export default function Notifications() {
  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar
        title="Notifications"
        back
        action={
          <Link to="/profile/notifications" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Settings
          </Link>
        }
      />
      <main className="mx-auto max-w-md px-4 pt-3">
        <ul className="flex flex-col gap-2.5">
          {notifications.map((n) => {
            const k = kindStyles[n.kind]
            return (
              <li key={n.id} className={`flex gap-3 rounded-card border p-3.5 ${n.unread ? 'border-line bg-paper-raised' : 'border-line/60 bg-paper'}`}>
                <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? k.text.replace('text-', 'bg-') : 'bg-transparent'}`} />
                <span className="flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-ink">{n.title}</span>
                    <span className="whitespace-nowrap text-[11px] text-ink-faint">{n.when}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-soft">{n.body}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
