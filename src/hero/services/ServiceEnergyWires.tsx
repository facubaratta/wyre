import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import type { SxProps, Theme } from '@mui/material/styles';
import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { usePreferences } from '../../PreferencesProvider';

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
  open: boolean;
}

interface WireLayout {
  width: number;
  height: number;
  source: { x: number; y: number };
  paths: string[];
}

const pulse = keyframes({ to: { strokeDashoffset: -1 } });
const pulseSx = (index: number) => ({
  animation: `${pulse} 2.4s linear ${index * 0.45}s infinite`,
  filter: 'drop-shadow(0 0 3px var(--accent))',
});

const styles = {
  overlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  } satisfies SxProps<Theme>,
};

/** Routes in CSS pixels, measured from the title and the rendered icon boundaries. */
export default function ServiceEnergyWires({ sectionRef, open }: Props) {
  const { reduceMotion } = usePreferences();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<WireLayout | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!open || !section || !overlay) {
      setLayout(null);
      return;
    }
    const title = section.querySelector<HTMLElement>('[data-wire-source]');
    const icons = Array.from(
      section.querySelectorAll<HTMLElement>('[data-wire-target]'),
    );
    if (!title || !icons.length) return;
    let frame = 0;
    let trackUntil = 0;
    let disposed = false;

    const measure = () => {
      const origin = overlay.getBoundingClientRect();
      const heading = title.getBoundingClientRect();
      // The trunk occupies the gutter between the title's left edge and the icons.
      const trunkX = heading.left - origin.left + 6;
      const source = { x: trunkX + 10, y: heading.bottom - origin.top };
      const elbowY = source.y + 10;
      const paths = icons.map((icon) => {
        const box = icon.getBoundingClientRect();
        const x = box.left - origin.left;
        const y = box.top + box.height / 2 - origin.top;
        const bevel = Math.max(
          0,
          Math.min(8, (y - elbowY) / 2, (x - trunkX) / 2),
        );
        return `M ${source.x} ${source.y} V ${elbowY} L ${trunkX} ${elbowY + 10} V ${y - bevel} L ${trunkX + bevel} ${y} H ${x}`;
      });
      const next = {
        width: origin.width,
        height: origin.height,
        source,
        paths,
      };
      setLayout((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };
    const tick = () => {
      measure();
      frame = performance.now() < trackUntil ? requestAnimationFrame(tick) : 0;
    };
    const sync = () => {
      if (disposed) return;
      // ResizeObserver handles reflow; brief frame tracking also follows icon transforms.
      trackUntil = performance.now() + (reduceMotion ? 0 : 1100);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(sync);
    [section, title, ...icons].forEach((element) => observer.observe(element));
    section.addEventListener('transitionrun', sync);
    window.addEventListener('resize', sync);
    void document.fonts.ready.then(sync);
    measure();
    sync();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      section.removeEventListener('transitionrun', sync);
      window.removeEventListener('resize', sync);
    };
  }, [open, reduceMotion, sectionRef]);

  return (
    <Box ref={overlayRef} aria-hidden="true" sx={styles.overlay}>
      {open && layout && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
        >
          {layout.paths.map((path, index) => (
            <g key={index}>
              <path
                d={path}
                fill="none"
                stroke="var(--accent)"
                strokeOpacity=".65"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              {!reduceMotion && (
                <Box
                  component="path"
                  d={path}
                  pathLength="1"
                  fill="none"
                  stroke="var(--accent-bright)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeDasharray=".075 .925"
                  strokeDashoffset=".075"
                  sx={pulseSx(index)}
                />
              )}
            </g>
          ))}
          <circle
            cx={layout.source.x}
            cy={layout.source.y}
            r="2.5"
            fill="var(--accent-light)"
          />
        </svg>
      )}
    </Box>
  );
}
