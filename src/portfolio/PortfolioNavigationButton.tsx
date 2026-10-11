import { gradientFocusSx } from '../brand/colors';
import { gradientTextSx } from '../brand/colors';
import Box from '@mui/material/Box';
import type { ButtonHTMLAttributes } from 'react';
import useControlState from '../controls/useControlState';

const buttonSx = {
  font: 'inherit',
  fontSize: '24px',
  width: '44px',
  height: '44px',
  p: 0,
  ...gradientTextSx,
  background: 'transparent',
  border: 0,
  outlineOffset: '4px',
};

export default function PortfolioNavigationButton({
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { focusVisible, events } = useControlState();
  return (
    <Box
      component="button"
      type="button"
      {...events}
      {...props}
      disabled={disabled}
      sx={{
        ...buttonSx,
        opacity: disabled ? 0.25 : 1,
        cursor: disabled ? 'default' : 'pointer',
        position: 'relative',
        isolation: 'isolate',
        ...(focusVisible ? gradientFocusSx : {}),
      }}
    >
      {children}
    </Box>
  );
}
