import { useState } from 'react'
import TopBar from '../components/TopBar'

const initialRows = [
  { id: 'charging', label: 'Charging complete', desc: 'When a charging session finishes', on: true },
  { id: 'slot', label: 'Slot available', desc: 'When a connector opens up nearby', on: true },
]

export default function Settings() {
  const [rows, setRows] = useState(initialRows)

  return (
    <div className="min-h-dvh bg-stone pb-10">
      <TopBar title="Settings" back />
      <main className="mx-auto max-w-md px-4 pt-3">
        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {rows.map((r) => (
            <button
              key={r.id}
              type="button"
              role="switch"
              aria-checked={r.on}
              onClick={() => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))}
              className="flex w-full items-center justify-between px-4 py-4 text-left active:bg-brand-tint/30"
            >
              <span>
                <span className="block font-normal text-ink">{r.label}</span>
                <span className="block text-sm text-graphite">{r.desc}</span>
              </span>
              <span className={`relative h-6 w-10 shrink-0 rounded-pill transition-colors ${r.on ? 'bg-brand' : 'bg-line'}`}>
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${r.on ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
