import { useLanguage } from '../../i18n/LanguageContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function WebPresenceIntro() {
  const { copy } = useLanguage();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
        mt: { xs: 3, sm: 4 },
      }}
    >
      <Typography
        component="p"
        sx={{
          width: '100%',
          maxWidth: '40ch',
          fontSize: { xs: 22, sm: 28 },
          lineHeight: 1.4,
          letterSpacing: '-.025em',
        }}
      >
        {copy.web.intro}
        <Box component="span" sx={{ color: 'text.secondary' }}>
          {' '}
          {copy.web.future}
        </Box>
      </Typography>
      <Typography
        component="p"
        sx={{
          width: '100%',
          maxWidth: '72ch',
          fontSize: { xs: 15, sm: 16 },
          lineHeight: 1.75,
          color: 'text.secondary',
        }}
      >
        {copy.web.description}
      </Typography>
    </Box>
  );
}
