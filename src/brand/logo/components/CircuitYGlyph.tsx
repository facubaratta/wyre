import { SvgDefinitions } from './SvgDefinitions';
import { CircuitTraces } from './CircuitTraces';
import { CircuitDetails } from './CircuitDetails';
import { PacketLights, SurfaceLights, SpillLights } from './PacketLights';
import { YGlyphSvg } from './YGlyphSvg';

export function CircuitYGlyph({ id }: { id: string }) {
  return (
    <YGlyphSvg data-logo-svg>
      <SvgDefinitions id={id} />
      <g clipPath={`url(#${id}-glyph)`}>
        <text
          x="0"
          y="846.5"
          fontFamily="Arial,Helvetica,sans-serif"
          fontSize="1000"
          fontWeight="700"
          fill="none"
          stroke={`url(#${id}-brand)`}
          strokeWidth="2"
          opacity={0.24}
        >
          y
        </text>
        <CircuitTraces id={id} />
        <CircuitDetails id={id} />
        <g opacity={0.22}>
          <SurfaceLights id={id} />
        </g>
        <PacketLights id={id} />
      </g>
      <g opacity={0.28}>
        <SpillLights id={id} />
      </g>
    </YGlyphSvg>
  );
}
