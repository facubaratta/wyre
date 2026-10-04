import Box from '@mui/material/Box';
import ServiceCard from './ServiceCard';
import { services } from './services';

const serviceOrder = [0, 2, 3, 1, 4];

export default function WebPresenceServices() {
  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 6 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(3, minmax(0, 1fr))',
        },
        gap: { xs: 2.5, sm: 3 },
      }}
    >
      {serviceOrder.map((index) => (
        <Box
          key={services[index].title}
          sx={{
            minWidth: 0,
            height: '100%',
            gridColumn: {
              xs: 'auto',
              sm: index === 3 ? 'span 2' : 'auto',
              lg: index === 1 ? 'span 2' : 'auto',
            },
          }}
        >
          <ServiceCard service={services[index]} index={index} />
        </Box>
      ))}
    </Box>
  );
}
