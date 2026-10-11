import { createContext, useContext } from 'react';
import type { SectionWireGeometry } from './sectionWireGeometry';

export type HeroFrame = {
  pastHero: boolean;
  heroExit: number;
  complete: boolean;
  wires: SectionWireGeometry;
};

export type HeroMotion = { moving: boolean; frame: HeroFrame | null };
export const HeroExitContext = createContext(0);
export const useHeroExit = () => useContext(HeroExitContext);

export const HeroWireGeometryContext =
  createContext<SectionWireGeometry | null>(null);
export const HeroTransitionContext = createContext({
  moving: false,
  complete: true,
  pastHero: true,
});
export const useHeroTransition = () => useContext(HeroTransitionContext);
export const useHeroWireGeometry = () => useContext(HeroWireGeometryContext);
