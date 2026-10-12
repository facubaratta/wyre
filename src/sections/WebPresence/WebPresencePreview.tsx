import LandingPreview from './previews/LandingPreview';
import CustomFeaturesPreview from './previews/CustomFeaturesPreview';
import CompanyPreview from './previews/CompanyPreview';
import CommercePreview from './previews/CommercePreview';
import MobilePreview from './previews/MobilePreview';
import { useId } from 'react';
import BrandGradient from '../../brand/BrandGradient';
import Box from '@mui/material/Box';

/** Decorative interface sketches; service names remain the accessible labels. */
export default function WebPresencePreview({ kind }: { kind: number }) {
  const gradientId = `brand-${useId().replace(/:/g, '')}`;
  const surfaceId = `${gradientId}-surface`;
  const tileId = `${gradientId}-tile`;
  const paints = { gradientId, surfaceId, tileId };
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: '100%',
        maxWidth: kind === 4 ? 120 : 340,
        filter: 'drop-shadow(0 0 9px #e89ac42e)',
        transform:
          kind === 4 ? 'rotate(3deg)' : 'perspective(700px) rotateY(-4deg)',
        mx: 'auto',
      }}
    >
      <svg
        viewBox={kind === 4 ? '75 0 90 150' : '0 0 240 150'}
        fill="none"
        width="100%"
        style={{ display: 'block' }}
      >
        <BrandGradient id={gradientId} />
        <defs>
          <linearGradient id={surfaceId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#56404e" />
            <stop offset=".35" stopColor="#19171e" />
            <stop offset="1" stopColor="#0d1012" />
          </linearGradient>
          <linearGradient id={tileId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffc397" stopOpacity=".25" />
            <stop offset="1" stopColor="#bb7bf1" stopOpacity=".18" />
          </linearGradient>
        </defs>
        {kind === 4 ? (
          <MobilePreview {...paints} />
        ) : (
          <>
            <rect
              x="8"
              y="15"
              width="224"
              height="126"
              rx="8"
              fill={`url(#${surfaceId})`}
              stroke={`url(#${gradientId})`}
              strokeOpacity=".9"
            />
            <path
              d="M8 35h224"
              stroke={`url(#${gradientId})`}
              strokeOpacity=".2"
            />
            {[19, 27, 35].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="25"
                r="2"
                fill={`url(#${gradientId})`}
                fillOpacity=".9"
              />
            ))}
            <rect
              x="83"
              y="22"
              width="80"
              height="6"
              rx="3"
              fill="#ebe8de"
              fillOpacity=".22"
            />
            {kind === 0 && <LandingPreview {...paints} />}
            {kind === 1 && <CustomFeaturesPreview {...paints} />}
            {kind === 2 && <CompanyPreview {...paints} />}
            {kind === 3 && <CommercePreview {...paints} />}
          </>
        )}
      </svg>
    </Box>
  );
}
