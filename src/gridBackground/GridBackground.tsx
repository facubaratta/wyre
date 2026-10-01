import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import GridCurrent from './GridCurrent';

const currents = [
  { direction: 'horizontal', lane: '10vw', duration: 24, delay: -8 },
  { direction: 'horizontal', lane: '30vw', duration: 32, delay: -22 },
  { direction: 'horizontal', lane: '50vw', duration: 28, delay: -3 },
  { direction: 'vertical', lane: '10vw', duration: 26, delay: -17 },
  { direction: 'vertical', lane: '50vw', duration: 34, delay: -5 },
  { direction: 'vertical', lane: '90vw', duration: 30, delay: -24 },
] as const;

const tide = keyframes({
  '0%, 100%': { opacity: 0.65 },
  '50%': { opacity: 1 },
});

const styles = {
  root: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    backgroundColor: '#181a19',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(235,232,222,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(235,232,222,.045) 1px, transparent 1px)',
    backgroundSize: '10vw 10vw',
    animation: `${tide} 18s ease-in-out infinite`,
    '@media (max-width:640px)': { backgroundSize: '25vw 25vw' },
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  },
  border: {
    position: 'absolute',
    inset: '24px',
    border: '1px solid rgba(235,232,222,.12)',
    '@media (max-width:640px)': { inset: '12px' },
  },
};

/** Slow currents follow the drafting grid; only transforms and opacity animate. */
export default function GridBackground() {
  return (
    <Box aria-hidden="true" sx={styles.root}>
      <Box sx={styles.grid} />
      {currents.map((current, index) => (
        <GridCurrent
          key={`${current.direction}-${current.lane}`}
          {...current}
          index={index}
        />
      ))}
      <Box sx={styles.border} />
    </Box>
  );
}
