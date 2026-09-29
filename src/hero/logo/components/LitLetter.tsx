export function LitLetter({ letter }: { letter: 'w' | 'r' | 'e' }) {
  return (
    <span
      data-lit-letter
      aria-hidden="true"
      style={{
        paddingRight: '.15em',
        marginRight: '-.15em',
        color: 'transparent',
        backgroundColor: '#ebe8de',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
      }}
    >
      {letter}
    </span>
  );
}
