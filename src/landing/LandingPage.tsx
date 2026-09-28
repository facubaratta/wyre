import Box from "@mui/material/Box";
import useLandingSequence from "./useLandingSequence";
import { serviceGroups } from "./hero/services/serviceGroups";
import HeroSection from "./hero/HeroSection";
import Portfolio from "./portfolio/Portfolio";
import { projects } from "./portfolio/projects";
import { usePreferences } from "../preferences/PreferencesProvider";

export default function LandingPage() {
  const { reduceMotion } = usePreferences();
  const { activeIndex, heroScrollProgress, showAccentHint, minHeight, portfolioProgress, closingProgress, projectIndex, selectProject, scrollShadowOpacity } = useLandingSequence(serviceGroups.length, projects.length);

  return (
    <Box component="main" sx={{ minHeight, position: "relative" }}>
      <Box
        aria-hidden="true"
        sx={{
          position: "fixed",
          zIndex: 20,
          left: 0,
          right: 0,
          bottom: 0,
          height: "clamp(22px, 4vh, 44px)",
          pointerEvents: "none",
          opacity: scrollShadowOpacity,
          transition: "opacity 450ms ease",
          background: "linear-gradient(to bottom, transparent, rgba(var(--accent-rgb), .22))",
          filter: "drop-shadow(0 -5px 16px rgba(var(--accent-rgb), .2))",
        }}
      />
      <Box sx={{ position: reduceMotion ? "relative" : "sticky", top: 0, height: reduceMotion ? "auto" : "100svh" }}>
        <HeroSection
          activeIndex={activeIndex}
          scrollProgress={heroScrollProgress}
          showAccentHint={showAccentHint}
          exitProgress={portfolioProgress}
        />
        <Portfolio progress={portfolioProgress} closingProgress={closingProgress} projectIndex={projectIndex} onSelect={selectProject} />
      </Box>
    </Box>
  );
}
