import Box from '@mui/material/Box';
import HeroWordmark from './HeroWordmark';
import { usePreferences } from '../preferences/PreferencesContext';
import BrandEquation from '../brand/BrandEquation';
import NavigationActions from '../navigation/NavigationActions';
import HeroCopy from './HeroCopy';
import { useHeroExit } from './transition/TitleTransitionContext';

const heroSx = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row-reverse' },
  alignItems: 'center',
  justifyContent: 'safe center',
  gap: { xs: '16px', sm: '40px', md: '6vw' },
  minHeight: '100svh',
  px: { xs: '6vw', sm: '6.5vw' },
  pt: { xs: 'max(32px, env(safe-area-inset-top))', md: '100px' },
  pb: { xs: '88px', md: '100px' },
  color: 'text.primary',
  textAlign: 'center',
};

export default function HeroSection() {
  const { reduceMotion } = usePreferences();
  const exit = useHeroExit();

  return (
    <Box
      component="section"
      aria-labelledby="hero-headline"
      id="hero"
      inert={exit === 1}
      sx={heroSx}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 0 },
          width: { xs: '100%', md: 'auto' },
          alignItems: 'center',
        }}
        inert={exit === 1}
        style={{
          opacity: 1 - exit,
          visibility: exit === 1 ? 'hidden' : 'visible',
        }}
      >
        <NavigationActions placement="hero" />
        <HeroWordmark animationActive={reduceMotion || exit < 1} />
        <BrandEquation />
      </Box>

      <HeroCopy />
    </Box>
  );
}
