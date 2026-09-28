import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionIconRail from "./SectionIconRail";
import type { Subsection } from "./sections";

interface Props {
  id: string;
  title: string;
  subsections: Subsection[];
  open: boolean;
  reduceMotion: boolean;
}

const rowSx = {
  display: "flex",
  alignItems: "center",
  gap: "clamp(.5rem, 1vw, 1rem)",
};

const titleSx = {
  flex: "0 0 auto",
  m: 0,
  fontSize: "var(--section-title-size)",
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-.02em",
};

export default function SectionHeading({ id, title, subsections, open, reduceMotion }: Props) {
  return (
    <Box sx={rowSx}>
      <Typography
        id={id}
        component="h2"
        sx={{
          ...titleSx,
          "--section-title-size": open ? "var(--open-title-size)" : "var(--closed-title-size)",
        }}
      >
        {title}
      </Typography>
      <SectionIconRail subsections={subsections} open={open} reduceMotion={reduceMotion} />
    </Box>
  );
}
