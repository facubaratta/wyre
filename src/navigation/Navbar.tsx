import { Box } from '@mui/material';
import BrandEquation from '../brand/BrandEquation';
import { HeroLogo } from '../brand/logo';
import { useScrollSnapshot } from '../scroll/useWindowScroll';
import { usePreferences } from '../preferences/PreferencesContext';
import NavigationActions from './NavigationActions';
import useHeaderHeight from './useHeaderHeight';
import useNavbarVisibility from './useNavbarVisibility';
import {
  useTitleFrame,
  useTitleTransition,
} from '../hero/transition/TitleTransitionContext';

export default function Navbar() {
  const scrolled = useScrollSnapshot((scroll) => scroll.y > 0);
  const { accent, reduceMotion } = usePreferences();
  const headerRef = useHeaderHeight();
  const visible = useNavbarVisibility();
  const { moving, complete } = useTitleTransition();
  const titleFrame = useTitleFrame();
  const animating = moving && !complete;
  const pastHero = titleFrame === null || titleFrame.progress === 1;
  const show = scrolled && visible && !animating && pastHero;
  return (
    <Box
      component="header"
      id="site-header"
      ref={headerRef}
      inert={!show}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        transition: reduceMotion ? 'none' : 'transform 200ms ease',
        background: 'rgba(24,26,25,.94)',
        backdropFilter: { xs: 'none', md: 'blur(16px)' },
        borderBottom: '1px solid rgba(235,232,222,.14)',
        px: { xs: '5vw', sm: '6.5vw' },
        pt: 'max(8px, env(safe-area-inset-top))',
        pb: { xs: 1, md: 1.5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1600,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 1, md: 3 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box
            id="navbar-wordmark"
            sx={{
              fontSize: { xs: 28, md: 32 },
              flexShrink: 0,
            }}
          >
            <HeroLogo
              compact
              accent={accent}
              animationActive={false}
              style={{ fontSize: 'inherit' }}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <BrandEquation placement="navbar" />
          </Box>
        </Box>
        <Box
          sx={{
            minWidth: 0,
            ml: 'auto',
          }}
        >
          <NavigationActions placement="navbar" />
        </Box>
      </Box>
    </Box>
  );
}
