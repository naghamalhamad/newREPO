import TopBar from '../components/TopBar'
import { notifications } from '../data/mock'

const kindStyles = {
  charging: { bg: 'bg-brand-tint', text: 'text-brand-mid' },
}

export default function Notifications() {
  return (
    <div className="min-h-dvh bg-stone pb-10">
      <TopBar title="Notifications" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <ul className="flex flex-col gap-3">
          {notifications.map((n) => {
            const k = kindStyles[n.kind]
            return (
              <li key={n.id} className={`flex gap-3 rounded-card border p-4 ${n.unread ? 'border-line bg-surface' : 'border-line/60 bg-stone'}`}>
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.unread ? k.text.replace('text-', 'bg-') : 'bg-transparent'}`} />
                <span className="flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-ink">{n.title}</span>
                    <span className="whitespace-nowrap text-[11px] text-mist">{n.when}</span>
                  </span>
                  <span className="mt-1 block text-sm text-graphite">{n.body}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
