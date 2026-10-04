let started = false;

/** Load parody typography only when its existing hydration boundary is near. */
export function loadExampleFonts() {
  if (import.meta.env.SSR || started || !('FontFace' in window)) return;
  started = true;
  const faces = [
    new FontFace(
      'Instrument Serif',
      `url("${import.meta.env.BASE_URL}fonts/instrument-serif-latin.woff2")`,
      { style: 'normal', weight: '400', display: 'swap' },
    ),
    new FontFace(
      'Instrument Serif',
      `url("${import.meta.env.BASE_URL}fonts/instrument-serif-latin-italic.woff2")`,
      { style: 'italic', weight: '400', display: 'swap' },
    ),
    new FontFace(
      'Roboto Mono',
      `url("${import.meta.env.BASE_URL}fonts/roboto-mono-latin-variable.woff2")`,
      { style: 'normal', weight: '400 700', display: 'swap' },
    ),
  ];
  for (const face of faces) {
    document.fonts.add(face);
    // Keep the section usable with its authored fallbacks if a request fails.
    void face.load().catch(() => {});
  }
}
