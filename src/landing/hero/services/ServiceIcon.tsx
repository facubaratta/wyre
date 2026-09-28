import Box from "@mui/material/Box";
import { usePreferences } from "../../../preferences/PreferencesProvider";

interface Props {
  svg: string;
  size: string;
  visible: boolean;
  delay?: number;
  direction?: "up" | "down";
}

const transition = "opacity 500ms ease, transform 650ms cubic-bezier(.2,.7,.2,1)";

export default function ServiceIcon({
  svg,
  size,
  visible,
  delay = 0,
  direction = "down",
}: Props) {
  const { reduceMotion } = usePreferences();
  const offset = direction === "down" ? 8 : -8;

  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        display: "block",
        color: "var(--accent)",
        width: size,
        height: size,
        flex: "0 0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : `translateY(${offset}px) scale(.8)`,
        transition: reduceMotion ? "none" : transition,
        transitionDelay: visible && !reduceMotion ? `${delay}ms` : "0ms",
        "& svg": { display: "block", width: "100%", height: "100%" },
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
