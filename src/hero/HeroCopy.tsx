import { useLanguage } from '../i18n/LanguageContext';
import { Box, Button, Typography } from '@mui/material';
import { useHeroProgress } from './transition/HeroTransitionContext';
import useOpenContact from '../contact/useOpenContact';
import { getWhatsAppUrl } from '../contact/contactUrls';

export default function HeroCopy() {
  const { copy, language } = useLanguage();
  const exit = useHeroProgress() ** 2;
  const openContact = useOpenContact();
  return (
    <Box sx={{ minWidth: 0, maxWidth: 680 }}>
      <Typography
        component="h1"
        id="hero-headline"
        style={{ opacity: 1 - exit }}
        sx={{
          fontSize: {
            xs: 'clamp(36px, 9vw, 52px)',
            md: 'clamp(44px, 4.9vw, 72px)',
          },
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: '-.045em',
          textWrap: 'pretty',
        }}
      >
        {copy.heroDesign.headline}
        <Box component="span" sx={{ color: 'var(--accent)' }}>
          .
        </Box>
      </Typography>
      <Typography
        component="p"
        style={{ opacity: 1 - exit }}
        sx={{
          mt: 2.5,
          maxWidth: 470,
          fontSize: { xs: 16, md: 19 },
          lineHeight: 1.6,
          color: 'text.secondary',
        }}
      >
        {copy.heroDesign.description}
      </Typography>
      <Box
        style={{ opacity: 1 - exit }}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: { xs: 2, md: 3 },
          mt: 3.5,
        }}
      >
        <Button
          component="a"
          href={getWhatsAppUrl(null, language)}
          onClick={(event) => {
            event.preventDefault();
            openContact();
          }}
          variant="contained"
          sx={{
            background: 'var(--accent)',
            color: '#111212',
            textTransform: 'none',
            fontWeight: 700,
            px: 2.5,
            minHeight: 48,
            borderRadius: 1,
          }}
        >
          {copy.heroDesign.discuss} ↗
        </Button>
        <Button
          component="a"
          href="#crecimiento-real"
          sx={{
            textTransform: 'none',
            color: 'text.primary',
            borderRadius: 0,
            borderBottom: '1px solid var(--accent)',
            px: 0,
            minHeight: 44,
          }}
        >
          {copy.heroDesign.explore} ↓
        </Button>
      </Box>
    </Box>
  );
}
