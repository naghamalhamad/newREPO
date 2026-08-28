import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { vehicle } from '../data/mock'

const rows = [
  { label: 'Vehicles', value: vehicle.name, to: '/profile/vehicles' },
  { label: 'Payment methods', value: 'Visa •••• 4821', to: '/profile/payment-methods' },
  { label: 'Charging history', value: '', to: '/charge/history' },
  { label: 'Settings', value: '', to: '/profile/settings' },
]

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-dvh flex-col bg-stone">
      <TopBar title="Account" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-3 pb-24">
        <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-heading text-base font-normal text-stone">
            J
          </span>
          <div>
            <p className="font-medium text-ink">Jordan Ellis</p>
            <p className="text-sm text-graphite">jordan.ellis@example.com</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {rows.map((r) => (
            <Link key={r.label} to={r.to} className="flex items-center justify-between px-4 py-4 text-left">
              <span className="font-normal text-ink">{r.label}</span>
              <span className="flex items-center gap-2 text-sm text-graphite">
                {r.value}
                <span className="text-mist">›</span>
              </span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="mt-auto w-full rounded-xl border border-danger/30 bg-danger-tint py-4 text-center font-heading font-medium text-danger"
        >
          Log out
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
