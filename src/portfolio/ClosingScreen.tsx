import ContactButtons from '../contact/ContactButtons';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { usePreferences } from '../PreferencesProvider';

const closingSx = {
  position: 'absolute',
  zIndex: 3,
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '16px',
  p: '5%',
  color: '#ebe8de',
  background: '#181a19',
  '& h1': {
    m: 0,
    py: '5%',
    borderTop: '1px solid rgba(235,232,222,.22)',
    fontSize: 'clamp(20px, 12cqw, 65px)',
    fontWeight: 400,
    lineHeight: 1.18,
    letterSpacing: '-.05em',
    '& span': { display: 'block' },
    '& em': { color: 'var(--accent)', fontStyle: 'normal' },
  },
} satisfies SxProps<Theme>;

export default function ClosingScreen({ progress }: { progress: number }) {
  const { reduceMotion } = usePreferences();
  const visible = progress > 0;
  return (
    <Box
      component="section"
      sx={closingSx}
      aria-labelledby="closing-heading"
      aria-hidden={progress < 0.5}
      inert={progress < 0.5}
      style={{
        pointerEvents: progress >= 0.5 ? 'auto' : 'none',
        opacity: progress,
        visibility: visible ? 'visible' : 'hidden',
        transform: reduceMotion
          ? undefined
          : `translateY(${(1 - progress) * 6}%)`,
      }}
    >
      <h1
        id="closing-heading"
        aria-label="Tu próxima web, app o perfil en redes sociales"
      >
        Tu próxima <em>web</em>, <em>app</em> o <em>perfil</em> en{' '}
        <em>redes sociales</em>
      </h1>
      <ContactButtons placement="closing" />
    </Box>
  );
}
