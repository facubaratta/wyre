export const projectThemes = [
  { background: '#dce5da', ink: '#344d3c', accent: '#a4bea8', align: 'center' },
  {
    background: '#e8d9c8',
    ink: '#654938',
    accent: '#c4a281',
    align: 'flex-end',
  },
  { background: '#492b35', ink: '#f4c8ab', accent: '#ad604c', align: 'center' },
  {
    background: '#c9dce7',
    ink: '#254963',
    accent: '#8daec5',
    align: 'flex-start',
  },
  { background: '#101010', ink: '#ebe8de', accent: '#7b7676', align: 'center' },
] as const;

export type ProjectTheme = (typeof projectThemes)[number];
