export const services = [
  {
    title: 'Landing page',
    label: 'TU PUNTO DE PARTIDA',
    interest: 'una landing page',
    description:
      'Un sitio rápido, moderno y enfocado en mostrar tu negocio y generar consultas.',
  },
  {
    title: 'Web con funcionalidades a medida',
    label: 'SIMPLIFICÁ TU DÍA',
    interest: 'una web con funcionalidades a medida',
    description:
      'Reservas, formularios, integraciones y herramientas que simplifican el día a día de tu negocio. Una web preparada para seguir creciendo.',
  },
  {
    title: 'Sitio institucional',
    label: 'MOSTRÁ TU EMPRESA',
    interest: 'un sitio institucional',
    description:
      'Tu empresa, servicios, catálogo y contacto en un sitio completo. Con un panel para que puedas actualizar el contenido sin depender de nosotros.',
  },
  {
    title: 'E-commerce',
    label: 'VENDÉ ONLINE',
    interest: 'un e-commerce',
    description:
      'Catálogo, pagos y envíos integrados, adaptados a tu stock y a la logística que ya usás.',
  },
  {
    title: 'App móvil',
    label: 'CONECTÁ CON TUS CLIENTES',
    interest: 'una app móvil',
    description:
      'Diseñamos y desarrollamos la app de tu negocio, conectada con los sistemas que ya utilizás.',
  },
];

export type WebService = (typeof services)[number];
