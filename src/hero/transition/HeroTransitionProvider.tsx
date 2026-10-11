import { useMemo, type PropsWithChildren } from 'react';
import { usePreferences } from '../../preferences/PreferencesContext';
import {
  HeroProgressContext,
  HeroTransitionContext,
} from './HeroTransitionContext';
import useHeroTransitionMotion from './useHeroTransitionMotion';

export default function HeroTransitionProvider({
  children,
}: PropsWithChildren) {
  const { reduceMotion } = usePreferences();
  const { moving, frame } = useHeroTransitionMotion(reduceMotion);
  const complete = frame?.complete ?? true;
  const pastHero = frame?.pastHero ?? true;
  const visibility = useMemo(
    () => ({ moving, complete, pastHero }),
    [moving, complete, pastHero],
  );
  return (
    <HeroTransitionContext.Provider value={visibility}>
      <HeroProgressContext.Provider value={frame?.progress ?? 0}>
        {children}
      </HeroProgressContext.Provider>
    </HeroTransitionContext.Provider>
  );
}
