import { useNavigate } from 'react-router-dom'

export default function TopBar({ title, back, action }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-stone/90 px-4 py-4 backdrop-blur">
      {back && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
 <h1 className="flex-1 font-heading text-xl font-medium text-ink">{title}</h1>
      {action}
    </header>
  )
}
