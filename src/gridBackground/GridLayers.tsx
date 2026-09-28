import type { ReactNode } from 'react';

type IdProps = { id: string };

export function AmbientBackground({ id }: IdProps) {
  return (
    <>
      <linearGradient id={`${id}-background`} x2="0" y2="1">
        <stop stopColor="#07102b" />
        <stop offset="1" stopColor="#09214d" />
      </linearGradient>
      <radialGradient id={`${id}-ambient`} cx="50%" cy="52%" r="62%">
        <stop stopColor="#0b417f" stopOpacity=".42" />
        <stop offset="1" stopColor="#0b417f" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-glow`} x="-300%" y="-300%" width="700%" height="700%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </>
  );
}

type GridLinesProps = IdProps & { cellSize: number };

export function GridLines({ id, cellSize }: GridLinesProps) {
  return (
    <pattern id={`${id}-grid`} width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
      <path
        d={`M${cellSize} 0H0V${cellSize}`}
        fill="none"
        stroke="#278bc6"
        strokeWidth={cellSize / 90}
        opacity=".47"
      />
    </pattern>
  );
}

export function GlowGroup({ id, children }: IdProps & { children: ReactNode }) {
  return <g filter={`url(#${id}-glow)`}>{children}</g>;
}
