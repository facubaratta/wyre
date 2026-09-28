import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ServiceIconRail from "./ServiceIconRail";
import type { ServiceFeature } from "./serviceGroups";

interface Props {
  id: string;
  panelId: string;
  title: string;
  subsections: ServiceFeature[];
  open: boolean;
  onSelect: () => void;
}

const rowSx = {
  display: "flex",
  alignItems: "center",
  gap: "clamp(.5rem, 1vw, 1rem)",
  width: "100%",
  minHeight: "44px",
  padding: 0,
  border: 0,
  background: "transparent",
  color: "inherit",
  font: "inherit",
  letterSpacing: "inherit",
  textAlign: "left",
  cursor: "pointer",
  "&[aria-disabled=true]": { cursor: "default" },
  "&:hover": { color: "var(--accent-light)" },
  "&:focus-visible": { outline: "2px solid var(--accent)", outlineOffset: "4px" },
};

const titleSx = {
  flex: "1 1 auto",
  minWidth: 0,
  m: 0,
  fontSize: "var(--section-title-size)",
  fontWeight: 500,
  lineHeight: 1.3,
  letterSpacing: "-.015em",
};

export default function ServiceGroupHeading({ id, panelId, title, subsections, open, onSelect }: Props) {
  return (
    <Typography component="h2" sx={{ ...titleSx,
      "--section-title-size": open ? "var(--open-title-size)" : "var(--closed-title-size)" }}>
      <Box component="button" id={id} type="button" aria-expanded={open} aria-controls={panelId}
        aria-disabled={open} onClick={() => { if (!open) onSelect(); }} sx={rowSx}>
        <Box component="span" sx={{ flex: "1 1 auto", minWidth: 0 }}>{title}</Box>
        <ServiceIconRail subsections={subsections} open={open} />
      </Box>
    </Typography>
  );
}
