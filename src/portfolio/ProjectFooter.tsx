import Box from '@mui/material/Box';
import LinkArrow from '../brand/LinkArrow';
import { useLanguage } from '../i18n/LanguageContext';

export default function ProjectFooter({
  url,
  hovered,
}: {
  url: string;
  hovered: boolean;
}) {
  const { copy } = useLanguage();
  const domain = new URL(url).hostname.replace(/^www\./, '');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1.5,
        mt: { xs: 3, md: 4 },
        fontSize: 11,
      }}
    >
      <Box component="span" sx={{ overflowWrap: 'anywhere' }}>
        {domain}
      </Box>
      <Box
        component="span"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          ml: 'auto',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
        }}
      >
        {copy.portfolio.explore}
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            display: 'flex',
            '@media (hover: hover)': {
              transform: hovered ? 'translate(3px, -3px)' : 'none',
            },
            transition: 'transform 250ms ease',
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              transform: 'none',
            },
          }}
        >
          <LinkArrow />
        </Box>
      </Box>
    </Box>
  );
}
