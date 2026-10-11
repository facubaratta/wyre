import { Box } from '@mui/material';
import { HeroLogo } from '../brand/logo';
import { usePreferences } from '../preferences/PreferencesContext';
import NavigationActions from '../navigation/NavigationActions';
import HeroWordmark from './HeroWordmark';
import HeroCopy from './HeroCopy';

export default function HeroSection() {
  const { accent } = usePreferences();
  return (
    <Box
      component="section"
      aria-labelledby="hero-headline"
      id="hero"
      sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100svh',
        px: { xs: '6vw', sm: '7vw' },
        pb: { xs: 11, md: 12 },
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
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
        <Box sx={{ ml: 'auto' }}>
          <NavigationActions placement="hero" />
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1.25fr 0.75fr' },
          alignItems: 'center',
          gap: { xs: 5, md: 8 },
          minHeight: { sm: 'calc(100svh - 180px)' },
          pt: { xs: 4, md: 5 },
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
