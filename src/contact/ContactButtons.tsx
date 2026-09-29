import Box from '@mui/material/Box';
import ContactLink from './ContactLink';
import type { ContactPlacement } from './ContactLink';

type Placement = ContactPlacement;

const whatsappUrl = `https://wa.me/5491133610131?text=${encodeURIComponent(
  'Hola, me interesa contactar a Wyre',
)}`;

const iconProps = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const;

function EmailIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg {...iconProps} fill="currentColor">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 1.8 17.8L.2 23.6l6-1.6A11.9 11.9 0 0 0 24 11.9c0-3.2-1.2-6.2-3.5-8.4ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.6 1 1-3.5-.3-.4A9.9 9.9 0 1 1 12 21.8Zm5.4-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6L8.7 6.9c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z" />
    </svg>
  );
}

const contactLinks = [
  {
    href: whatsappUrl,
    label: 'WhatsApp: +54 9 11 3361-0131',
    title: '+54 9 11 3361-0131',
    emphasized: true,
    external: true,
    icon: <WhatsAppIcon />,
  },
  {
    href: 'mailto:contact@wyre.com.ar',
    label: 'Mail: contact@wyre.com.ar',
    title: 'contact@wyre.com.ar',
    icon: <EmailIcon />,
  },
];

const containerSx = (placement: Placement) => ({
  mt: 5,
  display: 'flex',
  flexWrap: 'wrap',
  gap: placement === 'hero'
    ? { xs: '10px', sm: '16px' }
    : placement === 'closing'
      ? { xs: '8px', sm: '14px' }
      : '10px',
  ...(placement === 'hero' ? { justifyContent: 'center' } : {}),
  ...(placement === 'closing' ? { width: { xs: '100%', sm: 'auto' } } : {}),
});

export default function ContactButtons({ placement = 'default' }: { placement?: Placement }) {
  return (
    <Box component="nav" aria-label="Contactar a Wyre" sx={containerSx(placement)}>
      {contactLinks.map(({ icon, emphasized = false, ...link }) => (
        <ContactLink
          key={link.href}
          {...link}
          emphasized={emphasized}
          placement={placement}
        >
          {icon}
        </ContactLink>
      ))}
    </Box>
  );
}
