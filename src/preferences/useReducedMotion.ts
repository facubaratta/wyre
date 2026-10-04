import { useEffect, useState } from 'react';

export default function useReducedMotion() {
  // Match prerendered markup on the first hydration pass, then sync preferences.
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return reduceMotion;
}
