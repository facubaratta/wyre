import Box from "@mui/material/Box";
import ServiceFeatureItem from "./ServiceFeatureItem";
import type { ServiceFeature } from "./serviceGroups";
import { usePreferences } from "../../../preferences/PreferencesProvider";

interface Props {
  id: string;
  subsections: ServiceFeature[];
  open: boolean;
}

export default function ServiceFeatureList({ id, subsections, open }: Props) {
  const { reduceMotion } = usePreferences();
  return (
    <Box
      id={id}
      aria-hidden={!open}
      sx={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        opacity: open ? 1 : 0,
        transition: reduceMotion ? "none" : "grid-template-rows 700ms cubic-bezier(.22,1,.36,1), opacity 350ms ease",
      }}
    >
      <Box sx={{ minHeight: 0, overflow: "hidden" }}>
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            pt: 3,
            display: "grid",
            rowGap: "clamp(.9rem, 1.25vw, 1.25rem)",
          }}
        >
          {subsections.map((subsection, index) => (
            <ServiceFeatureItem
              key={subsection.title}
              subsection={subsection}
              index={index}
              open={open}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
