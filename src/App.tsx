import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import GridBackground from './gridBackground/GridBackground';
import { PreferencesProvider, usePreferences } from './PreferencesProvider';
import HeroSection from './hero/HeroSection';
import Portfolio from './portfolio/Portfolio';
import ScrollArrow from './scollHelp/Arrow';
import ScrollShadow from './scollHelp/ScrollShadow';
import { LandingSequenceProvider } from './LandingSequenceProvider';
import { useLandingSequence } from './LandingSequenceProvider';

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
        body: { overscrollBehavior: 'none' },
      },
    },
  },
});

function LandingPage() {
  const { reduceMotion } = usePreferences();
  const { timeline, scroll } = useLandingSequence();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100svh', background: '#181a19' }}>
        <GridBackground />
        <Box
          component="main"
          sx={{
            minHeight: reduceMotion
              ? undefined
              : `${(timeline.closingEnd + 1) * scroll.viewport}px`,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: reduceMotion ? 'relative' : 'sticky',
              top: 0,
              height: reduceMotion ? 'auto' : '100svh',
            }}
          >
            <ScrollArrow />
            <ScrollShadow />
            <HeroSection />
            <Portfolio />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <LandingSequenceProvider>
        <LandingPage />
      </LandingSequenceProvider>
    </PreferencesProvider>
  );
}
