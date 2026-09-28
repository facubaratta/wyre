import ClosingScreen from './ClosingScreen';
import BrowserToolbar from './BrowserToolbar';
import ProjectScreenshots from './ProjectScreenshots';
import type { Project } from './projects';

interface Props {
  project: Project;
  projects: Project[];
  projectIndex: number;
  closingProgress: number;
}

export default function ProjectBrowser({ project, projects, projectIndex, closingProgress }: Props) {
  const showClosing = closingProgress >= 0.5;

  return (
    <>
      <BrowserToolbar project={project} closing={showClosing} />
      <div className="portfolio__display">
        <div className="portfolio__screenshots" style={{ opacity: 1 - closingProgress }}>
          <ProjectScreenshots projects={projects} projectIndex={projectIndex} closing={showClosing} />
        </div>
        <ClosingScreen progress={closingProgress} />
      </div>
      <div className="portfolio__chin"><span /></div>
    </>
  );
}
