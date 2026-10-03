import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeading from './SectionHeading';
import AiComparison from './comparison/AiComparison';

const steps = [
  'Entendemos tu negocio',
  'Diseñamos con intención',
  'Construimos a medida',
];

export default function HumanDecisions() {
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
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <SectionHeading id="human-heading" icon="brain">
          Decisiones Humanas
        </SectionHeading>
        <Box sx={{ mt: { xs: 4, sm: 6 }, mb: 4, maxWidth: 800 }}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 32, sm: 48 },
              lineHeight: 1.12,
              fontWeight: 500,
              letterSpacing: '-.045em',
            }}
          >
            La tecnología acelera.
            <Box
              component="span"
              sx={{ color: 'primary.main', display: 'block' }}
            >
              El criterio es humano.
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: 16, sm: 19 },
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            Utilizamos inteligencia artificial para una implementación más
            rápida, sin sacrificar la intuición, planificación, gusto o tacto
            humano.
          </Typography>
        </Box>
        <Box
          component="ul"
          sx={{ listStyle: 'none', m: 0, p: 0, mb: 5, maxWidth: 800 }}
        >
          {steps.map((step) => (
            <Box
              component="li"
              key={step}
              sx={{ py: 2, borderTop: '1px solid rgba(235,232,222,.22)' }}
            >
              <Typography sx={{ fontSize: { xs: 18, sm: 22 } }}>
                {step}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ mb: 4, maxWidth: 800 }}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 24, sm: 30 },
              fontWeight: 500,
              letterSpacing: '-.025em',
            }}
          >
            Diseñado para tu industria.
          </Typography>
          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: 16, sm: 19 },
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            Cada industria tiene su propio estilo. Organizamos el diseño
            alrededor de tu marca, sin plantillas o moldes repetidos.
          </Typography>
        </Box>
        <AiComparison />
      </Box>
    </Box>
  );
}
