import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        width: '100%',
        zoom: 0.8,
        maxWidth: 520,
        overflow: 'hidden',
        border: '1px solid #ebe8de33',
        borderRadius: 2,
        containerType: 'inline-size',
        boxShadow: '0 20px 60px #0003',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 2,
          py: 1.25,
          bgcolor: '#252826',
          borderBottom: '1px solid #ebe8de22',
        }}
      >
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: '#ebe8de55',
            }}
          />
        ))}
        <Typography sx={{ ml: 1, fontSize: 10, color: 'text.secondary' }}>
          sitio-generico.demo
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
