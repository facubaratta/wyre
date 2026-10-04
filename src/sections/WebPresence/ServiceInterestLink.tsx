import { useLanguage } from '../../i18n/LanguageContext';
import Box from '@mui/material/Box';
import type { MouseEvent } from 'react';
import useControlState from '../../controls/useControlState';
import useOpenContact from '../../contact/useOpenContact';
import { getWhatsAppUrl } from '../../contact/contactUrls';

export default function ServiceInterestLink({
  service,
  interest,
  onExpand,
  detailsId,
}: {
  service: string;
  interest: number;
  onExpand?: () => void;
  detailsId: string;
}) {
  const { hovered, pressed, focusVisible, events } = useControlState();
  const openContact = useOpenContact();
  const { language, copy } = useLanguage();

  return (
    <Box
      component={onExpand ? 'button' : 'a'}
      href={onExpand ? undefined : getWhatsAppUrl(interest, language)}
      type={onExpand ? 'button' : undefined}
      onClick={(event: MouseEvent<HTMLElement>) => {
        if (onExpand) {
          onExpand();
        } else {
          event.preventDefault();
          openContact(interest);
        }
      }}
      aria-expanded={onExpand ? false : undefined}
      aria-controls={onExpand ? detailsId : undefined}
      aria-label={
        onExpand
          ? `${copy.web.more}: ${service}`
          : `${copy.web.interested}: ${service}. ${copy.web.contactOptions}`
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
      {onExpand ? copy.web.more : copy.web.interested}
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
