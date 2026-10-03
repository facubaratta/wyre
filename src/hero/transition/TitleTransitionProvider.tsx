import { useMemo, type PropsWithChildren } from 'react';
import { usePreferences } from '../../preferences/PreferencesContext';
import {
  HeroExitContext,
  TitleFrameContext,
  TitleTransitionContext,
} from './TitleTransitionContext';
import useTitleTransitionMotion from './useTitleTransitionMotion';
import TitleTransitionOverlay from './TitleTransitionOverlay';

export default function TitleTransitionProvider({
  children,
}: PropsWithChildren) {
  const { reduceMotion } = usePreferences();
  const { moving, frame } = useTitleTransitionMotion(reduceMotion);
  const complete = frame?.complete ?? true;
  const visibility = useMemo(() => ({ moving, complete }), [moving, complete]);
  return (
    <TitleTransitionContext.Provider value={visibility}>
      <TitleFrameContext.Provider value={frame}>
        <HeroExitContext.Provider value={frame?.heroExit ?? 0}>
          {children}
        </HeroExitContext.Provider>
        {moving && frame && !frame.complete && (
          <TitleTransitionOverlay frame={frame} />
        )}
      </TitleFrameContext.Provider>
    </TitleTransitionContext.Provider>
  );
}
