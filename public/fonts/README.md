# Local typography

Latin WOFF2 subsets from Google Fonts, downloaded 2026-10-04:

- Manrope v20, variable weights 200–800.
- Instrument Serif v5, regular and italic 400.
- Roboto Mono v31, variable weights 400–700.

The Latin subsets cover the site's Spanish copy, including accented vowels and ñ.
Each family is distributed under its accompanying SIL Open Font License.
Manrope is declared inline and preloaded in index.html. The parody faces are
registered and requested by src/sections/AiExample/loadExampleFonts.ts when
loadWhenNear reaches that section (1000px viewport margin). URLs respect Vite's base.
