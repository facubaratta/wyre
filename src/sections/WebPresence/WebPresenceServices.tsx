import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ServiceReveal from './ServiceReveal';
import { services } from './services';

export default function WebPresenceServices() {
  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 9 },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        columnGap: { md: 8 },
        rowGap: { xs: 4, sm: 5 },
      }}
    >
      {services.map(({ title, description }, index) => (
        <ServiceReveal key={title} index={index}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 24, sm: 30 },
              fontWeight: 500,
              letterSpacing: '-.025em',
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{
              mt: 2,
              fontSize: { xs: 16, sm: 20 },
              lineHeight: 1.65,
              color: 'text.secondary',
            }}
          >
            {description}
          </Typography>
        </ServiceReveal>
      ))}
    </Box>
  );
}
