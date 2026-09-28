# Wyre hero logo

Reusable animated React/TypeScript wordmark component. The blue Y is drawn as a continuous circuit path, with moving energy packets and restrained light spill over the neighboring letters.

## Use

```tsx
import { HeroLogo } from './logo';

export function LandingPage() {
  return <HeroLogo style={{ fontSize: '96px' }} />;
}
```

`HeroLogo.tsx` uses inline layout styles, imports scoped artwork CSS, and exposes `className`, `style`, and accessible `label` props. It has a transparent background and sizes naturally to the wordmark. It inherits font size from its parent, or accepts `style.fontSize` (for example `24px`, `96px`, or a responsive `clamp(...)`). It has no viewport sizing, container queries, fixed width, or page positioning. The parent controls page layout. React 18 and 19 are supported.

The animation uses browser APIs and runs in the client-side React application.

## Files

| File | Responsibility |
| --- | --- |
| `HeroLogo.tsx` | Public component, instance ID, accessible wordmark, animation hook |
| `HeroLogo.css` | Scoped hero layout, typography, cyan traces, reduced motion |
| `geometry.ts` | Primary paths, branches, departure ports, schedules, contact fields |
| `useLogoAnimation.ts` | SVG measurements, packet movement, light reflection, lifecycle cleanup |
| `components/` | Letter surfaces, Y glyph, SVG definitions, traces, details, and packet lights |
| `index.ts` | Component and prop type exports |
| `scripts/generate_geometry.py` | Reproducible primary route calculation and validation |
| `scripts/history/` | Original Python scripts from the wider-flow and rounded-tail design passes |
| `DESIGN.md` | Geometry conventions, preserved decisions, editing guide |

## Geometry workflow

Python 3 is only needed when editing the authored geometry:

```sh
python3 scripts/generate_geometry.py --check
python3 scripts/generate_geometry.py --write
```

`--check` confirms that the primary paths and schedules in `geometry.ts` match the authored controls. `--write` replaces only the primary `ROUTES` array; branch and detail edits stay intact. The script uses only Python's standard library.
