'use client';

import { useId, useRef, type CSSProperties } from 'react';
import { LitLetter } from './components/LitLetter';
import { YGlyph } from './components/YGlyph';
import { useLogoAnimation } from './useLogoAnimation';

export interface HeroLogoProps {
  className?: string;
  accent?: string;
  showAccentHint?: boolean;
  onAccentChange?: (color: string) => void;
  /** Standard CSS overrides; fontSize controls the wordmark's size. */
  style?: CSSProperties;
  /** Accessible name for the complete wordmark. */
  label?: string;
}

/** Animated wordmark that inherits its size and participates in its parent's layout. */
export function HeroLogo({ className = '', style, label = 'Wyre', accent = '#c2a27b', onAccentChange, showAccentHint = false }: HeroLogoProps) {
  const root = useRef<HTMLDivElement>(null);
  const id = `wyre-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  useLogoAnimation(root);

  return (
    <div ref={root} className={className} style={{ display: 'inline-flex', verticalAlign: 'middle', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 700, lineHeight: 1, ...style }}>
      <div role="group" aria-label={label} style={{ display: 'flex', alignItems: 'baseline', letterSpacing: '-.02em', userSelect: 'none' }}>
        <LitLetter letter="w" />
        <YGlyph id={id} accent={accent} onAccentChange={onAccentChange} showAccentHint={showAccentHint} />
        <LitLetter letter="r" />
        <LitLetter letter="e" />
      </div>
    </div>
  );
}

export default HeroLogo;
