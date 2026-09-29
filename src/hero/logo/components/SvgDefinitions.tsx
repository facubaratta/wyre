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
        <stop stopColor="var(--accent-light)" stopOpacity=".9" />
        <stop offset=".16" stopColor="var(--accent-light)" stopOpacity=".75" />
        <stop offset=".4" stopColor="var(--accent)" stopOpacity=".43" />
        <stop offset=".7" stopColor="var(--accent-dark)" stopOpacity=".16" />
        <stop offset="1" stopColor="var(--accent-dark)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-spill-light`}>
        <stop stopColor="var(--accent-light)" stopOpacity=".65" />
        <stop offset=".14" stopColor="var(--accent)" stopOpacity=".4" />
        <stop offset=".4" stopColor="var(--accent-dark)" stopOpacity=".16" />
        <stop offset=".72" stopColor="var(--accent-dark)" stopOpacity=".04" />
        <stop offset="1" stopColor="var(--accent-dark)" stopOpacity="0" />
      </radialGradient>
      {ROUTES.map((route, i) => (
        <path key={i} id={`${id}-route-${i}`} data-route={i} d={route.d} pathLength="1" />
      ))}
    </defs>
  );
}
