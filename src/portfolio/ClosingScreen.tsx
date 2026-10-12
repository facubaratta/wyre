import { gradientTextSx } from '../brand/colors';
import { useLanguage } from '../i18n/LanguageContext';
import ContactButtons from '../contact/ContactButtons';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

const closingSx = {
  position: 'relative',
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'safe center',
  alignItems: 'flex-start',
  overflowY: 'auto',
  overflowX: 'hidden',
  overscrollBehavior: 'contain',
  gap: '16px',
  pt: { xs: 5, md: 8 },
  pb: 4,
  borderTop: '1px solid rgba(235,232,222,.3)',
  color: '#ebe8de',
  background: 'transparent',
} satisfies SxProps<Theme>;

const headingSx = {
  m: 0,
  flexShrink: 0,
  maxWidth: '100%',
  overflowWrap: 'anywhere',
  fontSize: 'clamp(36px, 7cqw, 84px)',
  fontWeight: 500,
  lineHeight: 1.06,
  letterSpacing: '-.05em',
} satisfies SxProps<Theme>;

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <Box component="em" sx={{ ...gradientTextSx, fontStyle: 'normal' }}>
    {children}
  </Box>
);

export default function ClosingScreen() {
  const { copy } = useLanguage();
  return (
    <Box component="section" sx={closingSx} aria-labelledby="closing-heading">
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
