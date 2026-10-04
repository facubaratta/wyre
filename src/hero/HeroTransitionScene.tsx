import Box from '@mui/material/Box';
import useElementHeight from '../scroll/useElementHeight';
import { usePreferences } from '../preferences/PreferencesContext';
import { useLandingLayout } from '../scroll/LandingLayoutContext';
import HeroSection from './HeroSection';

export default function HeroTransitionScene() {
  const { reduceMotion } = usePreferences();
  const { viewport } = useLandingLayout();
  const { elementRef: contentRef, height } = useElementHeight();
  return (
    <Box
      id="hero-scene"
      sx={{
        position: 'relative',
        height: reduceMotion
          ? 'auto'
          : `calc(${height ? `${height}px` : '100svh'} + 75svh)`,
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          position: reduceMotion ? 'relative' : 'sticky',
          top: Math.min(0, viewport - height),
        }}
      >
        <HeroSection />
      </Box>
    </Box>
  );
}
