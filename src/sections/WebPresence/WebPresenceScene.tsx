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
    <Box
      component="section"
      id={id}
      aria-labelledby={headingId}
      sx={{
        position: 'relative',
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
