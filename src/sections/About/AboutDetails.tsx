import { Box, Button, Collapse, Typography } from '@mui/material';
import LinkArrow from '../../brand/LinkArrow';
import { useLanguage } from '../../i18n/LanguageContext';
import { getWhatsAppUrl } from '../../contact/contactUrls';
import useOpenContact from '../../contact/useOpenContact';
import AboutBlocks from './AboutBlocks';
import { useAbout } from './AboutContext';

export default function AboutDetails() {
  const { copy, language } = useLanguage();
  const openContact = useOpenContact();
  const { expanded } = useAbout();
  return (
    <Collapse in={expanded} timeout={0}>
      <Box id="about-details">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            mt: { xs: 5, sm: 8 },
          }}
        >
          <AboutBlocks blocks={copy.about.blocks} />
        </Box>
        <Typography
          sx={{ mt: 5, fontSize: { xs: 23, sm: 28 }, fontWeight: 600 }}
        >
          {copy.about.closing}
        </Typography>
        <Button
          component="a"
          href={getWhatsAppUrl(null, language)}
          onClick={(event) => {
            event.preventDefault();
            openContact();
          }}
          sx={{
            mt: 2,
            minHeight: 48,
            px: 2.5,
            background: 'var(--brand-gradient)',
            color: '#181a19',
            fontWeight: 700,
            fontSize: { xs: 16, sm: 18 },
            textTransform: 'none',
          }}
        >
          {copy.about.cta}
          <LinkArrow sx={{ ml: 1 }} />
        </Button>
      </Box>
    </Collapse>
  );
}
