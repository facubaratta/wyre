import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { useHeroProgress } from '../../hero/transition/HeroTransitionContext';
import { between, ease } from '../../hero/transition/motion';

export default function WebPresenceScene({
  id,
  headingId,
  children,
}: {
  id: string;
  headingId: string;
  children: ReactNode;
}) {
  const progress = useHeroProgress();
  const reveal = ease(between(progress, 0.26, 0.88));
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={headingId}
      sx={{
        position: 'relative',
        transform: `translate3d(0, ${(1 - reveal) * 9}vh, 0)`,
        opacity: 0.58 + reveal * 0.42,
        willChange: progress > 0 && progress < 1 ? 'transform, opacity' : 'auto',
        pl: { xs: 'calc(6vw + 16px)', sm: '7vw' },
        pr: { xs: '6vw', sm: '7vw' },
        py: { xs: 7, sm: 12 },
        scrollMarginTop: 'var(--header-height, 100px)',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>{children}</Box>
    </Box>
  );
}
