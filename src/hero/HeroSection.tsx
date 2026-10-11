import { Box, Button } from '@mui/material';
import HeroWordmark from './HeroWordmark';
import { HeroLogo } from '../brand/logo';
import { usePreferences } from '../preferences/PreferencesContext';
import NavigationActions from '../navigation/NavigationActions';
import HeroCopy from './HeroCopy';
import {
  useHeroExit,
  useHeroWireGeometry,
} from './transition/HeroTransitionContext';
import SectionWires from './transition/SectionWires';
import { useLanguage } from '../i18n/LanguageContext';
import SectionIconGraphic from '../brand/SectionIconGraphic';

export default function HeroSection() {
  const { accent } = usePreferences();
  const { copy } = useLanguage();
  const exit = useHeroExit();
  const wireGeometry = useHeroWireGeometry();
  return (
    <Box
      component="section"
      aria-labelledby="hero-headline"
      id="hero"
      inert={exit === 1}
      sx={{
        position: 'relative',
        zIndex: 1,
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
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {[
            [copy.heroDesign.services, '#presencia-web'],
            [copy.heroDesign.work, '#crecimiento-real'],
            [copy.heroDesign.about, '#decisiones-humanas'],
          ].map(([label, href]) => (
            <Button
              key={href}
              component="a"
              href={href}
              sx={{
                color: 'text.secondary',
                textTransform: 'none',
                fontSize: 14,
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
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
          <Box
            id="hero-equation"
            style={{ opacity: 1 - exit }}
            sx={{
              display: 'flex',
              width: '100%',
              maxWidth: 420,
              mt: { xs: 1, md: 3 },
            }}
          >
            {(['globe', 'brain', 'growth'] as const).map((icon, index) => (
              <Box
                key={icon}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  position: 'relative',
                  '&:not(:last-child)::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: 14,
                    height: 44,
                    width: '1px',
                    background: 'rgba(194,162,123,.3)',
                  },
                }}
              >
                <Box
                  id={index === 0 ? 'hero-globe' : undefined}
                  sx={{
                    width: 42,
                    height: 42,
                    mx: 'auto',
                    color: 'var(--accent)',
                  }}
                >
                  <SectionIconGraphic icon={icon} />
                </Box>
                <Box sx={{ mt: 1.5, fontSize: 13, color: 'text.secondary' }}>
                  {copy.heroDesign.pillars[index]}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {wireGeometry && <SectionWires geometry={wireGeometry} />}
    </Box>
  );
}
