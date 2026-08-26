import { brandLogoData } from './brandLogoData'

// Real brand marks (from the CC0-licensed simple-icons set) where available;
// falls back to the text monogram for brands that set doesn't cover
// (BYD, JAC, Changan, Mercedes-Benz have no entry there).
export default function BrandLogo({ brand, monogram }) {
  const logo = brandLogoData[brand]
  if (!logo) {
    return <span className="font-heading text-[10px] font-bold tracking-tight">{monogram}</span>
  }
  return (
    <svg viewBox={logo.viewBox} className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d={logo.d} />
    </svg>
  )
}
