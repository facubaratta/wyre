import { useLanguage } from '../i18n/LanguageContext';
import ContactButtons from '../contact/ContactButtons';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

const closingSx = {
  position: 'absolute',
  zIndex: 3,
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'safe center',
  alignItems: 'flex-start',
  overflowY: 'auto',
  overflowX: 'hidden',
  overscrollBehavior: 'contain',
  gap: '16px',
  p: '5%',
  color: '#ebe8de',
  background: '#181a19',
} satisfies SxProps<Theme>;

const headingSx = {
  m: 0,
  flexShrink: 0,
  maxWidth: '100%',
  overflowWrap: 'anywhere',
  py: '5%',
  borderTop: '1px solid rgba(235,232,222,.22)',
  fontSize: 'clamp(20px, 12cqw, 30px)',
  fontWeight: 400,
  lineHeight: 1.18,
  letterSpacing: '-.05em',
} satisfies SxProps<Theme>;

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <Box component="em" sx={{ color: 'var(--accent)', fontStyle: 'normal' }}>
    {children}
  </Box>
);

export default function ClosingScreen({ progress }: { progress: number }) {
  const visible = progress > 0;
  const { copy } = useLanguage();
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
      }}
    >
      <Box component="h2" sx={headingSx} id="closing-heading">
        {copy.closing.start}
        <Highlight>{copy.closing.web}</Highlight>
        {copy.closing.or}
        <Highlight>{copy.closing.app}</Highlight>
      </Box>
      <Box
        component="p"
        sx={{
          m: 0,
          flexShrink: 0,
          color: 'text.secondary',
          fontSize: 'clamp(14px, 3cqw, 19px)',
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      >
        {copy.closing.idea}
        <br />
        {copy.closing.next}
      </Box>
      <ContactButtons placement="closing" />
    </Box>
  );
}
