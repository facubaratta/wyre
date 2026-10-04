import { screenshotSources } from './screenshotSources';

export const projects = [
  {
    name: 'Health & Harmony',
    url: 'https://hnhinsure.com/es',
    images: screenshotSources['Health & Harmony.jpg'],
    mobileImages: screenshotSources['Health & Harmony mobile.jpg'],
  },
  {
    name: 'Finca Don Clemente',
    url: 'https://fincadonclemente.com',
    images: screenshotSources['Finca Don Clemente.jpg'],
    mobileImages: screenshotSources['Finca Don Clemente mobile.jpg'],
  },
  {
    name: 'ProTennisSquash',
    url: 'https://protennis.com.ar',
    images: screenshotSources['ProTennisSquash.jpg'],
    mobileImages: screenshotSources['ProTennisSquash mobile.jpg'],
  },
  {
    name: 'Club Zurich',
    url: 'https://www.zurich.com.ar/clubzurich',
    images: screenshotSources['Zurich.jpg'],
    mobileImages: screenshotSources['Zurich mobile.jpg'],
  },
  {
    name: 'Time Magnitude',
    url: 'https://facubaratta.github.io/time/',
    images: screenshotSources['Time Magnitude.jpg'],
    mobileImages: screenshotSources['Time Magnitude mobile.jpg'],
  },
];

export type Project = (typeof projects)[number];
