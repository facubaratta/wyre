import Box from "@mui/material/Box";
import SubsectionItem from "./SubsectionItem";
import type { Subsection } from "./sections";

interface Props {
  subsections: Subsection[];
  open: boolean;
  reduceMotion: boolean;
}

const listSx = {
  listStyle: "none",
  p: 0,
  m: 0,
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: "clamp(.5rem, .8vw, .8rem)",
  overflow: "hidden",
};

export default function SubsectionList({ subsections, open, reduceMotion }: Props) {
  return (
    <Box
      component="ul"
      sx={{
        ...listSx,
        mt: open ? 2.5 : 0,
        maxHeight: open ? 360 : 0,
        opacity: open ? 1 : 0,
        transition: reduceMotion ? "none" : "max-height 700ms cubic-bezier(.2,.7,.2,1), opacity 350ms ease, margin 500ms ease",
      }}
    >
      {subsections.map((subsection, index) => (
        <SubsectionItem
          key={subsection.title}
          subsection={subsection}
          index={index}
          open={open}
          reduceMotion={reduceMotion}
        />
      ))}
    </Box>
  );
}
