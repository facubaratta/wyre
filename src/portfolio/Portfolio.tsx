import { useLanguage } from '../i18n/LanguageContext';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { projects } from './projects';
import ProjectBrowser from './ProjectBrowser';
import PortfolioNavigation from './PortfolioNavigation';
import SectionHeading from '../sections/SectionHeading';
import { usePreferences } from '../preferences/PreferencesContext';
import { usePortfolioSequenceState } from './PortfolioSequenceContext';

const hiddenOnSmallOrShort = {
  '@media (max-width:640px)': { display: 'none' },
  '@media (min-width:641px) and (max-height:500px)': { display: 'none' },
} satisfies SxProps<Theme>;

const styles = {
  portfolio: {
    position: 'absolute',
    zIndex: 2,
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '4svh',
    alignItems: 'center',
    justifyContent: 'center',
    px: '7vw',
    pt: 'calc(var(--header-height, 100px) + 24px)',
    pb: '80px',
    color: '#ebe8de',
    '@media (max-width:640px)': {
      px: '6vw',
      pt: 'max(24px, env(safe-area-inset-top))',
      pb: 'calc(84px + env(safe-area-inset-bottom))',
    },
    '@media (max-height:500px)': {
      pt: 'calc(var(--header-height, 100px) + 12px)',
      pb: '64px',
    },
  },
  assembly: {
    width:
      'min(100%, 1100px, 82svh, calc((100dvh - var(--header-height, 100px) - 310px) * 1.7778))',
    '@media (max-width:640px)': {
      width:
        'min(100%, calc((100dvh - 280px - env(safe-area-inset-top) - env(safe-area-inset-bottom)) * .5625))',
    },
    '@media (min-width:641px) and (max-height:500px)': {
      width:
        'min(100%, calc((100dvh - var(--header-height, 100px) - 190px) * 1.7778))',
    },
  },
  monitor: {
    border: '1px solid rgba(243,183,151,.65)',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#202321',
    '@media (max-width:640px)': {
      borderRadius: '36px',
      p: '10px 6px 0',
      borderColor: '#74766d',
    },
  },
  stand: {
    height: 'clamp(30px, 6svh, 60px)',
    width: '14%',
    mx: 'auto',
    borderInline: '1px solid #60615b',
    background: '#202321',
  },
  foot: {
    width: '30%',
    height: '8px',
    mx: 'auto',
    border: '1px solid #60615b',
    borderRadius: '3px',
    background: '#202321',
  },
  notch: {
    display: 'none',
    width: '27%',
    height: '9px',
    mx: 'auto',
    mb: '12px',
    borderRadius: '20px',
    background: '#0e100f',
    '@media (max-width:640px)': { display: 'block' },
  },
} satisfies Record<string, SxProps<Theme>>;

export default function Portfolio() {
  const {
    closingProgress,
    projectIndex,
    selectProject: onSelect,
  } = usePortfolioSequenceState();
  const { reduceMotion } = usePreferences();
  const { copy } = useLanguage();
  const project = projects[projectIndex];
  const showClosing = closingProgress >= 0.5;
  const selectedIndex = showClosing ? projects.length : projectIndex;
  return (
    <Box
      component="section"
      aria-labelledby="growth-heading"
      sx={{
        ...styles.portfolio,
        ...(reduceMotion ? { position: 'relative', minHeight: '100svh' } : {}),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: '20px', sm: '3svh' },
          width: '100%',
          '@media (max-height:500px)': { gap: '12px' },
        }}
      >
        <SectionHeading id="growth-heading" icon="growth">
          {copy.headings.growth}
        </SectionHeading>
        <Box sx={styles.assembly}>
          <Box sx={styles.monitor}>
            <Box aria-hidden="true" sx={styles.notch} />
            <ProjectBrowser
              project={project}
              projects={projects}
              projectIndex={projectIndex}
              closingProgress={closingProgress}
            />
          </Box>
          <Box
            aria-hidden="true"
            sx={{ ...styles.stand, ...hiddenOnSmallOrShort }}
          />
          <Box
            aria-hidden="true"
            sx={{ ...styles.foot, ...hiddenOnSmallOrShort }}
          />
          {reduceMotion && (
            <PortfolioNavigation
              selectedIndex={selectedIndex}
              projectIndex={projectIndex}
              onSelect={onSelect}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
