import { gradientFocusSx } from '../../brand/colors';
import { useId } from 'react';
import BrandGradient from '../../brand/BrandGradient';
import { useLanguage } from '../../i18n/LanguageContext';
import Box from '@mui/material/Box';
import type { MouseEvent } from 'react';
import useControlState from '../../controls/useControlState';
import useOpenContact from '../../contact/useOpenContact';
import { getWhatsAppUrl } from '../../contact/contactUrls';

export default function ServiceInterestLink({
  service,
  interest,
}: {
  service: string;
  interest: number;
}) {
  const { hovered, pressed, focusVisible, events } = useControlState();
  const openContact = useOpenContact();
  const { language, copy } = useLanguage();

  const gradientId = `brand-${useId().replace(/:/g, '')}`;
  return (
    <Box
      component="a"
      href={getWhatsAppUrl(interest, language)}
      onClick={(event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        openContact(interest);
      }}
      aria-label={`${copy.web.interested}: ${service}. ${copy.web.contactOptions}`}
      {...events}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        justifyContent: 'center',
        width: 44,
        px: 0,
        minHeight: 44,
        borderRadius: '50%',
        border: '1px solid #e9bd9b99',
        background: hovered ? '#ffc39718' : 'transparent',
        color: '#e9bd9b',
        opacity: hovered || pressed ? 0.75 : 1,
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit',
        cursor: 'pointer',
        position: 'relative',
        isolation: 'isolate',
        ...(focusVisible ? gradientFocusSx : {}),
        outlineOffset: 4,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 20 20"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        sx={{ width: 22, height: 22 }}
      >
        <BrandGradient id={gradientId} />
        <path d="M4 10h12M10 4l6 6-6 6" />
      </Box>
    </Box>
  );
}
