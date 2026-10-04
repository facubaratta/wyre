import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HumanDecisionsCopy() {
  return (
    <Box sx={{ minWidth: 0, maxWidth: 500 }}>
      <Typography
        sx={{
          fontSize: { xs: 26, sm: 32, lg: 36 },
          lineHeight: 1.3,
          fontWeight: 500,
          letterSpacing: '-.035em',
          maxWidth: '24ch',
        }}
      >
        Implementación rápida.
        <Box
          component="span"
          sx={{
            display: 'block',
            color: 'var(--accent)',
          }}
        >
          Dirección humana.
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
        Utilizamos la inteligencia artificial solamente para implementar nuestra
        dirección profesional en cada paso del proceso.
      </Typography>
      <Typography
        sx={{
          mt: 2,
          maxWidth: '42ch',
          fontSize: { xs: 16, sm: 18 },
          lineHeight: 1.7,
        }}
      >
        Diseñamos para tu industria y tus clientes. Organizamos el diseño
        alrededor de tu marca, sin plantillas o moldes repetidos.
      </Typography>
    </Box>
  );
}
