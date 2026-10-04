export function getWhatsAppUrl(interest: string | null = null) {
  const message = interest
    ? `Hola Wyre, me interesa ${interest}.`
    : 'Hola, me interesa contactar a Wyre';
  return `https://wa.me/5491133610131?text=${encodeURIComponent(message)}`;
}

export function getEmailUrl(interest: string | null = null) {
  const address = 'mailto:contact@wyre.com.ar';
  return interest
    ? `${address}?subject=${encodeURIComponent('Consulta sobre servicios')}&body=${encodeURIComponent(`Hola Wyre, me interesa ${interest}.`)}`
    : address;
}
