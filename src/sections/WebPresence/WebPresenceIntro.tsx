import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function WebPresenceIntro() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
        mt: { xs: 4, sm: 5 },
      }}
    >
      <Typography
        component="p"
        sx={{
          width: '100%',
          maxWidth: { xs: '30ch', md: 'none' },
          fontSize: { xs: 23, sm: 30 },
          lineHeight: 1.4,
          letterSpacing: '-.025em',
        }}
      >
        Una solución para lo que tu negocio necesita hoy.
        <Box component="span" sx={{ color: 'text.secondary' }}>
          {' '}
          Y para lo que puede necesitar mañana.
        </Box>
      </Typography>
      <Typography
        component="p"
        sx={{
          width: '100%',
          maxWidth: { xs: '48ch', md: 'none' },
          fontSize: { xs: 15, sm: 16 },
          lineHeight: 1.75,
          color: 'text.secondary',
        }}
      >
        Definimos juntos el alcance, las prioridades y el presupuesto. Si tu
        idea no encaja en estas categorías, también podemos construirla.
      </Typography>
    </Box>
  );
}
