import Box from "@mui/material/Box";
import SectionIcon from "./SectionIcon";
import type { Subsection } from "./sections";

const transition =
  "opacity 500ms ease, transform 650ms cubic-bezier(.2,.7,.2,1)";

const getStaggerDelay = (index: number, base = 180, step = 110) =>
  base + index * step;

interface Props {
  subsection: Subsection;
  index: number;
  open: boolean;
  reduceMotion: boolean;
}

const itemSx = {
  display: "flex",
  alignItems: "center",
  gap: "clamp(.55rem, .9vw, .9rem)",
  color: "rgba(232, 246, 255, .76)",
  fontSize: "clamp(1.05rem, 1.65vw, 1.55rem)",
  lineHeight: 1.55,
};

export default function SubsectionItem({
  subsection,
  index,
  open,
  reduceMotion,
}: Props) {
  const delay = getStaggerDelay(index);

  return (
    <Box
      component="li"
      sx={{
        ...itemSx,
        transform: open ? "translateY(0)" : "translateY(12px)",
        opacity: open ? 1 : 0,
        transition: reduceMotion ? "none" : transition,
        transitionDelay: open && !reduceMotion ? `${delay}ms` : "0ms",
      }}
    >
      <SectionIcon
        svg={subsection.icon}
        size="var(--bullet-icon-size)"
        visible={open}
        reduceMotion={reduceMotion}
        delay={delay}
        direction="up"
      />
      {subsection.title}
    </Box>
  );
}
