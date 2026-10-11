import { useMemo, type PropsWithChildren } from 'react';
import { usePreferences } from '../../preferences/PreferencesContext';
import {
  HeroExitContext,
  HeroWireGeometryContext,
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
      <HeroWireGeometryContext.Provider value={frame?.wires ?? null}>
        <HeroExitContext.Provider value={frame?.heroExit ?? 0}>
          {children}
        </HeroExitContext.Provider>
      </HeroWireGeometryContext.Provider>
    </HeroTransitionContext.Provider>
  );
}
