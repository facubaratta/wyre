import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { useTitleFrame } from '../../hero/transition/TitleTransitionContext';
import { between, ease } from '../../hero/transition/motion';

export default function ServiceReveal({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const frame = useTitleFrame();
  const reveal =
    !frame || frame.complete
      ? 1
      : ease(
          between(frame.progress, 0.82 + index * 0.025, 0.9 + index * 0.025),
        );
  return (
    <Box
      component="article"
      sx={{ height: '100%' }}
      style={{
        opacity: reveal,
        transform: `translate3d(0, ${(1 - reveal) * 42}px, 0)`,
        clipPath: `inset(0 0 ${(1 - reveal) * 100}% 0)`,
      }}
    >
      {children}
    </Box>
  );
}
