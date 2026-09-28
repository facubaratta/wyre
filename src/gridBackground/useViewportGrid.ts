import { useEffect, useState } from 'react';
import { GRID_DIVISIONS, VIEWBOX_WIDTH } from './gridConfig';

export function useViewportGrid() {
  const [width, setWidth] = useState(VIEWBOX_WIDTH);
  const [height, setHeight] = useState((VIEWBOX_WIDTH / GRID_DIVISIONS) * 10);

  useEffect(() => {
    const syncViewport = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const cellSize = width / GRID_DIVISIONS;
  return { width, height, cellSize };
}
