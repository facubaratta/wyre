import Box from "@mui/material/Box";
import type { ServiceGroupData } from "./serviceGroups";
import ServiceGroupHeading from "./ServiceGroupHeading";
import ServiceFeatureList from "./ServiceFeatureList";
import { usePreferences } from "../../../preferences/PreferencesProvider";

export const sectionSx = {
  "--section-padding": "clamp(1.4rem, 2.8vw, 2.8rem)",
  "--closed-title-size": "clamp(1.75rem, 2.5vw, 2.7rem)",
  "--section-icon-gap": "clamp(.5rem, .9vw, .95rem)",
  "--closed-icon-size": "clamp(22px, 1.9vw, 30px)",
  "--bullet-icon-size": "clamp(28px, 2.2vw, 36px)",
  "--open-title-size": "clamp(1.75rem, 2.5vw, 2.7rem)",
  "--open-icon-size": "clamp(22px, 1.9vw, 30px)",
  "--open-padding": "clamp(1.4rem, 2.8vw, 2.8rem)",
  "@media (max-width:640px)": {
    "--section-padding": "clamp(.9rem, 2svh, 1.2rem)",
    "--open-padding": "clamp(.9rem, 2svh, 1.2rem)",
    "--closed-title-size": "clamp(1.35rem, 5.4vw, 1.5rem)",
    "--open-title-size": "clamp(1.35rem, 5.4vw, 1.5rem)",
    "--bullet-icon-size": "22px",
  },
  position: "relative",
  overflow: "hidden",
  color: "text.primary",
  borderTop: "1px solid rgba(235,232,222,.18)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    backgroundColor: "var(--accent)",
    transformOrigin: "left",
    transition: "transform 800ms cubic-bezier(.22,1,.36,1)",
  },
};

interface Props {
  section: ServiceGroupData;
  index: number;
  active: boolean;
}

export default function ServiceGroup({ section, index, active }: Props) {
  const { reduceMotion } = usePreferences();
  const open = active || reduceMotion;
  const headingId = `wyre-section-${index}`;

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      aria-expanded={open}
      sx={{
        ...sectionSx,
        "&::before": {
          ...sectionSx["&::before"],
          transform: open ? "scaleX(1)" : "scaleX(0)",
          transition: reduceMotion ? "none" : sectionSx["&::before"].transition,
        },
        "& h2": {
          color: "text.primary",
          transition: reduceMotion ? "none" : "color 450ms ease",
        },
        "&:hover h2": { color: "text.primary" },
        py: open ? "var(--open-padding)" : "var(--section-padding)",
      }}
    >
      <ServiceGroupHeading
        id={headingId}
        title={section.title}
        subsections={section.subsections}
        open={open}
      />
      <ServiceFeatureList
        subsections={section.subsections}
        open={open}
      />
    </Box>
  );
}
