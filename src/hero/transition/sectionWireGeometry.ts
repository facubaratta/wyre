import { VIEWBOX_WIDTH } from '../../brand/logo/geometry';
import { between, ease } from './motion';

type Point = { x: number; y: number };
export type SectionWireGeometry = {
  tails: Point[];
  start: number;
  end: number;
  heroHeight: number;
  stickyTop: number;
  sectionTop: number;
  sectionBottom: number;
  width: number;
  viewport: number;
  scale: number;
};

// The four long conductors meet the slanted, clipped edge of the Arial Y.
const tailEnds = [
  [42, 956],
  [45, 984],
  [48, 1012],
  [51, 1040],
];

export function measureSectionWires(
  hero: HTMLElement,
  scene: HTMLElement,
  section: HTMLElement,
): SectionWireGeometry | undefined {
  const svg = hero.querySelector<SVGSVGElement>(
    '#hero-wordmark [data-logo-svg]',
  );
  if (!svg) return;
  const glyph = svg.getBoundingClientRect();
  const heroBounds = hero.getBoundingClientRect();
  const sectionBounds = section.getBoundingClientRect();
  const scale = glyph.width / VIEWBOX_WIDTH;
  const start = scene.getBoundingClientRect().top + window.scrollY;
  const sectionTop = sectionBounds.top + window.scrollY;
  const headerHeight =
    document.getElementById('site-header')?.getBoundingClientRect().height ?? 0;
  return {
    tails: tailEnds.map(([x, y]) => ({
      x: glyph.left + x * scale,
      y: glyph.top - heroBounds.top + y * scale,
    })),
    start,
    end: Math.max(start + 1, sectionTop - headerHeight),
    heroHeight: heroBounds.height,
    stickyTop: parseFloat(getComputedStyle(hero.parentElement!).top) || 0,
    sectionTop,
    sectionBottom: sectionBounds.bottom + window.scrollY,
    width: window.innerWidth,
    viewport: window.innerHeight,
    scale,
  };
}

/** Continue the tail to the left, turn a quarter circle, then grow downward. */
export function sectionWirePaths(
  geometry: SectionWireGeometry,
  progress: number,
  scrollY: number,
) {
  const mobile = geometry.width < 900;
  const heroTop = Math.min(
    Math.max(geometry.start - scrollY, geometry.stickyTop),
    geometry.sectionTop - scrollY - geometry.heroHeight,
  );
  const growth = ease(between(progress, 0, 0.75));
  return geometry.tails.map((tail, index) => {
    // The SVG shares the hero's sticky coordinate system, so the browser keeps
    // the joint attached even when JavaScript misses a scrolling frame.
    const source = tail;
    const spacing = 28 * geometry.scale;
    const left = (mobile ? 10 : 28) + index * spacing;
    const radius = (mobile ? 40 : 80) - index * spacing;
    const cornerX = left + radius;
    const cornerY = source.y + radius;
    const bottom =
      geometry.sectionBottom - scrollY - heroTop - (mobile ? 24 : 40);
    const horizontal = Math.max(0, source.x - cornerX);
    const bend = (radius * Math.PI) / 2;
    const vertical = Math.max(0, bottom - cornerY);
    const distance = (horizontal + bend + vertical) * growth;
    let d = `M${source.x.toFixed(2)} ${source.y.toFixed(2)}`;
    d += ` L${(source.x - Math.min(distance, horizontal)).toFixed(2)} ${source.y.toFixed(2)}`;
    if (distance > horizontal) {
      const angle = Math.min((distance - horizontal) / radius, Math.PI / 2);
      const x = cornerX - radius * Math.sin(angle);
      const y = source.y + radius * (1 - Math.cos(angle));
      d += ` A${radius.toFixed(2)} ${radius.toFixed(2)} 0 0 0 ${x.toFixed(2)} ${y.toFixed(2)}`;
      if (distance > horizontal + bend) {
        d += ` L${left.toFixed(2)} ${(cornerY + Math.min(vertical, distance - horizontal - bend)).toFixed(2)}`;
      }
    }
    return { d, strokeWidth: 6.5 * geometry.scale };
  });
}
