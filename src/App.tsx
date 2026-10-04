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
import TitleTransitionProvider from './hero/transition/TitleTransitionProvider';
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
    primary: { main: '#c2a27b' },
  },
  typography: { fontFamily: 'Manrope, Arial, sans-serif' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
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
      <TitleTransitionProvider>
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
      </TitleTransitionProvider>
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
