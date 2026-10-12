import LinkArrow from '../brand/LinkArrow';
import { gradientTextSx } from '../brand/colors';
import { useLanguage } from '../i18n/LanguageContext';
import { Box, Button, Typography } from '@mui/material';
import useOpenContact from '../contact/useOpenContact';
import { getWhatsAppUrl } from '../contact/contactUrls';

export default function HeroCopy() {
  const { copy, language } = useLanguage();
  const openContact = useOpenContact();
  return (
    <Box sx={{ minWidth: 0, maxWidth: 748 }}>
      <Typography
        component="h1"
        id="hero-headline"
        sx={{
          fontSize: {
            xs: 'clamp(39.6px, 9.9vw, 57.2px)',
            sm: 'clamp(39.6px, 4.95vw, 48.4px)',
            md: 'clamp(48.4px, 4.95vw, 70.4px)',
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
          mt: 2.75,
          maxWidth: 517,
          fontSize: { xs: 17.6, md: 20.9 },
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
          gap: { xs: 2.2, md: 3.3 },
          mt: 3.85,
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
            fontSize: '0.9625rem',
            fontWeight: 700,
            px: 2.75,
            minHeight: 52.8,
            borderRadius: 1.1,
          }}
        >
          {copy.heroDesign.discuss}
          <LinkArrow sx={{ ml: 1.1, width: 19.8, height: 19.8 }} />
        </Button>
        <Button
          component="a"
          href="#crecimiento-real"
          sx={{
            textTransform: 'none',
            fontSize: '0.9625rem',
            color: 'text.primary',
            borderRadius: 0,
            borderBottom: '1px solid transparent',
            borderImage: 'var(--brand-gradient) 1',
            px: 0,
            minHeight: 48.4,
          }}
        >
          {copy.heroDesign.explore} ↓
        </Button>
      </Box>
    </Box>
  );
}
