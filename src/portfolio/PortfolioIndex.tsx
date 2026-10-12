import Box from '@mui/material/Box';
import useActiveProject from './useActiveProject';
import ProjectIndexLink from './ProjectIndexLink';
import { useLanguage } from '../i18n/LanguageContext';
import { projects } from './projects';

export default function PortfolioIndex() {
  const { copy } = useLanguage();
  const active = useActiveProject();

  return (
    <Box
      sx={{
        position: { md: 'sticky' },
        top: 'calc(var(--header-height, 100px) + 32px)',
        pb: { md: 5 },
      }}
    >
      <Box
        component="h2"
        id="growth-heading"
        sx={{
          m: 0,
          fontSize: {
            xs: 'clamp(66px, 18vw, 100px)',
            md: 'clamp(64px, 6.5vw, 94px)',
          },
          fontWeight: 600,
          letterSpacing: '-.075em',
          lineHeight: 0.95,
        }}
      >
        {copy.portfolio.titleFirst} <br />
        <Box
          component="span"
          sx={{
            color: 'transparent',
            WebkitTextStroke: '1px #ebe8de',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 400,
            letterSpacing: '-.035em',
          }}
        >
          {copy.portfolio.titleLast}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 7 }}>
        <Box component="nav" aria-label={copy.portfolio.indexLabel}>
          {projects.map((project, index) => (
            <ProjectIndexLink
              key={project.url}
              project={project}
              index={index}
              active={active === index}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
