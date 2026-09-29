import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ServiceIconRail from './ServiceIconRail';
import type { ServiceFeature } from './serviceGroups';

interface Props {
  id: string;
  title: string;
  subsections: ServiceFeature[];
  open: boolean;
}

const rowSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(.5rem, 1vw, 1rem)',
  width: '100%',
  minHeight: '44px',
  padding: 0,
  color: 'inherit',
};

const titleSx = {
  flex: '1 1 auto',
  minWidth: 0,
  m: 0,
  fontSize: 'var(--section-title-size)',
  fontWeight: 500,
  lineHeight: 1.3,
  letterSpacing: '-.015em',
};

export default function ServiceGroupHeading({
  id,
  title,
  subsections,
  open,
}: Props) {
  return (
    <Typography
      id={id}
      component="h2"
      sx={{
        ...titleSx,
        '--section-title-size': open
          ? 'var(--open-title-size)'
          : 'var(--closed-title-size)',
      }}
    >
      <Box component="span" sx={rowSx}>
        <Box component="span" sx={{ flex: '1 1 auto', minWidth: 0 }}>
          <Box
            component="span"
            data-wire-source=""
            sx={{ display: 'inline-block' }}
          >
            {title}
          </Box>
        </Box>
        <ServiceIconRail subsections={subsections} open={open} />
      </Box>
    </Typography>
  );
}
