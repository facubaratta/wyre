import { Button, Typography } from '@mui/material';
import { useLanguage } from '../../i18n/LanguageContext';
import FadeIn from '../../scroll/FadeIn';
import { useAbout } from './AboutContext';

export default function AboutIntro() {
  const { copy } = useLanguage();
  const { expanded, expand } = useAbout();
  return (
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
      {!expanded && (
        <Button
          aria-expanded={expanded}
          aria-controls="about-details"
          onClick={expand}
          sx={{
            mt: 3,
            minHeight: 48,
            px: 2.5,
            border: '1px solid rgba(235,232,222,.35)',
            color: 'text.primary',
            fontSize: 16,
            textTransform: 'none',
          }}
        >
          {copy.about.readMore}
        </Button>
      )}
    </FadeIn>
  );
}
