import {
  DEFAULT_ACCENT,
  getAccentVariables,
} from './preferences/useAccentColor';
import LanguageProvider from './i18n/LanguageProvider';
import type { Language } from './i18n/messages';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Navbar from './navigation/Navbar';
import MeshBackground from './background/MeshBackground';
import { PreferencesProvider } from './preferences/PreferencesProvider';
import HeroTransitionScene from './hero/HeroTransitionScene';
import PortfolioScene from './portfolio/PortfolioScene';
import WebPresence from './sections/WebPresence';
import HeroTransitionProvider from './hero/transition/HeroTransitionProvider';
import HumanDecisions from './sections/HumanDecisions';
import ScrollArrow from './scroll/ScrollArrow';
import ScrollShadow from './scroll/ScrollShadow';
import { LandingLayoutProvider } from './scroll/LandingLayoutProvider';
import { useLandingLayout } from './scroll/LandingLayoutContext';
import PortfolioSequenceProvider from './portfolio/PortfolioSequenceProvider';
import ContactInterestProvider from './contact/ContactInterestProvider';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#181a19', paper: '#181a19' },
    text: { primary: '#ebe8de', secondary: '#a4a69d' },
    primary: { main: '#f3b797' },
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
          '--brand-gradient':
            'linear-gradient(110deg, #bb7bf1 0%, #e89ac4 48%, #ffc397 100%)',
        },
        '::selection': { background: 'var(--accent)', color: '#181a19' },
      },
    },
  },
});

function LandingPage() {
  const { introRef } = useLandingLayout();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeroTransitionProvider>
        <Box sx={{ minHeight: '100svh', background: '#181a19' }}>
          <MeshBackground />
          <Navbar />
          <ScrollArrow />
          <ScrollShadow />
          <Box component="main" sx={{ position: 'relative' }}>
            <Box ref={introRef}>
              <HeroTransitionScene />
              <WebPresence />
              <HumanDecisions />
            </Box>
            <PortfolioScene />
          </Box>
        </Box>
      </HeroTransitionProvider>
    </ThemeProvider>
  );
}

export default function App({ language = 'en' }: { language?: Language }) {
  return (
    <LanguageProvider initialLanguage={language}>
      <PreferencesProvider>
        <LandingLayoutProvider>
          <PortfolioSequenceProvider>
            <ContactInterestProvider>
              <LandingPage />
            </ContactInterestProvider>
          </PortfolioSequenceProvider>
        </LandingLayoutProvider>
      </PreferencesProvider>
    </LanguageProvider>
  );
}
