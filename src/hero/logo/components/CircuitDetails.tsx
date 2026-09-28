import { BRANCHES, CONTACT_FIELDS, CYAN, ROUTES, SERVICE_STRIPS, SIDE_PORTS, SUBSTRATE, TEST_POINTS } from '../geometry';

export function CircuitDetails({ id }: { id: string }) {
  return (
    <g>
      {SERVICE_STRIPS.map((strip, i) => (
        <g key={`strip-${i}`} transform={`translate(${strip.x} ${strip.y}) rotate(${strip.angle})`}>
          <path d={`M-4 ${-strip.height / 2} V${strip.height / 2} H4`} fill="none" stroke={CYAN} strokeWidth="1.6" />
          <circle cx="-4" cy={-strip.height / 2} r="2.4" fill={CYAN} />
          {[0, 1, 2].map(k => <path key={k} d={`M-4 ${-strip.height / 2 + 10 + k * 8}h${k === 0 ? 9 : 5}`} stroke={CYAN} strokeWidth="1.5" />)}
          {[0, 1, 2].map(k => <rect key={`led-${k}`} data-status={`${i}-${k}`} x="-3" y={strip.height / 2 - 22 + k * 6} width="6" height="2" fill="#85ecf8" filter={`url(#${id}-point-glow)`} opacity=".16" />)}
        </g>
      ))}
      {BRANCHES.map((branch, i) => (
        <g key={`branch-${i}`}>
          <path data-branch={i} d={branch.d} pathLength="1" fill="none" stroke={CYAN} strokeWidth={branch.major ? 3 : 2.2} opacity={branch.major ? .75 : .5} strokeLinejoin="round" strokeLinecap="butt" />
          <circle cx={branch.end[0]} cy={branch.end[1]} r={branch.major ? 4.8 : 3.5} fill={SUBSTRATE} stroke={CYAN} strokeWidth="2" />
          <circle data-branch-source={i} r="2.1" fill={CYAN} />
        </g>
      ))}
      {SIDE_PORTS.map((port, i) => (
        <g key={`port-${i}`} transform={`translate(${port.x} ${port.y}) rotate(${port.angle})`}>
          <path d="M-6 -10 V10" stroke={CYAN} strokeWidth="2" />
          {[0, 1, 2].map(k => <rect key={k} x="-6" y={-8 + k * 6} width="8" height="2" fill={CYAN} />)}
        </g>
      ))}
      {CONTACT_FIELDS.map(([x, y, angle], i) => (
        <g key={`contact-${i}`} transform={`translate(${x} ${y}) rotate(${angle})`}>
          {[0, 1, 2].map(k => <rect key={k} x={k * 5} y="0" width="2" height={k === 0 ? 7 : 4} fill={CYAN} opacity=".65" />)}
        </g>
      ))}
      {TEST_POINTS.map((_, i) => (
        <g key={`test-${i}`} data-test-point={i} opacity="0">
          <circle r="5.3" fill={SUBSTRATE} stroke={CYAN} strokeWidth="1.6" />
          <circle r="2" fill={CYAN} />
        </g>
      ))}
      {ROUTES.map((_, i) => <rect key={`cut-${i}`} data-cut-contact={i} y="330" width="4.2" height="4" fill="#90bde9" opacity=".7" />)}
    </g>
  );
}
