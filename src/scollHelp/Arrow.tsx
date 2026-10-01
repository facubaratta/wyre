import { Box, IconButton } from '@mui/material';
import { usePreferences } from '../PreferencesProvider';
import useScrollCheckpoints from '../useScrollCheckpoints';
import { useLandingSequence } from '../LandingSequenceProvider';
import { serviceGroups } from '../hero/services/serviceGroups';
import { projects } from '../portfolio/projects';

const Circle = ({ atEnd }: { atEnd: boolean }) => (
  <Box
    component="circle"
    cx="24"
    cy="24"
    r="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeDasharray="126"
    sx={{
      opacity: atEnd ? 1 : 0,
      strokeDashoffset: atEnd ? 0 : 126,
      transform: 'rotate(-90deg)',
      transformOrigin: 'center',
      animation: atEnd ? 'scroll-help-draw-circle 650ms linear both' : 'none',
    }}
  />
);

const DirectionArrow = ({ atEnd }: { atEnd: boolean }) => (
  <Box
    component="path"
    d={atEnd ? 'M18 24h12m-5-5 5 5-5 5' : 'M18 20l6 6 6-6'}
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    sx={{
      transform: atEnd ? 'rotate(180deg)' : 'none',
      transformOrigin: 'center',
      transition: 'transform 300ms ease',
    }}
  />
);

const ArrowIcon = ({ atEnd }: { atEnd: boolean }) => (
  <Box
    component="svg"
    aria-hidden="true"
    viewBox="0 0 48 48"
    sx={{
      display: 'block',
      width: '100%',
      height: '100%',
      overflow: 'visible',
      color: 'rgba(var(--accent-rgb), .85)',
      '@keyframes scroll-help-draw-circle': {
        from: { strokeDashoffset: 126 },
        to: { strokeDashoffset: 0 },
      },
    }}
  >
    <Circle atEnd={atEnd} />
    <DirectionArrow atEnd={atEnd} />
  </Box>
);

const ScrollArrow = () => {
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
    reduceMotion ? onNextReducedMotion() : nextCheckpoint();
  };

  return (
    <IconButton
      aria-label={atEnd ? 'Scroll to top' : 'Scroll to the next section'}
      onClick={onClick}
      sx={{
        '@keyframes scroll-help-bounce': {
          '0%, 100%': { translate: '0 0' },
          '50%': { translate: '0 8px' },
        },
        position: 'fixed',
        zIndex: 1300,
        left: '50%',
        bottom: 'clamp(25px, 4.5vh, 48px)',
        width: 'clamp(40px, 6vw, 64px)',
        height: 'clamp(40px, 6vw, 64px)',
        transform: 'translateX(-50%)',
        animation: !atEnd
          ? 'scroll-help-bounce 1.4s ease-in-out infinite'
          : 'none',
      }}
    >
      <ArrowIcon atEnd={atEnd} />
    </IconButton>
  );
};

export default ScrollArrow;
