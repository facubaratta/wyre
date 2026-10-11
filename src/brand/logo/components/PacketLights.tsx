import { Fragment } from 'react';
import { BRANCHES, ROUTES, SIDE_PORTS } from '../geometry';

export function SurfaceLights({ id }: { id: string }) {
  return (
    <g style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}>
      {ROUTES.map((route, i) => (
        <Fragment key={i}>
          <circle
            data-packet-light={i}
            r={route.sideExit ? 73 : 95}
            fill={`url(#${id}-packet-light)`}
            opacity="0"
          />
          <circle
            data-packet-wake={i}
            r={route.sideExit ? 55 : 73}
            fill={`url(#${id}-packet-light)`}
            opacity="0"
          />
        </Fragment>
      ))}
      {BRANCHES.map((branch, i) => (
        <circle
          key={i}
          data-branch-light={i}
          r={branch.major ? 43 : 30}
          fill={`url(#${id}-packet-light)`}
          opacity="0"
        />
      ))}
    </g>
  );
}

export function PacketLights({ id }: { id: string }) {
  const glow = `url(#${id}-point-glow)`;
  return (
    <g>
      {ROUTES.map((_, i) => (
        <Fragment key={i}>
          <use
            data-packet-trail={i}
            href={`#${id}-route-${i}`}
            fill="none"
            stroke={`url(#${id}-brand)`}
            strokeWidth="13"
            strokeLinecap="butt"
            strokeLinejoin="round"
            filter={`url(#${id}-diffusion)`}
            opacity="0"
          />
          <use
            data-packet-head={i}
            href={`#${id}-route-${i}`}
            fill="none"
            stroke={`url(#${id}-brand)`}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
          <circle
            data-packet-dot={i}
            r="2.6"
            fill={`url(#${id}-brand)`}
            filter={glow}
            opacity="0"
          />
        </Fragment>
      ))}
      {BRANCHES.map((branch, i) => (
        <Fragment key={`branch-${i}`}>
          <path
            data-branch-flow={i}
            d={branch.d}
            pathLength="1"
            fill="none"
            stroke={`url(#${id}-brand)`}
            strokeWidth="2.8"
            strokeLinecap="round"
            filter={glow}
            opacity="0"
          />
          <circle
            data-branch-flare={i}
            cx={branch.end[0]}
            cy={branch.end[1]}
            r={branch.major ? 3.8 : 2.2}
            fill={`url(#${id}-brand)`}
            filter={glow}
            opacity="0"
          />
        </Fragment>
      ))}
      {SIDE_PORTS.map((port, i) => (
        <circle
          key={i}
          data-port-light={i}
          cx={port.x}
          cy={port.y}
          r="3.3"
          fill={`url(#${id}-brand)`}
          filter={glow}
          opacity="0"
        />
      ))}
    </g>
  );
}

export function SpillLights({ id }: { id: string }) {
  return (
    <g style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}>
      {ROUTES.map((_, i) => (
        <circle
          key={i}
          data-spill-light={i}
          style={{ willChange: 'transform, opacity' }}
          r="570"
          fill={`url(#${id}-spill-light)`}
          opacity="0"
        />
      ))}
    </g>
  );
}
