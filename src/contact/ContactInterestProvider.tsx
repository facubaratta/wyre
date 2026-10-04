import type { ServiceInterest } from '../sections/WebPresence/services';
import { useMemo, useState, type PropsWithChildren } from 'react';
import { ContactInterestContext } from './ContactInterestContext';

export default function ContactInterestProvider({
  children,
}: PropsWithChildren) {
  const [interest, setInterest] = useState<ServiceInterest>(null);
  const value = useMemo(() => ({ interest, setInterest }), [interest]);
  return (
    <ContactInterestContext.Provider value={value}>
      {children}
    </ContactInterestContext.Provider>
  );
}
