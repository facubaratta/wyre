import Box from '@mui/material/Box';
import SectionHeading from './SectionHeading';
import { memo } from 'react';
import { Typography } from '@mui/material';

const List = () => (
  <Box sx={{ mt: 3 }}>
    {[
      ['Claridad', 'Qué hacés, para quién y dónde.'],
      ['Confianza', 'Información concreta para decidir.'],
      ['Acción', 'Un próximo paso fácil de encontrar.'],
    ].map(([title, detail]) => (
      <Box key={title} sx={{ py: 1.5, borderTop: '1px solid #ffffff20' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{title}</Typography>
        <Typography sx={{ mt: 0.5, fontSize: 15, color: 'text.secondary' }}>
          {detail}
        </Typography>
      </Box>
    ))}
  </Box>
);

const Copy = () => (
  <Box>
    <Typography
      sx={{
        fontSize: { xs: 26, sm: 32, lg: 36 },
        lineHeight: 1.3,
        fontWeight: 500,
        letterSpacing: '-.035em',
        maxWidth: '24ch',
      }}
    >
      Tu cliente necesita entender
      <Box component="span" sx={{ display: 'block', color: 'var(--accent)' }}>
        qué ofrecés y cómo contratarte.
      </Box>
    </Typography>
    <Typography
      sx={{
        mt: 2.5,
        maxWidth: '42ch',
        fontSize: { xs: 16, sm: 18 },
        lineHeight: 1.7,
      }}
    >
      Cada decisión tiene un propósito: explicar tu servicio, dar motivos para
      confiar y facilitar el contacto.
    </Typography>
  </Box>
);

function HumanDecisions() {
  return (
    <Box
      component="section"
      id="decisiones-humanas"
      aria-labelledby="human-heading"
      sx={{
        position: 'relative',
        px: { xs: '6vw', sm: '7vw' },
        py: { xs: 7, sm: 12 },
        scrollMarginTop: 'var(--header-height, 100px)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 0, sm: 20 },
        }}
      >
        <Box
          sx={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          <SectionHeading id="human-heading" icon="brain">
            Decisiones Humanas
          </SectionHeading>
          <Copy />
        </Box>
        <List />
      </Box>
    </Box>
  );
}

export default memo(HumanDecisions);
