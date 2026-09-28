import Box from "@mui/material/Box";
import { projects } from "./projects";
import ProjectBrowser from "./ProjectBrowser";
import PortfolioNavigation from "./PortfolioNavigation";
import "./portfolio.css";
import { usePreferences } from "../../preferences/PreferencesProvider";

interface Props {
  progress: number;
  projectIndex: number;
  closingProgress: number;
  onSelect: (index: number) => void;
}

export default function Portfolio({
  progress,
  closingProgress,
  projectIndex,
  onSelect,
}: Props) {
  const { reduceMotion } = usePreferences();
  const project = projects[projectIndex];
  const visible = reduceMotion || progress > 0;
  const interactive = reduceMotion || progress >= 0.5;
  const showClosing = closingProgress >= 0.5;
  const selectedIndex = showClosing ? projects.length : projectIndex;
  return (
    <Box
      component="section"
      aria-label="Portfolio"
      inert={!interactive}
      aria-hidden={!interactive}
      className={`portfolio${reduceMotion ? " portfolio--static" : ""}`}
      style={{
        pointerEvents: interactive ? "auto" : "none",
        opacity: reduceMotion ? 1 : progress,
        visibility: visible ? "visible" : "hidden",
        transform: reduceMotion
          ? undefined
          : `translateY(${(1 - progress) * 12}svh)`,
      }}
    >
      <div className="portfolio__assembly">
        <div className="portfolio__monitor">
          <ProjectBrowser project={project} projects={projects} projectIndex={projectIndex} closingProgress={closingProgress} />
        </div>
        <div className="portfolio__stand" aria-hidden="true" />
        <div className="portfolio__foot" aria-hidden="true" />
        {reduceMotion && (
          <PortfolioNavigation selectedIndex={selectedIndex} projectIndex={projectIndex} onSelect={onSelect} />
        )}
      </div>
    </Box>
  );
}
