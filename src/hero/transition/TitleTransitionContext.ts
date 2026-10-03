import { createContext, useContext } from 'react';

export type TitleFrame = {
  text: string;
  x: number;
  y: number;
  width: number;
  fontSize: number;
  lineHeight: number;
  weight: number;
  spacing: number;
  scale: number;
  progress: number;
  heroExit: number;
  reveal: number;
  complete: boolean;
  globe: { x: number; y: number; size: number; scale: number };
};

export type TitleMotion = { moving: boolean; frame: TitleFrame | null };
export const HeroExitContext = createContext(0);
export const useHeroExit = () => useContext(HeroExitContext);

export const TitleFrameContext = createContext<TitleFrame | null>(null);
export const TitleTransitionContext = createContext({
  moving: false,
  complete: true,
});
export const useTitleTransition = () => useContext(TitleTransitionContext);
export const useTitleFrame = () => useContext(TitleFrameContext);
