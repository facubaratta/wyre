import { useId } from 'react';
import BrandGradient from '../../brand/BrandGradient';
import Box from '@mui/material/Box';

/** Decorative interface sketches; service names remain the accessible labels. */
export default function WebPresencePreview({ kind }: { kind: number }) {
  const gradientId = `brand-${useId().replace(/:/g, '')}`;
  const surfaceId = `${gradientId}-surface`;
  const tileId = `${gradientId}-tile`;
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: '100%',
        maxWidth: kind === 4 ? 105 : 340,
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
          <>
            <rect
              x="83"
              y="5"
              width="74"
              height="140"
              rx="15"
              fill={`url(#${surfaceId})`}
              stroke={`url(#${gradientId})`}
              strokeOpacity=".8"
            />
            <path
              d="M109 15h22"
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect
              x="94"
              y="31"
              width="52"
              height="44"
              rx="6"
              fill={`url(#${gradientId})`}
              fillOpacity=".3"
            />
            <circle cx="120" cy="53" r="10" stroke={`url(#${gradientId})`} />
            <path d="m116 53 3 3 6-7" stroke={`url(#${gradientId})`} />
            <path
              d="M95 88h39M95 97h28M95 106h35"
              stroke="#ebe8de"
              strokeOpacity=".4"
              strokeLinecap="round"
            />
            <rect
              x="94"
              y="119"
              width="52"
              height="13"
              rx="4"
              fill={`url(#${gradientId})`}
              fillOpacity=".95"
            />
          </>
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
            {kind === 0 && (
              <>
                <path
                  d="M24 56h38"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M24 73h79M24 84h65"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="5"
                  strokeOpacity=".95"
                  strokeLinecap="round"
                />
                <path
                  d="M24 100h72M24 107h50"
                  stroke="#ebe8de"
                  strokeOpacity=".3"
                  strokeLinecap="round"
                />
                <rect
                  x="24"
                  y="118"
                  width="43"
                  height="10"
                  rx="3"
                  fill={`url(#${gradientId})`}
                />
                <rect
                  x="131"
                  y="49"
                  width="85"
                  height="78"
                  rx="5"
                  fill={`url(#${gradientId})`}
                  fillOpacity=".22"
                />
                <circle
                  cx="174"
                  cy="88"
                  r="25"
                  stroke={`url(#${gradientId})`}
                  strokeOpacity=".9"
                />
                <ellipse
                  cx="174"
                  cy="88"
                  rx="11"
                  ry="25"
                  stroke={`url(#${gradientId})`}
                  strokeOpacity=".9"
                />
                <path
                  d="M149 88h50M153 75h42M153 101h42"
                  stroke={`url(#${gradientId})`}
                  strokeOpacity=".9"
                />
              </>
            )}
            {kind === 1 && (
              <>
                <rect
                  x="22"
                  y="49"
                  width="47"
                  height="78"
                  rx="4"
                  fill={`url(#${gradientId})`}
                  fillOpacity=".22"
                />
                <path
                  d="M31 61h28M31 73h20M31 85h24"
                  stroke={`url(#${gradientId})`}
                  strokeOpacity=".8"
                  strokeLinecap="round"
                />
                <rect
                  x="82"
                  y="49"
                  width="135"
                  height="18"
                  rx="4"
                  fill={`url(#${gradientId})`}
                  fillOpacity=".14"
                />
                {[80, 101, 122].map((y) => (
                  <g key={y}>
                    <circle
                      cx="90"
                      cy={y}
                      r="4"
                      stroke={`url(#${gradientId})`}
                    />
                    <path
                      d={`M103 ${y}h66`}
                      stroke="#ebe8de"
                      strokeOpacity=".9"
                    />
                    <path
                      d={`m199 ${y} 3 3 6-6`}
                      stroke={`url(#${gradientId})`}
                    />
                  </g>
                ))}
              </>
            )}
            {kind === 2 && (
              <>
                <rect
                  x="22"
                  y="49"
                  width="72"
                  height="62"
                  rx="5"
                  fill={`url(#${tileId})`}
                  stroke="#e89ac433"
                />
                <circle cx="40" cy="64" r="3" fill="#ffc397" />
                <path
                  d="m29 101 20-27 13 17 12-20 14 30Z"
                  fill={`url(#${gradientId})`}
                  fillOpacity=".65"
                />
                <path
                  d="M108 54h91M108 69h76M108 83h86M108 97h59"
                  stroke="#ebe8de"
                  strokeOpacity=".3"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <rect
                  x="22"
                  y="121"
                  width="88"
                  height="11"
                  rx="3"
                  stroke="#e89ac44d"
                />
                <rect
                  x="124"
                  y="121"
                  width="88"
                  height="11"
                  rx="3"
                  stroke="#e89ac44d"
                />
              </>
            )}
            {kind === 3 && (
              <>
                {[23, 90, 157].map((x) => (
                  <g key={x}>
                    <rect
                      x={x}
                      y="49"
                      width="60"
                      height="56"
                      rx="4"
                      fill={`url(#${gradientId})`}
                      fillOpacity=".25"
                    />
                    <path
                      d={`m${x + 19} 68 11-6 11 6v16l-11 6-11-6Z M${x + 19} 68l11 6 11-6 M${x + 30} 74v16`}
                      stroke={`url(#${gradientId})`}
                      strokeOpacity=".9"
                    />
                    <path
                      d={`M${x} 115h30`}
                      stroke="#ebe8de"
                      strokeOpacity=".8"
                    />
                    <rect
                      x={x + 40}
                      y="112"
                      width="20"
                      height="9"
                      rx="3"
                      fill={`url(#${gradientId})`}
                      fillOpacity=".9"
                    />
                  </g>
                ))}
              </>
            )}
          </>
        )}
      </svg>
    </Box>
  );
}
