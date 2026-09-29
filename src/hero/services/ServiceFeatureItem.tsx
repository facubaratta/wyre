import Box from "@mui/material/Box";
import ServiceIcon from "./ServiceIcon";
import type { ServiceFeature } from "./serviceGroups";
import { usePreferences } from "../../PreferencesProvider";

const transition =
  "opacity 500ms ease, transform 650ms cubic-bezier(.2,.7,.2,1)";

const getStaggerDelay = (index: number, base = 100, step = 65) =>
  base + index * step;

interface Props {
  subsection: ServiceFeature;
  index: number;
  open: boolean;
}

const itemSx = {
  display: "grid",
  gridTemplateColumns: "var(--bullet-icon-size) minmax(0, 1fr)",
  alignItems: "start",
  gap: "clamp(.8rem, 1.1vw, 1.1rem)",
  color: "#ebe8de",
  fontSize: "clamp(1.5rem, 1.9vw, 1.8rem)",
  lineHeight: 1.55,
  fontWeight: 400,
  "& > span:first-of-type": { mt: ".2em" },
  "@media (max-width:640px)": {
    fontSize: "clamp(1.125rem, 4.6vw, 1.25rem)",
    lineHeight: 1.45,
    gap: "10px",
    "& > span:first-of-type": { mt: ".16em" },
  },
};

export default function ServiceFeatureItem({
  subsection,
  index,
  open,
}: Props) {
  const { reduceMotion } = usePreferences();
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
      <ServiceIcon
        wireTarget
        svg={subsection.icon}
        size="var(--bullet-icon-size)"
        visible={open}
        delay={delay}
        direction="up"
      />
      <Box component="span" sx={{ minWidth: 0 }}>{subsection.title}</Box>
    </Box>
  );
}
