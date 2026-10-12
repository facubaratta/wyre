import { useId } from 'react';
import BrandGradient from './BrandGradient';
import Box from '@mui/material/Box';

export default function SectionIconGraphic() {
  const gradientId = `brand-${useId().replace(/:/g, '')}`;
  return (
    <Box
      component="svg"
      viewBox="0 0 48 48"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth="1.6"
      aria-hidden="true"
      sx={{
        display: 'block',
        width: '100%',
        height: '100%',
        flexShrink: 0,
      }}
    >
      <BrandGradient id={gradientId} />
      <circle cx="24" cy="24" r="19" />
      <ellipse cx="24" cy="24" rx="9" ry="19" />
      <path d="M5 24h38M9 13h30M9 35h30" />
    </Box>
  );
}
