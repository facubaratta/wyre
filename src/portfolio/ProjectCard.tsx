import Box from '@mui/material/Box';
import { useLanguage } from '../i18n/LanguageContext';
import type { Project } from './projects';
import ProjectArtwork from './ProjectArtwork';
import useControlState from '../controls/useControlState';

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { copy } = useLanguage();
  const { hovered, events } = useControlState();
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
        {...events}
        aria-label={`${project.name} — ${copy.portfolio.visit}`}
        sx={{
          position: 'relative',
          display: 'block',
          color: 'inherit',
          textDecoration: 'none',
          '&:focus-visible': { outline: '2px solid #e89ac4', outlineOffset: 8 },
        }}
      >
        <ProjectArtwork project={project} index={index} hovered={hovered} />
      </Box>
    </Box>
  );
}
