import Box from "@mui/material/Box";
import ServiceHighlights from "./services/ServiceHighlights";
import HeroWordmark from "./HeroWordmark";
import HeroContact from "./HeroContact";
import { usePreferences } from "../../preferences/PreferencesProvider";

const heroSx = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "5vw",
  minHeight: "100svh",
  px: "7vw",
  py: "8vh",
  color: "text.primary",
  ".hero-contact": { marginTop: "3vh" },
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    gap: "clamp(20px, 4svh, 36px)",
    px: "8vw",
    pt: "calc(122px + 6svh)",
    pb: "3svh",
    ".hero-contact": {
      alignSelf: "stretch",
      marginTop: "clamp(12px, 2svh, 22px)",
    },
  },
} as const;

interface HeroSectionProps {
  activeIndex: number;
  showAccentHint: boolean;
  exitProgress: number;
}

export default function HeroSection({ activeIndex, showAccentHint, exitProgress }: HeroSectionProps) {
  const { reduceMotion } = usePreferences();
  return (
    <Box inert={!reduceMotion && exitProgress >= .5} aria-hidden={!reduceMotion && exitProgress >= .5}
      sx={{ ...heroSx, opacity: reduceMotion ? 1 : 1 - exitProgress,
        visibility: !reduceMotion && exitProgress === 1 ? "hidden" : "visible",
        transform: reduceMotion ? undefined : `translateY(${-exitProgress * 8}svh)` }}>
      <HeroContact />
      <ServiceHighlights activeIndex={activeIndex} />
      <HeroWordmark showAccentHint={showAccentHint} />
    </Box>
  );
}
