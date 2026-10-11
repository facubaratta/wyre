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
| `hero/` | Hero copy, wordmark, and fade-in scene |
| `navigation/` | Navbar visibility, height, actions, and language toggle |
| `i18n/` | English/Spanish copy, language context, URL switching, and document metadata |
| `portfolio/` | Project navigation, screenshots, browser frame, and closing screen |
| `preferences/` | Fixed brand palette and system reduced-motion preference |
| `scroll/` | Window-scroll store, dimension-based timeline, layout context, checkpoints, arrow, and shadow |
| `sections/` | Web-presence services, human-decisions content, and section headings |

The hero, navbar, and content sections share a 1200px content width. Service descriptions and contact links stay visible on mobile; decorative previews appear from the tablet breakpoint. The service grid uses three equal cards followed by two wider cards on desktop, two columns on tablet, and one column on mobile.

Styles belong to their elements: MUI `sx` for layout and appearance, inline styles for continuously changing animation values, and no CSS files.

## Update boundaries

The window-scroll store owns one animation-frame-batched scroll/resize subscription. Layout selects viewport height; the navbar selects whether scrolling has started; the portfolio selects the displayed project or closing-screen sentinel. Continuous position does not flow through the page's layout context.

Sections and service cards fade in when entering the viewport, replaying after they leave and re-enter. Content follows normal document flow; the hero and portfolio are not pinned, and scrolling does not select projects. Portfolio controls are always available. Reduced motion disables the fades; prerendered content remains visible without JavaScript.

The mesh retains its position buffers and precomputes possible connections on resize. A maximum-displacement bound excludes pairs that can never connect. Sampled viewports from 390×844 to 2560×1440 require 78–95% fewer pair checks per frame. This measures candidate work, not overall frame rate.

The logo precomputes branch/status-light schedules and samples its paths at setup, so animation frames interpolate cached points without reading SVG geometry. Large spill lights move with transforms. Animation suspends when inactive, outside the viewport, or in a hidden document. Compact logos skip circuit initialization. Geometry scripts and design notes live in `brand/logo/`.

Checkpoint section bounds are read when the arrow is activated. Successive taps retain their pending target. Arrival, reversal, wheel input, touch dragging, keyboard scrolling, and resize clear it.

## Checks

- `npm run build` — strict TypeScript, unused locals/parameters, and production build.
- `npm run lint` — source lint and React hook checks.
- `npm test` — mesh connection parity, scroll-store batching/cleanup, and source-module reachability.
- `python3 src/brand/logo/scripts/generate_geometry.py --check` — authored routes, including Prettier-formatted TypeScript.

## Production delivery

`npm run build` produces static, prerendered pages at `/`, `/en/` and `/es/` in `dist/`; no runtime server is required. English is the default. A small React context selects typed English/Spanish copy without a translation or routing library. The EN/ES toggle switches languages directly; language changes update the URL, copy and metadata. The purple, pink and peach brand palette is fixed. Browser back/forward restores the language, and direct locale URLs work without JavaScript. Service contact messages use the current language. `npm run build:pages -- --base=/own-landing-page/` uses the same pipeline with a deployment subpath. The temporary server bundle is removed after rendering. The client hydrates the existing HTML; the development server still mounts the app directly.

The example component code loads when its section approaches within 1000px of the viewport. Its static HTML is present from the first response, and fallback markup preserves the layout during early hydration updates. The portfolio stays under live React ownership from the initial render so scroll/context updates and development hot reload cannot leave it displaying a static snapshot. Section containers stay mounted so dimensions and scroll checkpoints remain measurable. Fonts are unchanged.

Portfolio pictures select responsive WebP sources. The original JPEGs remain source assets; run `npm run images:generate` after changing them to regenerate optimized widths and the source manifest. The current and adjacent screenshots are explicitly decoded near the portfolio; distant projects are not prefetched.

Navbar visibility caches the sticky hero's scene bounds, refreshing on resize/layout changes. The arrow selects discrete rendering state; its pending checkpoint tracking subscribes directly to the scroll store.

Contact calls to action retain native WhatsApp URLs when JavaScript is unavailable, including the selected service in its message. The closing panel scrolls within the browser frame on short screens, with contact buttons sized to the frame's width.

`npx playwright install chromium` installs the browser for `npm run test:browser` after a production build. Tests infer its base path and cover desktop, narrow/tall mobile, short-screen contact access, deferred loading without section-height changes, image selection, scroll navigation, no-JavaScript contact handoff, and reduced motion. CI runs these checks alongside lint, behavior tests, and the build before publishing.

Check rendered desktop/mobile behavior after changing section geometry or animation timing. Portfolio navigation uses the same closing-screen sentinel; the closing arrow returns to the top and resets the first project without smooth scrolling.
