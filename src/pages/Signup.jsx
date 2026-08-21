import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-stone">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-brand-tint to-stone opacity-70" />

      <div className="relative flex flex-1 flex-col px-6 pt-16 pb-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg">
            <CarIcon />
          </span>
          <h1 className="mt-4 font-heading text-2xl font-semibold text-ink">Create account</h1>
          <p className="mt-1 text-sm text-graphite">One account, two modules.</p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/home')
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium tracking-[0.08em] text-graphite">Full name</span>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
                <UserIcon />
              </span>
              <input required className="w-full rounded-xl border border-line bg-surface py-3 pr-4 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand" placeholder="Nagham Alhamad" />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium tracking-[0.08em] text-graphite">Email</span>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
                <MailIcon />
              </span>
              <input type="email" required className="w-full rounded-xl border border-line bg-surface py-3 pr-4 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand" placeholder="you@example.com" />
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
                required
                minLength={8}
                className="w-full rounded-xl border border-line bg-surface py-3 pr-11 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand"
                placeholder="At least 8 characters"
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

          <button type="submit" className="mt-1 rounded-xl bg-brand py-4 text-center font-heading font-semibold text-white active:opacity-90">
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-graphite">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand underline underline-offset-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

function CarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 16V11l2-4h12l2 4v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16h18v2.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1V18h-11v.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V16Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" strokeLinecap="round" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
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
