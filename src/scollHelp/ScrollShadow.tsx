import { Box } from '@mui/material';

import { useLandingSequence } from '../LandingSequenceProvider';

const ScrollShadow = () => {
  const { portfolio } = useLandingSequence();
  const opacity = portfolio.scrollShadowOpacity;
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        zIndex: 20,
        left: 0,
        right: 0,
        bottom: 0,
        height: 'clamp(22px, 4vh, 44px)',
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 450ms ease',
        background:
          'linear-gradient(to bottom, transparent, rgba(var(--accent-rgb), .22))',
        filter: 'drop-shadow(0 -5px 16px rgba(var(--accent-rgb), .2))',
      }}
    />
  );
};

export default ScrollShadow;
