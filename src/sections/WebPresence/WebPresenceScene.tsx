import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { useTitleFrame } from '../../hero/transition/TitleTransitionContext';

export default function WebPresenceScene({
  id,
  headingId,
  children,
}: {
  id: string;
  headingId: string;
  children: ReactNode;
}) {
  const reveal = useTitleFrame()?.reveal ?? 1;
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={headingId}
      inert={reveal === 0}
      sx={{
        position: 'relative',
        px: { xs: '6vw', sm: '7vw' },
        py: { xs: 7, sm: 12 },
        scrollMarginTop: 'var(--header-height, 100px)',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }} style={{ opacity: reveal }}>
        {children}
      </Box>
    </Box>
  );
}
