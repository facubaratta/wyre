import Box from "@mui/material/Box";
import ServiceIcon from "./ServiceIcon";
import type { ServiceFeature } from "./serviceGroups";
import { usePreferences } from "../../../preferences/PreferencesProvider";

interface Props {
  subsections: ServiceFeature[];
  open: boolean;
}

const railSx = {
  display: "flex",
  alignItems: "center",
  gap: "var(--section-icon-gap)",
  ml: "auto",
  flexShrink: 0,
};

export default function ServiceIconRail({ subsections, open }: Props) {
  const { reduceMotion } = usePreferences();
  return (
    <Box sx={{ ...railSx, ...(open ? { width: 0, overflow: "hidden", ml: 0 } : {}), "--section-icon-size": open ? "var(--open-icon-size)" : "var(--closed-icon-size)" }}>
      {subsections.map((subsection, index) => (
        <ServiceIcon
          key={subsection.title}
          svg={subsection.icon}
          size="var(--section-icon-size)"
          visible={!open}
          delay={index * 70}
        />
      ))}
    </Box>
  );
}
