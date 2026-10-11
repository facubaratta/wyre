import { Fragment, memo, useId, useLayoutEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import {
  getWindowScroll,
  subscribeWindowScroll,
} from '../../scroll/windowScrollStore';
import type { SectionWireGeometry } from './sectionWireGeometry';
import { getHeroProgress } from './heroTransitionFrame';
import { between, ease } from './motion';
import { sectionWirePaths } from './sectionWireGeometry';

const flow = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`;

function SectionWires({ geometry }: { geometry: SectionWireGeometry }) {
  const id = `section-wires-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const root = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const paths = [...svg.querySelectorAll<SVGPathElement>('[data-wire-path]')];
    const gradient = svg.querySelector('linearGradient')!;
    let paused = svg.animationsPaused();
    const render = () => {
      const { y, viewport } = getWindowScroll();
      const progress = getHeroProgress(geometry, y);
      const visible =
        progress > 0 &&
        !document.hidden &&
        !(
          progress === 1 &&
          (geometry.sectionBottom < y || geometry.sectionTop > y + viewport)
        );
      svg.style.display = visible ? 'block' : 'none';
      if (paused === visible) {
        paused = !visible;
        svg.style.setProperty(
          '--wire-animation-state',
          paused ? 'paused' : 'running',
        );
        if (paused) svg.pauseAnimations();
        else svg.unpauseAnimations();
      }
      if (!visible) return;
      svg.dataset.wireProgress = String(progress);
      svg.style.opacity = String(ease(between(progress, 0, 0.035)));
      const next = sectionWirePaths(geometry, progress, y);
      next.forEach(({ d }, index) => {
        if (paths[index].getAttribute('d') !== d)
          paths[index].setAttribute('d', d);
      });
      const heroTop = Math.min(
        Math.max(geometry.start - y, geometry.stickyTop),
        geometry.sectionTop - y - geometry.heroHeight,
      );
      const bottom = String(geometry.sectionBottom - y - heroTop);
      if (gradient.getAttribute('y1') !== bottom)
        gradient.setAttribute('y1', bottom);
    };
    const unsubscribe = subscribeWindowScroll(render);
    document.addEventListener('visibilitychange', render);
    render();
    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', render);
    };
  }, [geometry]);
  const paths = sectionWirePaths(geometry, 0, 0);
  const height =
    geometry.heroHeight + geometry.sectionBottom - geometry.sectionTop + 100;
  return (
    <Box
      component="svg"
      data-section-wires
      aria-hidden="true"
      focusable="false"
      ref={root}
      viewBox={`0 0 ${geometry.width} ${height}`}
      fill="none"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
        '& [data-wire-packet]': {
          animation: `${flow} 12.8s linear infinite`,
          animationPlayState: 'var(--wire-animation-state, running)',
        },
      }}
      style={{ display: 'none' }}
    >
      <defs>
        <linearGradient
          id={`${id}-brand`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={height}
          x2={geometry.tails[0].x}
          y2={geometry.tails[0].y}
        >
          <stop stopColor="#bb7bf1" />
          <stop offset=".48" stopColor="#e89ac4" />
          <stop offset="1" stopColor="#ffc397" />
        </linearGradient>
        <radialGradient id={`${id}-light`}>
          <stop stopColor="var(--accent-light)" stopOpacity=".9" />
          <stop
            offset=".16"
            stopColor="var(--accent-light)"
            stopOpacity=".75"
          />
          <stop offset=".4" stopColor="var(--accent)" stopOpacity=".43" />
          <stop offset=".7" stopColor="var(--accent-dark)" stopOpacity=".16" />
          <stop offset="1" stopColor="var(--accent-dark)" stopOpacity="0" />
        </radialGradient>
        {paths.map(({ d }, index) => (
          <path
            data-wire-path
            id={`${id}-${index}`}
            key={index}
            d={d}
            pathLength="1"
          />
        ))}
      </defs>
      {paths.map(({ strokeWidth }, index) => {
        const href = `#${id}-${index}`;
        const delay = [-0.5, -3.06, -7.94, -10.26][index];
        return (
          <Fragment key={index}>
            <use
              href={href}
              stroke={`url(#${id}-brand)`}
              strokeWidth={strokeWidth * 2.8}
              opacity=".08"
            />
            <use
              href={href}
              stroke={`url(#${id}-brand)`}
              strokeWidth={strokeWidth * 2}
              opacity=".16"
            />
            <use
              href={href}
              stroke={`url(#${id}-brand)`}
              strokeWidth={strokeWidth * 1.4}
              opacity=".22"
            />
            <use
              data-section-wire={index}
              href={href}
              stroke={`url(#${id}-brand)`}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              opacity=".85"
            />
            <use
              data-wire-packet
              href={href}
              stroke={`url(#${id}-brand)`}
              strokeWidth={strokeWidth * 3}
              strokeDasharray=".035 .965"
              opacity=".3"
              style={{ animationDelay: `${delay}s` }}
            />
            <use
              data-wire-packet
              href={href}
              stroke="var(--accent-light)"
              strokeWidth={strokeWidth * 0.65}
              strokeLinecap="round"
              strokeDasharray=".011 .989"
              style={{ animationDelay: `${delay}s` }}
            />
            <circle r="48" fill={`url(#${id}-light)`} opacity=".7">
              <animateMotion
                dur="12.8s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              >
                <mpath href={href} />
              </animateMotion>
            </circle>
            <circle r="1.7" fill="var(--accent-light)">
              <animateMotion
                dur="12.8s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              >
                <mpath href={href} />
              </animateMotion>
            </circle>
          </Fragment>
        );
      })}
    </Box>
  );
}

export default memo(SectionWires);
