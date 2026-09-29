import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { projects } from './projects';
import ProjectBrowser from './ProjectBrowser';
import PortfolioNavigation from './PortfolioNavigation';
import { usePreferences } from '../PreferencesProvider';

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
    alignItems: 'center',
    justifyContent: 'center',
    p: '6svh 7vw',
    color: '#ebe8de',
    '@media (max-width:640px)': { p: '4svh 5vw' },
    '@media (min-width:641px) and (max-height:500px)': { py: '2svh' },
  },
  assembly: {
    width: 'min(100%, 1100px, 100svh)',
    '@media (max-width:640px)': { width: 'min(82vw, 320px, 38svh)' },
    '@media (min-width:641px) and (max-height:500px)': {
      width: 'min(100%, calc((100svh - 140px) * 1.7778))',
    },
  },
  monitor: {
    border: '1px solid #60615b',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#202321',
    '@media (max-width:640px)': {
      borderRadius: '36px',
      p: '10px 6px 0',
      borderColor: '#74766d',
      '&::before': {
        content: '""',
        display: 'block',
        width: '27%',
        height: '9px',
        mx: 'auto',
        mb: '12px',
        borderRadius: '20px',
        background: '#0e100f',
      },
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
  focusable: {
    '& a:focus-visible, & button:focus-visible': {
      outline: '2px solid var(--accent)',
      outlineOffset: '4px',
    },
  },
} satisfies Record<string, SxProps<Theme>>;

interface Props {
  progress: number;
  projectIndex: number;
  closingProgress: number;
  onSelect: (index: number) => void;
}

export default function Portfolio({
  progress,
  closingProgress,
  projectIndex,
  onSelect,
}: Props) {
  const { reduceMotion } = usePreferences();
  const project = projects[projectIndex];
  const visible = reduceMotion || progress > 0;
  const interactive = reduceMotion || progress >= 0.5;
  const showClosing = closingProgress >= 0.5;
  const selectedIndex = showClosing ? projects.length : projectIndex;
  return (
    <Box
      component="section"
      aria-label="Portfolio"
      inert={!interactive}
      aria-hidden={!interactive}
      sx={{
        ...styles.portfolio,
        ...(reduceMotion ? { position: 'relative', minHeight: '100svh' } : {}),
        ...styles.focusable,
      }}
      style={{
        pointerEvents: interactive ? 'auto' : 'none',
        opacity: reduceMotion ? 1 : progress,
        visibility: visible ? 'visible' : 'hidden',
        transform: reduceMotion
          ? undefined
          : `translateY(${(1 - progress) * 12}svh)`,
      }}
    >
      <Box sx={styles.assembly}>
        <Box sx={styles.monitor}>
          <ProjectBrowser
            project={project}
            projects={projects}
            projectIndex={projectIndex}
            closingProgress={closingProgress}
            loadImages={visible}
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
  );
}
