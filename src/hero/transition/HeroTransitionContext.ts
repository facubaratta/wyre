import { createContext, useContext } from 'react';

export type HeroFrame = {
  pastHero: boolean;
  progress: number;
  complete: boolean;
};

export type HeroMotion = { moving: boolean; frame: HeroFrame | null };
export const HeroTransitionContext = createContext({
  moving: false,
  complete: true,
  pastHero: true,
});
export const useHeroTransition = () => useContext(HeroTransitionContext);
export const HeroProgressContext = createContext(0);
export const useHeroProgress = () => useContext(HeroProgressContext);
