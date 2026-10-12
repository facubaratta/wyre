import { gradientFocusSx } from '../brand/colors';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import useControlState from '../controls/useControlState';

interface Props {
  href: string;
  label: string;
  title: string;
  children: ReactNode;
  emphasized?: boolean;
  external?: boolean;
}

const linkSx = (
  emphasized: boolean,
  hovered: boolean,
  focusVisible: boolean,
) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: { xs: '8px', sm: '14px' },
  minHeight: { xs: 48, sm: 64 },
  padding: { xs: '12px 8px', sm: '16px 26px' },
  width: { xs: '100%', sm: 'auto' },
  border: '1px solid',
  borderColor: 'transparent',
  borderImage: emphasized || hovered ? 'var(--brand-gradient) 1' : 'none',
  borderRadius: '3px',
  background: emphasized
    ? 'var(--brand-gradient)'
    : hovered
      ? 'var(--brand-gradient-soft)'
      : '#181a19',
  color: emphasized ? '#181a19' : '#ebe8de',
  fontSize: { xs: 14, sm: 18 },
  lineHeight: 1.2,
  textDecoration: 'none',
  position: 'relative',
  isolation: 'isolate' as const,
  ...(focusVisible ? gradientFocusSx : {}),
  outlineOffset: '4px',
  maxWidth: '100%',
  '@container (max-width: 360px)': {
    width: '100%',
    minHeight: 48,
    padding: '12px 8px',
    gap: '8px',
    fontSize: 14,
  },
});

export default function ContactLink({
  href,
  label,
  title,
  children,
  emphasized = false,
  external = false,
}: Props) {
  const { hovered, focusVisible, events } = useControlState();

  return (
    <Box
      component="a"
      href={href}
      aria-label={label}
      title={title}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      data-emphasized={emphasized || undefined}
      {...events}
      sx={linkSx(emphasized, hovered, focusVisible)}
    >
      <Box
        component="span"
        sx={{
          width: 26,
          height: 26,
          flexShrink: 0,
        }}
      >
        {children}
      </Box>
      <Box component="span" sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
        {title}
      </Box>
    </Box>
  );
}
