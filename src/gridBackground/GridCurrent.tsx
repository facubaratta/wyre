import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

const horizontalCurrent = keyframes({
  '0%': { transform: 'translateX(-30vw)', opacity: 0 },
  '12%, 78%': { opacity: 0.55 },
  '100%': { transform: 'translateX(110vw)', opacity: 0 },
});
const verticalCurrent = keyframes({
  '0%': { transform: 'translateY(-30svh)', opacity: 0 },
  '12%, 78%': { opacity: 0.45 },
  '100%': { transform: 'translateY(110svh)', opacity: 0 },
});

interface Props {
  direction: 'horizontal' | 'vertical';
  lane: string;
  duration: number;
  delay: number;
  index: number;
}

const currentSx = ({ direction, lane, duration, delay, index }: Props) => {
  const horizontal = direction === 'horizontal';
  return {
    position: 'absolute',
    left: horizontal ? 0 : lane,
    top: horizontal ? lane : 0,
    width: horizontal ? '28vw' : '1px',
    height: horizontal ? '1px' : '28svh',
    backgroundImage: `linear-gradient(${horizontal ? '90deg' : '180deg'}, transparent, rgba(var(--accent-rgb),.25) 25%, var(--accent) 85%, transparent)`,
    opacity: 0,
    animation: `${horizontal ? horizontalCurrent : verticalCurrent} ${duration}s linear ${delay}s infinite`,
    '@media (max-width:640px)': {
      left: horizontal ? 0 : index === 3 ? '25vw' : '75vw',
      top: horizontal ? `${(index * 2 + 1) * 25}vw` : 0,
      display: index === 4 ? 'none' : 'block',
    },
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      display: 'none',
    },
  };
};

const lightSx = (horizontal: boolean) => ({
  position: 'absolute',
  left: horizontal ? '85%' : '-1px',
  top: horizontal ? '-1px' : '85%',
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: 'var(--accent-light)',
  boxShadow: '0 0 10px 2px rgba(var(--accent-rgb),.15)',
});

export default function GridCurrent(props: Props) {
  return (
    <Box component="span" sx={currentSx(props)}>
      <Box component="span" sx={lightSx(props.direction === 'horizontal')} />
    </Box>
  );
}
