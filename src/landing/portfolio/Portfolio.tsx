import Box from "@mui/material/Box";
import { projects } from "./projects";
import ProjectBrowser from "./ProjectBrowser";
import PortfolioNavigation from "./PortfolioNavigation";
import { hiddenOnSmallOrShort, styles } from "./styles";
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
      sx={{ ...styles.portfolio, ...(reduceMotion ? { position: 'relative', minHeight: '100svh' } : {}), ...styles.focusable }}
      style={{
        pointerEvents: interactive ? "auto" : "none",
        opacity: reduceMotion ? 1 : progress,
        visibility: visible ? "visible" : "hidden",
        transform: reduceMotion
          ? undefined
          : `translateY(${(1 - progress) * 12}svh)`,
      }}
    >
      <Box sx={styles.assembly}>
        <Box sx={styles.monitor}>
          <ProjectBrowser project={project} projects={projects} projectIndex={projectIndex} closingProgress={closingProgress} loadImages={visible} />
        </Box>
        <Box aria-hidden="true" sx={{ ...styles.stand, ...hiddenOnSmallOrShort }} />
        <Box aria-hidden="true" sx={{ ...styles.foot, ...hiddenOnSmallOrShort }} />
        {reduceMotion && (
          <PortfolioNavigation selectedIndex={selectedIndex} projectIndex={projectIndex} onSelect={onSelect} />
        )}
      </Box>
    </Box>
  );
}
