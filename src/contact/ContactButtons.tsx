import './contact.css';
import ContactLink from './ContactLink';
import EmailIcon from './icons/EmailIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const whatsappUrl = `https://wa.me/5491133610131?text=${encodeURIComponent('Hola, me interesa contactar a Wyre')}`;

export default function ContactButtons() {
  return (
    <nav className="contact-buttons" aria-label="Contactar a Wyre">
      <ContactLink href={whatsappUrl} label="WhatsApp: +54 9 11 3361-0131" title="+54 9 11 3361-0131" emphasized external><WhatsAppIcon /></ContactLink>
      <ContactLink href="mailto:contact@wyre.com.ar" label="Mail: contact@wyre.com.ar" title="contact@wyre.com.ar"><EmailIcon /></ContactLink>
    </nav>
  );
}
