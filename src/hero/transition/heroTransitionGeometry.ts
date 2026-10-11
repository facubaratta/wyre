export function measureHeroGeometry() {
  const section = document.getElementById('presencia-web');
  if (!section) return;
  const scene = document.getElementById('hero-scene');
  if (!scene) return;
  const start = scene.getBoundingClientRect().top + window.scrollY;
  const end = section.getBoundingClientRect().top + window.scrollY;
  return {
    start,
    end,
  };
}

export type HeroGeometry = NonNullable<ReturnType<typeof measureHeroGeometry>>;
