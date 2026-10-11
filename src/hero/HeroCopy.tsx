import { gradientTextSx } from '../brand/colors';
import { useLanguage } from '../i18n/LanguageContext';
import { Box, Button, Typography } from '@mui/material';
import useOpenContact from '../contact/useOpenContact';
import { getWhatsAppUrl } from '../contact/contactUrls';

export default function HeroCopy() {
  const { copy, language } = useLanguage();
  const openContact = useOpenContact();
  return (
    <Box sx={{ minWidth: 0, maxWidth: 680 }}>
      <Typography
        component="h1"
        id="hero-headline"
        sx={{
          fontSize: {
            xs: 'clamp(36px, 9vw, 52px)',
            sm: 'clamp(36px, 4.5vw, 44px)',
            md: 'clamp(44px, 4.5vw, 64px)',
          },
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: '-.045em',
          textWrap: 'balance',
        }}
      >
        {copy.heroDesign.headline}
        <Box component="span" sx={{ ...gradientTextSx }}>
          .
        </Box>
      </Typography>
      <Typography
        component="p"
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
            background: 'var(--brand-gradient)',
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
            borderBottom: '1px solid transparent',
            borderImage: 'var(--brand-gradient) 1',
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
