import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import { AboutContext } from './AboutContext';

export default function AboutProvider({ children }: PropsWithChildren) {
  const [expanded, setExpanded] = useState(false);
  const expand = useCallback(() => setExpanded(true), []);
  const value = useMemo(() => ({ expanded, expand }), [expanded, expand]);
  return (
    <AboutContext.Provider value={value}>{children}</AboutContext.Provider>
  );
}
