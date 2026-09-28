import { useCallback, useLayoutEffect, useState } from 'react';

export const DEFAULT_ACCENT = '#c2a27b';
const isColor = (value: string | null): value is string => !!value && /^#[\da-f]{6}$/i.test(value);

export function getAccentVariables(value: string): Record<`--${string}`, string> {
  const accent = isColor(value) ? value : DEFAULT_ACCENT;
  const rgb = [1, 3, 5].map(offset => parseInt(accent.slice(offset, offset + 2), 16));
  const mix = (target: number[], amount: number) => rgb.map((channel, index) => Math.round(channel + (target[index] - channel) * amount));
  const light = mix([255, 255, 255], .4);
  const bright = mix([255, 255, 255], .8);
  const dark = mix([24, 26, 25], .55);
  const substrate = mix([24, 26, 25], .85);
  return {
    '--accent': accent,
    '--accent-rgb': rgb.join(','),
    '--accent-light': `rgb(${light.join(',')})`,
    '--accent-light-rgb': light.join(','),
    '--accent-bright': `rgb(${bright.join(',')})`,
    '--accent-bright-rgb': bright.join(','),
    '--accent-dark': `rgb(${dark.join(',')})`,
    '--accent-substrate': `rgb(${substrate.join(',')})`,
  };
}

export default function useAccentColor() {
  const [accent, setAccent] = useState(DEFAULT_ACCENT);

  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.entries(getAccentVariables(accent)).forEach(([name, value]) => root.style.setProperty(name, value));
  }, [accent]);

  const updateAccent = useCallback((value: string) => { if (isColor(value)) setAccent(value); }, []);
  return { accent, setAccent: updateAccent };
}
