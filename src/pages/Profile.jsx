import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { vehicle } from '../data/mock'

const rows = [
  { label: 'Vehicles', value: vehicle.name },
  { label: 'Payment methods', value: 'Visa •••• 4821' },
  { label: 'Notifications', value: 'On' },
  { label: 'Charging history', value: '' },
  { label: 'Booking history', value: '' },
]

export default function Profile() {
  return (
    <div className="min-h-dvh bg-paper pb-24">
      <TopBar title="Profile" />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="flex items-center gap-3 rounded-card border border-line bg-paper-raised p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-paper">
            N
          </span>
          <div>
            <p className="font-semibold text-ink">Nagham Alhamad</p>
            <p className="text-sm text-ink-soft">Nagham.Alhamad@leading-point.com</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-paper-raised">
          {rows.map((r) => (
            <button key={r.label} className="flex items-center justify-between px-4 py-3.5 text-left">
              <span className="font-medium text-ink">{r.label}</span>
              <span className="flex items-center gap-2 text-sm text-ink-soft">
                {r.value}
                <span className="text-ink-faint">›</span>
              </span>
            </button>
          ))}
        </div>

        <button className="mt-5 w-full rounded-xl border border-line py-3.5 font-semibold text-alert">
          Log out
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
