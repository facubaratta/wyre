import { useEffect, useState } from 'react';

export interface WindowScroll {
  y: number;
  viewport: number;
}

const getViewportHeight = () => Math.max(window.innerHeight, 1);

export default function useWindowScroll(): WindowScroll {
  const [scroll, setScroll] = useState<WindowScroll>(() => ({
    y: window.scrollY,
    viewport: getViewportHeight(),
  }));

  useEffect(() => {
    const update = () =>
      setScroll({ y: window.scrollY, viewport: getViewportHeight() });

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return scroll;
}
