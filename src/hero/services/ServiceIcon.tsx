import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { usePreferences } from '../../PreferencesProvider';

interface Props {
  wireTarget?: boolean;
  svg: string;
  size: string;
  sx?: SxProps<Theme>;
  visible: boolean;
  delay?: number;
  direction?: 'up' | 'down';
}

const transition =
  'opacity 500ms ease, transform 650ms cubic-bezier(.2,.7,.2,1)';

export default function ServiceIcon({
  wireTarget = false,
  svg,
  size,
  sx = [],
  visible,
  delay = 0,
  direction = 'down',
}: Props) {
  const { reduceMotion } = usePreferences();
  const offset = direction === 'down' ? 8 : -8;
  const iconSx = {
    display: 'block',
    color: 'var(--accent)',
    flex: '0 0 auto',
    width: size,
    height: size,
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translateY(0) scale(1)'
      : `translateY(${offset}px) scale(.8)`,
    transition: reduceMotion ? 'none' : transition,
    transitionDelay: visible && !reduceMotion ? `${delay}ms` : '0ms',
  };

  return (
    <Box
      component="span"
      aria-hidden="true"
      data-wire-target={wireTarget ? '' : undefined}
      sx={[iconSx, ...(Array.isArray(sx) ? sx : [sx])]}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
