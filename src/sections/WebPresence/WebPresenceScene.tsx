import FadeIn from '../../scroll/FadeIn';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

export default function WebPresenceScene({
  id,
  headingId,
  children,
}: {
  id: string;
  headingId: string;
  children: ReactNode;
}) {
  return (
    <FadeIn
      component="section"
      id={id}
      aria-labelledby={headingId}
      sx={{
        position: 'relative',
        px: { xs: '6vw', sm: '7vw' },
        py: { xs: 8, sm: 12 },
        scrollMarginTop: 'var(--header-height, 100px)',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>{children}</Box>
    </FadeIn>
  );
}
