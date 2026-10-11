export const messages = {
  en: {
    equation: 'THE EQUATION IS SIMPLE',
    meta: {
      title: 'Wyre — Custom web design and digital development',
      description:
        'Custom websites, apps and online stores. At Wyre, we combine technology, strategy and human decisions to help your business grow.',
    },
    headings: {
      web: 'Web presence',
      human: 'Human decisions',
      growth: 'Real growth',
    },
    heroDesign: {
      eyebrow: 'Digital strategy · Design · Development',
      headline: 'Digital experiences that move business forward',
      description:
        'We combine thoughtful design, smart technology and human insight to build digital experiences that help your business grow.',
      discuss: 'Discuss your project',
      explore: 'Explore our work',
      services: 'Services',
      work: 'Work',
      about: 'About',
      pillars: ['Strategy', 'Experience', 'Growth'],
    },
    hero: [
      'Digital solutions',
      'designed by professionals',
      'for your business and your customers.',
    ],
    navigation: {
      label: 'Main navigation',
      projects: 'View projects',
      contact: 'Let’s talk',
    },
    web: {
      intro: 'A solution for what your business needs today.',
      future: 'And what it may need tomorrow.',
      description:
        'We define the scope, priorities and budget together. If your idea doesn’t fit these categories, we can build it too.',
      more: 'Learn more',
      interested: 'I’m interested',
      contactOptions: 'View contact options',
    },
    human: {
      title: 'Your customers need to understand',
      highlight: 'what you offer and how to hire you.',
      description:
        'Every decision has a purpose: explain your service, give people reasons to trust you and make it easy to get in touch.',
      points: [
        ['Clarity', 'What you do, who it’s for and where.'],
        ['Trust', 'Clear information to make a decision.'],
        ['Action', 'An easy-to-find next step.'],
      ],
    },
    closing: {
      start: 'Your next ',
      web: 'website',
      or: ' or ',
      app: 'mobile app',
      idea: 'Tell us what you have in mind.',
      next: 'We’ll define the next step together.',
    },
    portfolio: {
      label: 'Portfolio projects',
      previous: 'Previous project',
      next: 'Next project',
      closing: 'Show closing screen',
      open: 'Open',
      newTab: 'in a new tab',
      visit: 'Open website in a new tab',
      screenshot: 'website screenshot',
    },
    scroll: { top: 'Scroll to top', next: 'Scroll to the next section' },
    contact: {
      label: 'Contact Wyre',
      email: 'Email',
      subject: 'Service inquiry',
      greeting: 'Hi Wyre, I’m interested in',
      defaultMessage: 'Hi, I’d like to get in touch with Wyre',
    },
  },
  es: {
    equation: 'LA ECUACIÓN ES SIMPLE',
    meta: {
      title: 'Wyre — Diseño y desarrollo digital a medida',
      description:
        'Diseño y desarrollo de webs, apps y tiendas online a medida. En Wyre combinamos tecnología, estrategia y decisiones humanas para hacer crecer tu negocio.',
    },
    headings: {
      web: 'Presencia web',
      human: 'Decisiones Humanas',
      growth: 'Crecimiento real',
    },
    heroDesign: {
      eyebrow: 'Estrategia digital · Diseño · Desarrollo',
      headline: 'Experiencias digitales que impulsan tu negocio',
      description:
        'Combinamos diseño, tecnología y criterio profesional para crear experiencias digitales que ayuden a crecer a tu negocio.',
      discuss: 'Hablemos de tu proyecto',
      explore: 'Explorá nuestro trabajo',
      services: 'Servicios',
      work: 'Proyectos',
      about: 'Nosotros',
      pillars: ['Estrategia', 'Experiencia', 'Crecimiento'],
    },
    hero: [
      'Soluciones digitales',
      'ideadas por profesionales',
      'para tu negocio y tus clientes.',
    ],
    navigation: {
      label: 'Navegación principal',
      projects: 'Ver proyectos',
      contact: 'Hablemos',
    },
    web: {
      intro: 'Una solución para lo que tu negocio necesita hoy.',
      future: 'Y para lo que puede necesitar mañana.',
      description:
        'Definimos juntos el alcance, las prioridades y el presupuesto. Si tu idea no encaja en estas categorías, también podemos construirla.',
      more: 'Ver más',
      interested: 'Me interesa',
      contactOptions: 'Ver opciones de contacto',
    },
    human: {
      title: 'Tu cliente necesita entender',
      highlight: 'qué ofrecés y cómo contratarte.',
      description:
        'Cada decisión tiene un propósito: explicar tu servicio, dar motivos para confiar y facilitar el contacto.',
      points: [
        ['Claridad', 'Qué hacés, para quién y dónde.'],
        ['Confianza', 'Información concreta para decidir.'],
        ['Acción', 'Un próximo paso fácil de encontrar.'],
      ],
    },
    closing: {
      start: 'Tu próxima ',
      web: 'web',
      or: ' o ',
      app: 'app mobile',
      idea: 'Contanos qué tenés en mente.',
      next: 'Definimos juntos el próximo paso.',
    },
    portfolio: {
      label: 'Proyectos del portfolio',
      previous: 'Proyecto anterior',
      next: 'Próximo proyecto',
      closing: 'Ver pantalla de contacto',
      open: 'Abrir',
      newTab: 'en una pestaña nueva',
      visit: 'Abrir sitio en una pestaña nueva',
      screenshot: 'captura del sitio web',
    },
    scroll: { top: 'Volver arriba', next: 'Ir a la próxima sección' },
    contact: {
      label: 'Contactar a Wyre',
      email: 'Mail',
      subject: 'Consulta sobre servicios',
      greeting: 'Hola Wyre, me interesa',
      defaultMessage: 'Hola, me interesa contactar a Wyre',
    },
  },
};

export type Language = keyof typeof messages;
