import Box from "@mui/material/Box";
import { useLayoutEffect, useRef } from "react";
import ServiceHighlights from "./services/ServiceHighlights";
import HeroWordmark from "./HeroWordmark";
import HeroContact from "./HeroContact";
import { usePreferences } from "../PreferencesProvider";

const heroSx = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "safe center",
  justifyContent: "space-between",
  gap: "5vw",
  minHeight: "100svh",
  px: "7vw",
  py: "8vh",
  color: "text.primary",
  ".hero-contact": { marginTop: "3vh" },
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "safe center",
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
  scrollProgress: number;
  showAccentHint: boolean;
  exitProgress: number;
  onSelectService: (index: number) => void;
}

export default function HeroSection({ activeIndex, scrollProgress, showAccentHint, exitProgress, onSelectService }: HeroSectionProps) {
  const { reduceMotion } = usePreferences();
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(scrollProgress);

  useLayoutEffect(() => {
    progress.current = scrollProgress;
    const hero = root.current;
    if (hero && !reduceMotion) {
      hero.scrollTop = Math.max(0, hero.scrollHeight - hero.clientHeight) * scrollProgress;
    }
  }, [scrollProgress, reduceMotion]);

  useLayoutEffect(() => {
    const hero = root.current;
    if (!hero || reduceMotion) {
      if (hero) hero.scrollTop = 0;
      return;
    }
    const sync = () => {
      hero.scrollTop = Math.max(0, hero.scrollHeight - hero.clientHeight) * progress.current;
    };
    // Expansion animations and viewport changes can change the overflow between page scroll events.
    const observer = new ResizeObserver(sync);
    observer.observe(hero);
    Array.from(hero.children).forEach(child => observer.observe(child));
    sync();
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <Box ref={root} inert={!reduceMotion && exitProgress >= .5} aria-hidden={!reduceMotion && exitProgress >= .5}
      sx={{ ...heroSx, height: reduceMotion ? "auto" : "100svh",
        overflow: reduceMotion ? "visible" : "hidden",
        opacity: reduceMotion ? 1 : 1 - exitProgress,
        visibility: !reduceMotion && exitProgress === 1 ? "hidden" : "visible",
        transform: reduceMotion ? undefined : `translateY(${-exitProgress * 8}svh)` }}>
      <HeroContact />
      <ServiceHighlights activeIndex={activeIndex} onSelect={onSelectService} />
      <HeroWordmark showAccentHint={showAccentHint} animationActive={reduceMotion || exitProgress < 1} />
    </Box>
  );
}
