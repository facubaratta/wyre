import Box from "@mui/material/Box";
import { HeroLogo } from "./logo";
import { usePreferences } from "../PreferencesProvider";

interface HeroWordmarkProps {
  showAccentHint: boolean;
  animationActive: boolean;
}

export default function HeroWordmark({
  showAccentHint,
  animationActive,
}: HeroWordmarkProps) {
  const { accent, setAccent } = usePreferences();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        lineHeight: 1,
        flex: "0 0 auto",
        fontSize: "20vw",
        "@keyframes wordmark-enter": {
          from: { opacity: 0, transform: "translateY(18px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        animation: "wordmark-enter 1100ms cubic-bezier(.22,1,.36,1) both",
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        "@media (max-width:640px)": { fontSize: "min(32vw, 18svh)", order: -1 },
        "@media (max-width:640px) and (max-height:700px)": {
          fontSize: "min(28vw, 13svh)",
        },
      }}
    >
      <HeroLogo
        style={{ fontSize: "inherit" }}
        accent={accent}
        onAccentChange={setAccent}
        showAccentHint={showAccentHint}
        animationActive={animationActive}
      />
    </Box>
  );
}
