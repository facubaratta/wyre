import Box, { type BoxProps } from '@mui/material/Box';
import { useEffect, useRef } from 'react';
import { usePreferences } from '../preferences/PreferencesContext';

export default function FadeIn(props: BoxProps) {
  const ref = useRef<HTMLElement>(null);
  const { reduceMotion } = usePreferences();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion || !('IntersectionObserver' in window)) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      animation?.cancel();
      if (!entry.isIntersecting) {
        element.style.opacity = element.contains(document.activeElement)
          ? ''
          : '0';
        return;
      }
      element.style.opacity = '';
      if (element.contains(document.activeElement)) return;
      animation = element.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 550,
        easing: 'ease-out',
      });
    });
    element.style.opacity = '0';
    observer.observe(element);
    // Keyboard navigation should never focus invisible content.
    const reveal = () => {
      element.style.opacity = '';
      animation?.cancel();
    };
    element.addEventListener('focusin', reveal);
    return () => {
      observer.disconnect();
      reveal();
      element.removeEventListener('focusin', reveal);
    };
  }, [reduceMotion]);
  return <Box {...props} ref={ref} />;
}
