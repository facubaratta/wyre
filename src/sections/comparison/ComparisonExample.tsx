import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ComparisonExample({ generic }: { generic: boolean }) {
  return (
    <Box
      sx={{
        height: '100%',
        p: 'clamp(16px, 6cqw, 48px)',
        bgcolor: generic ? '#f5f4ef' : '#20382d',
        color: generic ? '#242921' : '#f2eddf',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 'clamp(16px, 4cqw, 22px)',
            fontWeight: 700,
            letterSpacing: '-.06em',
          }}
        >
          {generic ? 'wyre✳' : 'OLIVA /'}
        </Typography>
        <Typography sx={{ fontSize: 10, letterSpacing: '.1em' }}>
          {generic ? 'INNOVATIVE SOLUTIONS' : 'COCINA DE ESTACIÓN'}
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 650, my: 4 }}>
        <Typography
          sx={{
            mb: 2,
            fontSize: 11,
            letterSpacing: '.13em',
            color: generic ? '#ed572f' : '#cfb88d',
          }}
        >
          {generic
            ? 'THOUGHTFULLY CRAFTED · FUTURE-READY'
            : 'PALERMO, BUENOS AIRES'}
        </Typography>
        <Typography
          sx={{
            fontSize: 'clamp(23px, 8cqw, 62px)',
            lineHeight: 1.05,
            letterSpacing: '-.05em',
            fontWeight: 450,
            fontFamily: generic ? 'inherit' : 'Georgia, serif',
          }}
        >
          {generic
            ? 'Elevate your digital presence.'
            : 'La mesa está lista. Solo faltás vos.'}
        </Typography>
        <Typography
          sx={{
            mt: 3,
            maxWidth: 470,
            fontSize: 'clamp(12px, 2.8cqw, 17px)',
            lineHeight: 1.6,
            color: generic ? '#6e7368' : '#c5ccbd',
          }}
        >
          {generic
            ? 'Innovative solutions that empower your business, inspire your audience, and transform possibilities into extraordinary experiences.'
            : 'Productos de estación, platos para compartir y un lugar para quedarte un rato más.'}
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: 'inline-block',
            px: 3,
            py: 1.5,
            borderRadius: generic ? 10 : 0,
            bgcolor: generic ? '#ed572f' : '#cfb88d',
            color: generic ? '#fff' : '#20382d',
            fontSize: 12,
          }}
        >
          {generic ? 'Unlock your potential ↗' : 'Reservá tu mesa ↗'}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          borderTop: '1px solid',
          borderColor: generic ? '#cfd2c5' : '#ffffff30',
          pt: 2,
        }}
      >
        {(generic
          ? ['✧ Human-centered', '✧ Future-ready']
          : ['Mar–Dom · 12 a 23 h', 'Gorriti 4800']
        ).map((text) => (
          <Typography key={text} sx={{ fontSize: 11 }}>
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
