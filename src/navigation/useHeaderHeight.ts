import { useLayoutEffect, useRef } from 'react';

export default function useHeaderHeight() {
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.getBoundingClientRect().height}px`,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    measure();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--header-height');
    };
  }, []);

  return headerRef;
}
