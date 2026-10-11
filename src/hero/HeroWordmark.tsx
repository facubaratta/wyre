import { memo, useId, useRef } from 'react';
import Box from '@mui/material/Box';
import { YGlyph } from '../brand/logo/components/YGlyph';
import { useLogoAnimation } from '../brand/logo/useLogoAnimation';

function HeroWordmark({ animationActive }: { animationActive: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const id = `hero-y-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  useLogoAnimation(root, animationActive);
  return (
    <Box
      id="hero-wordmark"
      ref={root}
      aria-hidden="true"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        fontSize: { xs: '180px', sm: '240px', md: 'clamp(280px, 28vw, 390px)' },
        lineHeight: 0,
        height: '.8em',
        '& svg': { transform: 'translateY(-.2em)' },
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '15% 0 0',
          background: 'var(--brand-gradient)',
          maskImage:
            'radial-gradient(ellipse at center, #000 0%, rgba(0,0,0,.8) 25%, rgba(0,0,0,.3) 55%, transparent 80%)',
          opacity: 0.12,
          filter: 'blur(35px)',
        },
      }}
    >
      <YGlyph id={id} />
    </Box>
  );
}
export default memo(HeroWordmark);
