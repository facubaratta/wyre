import { createContext, useContext, type PropsWithChildren } from 'react';
import { serviceGroups } from './hero/services/serviceGroups';
import useServiceSequence from './hero/useServiceSequence';
import { projects } from './portfolio/projects';
import usePortfolioSequence from './portfolio/usePortfolioSequence';
import useWindowScroll from './useWindowScroll';
import { createTimeline } from './scrollTimeline';

function useLandingSequenceValue() {
  const scroll = useWindowScroll();
  const timeline = createTimeline(serviceGroups.length, projects.length);
  const service = useServiceSequence(scroll, serviceGroups.length);
  const portfolio = usePortfolioSequence(
    scroll,
    serviceGroups.length,
    projects.length,
  );
  const nextReducedMotion = () => {
    if (service.manualIndex < serviceGroups.length - 1)
      service.nextManualService();
    else if (portfolio.manualIndex < projects.length)
      portfolio.nextManualProject();
  };
  return { scroll, timeline, service, portfolio, nextReducedMotion };
}

type LandingSequence = ReturnType<typeof useLandingSequenceValue>;
const Context = createContext<LandingSequence | null>(null);

export function LandingSequenceProvider({ children }: PropsWithChildren) {
  const value = useLandingSequenceValue();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useLandingSequence() {
  const value = useContext(Context);
  if (!value)
    throw new Error('useLandingSequence must be used within its provider');
  return value;
}
