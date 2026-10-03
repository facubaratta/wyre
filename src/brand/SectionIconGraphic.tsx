import Box from '@mui/material/Box';

export type SectionIcon = 'globe' | 'brain' | 'growth';

export default function SectionIconGraphic({ icon }: { icon: SectionIcon }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      sx={{
        display: 'block',
        width: '100%',
        height: '100%',
        flexShrink: 0,
        color: 'var(--accent)',
      }}
    >
      {icon === 'globe' && (
        <>
          <circle cx="24" cy="24" r="19" />
          <ellipse cx="24" cy="24" rx="9" ry="19" />
          <path d="M5 24h38M9 13h30M9 35h30" />
        </>
      )}
      {icon === 'brain' && (
        <>
          <path d="M24 9c-4-6-12-3-12 3-6 0-9 7-5 12-4 6 0 12 5 12 0 7 8 10 12 4V9Zm0 0c4-6 12-3 12 3 6 0 9 7 5 12 4 6 0 12-5 12 0 7-8 10-12 4V9Z" />
          <path d="M12 12c0 5 3 7 6 7M7 24c5-2 9 0 10 4M12 36c0-4 3-6 7-6M36 12c0 5-3 7-6 7M41 24c-5-2-9 0-10 4M36 36c0-4-3-6-7-6" />
        </>
      )}
      {icon === 'growth' && (
        <>
          <path d="M6 7v34h36M12 32l10-11 8 5 12-17M32 9h10v10" />
        </>
      )}
    </Box>
  );
}
