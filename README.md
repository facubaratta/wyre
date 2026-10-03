# Wyre landing page

React, Vite, and MUI. Run `npm install` and `npm run dev` to start locally.

## Source ownership

| Area | Responsibility |
| --- | --- |
| `App.tsx` | Theme, provider composition, and page sections |
| `background/` | Mesh geometry, canvas drawing, pointer interaction, and animation lifecycle |
| `brand/` | Equation icons and the logo shared by hero and navbar |
| `brand/logo/` | SVG structure, geometry binding, packet updates, and animation lifecycle |
| `controls/` | Shared pointer and keyboard focus state |
| `contact/` | Contact links and buttons |
| `hero/` | Hero copy, wordmark, and sticky scene |
| `hero/transition/` | Hero-to-web title/globe measurement, interpolation, rendering, and scroll lifecycle |
| `navigation/` | Navbar visibility, height, actions, and accent picker |
| `portfolio/` | Sticky scene, project selection, screenshots, browser frame, and closing screen |
| `preferences/` | Accent palette and system reduced-motion preference |
| `scroll/` | Window-scroll store, dimension-based timeline, layout context, checkpoints, arrow, and shadow |
| `sections/` | Web-presence services, human-decisions content, and section headings |

Styles belong to their elements: MUI `sx` for layout and appearance, inline styles for continuously changing animation values, and no CSS files.

## Update boundaries

The window-scroll store owns one animation-frame-batched scroll/resize subscription. Layout selects viewport height; the navbar selects whether scrolling has started; the portfolio selects the displayed project or closing-screen sentinel. Continuous position does not flow through the page's layout context.

The title transition separates continuous frames, hero fade progress, and discrete visibility flags. The navbar and equation receive visibility flags. The hero stops rerendering when its fade is complete. Geometry measurement, interpolation, overlay rendering, and event handling live in separate modules.

The mesh retains its position buffers and precomputes possible connections on resize. A maximum-displacement bound excludes pairs that can never connect. Sampled viewports from 390×844 to 2560×1440 require 78–95% fewer pair checks per frame. This measures candidate work, not overall frame rate.

The logo precomputes branch/status-light schedules and suspends animation when inactive, outside the viewport, or in a hidden document. Compact logos skip circuit initialization. Geometry scripts and design notes live in `brand/logo/`.

Checkpoint section bounds are read when the arrow is activated. Successive taps retain their pending target. Arrival, reversal, wheel input, touch dragging, keyboard scrolling, and resize clear it.

## Checks

- `npm run build` — strict TypeScript, unused locals/parameters, and production build.
- `npm run lint` — source lint and React hook checks.
- `npm test` — mesh connection parity, portfolio boundaries, title/globe endpoints and reversal, scroll-store batching/cleanup, and source-module reachability.
- `python3 src/brand/logo/scripts/generate_geometry.py --check` — authored routes, including Prettier-formatted TypeScript.

Check rendered desktop/mobile behavior after changing section geometry or animation timing. Reduced motion uses manual portfolio navigation and the same closing-screen sentinel.
