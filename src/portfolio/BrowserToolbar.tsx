import Box from '@mui/material/Box';
import type { Project } from './projects';
import { hiddenToolbarPart, styles } from './styles';

export default function BrowserToolbar({ project, closing }: { project: Project; closing: boolean }) {
  return (
    <Box sx={styles.toolbar} aria-hidden={closing} inert={closing}>
      <Box sx={styles.address}>
        <svg aria-hidden="true" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="4.5" y="8.5" width="11" height="8" rx="2" />
          <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
        </svg>
        <Box component="span" sx={{ ...styles.url, ...(closing ? hiddenToolbarPart : {}) }}>{project.url.replace('https://', '')}</Box>
      </Box>
      <Box component="a" href={project.url} target="_blank" rel="noopener noreferrer" sx={{ ...styles.visit, ...(closing ? hiddenToolbarPart : {}) }} aria-label={`Open ${project.name} in a new tab`} title="Open website in a new tab">↗</Box>
    </Box>
  );
}
