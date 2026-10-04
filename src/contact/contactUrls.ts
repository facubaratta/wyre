import { messages, type Language } from '../i18n/messages';
import {
  services,
  type ServiceInterest,
} from '../sections/WebPresence/services';

function contactMessage(interest: ServiceInterest, language: Language) {
  const copy = messages[language].contact;
  const service = interest === null ? undefined : services[language][interest];
  return service
    ? `${copy.greeting} ${service.interest}.`
    : copy.defaultMessage;
}

export function getWhatsAppUrl(
  interest: ServiceInterest = null,
  language: Language = 'en',
) {
  const message = contactMessage(interest, language);
  return `https://wa.me/5491133610131?text=${encodeURIComponent(message)}`;
}

export function getEmailUrl(
  interest: ServiceInterest = null,
  language: Language = 'en',
) {
  const address = 'mailto:contact@wyre.com.ar';
  return interest !== null
    ? `${address}?subject=${encodeURIComponent(messages[language].contact.subject)}&body=${encodeURIComponent(contactMessage(interest, language))}`
    : address;
}
