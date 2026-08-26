import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

const SPLASH_MS = 1700

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding', { replace: true }), SPLASH_MS)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Logo size={84} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 font-heading text-2xl font-semibold text-stone"
      >
        Car Care
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-1.5 text-sm text-stone/50"
      >
        Charge smarter
      </motion.p>
    </div>
  )
}
