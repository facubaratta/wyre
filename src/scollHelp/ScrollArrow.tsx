import { Box, IconButton } from '@mui/material';
import { usePreferences } from '../PreferencesProvider';
import useScrollCheckpoints from '../useScrollCheckpoints';
import { useLandingSequence } from '../LandingSequenceProvider';
import { serviceGroups } from '../hero/services/serviceGroups';
import { projects } from '../portfolio/projects';

const ARROW_SIZE = 'clamp(50px, 20vw, 100px)';
const ARROW_BOTTOM_OFFSET = '6.5vh';
const ARROW_CIRCLE_RADIUS = 15;

const ARROW_CIRCLE_DIAMETER = `${(ARROW_CIRCLE_RADIUS / 24) * 100}%`;
const ARROW_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * ARROW_CIRCLE_RADIUS;
const Circle = ({ atEnd }: { atEnd: boolean }) => (
  <Box
    component="circle"
    cx="24"
    cy="24"
    r={ARROW_CIRCLE_RADIUS}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeDasharray={ARROW_CIRCLE_CIRCUMFERENCE}
    sx={{
      opacity: atEnd ? 1 : 0,
      strokeDashoffset: atEnd ? 0 : ARROW_CIRCLE_CIRCUMFERENCE,
      transform: 'rotate(-90deg)',
      transformOrigin: 'center',
      animation: atEnd ? 'scroll-help-draw-circle 650ms linear both' : 'none',
    }}
  />
);

const DirectionArrow = ({ atEnd }: { atEnd: boolean }) => (
  <Box
    component="path"
    d="M18 21l6 6 6-6"
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
        from: { strokeDashoffset: ARROW_CIRCLE_CIRCUMFERENCE },
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
    if (reduceMotion) {
      onNextReducedMotion();
      return;
    }

    nextCheckpoint();
  };

  return (
    <Box
      sx={{
        '@keyframes scroll-help-bounce': {
          '0%, 100%': { translate: '0 0' },
          '50%': { translate: '0 8px' },
        },
        position: 'fixed',
        zIndex: 1300,
        left: '50%',
        bottom: ARROW_BOTTOM_OFFSET,
        width: 0,
        height: 0,
        animation:
          !reduceMotion && !atEnd
            ? 'scroll-help-bounce 1.4s ease-in-out infinite'
            : 'none',
      }}
    >
      <IconButton
        aria-label={atEnd ? 'Scroll to top' : 'Scroll to the next section'}
        disableRipple
        onClick={onClick}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: ARROW_SIZE,
          height: ARROW_SIZE,
          p: 0,
          transform: 'translate(-50%, -50%)',
          '&:focus-visible': {
            outline: '2px solid var(--accent)',
            outlineOffset: 4,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: ARROW_CIRCLE_DIAMETER,
            height: ARROW_CIRCLE_DIAMETER,
            borderRadius: '50%',
            backgroundColor: 'rgba(var(--accent-rgb), 1)',
            opacity: 0,
            transition: 'opacity 150ms ease',
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:hover::before': {
            opacity: 0.08,
          },
          '&:active::before': {
            opacity: 0.16,
          },
        }}
      >
        <ArrowIcon atEnd={atEnd} />
      </IconButton>
    </Box>
  );
};

export default ScrollArrow;
