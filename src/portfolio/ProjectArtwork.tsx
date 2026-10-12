import Box from '@mui/material/Box';
import ProjectScreenshot from './ProjectScreenshot';
import ProjectFooter from './ProjectFooter';
import type { Project } from './projects';
import { projectThemes } from './projectThemes';

export default function ProjectArtwork({
  project,
  index,
  hovered,
}: {
  project: Project;
  index: number;
  hovered: boolean;
}) {
  const art = projectThemes[index % projectThemes.length];
  const number = String(index + 1).padStart(2, '0');
  return (
    <Box
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: art.align,
        background: art.background,
        color: art.ink,
        px: { xs: 3, md: 5 },
        pt: { xs: 3, md: 4 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          mb: { xs: 3, md: 4 },
        }}
      >
        <Box
          component="h3"
          sx={{
            m: 0,
            fontSize: { xs: 27, md: 'clamp(30px, 3vw, 44px)' },
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-.045em',
          }}
        >
          {project.name}
        </Box>
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: '78%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: art.accent,
          opacity: 0.45,
          top: index % 2 ? '-40%' : '32%',
          left: index % 2 ? '35%' : '-25%',
          zIndex: -1,
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: '-.16em',
          left: '.015em',
          fontSize: { xs: '160px', md: '260px' },
          fontWeight: 600,
          letterSpacing: '-.085em',
          lineHeight: 1,
          opacity: 0.12,
          zIndex: -1,
        }}
      >
        {number}
      </Box>
      <ProjectScreenshot
        project={project}
        index={index}
        art={art}
        hovered={hovered}
      />
      <ProjectFooter url={project.url} hovered={hovered} />
    </Box>
  );
}
