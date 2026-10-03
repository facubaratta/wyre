import Box from '@mui/material/Box';
import type { TitleFrame } from './TitleTransitionContext';
import TransitionGlobe from './TransitionGlobe';
import { between } from './motion';

export default function TitleTransitionOverlay({
  frame,
}: {
  frame: TitleFrame;
}) {
  return (
    <>
      <TransitionGlobe frame={frame} />
      <Box
        aria-hidden="true"
        sx={{
          position: 'fixed',
          zIndex: 40,
          top: 0,
          left: 0,
          pointerEvents: 'none',
          color: 'text.primary',
          transformOrigin: '0 0',
          whiteSpace: 'nowrap',
          textBoxTrim: 'trim-both',
          textBoxEdge: 'cap alphabetic',
        }}
        style={{
          transform: `translate3d(${frame.x}px, ${frame.y}px, 0) scale(${frame.scale})`,
          width: frame.width,
          fontSize: `${frame.fontSize}px`,
          lineHeight: `${frame.lineHeight}px`,
          fontWeight: frame.weight,
          letterSpacing: `${frame.spacing}px`,
        }}
      >
        {Array.from(frame.text).map((character, index) => {
          const wave = Math.sin(
            Math.PI *
              between(
                frame.progress,
                0.06 + index * 0.007,
                0.44 + index * 0.007,
              ),
          );
          return (
            <Box
              component="span"
              key={index}
              sx={{ display: 'inline-block', whiteSpace: 'pre' }}
              style={{
                transform: `translate3d(0, ${wave * -20}px, 0) rotate(${wave * (index % 2 === 0 ? -3 : 3)}deg)`,
              }}
            >
              {character}
            </Box>
          );
        })}
      </Box>
    </>
  );
}
