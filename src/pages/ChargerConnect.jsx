import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import CarChargingIllustration from '../components/CarChargingIllustration'
import { stations } from '../data/mock'

const DETECT_DELAY_MS = 2200

export default function ChargerConnect() {
  const { id } = useParams()
  const navigate = useNavigate()
  const station = stations.find((s) => s.id === id) ?? stations[0]
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setConnected(true), DETECT_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex min-h-dvh flex-col bg-stone pb-10">
      <TopBar title="Connect Charger" back />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pt-8 text-center">
        <p className="font-heading text-lg font-normal text-ink">{station.name}</p>
        <p className="mt-1 text-sm text-graphite">Plug the charger into your car to begin</p>

        <div className="mt-10 w-full">
          <CarChargingIllustration connected={connected} />
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-graphite">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Waiting for charger connection…
        </div>
      </main>

      {connected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-card bg-surface p-6 text-center shadow-lg">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
              <BoltIcon />
            </span>
            <h2 className="mt-4 font-heading text-lg font-medium text-ink">Charger Connected</h2>
            <p className="mt-2 text-sm text-graphite">Your charger is plugged in and ready. Start charging when you're ready.</p>
            <button
              type="button"
              onClick={() => navigate(`/charge/${station.id}/session`, { replace: true })}
              className="mt-6 w-full rounded-xl bg-brand py-3.5 font-heading font-medium text-ink active:opacity-90"
            >
              Start Charging
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
    </svg>
  )
}
