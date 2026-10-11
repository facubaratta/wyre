import Box from '@mui/material/Box';
import { usePreferences } from '../preferences/PreferencesContext';
import { useDigitalMesh } from './useDigitalMesh';

export default function MeshBackground() {
  const { reduceMotion } = usePreferences();
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
