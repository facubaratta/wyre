export interface NavbarGeometry {
  pageHeight: number;
  sceneStart: number;
  sceneEnd: number;
  heroHeight: number;
  stickyTop: number;
  sticky: boolean;
}

export function heroOverlapsViewport(
  y: number,
  viewport: number,
  geometry: NavbarGeometry,
) {
  const normalTop = geometry.sceneStart - y;
  const top = geometry.sticky
    ? Math.min(
        Math.max(normalTop, geometry.stickyTop),
        geometry.sceneEnd - y - geometry.heroHeight,
      )
    : normalTop;
  return top + geometry.heroHeight > 0 && top < viewport;
}
