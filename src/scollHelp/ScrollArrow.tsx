import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import useControlState from '../useControlState';
import ScrollArrowIcon from './ScrollArrowIcon';
import { usePreferences } from '../PreferencesProvider';
import useScrollCheckpoints from '../useScrollCheckpoints';
import { useLandingSequence } from '../LandingSequenceProvider';
import { serviceGroups } from '../hero/services/serviceGroups';
import { projects } from '../portfolio/projects';

const bounce = keyframes({
  '0%, 100%': { translate: '0 0' },
  '50%': { translate: '0 8px' },
});
const rootSx = {
  position: 'fixed',
  zIndex: 1300,
  left: '50%',
  bottom: '6.5vh',
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
  width: 'clamp(50px, 20vw, 100px)',
  height: 'clamp(50px, 20vw, 100px)',
  p: 0,
  border: 0,
  borderRadius: '50%',
  background: 'transparent',
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
  const {
    scroll,
    timeline,
    nextReducedMotion: onNextReducedMotion,
  } = useLandingSequence();
  const serviceCount = serviceGroups.length;
  const projectCount = projects.length;
  const { reduceMotion } = usePreferences();
  const atEnd =
    !reduceMotion &&
    scroll.y / scroll.viewport >= timeline.closingEnd - 2 / scroll.viewport;
  const nextCheckpoint = useScrollCheckpoints({
    scroll,
    serviceCount,
    projectCount,
    hintStart: timeline.hintStart,
    projectsStart: timeline.projectsStart,
    atEnd,
    reduceMotion,
    onNextReducedMotion,
  });

  const onClick = () => {
    if (reduceMotion) {
      onNextReducedMotion();
      return;
    }

    nextCheckpoint();
  };

  return (
    <Box
      sx={{
        ...rootSx,
        animation:
          !reduceMotion && !atEnd
            ? `${bounce} 1.4s ease-in-out infinite`
            : 'none',
      }}
    >
      <Box
        component="button"
        type="button"
        aria-label={atEnd ? 'Scroll to top' : 'Scroll to the next section'}
        {...events}
        onClick={onClick}
        sx={{
          ...buttonSx,
          outline: focusVisible ? '2px solid var(--accent)' : 'none',
        }}
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
