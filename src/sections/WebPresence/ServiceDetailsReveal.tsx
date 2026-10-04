import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ServiceDetailsReveal({
  open,
  id,
  delay = 0,
  children,
}: {
  open: boolean;
  id?: string;
  delay?: number;
  children: ReactNode;
}) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <Collapse
      id={id}
      in={open}
      timeout={reducedMotion ? 0 : 420}
      easing="cubic-bezier(0.22, 1, 0.36, 1)"
    >
      <Box
        sx={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(12px)',
          transition: reducedMotion
            ? 'none'
            : 'opacity 300ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: reducedMotion || !open ? '0ms' : `${delay}ms`,
        }}
      >
        {children}
      </Box>
    </Collapse>
  );
}
