import Box from '@mui/material/Box';
import type { SVGProps } from 'react';
import type { Project } from './projects';
import { hiddenToolbarPart, styles } from './styles';

const iconSx: Pick<SVGProps<SVGSVGElement>, 'aria-hidden' | 'viewBox' | 'fill' | 'stroke'> = {
  'aria-hidden': 'true',
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
};

const LockIcon = () => (
  <svg
    {...iconSx}
    width="18"
    height="18"
    strokeWidth="1.4"
  >
    <rect x="4.5" y="8.5" width="11" height="8" rx="2" />
    <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    {...iconSx}
    width="40"
    height="40"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 13 14 6" />
    <path d="M8 6h6v6" />
  </svg>
);

export default function BrowserToolbar({
  project,
  closing,
}: {
  project: Project;
  closing: boolean;
}) {
  return (
    <Box sx={styles.toolbar} aria-hidden={closing} inert={closing}>
      <Box sx={styles.address}>
        <LockIcon />
        <Box
          component="span"
          sx={{ ...styles.url, ...(closing ? hiddenToolbarPart : {}) }}
        >
          {project.url.replace('https://', '')}
        </Box>
      </Box>
      <Box
        component="a"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ ...styles.visit, ...(closing ? hiddenToolbarPart : {}) }}
        aria-label={`Open ${project.name} in a new tab`}
        title="Open website in a new tab"
      >
        <ArrowIcon />
      </Box>
    </Box>
  );
}
