import type { ReactNode } from 'react';
import Box from '@mui/material/Box';

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

  return (
    <Box
      component="a"
      href={href}
      aria-label={label}
      title={title}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      data-emphasized={emphasized || undefined}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isHero ? { xs: '12px', sm: '16px' } : isClosing ? '14px' : '12px',
        minHeight: isHero ? { xs: 56, sm: 72 } : isClosing ? 64 : 44,
        padding: isHero
          ? { xs: '14px 12px', sm: '18px 30px' }
          : isClosing
            ? { xs: '16px 12px', sm: '16px 26px' }
            : '10px 18px',
        width: isHero || isClosing ? { xs: '100%', sm: 'auto' } : 'auto',
        border: '1px solid',
        borderColor: emphasized ? 'var(--accent)' : 'rgba(235,232,222,.35)',
        borderRadius: '3px',
        background: emphasized ? 'var(--accent)' : '#181a19',
        color: emphasized ? '#181a19' : '#ebe8de',
        fontSize: isHero
          ? { xs: 'clamp(16px, 5vw, 20px)', sm: 'clamp(20px, 1.8vw, 27px)' }
          : isClosing
            ? { xs: 16, sm: 18 }
            : 14,
        lineHeight: 1.2,
        textDecoration: 'none',
        '&:hover': {
          borderColor: emphasized ? '#ebe8de' : 'var(--accent)',
          color: emphasized ? '#181a19' : 'var(--accent)',
        },
        '&:focus-visible': {
          outline: '2px solid var(--accent)',
          outlineOffset: 4,
        },
      }}
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
      <span>{title}</span>
    </Box>
  );
}
