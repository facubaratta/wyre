import { useLayoutEffect, useRef, useState } from 'react';

export default function useElementHeight() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const measure = () => setHeight(element.getBoundingClientRect().height);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);

  return { elementRef, height };
}
