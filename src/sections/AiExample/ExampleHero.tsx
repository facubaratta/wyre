import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ExampleHero() {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 1.3,
          py: 0.5,
          border: '1px solid #cbc6b4',
          borderRadius: 20,
          bgcolor: '#faf9f5',
          color: '#3f3e39',
          fontSize: 'clamp(8px, 1.3cqw, 11px)',
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: '#d97757',
            flexShrink: 0,
          }}
        />
        Un estado en vivo que no significa nada
      </Box>
      <Typography
        sx={{
          my: 2.5,
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontSize: 'clamp(36px, 9cqw, 48px)',
          fontWeight: 600,
          lineHeight: 0.96,
          letterSpacing: '-.055em',
        }}
      >
        Todos los sitios web,
        <Box
          component="em"
          sx={{
            display: 'block',
            color: '#d97757',
            fontWeight: 400,
            letterSpacing: '-.03em',
          }}
        >
          edición genérica
        </Box>
      </Typography>
      <Typography
        sx={{
          maxWidth: '62ch',
          fontFamily: 'inherit',
          color: '#3f3e39',
          fontSize: 'clamp(11px, 1.7cqw, 15px)',
          lineHeight: 1.6,
        }}
      >
        Ya conocés la fórmula: Instrument Serif, cursivas al azar y el recurso
        que nunca falla — la raya.
      </Typography>
      <Typography
        sx={{
          mt: 2.5,
          fontFamily: 'inherit',
          color: '#d97757',
          fontSize: 10,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
        }}
      >
        Tres · Palabras · Cualquiera
      </Typography>
    </Box>
  );
}
