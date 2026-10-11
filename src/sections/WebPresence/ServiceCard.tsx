import Box from '@mui/material/Box';
import { useId } from 'react';
import WebPresencePreview from './WebPresencePreview';
import ServiceCardContent from './ServiceCardContent';
import type { WebService } from './services';

const fluidGradientSx = {
  content: '""',
  position: 'absolute',
  zIndex: -1,
  inset: '-45%',
  opacity: 0,
  pointerEvents: 'none',
  background:
    'radial-gradient(ellipse at 28% 68%, #ffc397a6 0%, transparent 34%), radial-gradient(ellipse at 78% 72%, #9854d77a 0%, transparent 42%), radial-gradient(ellipse at 80% 25%, #ffaf8270 0%, transparent 38%), linear-gradient(145deg, #302237, #17131d 65%)',
  backgroundSize: '140% 140%',
  backgroundPosition: '0% 50%',
  transition: 'opacity 450ms ease',
  '@media (hover: hover)': {
    animation: 'service-fluid-drift 12s ease-in-out infinite alternate',
    '@keyframes service-fluid-drift': {
      '0%': { backgroundPosition: '0% 50%', transform: 'rotate(0deg) scale(1)' },
      '50%': { backgroundPosition: '55% 0%', transform: 'rotate(8deg) scale(1.08)' },
      '100%': { backgroundPosition: '100% 65%', transform: 'rotate(-5deg) scale(1.03)' },
    },
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
};

export default function ServiceCard({
  service,
  index,
}: {
  service: WebService;
  index: number;
}) {
  const wide = index === 1 || index === 4;
  const detailsId = useId();
  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        height: '100%',
        minWidth: 0,
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 3,
        border: '1px solid',
        borderImage: 'none',
        borderColor: '#ebe8de20',
        background: 'linear-gradient(145deg, #141415e6, #0d1010f5)',
        boxShadow: 'inset 0 1px 0 #ffffff06',
        display: wide ? { xs: 'flex', lg: 'grid' } : 'flex',
        gridTemplateColumns: wide
          ? index === 4
            ? 'minmax(0, 1fr) 100px'
            : 'minmax(0, 1.2fr) minmax(0, 1fr)'
          : undefined,
        alignItems: wide ? { lg: 'center' } : undefined,
        flexDirection: 'column',
        gap: 3,
        '&::before': fluidGradientSx,
        '@media (hover: hover)': {
          '&:hover': {
            '&::before': { opacity: 1 },
          },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '&::before': { animation: 'none', transition: 'none' },
        },
      }}
    >
      <Box aria-hidden="true" sx={{ display: 'none' }} />
      <ServiceCardContent
        service={service}
        index={index}
        featured={false}
        showDetails
        detailsId={detailsId}
      />
      <Box
        sx={{ mt: wide ? { xs: 'auto', lg: 0 } : 'auto', pt: 0.5, minWidth: 0 }}
      >
        <WebPresencePreview kind={index} />
      </Box>
    </Box>
  );
}
