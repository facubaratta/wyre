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
        mt: { xs: 4, sm: 5 },
      }}
    >
      <Typography
        component="p"
        sx={{
          width: '100%',
          maxWidth: { xs: '30ch', md: 'none' },
          fontSize: { xs: 23, sm: 30 },
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
          maxWidth: { xs: '48ch', md: 'none' },
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
