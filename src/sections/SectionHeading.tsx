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
        gap: { xs: 1.5, sm: 2 },
        fontSize: {
          xs: 'clamp(26px, 7vw, 32px)',
          sm: 'clamp(36px, 3.6vw, 48px)',
        },
        fontWeight: 600,
        letterSpacing: '-.035em',
        lineHeight: 1.2,
        '@media (max-height:500px)': { fontSize: '28px', gap: 1.5 },
      }}
    >
      <Box
        id={`section-${icon}`}
        sx={{
          opacity: hidden ? 0 : 1,
          width: { xs: 30, sm: 36 },
          height: { xs: 30, sm: 36 },
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
        {typeof children === 'string'
          ? children.split(' ').map((word, index, words) => (
              <Box
                component="span"
                key={index}
                sx={
                  index === words.length - 1
                    ? {
                        background: 'var(--brand-gradient)',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }
                    : undefined
                }
              >
                {index > 0 ? ' ' : ''}
                {word}
              </Box>
            ))
          : children}
      </Box>
    </Typography>
  );
}
