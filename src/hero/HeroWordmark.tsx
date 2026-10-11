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
        fontSize: { xs: '220px', sm: '340px', md: 'clamp(340px, 36vw, 510px)' },
        lineHeight: 0,
        height: '.8em',
        '& svg': { transform: 'translateY(-.2em)' },
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '15% 0 0',
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(187,123,241,.7), transparent 55%), radial-gradient(ellipse at 65% 60%, rgba(255,195,151,.7), transparent 55%)',
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
