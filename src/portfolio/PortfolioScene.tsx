import Box from '@mui/material/Box';
import { usePreferences } from '../preferences/PreferencesContext';
import { useLandingLayout } from '../scroll/LandingLayoutContext';
import Portfolio from './Portfolio';

export default function PortfolioScene() {
  const { reduceMotion } = usePreferences();
  const { timeline, viewport, introHeight } = useLandingLayout();
  return (
    <Box
      id="crecimiento-real"
      sx={{
        position: 'relative',
        minHeight: reduceMotion
          ? undefined
          : `${Math.max(viewport, (timeline.closingEnd + 1) * viewport - introHeight)}px`,
      }}
    >
      <Box
        sx={{
          position: reduceMotion ? 'relative' : 'sticky',
          top: 0,
          minHeight: '100dvh',
          height: reduceMotion ? 'auto' : '100dvh',
        }}
      >
        <Portfolio />
      </Box>
    </Box>
  );
}
