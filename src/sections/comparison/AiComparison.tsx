import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ComparisonExample from './ComparisonExample';

export default function AiComparison() {
  const [position, setPosition] = useState(50);
  const [focused, setFocused] = useState(false);
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1.5,
          gap: 2,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: 12, sm: 14 }, color: 'text.secondary' }}
        >
          IA sin dirección
        </Typography>
        <Typography
          sx={{ fontSize: { xs: 12, sm: 14 }, color: 'primary.main' }}
        >
          IA + criterio humano
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 490, sm: 560 },
          overflow: 'hidden',
          border: '1px solid #ebe8de33',
          borderRadius: 2,
          outline: focused ? '2px solid #c2a27b' : 'none',
          outlineOffset: 4,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            containerType: 'inline-size',
          }}
        >
          <ComparisonExample generic={false} />
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            overflow: 'hidden',
            containerType: 'inline-size',
          }}
        >
          <ComparisonExample generic />
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: 2,
            bgcolor: '#ebe8de',
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: `translate(${position === 0 ? '0' : position === 100 ? '-100%' : '-50%'}, -50%)`,
              width: 44,
              height: 44,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              bgcolor: '#ebe8de',
              color: '#181a19',
              boxShadow: '0 2px 15px #0004',
              fontSize: 21,
            }}
          >
            ‹ ›
          </Box>
        </Box>
        <Box
          component="input"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Comparar IA sin dirección con IA y criterio humano"
          aria-valuetext={`${position}% IA sin dirección, ${100 - position}% IA con criterio humano`}
          sx={{
            position: 'absolute',
            inset: 0,
            m: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'ew-resize',
            touchAction: 'pan-y',
          }}
        />
      </Box>
    </Box>
  );
}
