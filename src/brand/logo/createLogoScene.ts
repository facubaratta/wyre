import {
  BRANCHES,
  ROUTES,
  SERVICE_STRIPS,
  SIDE_PORTS,
  TEST_POINTS,
  VIEWBOX_WIDTH,
} from './geometry';
import { samplePath } from './samplePath';
/** Finds where an attached detail receives a packet from its parent conductor. */
function attachmentDistance(
  path: SVGPathElement,
  length: number,
  x: number,
  y: number,
) {
  let at = 0;
  let best = Infinity;
  for (let distance = 0; distance < length; distance += 2) {
    const point = path.getPointAtLength(distance);
    const delta = Math.hypot(point.x - x, point.y - y);
    if (delta < best) {
      best = delta;
      at = distance;
    }
  }
  return at;
}

function position(element: SVGCircleElement, point: { x: number; y: number }) {
  element.setAttribute('cx', String(point.x));
  element.setAttribute('cy', String(point.y));
}

export function createLogoScene(root: HTMLDivElement) {
  const find = <T extends Element>(selector: string): T => {
    const element = root.querySelector<T>(selector);
    if (!element) throw new Error(`Wyre logo element missing: ${selector}`);
    return element;
  };
  const channels = ROUTES.map((route, index) => {
    const path = find<SVGPathElement>(`[data-route="${index}"]`);
    const length = path.getTotalLength();
    const trailLength = route.sideExit ? 76 : 142;
    const headLength = route.sideExit ? 23 : 43;
    const trail = find<SVGUseElement>(`[data-packet-trail="${index}"]`);
    const head = find<SVGUseElement>(`[data-packet-head="${index}"]`);
    trail.setAttribute(
      'stroke-dasharray',
      `${trailLength / length} ${1 - trailLength / length}`,
    );
    head.setAttribute(
      'stroke-dasharray',
      `${headLength / length} ${1 - headLength / length}`,
    );
    const cut = find<SVGRectElement>(`[data-cut-contact="${index}"]`);
    let tip = path.getPointAtLength(0);
    for (let distance = 0; distance < 45; distance++) {
      const point = path.getPointAtLength(distance);
      if (point.y >= 332) {
        tip = point;
        break;
      }
    }
    cut.setAttribute('x', String(tip.x - 2.1));
    return {
      ...route,
      path,
      length,
      pointAtDistance: samplePath(path, length),
      trailLength,
      headLength,
      trail,
      head,
      distance: 0,
      dot: find<SVGCircleElement>(`[data-packet-dot="${index}"]`),
      light: find<SVGCircleElement>(`[data-packet-light="${index}"]`),
      wake: find<SVGCircleElement>(`[data-packet-wake="${index}"]`),
      spill: find<SVGCircleElement>(`[data-spill-light="${index}"]`),
    };
  });
  const circuits = BRANCHES.map((branch, index) => {
    const path = find<SVGPathElement>(`[data-branch="${index}"]`);
    const length = path.getTotalLength();
    const source = path.getPointAtLength(0);
    position(find<SVGCircleElement>(`[data-branch-source="${index}"]`), source);
    const parent = channels[branch.route];
    const at = attachmentDistance(
      parent.path,
      parent.length,
      source.x,
      source.y,
    );
    const flow = find<SVGPathElement>(`[data-branch-flow="${index}"]`);
    const segment = branch.major ? 24 : 16;
    flow.setAttribute(
      'stroke-dasharray',
      `${segment / length} ${1 - segment / length}`,
    );
    return {
      ...branch,
      path,
      length,
      pointAtDistance: samplePath(path, length),
      flow,
      segment,
      speed: branch.major ? 83 : 70,
      launches: parent.launches.map(
        (launch) => launch + (at + 48) / parent.speed,
      ),
      flare: find<SVGCircleElement>(`[data-branch-flare="${index}"]`),
      light: find<SVGCircleElement>(`[data-branch-light="${index}"]`),
    };
  });
  const ports = SIDE_PORTS.map((port, index) => {
    const parent = channels[port.route];
    return {
      ...port,
      at: attachmentDistance(parent.path, parent.length, port.x, port.y),
      light: find<SVGCircleElement>(`[data-port-light="${index}"]`),
    };
  });
  const strips = SERVICE_STRIPS.map((strip, index) => {
    const parent = channels[strip.route];
    const at = attachmentDistance(parent.path, parent.length, strip.x, strip.y);
    return {
      ...strip,
      launches: parent.launches.map(
        (launch) => launch + (at + 48) / parent.speed,
      ),
      leds: [0, 1, 2].map((k) =>
        find<SVGRectElement>(`[data-status="${index}-${k}"]`),
      ),
    };
  });
  TEST_POINTS.forEach((test, index) => {
    const parent = channels[test.route];
    const point = parent.path.getPointAtLength(parent.length * test.fraction);
    const group = find<SVGGElement>(`[data-test-point="${index}"]`);
    group.querySelectorAll('circle').forEach((circle) => {
      circle.setAttribute('cx', String(point.x));
      circle.setAttribute('cy', String(point.y));
    });
    group.setAttribute('opacity', '1');
  });

  const svg = find<SVGSVGElement>('[data-logo-svg]');
  const letters = Array.from(
    root.querySelectorAll<HTMLSpanElement>('[data-lit-letter]'),
  );
  const measure = () => {
    const box = svg.getBoundingClientRect();
    return {
      box,
      scale: box.width / VIEWBOX_WIDTH,
      letters: letters.map((element) => ({
        element,
        box: element.getBoundingClientRect(),
      })),
    };
  };

  return { channels, circuits, ports, strips, letters, measure };
}

export type LogoScene = ReturnType<typeof createLogoScene>;
export type LogoLayout = ReturnType<LogoScene['measure']>;
