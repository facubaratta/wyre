import Box from '@mui/material/Box';

import { memo } from 'react';
import { wireGlobeGeometry } from './wireGlobeGeometry';

function WireGlobe({ rotation }: { rotation: number }) {
  const { paths, anchors } = wireGlobeGeometry(rotation);
  return (
    <Box
      component="svg"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      sx={{
        display: 'block',
        width: '100%',
        height: '100%',
        color: 'var(--accent)',
        overflow: 'visible',
      }}
    >
      <circle
        cx="100"
        cy="100"
        r="79"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      {paths.map((path, index) => (
        <path
          key={`back-${index}`}
          d={path.back}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.16"
        />
      ))}
      {paths.map((path, index) => (
        <path
          key={`front-${index}`}
          d={path.front}
          stroke="currentColor"
          strokeWidth="0.65"
          opacity="0.85"
        />
      ))}
      {anchors.map((point, index) => {
        return (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="1.8"
            fill="currentColor"
            opacity={point.front ? 1 : 0.15}
          />
        );
      })}
    </Box>
  );
}

export default memo(WireGlobe);
