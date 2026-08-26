export default function StepProgress({ step, total }) {
  return (
    <div>
      <p className="text-[11px] font-normal tracking-[0.08em] text-graphite">
        Step {step} of {total}
      </p>
      <div className="mt-2 flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? 'bg-brand' : 'bg-line'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
