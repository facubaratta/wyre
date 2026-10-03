import { useId, useState } from 'react';
import { Box, ButtonBase, Popover } from '@mui/material';
import { usePreferences } from '../preferences/PreferencesContext';
import useControlState from '../controls/useControlState';

const colors = [
  { value: '#c2a27b', name: 'Arena' },
  { value: '#35d0ba', name: 'Menta' },
  { value: '#43a5ff', name: 'Azul' },
  { value: '#a77bff', name: 'Violeta' },
  { value: '#ff6f91', name: 'Rosa' },
  { value: '#f407f0', name: 'Dorado' },
];

function ColorSwatch({
  value,
  name,
  selected,
  onSelect,
}: {
  value: string;
  name: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const { focusVisible, events } = useControlState();
  return (
    <ButtonBase
      aria-label={name}
      aria-pressed={selected}
      title={name}
      onClick={onSelect}
      {...events}
      sx={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: value,
        color: '#181a19',
        border: selected ? '3px solid #ebe8de' : '3px solid transparent',
        outline: focusVisible ? '2px solid #ebe8de' : 'none',
        outlineOffset: 3,
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      {selected ? '✓' : null}
    </ButtonBase>
  );
}

export default function AccentPicker() {
  const { accent, setAccent } = usePreferences();
  const { focusVisible, events } = useControlState();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const id = useId();
  return (
    <>
      <ButtonBase
        aria-label="Elegir color de acento"
        title="Elegir color de acento"
        aria-haspopup="dialog"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? id : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
        {...events}
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: '50%',
          border: '1px solid rgba(235,232,222,.4)',
          outline: focusVisible ? '2px solid var(--accent)' : 'none',
          outlineOffset: 3,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: accent,
          }}
        />
      </ButtonBase>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              p: 2.5,
              borderRadius: 3,
              background: '#202321',
              border: '1px solid rgba(235,232,222,.18)',
            },
          },
        }}
      >
        <Box
          id={id}
          role="dialog"
          aria-label="Color de acento"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 44px)',
            gap: 2,
          }}
        >
          {colors.map((color) => (
            <ColorSwatch
              key={color.value}
              {...color}
              selected={accent === color.value}
              onSelect={() => {
                setAccent(color.value);
                setAnchor(null);
              }}
            />
          ))}
        </Box>
      </Popover>
    </>
  );
}
