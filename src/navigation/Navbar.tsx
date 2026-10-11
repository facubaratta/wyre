import { Box } from '@mui/material';
import { HeroLogo } from '../brand/logo';
import { usePreferences } from '../preferences/PreferencesContext';
import NavigationActions from './NavigationActions';
import useHeaderHeight from './useHeaderHeight';
import { useScrollSnapshot } from '../scroll/useWindowScroll';
import useNavbarVisibility from './useNavbarVisibility';

export default function Navbar() {
  const { accent, reduceMotion } = usePreferences();
  const headerRef = useHeaderHeight();
  const scrolled = useScrollSnapshot((scroll) => scroll.y > 0);
  const visible = useNavbarVisibility();
  const show = scrolled && visible;
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
        transition: reduceMotion ? 'none' : 'opacity 200ms ease',
        background: 'rgba(24,26,25,.94)',
        backdropFilter: { xs: 'none', md: 'blur(16px)' },
        borderBottom: '1px solid rgba(235,232,222,.14)',
        px: { xs: '6vw', sm: '7vw' },
        pt: 'max(8px, env(safe-area-inset-top))',
        pb: { xs: 1, md: 1.5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 1, md: 3 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
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
        </Box>
        <Box
          sx={{
            minWidth: 0,
            ml: 'auto',
            order: { xs: 2, md: 3 },
          }}
        >
          <NavigationActions placement="navbar" />
        </Box>
      </Box>
    </Box>
  );
}
