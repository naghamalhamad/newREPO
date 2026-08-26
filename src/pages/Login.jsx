import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-stone">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-brand-tint to-stone opacity-70" />

      <div className="relative flex flex-1 flex-col px-6 pt-16 pb-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size={64} />
          <h1 className="mt-4 font-heading text-2xl font-semibold text-ink">Circuit</h1>
        </div>

        <form
          className="flex flex-1 flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/home')
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium tracking-[0.08em] text-graphite">Phone number</span>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
                <PhoneIcon />
              </span>
              <input
                type="tel"
                defaultValue="(555) 123-4567"
                className="w-full rounded-xl border border-line bg-surface py-3 pr-4 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand"
                placeholder="(555) 123-4567"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-[0.08em] text-graphite">Password</span>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
                <LockIcon />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                defaultValue="password123"
                className="w-full rounded-xl border border-line bg-surface py-3 pr-11 pl-11 text-ink outline-none placeholder:text-mist focus:border-brand"
                placeholder="Password"
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

          <div className="mt-auto flex flex-col gap-5">
            <button
              type="submit"
              className="rounded-xl bg-brand py-4 text-center font-heading font-semibold text-ink active:opacity-90"
            >
              Log in
            </button>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-line" />
              <span className="text-xs text-graphite">or</span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <button
              type="button"
              onClick={() => navigate('/home')}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-brand py-4 text-center font-heading font-semibold text-brand-mid active:bg-brand-tint/40"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-graphite">
          New here?{' '}
          <button onClick={() => navigate('/signup')} className="font-semibold text-brand-mid underline underline-offset-2">
            Create an account
          </button>
        </p>
      </div>
    </div>
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
