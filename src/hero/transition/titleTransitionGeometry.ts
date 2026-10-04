export function measureTitleGeometry() {
  const source = document.getElementById('hero-title-web');
  const destination = document.getElementById('section-title-web');
  const section = document.getElementById('presencia-web');
  const hero = document.getElementById('hero');
  const scene = document.getElementById('hero-scene');
  const sourceGlobe = document.getElementById('hero-globe');
  const destinationGlobe = document.getElementById('section-globe');

  if (
    !source ||
    !destination ||
    !section ||
    !hero ||
    !scene ||
    !sourceGlobe ||
    !destinationGlobe
  )
    return;
  const from = source.getBoundingClientRect();
  const to = destination.getBoundingClientRect();
  const root = section.getBoundingClientRect();
  const heroBounds = hero.getBoundingClientRect();
  const sceneStart = scene.getBoundingClientRect().top + window.scrollY;
  const globeFrom = sourceGlobe.getBoundingClientRect();
  const globeTo = destinationGlobe.getBoundingClientRect();
  const sourceStyle = getComputedStyle(source);
  const targetStyle = getComputedStyle(destination);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const headerHeight =
    document.getElementById('site-header')?.getBoundingClientRect().height ?? 0;
  const middleScale = Math.min(1.9, (width * 0.84) / from.width);
  const globeSize = Math.min(width * 0.66, height * 0.52, 460);
  return {
    text: source.textContent ?? '',
    fromX: from.left,
    fromY: from.top - heroBounds.top + sceneStart,
    toX: to.left,
    toY: to.top - root.top + headerHeight,
    middleX: (width - from.width * middleScale) / 2,
    middleY: height * 0.72,
    middleScale,
    width: from.width,
    fontSize: parseFloat(sourceStyle.fontSize),
    lineHeight: parseFloat(sourceStyle.lineHeight),
    weight: parseFloat(sourceStyle.fontWeight),
    spacing: parseFloat(sourceStyle.letterSpacing) || 0,
    targetScale:
      parseFloat(targetStyle.fontSize) / parseFloat(sourceStyle.fontSize),
    start: sceneStart,
    end: Math.max(1, root.top + window.scrollY - headerHeight),
    globeFromX: globeFrom.left,
    globeFromY: globeFrom.top - heroBounds.top + sceneStart,
    globeToX: globeTo.left,
    globeToY: globeTo.top - root.top + headerHeight,
    globeMiddleX: (width - globeSize) / 2,
    globeMiddleY: height * 0.42 - globeSize / 2,
    globeMiddleScale: globeSize / globeFrom.width,
    globeSize: globeFrom.width,
    globeScale: globeTo.width / globeFrom.width,
  };
}

export type TitleGeometry = NonNullable<
  ReturnType<typeof measureTitleGeometry>
>;
