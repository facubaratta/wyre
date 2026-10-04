const spanishServices = [
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

const englishServices: typeof spanishServices = [
  {
    title: 'Landing page',
    label: 'YOUR STARTING POINT',
    interest: 'a landing page',
    description:
      'A fast, modern website focused on showcasing your business and generating inquiries.',
  },
  {
    title: 'Website with custom features',
    label: 'SIMPLIFY YOUR DAY',
    interest: 'a website with custom features',
    description:
      'Bookings, forms, integrations and tools that simplify your daily operations. A website built to grow with your business.',
  },
  {
    title: 'Company website',
    label: 'SHOWCASE YOUR COMPANY',
    interest: 'a company website',
    description:
      'Your company, services, catalog and contact details in one complete website. With an admin panel so you can update the content yourself.',
  },
  {
    title: 'E-commerce',
    label: 'SELL ONLINE',
    interest: 'an online store',
    description:
      'Integrated catalog, payments and shipping, tailored to your inventory and existing logistics.',
  },
  {
    title: 'Mobile app',
    label: 'CONNECT WITH YOUR CUSTOMERS',
    interest: 'a mobile app',
    description:
      'We design and develop your business’s app, connected to the systems you already use.',
  },
];

export const services = { en: englishServices, es: spanishServices };
export type WebService = (typeof spanishServices)[number];
