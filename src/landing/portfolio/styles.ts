import type { SxProps, Theme } from '@mui/material/styles';

export const styles = {
  portfolio: {
    position: 'absolute', zIndex: 2, inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    p: '6svh 7vw', color: '#ebe8de',
    '@media (max-width:640px)': { p: '4svh 5vw' },
    '@media (min-width:641px) and (max-height:500px)': { py: '2svh' },
  },
  assembly: { width: 'min(100%, 1100px, 100svh)', '@media (max-width:640px)': { width: 'min(82vw, 320px, 38svh)' }, '@media (min-width:641px) and (max-height:500px)': { width: 'min(100%, calc((100svh - 140px) * 1.7778))' } },
  monitor: { border: '1px solid #60615b', borderRadius: '12px', overflow: 'hidden', background: '#202321', '@media (max-width:640px)': { borderRadius: '36px', p: '10px 6px 0', borderColor: '#74766d', '&::before': { content: '""', display: 'block', width: '27%', height: '9px', mx: 'auto', mb: '12px', borderRadius: '20px', background: '#0e100f' } } },
  toolbar: { display: 'flex', alignItems: 'center', gap: '10px', p: '12px', borderBottom: '1px solid #454840', '@media (max-width:640px)': { p: '0 4px 8px', gap: 0 }, '@media (min-width:641px) and (max-height:500px)': { py: '4px' } },
  address: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0, height: '40px', px: '14px', border: '1px solid #454840', borderRadius: '7px', background: '#181a19', color: '#a4a69d', '@media (max-width:640px)': { height: '34px', px: '8px', gap: '6px', borderRadius: '8px', '& svg': { width: '12px' } } },
  url: { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#ebe8de', fontSize: 'clamp(14px, 1.25vw, 18px)', letterSpacing: '.015em', '@media (max-width:640px)': { fontSize: '11px' } },
  visit: { display: 'grid', placeItems: 'center', width: '44px', height: '44px', flexShrink: 0, color: 'var(--accent)', fontSize: '28px', textDecoration: 'none', '@media (max-width:640px)': { width: '36px', fontSize: '24px' }, '&:hover': { color: '#ebe8de' } },
  display: { containerType: 'inline-size', position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: '#181a19', m: '0 10px', '@media (max-width:640px)': { m: 0, aspectRatio: '9 / 16', borderRadius: '0 0 21px 21px' } },
  screenshots: { position: 'absolute', inset: 0, transition: 'opacity 350ms ease', '@media (prefers-reduced-motion: reduce)': { transition: 'none' } },
  chin: { height: '30px', display: 'grid', placeItems: 'center', '& span': { width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }, '@media (max-width:640px)': { height: '26px', '& span': { width: '32%', height: '3px', borderRadius: '8px', background: '#a4a69d' } }, '@media (min-width:641px) and (max-height:500px)': { height: '12px' } },
  stand: { height: 'clamp(30px, 6svh, 60px)', width: '14%', mx: 'auto', borderInline: '1px solid #60615b', background: '#202321' },
  foot: { width: '30%', height: '8px', mx: 'auto', border: '1px solid #60615b', borderRadius: '3px', background: '#202321' },
  navigation: { display: 'flex', justifyContent: 'center', gap: '24px', mt: '22px', '& button': { font: 'inherit', fontSize: '24px', width: '44px', height: '44px', p: 0, color: 'var(--accent)', background: 'transparent', border: 0, cursor: 'pointer', '&:disabled': { opacity: .25, cursor: 'default' } } },
  closing: { position: 'absolute', zIndex: 3, inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '16px', p: '10%', color: '#ebe8de', background: '#181a19', '& h1': { m: 0, py: '5%', borderTop: '1px solid rgba(235,232,222,.22)', fontSize: 'clamp(20px, 7cqw, 76px)', fontWeight: 400, lineHeight: 1.18, letterSpacing: '-.05em', '& span': { display: 'block' }, '& em': { color: 'var(--accent)', fontStyle: 'normal' } } },
  focusable: { '& a:focus-visible, & button:focus-visible': { outline: '2px solid var(--accent)', outlineOffset: '4px' } },
} satisfies Record<string, SxProps<Theme>>;

export const hiddenToolbarPart = { visibility: 'hidden' } satisfies SxProps<Theme>;
export const hiddenOnSmallOrShort = { '@media (max-width:640px)': { display: 'none' }, '@media (min-width:641px) and (max-height:500px)': { display: 'none' } } satisfies SxProps<Theme>;
