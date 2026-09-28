import { Fragment } from 'react';
import { ROUTES } from '../geometry';

export function CircuitTraces({ id }: { id: string }) {
  return (
    <g>
      {ROUTES.map((_, i) => (
        <Fragment key={i}>
          <use href={`#${id}-route-${i}`} fill="none" stroke="#74e0f2" strokeWidth="12" strokeLinecap="butt" strokeLinejoin="round" opacity=".36" filter={`url(#${id}-diffusion)`} />
          <use href={`#${id}-route-${i}`} fill="none" stroke="#74e0f2" strokeWidth="6.5" strokeLinecap="butt" strokeLinejoin="round" />
        </Fragment>
      ))}
    </g>
  );
}
