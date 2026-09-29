import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import GridBackground from './gridBackground/GridBackground';
import { PreferencesProvider, usePreferences } from './PreferencesProvider';
import HeroSection from './hero/HeroSection';
import { serviceGroups } from './hero/services/serviceGroups';
import Portfolio from './portfolio/Portfolio';
import { projects } from './portfolio/projects';
import ScrollHelp from './ScrollHelp';
import useLandingSequence from './useLandingSequence';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#181a19', paper: '#181a19' },
    text: { primary: '#ebe8de', secondary: '#a4a69d' },
    primary: { main: '#c2a27b' },
  },
  typography: { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': { background: 'var(--accent)', color: '#181a19' },
        body: { overscrollBehavior: 'none' },
      },
    },
  },
});

export default function App() {
  const { reduceMotion } = usePreferences();
  const {
    activeIndex,
    heroScrollProgress,
    showAccentHint,
    minHeight,
    portfolioProgress,
    closingProgress,
    projectIndex,
    selectProject,
    scrollShadowOpacity,
    nextCheckpoint,
    selectService,
  } = useLandingSequence(serviceGroups.length, projects.length);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreferencesProvider>
        <Box sx={{ minHeight: '100svh', background: '#181a19' }}>
          <GridBackground />
          <Box component="main" sx={{ minHeight, position: 'relative' }}>
            <Box
              sx={{
                position: reduceMotion ? 'relative' : 'sticky',
                top: 0,
                height: reduceMotion ? 'auto' : '100svh',
              }}
            >
              <ScrollHelp
                scrollShadowOpacity={scrollShadowOpacity}
                onNext={nextCheckpoint}
              />
              <HeroSection
                activeIndex={activeIndex}
                scrollProgress={heroScrollProgress}
                showAccentHint={showAccentHint}
                exitProgress={portfolioProgress}
                onSelectService={selectService}
              />
              <Portfolio
                progress={portfolioProgress}
                closingProgress={closingProgress}
                projectIndex={projectIndex}
                onSelect={selectProject}
              />
            </Box>
          </Box>
        </Box>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
