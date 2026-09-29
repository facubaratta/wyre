import Box from "@mui/material/Box";
import { useRef } from "react";
import ServiceEnergyWires from "./ServiceEnergyWires";
import type { ServiceGroupData } from "./serviceGroups";
import ServiceGroupHeading from "./ServiceGroupHeading";
import ServiceFeatureList from "./ServiceFeatureList";
import { usePreferences } from "../../../preferences/PreferencesProvider";

export const sectionSx = {
  "--section-padding": "clamp(.08rem, .25vw, .25rem)",
  "--closed-title-size": "clamp(1.75rem, 2.5vw, 2.7rem)",
  "--section-icon-gap": "clamp(.5rem, .9vw, .95rem)",
  "--closed-icon-size": "clamp(22px, 1.9vw, 30px)",
  "--bullet-icon-size": "clamp(28px, 2.2vw, 36px)",
  "--open-title-size": "clamp(1.75rem, 2.5vw, 2.7rem)",
  "--open-icon-size": "clamp(22px, 1.9vw, 30px)",
  "--open-padding": "clamp(.35rem, .7vw, .65rem)",
  "@media (max-width:640px)": {
    "--section-padding": "0px",
    "--open-padding": "clamp(.2rem, .45svh, .35rem)",
    "--closed-title-size": "clamp(1.125rem, 5.1vw, 1.5rem)",
    "--open-title-size": "clamp(1.125rem, 5.1vw, 1.5rem)",
    "--bullet-icon-size": "20px",
    "--closed-icon-size": "18px",
    "--section-icon-gap": "6px",
  },
  position: "relative",
  overflow: "hidden",
  color: "text.primary",
  borderTop: 0,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    backgroundColor: "var(--accent)",
    transformOrigin: "left",
    transition: "transform 800ms cubic-bezier(.22,1,.36,1)",
  },
};

interface Props {
  section: ServiceGroupData;
  index: number;
  active: boolean;
  onSelect: (index: number) => void;
}

export default function ServiceGroup({ section, index, active, onSelect }: Props) {
  const { reduceMotion } = usePreferences();
  const sectionRef = useRef<HTMLElement>(null);
  const open = active;
  const headingId = `wyre-section-${index}`;
  const panelId = `${headingId}-features`;

  return (
    <Box
      component="section"
      ref={sectionRef}
      aria-labelledby={headingId}
      onClick={() => onSelect(index)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(index);
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-controls={panelId}
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
        cursor: "pointer",
        py: open ? "var(--open-padding)" : "var(--section-padding)",
      }}
    >
      <ServiceEnergyWires sectionRef={sectionRef} open={open} />
      <ServiceGroupHeading
        id={headingId}
        title={section.title}
        subsections={section.subsections}
        open={open}
      />
      <ServiceFeatureList
        id={panelId}
        subsections={section.subsections}
        open={open}
      />
    </Box>
  );
}
