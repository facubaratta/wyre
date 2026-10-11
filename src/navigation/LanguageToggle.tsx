import { ButtonBase } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import { languagePath } from '../i18n/routes';
import useControlState from '../controls/useControlState';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { focusVisible, events } = useControlState();
  const next = language === 'en' ? 'es' : 'en';
  return (
    <ButtonBase
      component="a"
      href={languagePath(next)}
      aria-label={next === 'es' ? 'Cambiar a español' : 'Switch to English'}
      lang={next}
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
        setLanguage(next);
      }}
      sx={{
        minWidth: 64,
        minHeight: 44,
        flexShrink: 0,
        borderRadius: 2,
        border: '1px solid rgba(243,183,151,.35)',
        color: 'text.primary',
        fontSize: 12,
        fontWeight: 700,
        gap: 0.75,
        background: 'rgba(15,13,19,.65)',
        outline: focusVisible ? '2px solid var(--accent)' : 'none',
        outlineOffset: 3,
        '&:hover': { background: 'rgba(205,138,235,.15)' },
      }}
    >
      <span style={{ color: language === 'en' ? 'var(--accent)' : undefined }}>
        EN
      </span>
      <span aria-hidden="true" style={{ opacity: 0.35 }}>
        /
      </span>
      <span style={{ color: language === 'es' ? 'var(--accent)' : undefined }}>
        ES
      </span>
    </ButtonBase>
  );
}
