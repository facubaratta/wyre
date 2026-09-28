import Box from "@mui/material/Box";
import type { Section as SectionData } from "./sections";
import SectionHeading from "./SectionHeading";
import SubsectionList from "./SubsectionList";
import useReducedMotion from "./useReducedMotion";

export const sectionSx = {
  "--section-padding": "clamp(.65rem, 1.1vw, 1.1rem)",
  "--closed-title-size": "clamp(1.1rem, 1.8vw, 1.55rem)",
  "--section-row-gap": "clamp(.5rem, 1vw, 1rem)",
  "--section-icon-gap": "clamp(.35rem, .65vw, .65rem)",
  "--closed-icon-size": "clamp(25px, 3vw, 38px)",
  "--subsection-gap": "clamp(.5rem, .8vw, .8rem)",
  "--subsection-icon-gap": "clamp(.55rem, .9vw, .9rem)",
  "--subsection-size": "clamp(1.05rem, 1.65vw, 1.55rem)",
  "--bullet-icon-size": "clamp(25px, 3vw, 37px)",
  "--open-title-size": "clamp(1.2rem, 2.1vw, 2rem)",
  "--open-icon-size": "clamp(30px, 4vw, 46px)",
  "--open-padding": "clamp(1rem, 1.8vw, 1.6rem)",
  position: "relative",
  overflow: "hidden",
  color: "#f2f2ee",
  borderTop: "1px solid rgba(141, 216, 255, .24)",
};

interface Props {
  section: SectionData;
  index: number;
  active: boolean;
}

export default function Section({ section, index, active }: Props) {
  const reduceMotion = useReducedMotion();
  const open = active || reduceMotion;
  const headingId = `wyre-section-${index}`;

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      aria-expanded={open}
      sx={{
        ...sectionSx,
        py: open ? "var(--open-padding)" : "var(--section-padding)",
      }}
    >
      <SectionHeading
        id={headingId}
        title={section.title}
        subsections={section.subsections}
        open={open}
        reduceMotion={reduceMotion}
      />
      <SubsectionList
        subsections={section.subsections}
        open={open}
        reduceMotion={reduceMotion}
      />
    </Box>
  );
}
