import Box from '@mui/material/Box';
import { BRAND_STOPS } from '../../colors';
import { YGlyphSvg } from './YGlyphSvg';

export function CompactYGlyph({ id }: { id: string }) {
  return (
    <>
      {/* This zero-height inline box anchors the drawing to the text baseline. */}
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          position: 'relative',
          width: 0,
          height: 0,
          verticalAlign: 'baseline',
        }}
      >
        <YGlyphSvg
          style={{ position: 'absolute', left: 0, bottom: '-0.1535em' }}
        >
          <defs>
            <linearGradient
              id={`${id}-compact-brand`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              {BRAND_STOPS.map(({ offset, color }) => (
                <stop key={offset} offset={offset} stopColor={color} />
              ))}
            </linearGradient>
          </defs>
          <text
            x="0"
            y="846.5"
            fontFamily="Arial,Helvetica,sans-serif"
            fontSize="1000"
            fontWeight="700"
            fill="none"
            stroke={`url(#${id}-compact-brand)`}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            y
          </text>
        </YGlyphSvg>
      </Box>
      {/* Native text retains the original width and baseline in the wordmark. */}
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>
        y
      </span>
    </>
  );
}
