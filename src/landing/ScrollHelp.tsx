import { Box, IconButton } from "@mui/material";

const Shadow = ({ scrollShadowOpacity }: { scrollShadowOpacity: number }) => (
  <Box
    aria-hidden="true"
    sx={{
      position: "fixed",
      zIndex: 20,
      left: 0,
      right: 0,
      bottom: 0,
      height: "clamp(22px, 4vh, 44px)",
      pointerEvents: "none",
      opacity: scrollShadowOpacity,
      transition: "opacity 450ms ease",
      background:
        "linear-gradient(to bottom, transparent, rgba(var(--accent-rgb), .22))",
      filter: "drop-shadow(0 -5px 16px rgba(var(--accent-rgb), .2))",
    }}
  />
);

const Arrow = ({ scrollShadowOpacity, onClick }: { scrollShadowOpacity: number; onClick: () => void }) => (
  <IconButton
    aria-label="Scroll to the next section"
    onClick={onClick}
    sx={{
      position: "fixed",
      zIndex: 1300,
      left: "50%",
      bottom: "clamp(25px, 4.5vh, 48px)",
      width: "clamp(40px, 6vw, 64px)",
      height: "clamp(40px, 6vw, 64px)",
      transform: "translateX(-50%)",
      opacity: scrollShadowOpacity,
      transition: "opacity 450ms ease",
      color: "rgba(var(--accent-rgb), .85)",
      "&::before": {
        content: '""',
        width: "clamp(15px, 2.2vw, 24px)",
        height: "clamp(15px, 2.2vw, 24px)",
        borderRight: "3px solid currentColor",
        borderBottom: "3px solid currentColor",
        transform: "translateY(-4px) rotate(45deg)",
      },
    }}
  />
);

const ScrollHelp = ({
  scrollShadowOpacity,
  onNext,
}: {
  scrollShadowOpacity: number;
  onNext: () => void;
}) => (
  <>
    <Shadow scrollShadowOpacity={scrollShadowOpacity} />
    <Arrow scrollShadowOpacity={scrollShadowOpacity} onClick={onNext} />
  </>
);

export default ScrollHelp;
