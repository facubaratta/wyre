import { BRAND_STOPS, brandGradient } from './brand/colors';
import { DEFAULT_ACCENT, getAccentVariables } from './brand/accentVariables';
import LanguageProvider from './i18n/LanguageProvider';
import type { Language } from './i18n/messages';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Navbar from './navigation/Navbar';
import MeshBackground from './background/MeshBackground';
import { PreferencesProvider } from './preferences/PreferencesProvider';
import HeroTransitionScene from './hero/HeroTransitionScene';
import PortfolioScene from './portfolio/PortfolioScene';
import WebPresence from './sections/WebPresence/WebPresence';
import About from './sections/About';
import ContactInterestProvider from './contact/ContactInterestProvider';

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

function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100svh', background: '#181a19' }}>
        <MeshBackground />
        <Navbar />
        <Box component="main" sx={{ position: 'relative' }}>
          <Box>
            <HeroTransitionScene />
            <WebPresence />
            <About />
          </Box>
          <PortfolioScene />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App({ language = 'en' }: { language?: Language }) {
  return (
    <LanguageProvider initialLanguage={language}>
      <PreferencesProvider>
        <ContactInterestProvider>
          <LandingPage />
        </ContactInterestProvider>
      </PreferencesProvider>
    </LanguageProvider>
  );
}
