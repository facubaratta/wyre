import Box from '@mui/material/Box';
import useControlState from '../../controls/useControlState';

export default function ServiceInterestLink({
  service,
  interest,
  onExpand,
  detailsId,
}: {
  service: string;
  interest: string;
  onExpand?: () => void;
  detailsId: string;
}) {
  const { hovered, pressed, focusVisible, events } = useControlState();

  return (
    <Box
      component={onExpand ? 'button' : 'a'}
      href={
        onExpand
          ? undefined
          : `https://wa.me/5491133610131?text=${encodeURIComponent(`Hola Wyre, me interesa ${interest}.`)}`
      }
      target={onExpand ? undefined : '_blank'}
      rel={onExpand ? undefined : 'noopener noreferrer'}
      type={onExpand ? 'button' : undefined}
      onClick={onExpand}
      aria-expanded={onExpand ? false : undefined}
      aria-controls={onExpand ? detailsId : undefined}
      aria-label={
        onExpand
          ? `Ver más: ${service}`
          : `Me interesa: ${service}. Contactar por WhatsApp`
      }
      {...events}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        px: 1.25,
        minHeight: 44,
        borderRadius: 10,
        border: '1px solid',
        borderColor: 'color-mix(in srgb, var(--accent) 45%, transparent)',
        background: hovered || pressed ? 'var(--accent)' : 'transparent',
        color: hovered || pressed ? '#181a19' : 'var(--accent)',
        textDecoration: 'none',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'inherit',
        cursor: 'pointer',
        outline: focusVisible ? '2px solid var(--accent)' : 'none',
        outlineOffset: 4,
      }}
    >
      {onExpand ? 'Ver más' : 'Me interesa'}
      <Box
        component="svg"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        sx={{ width: 14, height: 14 }}
      >
        <path d={onExpand ? 'm5 8 5 5 5-5' : 'M5 15 15 5M5 5h10v10'} />
      </Box>
    </Box>
  );
}
