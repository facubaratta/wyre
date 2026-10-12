import { useId, useRef, type CSSProperties } from 'react';
import { LitLetter } from './components/LitLetter';
import { YGlyph } from './components/YGlyph';
import { useLogoAnimation } from './useLogoAnimation';
import {
  DEFAULT_ACCENT,
  getAccentVariables,
} from '../../brand/accentVariables';

const logoStyle = {
  display: 'inline-flex',
  verticalAlign: 'middle',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontWeight: 700,
  lineHeight: 1,
} satisfies CSSProperties;

export interface HeroLogoProps {
  accent?: string;
  compact?: boolean;
  /** Suspend animation while the wordmark is hidden. */
  animationActive?: boolean;
  /** Standard CSS overrides; fontSize controls the wordmark's size. */
  style?: CSSProperties;
  /** Accessible name for the complete wordmark. */
  label?: string;
}

/** Animated wordmark that inherits its size and participates in its parent's layout. */
export function HeroLogo({
  style,
  compact = false,
  label = 'Wyre',
  accent = DEFAULT_ACCENT,
  animationActive = true,
}: HeroLogoProps) {
  const root = useRef<HTMLDivElement>(null);
  const id = `wyre-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  useLogoAnimation(root, animationActive && !compact);

  return (
    <div
      ref={root}
      style={{ ...logoStyle, ...getAccentVariables(accent), ...style }}
    >
      <div
        role="group"
        aria-label={label}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          letterSpacing: '-.02em',
          userSelect: 'none',
        }}
      >
        <LitLetter letter="w" />
        <YGlyph compact={compact} id={id} />
        <LitLetter letter="r" />
        <LitLetter letter="e" />
      </div>
    </div>
  );
}

export default HeroLogo;
