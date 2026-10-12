import Box from '@mui/material/Box';
import { useLanguage } from '../i18n/LanguageContext';
import type { Project } from './projects';
import ProjectArtwork from './ProjectArtwork';

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { copy } = useLanguage();
  return (
    <Box
      component="article"
      id={`project-${index + 1}`}
      sx={{ scrollMarginTop: 'calc(var(--header-height, 100px) + 32px)' }}
    >
      <Box
        component="a"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} — ${copy.portfolio.visit}`}
        sx={{
          position: 'relative',
          display: 'block',
          color: 'inherit',
          textDecoration: 'none',
          '&:focus-visible': { outline: '2px solid #e89ac4', outlineOffset: 8 },
          '@media (hover: hover)': {
            '&:hover img': { transform: 'translateY(-8px)' },
            '&:hover [data-project-arrow]': {
              transform: 'translate(3px, -3px)',
            },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '& img, & [data-project-arrow]': {
              transition: 'none',
              transform: 'none !important',
            },
          },
        }}
      >
        <ProjectArtwork project={project} index={index} />
      </Box>
    </Box>
  );
}
