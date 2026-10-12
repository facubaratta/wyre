import { createTheme } from '@mui/material';
import { BRAND_STOPS, brandGradient } from './brand/colors';
import { DEFAULT_ACCENT, getAccentVariables } from './brand/accentVariables';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#181a19', paper: '#181a19' },
    text: { primary: '#ebe8de', secondary: '#a4a69d' },
    primary: { main: BRAND_STOPS[2].color },
  },
  typography: { fontFamily: 'Inter, Arial, sans-serif' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '100 900',
          fontDisplay: 'swap',
          src: `url('${import.meta.env.BASE_URL}fonts/inter-latin-variable.woff2') format('woff2')`,
        },
        ':root': {
          ...getAccentVariables(DEFAULT_ACCENT),
          '--brand-gradient': brandGradient(),
          '--brand-gradient-soft': brandGradient(0.14),
          '--surface': '#181a19',
        },
        '::selection': { background: 'var(--surface)', color: 'text.primary' },
      },
    },
  },
});

export default theme;
