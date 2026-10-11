import Box from '@mui/material/Box';
import { usePreferences } from '../preferences/PreferencesContext';
import { useDigitalMesh } from './useDigitalMesh';
import { useHeroProgress } from '../hero/transition/HeroTransitionContext';

export default function MeshBackground() {
  const { reduceMotion } = usePreferences();
  const progress = useHeroProgress();
  const canvasRef = useDigitalMesh(reduceMotion);
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#111212',
        filter: `blur(${reduceMotion ? 0 : progress * 3}px) brightness(${1 - progress * 0.12})`,
        transition: reduceMotion ? 'none' : 'filter 40ms linear',
      }}
    >
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{ display: 'block', width: '100%', height: '100%' }}
      />
    </Box>
  );
}
