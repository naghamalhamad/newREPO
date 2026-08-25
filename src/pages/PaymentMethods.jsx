import { useState } from 'react'
import TopBar from '../components/TopBar'
import { paymentMethods as initial } from '../data/mock'

export default function PaymentMethods() {
  const [methods, setMethods] = useState(initial)

  return (
    <div className="flex min-h-dvh flex-col bg-stone pb-10">
      <TopBar title="Payment methods" back />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-3">
        <div className="flex flex-col gap-3">
          {methods.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-card border border-line bg-surface p-4">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-12 items-center justify-center rounded-lg bg-ink text-[10px] font-semibold text-stone">
                  {m.brand.slice(0, 4).toUpperCase()}
                </span>
                <span>
                  <span className="block font-semibold text-ink">•••• {m.last4}</span>
                  <span className="block text-sm text-graphite">Expires {m.expiry}</span>
                </span>
              </span>
              {m.primary ? (
                <span className="rounded-pill bg-success-tint px-3 py-1 text-[11px] font-medium text-success">default</span>
              ) : (
                <button
                  onClick={() => setMethods((ms) => ms.map((x) => ({ ...x, primary: x.id === m.id })))}
 className="font-heading text-xs font-medium text-brand"
                >
                  Make default
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="mt-auto w-full rounded-xl border border-dashed border-line py-4 font-heading font-semibold text-graphite">
          + Add a card
        </button>
      </main>
    </div>
  )
}
