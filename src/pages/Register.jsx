import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import StepProgress from '../components/StepProgress'
import { carBrands, carTypes, chargerTypes } from '../data/mock'

const TOTAL_STEPS = 3

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [brandQuery, setBrandQuery] = useState('')
  const [brand, setBrand] = useState('')
  const [manualEntry, setManualEntry] = useState(false)
  const [manualBrand, setManualBrand] = useState('')

  const [carType, setCarType] = useState('')
  const [chargerType, setChargerType] = useState('')

  const [showLocationPrompt, setShowLocationPrompt] = useState(false)

  const filteredBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase()
    if (!q) return carBrands
    return carBrands.filter((b) => b.toLowerCase().includes(q))
  }, [brandQuery])

  function goBack() {
    if (step === 1) navigate('/login')
    else setStep((s) => s - 1)
  }

  function finish() {
    setShowLocationPrompt(true)
  }

  const step1Valid = phone.trim().length >= 7 && password.length >= 8
  const step2Valid = manualEntry ? manualBrand.trim().length > 0 : brand.length > 0
  const step3Valid = carType.length > 0 && chargerType.length > 0

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-stone">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-brand-tint to-stone opacity-70" />

      <div className="relative flex flex-1 flex-col px-6 pt-6 pb-10">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            aria-label="Back"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-graphite"
          >
            <ChevronLeftIcon />
          </button>
          <div className="flex-1">
            <StepProgress step={step} total={TOTAL_STEPS} />
          </div>
        </div>

        {step === 1 && (
          <div className="flex flex-1 flex-col">
            <h1 className="font-heading text-2xl font-semibold text-ink">Create your account</h1>
            <p className="mt-1 text-sm text-graphite">Let's start with the basics.</p>

            <div className="mt-7 flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-medium tracking-[0.08em] text-graphite">Phone number</span>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
                    <PhoneIcon />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full rounded-xl border border-line bg-surface py-3 pr-4 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-medium tracking-[0.08em] text-graphite">Password</span>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-line bg-surface py-3 pr-11 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-2 flex w-9 items-center justify-center text-graphite"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </label>
            </div>

            <div className="mt-auto flex flex-col gap-5 pt-8">
              <button
                type="button"
                disabled={!step1Valid}
                onClick={() => setStep(2)}
                className="rounded-xl bg-brand py-4 text-center font-heading font-semibold text-ink active:opacity-90 disabled:bg-line disabled:text-disabled-text"
              >
                Continue
              </button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-line" />
                <span className="text-xs text-graphite">or</span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center justify-center gap-2.5 rounded-xl border border-brand py-4 text-center font-heading font-semibold text-brand-mid active:bg-brand-tint/40"
              >
                <GoogleIcon />
                Sign up with Google
              </button>

              <p className="text-center text-sm text-graphite">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-brand-mid underline underline-offset-2">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-1 flex-col">
            <h1 className="font-heading text-2xl font-semibold text-ink">What do you drive?</h1>
            <p className="mt-1 text-sm text-graphite">Search for your car's brand.</p>

            {!manualEntry ? (
              <>
                <div className="relative mt-6">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
                    <SearchIcon />
                  </span>
                  <input
                    autoFocus
                    value={brandQuery}
                    onChange={(e) => setBrandQuery(e.target.value)}
                    placeholder="Search brands"
                    className="w-full rounded-xl border border-line bg-surface py-3 pr-4 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand"
                  />
                </div>

                <div className="mt-4 flex-1 overflow-y-auto">
                  {filteredBrands.length === 0 ? (
                    <p className="p-4 text-center text-sm text-graphite">No brands match "{brandQuery}".</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {filteredBrands.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBrand(b)}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                            brand === b ? 'border-brand bg-brand-tint/40' : 'border-line bg-surface'
                          }`}
                        >
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                            brand === b ? 'bg-brand text-ink' : 'bg-brand-tint text-brand-mid'
                          }`}>
                            <CarIcon />
                          </span>
                          <span className={`flex-1 text-sm font-medium ${brand === b ? 'text-brand-mid' : 'text-ink'}`}>
                            {b}
                          </span>
                          {brand === b && <CheckIcon />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setManualEntry(true)}
                  className="mt-4 text-center text-sm font-medium text-brand-mid underline underline-offset-2"
                >
                  Can't find your car? Enter it manually
                </button>
              </>
            ) : (
              <div className="mt-6 flex flex-col gap-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-medium tracking-[0.08em] text-graphite">Car brand</span>
                  <input
                    autoFocus
                    value={manualBrand}
                    onChange={(e) => setManualBrand(e.target.value)}
                    placeholder="e.g. Fisker"
                    className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none placeholder:text-mist focus:border-brand"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setManualEntry(false)
                    setManualBrand('')
                  }}
                  className="mt-2 text-center text-sm font-medium text-brand-mid underline underline-offset-2"
                >
                  Pick from the list instead
                </button>
              </div>
            )}

            <button
              type="button"
              disabled={!step2Valid}
              onClick={() => setStep(3)}
              className="mt-auto rounded-xl bg-brand py-4 text-center font-heading font-semibold text-ink active:opacity-90 disabled:bg-line disabled:text-disabled-text"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-1 flex-col">
            <h1 className="font-heading text-2xl font-semibold text-ink">A few more details</h1>
            <p className="mt-1 text-sm text-graphite">This helps us match you to the right chargers.</p>

            <section className="mt-7">
              <h2 className="font-heading text-base font-medium text-ink">Vehicle type</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {carTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setCarType(t)}
                    className={`rounded-pill border px-4 py-2.5 text-sm font-medium ${
                      carType === t ? 'border-brand bg-brand-tint text-brand-mid' : 'border-line bg-surface text-ink'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h2 className="font-heading text-base font-medium text-ink">Charger connector</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {chargerTypes.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setChargerType(c)}
                    className={`rounded-pill border px-4 py-2.5 text-sm font-medium ${
                      chargerType === c ? 'border-brand bg-brand-tint text-brand-mid' : 'border-line bg-surface text-ink'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </section>

            <button
              type="button"
              disabled={!step3Valid}
              onClick={finish}
              className="mt-auto rounded-xl bg-brand py-4 text-center font-heading font-semibold text-ink active:opacity-90 disabled:bg-line disabled:text-disabled-text"
            >
              Finish
            </button>
          </div>
        )}
      </div>

      {showLocationPrompt && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-card bg-surface p-6 text-center shadow-lg">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-tint text-brand-mid">
              <PinIcon />
            </span>
            <h2 className="mt-4 font-heading text-lg font-semibold text-ink">Allow "Car Care" to use your location?</h2>
            <p className="mt-2 text-sm text-graphite">Used to show nearby charging stations and estimate how long it'll take to get there.</p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="rounded-xl bg-brand py-3.5 font-heading font-semibold text-ink active:opacity-90"
              >
                Allow While Using App
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="rounded-xl py-3.5 font-heading font-semibold text-graphite"
              >
                Don't Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C10.7 18 6 13.3 4.5 6.2A2 2 0 0 1 6.5 3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  )
}
function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a15.6 15.6 0 0 1-4.1 4.9M6.6 6.6C3.7 8.5 2 12 2 12s3.6 7 10 7c1.4 0 2.6-.3 3.7-.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  )
}
function CarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 16v-3.5L6 8h12l2 4.5V16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16h16" strokeLinecap="round" />
      <circle cx="7.5" cy="16.5" r="1.6" />
      <circle cx="16.5" cy="16.5" r="1.6" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="m5 13 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  )
}
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5Z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4 24 4c-7.7 0-14.4 4.3-17.7 10.7Z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.3C29.3 35.4 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44Z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.3C39.9 36.9 44 31 44 24c0-1.3-.1-2.7-.4-3.5Z" />
    </svg>
  )
}
