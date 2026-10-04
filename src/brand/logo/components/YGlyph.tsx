import Box from '@mui/material/Box';
import type { CSSProperties } from 'react';
import useControlState from '../../../controls/useControlState';
import { SUBSTRATE, VIEWBOX_WIDTH } from '../geometry';
import { SvgDefinitions } from './SvgDefinitions';
import { CircuitTraces } from './CircuitTraces';
import { CircuitDetails } from './CircuitDetails';
import { PacketLights, SurfaceLights, SpillLights } from './PacketLights';

const ACCENT_COLORS = ['#2a2acb', '#35d0ba', '#43a5ff', '#a77bff', '#ff6f91'];

const buttonSx = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  background: 'transparent',
  cursor: 'pointer',
  p: 0,
  border: 0,
  borderRadius: '3px',
  outlineOffset: '4px',
};

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
  accent?: string;
  onAccentChange?: (color: string) => void;
}

export function YGlyph({
  id,
  accent,
  onAccentChange,
  compact = false,
}: YGlyphProps) {
  const { focusVisible, events } = useControlState();
  const currentColorIndex = ACCENT_COLORS.indexOf(accent ?? '');
  const nextColor =
    ACCENT_COLORS[(currentColorIndex + 1) % ACCENT_COLORS.length];
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
            color: 'var(--accent-light)',
            WebkitTextStroke: '0.0015em var(--accent-bright)',
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
              stroke="var(--accent)"
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
      {onAccentChange && (
        <Box
          component="button"
          type="button"
          aria-label="Change accent color"
          title="Change accent color"
          onClick={() => onAccentChange(nextColor)}
          {...events}
          sx={{
            ...buttonSx,
            outline: focusVisible ? '2px solid var(--accent-light)' : 'none',
          }}
        />
      )}
    </Box>
  );
}
