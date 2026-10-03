import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeading from './SectionHeading';

const principles = [
  {
    title: 'Las herramientas no piensan por nosotros',
    paragraphs: [
      'La estrategia de soluciones está planificada por profesionales con experiencia.',
      'Utilizamos herramientas de inteligencia artificial para una implementación más rápida, pero nunca sacrificamos la intuición, planificación, gusto o tacto humano.',
    ],
  },
  {
    title: 'Diseñado para tu industria.',
    paragraphs: [
      'Cada industria tiene su propio estilo y su propio diseño. Por eso no utilizamos plantillas o moldes repetidos, sino que organizamos el diseño alrededor de tu marca.',
    ],
  },
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
        <Box
          sx={{
            mt: { xs: 4, sm: 9 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 8 },
          }}
        >
          {principles.map(({ title, paragraphs }) => (
            <Box
              component="article"
              key={title}
              sx={{ pt: 3, borderTop: '1px solid rgba(235,232,222,.22)' }}
            >
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: 24, sm: 30 },
                  fontWeight: 500,
                  lineHeight: 1.3,
                  letterSpacing: '-.025em',
                }}
              >
                {title}
              </Typography>
              {paragraphs.map((paragraph) => (
                <Typography
                  component="p"
                  key={paragraph}
                  sx={{
                    mt: 2,
                    fontSize: { xs: 16, sm: 20 },
                    lineHeight: 1.65,
                    color: 'text.secondary',
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
