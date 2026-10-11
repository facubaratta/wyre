import { gradientFocusSx } from '../brand/colors';
import { useLanguage } from '../i18n/LanguageContext';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import useControlState from '../controls/useControlState';
import ScrollArrowIcon from './ScrollArrowIcon';
import { usePreferences } from '../preferences/PreferencesContext';
import useScrollCheckpoints from './useScrollCheckpoints';
import { usePortfolioSequenceState } from '../portfolio/PortfolioSequenceContext';
import { useScrollSnapshot } from './useWindowScroll';

const bounce = keyframes({
  '0%, 100%': { translate: '0 0' },
  '50%': { translate: '0 8px' },
});
const rootSx = {
  position: 'fixed',
  zIndex: 1300,
  left: { xs: 'calc(100% - 40px)', sm: '50%' },
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
  width: 48,
  height: 48,
  p: 0,
  border: 0,
  borderRadius: '50%',
  background: 'rgba(24,26,25,.92)',
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
  background: 'var(--brand-gradient)',
  transition: 'opacity 150ms ease',
  pointerEvents: 'none',
};

const ScrollArrow = () => {
  const { copy } = useLanguage();
  const { hovered, pressed, focusVisible, events } = useControlState();
  const { selectProject } = usePortfolioSequenceState();
  const { reduceMotion } = usePreferences();
  const atEnd = useScrollSnapshot(
    (scroll) =>
      scroll.y >=
      (typeof document === 'undefined'
        ? Infinity
        : document.documentElement.scrollHeight) -
        scroll.viewport -
        2,
  );
  const bouncing = useScrollSnapshot((scroll) => !reduceMotion && scroll.y < 4);
  const nextCheckpoint = useScrollCheckpoints({
    atEnd,
    reduceMotion,
    onReset: () => selectProject(0),
  });

  return (
    <Box
      sx={{
        ...rootSx,
        animation: bouncing ? `${bounce} 1.4s ease-in-out infinite` : 'none',
      }}
    >
      <Box
        component="button"
        type="button"
        aria-label={atEnd ? copy.scroll.top : copy.scroll.next}
        {...events}
        onClick={nextCheckpoint}
        sx={{
          ...buttonSx,
          isolation: 'isolate',
          ...(focusVisible ? gradientFocusSx : {}),
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
