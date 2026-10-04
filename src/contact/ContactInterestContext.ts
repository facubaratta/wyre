import { createContext, useContext } from 'react';

export const ContactInterestContext = createContext<{
  interest: string | null;
  setInterest: (interest: string | null) => void;
} | null>(null);

export function useContactInterest() {
  const value = useContext(ContactInterestContext);
  if (!value) throw new Error('ContactInterestProvider is required');
  return value;
}
