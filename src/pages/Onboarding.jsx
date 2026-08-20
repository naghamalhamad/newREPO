import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const slides = [
  {
    accent: 'spark',
    eyebrow: 'Charging',
    title: 'Charge anywhere, without the guesswork',
    body: 'Find nearby stations, see how busy they are right now, and pay for your session in the app — no card, no app-switching.',
    icon: BoltIcon,
  },
  {
    accent: 'tide',
    eyebrow: 'Wash & care',
    title: 'Wash and maintenance, booked in seconds',
    body: 'Pick a service, choose a time, and rebook your usual in one tap. Subscribe to a recurring wash and save.',
    icon: DropIcon,
  },
  {
    accent: 'copper',
    eyebrow: 'Your account',
    title: 'One account for your whole car',
    body: 'Manage your vehicles, payment methods, and notifications in one place — for charging and car care alike.',
    icon: CarIcon,
  },
]

const accents = {
  spark: { bg: 'bg-spark', dim: 'bg-spark-dim', text: 'text-spark-ink' },
  tide: { bg: 'bg-tide', dim: 'bg-tide-dim', text: 'text-tide-ink' },
  copper: { bg: 'bg-copper', dim: 'bg-copper-dim', text: 'text-copper' },
}

export default function Onboarding() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const navigate = useNavigate()
  const slide = slides[index]
  const a = accents[slide.accent]
  const isLast = index === slides.length - 1

  function go(next) {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <div className="flex justify-end px-5 pt-5">
        <button
          onClick={() => navigate('/login')}
          className="text-sm font-medium text-ink-soft"
        >
          Skip
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && !isLast) go(index + 1)
              else if (info.offset.x > 60 && index > 0) go(index - 1)
            }}
            className="flex w-full max-w-sm flex-col items-center text-center"
          >
            <div className="relative flex h-44 w-44 items-center justify-center">
              <span className={`absolute h-44 w-44 rounded-full ${a.dim}`} />
              <span className={`absolute h-28 w-28 -translate-x-6 -translate-y-4 rounded-full ${a.dim} opacity-60`} />
              <span className={`relative flex h-24 w-24 items-center justify-center rounded-full ${a.bg} text-white shadow-lg`}>
                <slide.icon />
              </span>
            </div>

            <p className={`mt-8 text-xs font-semibold uppercase tracking-wide ${a.text}`}>{slide.eyebrow}</p>
            <h1 className="mt-2 font-heading text-2xl font-medium uppercase tracking-wide text-ink">
              {slide.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{slide.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.eyebrow}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? `w-6 ${accents[s.accent].bg}` : 'w-1.5 bg-line'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-xl bg-ink py-3.5 text-center font-semibold text-paper active:opacity-90"
          >
            Get started
          </button>
        ) : (
          <button
            onClick={() => go(index + 1)}
            className={`w-full rounded-xl py-3.5 text-center font-semibold text-white active:opacity-90 ${a.bg}`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

function BoltIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
    </svg>
  )
}
function DropIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3c3.5 4 6 7.4 6 10.5a6 6 0 1 1-12 0C6 10.4 8.5 7 12 3Z" />
    </svg>
  )
}
function CarIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 16V11l2-4h12l2 4v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16h18v2.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1V18h-11v.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V16Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
