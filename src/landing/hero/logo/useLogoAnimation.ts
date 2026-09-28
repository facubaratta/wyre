import { useEffect, type RefObject } from 'react';
import { BRANCHES, CYCLE_SECONDS, ROUTES, SERVICE_STRIPS, SIDE_PORTS, TEST_POINTS, VIEWBOX_WIDTH } from './geometry';
import { usePreferences } from '../../../preferences/PreferencesProvider';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ageSince = (time: number, launches: readonly number[]) => Math.min(...launches.map(launch => ((time - launch) % CYCLE_SECONDS + CYCLE_SECONDS) % CYCLE_SECONDS));

/** Finds where an attached detail receives a packet from its parent conductor. */
function attachmentDistance(path: SVGPathElement, length: number, x: number, y: number) {
  let at = 0;
  let best = Infinity;
  for (let distance = 0; distance < length; distance += 2) {
    const point = path.getPointAtLength(distance);
    const delta = Math.hypot(point.x - x, point.y - y);
    if (delta < best) { best = delta; at = distance; }
  }
  return at;
}

function position(element: SVGCircleElement, point: { x: number; y: number }) {
  element.setAttribute('cx', String(point.x));
  element.setAttribute('cy', String(point.y));
}

/** Updates only animated SVG attributes; React owns the layer structure and geometry. */
export function useLogoAnimation(rootRef: RefObject<HTMLDivElement | null>) {
  const { reduceMotion } = usePreferences();
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
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
      trail.setAttribute('stroke-dasharray', `${trailLength / length} ${1 - trailLength / length}`);
      head.setAttribute('stroke-dasharray', `${headLength / length} ${1 - headLength / length}`);
      const cut = find<SVGRectElement>(`[data-cut-contact="${index}"]`);
      let tip = path.getPointAtLength(0);
      for (let distance = 0; distance < 45; distance++) {
        const point = path.getPointAtLength(distance);
        if (point.y >= 332) { tip = point; break; }
      }
      cut.setAttribute('x', String(tip.x - 2.1));
      return {
        ...route, path, length, trailLength, headLength, trail, head, distance: 0,
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
      const at = attachmentDistance(parent.path, parent.length, source.x, source.y);
      const flow = find<SVGPathElement>(`[data-branch-flow="${index}"]`);
      const segment = branch.major ? 24 : 16;
      flow.setAttribute('stroke-dasharray', `${segment / length} ${1 - segment / length}`);
      return {
        ...branch, path, length, at, flow, segment, speed: branch.major ? 83 : 70,
        flare: find<SVGCircleElement>(`[data-branch-flare="${index}"]`),
        light: find<SVGCircleElement>(`[data-branch-light="${index}"]`),
      };
    });
    const ports = SIDE_PORTS.map((port, index) => {
      const parent = channels[port.route];
      return { ...port, at: attachmentDistance(parent.path, parent.length, port.x, port.y), light: find<SVGCircleElement>(`[data-port-light="${index}"]`) };
    });
    const strips = SERVICE_STRIPS.map((strip, index) => {
      const parent = channels[strip.route];
      return {
        ...strip, at: attachmentDistance(parent.path, parent.length, strip.x, strip.y),
        leds: [0, 1, 2].map(k => find<SVGRectElement>(`[data-status="${index}-${k}"]`)),
      };
    });
    TEST_POINTS.forEach((test, index) => {
      const parent = channels[test.route];
      const point = parent.path.getPointAtLength(parent.length * test.fraction);
      const group = find<SVGGElement>(`[data-test-point="${index}"]`);
      group.setAttribute('transform', `translate(${point.x} ${point.y})`);
      group.setAttribute('opacity', '1');
    });

    const svg = find<SVGSVGElement>('[data-logo-svg]');
    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-lit-letter]'));
    const measure = () => {
      const box = svg.getBoundingClientRect();
      return { box, scale: box.width / VIEWBOX_WIDTH, letters: letters.map(element => ({ element, box: element.getBoundingClientRect() })) };
    };
    let layout = measure();
    const resize = new ResizeObserver(() => { layout = measure(); });
    resize.observe(root);
    let frame = 0;
    let elapsed = 0;
    let lastFrame = performance.now();

    const render = (now: number) => {
      elapsed += (now - lastFrame) / 1600;
      lastFrame = now;
      const sources: { x: number; y: number; alpha: number }[] = [];
      channels.forEach(channel => {
        const distance = ageSince(elapsed, channel.launches) * channel.speed - 48;
        channel.distance = distance;
        const alpha = clamp(distance / 23) * clamp((channel.length - distance) / 28);
        const side = channel.sideExit;
        channel.trail.style.strokeDashoffset = String((channel.trailLength - distance) / channel.length);
        channel.trail.style.opacity = String(alpha * (side ? .56 : .91));
        channel.head.style.strokeDashoffset = String((channel.headLength - distance) / channel.length);
        channel.head.style.opacity = String(alpha * (side ? .77 : 1));
        const point = channel.path.getPointAtLength(clamp(distance / channel.length) * channel.length);
        position(channel.dot, point);
        channel.dot.style.opacity = String(alpha * (side ? .68 : .95));
        position(channel.light, point);
        channel.light.style.opacity = String(alpha * (side ? .72 : .9));
        position(channel.spill, point);
        channel.spill.style.opacity = String(alpha * (side ? .6 : .85));
        if (alpha > .005) sources.push({ x: layout.box.left + point.x * layout.scale, y: layout.box.top + point.y * layout.scale, alpha });
        position(channel.wake, channel.path.getPointAtLength(Math.max(0, Math.min(channel.length, distance - 38))));
        channel.wake.style.opacity = String(alpha * .27);
      });
      for (const { element, box } of layout.letters) {
        element.style.backgroundImage = sources.map(source => `radial-gradient(circle ${680 * layout.scale}px at ${source.x - box.left}px ${source.y - box.top}px,rgba(var(--accent-bright-rgb),${source.alpha * .45}) 0%,rgba(var(--accent-light-rgb),${source.alpha * .35}) 12%,rgba(var(--accent-rgb),${source.alpha * .2}) 32%,rgba(var(--accent-rgb),0) 100%)`).join(',') || 'none';
      }
      ports.forEach(port => { port.light.style.opacity = String(.95 * Math.exp(-Math.pow((channels[port.route].distance - port.at) / 30, 2))); });
      strips.forEach(strip => {
        const parent = channels[strip.route];
        const arrival = (strip.at + 48) / parent.speed;
        const age = ageSince(elapsed, parent.launches.map(launch => launch + arrival));
        strip.leds.forEach((led, k) => { led.style.opacity = String(.16 + .84 * Math.exp(-Math.pow((age - .12 - k * .13) / .28, 2))); });
      });
      circuits.forEach(circuit => {
        const parent = channels[circuit.route];
        const events = parent.launches.map(launch => launch + (circuit.at + 48) / parent.speed);
        const distance = ageSince(elapsed, events) * circuit.speed;
        circuit.flow.style.strokeDashoffset = String((circuit.segment - distance) / circuit.length);
        const moving = clamp(distance / 10) * clamp((circuit.length - distance) / 14);
        circuit.flow.style.opacity = String(moving * (circuit.major ? .74 : .38));
        const receipt = Math.exp(-Math.pow((distance - circuit.length) / (circuit.major ? 20 : 14), 2));
        circuit.flare.style.opacity = String((circuit.major ? .82 : .42) * receipt);
        position(circuit.light, circuit.path.getPointAtLength(Math.min(distance, circuit.length)));
        circuit.light.style.opacity = String((circuit.major ? .48 : .28) * Math.max(moving, receipt));
      });
      if (!reduceMotion && !document.hidden) frame = requestAnimationFrame(render);
    };
      const sync = () => {
      cancelAnimationFrame(frame);
      lastFrame = performance.now();
      if (reduceMotion) {
        letters.forEach(letter => { letter.style.backgroundImage = ''; });
        root.querySelectorAll<SVGElement>('[data-packet-trail],[data-packet-head],[data-packet-dot],[data-packet-light],[data-packet-wake],[data-spill-light],[data-branch-flow],[data-branch-flare],[data-port-light]').forEach(element => { element.style.display = 'none'; });
      } else {
        root.querySelectorAll<SVGElement>('[data-packet-trail],[data-packet-head],[data-packet-dot],[data-packet-light],[data-packet-wake],[data-spill-light],[data-branch-flow],[data-branch-flare],[data-port-light]').forEach(element => { element.style.display = ''; });
        if (!document.hidden) frame = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      document.removeEventListener('visibilitychange', sync);
      letters.forEach(letter => { letter.style.backgroundImage = ''; });
    };
  }, [rootRef, reduceMotion]);
}
