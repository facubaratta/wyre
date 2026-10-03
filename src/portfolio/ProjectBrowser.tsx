import ClosingScreen from './ClosingScreen';
import BrowserToolbar from './BrowserToolbar';
import ProjectScreenshots from './ProjectScreenshots';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { Project } from './projects';

const styles = {
  display: {
    containerType: 'inline-size',
    position: 'relative',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    background: '#181a19',
    m: '0 10px',
    '@media (max-width:640px)': {
      m: 0,
      aspectRatio: '9 / 16',
      borderRadius: '0 0 21px 21px',
    },
  },
  screenshots: {
    position: 'absolute',
    inset: 0,
  },
  chin: {
    height: '30px',
    display: 'grid',
    placeItems: 'center',
    '@media (max-width:640px)': { height: '26px' },
    '@media (min-width:641px) and (max-height:500px)': { height: '12px' },
  },
  indicator: {
    width: '4px',
    height: '4px',
    background: 'var(--accent)',
    borderRadius: '50%',
    '@media (max-width:640px)': {
      width: '32%',
      height: '3px',
      borderRadius: '8px',
      background: '#a4a69d',
    },
  },
} satisfies Record<string, SxProps<Theme>>;

interface Props {
  project: Project;
  projects: Project[];
  projectIndex: number;
  closingProgress: number;
}

export default function ProjectBrowser({
  project,
  projects,
  projectIndex,
  closingProgress,
}: Props) {
  const showClosing = closingProgress >= 0.5;

  return (
    <>
      <BrowserToolbar project={project} closing={showClosing} />
      <Box sx={styles.display}>
        <Box sx={{ ...styles.screenshots, opacity: 1 - closingProgress }}>
          <ProjectScreenshots
            projects={projects}
            projectIndex={projectIndex}
            closing={showClosing}
          />
        </Box>
        <ClosingScreen progress={closingProgress} />
      </Box>
      <Box sx={styles.chin}>
        <Box component="span" sx={styles.indicator} />
      </Box>
    </>
  );
}
