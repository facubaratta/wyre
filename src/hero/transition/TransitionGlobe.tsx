import Box from '@mui/material/Box';
import SectionIconGraphic from '../../brand/SectionIconGraphic';
import { between, ease, mix } from './motion';
import WireGlobe from './WireGlobe';
import type { TitleFrame } from './TitleTransitionContext';

export default function TransitionGlobe({ frame }: { frame: TitleFrame }) {
  const globeDetail =
    ease(between(frame.progress, 0.02, 0.2)) *
    (1 - ease(between(frame.progress, 0.8, 1)));
  const orbitOpacity = Math.sin(Math.PI * between(frame.progress, 0.12, 0.92));
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        zIndex: 40,
        top: 0,
        left: 0,
        pointerEvents: 'none',
        transformOrigin: '0 0',
      }}
      style={{
        width: frame.globe.size * frame.globe.scale,
        height: frame.globe.size * frame.globe.scale,
        transform: `translate3d(${frame.globe.x}px, ${frame.globe.y}px, 0)`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-30%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(var(--accent-rgb), .16), transparent 65%)',
        }}
        style={{ opacity: orbitOpacity * 0.4 }}
      />
      <Box
        component="svg"
        viewBox="0 0 200 200"
        fill="none"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          color: 'var(--accent)',
        }}
        style={{
          opacity: orbitOpacity * 0.6,
          transform: `rotate(${mix(-45, 110, frame.progress)}deg)`,
        }}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="110"
          ry="38"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="140 70"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="117"
          ry="58"
          stroke="currentColor"
          strokeWidth="0.3"
          transform="rotate(65 100 100)"
          strokeDasharray="100 220"
        />
      </Box>
      <Box
        sx={{ position: 'absolute', inset: 0 }}
        style={{ opacity: 1 - globeDetail }}
      >
        <SectionIconGraphic icon="globe" />
      </Box>
      <Box
        sx={{ position: 'absolute', inset: 0 }}
        style={{ opacity: globeDetail }}
      >
        <WireGlobe rotation={frame.progress * Math.PI * 2.5} />
      </Box>
    </Box>
  );
}
