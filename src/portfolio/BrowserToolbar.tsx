import { useId } from 'react';
import BrandGradient from '../brand/BrandGradient';
import { gradientFocusSx } from '../brand/colors';
import { useLanguage } from '../i18n/LanguageContext';
import Box from '@mui/material/Box';
import useControlState from '../controls/useControlState';
import type { SVGProps } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { Project } from './projects';

const hiddenToolbarPart = { visibility: 'hidden' } satisfies SxProps<Theme>;

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    p: '12px',
    borderBottom: '1px solid #454840',
    '@media (max-width:640px)': { p: '0 4px 8px', gap: 0 },
    '@media (min-width:641px) and (max-height:500px)': { py: '4px' },
  },
  address: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: 0,
    height: '40px',
    px: '14px',
    border: '1px solid #454840',
    borderRadius: '7px',
    background: '#181a19',
    color: '#a4a69d',
    '@media (max-width:640px)': {
      height: '34px',
      px: '8px',
      gap: '6px',
      borderRadius: '8px',
    },
  },
  url: {
    fontFamily: 'Arial, sans-serif',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#ebe8de',
    fontSize: 'clamp(14px, 1.25vw, 18px)',
    letterSpacing: '.015em',
    '@media (max-width:640px)': { fontSize: '11px' },
  },
  visit: {
    display: 'grid',
    placeItems: 'center',
    width: '44px',
    height: '44px',
    flexShrink: 0,
    color: 'text.primary',
    fontSize: '28px',
    textDecoration: 'none',
    '@media (max-width:640px)': { fontSize: '24px' },
  },
} satisfies Record<string, SxProps<Theme>>;

const visitSx = (
  closing: boolean,
  hovered: boolean,
  focusVisible: boolean,
) => ({
  ...styles.visit,
  ...(closing ? hiddenToolbarPart : {}),
  opacity: hovered ? 0.7 : 1,
  position: 'relative',
  isolation: 'isolate',
  ...(focusVisible ? gradientFocusSx : {}),
  outlineOffset: '4px',
});

const iconSx: Pick<
  SVGProps<SVGSVGElement>,
  'aria-hidden' | 'viewBox' | 'fill' | 'stroke'
> = {
  'aria-hidden': 'true',
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
};

const LockIcon = () => (
  <Box
    component="svg"
    {...iconSx}
    height="18"
    strokeWidth="1.4"
    sx={{ width: '18px', '@media (max-width:640px)': { width: '12px' } }}
  >
    <rect x="4.5" y="8.5" width="11" height="8" rx="2" />
    <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
  </Box>
);

const ArrowIcon = () => {
  const id = `visit-${useId().replace(/:/g, '')}`;
  return (
    <svg
      {...iconSx}
      width="30"
      height="30"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <BrandGradient id={id} />
      <path stroke={`url(#${id})`} d="M7 13 14 6" />
      <path stroke={`url(#${id})`} d="M8 6h6v6" />
    </svg>
  );
};

export default function BrowserToolbar({
  project,
  closing,
}: {
  project: Project;
  closing: boolean;
}) {
  const { hovered, focusVisible, events } = useControlState();
  const { copy } = useLanguage();
  return (
    <Box sx={styles.toolbar} aria-hidden={closing} inert={closing}>
      <Box sx={styles.address}>
        <LockIcon />
        <Box
          component="span"
          sx={{ ...styles.url, ...(closing ? hiddenToolbarPart : {}) }}
        >
          {project.url.replace('https://', '')}
        </Box>
      </Box>
      <Box
        component="a"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        {...events}
        sx={visitSx(closing, hovered, focusVisible)}
        aria-label={`${copy.portfolio.open} ${project.name} ${copy.portfolio.newTab}`}
        title={copy.portfolio.visit}
      >
        <ArrowIcon />
      </Box>
    </Box>
  );
}
