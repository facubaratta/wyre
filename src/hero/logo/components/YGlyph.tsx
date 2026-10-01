import Box from '@mui/material/Box';
import type { CSSProperties } from 'react';
import useControlState from '../../../useControlState';
import { AccentColorHint } from './AccentColorHint';
import { SUBSTRATE } from '../geometry';
import { SvgDefinitions } from './SvgDefinitions';
import { CircuitTraces } from './CircuitTraces';
import { CircuitDetails } from './CircuitDetails';
import { PacketLights, SurfaceLights, SpillLights } from './PacketLights';

const ACCENT_COLORS = ['#c2a27b', '#35d0ba', '#43a5ff', '#a77bff', '#ff6f91'];

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
  transform: 'translateY(-2px)',
  marginLeft: '.045em',
  marginRight: '-.045em',
  letterSpacing: 0,
} satisfies CSSProperties;

const svgStyle = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  overflow: 'visible',
} satisfies CSSProperties;

interface YGlyphProps {
  id: string;
  accent?: string;
  showAccentHint?: boolean;
  onAccentChange?: (color: string) => void;
}

export function YGlyph({
  id,
  accent,
  onAccentChange,
  showAccentHint = false,
}: YGlyphProps) {
  const { focusVisible, events } = useControlState();
  const currentColorIndex = ACCENT_COLORS.indexOf(accent ?? '');
  const nextColor =
    ACCENT_COLORS[(currentColorIndex + 1) % ACCENT_COLORS.length];
  return (
    <Box component="span" style={glyphStyle}>
      <span
        aria-hidden="true"
        style={{ display: 'block', visibility: 'hidden' }}
      >
        y
      </span>
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
            opacity=".65"
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
      {onAccentChange && <AccentColorHint visible={showAccentHint} />}
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
