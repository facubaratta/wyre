import { measureSectionWires } from './sectionWireGeometry';

export function measureHeroGeometry() {
  const section = document.getElementById('presencia-web');
  const hero = document.getElementById('hero');
  const scene = document.getElementById('hero-scene');
  if (!section || !hero || !scene) return;
  const wires = measureSectionWires(hero, scene, section);
  if (!wires) return;
  return {
    start: wires.start,
    end: wires.end,
    wires,
  };
}

export type HeroGeometry = NonNullable<ReturnType<typeof measureHeroGeometry>>;
