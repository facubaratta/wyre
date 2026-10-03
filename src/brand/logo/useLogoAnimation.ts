import { useEffect, type RefObject } from 'react';
import useReducedMotion from '../../preferences/useReducedMotion';
import { createLogoScene } from './createLogoScene';
import { renderLogoFrame } from './renderLogoFrame';

const animatedSelector =
  '[data-packet-trail],[data-packet-head],[data-packet-dot],[data-packet-light],[data-packet-wake],[data-spill-light],[data-branch-flow],[data-branch-flare],[data-port-light]';

/** React owns the SVG structure; this hook manages animation lifetime only. */
export function useLogoAnimation(
  rootRef: RefObject<HTMLDivElement | null>,
  active = true,
) {
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !active) return;
    const scene = createLogoScene(root);
    let layout = scene.measure();
    const resize = new ResizeObserver(() => {
      layout = scene.measure();
    });
    resize.observe(root);
    const animated = root.querySelectorAll<SVGElement>(animatedSelector);
    let frame = 0;
    let elapsed = 0;
    let lastFrame = 0;
    let lastDraw = 0;
    let visible = true;
    const frameInterval = 1000 / 60;
    const render = (now: number) => {
      if (now - lastDraw < frameInterval - 0.1) {
        frame = requestAnimationFrame(render);
        return;
      }
      if (lastFrame) elapsed += (now - lastFrame) / 1600;
      lastFrame = now;
      lastDraw = now;
      renderLogoFrame(scene, layout, elapsed);
      frame = requestAnimationFrame(render);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      lastFrame = lastDraw = 0;
      animated.forEach((element) => {
        element.style.display = reduceMotion ? 'none' : '';
      });
      if (reduceMotion) {
        scene.letters.forEach((letter) => {
          letter.style.backgroundImage = '';
        });
      } else if (!document.hidden && visible) {
        frame = requestAnimationFrame(render);
      }
    };
    // The hero can remain mounted below a tall viewport after its fade is restored.
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(root);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      scene.letters.forEach((letter) => {
        letter.style.backgroundImage = '';
      });
    };
  }, [rootRef, reduceMotion, active]);
}
