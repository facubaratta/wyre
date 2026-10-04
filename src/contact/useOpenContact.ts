import { usePortfolioSequenceState } from '../portfolio/PortfolioSequenceContext';
import { projects } from '../portfolio/projects';
import { usePreferences } from '../preferences/PreferencesContext';
import { useContactInterest } from './ContactInterestContext';

export default function useOpenContact() {
  const { selectProject } = usePortfolioSequenceState();
  const { reduceMotion } = usePreferences();
  const { setInterest } = useContactInterest();

  return (interest: string | null = null) => {
    setInterest(interest);
    selectProject(projects.length);
    if (reduceMotion) {
      document.getElementById('crecimiento-real')?.scrollIntoView();
    }
  };
}
