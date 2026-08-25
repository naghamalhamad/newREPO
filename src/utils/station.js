export function stationStatus(s) {
  const ratio = s.occupied / s.total
  if (ratio >= 1) return { text: 'Full', bg: 'bg-danger-tint', color: 'text-danger', bar: 'bg-danger' }
  if (ratio >= 0.6) return { text: 'Busy', bg: 'bg-warning-tint', color: 'text-warning', bar: 'bg-warning' }
  return { text: 'Open', bg: 'bg-success-tint', color: 'text-success', bar: 'bg-success' }
}
