import Box from "@mui/material/Box";
import ServiceFeatureItem from "./ServiceFeatureItem";
import type { ServiceFeature } from "./serviceGroups";
import { usePreferences } from "../../PreferencesProvider";

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
          component="div"
          sx={{
            position: "relative",
            "--feature-row-height": "clamp(2.7rem, 4vw, 3.5rem)",
            "--feature-row-gap": "clamp(.9rem, 1.25vw, 1.25rem)",
            pt: 1.5,
            pl: "clamp(28px, 2.8vw, 40px)",
            "@media (max-width:640px)": {
              pt: "8px",
              pl: "24px",
              "--feature-row-gap": "16px",
            },
          }}
        >
          <Box component="ul" sx={{ position: "relative", listStyle: "none", p: 0, m: 0, display: "grid", rowGap: "var(--feature-row-gap)" }}>
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
    </Box>
  );
}
