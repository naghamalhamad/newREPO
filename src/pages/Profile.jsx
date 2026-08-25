import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { vehicle } from '../data/mock'

const rows = [
  { label: 'Vehicles', value: vehicle.name, to: '/profile/vehicles' },
  { label: 'Payment methods', value: 'Visa •••• 4821', to: '/profile/payment-methods' },
  { label: 'Notifications', value: 'On', to: '/profile/notifications' },
  { label: 'Charging history', value: '', to: '/charge/history' },
]

export default function Profile() {
  const navigate = useNavigate()
  return (
    <div className="min-h-dvh bg-stone pb-24">
      <TopBar title="Account" />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-heading text-base font-medium text-stone">
            J
          </span>
          <div>
            <p className="font-semibold text-ink">Jordan Ellis</p>
            <p className="text-sm text-graphite">jordan.ellis@example.com</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {rows.map((r) => (
            <Link key={r.label} to={r.to} className="flex items-center justify-between px-4 py-4 text-left">
              <span className="font-medium text-ink">{r.label}</span>
              <span className="flex items-center gap-2 text-sm text-graphite">
                {r.value}
                <span className="text-mist">›</span>
              </span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="mt-5 w-full rounded-xl border border-line py-4 font-heading font-semibold text-danger"
        >
          Log out
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
