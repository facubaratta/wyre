import globe from './icons/globe.svg?raw';
import instagram from './icons/instagram.svg?raw';
import megaphone from './icons/megaphone.svg?raw';
import coin from './icons/coin.svg?raw';
import target from './icons/target.svg?raw';
import financeTrend from './icons/finance-trend.svg?raw';
import brain from './icons/brain.svg?raw';
import paintBrush from './icons/paint-brush.svg?raw';
import focus from './icons/focus.svg?raw';

export interface ServiceFeature {
  title: string;
  icon: string;
}

export interface ServiceGroupData {
  title: string;
  subsections: ServiceFeature[];
}

export const serviceGroups: ServiceGroupData[] = [
  {
    title: 'Servicios digitales',
    subsections: [
      {
        title: 'Sitio web (e-commerce, landing page, institucional)',
        icon: globe,
      },
      { title: 'Redes sociales y content management', icon: instagram },
      { title: 'Comunicación y marketing digital', icon: megaphone },
    ],
  },
  {
    title: 'pensados a medida',
    subsections: [
      { title: 'Adaptados al presupuesto', icon: coin },
      { title: 'Acorde a las necesidades', icon: target },
      { title: 'Escalables con el negocio', icon: financeTrend },
    ],
  },
  {
    title: 'con decisiones humanas',
    subsections: [
      { title: 'Profesionales con experiencia', icon: brain },
      { title: 'Diseño acorde a la marca', icon: paintBrush },
      { title: 'Soluciones integrales', icon: focus },
    ],
  },
];
