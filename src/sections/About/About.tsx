import Box from '@mui/material/Box';
import AboutIntro from './AboutIntro';
import AboutDetails from './AboutDetails';

const black = 'rgba(0, 0, 0, 0.5)';
const fadeOutPosition = 200; // px
const backgroundGradient = `linear-gradient(to bottom, transparent, ${black} ${fadeOutPosition}px, ${black} calc(100% - ${fadeOutPosition}px), transparent)`;

export default function About() {
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
        <AboutIntro />
        <AboutDetails />
      </Box>
    </Box>
  );
}
