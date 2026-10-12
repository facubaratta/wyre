import FadeIn from '../../scroll/FadeIn';
import { useLanguage } from '../../i18n/LanguageContext';
import Box from '@mui/material/Box';
import ServiceCard from './ServiceCard';
import { services as localizedServices } from './services';

const serviceOrder = [0, 2, 3, 4];

export default function WebPresenceServices() {
  const { language } = useLanguage();
  const services = localizedServices[language];
  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 6 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
        gap: { xs: 2, sm: 2.5 },
      }}
    >
      {serviceOrder.map((index) => (
        <FadeIn
          key={index}
          sx={{
            minWidth: 0,
            height: '100%',
          }}
        >
          <ServiceCard service={services[index]} index={index} />
        </FadeIn>
      ))}
    </Box>
  );
}
