import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SectionIconGraphic, {
  type SectionIcon,
} from '../brand/SectionIconGraphic';

const getKeyForIcon = (icon: SectionIcon) => {
  switch (icon) {
    case 'globe':
      return 'web';
    case 'brain':
      return 'human';
    case 'growth':
      return 'growth';
  }
};

export default function SectionHeading({
  id,
  icon,
  children,
  hidden = false,
}: {
  id: string;
  icon: SectionIcon;
  children: React.ReactNode;
  hidden?: boolean;
}) {
  const key = getKeyForIcon(icon);
  return (
    <Typography
      component="h2"
      id={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 3 },
        fontSize: {
          xs: 'clamp(26px, 7vw, 32px)',
          sm: 'clamp(40px, 5vw, 64px)',
        },
        fontWeight: icon === 'globe' ? 600 : 500,
        letterSpacing: icon === 'globe' ? '-.035em' : '-.04em',
        lineHeight: icon === 'globe' ? 1.2 : 1.15,
        '@media (max-height:500px)': { fontSize: '28px', gap: 1.5 },
      }}
    >
      <Box
        id={`section-${icon}`}
        sx={{
          opacity: hidden ? 0 : 1,
          width: { xs: 30, sm: 52 },
          height: { xs: 30, sm: 52 },
          flexShrink: 0,
          '@media (max-height:500px)': { width: 28, height: 28 },
        }}
      >
        <SectionIconGraphic icon={icon} />
      </Box>
      <Box
        component="span"
        id={`section-title-${key}`}
        sx={{
          display: 'block',
          textBoxTrim: 'trim-both',
          textBoxEdge: 'cap alphabetic',
          opacity: hidden ? 0 : 1,
        }}
      >
        {children}
      </Box>
    </Typography>
  );
}
