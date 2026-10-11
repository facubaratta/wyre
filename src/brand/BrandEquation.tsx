import { useLanguage } from '../i18n/LanguageContext';
import SectionIconGraphic from './SectionIconGraphic';
import { Box, Typography } from '@mui/material';

const fontSizes = {
  hero: {
    label: 10,
    symbols: { xs: '28px', sm: '36px' },
  },
  navbar: {
    label: 9,
    symbols: { xs: '20px', md: '22px' },
  },
} as const;

export default function BrandEquation({
  placement = 'hero',
}: {
  placement?: 'hero' | 'navbar';
}) {
  const isNavbar = placement === 'navbar';
  const { copy } = useLanguage();
  return (
    <Box
      id={`${placement}-equation`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: isNavbar ? 0 : { xs: 2, sm: 10 },
      }}
    >
      <Typography
        component="p"
        sx={{
          mb: isNavbar ? 0.5 : 3,
          fontSize: fontSizes[placement].label,
          fontWeight: 700,
          letterSpacing: '.16em',
          color: 'var(--accent)',
          display: isNavbar ? { xs: 'none', md: 'block' } : 'block',
        }}
      >
        {copy.equation}
      </Typography>
      <Box
        aria-hidden="true"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: isNavbar ? { xs: 1, md: 1.5 } : { xs: 2, sm: 3 },
          mb: isNavbar ? 0 : { xs: 4, sm: 5 },
          color: 'var(--accent)',
          fontSize: fontSizes[placement].symbols,
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        <Box
          id={isNavbar ? 'navbar-globe' : 'hero-globe'}
          sx={{
            width: isNavbar ? 28 : { xs: 40, sm: 56 },
            height: isNavbar ? 28 : { xs: 40, sm: 56 },
          }}
        >
          <SectionIconGraphic icon="globe" />
        </Box>
        <Box component="span">+</Box>
        <Box
          id={isNavbar ? 'navbar-brain' : undefined}
          sx={{
            width: isNavbar ? 28 : { xs: 40, sm: 56 },
            height: isNavbar ? 28 : { xs: 40, sm: 56 },
          }}
        >
          <SectionIconGraphic icon="brain" />
        </Box>
        <Box component="span">=</Box>
        <Box
          id={isNavbar ? 'navbar-growth' : undefined}
          sx={{
            width: isNavbar ? 28 : { xs: 40, sm: 56 },
            height: isNavbar ? 28 : { xs: 40, sm: 56 },
          }}
        >
          <SectionIconGraphic icon="growth" />
        </Box>
      </Box>
    </Box>
  );
}
