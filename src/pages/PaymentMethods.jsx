import { useState } from 'react'
import TopBar from '../components/TopBar'
import { paymentMethods as initial } from '../data/mock'

export default function PaymentMethods() {
  const [methods, setMethods] = useState(initial)

  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Payment methods" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="flex flex-col gap-2.5">
          {methods.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-card border border-line bg-paper-raised p-3.5">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-12 items-center justify-center rounded-md bg-ink font-mono text-[10px] font-semibold text-paper">
                  {m.brand.slice(0, 4).toUpperCase()}
                </span>
                <span>
                  <span className="block font-semibold text-ink">•••• {m.last4}</span>
                  <span className="block text-sm text-ink-soft">Expires {m.expiry}</span>
                </span>
              </span>
              {m.primary ? (
                <span className="rounded-pill bg-status-dim px-2.5 py-1 font-mono text-[11px] text-status">default</span>
              ) : (
                <button
                  onClick={() => setMethods((ms) => ms.map((x) => ({ ...x, primary: x.id === m.id })))}
                  className="font-mono text-xs uppercase tracking-wide text-spark"
                >
                  Make default
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="mt-4 w-full rounded-xl border border-dashed border-line py-3.5 font-semibold text-ink-soft">
          + Add a card
        </button>
      </main>
    </div>
  )
}
