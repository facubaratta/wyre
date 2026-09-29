import { useMemo } from 'react';
import {
  animationPhase,
  BASE_GRID_SIZE,
  GRID_ROWS,
  litCells,
  litNodes,
} from './gridConfig';
import { GlowGroup } from './GridLayers';

type Props = {
  id: string;
  time: number;
  reducedMotion: boolean;
  cellSize: number;
  height: number;
};

export function LitGridDetails({
  id,
  time,
  reducedMotion,
  cellSize,
  height,
}: Props) {
  const scale = cellSize / BASE_GRID_SIZE;
  const visibleRows = Math.ceil(height / cellSize);
  const { cells, nodes } = useMemo(() => {
    const repeat = (points: readonly (readonly [number, number])[]) =>
      Array.from({ length: Math.ceil(visibleRows / GRID_ROWS) }, (_, tile) =>
        points.map(
          ([x, y]) => [x, y + tile * GRID_ROWS * BASE_GRID_SIZE] as const,
        ),
      )
        .flat()
        .filter(([, y]) => y / BASE_GRID_SIZE < visibleRows);
    return { cells: repeat(litCells), nodes: repeat(litNodes) };
  }, [visibleRows]);

  return (
    <GlowGroup id={id}>
      {cells.map(([x, y]) => {
        const column = x / BASE_GRID_SIZE;
        const row = y / BASE_GRID_SIZE;
        const delay = animationPhase(column, row);
        const opacity = reducedMotion
          ? 0.08
          : 0.18 + 0.18 * Math.sin((time - delay) * ((2 * Math.PI) / 7.4));

        return (
          <rect
            key={`cell-${x}-${y}`}
            x={column * cellSize}
            y={row * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#0787b8"
            stroke="#42dfff"
            strokeWidth={cellSize / 100}
            opacity={opacity}
          />
        );
      })}
      {nodes.map(([x, y]) => {
        const column = x / BASE_GRID_SIZE;
        const row = y / BASE_GRID_SIZE;
        const delay = animationPhase(column, row);
        const opacity = reducedMotion
          ? 0.36
          : 0.57 + 0.43 * Math.sin((time - delay) * ((2 * Math.PI) / 7.4));

        return (
          <circle
            key={`node-${x}-${y}`}
            cx={column * cellSize}
            cy={row * cellSize}
            r={4.2 * scale}
            fill="#12dfff"
            opacity={opacity}
          />
        );
      })}
    </GlowGroup>
  );
}
