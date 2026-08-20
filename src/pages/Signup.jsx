import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-dvh flex-col bg-ink px-6">
      <div className="flex flex-1 flex-col justify-center pb-10">
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 3a9 9 0 1 1-6.36 2.64" />
              </svg>
            </span>
            <span className="font-heading text-2xl font-medium uppercase tracking-wide text-stone">Create account</span>
          </div>
          <p className="mt-3 text-[13px] uppercase tracking-[0.1em] text-stone/50">
            One account, two modules.
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/home')
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.08em] text-stone/50">Full name</span>
            <input required className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-stone outline-none placeholder:text-stone/30 focus:border-brand" placeholder="Nagham Alhamad" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.08em] text-stone/50">Email</span>
            <input type="email" required className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-stone outline-none placeholder:text-stone/30 focus:border-brand" placeholder="you@example.com" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.08em] text-stone/50">Password</span>
            <input type="password" required className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-stone outline-none placeholder:text-stone/30 focus:border-brand" placeholder="At least 8 characters" />
          </label>

          <button type="submit" className="mt-2 rounded-xl bg-brand py-4 text-center font-heading font-semibold text-white active:opacity-90">
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone/50">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand underline underline-offset-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
