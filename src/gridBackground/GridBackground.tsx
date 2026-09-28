import Box from '@mui/material/Box';
import { useGridClock } from './useGridClock';
import { useViewportGrid } from './useViewportGrid';
import { AmbientBackground, GridLines } from './GridLayers';
import { LitGridDetails } from './LitGridDetails';

const GRID_ID = 'wyre-grid';

export default function GridBackground() {
  const { time, reducedMotion } = useGridClock();
  const { width, height, cellSize } = useViewportGrid();

  return (
    <Box
      component="svg"
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        background: '#081333',
      }}
    >
      <defs>
        <AmbientBackground id={GRID_ID} />
        <GridLines id={GRID_ID} cellSize={cellSize} />
      </defs>
      <rect width={width} height={height} fill={`url(#${GRID_ID}-background)`} />
      <rect width={width} height={height} fill={`url(#${GRID_ID}-ambient)`} />
      <rect width={width} height={height} fill={`url(#${GRID_ID}-grid)`} opacity=".56" />
      <LitGridDetails time={time} reducedMotion={reducedMotion} cellSize={cellSize} height={height} id={GRID_ID} />
    </Box>
  );
}
