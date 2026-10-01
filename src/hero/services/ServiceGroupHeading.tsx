import Box from '@mui/material/Box';
import useControlState from '../../useControlState';
import Typography from '@mui/material/Typography';
import ServiceIconRail from './ServiceIconRail';
import type { ServiceFeature } from './serviceGroups';

interface Props {
  id: string;
  title: string;
  subsections: ServiceFeature[];
  open: boolean;
  panelId: string;
  onClick: () => void;
}

const buttonSx = (focusVisible: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(.5rem, 1vw, 1rem)',
  width: '100%',
  minHeight: '44px',
  p: 0,
  color: 'text.primary',
  flex: '1 1 auto',
  minWidth: 0,
  m: 0,
  fontWeight: 500,
  lineHeight: 1.3,
  letterSpacing: '-.015em',
  fontFamily: 'inherit',
  fontSize: 'clamp(1.75rem, 2.5vw, 2.7rem)',
  border: 0,
  background: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  outline: focusVisible ? '2px solid var(--accent)' : 'none',
  outlineOffset: '4px',
  '@media (max-width:640px)': {
    fontSize: 'clamp(1.125rem, 5.1vw, 1.5rem)',
  },
});

export default function ServiceGroupHeading({
  id,
  title,
  subsections,
  open,
  panelId,
  onClick,
}: Props) {
  const { focusVisible, events } = useControlState();
  return (
    <Typography id={id} component="h2" sx={{ m: 0 }}>
      <Box
        component="button"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onClick}
        {...events}
        sx={buttonSx(focusVisible)}
      >
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
