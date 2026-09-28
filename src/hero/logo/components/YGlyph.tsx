import { SUBSTRATE } from '../geometry';
import { SvgDefinitions } from './SvgDefinitions';
import { CircuitTraces } from './CircuitTraces';
import { CircuitDetails } from './CircuitDetails';
import { PacketLights, SurfaceLights, SpillLights } from './PacketLights';

export function YGlyph({ id }: { id: string }) {
  return (
    <span aria-hidden="true" style={{ position: 'relative', marginLeft: '.045em', marginRight: '-.045em', letterSpacing: 0 }}>
      <span style={{ display: 'block', visibility: 'hidden' }}>y</span>
      <svg data-logo-svg viewBox="0 0 556.152 1000" xmlns="http://www.w3.org/2000/svg" focusable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <SvgDefinitions id={id} />
        <g clipPath={`url(#${id}-glyph)`}>
          <text x="0" y="846.5" fontFamily="Arial,Helvetica,sans-serif" fontSize="1000" fontWeight="700" fill={SUBSTRATE}>y</text>
          <text x="0" y="846.5" fontFamily="Arial,Helvetica,sans-serif" fontSize="1000" fontWeight="700" fill="none" stroke="#6ca0c8" strokeWidth="1.5" opacity=".65">y</text>
          <CircuitTraces id={id} />
          <CircuitDetails id={id} />
          <SurfaceLights id={id} />
          <PacketLights id={id} />
        </g>
        <SpillLights id={id} />
      </svg>
    </span>
  );
}
