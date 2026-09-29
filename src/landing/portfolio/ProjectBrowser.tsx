import ClosingScreen from './ClosingScreen';
import BrowserToolbar from './BrowserToolbar';
import ProjectScreenshots from './ProjectScreenshots';
import type { Project } from './projects';
import { styles } from './styles';

interface Props {
  project: Project;
  projects: Project[];
  projectIndex: number;
  closingProgress: number;
  loadImages: boolean;
}

export default function ProjectBrowser({ project, projects, projectIndex, closingProgress, loadImages }: Props) {
  const showClosing = closingProgress >= 0.5;

  return (
    <>
      <BrowserToolbar project={project} closing={showClosing} />
      <Box sx={styles.display}>
        <Box sx={{ ...styles.screenshots, opacity: 1 - closingProgress }}>
          <ProjectScreenshots projects={projects} projectIndex={projectIndex} closing={showClosing} enabled={loadImages} />
        </Box>
        <ClosingScreen progress={closingProgress} />
      </Box>
      <Box sx={styles.chin}><span /></Box>
    </>
  );
}
import Box from '@mui/material/Box';
