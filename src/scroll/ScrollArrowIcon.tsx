import { useId } from 'react';
import BrandGradient from '../brand/BrandGradient';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

const circumference = 2 * Math.PI * 15;
const drawCircle = keyframes({
  from: { strokeDashoffset: circumference },
  to: { strokeDashoffset: 0 },
});
const iconSx = {
  display: 'block',
  width: '100%',
  height: '100%',
  overflow: 'visible',
  color: 'rgba(var(--accent-rgb), .85)',
};
const circleSx = (atEnd: boolean) => ({
  opacity: atEnd ? 1 : 0,
  strokeDashoffset: atEnd ? 0 : circumference,
  transform: 'rotate(-90deg)',
  transformOrigin: 'center',
  animation: atEnd ? `${drawCircle} 650ms linear both` : 'none',
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
});

export default function ScrollArrowIcon({ atEnd }: { atEnd: boolean }) {
  const gradientId = `brand-${useId().replace(/:/g, '')}`;
  return (
    <Box component="svg" aria-hidden="true" viewBox="0 0 48 48" sx={iconSx}>
      <BrandGradient id={gradientId} />
      <Box
        component="circle"
        cx="24"
        cy="24"
        r="15"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeDasharray={circumference}
        sx={circleSx(atEnd)}
      />
      <Box
        component="path"
        d="M18 21l6 6 6-6"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
          transform: atEnd ? 'rotate(180deg)' : 'none',
          transformOrigin: 'center',
          transition: 'transform 300ms ease',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      />
    </Box>
  );
}
