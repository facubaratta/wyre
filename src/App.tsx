import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import GridBackground from './gridBackground/GridBackground';
import { PreferencesProvider, usePreferences } from './PreferencesProvider';
import HeroSection from './hero/HeroSection';
import { serviceGroups } from './hero/services/serviceGroups';
import Portfolio from './portfolio/Portfolio';
import { projects } from './portfolio/projects';
import ScrollHelp from './ScrollHelp';
import useServiceSequence from './hero/useServiceSequence';
import usePortfolioSequence from './portfolio/usePortfolioSequence';
import useWindowScroll from './useWindowScroll';
import { createTimeline } from './scrollTimeline';

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
  const scroll = useWindowScroll();
  const service = useServiceSequence(scroll, serviceGroups.length);
  const portfolio = usePortfolioSequence(
    scroll,
    serviceGroups.length,
    projects.length,
  );
  const timeline = createTimeline(serviceGroups.length, projects.length);
  const nextReducedMotion = () => {
    if (service.manualIndex < serviceGroups.length - 1) {
      service.nextManualService();
    } else if (portfolio.manualIndex < projects.length) {
      portfolio.nextManualProject();
    }
  };

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
            <ScrollHelp
              scrollShadowOpacity={portfolio.scrollShadowOpacity}
              scroll={scroll}
              timeline={timeline}
              serviceCount={serviceGroups.length}
              projectCount={projects.length}
              onNextReducedMotion={nextReducedMotion}
            />
            <HeroSection
              activeIndex={service.activeIndex}
              scrollProgress={service.heroScrollProgress}
              showAccentHint={service.showAccentHint}
              exitProgress={portfolio.progress}
              onSelectService={service.selectService}
            />
            <Portfolio
              progress={portfolio.progress}
              closingProgress={portfolio.closingProgress}
              projectIndex={portfolio.projectIndex}
              onSelect={portfolio.selectProject}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <LandingPage />
    </PreferencesProvider>
  );
}
