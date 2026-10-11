import { Box, Button } from '@mui/material';
import SectionIconGraphic, {
  type SectionIcon,
} from '../brand/SectionIconGraphic';
import { useLanguage } from '../i18n/LanguageContext';

export default function SectionNavigation() {
  const { copy } = useLanguage();
  const links: [string, string, SectionIcon][] = [
    [copy.heroDesign.pillars[0], '#presencia-web', 'globe'],
    [copy.heroDesign.pillars[1], '#decisiones-humanas', 'brain'],
    [copy.heroDesign.pillars[2], '#crecimiento-real', 'growth'],
  ];

  return (
    <Box
      component="nav"
      aria-label={copy.navigation.label}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 0, sm: 0.5, md: 1 },
        flex: 1,
        minWidth: 0,
      }}
    >
      {links.map(([label, href, icon]) => (
        <Button
          key={href}
          component="a"
          href={href}
          aria-label={label}
          sx={{
            minHeight: 40,
            minWidth: { xs: 34, sm: 'auto' },
            px: { xs: 0.5, sm: 1 },
            gap: 0.75,
            color: 'text.primary',
            textTransform: 'none',
            fontSize: { xs: 0, sm: 12, md: 14 },
            whiteSpace: 'nowrap',
          }}
        >
          <Box sx={{ width: 18, height: 18 }}>
            <SectionIconGraphic icon={icon} />
          </Box>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            {label}
          </Box>
        </Button>
      ))}
    </Box>
  );
}
