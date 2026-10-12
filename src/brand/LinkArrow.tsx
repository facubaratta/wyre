import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

export default function LinkArrow({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      sx={[
        { width: '1em', height: '1em', flexShrink: 0, verticalAlign: 'middle' },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <path d="M5 15 15 5M5 5h10v10" />
    </Box>
  );
}
