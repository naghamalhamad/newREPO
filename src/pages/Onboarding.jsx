import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const slides = [
  {
    eyebrow: 'Charging',
    title: 'Charge anywhere, without the guesswork',
    body: 'Find nearby stations, see how busy they are right now, and pay for your session in the app — no card, no app-switching.',
    icon: BoltIcon,
  },
  {
    eyebrow: 'Wash & services',
    title: 'Wash and maintenance, booked in seconds',
    body: 'Pick a service, choose a time, and rebook your usual in one tap. Subscribe to a recurring wash and save.',
    icon: DropIcon,
  },
  {
    eyebrow: 'Your account',
    title: 'One account for your whole car',
    body: 'Manage your vehicles, payment methods, and notifications in one place — for charging and car care alike.',
    icon: CarIcon,
  },
]

const textIn = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const textItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function Onboarding() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const navigate = useNavigate()
  const slide = slides[index]
  const isLast = index === slides.length - 1

  function go(next) {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-stone">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-linear-to-b from-brand-tint to-stone opacity-70" />

      <div className="relative flex justify-end px-5 pt-5">
        <button onClick={() => navigate('/login')} className="text-sm font-medium text-graphite">
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
              <span className="absolute inset-2 animate-ping rounded-full border-2 border-brand opacity-30" style={{ animationDuration: '2.6s' }} />
              <span className="absolute inset-7 animate-ping rounded-full border-2 border-brand opacity-30" style={{ animationDuration: '2.6s', animationDelay: '0.7s' }} />
              <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brand text-white shadow-lg">
                <slide.icon />
              </span>
            </div>

            <motion.div variants={textIn} initial="hidden" animate="show">
 <motion.p variants={textItem} className="mt-8 text-xs font-semibold text-brand-mid">
                {slide.eyebrow}
              </motion.p>
              <motion.h1 variants={textItem} className="mt-2 font-heading text-[26px] font-semibold leading-tight text-ink">
                {slide.title}
              </motion.h1>
              <motion.p variants={textItem} className="mt-3 text-[15px] leading-relaxed text-graphite">
                {slide.body}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative px-6 pb-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.eyebrow}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-brand' : 'w-1.5 bg-line'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-xl bg-brand py-4 text-center font-heading font-semibold text-white active:opacity-90"
          >
            Get started
          </button>
        ) : (
          <button
            onClick={() => go(index + 1)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-center font-heading font-semibold text-white active:opacity-90"
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
