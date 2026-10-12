import LinkArrow from '../brand/LinkArrow';
import { Box, Button, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import { getWhatsAppUrl } from '../contact/contactUrls';
import useOpenContact from '../contact/useOpenContact';
import FadeIn from '../scroll/FadeIn';

const black = 'rgba(0, 0, 0, 0.5)';
const fadeOutPosition = 200; // px
const backgroundGradient = `linear-gradient(to bottom, transparent, ${black} ${fadeOutPosition}px, ${black} calc(100% - ${fadeOutPosition}px), transparent)`;

export default function About() {
  const { copy, language } = useLanguage();
  const openContact = useOpenContact();

  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      sx={{
        position: 'relative',
        background: backgroundGradient,
        px: { xs: '6vw', sm: '7vw' },
        py: { xs: 8, sm: 12 },
        scrollMarginTop: 'var(--header-height, 100px)',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <FadeIn>
          <Typography
            component="h2"
            id="about-heading"
            sx={{
              fontSize: { xs: 32, sm: 48 },
              fontWeight: 600,
              letterSpacing: '-.035em',
            }}
          >
            {copy.about.title}
          </Typography>
          <Typography
            sx={{
              mt: 2,
              maxWidth: 760,
              fontSize: { xs: 20, sm: 28 },
              lineHeight: 1.4,
              background: 'var(--brand-gradient)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {copy.about.intro}
          </Typography>
        </FadeIn>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            mt: { xs: 5, sm: 8 },
          }}
        >
          {copy.about.blocks.map((block) => (
            <FadeIn
              key={block.title}
              sx={{ borderTop: '1px solid rgba(235,232,222,.18)', pt: 3 }}
            >
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: 23, sm: 28 },
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: '-.025em',
                  mb: 2.5,
                }}
              >
                {block.title}
              </Typography>
              {block.paragraphs.map((paragraph) => (
                <Typography
                  key={paragraph}
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: 16, sm: 18 },
                    lineHeight: 1.75,
                    mb: 2,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </FadeIn>
          ))}
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
    </Box>
  );
}
