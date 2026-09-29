export const VIEWBOX_WIDTH = 1440;
export const GRID_DIVISIONS = 16;
export const BASE_GRID_SIZE = 90;
export const GRID_ROWS = 10;
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const litCells = [
  [0, 180],
  [90, 0],
  [180, 270],
  [270, 90],
  [360, 450],
  [450, 180],
  [540, 540],
  [630, 0],
  [720, 270],
  [810, 630],
  [900, 90],
  [990, 360],
  [1080, 540],
  [1170, 180],
  [1260, 0],
  [1350, 450],
  [180, 630],
  [360, 720],
  [540, 270],
  [720, 630],
  [900, 450],
  [1080, 0],
  [1260, 720],
  [1350, 270],
  [630, 810],
  [270, 450],
  [990, 720],
  [450, 0],
] as const;

export const litNodes = [
  [90, 90],
  [270, 0],
  [270, 180],
  [450, 360],
  [630, 180],
  [720, 450],
  [900, 90],
  [990, 630],
  [1080, 360],
  [1170, 90],
  [1260, 540],
  [1350, 270],
  [180, 630],
  [360, 810],
  [540, 540],
  [810, 720],
  [900, 450],
  [1260, 810],
] as const;

export const animationPhase = (column: number, row: number) =>
  (column + row * 1.12) * 0.17;
