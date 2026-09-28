import type { ReactNode } from 'react';

interface Props {
  href: string;
  label: string;
  title: string;
  children: ReactNode;
  emphasized?: boolean;
  external?: boolean;
}

export default function ContactLink({ href, label, title, children, emphasized = false, external = false }: Props) {
  return (
    <a className={`contact-buttons__link${emphasized ? ' contact-buttons__link--whatsapp' : ''}`} href={href}
      aria-label={label} title={title} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}
      <span>{title}</span>
    </a>
  );
}
