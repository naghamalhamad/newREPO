import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import GaugeDial from '../components/GaugeDial'
import { stations, activeSession } from '../data/mock'

export default function ActiveSession() {
  const { id } = useParams()
  const navigate = useNavigate()
  const station = stations.find((s) => s.id === id) ?? stations[0]
  const [pct, setPct] = useState(activeSession.startBatteryPct)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [ending, setEnding] = useState(false)

  useEffect(() => {
    if (ending) return
    const tick = setInterval(() => {
      setElapsedSec((s) => s + 1)
      setPct((p) => Math.min(activeSession.targetBatteryPct, p + 0.6))
    }, 400)
    return () => clearInterval(tick)
  }, [ending])

  const kwh = (elapsedSec * 0.045).toFixed(1)
  const cost = (kwh * station.priceKwh).toFixed(2)
  const mins = Math.floor(elapsedSec / 60)
  const secs = String(elapsedSec % 60).padStart(2, '0')
  const done = pct >= activeSession.targetBatteryPct

  return (
    <div className="min-h-dvh bg-stone pb-10">
      <TopBar title="Charging" back />
      <main className="mx-auto max-w-md px-4 pt-2">
        <p className="text-center text-sm text-graphite">{station.name} · {activeSession.connector}</p>

        <div className="mt-4">
          <GaugeDial value={pct} unit="%" label={done ? 'target reached' : 'battery'} accent="#c97a3b" />
        </div>

        <div className="mt-2 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-card border border-line bg-surface py-3">
            <p className="font-mono tabular text-lg font-semibold text-ink">{mins}:{secs}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-mist">elapsed</p>
          </div>
          <div className="rounded-card border border-line bg-surface py-3">
            <p className="font-mono tabular text-lg font-semibold text-ink">{kwh}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-mist">kWh</p>
          </div>
          <div className="rounded-card border border-line bg-surface py-3">
            <p className="font-mono tabular text-lg font-semibold text-charge">${cost}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-mist">cost</p>
          </div>
        </div>

        {!ending ? (
          <button
            onClick={() => setEnding(true)}
            className="mt-7 w-full rounded-xl border border-danger/30 bg-danger-tint py-4 text-center font-heading font-semibold text-danger"
          >
            Stop charging
          </button>
        ) : (
          <div className="mt-7 rounded-card border border-line bg-surface p-4 text-center">
            <p className="font-heading text-lg font-medium uppercase tracking-wide text-ink">Session ended</p>
            <p className="mt-1 text-sm text-graphite">{kwh} kWh delivered · ${cost} charged to Visa •••• 4821</p>
            <button
              onClick={() => navigate('/charge/history')}
              className="mt-4 w-full rounded-xl bg-charge py-3 text-center font-heading font-semibold text-white"
            >
              View receipt
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
