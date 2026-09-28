import Box from "@mui/material/Box";
import SectionIcon from "./SectionIcon";
import type { Subsection } from "./sections";

interface Props {
  subsections: Subsection[];
  open: boolean;
  reduceMotion: boolean;
}

const railSx = {
  display: "flex",
  alignItems: "center",
  gap: "var(--section-icon-gap)",
  ml: "auto",
};

export default function SectionIconRail({ subsections, open, reduceMotion }: Props) {
  return (
    <Box sx={{ ...railSx, "--section-icon-size": open ? "var(--open-icon-size)" : "var(--closed-icon-size)" }}>
      {subsections.map((subsection, index) => (
        <SectionIcon
          key={subsection.title}
          svg={subsection.icon}
          size="var(--section-icon-size)"
          visible={!open}
          reduceMotion={reduceMotion}
          delay={index * 70}
        />
      ))}
    </Box>
  );
}
