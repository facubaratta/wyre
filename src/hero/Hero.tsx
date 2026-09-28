import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Section from "./sections/Section";
import { sections } from "./sections/sections";
import { HeroLogo } from "./logo";

const heroSx = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  minHeight: "100svh",
  p: 5,
  color: "#f2f2ee",
  "@media (max-width:640px)": {
    flexDirection: "column-reverse",
    gap: 3,
    px: 3,
    py: 5,
  },
};

const sectionsSx = {
  flex: "0 0 min(52vw, 760px)",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 0,
  "@media (max-width:640px)": {
    flex: "0 0 auto",
    width: "100%",
  },
};

const scrollStep = 0.8;
const sequenceStart = 0.25;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const update = () => {
      const viewport = Math.max(window.innerHeight, 1);
      const step = viewport * scrollStep;
      const scrollIntoSequence = window.scrollY - viewport * sequenceStart;
      const nextIndex = scrollIntoSequence < 0
        ? -1
        : Math.min(sections.length - 1, Math.floor(scrollIntoSequence / step));
      setActiveIndex(nextIndex);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <Box component="main" sx={{ minHeight: `${(sequenceStart + sections.length * scrollStep + 0.5) * 100}svh` }}>
      <Box sx={{ ...heroSx, position: "sticky", top: 0 }}>
        <Box sx={sectionsSx}>
        {sections.map((section, index) => (
          <Section key={section.title} section={section} index={index} active={activeIndex === index} />
        ))}
        </Box>
        <HeroLogo style={{ fontSize: "40vw" }} />
      </Box>
    </Box>
  );
}
