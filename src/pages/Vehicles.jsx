import { useState } from 'react'
import TopBar from '../components/TopBar'
import { vehicles as initialVehicles } from '../data/mock'

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')

  return (
    <div className="flex min-h-dvh flex-col bg-stone pb-10">
      <TopBar title="Vehicles" back />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-3">
        <div className="flex flex-col gap-3">
          {vehicles.map((v) => (
            <div key={v.id} className="flex items-center gap-3 rounded-card border border-line bg-surface p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M4 16V11l2-4h12l2 4v5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="7.5" cy="16.5" r="1.5" />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-ink">{v.name}</span>
                <span className="block text-sm text-graphite">{v.plate} · {v.connector} · {v.color}</span>
              </span>
            </div>
          ))}
        </div>

        {adding ? (
          <form
            className="mt-4 flex flex-col gap-3 rounded-card border border-line bg-surface p-4"
            onSubmit={(e) => {
              e.preventDefault()
              if (!name.trim()) return
              setVehicles((v) => [...v, { id: `v-${v.length + 1}`, name, plate: 'Pending', connector: 'NACS', color: '—' }])
              setName('')
              setAdding(false)
            }}
          >
            <label className="flex flex-col gap-2">
 <span className="text-[11px] tracking-[0.08em] text-mist">Vehicle nickname</span>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Model 3"
                className="rounded-xl border border-line bg-stone px-4 py-3 text-ink outline-none focus:border-brand"
              />
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setAdding(false)} className="flex-1 rounded-xl border border-brand py-3 font-heading font-semibold text-brand">
                Cancel
              </button>
              <button type="submit" className="flex-1 rounded-xl bg-brand py-3 font-heading font-semibold text-white">
                Add vehicle
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="mt-auto w-full rounded-xl border border-dashed border-line py-4 font-heading font-semibold text-graphite"
          >
            + Add a vehicle
          </button>
        )}
      </main>
    </div>
  )
}
