import Box from '@mui/material/Box';
import type { Project } from './projects';

export default function ProjectIndexLink({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  return (
    <Box
      component="a"
      href={`#project-${index + 1}`}
      aria-current={active ? 'location' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 1.6,
        borderBottom: '1px solid rgba(235,232,222,.12)',
        color: active ? '#ebe8de' : '#969890',
        textDecoration: 'none',
        fontSize: 13,
        transition: 'color 180ms ease',
        '&:hover': { color: '#ebe8de' },
        '&:focus-visible': {
          outline: '2px solid #e89ac4',
          outlineOffset: 3,
        },
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: 10,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {index + 1}
      </Box>
      <Box component="span" sx={{ flex: 1 }}>
        {project.name}
      </Box>
    </Box>
  );
}
