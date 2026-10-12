import type { ServiceInterest } from '../sections/WebPresence/services';
import { usePreferences } from '../preferences/PreferencesContext';
import { useContactInterest } from './ContactInterestContext';

export default function useOpenContact() {
  const { reduceMotion } = usePreferences();
  const { setInterest } = useContactInterest();

  return (interest: ServiceInterest = null) => {
    setInterest(interest);
    document
      .getElementById('portfolio-contact')
      ?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };
}
