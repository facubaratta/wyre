import { Box } from '@mui/material';
import { HeroLogo } from '../brand/logo';
import { usePreferences } from '../preferences/PreferencesContext';
import NavigationActions from '../navigation/NavigationActions';
import SectionNavigation from '../navigation/SectionNavigation';
import HeroWordmark from './HeroWordmark';
import HeroCopy from './HeroCopy';
import { useHeroProgress } from './transition/HeroTransitionContext';
import { between, ease } from './transition/motion';

export default function HeroSection() {
  const { accent } = usePreferences();
  const progress = useHeroProgress();
  const exit = ease(between(progress, 0.08, 0.72));
  return (
    <Box
      component="section"
      aria-labelledby="hero-headline"
      id="hero"
      inert={exit === 1}
      sx={{
        position: 'relative',
        zIndex: 1,
        transform: `translate3d(0, ${progress * 28}vh, 0) scale(${1 - progress * 0.22})`,
        transformOrigin: 'center center',
        filter: `blur(${progress * 5}px)`,
        minHeight: '100svh',
        px: { xs: '6vw', md: '4vw' },
        pb: { xs: 11, md: 12 },
        color: 'text.primary',
      }}
    >
      <Box
        style={{ opacity: 1 - exit }}
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2, md: 6 },
          pt: 'max(18px, env(safe-area-inset-top))',
          pb: 2,
        }}
      >
        <Box
          component="a"
          href="#hero"
          aria-label="Wyre"
          sx={{
            fontSize: { xs: 30, md: 36 },
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <HeroLogo compact accent={accent} animationActive={false} />
        </Box>
        <SectionNavigation />
        <Box sx={{ ml: 'auto' }}>
          <NavigationActions placement="hero" />
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.12fr 1fr' },
          alignItems: 'center',
          gap: { xs: 3, md: 5 },
          minHeight: { md: 'calc(100svh - 180px)' },
          pt: { xs: 5, md: 5 },
        }}
      >
        <HeroCopy />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <HeroWordmark animationActive />
        </Box>
      </Box>
    </Box>
  );
}
