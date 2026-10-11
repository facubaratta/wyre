import Box from '@mui/material/Box';
import type { CSSProperties } from 'react';
import { SUBSTRATE, VIEWBOX_WIDTH } from '../geometry';
import { SvgDefinitions } from './SvgDefinitions';
import { CircuitTraces } from './CircuitTraces';
import { CircuitDetails } from './CircuitDetails';
import { PacketLights, SurfaceLights, SpillLights } from './PacketLights';

const glyphStyle = {
  position: 'relative',
  display: 'inline-block',
  lineHeight: 0,
  marginLeft: '.045em',
  marginRight: '-.045em',
  letterSpacing: 0,
} satisfies CSSProperties;

const svgStyle = {
  width: `${VIEWBOX_WIDTH / 1000}em`,
  height: '1em',
  // The SVG baseline is 846.5 of its 1000 units; expose it to inline layout.
  verticalAlign: '-0.1535em',
  overflow: 'visible',
} satisfies CSSProperties;

interface YGlyphProps {
  id: string;
  compact?: boolean;
}

export function YGlyph({ id, compact = false }: YGlyphProps) {
  return (
    <Box
      component="span"
      style={{ ...glyphStyle, lineHeight: compact ? 1 : 0 }}
    >
      {compact ? (
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            background: 'var(--brand-gradient)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          y
        </Box>
      ) : (
        <svg
          aria-hidden="true"
          data-logo-svg
          viewBox="0 0 556.152 1000"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          style={svgStyle}
        >
          <SvgDefinitions id={id} />
          <g clipPath={`url(#${id}-glyph)`}>
            <text
              x="0"
              y="846.5"
              fontFamily="Arial,Helvetica,sans-serif"
              fontSize="1000"
              fontWeight="700"
              fill={SUBSTRATE}
            >
              y
            </text>
            <text
              x="0"
              y="846.5"
              fontFamily="Arial,Helvetica,sans-serif"
              fontSize="1000"
              fontWeight="700"
              fill="none"
              stroke={`url(#${id}-brand)`}
              strokeWidth="1.5"
              opacity={0.65}
            >
              y
            </text>
            <CircuitTraces id={id} />
            <CircuitDetails id={id} />
            <SurfaceLights id={id} />
            <PacketLights id={id} />
          </g>
          <SpillLights id={id} />
        </svg>
      )}
    </Box>
  );
}
