import { useState } from 'react'
import TopBar from '../components/TopBar'

const initial = [
  { id: 'booking', label: 'Booking reminders', desc: 'Before an upcoming wash or service', on: true },
  { id: 'charging', label: 'Charging complete', desc: 'When a charging session finishes', on: true },
  { id: 'slot', label: 'Slot available', desc: 'When a connector opens up nearby', on: true },
  { id: 'renewal', label: 'Subscription renewal', desc: 'A few days before you’re billed', on: false },
]

export default function NotificationSettings() {
  const [rows, setRows] = useState(initial)
  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Notifications" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-paper-raised">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3.5">
              <span>
                <span className="block font-medium text-ink">{r.label}</span>
                <span className="block text-sm text-ink-soft">{r.desc}</span>
              </span>
              <button
                role="switch"
                aria-checked={r.on}
                onClick={() => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))}
                className={`relative h-6 w-10 shrink-0 rounded-pill transition-colors ${r.on ? 'bg-spark' : 'bg-line'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${r.on ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
