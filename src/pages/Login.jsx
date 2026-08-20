import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-dvh flex-col bg-ink px-6">
      <div className="flex flex-1 flex-col justify-center pb-10">
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-spark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
              </svg>
            </span>
            <span className="font-heading text-3xl font-extrabold uppercase tracking-wide text-paper">Car Care</span>
          </div>
          <p className="mt-3 text-[13px] uppercase tracking-[0.1em] text-paper/50">
            Charge. Wash. Maintain.
          </p>
        </div>

        <form
          className="flex flex-col gap-3.5"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-[0.08em] text-paper/50">Email</span>
            <input
              type="email"
              defaultValue="nagham@example.com"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-paper outline-none placeholder:text-paper/30 focus:border-spark"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-[0.08em] text-paper/50">Password</span>
            <input
              type="password"
              defaultValue="••••••••"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-paper outline-none placeholder:text-paper/30 focus:border-spark"
              placeholder="Password"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-spark py-3.5 text-center font-semibold text-white active:opacity-90"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-xl border border-white/15 py-3.5 text-center font-semibold text-paper active:opacity-80"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-paper/50">
          New here?{' '}
          <button onClick={() => navigate('/signup')} className="font-semibold text-spark underline underline-offset-2">
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}
