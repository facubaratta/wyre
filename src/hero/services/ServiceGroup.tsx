import Box from '@mui/material/Box';
import { useRef } from 'react';
import ServiceEnergyWires from './ServiceEnergyWires';
import type { ServiceGroupData } from './serviceGroups';
import ServiceGroupHeading from './ServiceGroupHeading';
import ServiceFeatureList from './ServiceFeatureList';

const sectionSx = (open: boolean) => ({
  position: 'relative',
  overflow: 'hidden',
  color: 'text.primary',
  border: 0,
  mb: 0,
  py: open ? '2vw' : 0,
  '@media (max-width:640px)': {
    py: open ? 'clamp(.2rem, .45svh, .35rem)' : 0,
  },
});

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
  const sectionRef = useRef<HTMLElement>(null);
  const open = active;
  const headingId = `wyre-section-${index}`;
  const panelId = `${headingId}-features`;

  return (
    <Box
      component="section"
      ref={sectionRef}
      aria-labelledby={headingId}
      sx={sectionSx(open)}
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
