import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { vehicle } from '../data/mock'

const rows = [
  { label: 'Vehicles', value: vehicle.name, to: '/profile/vehicles' },
  { label: 'Payment methods', value: 'Visa •••• 4821', to: '/profile/payment-methods' },
  { label: 'Charging history', value: '', to: '/charge/history' },
]

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'settings', label: 'Notifications' },
]

const initialNotifRows = [
  { id: 'booking', label: 'Booking reminders', desc: 'Before an upcoming wash or service', on: true },
  { id: 'charging', label: 'Charging complete', desc: 'When a charging session finishes', on: true },
  { id: 'slot', label: 'Slot available', desc: 'When a connector opens up nearby', on: true },
  { id: 'renewal', label: 'Subscription renewal', desc: 'A few days before you’re billed', on: false },
]

export default function Profile() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('account')
  const [notifRows, setNotifRows] = useState(initialNotifRows)

  return (
    <div className="flex min-h-dvh flex-col bg-stone">
      <TopBar title="Account" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-3 pb-24">
        <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-heading text-base font-medium text-stone">
            J
          </span>
          <div>
            <p className="font-semibold text-ink">Jordan Ellis</p>
            <p className="text-sm text-graphite">jordan.ellis@example.com</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-1 rounded-pill border border-line bg-surface p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-pill py-2 text-center font-heading text-sm font-semibold transition-colors ${
                tab === t.id ? 'bg-brand text-ink' : 'text-graphite'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'account' ? (
          <div className="mt-4 flex flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
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
        ) : (
          <div className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
            {notifRows.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-4 py-4">
                <span>
                  <span className="block font-medium text-ink">{r.label}</span>
                  <span className="block text-sm text-graphite">{r.desc}</span>
                </span>
                <button
                  role="switch"
                  aria-checked={r.on}
                  onClick={() => setNotifRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))}
                  className={`relative h-6 w-10 shrink-0 rounded-pill transition-colors ${r.on ? 'bg-brand' : 'bg-line'}`}
                >
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${r.on ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/login')}
          className="mt-auto w-full rounded-xl border border-line py-4 font-heading font-semibold text-danger"
        >
          Log out
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
