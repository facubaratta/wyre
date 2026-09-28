import Box from '@mui/material/Box';

const currents = [
  { direction: 'horizontal', lane: '10vw', duration: 24, delay: -8 },
  { direction: 'horizontal', lane: '30vw', duration: 32, delay: -22 },
  { direction: 'horizontal', lane: '50vw', duration: 28, delay: -3 },
  { direction: 'vertical', lane: '10vw', duration: 26, delay: -17 },
  { direction: 'vertical', lane: '50vw', duration: 34, delay: -5 },
  { direction: 'vertical', lane: '90vw', duration: 30, delay: -24 },
] as const;

/** Slow currents follow the drafting grid; only transforms and opacity animate. */
export default function GridBackground() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#181a19',
        '--grid-cell': '10vw',
        '@keyframes grid-tide': {
          '0%, 100%': { opacity: .65 },
          '50%': { opacity: 1 },
        },
        '@keyframes horizontal-current': {
          '0%': { transform: 'translateX(-30vw)', opacity: 0 },
          '12%, 78%': { opacity: .55 },
          '100%': { transform: 'translateX(110vw)', opacity: 0 },
        },
        '@keyframes vertical-current': {
          '0%': { transform: 'translateY(-30svh)', opacity: 0 },
          '12%, 78%': { opacity: .45 },
          '100%': { transform: 'translateY(110svh)', opacity: 0 },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(235,232,222,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(235,232,222,.045) 1px, transparent 1px)',
          backgroundSize: 'var(--grid-cell) var(--grid-cell)',
          animation: 'grid-tide 18s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: '24px',
          border: '1px solid rgba(235,232,222,.12)',
        },
        '@media (max-width:640px)': {
          '--grid-cell': '25vw',
          '&::after': { inset: '12px' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '&::before': { animation: 'none' },
        },
      }}
    >
      {currents.map(({ direction, lane, duration, delay }, index) => {
        const horizontal = direction === 'horizontal';
        return (
          <Box
            component="span"
            key={`${direction}-${lane}`}
            sx={{
              position: 'absolute',
              left: horizontal ? 0 : lane,
              top: horizontal ? lane : 0,
              width: horizontal ? '28vw' : '1px',
              height: horizontal ? '1px' : '28svh',
              backgroundImage: `linear-gradient(${horizontal ? '90deg' : '180deg'}, transparent, rgba(var(--accent-rgb),.25) 25%, var(--accent) 85%, transparent)`,
              opacity: 0,
              animation: `${direction}-current ${duration}s linear ${delay}s infinite`,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: horizontal ? '85%' : '-1px',
                top: horizontal ? '-1px' : '85%',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-light)',
                boxShadow: '0 0 10px 2px rgba(var(--accent-rgb),.15)',
              },
              '@media (max-width:640px)': {
                left: horizontal ? 0 : index === 3 ? '25vw' : '75vw',
                top: horizontal ? `${(index * 2 + 1) * 25}vw` : 0,
                display: index === 4 ? 'none' : 'block',
              },
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
                display: 'none',
              },
            }}
          />
        );
      })}
    </Box>
  );
}
