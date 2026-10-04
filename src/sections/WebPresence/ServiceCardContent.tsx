import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ServiceInterestLink from './ServiceInterestLink';
import ServiceDetailsReveal from './ServiceDetailsReveal';
import type { WebService } from './services';

export default function ServiceCardContent({
  service,
  index,
  featured,
  drawing,
  showDetails,
  detailsId,
  onExpand,
}: {
  service: WebService;
  index: number;
  featured: boolean;
  drawing?: ReactNode;
  showDetails: boolean;
  detailsId: string;
  onExpand?: () => void;
}) {
  const { title, description, label } = service;
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        sx={{
          mb: 1.5,
          fontSize: 11,
          letterSpacing: '.14em',
          fontWeight: 600,
          color: 'var(--accent)',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Typography
          component="h3"
          sx={{
            minWidth: 0,
            maxWidth: '24ch',
            fontSize: {
              xs: 23,
              sm: featured ? 32 : 25,
            },
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: '-.03em',
          }}
        >
          {title}
        </Typography>
        <ServiceInterestLink
          service={title}
          interest={index}
          onExpand={onExpand}
          detailsId={detailsId}
        />
      </Box>
      <ServiceDetailsReveal open={showDetails} id={detailsId}>
        <Box
          sx={{
            mt: 1.5,
            display: drawing ? 'flex' : 'block',
            flexDirection: drawing ? 'row-reverse' : undefined,
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            component="p"
            sx={{
              flex: 1,
              minWidth: 0,
              maxWidth: '46ch',
              fontSize: 15,
              lineHeight: 1.7,
              color: 'text.secondary',
            }}
          >
            {description}
          </Typography>
          {drawing && (
            <Box
              sx={{
                width: 90,
                flexShrink: 0,
                opacity: showDetails ? 1 : 0,
                transform: showDetails ? 'translateY(0)' : 'translateY(12px)',
                transition:
                  'opacity 300ms ease 80ms, transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 80ms',
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              }}
            >
              {drawing}
            </Box>
          )}
        </Box>
      </ServiceDetailsReveal>
    </Box>
  );
}
