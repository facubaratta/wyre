import Box from '@mui/material/Box';
import { projects } from './projects';
import ClosingScreen from './ClosingScreen';
import ProjectCard from './ProjectCard';
import PortfolioIndex from './PortfolioIndex';

export default function Portfolio() {
  return (
    <Box
      component="section"
      aria-labelledby="growth-heading"
      sx={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1280,
        mx: 'auto',
        px: { xs: '6vw', md: 5 },
        pt: { xs: 8, md: 14 },
        pb: { xs: 8, md: 12 },
        color: '#ebe8de',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          borderTop: '1px solid rgba(235,232,222,.3)',
          pb: { xs: 5, md: 8 },
        }}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, .7fr) minmax(0, 1.3fr)',
          },
          gap: { xs: 6, md: 8 },
          alignItems: 'start',
        }}
      >
        <PortfolioIndex />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 7, md: 12 },
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.url} project={project} index={index} />
          ))}
        </Box>
      </Box>
      <Box
        id="portfolio-contact"
        sx={{
          position: 'relative',
          mt: { xs: 10, md: 16 },
          containerType: 'inline-size',
          scrollMarginTop: 'var(--header-height, 100px)',
        }}
      >
        <ClosingScreen />
      </Box>
    </Box>
  );
}
