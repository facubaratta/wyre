import Box from "@mui/material/Box";
import useLandingSequence from "./useLandingSequence";
import { serviceGroups } from "./hero/services/serviceGroups";
import HeroSection from "./hero/HeroSection";
import Portfolio from "./portfolio/Portfolio";
import { projects } from "./portfolio/projects";
import { usePreferences } from "../preferences/PreferencesProvider";
import ScrollHelp from "./ScrollHelp";

export default function LandingPage() {
  const { reduceMotion } = usePreferences();
  const {
    activeIndex,
    heroScrollProgress,
    showAccentHint,
    minHeight,
    portfolioProgress,
    closingProgress,
    projectIndex,
    selectProject,
    scrollShadowOpacity,
    nextCheckpoint,
  } = useLandingSequence(serviceGroups.length, projects.length);

  return (
    <Box component="main" sx={{ minHeight, position: "relative" }}>
      <Box
        sx={{
          position: reduceMotion ? "relative" : "sticky",
          top: 0,
          height: reduceMotion ? "auto" : "100svh",
        }}
      >
        <ScrollHelp scrollShadowOpacity={scrollShadowOpacity} onNext={nextCheckpoint} />
        <HeroSection
          activeIndex={activeIndex}
          scrollProgress={heroScrollProgress}
          showAccentHint={showAccentHint}
          exitProgress={portfolioProgress}
        />
        <Portfolio
          progress={portfolioProgress}
          closingProgress={closingProgress}
          projectIndex={projectIndex}
          onSelect={selectProject}
        />
      </Box>
    </Box>
  );
}
