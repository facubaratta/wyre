import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import useControlState from '../controls/useControlState';
import ScrollArrowIcon from './ScrollArrowIcon';
import { usePreferences } from '../preferences/PreferencesContext';
import useScrollCheckpoints from './useScrollCheckpoints';
import { useLandingLayout } from './LandingLayoutContext';
import { usePortfolioSequenceState } from '../portfolio/PortfolioSequenceContext';
import { useScrollSnapshot } from './useWindowScroll';
import { projects } from '../portfolio/projects';

const bounce = keyframes({
  '0%, 100%': { translate: '0 0' },
  '50%': { translate: '0 8px' },
});
const rootSx = {
  position: 'fixed',
  zIndex: 1300,
  left: '50%',
  bottom: { xs: 'calc(36px + env(safe-area-inset-bottom))', md: '6.5vh' },
  width: 0,
  height: 0,
};
const buttonSx = {
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: { xs: '56px', md: 'clamp(50px, 20vw, 100px)' },
  height: { xs: '56px', md: 'clamp(50px, 20vw, 100px)' },
  p: 0,
  border: 0,
  borderRadius: '50%',
  background: { xs: 'rgba(24,26,25,.92)', md: 'transparent' },
  cursor: 'pointer',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  outlineOffset: '4px',
  transform: 'translate(-50%, -50%)',
};
const highlightSx = {
  position: 'absolute',
  width: '62.5%',
  height: '62.5%',
  borderRadius: '50%',
  backgroundColor: 'var(--accent)',
  transition: 'opacity 150ms ease',
  pointerEvents: 'none',
};

const ScrollArrow = () => {
  const { hovered, pressed, focusVisible, events } = useControlState();
  const { timeline, introHeight } = useLandingLayout();
  const {
    nextManualProject: onNextReducedMotion,
    closingProgress,
    selectProject,
  } = usePortfolioSequenceState();
  const projectCount = projects.length;
  const { reduceMotion } = usePreferences();
  const atEnd = useScrollSnapshot((scroll) =>
    reduceMotion
      ? closingProgress >= 0.5 && scroll.y >= introHeight - 2
      : scroll.y >= timeline.closingEnd * scroll.viewport - 2,
  );
  const bouncing = useScrollSnapshot(
    (scroll) =>
      !reduceMotion &&
      scroll.y < timeline.closingEnd * scroll.viewport - 2 &&
      (scroll.y < 4 || scroll.y / scroll.viewport >= timeline.portfolioStart),
  );
  const nextCheckpoint = useScrollCheckpoints({
    projectCount,
    projectsStart: timeline.projectsStart,
    atEnd,
    reduceMotion,
    onNextReducedMotion,
    onResetReducedMotion: () => selectProject(0),
  });

  return (
    <Box
      sx={{
        ...rootSx,
        animation: bouncing ? `${bounce} 1.4s ease-in-out infinite` : 'none',
        outline: focusVisible ? '2px solid var(--accent)' : 'none',
      }}
    >
      <Box
        component="button"
        type="button"
        aria-label={atEnd ? 'Scroll to top' : 'Scroll to the next section'}
        {...events}
        onClick={nextCheckpoint}
        sx={buttonSx}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={{ ...highlightSx, opacity: pressed ? 0.16 : hovered ? 0.08 : 0 }}
        />
        <ScrollArrowIcon atEnd={atEnd} />
      </Box>
    </Box>
  );
};

export default ScrollArrow;
