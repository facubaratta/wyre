import type { ServiceInterest } from '../sections/WebPresence/services';
import { createContext, useContext } from 'react';

export const ContactInterestContext = createContext<{
  interest: ServiceInterest;
  setInterest: (interest: ServiceInterest) => void;
} | null>(null);

export function useContactInterest() {
  const value = useContext(ContactInterestContext);
  if (!value) throw new Error('ContactInterestProvider is required');
  return value;
}
