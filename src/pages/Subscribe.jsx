import { useState } from 'react'
import TopBar from '../components/TopBar'

const plans = [
  { id: 'p1', name: '1× / week', price: 22, save: null },
  { id: 'p2', name: '2× / week', price: 38, save: '20%' },
  { id: 'p3', name: 'Unlimited', price: 79, save: '35%' },
]

export default function Subscribe() {
  const [picked, setPicked] = useState('p2')
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) {
    const plan = plans.find((p) => p.id === picked)
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6 text-center">
        <h1 className="font-heading text-2xl font-semibold text-ink">You're subscribed</h1>
        <p className="mt-1.5 text-ink-soft">{plan.name} wash package · ${plan.price}/mo</p>
        <a href="/wash" className="mt-6 rounded-xl bg-tide px-6 py-3 font-heading font-semibold text-white">
          Back to Wash & Care
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Subscribe" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <p className="text-ink-soft">Pick a recurring full-wash package, billed monthly. Cancel anytime.</p>
        <div className="mt-4 flex flex-col gap-2.5">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setPicked(p.id)}
              className={`flex items-center justify-between rounded-card border p-4 text-left ${
                picked === p.id ? 'border-tide bg-tide-dim/50' : 'border-line bg-paper-raised'
              }`}
            >
              <span>
                <span className="block font-semibold text-ink">{p.name}</span>
                {p.save && <span className="block text-sm text-tide-ink">Save {p.save}</span>}
              </span>
              <span className="font-mono font-semibold text-copper">${p.price}/mo</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setConfirmed(true)}
          className="mt-7 w-full rounded-xl bg-tide py-3.5 text-center font-heading font-semibold text-white"
        >
          Subscribe
        </button>
      </main>
    </div>
  )
}
