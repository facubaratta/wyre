import { memo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import { HeroLogo } from '../brand/logo';
import { usePreferences } from '../preferences/PreferencesContext';

const enter = keyframes({
  from: { opacity: 0, transform: 'translateY(18px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const wordmarkSx = {
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
  flex: '0 0 auto',
  fontSize: 'clamp(100px, 15vw, 240px)',
  animation: `${enter} 1100ms cubic-bezier(.22,1,.36,1) both`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  '@media (max-width:640px)': { fontSize: 'min(32vw, 18svh)' },
  '@media (max-width:640px) and (max-height:700px)': {
    fontSize: 'min(28vw, 13svh)',
  },
};

interface HeroWordmarkProps {
  animationActive: boolean;
}

function HeroWordmark({ animationActive }: HeroWordmarkProps) {
  const { accent } = usePreferences();
  return (
    <Box id="hero-wordmark" sx={wordmarkSx}>
      <HeroLogo
        style={{ fontSize: 'inherit' }}
        accent={accent}
        animationActive={animationActive}
      />
    </Box>
  );
}

export default memo(HeroWordmark);
