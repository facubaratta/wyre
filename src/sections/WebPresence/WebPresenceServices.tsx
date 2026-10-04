import Box from '@mui/material/Box';
import ServiceCard from './ServiceCard';
import { services } from './services';

const rows = [
  { indices: [0, 2, 3], columns: 'repeat(3, minmax(0, 1fr))' },
  { indices: [1, 4], columns: 'minmax(0, 2fr) minmax(0, 1fr)' },
];

export default function WebPresenceServices() {
  return (
    <Box
      sx={{ mt: { xs: 4, sm: 6 }, display: 'grid', gap: { xs: 2.5, sm: 3 } }}
    >
      {rows.map(({ indices, columns }) => (
        <Box
          key={indices.join('-')}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: columns,
            },
            gap: { xs: 2.5, sm: 3 },
          }}
        >
          {indices.map((index, offset) => (
            <Box
              key={services[index].title}
              sx={{
                minWidth: 0,
                height: '100%',
                gridColumn:
                  indices.length === 3 && offset === 2
                    ? { sm: 'span 2', lg: 'auto' }
                    : 'auto',
              }}
            >
              <ServiceCard service={services[index]} index={index} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
