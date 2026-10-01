import Box from '@mui/material/Box';
import ServiceIcon from './ServiceIcon';
import type { ServiceFeature } from './serviceGroups';

interface Props {
  subsections: ServiceFeature[];
  open: boolean;
}

const railSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(.5rem, .9vw, .95rem)',
  ml: 'auto',
  flexShrink: 0,
  '@media (max-width:640px)': { gap: '6px' },
};

export default function ServiceIconRail({ subsections, open }: Props) {
  return (
    <Box
      component="span"
      sx={{
        ...railSx,
        ...(open ? { width: 0, overflow: 'hidden', ml: 0 } : {}),
      }}
    >
      {subsections.map((subsection, index) => (
        <ServiceIcon
          key={subsection.title}
          svg={subsection.icon}
          size="clamp(22px, 1.9vw, 30px)"
          sx={{ '@media (max-width:640px)': { width: '18px', height: '18px' } }}
          visible={!open}
          delay={index * 70}
        />
      ))}
    </Box>
  );
}
