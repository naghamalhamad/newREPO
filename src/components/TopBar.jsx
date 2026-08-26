import { useNavigate } from 'react-router-dom'

export default function TopBar({ title, back, action }) {
  const navigate = useNavigate()
  return (
    <header
      className="sticky top-0 z-10 flex items-center gap-3 bg-stone/80 px-4 pb-3.5 shadow-[0_1px_10px_rgba(20,23,28,0.05)] backdrop-blur-md"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
    >
      {back && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors active:bg-brand-tint/40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <h1 className="flex-1 truncate font-heading text-[19px] font-medium tracking-tight text-ink">{title}</h1>
      {action}
    </header>
  )
}
