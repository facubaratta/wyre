# Wyre landing page

React, Vite, and MUI. Run `npm install` and `npm run dev` to start locally.

## Source ownership

| Area | Responsibility |
| --- | --- |
| `App.tsx` | Theme, provider composition, and page sections |
| `background/` | Mesh geometry, canvas drawing, pointer interaction, and animation lifecycle |
| `brand/` | Shared graphics, palette utilities, and the logo used by hero and navbar |
| `brand/logo/` | SVG structure, geometry binding, packet updates, and animation lifecycle |
| `controls/` | Shared pointer and keyboard focus state |
| `contact/` | Contact links and buttons |
| `hero/` | Hero copy, wordmark, and fade-in scene |
| `navigation/` | Navbar visibility, height, actions, and language toggle |
| `i18n/` | English/Spanish copy, language context, URL switching, and document metadata |
| `portfolio/` | Sticky project index, art-directed screenshot panels, and contact panel |
| `preferences/` | System reduced-motion preference and fixed brand accent |
| `scroll/` | Window-scroll store, selected scroll snapshots, and viewport-entry fades |
| `sections/` | Web-presence services and illustrations, About content, and section headings |

The hero, navbar, and service sections share a 1200px content width; the portfolio uses a 1280px frame for its sticky index and project panels. Service descriptions and contact links stay visible on mobile; decorative previews appear from the tablet breakpoint. The service grid uses three equal cards followed by two wider cards on desktop, two columns on tablet, and one column on mobile.

Styles belong to their elements: MUI `sx` for layout and appearance, inline styles for continuously changing animation values, and no CSS files.

## Update boundaries

The window-scroll store owns one animation-frame-batched scroll/resize subscription. The navbar selects whether scrolling has started; the portfolio index owns its IntersectionObserver and active-project state. The page has no scroll-sequence or layout-measurement provider.

Sections and service cards fade in when entering the viewport, replaying after they leave and re-enter. Content follows normal document flow; the hero and portfolio are not pinned, and scrolling does not select projects. Portfolio projects remain visible in a vertical showcase, with an active sticky index on desktop and direct website links. Reduced motion disables the fades; prerendered content remains visible without JavaScript.

The background arranges nodes and fine particles along a sweeping ribbon, with soft glow, sparse focal lights, and out-of-focus particles. It retains its position buffers and precomputes possible connections on resize; a maximum-displacement bound excludes pairs that can never connect. Fine particles and glow sprites are cached instead of regenerated or blurred each frame. All layers use the shared purple, pink and peach brand gradient.

The logo precomputes branch/status-light schedules and samples its paths at setup, so animation frames interpolate cached points without reading SVG geometry. Large spill lights move with transforms. Animation suspends when inactive, outside the viewport, or in a hidden document. Compact logos skip circuit initialization. Geometry scripts and design notes live in `brand/logo/`.

`Portfolio.tsx` owns the showcase layout, `PortfolioIndex.tsx` owns the sticky index, `ProjectCard.tsx` owns the website link and heading, and `ProjectArtwork.tsx` owns screenshot presentation. `WebPresencePreview.tsx` owns shared SVG framing and gradients; the illustrations in `sections/WebPresence/previews/` own the individual service sketches.

## Checks

- `npm run build` — strict TypeScript, unused locals/parameters, and production build.
- `npm run lint` — source lint and React hook checks.
- `npm test` — mesh connection parity, scroll-store batching/cleanup, and source-module reachability.
- `python3 src/brand/logo/scripts/generate_geometry.py --check` — authored routes, including Prettier-formatted TypeScript.

## Production delivery

`npm run build` produces static, prerendered pages at `/`, `/en/` and `/es/` in `dist/`; no runtime server is required. English is the default. A small React context selects typed English/Spanish copy without a translation or routing library. The EN/ES toggle switches languages directly; language changes update the URL, copy and metadata. The purple, pink and peach brand palette is fixed. Browser back/forward restores the language, and direct locale URLs work without JavaScript. Service contact messages use the current language. `npm run build:pages -- --base=/own-landing-page/` uses the same pipeline with a deployment subpath. The temporary server bundle is removed after rendering. The client hydrates the existing HTML; the development server still mounts the app directly.

All sections are prerendered and hydrated under React ownership. Inter is the only shipped font family.

Portfolio pictures select responsive WebP sources. The original JPEGs remain source assets; run `npm run images:generate` after changing them to regenerate optimized widths and the source manifest. Project screenshots load lazily as their cards approach the viewport.

Navbar visibility caches the hero scene bounds, refreshing on resize/layout changes.

Contact calls to action retain native WhatsApp URLs when JavaScript is unavailable, including the selected service in its message. The contact panel follows the project showcase, and service contact actions scroll directly to it.

`npx playwright install chromium` installs the browser for `npm run test:browser` after a production build. Tests infer its base path and cover desktop, narrow/tall mobile, short-screen contact access, hydration, responsive image loading, project-index navigation, no-JavaScript contact handoff, and reduced motion. CI runs these checks alongside lint, behavior tests, and the build before publishing.

Check rendered desktop/mobile behavior after changing section geometry or animation timing.
