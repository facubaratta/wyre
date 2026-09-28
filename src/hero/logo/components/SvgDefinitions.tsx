import { ROUTES } from '../geometry';

export function SvgDefinitions({ id }: { id: string }) {
  return (
    <defs>
      <clipPath id={`${id}-glyph`}>
        <text x="0" y="846.5" fontFamily="Arial,Helvetica,sans-serif" fontSize="1000" fontWeight="700">y</text>
      </clipPath>
      <filter id={`${id}-diffusion`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.8" />
      </filter>
      <filter id={`${id}-point-glow`} x="-400%" y="-400%" width="900%" height="900%">
        <feGaussianBlur stdDeviation="6" result="halo" />
        <feMerge><feMergeNode in="halo" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <radialGradient id={`${id}-packet-light`}>
        <stop stopColor="#c5f4ff" stopOpacity=".9" />
        <stop offset=".16" stopColor="#76d6ff" stopOpacity=".75" />
        <stop offset=".4" stopColor="#39adff" stopOpacity=".43" />
        <stop offset=".7" stopColor="#2285f5" stopOpacity=".16" />
        <stop offset="1" stopColor="#2285f5" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-spill-light`}>
        <stop stopColor="#57bdff" stopOpacity=".65" />
        <stop offset=".14" stopColor="#298de5" stopOpacity=".4" />
        <stop offset=".4" stopColor="#1860b7" stopOpacity=".16" />
        <stop offset=".72" stopColor="#164c96" stopOpacity=".04" />
        <stop offset="1" stopColor="#164c96" stopOpacity="0" />
      </radialGradient>
      {ROUTES.map((route, i) => (
        <path key={i} id={`${id}-route-${i}`} data-route={i} d={route.d} pathLength="1" />
      ))}
    </defs>
  );
}
