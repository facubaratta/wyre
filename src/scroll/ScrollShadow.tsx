import { Box } from '@mui/material';

import { useLandingLayout } from './LandingLayoutContext';
import { useScrollSnapshot } from './useWindowScroll';
import { progressBetween } from './scrollTimeline';
import { usePreferences } from '../preferences/PreferencesContext';

const shadowSx = {
  position: 'fixed',
  zIndex: 20,
  left: 0,
  right: 0,
  bottom: 0,
  height: 'clamp(22px, 4vh, 44px)',
  pointerEvents: 'none',
  transition: 'opacity 450ms ease',
  background:
    'linear-gradient(to bottom, transparent, rgba(var(--accent-rgb), .22))',
  filter: 'drop-shadow(0 -5px 16px rgba(var(--accent-rgb), .2))',
};

const ScrollShadow = () => {
  const { timeline } = useLandingLayout();
  const { reduceMotion } = usePreferences();
  const opacity = useScrollSnapshot((scroll) =>
    reduceMotion
      ? 1
      : 1 -
        progressBetween(
          scroll.y / scroll.viewport,
          timeline.closingEnd - 0.3,
          0.3,
        ),
  );
  return <Box aria-hidden="true" sx={shadowSx} style={{ opacity }} />;
};

export default ScrollShadow;
