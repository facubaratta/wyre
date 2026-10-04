import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import useControlState from '../controls/useControlState';

export type ContactPlacement = 'default' | 'hero' | 'closing';

interface Props {
  href: string;
  label: string;
  title: string;
  children: ReactNode;
  emphasized?: boolean;
  external?: boolean;
  placement?: ContactPlacement;
}

const linkSx = (
  placement: ContactPlacement,
  emphasized: boolean,
  hovered: boolean,
  focusVisible: boolean,
) => {
  const isHero = placement === 'hero';
  const isClosing = placement === 'closing';
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isHero
      ? { xs: '12px', sm: '16px' }
      : isClosing
        ? { xs: '8px', sm: '14px' }
        : '12px',
    minHeight: isHero
      ? { xs: 56, sm: 72 }
      : isClosing
        ? { xs: 48, sm: 64 }
        : 44,
    padding: isHero
      ? { xs: '14px 12px', sm: '18px 30px' }
      : isClosing
        ? { xs: '12px 8px', sm: '16px 26px' }
        : '10px 18px',
    width: isHero || isClosing ? { xs: '100%', sm: 'auto' } : 'auto',
    border: '1px solid',
    borderColor: hovered
      ? emphasized
        ? '#ebe8de'
        : 'var(--accent)'
      : emphasized
        ? 'var(--accent)'
        : 'rgba(235,232,222,.35)',
    borderRadius: '3px',
    background: emphasized ? 'var(--accent)' : '#181a19',
    color: emphasized ? '#181a19' : hovered ? 'var(--accent)' : '#ebe8de',
    fontSize: isHero
      ? { xs: 'clamp(16px, 5vw, 20px)', sm: 'clamp(20px, 1.8vw, 27px)' }
      : isClosing
        ? { xs: 14, sm: 18 }
        : 14,
    lineHeight: 1.2,
    textDecoration: 'none',
    outline: focusVisible ? '2px solid var(--accent)' : 'none',
    outlineOffset: '4px',
    ...(isClosing
      ? {
          maxWidth: '100%',
          '@container (max-width: 360px)': {
            width: '100%',
            minHeight: 48,
            padding: '12px 8px',
            gap: '8px',
            fontSize: 14,
          },
        }
      : {}),
  };
};

export default function ContactLink({
  href,
  label,
  title,
  children,
  emphasized = false,
  external = false,
  placement = 'default',
}: Props) {
  const isHero = placement === 'hero';
  const isClosing = placement === 'closing';
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
      sx={linkSx(placement, emphasized, hovered, focusVisible)}
    >
      <Box
        component="span"
        sx={{
          width: isHero ? { xs: 26, sm: 30 } : isClosing ? 26 : 22,
          height: isHero ? { xs: 26, sm: 30 } : isClosing ? 26 : 22,
          flexShrink: 0,
        }}
      >
        {children}
      </Box>
      <Box
        component="span"
        sx={isClosing ? { minWidth: 0, overflowWrap: 'anywhere' } : {}}
      >
        {title}
      </Box>
    </Box>
  );
}
