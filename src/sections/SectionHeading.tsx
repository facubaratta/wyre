import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SectionIconGraphic from '../brand/SectionIconGraphic';

export default function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
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
        id="section-globe"
        sx={{
          width: { xs: 30, sm: 36 },
          height: { xs: 30, sm: 36 },
          flexShrink: 0,
          '@media (max-height:500px)': { width: 28, height: 28 },
        }}
      >
        <SectionIconGraphic />
      </Box>
      <Box
        component="span"
        id="section-title-web"
        sx={{
          display: 'block',
          textBoxTrim: 'trim-both',
          textBoxEdge: 'cap alphabetic',
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
