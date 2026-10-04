import { useId, useState } from 'react';
import { Box, ButtonBase, Popover } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import { languagePath } from '../i18n/routes';
import type { Language } from '../i18n/messages';
import { usePreferences } from '../preferences/PreferencesContext';
import useControlState from '../controls/useControlState';

const colors = [
  '#c2a27b',
  '#35d0ba',
  '#43a5ff',
  '#a77bff',
  '#ff6f91',
  '#f407f0',
];

function LanguageOption({
  language,
  selected,
  onSelect,
}: {
  language: Language;
  selected: boolean;
  onSelect: () => void;
}) {
  const { focusVisible, events } = useControlState();
  return (
    <ButtonBase
      component="a"
      href={languagePath(language)}
      lang={language}
      aria-label={language === 'en' ? 'English' : 'Español'}
      aria-current={selected ? 'page' : undefined}
      {...events}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        onSelect();
      }}
      sx={{
        flex: 1,
        minHeight: 44,
        color: selected ? '#181a19' : '#ebe8de',
        background: selected ? 'var(--accent)' : 'transparent',
        border: '1px solid rgba(235,232,222,.25)',
        borderRadius: 1.5,
        fontSize: 14,
        fontWeight: 700,
        outline: focusVisible ? '2px solid var(--accent)' : 'none',
        outlineOffset: 3,
      }}
    >
      {language.toUpperCase()}
    </ButtonBase>
  );
}

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
  const { language, setLanguage, copy } = useLanguage();
  const { focusVisible, events } = useControlState();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const id = useId();
  return (
    <>
      <ButtonBase
        aria-label={copy.picker.label}
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
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: accent,
            display: 'grid',
            placeItems: 'center',
            color: '#181a19',
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {language.toUpperCase()}
        </Box>
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
        <Box id={id} role="dialog" aria-label={copy.picker.label}>
          <Box
            role="group"
            aria-label={copy.picker.language}
            sx={{ display: 'flex', gap: 1, mb: 2 }}
          >
            {(['en', 'es'] as const).map((option) => (
              <LanguageOption
                key={option}
                language={option}
                selected={language === option}
                onSelect={() => setLanguage(option)}
              />
            ))}
          </Box>
          <Box
            role="group"
            aria-label={copy.picker.color}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 44px)',
              gap: 2,
            }}
          >
            {colors.map((value, index) => (
              <ColorSwatch
                key={value}
                value={value}
                name={copy.picker.colors[index]}
                selected={accent === value}
                onSelect={() => setAccent(value)}
              />
            ))}
          </Box>
        </Box>
      </Popover>
    </>
  );
}
