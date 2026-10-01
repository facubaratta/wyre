import type { CSSProperties } from 'react';

const letterStyle = {
  paddingRight: '.15em',
  marginRight: '-.15em',
  color: 'transparent',
  backgroundColor: '#ebe8de',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
} satisfies CSSProperties;

export function LitLetter({ letter }: { letter: 'w' | 'r' | 'e' }) {
  return (
    <span data-lit-letter aria-hidden="true" style={letterStyle}>
      {letter}
    </span>
  );
}
