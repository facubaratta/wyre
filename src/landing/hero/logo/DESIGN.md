# Design and geometry notes

## Visual direction

One cyan conductor color (`#74e0f2`) on a bright blue Y substrate (`#174b9c`). Main traces have a fine core and restrained bloom. Details are PCB branches, vias, registration marks, and contacts rather than illustrated hardware or metallic housings.

The upper arms have compact PCB-style transitions. The four lower conductors use nested cubic curves that follow the glyph's rounded tail. The middle is a wide tapered fan, preserving the letter's visible width rather than gathering every conductor into a tight central bank.

## Coordinate system

The SVG view box is `0 0 556.152 1000`. The Y clip uses Arial/Helvetica bold at 1000 units with baseline `846.5`. The descender extends below the view-box height, so the SVG must keep `overflow: visible`. The outer component bounds contain the entire hero.

The W, R, and E remain live text in the same family and weight. System-font substitutions can slightly change glyph geometry. If replacing the font, regenerate and inspect the Y routes rather than swapping the CSS family alone.

## Topology

| Route index | Origin | Destination |
| --- | --- | --- |
| 0 | Left outer arm | Left outer side departure near the junction |
| 1 | Left middle arm | Inner lower-tail conductor |
| 2 | Left middle arm | Second lower-tail conductor |
| 3 | Left inner arm | Left inner side departure |
| 4 | Right inner arm | Right inner side departure |
| 5 | Right middle arm | Third lower-tail conductor |
| 6 | Right middle arm | Outer lower-tail conductor |
| 7 | Right outer arm | Right outer side departure near the junction |

There are four origins on each top arm, two side departures per arm, and four lower-tail exits. Lower-tail through-route indices are **1, 2, 5, 6**. Exit heights are 956, 984, 1012, and 1040, with consistent 28-unit spacing.

## Editing

- Primary geometry: `scripts/generate_geometry.py` contains authored arm controls and four final cubic tail replacements. Regenerate `geometry.ts` after changing them.
- Branches: `BRANCHES` specifies path, endpoint, parent route, and prominence. Keep branch paths in the spaces between the main tracks.
- Contacts and ports: update the named arrays in `geometry.ts`; keep them clipped to the original glyph.
- Timing: each primary route has a physical `speed` in glyph units per second and launch times in an eight-second cycle. Branch timing is derived from the measured distance to its parent route.
- Palette and typography: `HeroLogo.css` and `SvgDefinitions.tsx` define the static surfaces and light falloff.

Light inside the Y is clipped to its glyph. The separate spill layer is intentionally outside that clip, illuminating the dark background. The letter surfaces receive per-letter radial reflections from the same packet coordinates.

After changing paths, check the middle at several heights and the entire lower bend. Endpoint spacing alone does not guarantee that traces remain evenly separated through the curve. Also check intersections, clipping continuity, branch alignment, and tail counts.
