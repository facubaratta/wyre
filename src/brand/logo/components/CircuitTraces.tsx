import { Fragment } from 'react';
import { ROUTES } from '../geometry';

export function CircuitTraces({ id }: { id: string }) {
  return (
    <g>
      {ROUTES.map((_, i) => (
        <Fragment key={i}>
          <use
            href={`#${id}-route-${i}`}
            fill="none"
            stroke={`url(#${id}-brand)`}
            strokeWidth="12"
            strokeLinecap="butt"
            strokeLinejoin="round"
            opacity=".36"
            filter={`url(#${id}-diffusion)`}
          />
          <use
            href={`#${id}-route-${i}`}
            fill="none"
            stroke={`url(#${id}-brand)`}
            strokeWidth="6.5"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
        </Fragment>
      ))}
    </g>
  );
}
