import { CYCLE_SECONDS } from './geometry';
import type { LogoScene, LogoLayout } from './createLogoScene';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
function ageSince(time: number, launches: readonly number[]) {
  let age = Infinity;
  for (const launch of launches) {
    age = Math.min(
      age,
      (((time - launch) % CYCLE_SECONDS) + CYCLE_SECONDS) % CYCLE_SECONDS,
    );
  }
  return age;
}
function position(element: SVGCircleElement, point: { x: number; y: number }) {
  element.setAttribute('cx', String(point.x));
  element.setAttribute('cy', String(point.y));
}

export function renderLogoFrame(
  scene: LogoScene,
  layout: LogoLayout,
  elapsed: number,
) {
  const { channels, ports, strips, circuits } = scene;
  const sources: { x: number; y: number; alpha: number }[] = [];
  channels.forEach((channel) => {
    const distance = ageSince(elapsed, channel.launches) * channel.speed - 48;
    channel.distance = distance;
    const alpha =
      clamp(distance / 23) * clamp((channel.length - distance) / 28);
    const side = channel.sideExit;
    channel.trail.style.strokeDashoffset = String(
      (channel.trailLength - distance) / channel.length,
    );
    channel.trail.style.opacity = String(alpha * (side ? 0.56 : 0.91));
    channel.head.style.strokeDashoffset = String(
      (channel.headLength - distance) / channel.length,
    );
    channel.head.style.opacity = String(alpha * (side ? 0.77 : 1));
    const point = channel.pointAtDistance(
      clamp(distance / channel.length) * channel.length,
    );
    position(channel.dot, point);
    channel.dot.style.opacity = String(alpha * (side ? 0.68 : 0.95));
    position(channel.light, point);
    channel.light.style.opacity = String(alpha * (side ? 0.72 : 0.9));
    channel.spill.style.transform = `translate(${point.x}px, ${point.y}px)`;
    channel.spill.style.opacity = String(alpha * (side ? 0.6 : 0.85));
    if (alpha > 0.005)
      sources.push({
        x: layout.box.left + point.x * layout.scale,
        y: layout.box.top + point.y * layout.scale,
        alpha,
      });
    position(
      channel.wake,
      channel.pointAtDistance(
        Math.max(0, Math.min(channel.length, distance - 38)),
      ),
    );
    channel.wake.style.opacity = String(alpha * 0.27);
  });
  for (const { element, box } of layout.letters) {
    element.style.backgroundImage =
      sources
        .map(
          (source) =>
            `radial-gradient(circle ${680 * layout.scale}px at ${source.x - box.left}px ${source.y - box.top}px,rgba(var(--accent-bright-rgb),${source.alpha * 0.45}) 0%,rgba(var(--accent-light-rgb),${source.alpha * 0.35}) 12%,rgba(var(--accent-rgb),${source.alpha * 0.2}) 32%,rgba(var(--accent-rgb),0) 100%)`,
        )
        .join(',') || 'none';
  }
  ports.forEach((port) => {
    port.light.style.opacity = String(
      0.95 *
        Math.exp(-Math.pow((channels[port.route].distance - port.at) / 30, 2)),
    );
  });
  strips.forEach((strip) => {
    const age = ageSince(elapsed, strip.launches);
    strip.leds.forEach((led, k) => {
      led.style.opacity = String(
        0.16 + 0.84 * Math.exp(-Math.pow((age - 0.12 - k * 0.13) / 0.28, 2)),
      );
    });
  });
  circuits.forEach((circuit) => {
    const distance = ageSince(elapsed, circuit.launches) * circuit.speed;
    circuit.flow.style.strokeDashoffset = String(
      (circuit.segment - distance) / circuit.length,
    );
    const moving =
      clamp(distance / 10) * clamp((circuit.length - distance) / 14);
    circuit.flow.style.opacity = String(moving * (circuit.major ? 0.74 : 0.38));
    const receipt = Math.exp(
      -Math.pow((distance - circuit.length) / (circuit.major ? 20 : 14), 2),
    );
    circuit.flare.style.opacity = String(
      (circuit.major ? 0.82 : 0.42) * receipt,
    );
    position(
      circuit.light,
      circuit.pointAtDistance(Math.min(distance, circuit.length)),
    );
    circuit.light.style.opacity = String(
      (circuit.major ? 0.48 : 0.28) * Math.max(moving, receipt),
    );
  });
}
