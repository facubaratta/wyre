import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useId, useState } from 'react';
import WebPresencePreview from './WebPresencePreview';
import ServiceCardContent from './ServiceCardContent';
import ServiceDetailsReveal from './ServiceDetailsReveal';
import type { WebService } from './services';

export default function ServiceCard({
  service,
  index,
}: {
  service: WebService;
  index: number;
}) {
  const featured = index === 0;
  const horizontal = index === 1;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const showDetails = !mobile || expanded;
  return (
    <Box
      sx={{
        minWidth: 0,
        height: '100%',
      }}
    >
      <Box component="article" sx={{ height: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              backgroundColor: '#0000004e',
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 200ms ease',
            },
            '& > *': { position: 'relative' },
            '@media (hover: hover)': {
              '&:hover::before': { opacity: 1 },
            },
            '@media (prefers-reduced-motion: reduce)': {
              '&::before': { transition: 'none' },
            },
            height: '100%',
            minHeight: { sm: 100 },
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: featured
              ? 'rgba(243,183,151,.65)'
              : 'rgba(235,232,222,.1)',
            background: featured
              ? 'linear-gradient(120deg, rgba(187,123,241,.16), rgba(232,154,196,.1), rgba(255,195,151,.12))'
              : 'rgba(235,232,222,.025)',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2.5, sm: 3 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              minWidth: 0,
              height: '100%',
              flexDirection: horizontal
                ? { xs: 'column', lg: 'row-reverse' }
                : 'column',
              alignItems: horizontal
                ? { xs: 'stretch', lg: 'center' }
                : 'stretch',
              gap: { xs: 0, sm: 3 },
            }}
          >
            <ServiceCardContent
              service={service}
              index={index}
              featured={featured}
              showDetails={showDetails}
              detailsId={detailsId}
              onExpand={!showDetails ? () => setExpanded(true) : undefined}
              drawing={
                index === 4 ? <WebPresencePreview kind={index} /> : undefined
              }
            />
            {index !== 4 && (
              <Box
                sx={{
                  width: horizontal ? { xs: '100%', lg: '35%' } : '100%',
                  flexShrink: 0,
                  mt: horizontal ? { xs: 'auto', lg: 0 } : 'auto',
                }}
              >
                <ServiceDetailsReveal open={showDetails} delay={80}>
                  <Box sx={{ pt: { xs: 2.5, sm: 0 } }}>
                    <WebPresencePreview kind={index} />
                  </Box>
                </ServiceDetailsReveal>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
