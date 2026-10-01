import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import { useRef } from 'react';
import ServiceEnergyWires from './ServiceEnergyWires';
import type { ServiceGroupData } from './serviceGroups';
import ServiceGroupHeading from './ServiceGroupHeading';
import ServiceFeatureList from './ServiceFeatureList';
import { usePreferences } from '../../PreferencesProvider';

const groupStyle = {
  closedTitleSize: 'clamp(1.75rem, 2.5vw, 2.7rem)',
  openTitleSize: 'clamp(1.75rem, 2.5vw, 2.7rem)',
  closedIconSize: 'clamp(22px, 1.9vw, 30px)',
  openIconSize: 'clamp(22px, 1.9vw, 30px)',
  iconGap: 'clamp(.5rem, .9vw, .95rem)',
  featureIconSize: 'clamp(28px, 2.2vw, 36px)',
  closedPadding: '0px',
  openPadding: '2vw',
  closedOverlap: '0px',
  mobile: {
    closedTitleSize: 'clamp(1.125rem, 5.1vw, 1.5rem)',
    openTitleSize: 'clamp(1.125rem, 5.1vw, 1.5rem)',
    closedIconSize: '18px',
    featureIconSize: '20px',
    iconGap: '6px',
    openPadding: 'clamp(.2rem, .45svh, .35rem)',
  },
};

const beforeTransition = 'transform 800ms cubic-bezier(.22,1,.36,1)';

const beforeSx: SystemStyleObject<Theme> = {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 0,
  backgroundColor: 'var(--accent)',
  transformOrigin: 'left',
  transition: beforeTransition,
};

const sectionSx: SystemStyleObject<Theme> = {
  '--closed-title-size': groupStyle.closedTitleSize,
  '--open-title-size': groupStyle.openTitleSize,
  '--closed-icon-size': groupStyle.closedIconSize,
  '--open-icon-size': groupStyle.openIconSize,
  '--section-icon-gap': groupStyle.iconGap,
  '--bullet-icon-size': groupStyle.featureIconSize,
  position: 'relative',
  overflow: 'hidden',
  color: 'text.primary',
  border: 0,
  mb: groupStyle.closedOverlap,
  '@media (max-width:640px)': {
    '--closed-title-size': groupStyle.mobile.closedTitleSize,
    '--open-title-size': groupStyle.mobile.openTitleSize,
    '--closed-icon-size': groupStyle.mobile.closedIconSize,
    '--bullet-icon-size': groupStyle.mobile.featureIconSize,
    '--section-icon-gap': groupStyle.mobile.iconGap,
  },
  '&::before': beforeSx,
};

interface Props {
  section: ServiceGroupData;
  index: number;
  active: boolean;
  onSelect: (index: number) => void;
}

export default function ServiceGroup({
  section,
  index,
  active,
  onSelect,
}: Props) {
  const { reduceMotion } = usePreferences();
  const sectionRef = useRef<HTMLElement>(null);
  const open = active;
  const headingId = `wyre-section-${index}`;
  const panelId = `${headingId}-features`;

  return (
    <Box
      component="section"
      ref={sectionRef}
      aria-labelledby={headingId}
      sx={[
        sectionSx,
        {
          '&::before': {
            ...beforeSx,
            transform: open ? 'scaleX(1)' : 'scaleX(0)',
            transition: reduceMotion ? 'none' : beforeTransition,
          },
          '& h2': {
            color: 'text.primary',
            transition: reduceMotion ? 'none' : 'color 450ms ease',
          },
          '&:hover h2': { color: 'text.primary' },
          py: open ? groupStyle.openPadding : undefined,
          mb: open ? 0 : groupStyle.closedOverlap,
          '@media (max-width:640px)': {
            py: open ? groupStyle.mobile.openPadding : 0,
          },
        },
      ]}
    >
      <ServiceEnergyWires sectionRef={sectionRef} open={open} />
      <ServiceGroupHeading
        id={headingId}
        title={section.title}
        subsections={section.subsections}
        open={open}
        panelId={panelId}
        onClick={() => onSelect(index)}
      />
      <ServiceFeatureList
        id={panelId}
        subsections={section.subsections}
        open={open}
      />
    </Box>
  );
}
