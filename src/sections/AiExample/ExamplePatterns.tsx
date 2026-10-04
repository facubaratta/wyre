import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ExamplePatterns() {
  return (
    <Box
      component="ol"
      sx={{ listStyle: 'none', m: 0, p: 0, textAlign: 'left' }}
    >
      {[
        'Siempre los números que empiezan con cero',
        'Porque si la IA no tiene dirección',
        'Recae en los patrones más usados',
      ].map((text, index) => (
        <Box
          component="li"
          key={text}
          sx={{
            display: 'grid',
            gridTemplateColumns: '24px minmax(0, 1fr)',
            gap: 1.5,
            py: 1.5,
            borderTop: '1px solid #cbc6b4',
          }}
        >
          <Typography
            component="span"
            sx={{
              display: 'block',
              fontFamily: 'inherit',
              fontSize: 12,
              color: '#d97757',
            }}
          >
            0{index + 1}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'inherit',
              fontSize: 'clamp(10px, 2.2cqw, 12px)',
              lineHeight: 1.6,
              color: '#3f3e39',
            }}
          >
            {text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
