export const DEFAULT_ACCENT = '#f3b797';
const isColor = (value: string | null): value is string =>
  !!value && /^#[\da-f]{6}$/i.test(value);

export function getAccentVariables(
  value: string,
): Record<`--${string}`, string> {
  const accent = isColor(value) ? value : DEFAULT_ACCENT;
  const rgb = [1, 3, 5].map((offset) =>
    parseInt(accent.slice(offset, offset + 2), 16),
  );
  const mix = (target: number[], amount: number) =>
    rgb.map((channel, index) =>
      Math.round(channel + (target[index] - channel) * amount),
    );
  const light = mix([255, 255, 255], 0.4);
  const bright = mix([255, 255, 255], 0.8);
  const dark = mix([24, 26, 25], 0.55);
  const substrate = mix([24, 26, 25], 0.85);
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
