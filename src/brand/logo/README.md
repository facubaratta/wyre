# Wyre hero logo

Reusable animated React/TypeScript wordmark component. The accent-colored Y is drawn as a continuous circuit path, with moving energy packets and restrained light spill over the neighboring letters.

## Use

```tsx
import { HeroLogo } from './logo';

export function LandingPage() {
  return <HeroLogo style={{ fontSize: '96px' }} />;
}
```

`HeroLogo.tsx` uses inline layout styles and exposes `style` and accessible `label` props. It has a transparent background and sizes naturally to the wordmark. It inherits font size from its parent, or accepts `style.fontSize` (for example `24px`, `96px`, or a responsive `clamp(...)`). It has no viewport sizing, container queries, fixed width, or page positioning. The parent controls page layout. React 18 and 19 are supported.

The animation uses browser APIs and runs in the client-side React application.

The logo works without `PreferencesProvider`. Its `accent` prop supplies a local palette (default `#c2a27b`), and it reads the system reduced-motion preference directly. Set `animationActive={false}` while hiding the logo to stop animation work; restore it to resume. The hook also pauses while the logo is outside the viewport or the document is hidden. Compact logos omit the circuit animation.

## Files

| File | Responsibility |
| --- | --- |
| `HeroLogo.tsx` | Public component, instance ID, accessible wordmark, animation hook |
| `geometry.ts` | Primary paths, branches, departure ports, schedules, contact fields |
| `createLogoScene.ts` | SVG measurement, fixed packet schedules, DOM bindings |
| `renderLogoFrame.ts` | Packet movement and light reflection |
| `useLogoAnimation.ts` | Visibility, reduced motion, animation scheduling, cleanup |
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
