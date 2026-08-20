import { useState } from 'react'
import TopBar from '../components/TopBar'
import { vehicles as initialVehicles } from '../data/mock'

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')

  return (
    <div className="min-h-dvh bg-paper pb-10">
      <TopBar title="Vehicles" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="flex flex-col gap-2.5">
          {vehicles.map((v) => (
            <div key={v.id} className="flex items-center gap-3 rounded-card border border-line bg-paper-raised p-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-spark-dim text-spark-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M4 16V11l2-4h12l2 4v5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="7.5" cy="16.5" r="1.5" />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-ink">{v.name}</span>
                <span className="block text-sm text-ink-soft">{v.plate} · {v.connector} · {v.color}</span>
              </span>
            </div>
          ))}
        </div>

        {adding ? (
          <form
            className="mt-4 flex flex-col gap-3 rounded-card border border-line bg-paper-raised p-4"
            onSubmit={(e) => {
              e.preventDefault()
              if (!name.trim()) return
              setVehicles((v) => [...v, { id: `v-${v.length + 1}`, name, plate: 'Pending', connector: 'NACS', color: '—' }])
              setName('')
              setAdding(false)
            }}
          >
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Vehicle nickname</span>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Model 3"
                className="rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-spark"
              />
            </label>
            <div className="flex gap-2.5">
              <button type="button" onClick={() => setAdding(false)} className="flex-1 rounded-xl border border-line py-3 font-semibold text-ink">
                Cancel
              </button>
              <button type="submit" className="flex-1 rounded-xl bg-spark py-3 font-semibold text-white">
                Add vehicle
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="mt-4 w-full rounded-xl border border-dashed border-line py-3.5 font-semibold text-ink-soft"
          >
            + Add a vehicle
          </button>
        )}
      </main>
    </div>
  )
}
