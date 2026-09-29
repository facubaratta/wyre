import Box from '@mui/material/Box';

const sx = (visible: boolean) => ({
  position: 'absolute',
  top: 'calc(30% - 76px)',
  left: '45%',
  width: '100px',
  height: '76px',
  pointerEvents: 'none',
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(5px)',
  transition: 'opacity 500ms ease, transform 650ms cubic-bezier(.22,1,.36,1)',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  color: 'var(--accent-light)',
  fontFamily: '\"Bradley Hand\", \"Segoe Print\", \"Chalkboard SE\", cursive',
  fontWeight: 400,
  fontSize: 'clamp(18px, 1.5vw, 24px)',
  letterSpacing: 0,
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
});

const Arrow = () => (
  <svg
    width="76"
    height="58"
    viewBox="0 0 76 58"
    focusable="false"
    style={{
      position: 'absolute',
      top: '24px',
      left: '-34px',
      overflow: 'visible',
    }}
  >
    <path
      d="M26 5C43 0 13 4 12 24C11 36 19 44 24 49M15 43L24 49L27 39"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function AccentColorHint({ visible }: { visible: boolean }) {
  return (
    <Box component="span" aria-hidden="true" sx={sx(visible)}>
      <Box
        component="span"
        sx={{ display: 'block', transform: 'rotate(-9deg)' }}
      >
        click me
      </Box>
      <Arrow />
    </Box>
  );
}
