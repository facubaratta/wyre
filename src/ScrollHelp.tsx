import { Box, IconButton } from '@mui/material';
import { usePreferences } from './PreferencesProvider';
import { progressBetween } from './scrollTimeline';
import type { SequenceTimeline } from './scrollTimeline';
import type { WindowScroll } from './useWindowScroll';
import useScrollCheckpoints from './useScrollCheckpoints';

const Shadow = ({ scrollShadowOpacity }: { scrollShadowOpacity: number }) => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'fixed',
      zIndex: 20,
      left: 0,
      right: 0,
      bottom: 0,
      height: 'clamp(22px, 4vh, 44px)',
      pointerEvents: 'none',
      opacity: scrollShadowOpacity,
      transition: 'opacity 450ms ease',
      background:
        'linear-gradient(to bottom, transparent, rgba(var(--accent-rgb), .22))',
      filter: 'drop-shadow(0 -5px 16px rgba(var(--accent-rgb), .2))',
    }}
  />
);

const Arrow = ({
  atEnd,
  onClick,
}: {
  atEnd: boolean;
  onClick: () => void;
}) => (
  <IconButton
    aria-label={atEnd ? 'Scroll to top' : 'Scroll to the next section'}
    onClick={onClick}
    sx={{
      position: 'fixed',
      zIndex: 1300,
      left: '50%',
      bottom: 'clamp(25px, 4.5vh, 48px)',
      width: 'clamp(40px, 6vw, 64px)',
      height: 'clamp(40px, 6vw, 64px)',
      transform: 'translateX(-50%)',
      color: 'rgba(var(--accent-rgb), .85)',
      '&::before': {
        content: '""',
        width: 'clamp(19px, 2.6vw, 28px)',
        height: 'clamp(19px, 2.6vw, 28px)',
        borderRight: '3.5px solid currentColor',
        borderBottom: '3.5px solid currentColor',
        transform: atEnd
          ? 'translateY(4px) rotate(225deg)'
          : 'translateY(-4px) rotate(45deg)',
        transition: 'transform 300ms ease',
      },
    }}
  />
);

const ScrollHelp = ({
  scrollShadowOpacity,
  scroll,
  timeline,
  serviceCount,
  projectCount,
  onNextReducedMotion,
}: {
  scrollShadowOpacity: number;
  scroll: WindowScroll;
  timeline: SequenceTimeline;
  serviceCount: number;
  projectCount: number;
  onNextReducedMotion: () => void;
}) => {
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

  return (
    <>
      <Shadow scrollShadowOpacity={scrollShadowOpacity} />
      <Arrow atEnd={atEnd} onClick={nextCheckpoint} />
    </>
  );
};

export default ScrollHelp;
