import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CarChargingIllustration from '../components/CarChargingIllustration'

const slides = [
  {
    eyebrow: 'Find a charger',
    title: 'Find the right charger, fast',
    body: 'See nearby stations, how many connectors are free right now, and how long until one opens up — before you ever leave home.',
    Illustration: FindStationIllustration,
  },
  {
    eyebrow: 'Plug in',
    title: 'Plug in — we handle the rest',
    body: "We detect the connection automatically and start tracking your session: energy delivered, time to finish, and running cost.",
    Illustration: () => <CarChargingIllustration connected charging />,
  },
  {
    eyebrow: 'Pay in the app',
    title: 'Pay straight from your wallet',
    body: 'No kiosk, no fumbling for a card. Your session total is ready the moment you unplug — just tap to pay.',
    Illustration: PaySuccessIllustration,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex min-h-dvh flex-col overflow-hidden bg-stone"
    >
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
            <div className="w-full">
              <slide.Illustration />
            </div>

            <motion.div variants={textIn} initial="hidden" animate="show">
              <motion.p variants={textItem} className="mt-6 text-xs font-semibold text-brand-mid">
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
            className="w-full rounded-xl bg-brand py-4 text-center font-heading font-semibold text-ink active:opacity-90"
          >
            Get started
          </button>
        ) : (
          <button
            onClick={() => go(index + 1)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-center font-heading font-semibold text-ink active:opacity-90"
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}

function FindStationIllustration() {
  return (
    <svg viewBox="0 0 280 200" className="mx-auto w-full max-w-[260px]" role="img" aria-label="Map with nearby charging stations">
      <ellipse cx="140" cy="176" rx="90" ry="8" className="fill-line/60" />

      {/* faint distant stations */}
      <g opacity="0.35">
        <circle cx="66" cy="128" r="9" className="fill-brand-tint" />
        <circle cx="66" cy="128" r="9" fill="none" className="stroke-brand-mid" strokeWidth="1.5" />
        <circle cx="214" cy="120" r="9" className="fill-brand-tint" />
        <circle cx="214" cy="120" r="9" fill="none" className="stroke-brand-mid" strokeWidth="1.5" />
      </g>

      {/* radar pulses from the main pin */}
      <circle cx="140" cy="96" r="30" className="fill-brand/15">
        <animate attributeName="r" values="20;46;20" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* main pin */}
      <path
        d="M140 44c-19 0-34 15-34 34 0 25 34 62 34 62s34-37 34-62c0-19-15-34-34-34Z"
        className="fill-ink"
      />
      <circle cx="140" cy="78" r="20" className="fill-brand" />
      <path d="M144 62 130 82h8l-2 16 16-20h-8l-.5-16Z" className="fill-ink" strokeLinejoin="round" />
    </svg>
  )
}

function PaySuccessIllustration() {
  return (
    <svg viewBox="0 0 280 200" className="mx-auto w-full max-w-[260px]" role="img" aria-label="Wallet with a charging session card, payment successful">
      <ellipse cx="140" cy="176" rx="90" ry="8" className="fill-line/60" />

      {/* a plain card, tucked behind, peeking out of the wallet */}
      <g transform="rotate(-9 140 100)">
        <rect x="104" y="56" width="52" height="68" rx="9" className="fill-surface stroke-line" strokeWidth="1.5" />
      </g>

      {/* the charge-session card, mint, peeking out further */}
      <g transform="rotate(7 140 100)">
        <rect x="120" y="50" width="52" height="68" rx="9" className="fill-brand" />
        <path d="M148 64 138 80h6l-2 12 11-13h-6l-1-11Z" className="fill-ink" strokeLinejoin="round" />
      </g>

      {/* closed wallet body, clipping the cards' lower half */}
      <rect x="76" y="96" width="128" height="78" rx="18" className="fill-ink" />
      <path d="M76 118c10 6 22 9 36 9h56c14 0 26-3 36-9" fill="none" stroke="var(--color-stone)" strokeOpacity="0.08" strokeWidth="2" />
      <circle cx="184" cy="135" r="7" className="fill-brand" opacity="0.85" />

      {/* success badge */}
      <circle cx="192" cy="160" r="25" className="fill-brand" stroke="var(--color-stone)" strokeWidth="4" />
      <path d="m181 160 7 7 14-15" fill="none" className="stroke-ink" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
