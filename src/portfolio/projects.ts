import harmony from './screenshots/Health & Harmony.jpg';
import finca from './screenshots/Finca Don Clemente.jpg';
import tennis from './screenshots/ProTennisSquash.jpg';
import zurich from './screenshots/Zurich.jpg';
import time from './screenshots/Time Magnitude.jpg';

import harmonyMobile from './screenshots/Health & Harmony mobile.jpg';
import fincaMobile from './screenshots/Finca Don Clemente mobile.jpg';
import tennisMobile from './screenshots/ProTennisSquash mobile.jpg';
import zurichMobile from './screenshots/Zurich mobile.jpg';
import timeMobile from './screenshots/Time Magnitude mobile.jpg';

export const projects = [
  {
    name: 'Health & Harmony',
    url: 'https://hnhinsure.com/es',
    image: harmony,
    mobileImage: harmonyMobile,
  },
  {
    name: 'Finca Don Clemente',
    url: 'https://fincadonclemente.com',
    image: finca,
    mobileImage: fincaMobile,
  },
  {
    name: 'ProTennisSquash',
    url: 'https://protennis.com.ar',
    image: tennis,
    mobileImage: tennisMobile,
  },
  {
    name: 'Club Zurich',
    url: 'https://www.zurich.com.ar/clubzurich',
    image: zurich,
    mobileImage: zurichMobile,
  },
  {
    name: 'Time Magnitude',
    url: 'https://facubaratta.github.io/time/',
    image: time,
    mobileImage: timeMobile,
  },
];

export type Project = (typeof projects)[number];
