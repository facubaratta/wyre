/** Shared brand stops for CSS, SVG and canvas renderers. */
export const BRAND_STOPS = [
  { offset: 0, color: '#bb7bf1' },
  { offset: 0.48, color: '#e89ac4' },
  { offset: 1, color: '#ffc397' },
] as const;

export const brandGradient = (opacity = 1) =>
  `linear-gradient(110deg, ${BRAND_STOPS.map(
    ({ offset, color }) =>
      `color-mix(in srgb, ${color} ${opacity * 100}%, transparent) ${offset * 100}%`,
  ).join(', ')})`;

export const gradientTextSx = {
  backgroundImage: 'var(--brand-gradient)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
} as const;

export const gradientFocusSx = {
  outline: '2px solid transparent',
  '&::after': {
    content: '\"\"',
    position: 'absolute',
    inset: -5,
    borderRadius: 'inherit',
    background: 'var(--brand-gradient)',
    padding: '2px',
    border: 0,
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    zIndex: 1,
  },
} as const;
