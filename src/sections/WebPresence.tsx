import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeading from './SectionHeading';
import WebPresenceScene from './WebPresenceScene';
import ServiceReveal from './ServiceReveal';
import { useTitleTransition } from '../hero/transition/TitleTransitionContext';

const services = [
  {
    title: 'Landing page',
    description:
      'Un sitio rápido, moderno y enfocado en mostrar tu negocio y generar consultas.',
  },
  {
    title: 'Web con funcionalidades a medida',
    description:
      'Reservas, formularios, integraciones y herramientas que simplifican el día a día de tu negocio. Una web preparada para seguir creciendo.',
  },
  {
    title: 'Sitio institucional',
    description:
      'Tu empresa, servicios, catálogo y contacto en un sitio completo. Con un panel para que puedas actualizar el contenido sin depender de nosotros.',
  },
  {
    title: 'E-commerce',
    description:
      'Catálogo, pagos y envíos integrados, adaptados a tu stock y a la logística que ya usás.',
  },
  {
    title: 'App móvil',
    description:
      'Diseñamos y desarrollamos la app de tu negocio, conectada con los sistemas que ya utilizás.',
  },
];

export default function WebPresence() {
  const { complete } = useTitleTransition();
  return (
    <WebPresenceScene id="presencia-web" headingId="web-heading">
      <SectionHeading id="web-heading" icon="globe" hidden={!complete}>
        Presencia web
      </SectionHeading>
      <Typography
        component="p"
        sx={{
          mt: { xs: 3, sm: 4 },
          maxWidth: 760,
          fontSize: { xs: 19, sm: 26 },
          lineHeight: 1.5,
        }}
      >
        Una solución para lo que tu negocio necesita hoy. Y para lo que puede
        necesitar mañana.
      </Typography>
      <Typography
        component="p"
        sx={{
          mt: 2,
          maxWidth: 760,
          fontSize: { xs: 16, sm: 21 },
          lineHeight: 1.6,
          color: 'text.secondary',
        }}
      >
        Definimos juntos el alcance, las prioridades y el presupuesto. Si tu
        idea no encaja en estas categorías, también podemos construirla.
      </Typography>
      <Box
        sx={{
          mt: { xs: 4, sm: 9 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          columnGap: { md: 8 },
          rowGap: { xs: 4, sm: 5 },
        }}
      >
        {services.map(({ title, description }, index) => (
          <ServiceReveal key={title} index={index}>
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: 24, sm: 30 },
                fontWeight: 500,
                letterSpacing: '-.025em',
              }}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              sx={{
                mt: 2,
                fontSize: { xs: 16, sm: 20 },
                lineHeight: 1.65,
                color: 'text.secondary',
              }}
            >
              {description}
            </Typography>
          </ServiceReveal>
        ))}
      </Box>
    </WebPresenceScene>
  );
}
