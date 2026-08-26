import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import CarChargingIllustration from '../components/CarChargingIllustration'
import { stations, activeSession, vehicle } from '../data/mock'

const PCT_PER_SEC = 1.5 // matches the simulated fill rate below, so the countdown hits 0 exactly when the ring finishes
const MI_PER_PCT = vehicle.rangeMi / vehicle.batteryPct

export default function ActiveSession() {
  const { id } = useParams()
  const navigate = useNavigate()
  const station = stations.find((s) => s.id === id) ?? stations[0]
  const [pct, setPct] = useState(activeSession.startBatteryPct)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [unplugged, setUnplugged] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  const completeShown = useRef(false)

  useEffect(() => {
    if (unplugged) return
    const tick = setInterval(() => {
      setElapsedSec((s) => s + 1)
      setPct((p) => Math.min(activeSession.targetBatteryPct, p + 0.6))
    }, 400)
    return () => clearInterval(tick)
  }, [unplugged])

  const kwh = (elapsedSec * 0.045).toFixed(1)
  const cost = (kwh * station.priceKwh).toFixed(2)
  const mins = Math.floor(elapsedSec / 60)
  const secs = String(elapsedSec % 60).padStart(2, '0')
  const done = pct >= activeSession.targetBatteryPct

  useEffect(() => {
    if (done && !completeShown.current) {
      completeShown.current = true
      setShowComplete(true)
    }
  }, [done])

  const rangeAddedMi = Math.round((pct - activeSession.startBatteryPct) * MI_PER_PCT)
  const remainingSec = Math.max(0, Math.ceil((activeSession.targetBatteryPct - pct) / PCT_PER_SEC))
  const remainingMin = Math.ceil(remainingSec / 60)

  return (
    <div className="flex min-h-dvh flex-col bg-stone pb-10">
      <TopBar title="Charging" back />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-2">
        <p className="text-center text-sm text-graphite">{station.name} · {activeSession.connector}</p>

        <div className="mt-2">
          <CarChargingIllustration connected charging={!unplugged && !done} />
        </div>

        <div className="mt-2 flex items-end justify-center gap-1 font-mono">
          <span className="text-4xl font-bold leading-none tabular text-ink">{Math.round(pct)}</span>
          <span className="mb-1 text-sm text-mist">%</span>
        </div>
        <div className="mx-auto mt-2 h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-card border border-brand-light bg-brand-tint/30 py-4">
            <p className="font-mono tabular text-2xl font-bold text-brand-mid">
              {done ? 'Done' : `${remainingMin} min`}
            </p>
            <p className="mt-1 text-xs text-graphite">{done ? 'charging complete' : 'time remaining'}</p>
          </div>
          <div className="rounded-card border border-brand-light bg-brand-tint/30 py-4">
            <p className="font-mono tabular text-2xl font-bold text-brand-mid">+{rangeAddedMi} mi</p>
            <p className="mt-1 text-xs text-graphite">range added</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-card border border-line bg-surface py-3">
            <p className="font-mono tabular text-lg font-medium text-ink">{mins}:{secs}</p>
            <p className="mt-1 text-[10px] text-mist">elapsed</p>
          </div>
          <div className="rounded-card border border-line bg-surface py-3">
            <p className="font-mono tabular text-lg font-medium text-ink">{kwh}</p>
            <p className="mt-1 text-[10px] text-mist">kWh</p>
          </div>
          <div className="rounded-card border border-line bg-surface py-3">
            <p className="font-mono tabular text-lg font-medium text-brand-mid">${cost}</p>
            <p className="mt-1 text-[10px] text-mist">cost</p>
          </div>
        </div>

        <button
          onClick={() => setUnplugged(true)}
          className="mt-auto w-full rounded-xl border border-danger/30 bg-danger-tint py-4 text-center font-heading font-medium text-danger"
        >
          Stop charging
        </button>
      </main>

      {showComplete && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-card bg-surface p-6 text-center shadow-lg">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-tint text-success">
              <CheckIcon />
            </span>
            <h2 className="mt-4 font-heading text-lg font-medium text-ink">Charging Complete</h2>
            <p className="mt-2 text-sm text-graphite">Your battery reached {activeSession.targetBatteryPct}%. You can unplug the charger whenever you're ready.</p>
            <button
              type="button"
              onClick={() => setShowComplete(false)}
              className="mt-6 w-full rounded-xl bg-brand py-3.5 font-heading font-medium text-ink active:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {unplugged && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-card bg-surface p-6 text-center shadow-lg">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning-tint text-warning">
              <UnplugIcon />
            </span>
            <h2 className="mt-4 font-heading text-lg font-medium text-ink">Charger Unplugged</h2>
            <p className="mt-2 text-sm text-graphite">Charging has stopped. Review your session details to complete payment.</p>
            <button
              type="button"
              onClick={() => navigate(`/charge/${station.id}/summary`, { replace: true, state: { kwh, cost, mins } })}
              className="mt-6 w-full rounded-xl bg-brand py-3.5 font-heading font-medium text-ink active:opacity-90"
            >
              View Session
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UnplugIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" strokeLinejoin="round" opacity="0.4" />
      <path d="m5 5 14 14" strokeLinecap="round" />
    </svg>
  )
}
