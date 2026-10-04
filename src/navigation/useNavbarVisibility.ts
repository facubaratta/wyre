import { useEffect, useState } from 'react';
import {
  getWindowScroll,
  subscribeWindowScroll,
} from '../scroll/windowScrollStore';

import { heroOverlapsViewport, type NavbarGeometry } from './navbarGeometry';

const SCROLL_THRESHOLD = 8;

export default function useNavbarVisibility() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const scene = document.getElementById('hero-scene');
    const sticky = hero?.parentElement;
    let geometry: NavbarGeometry;
    const measure = () => {
      const bounds = scene?.getBoundingClientRect();
      const style = sticky ? getComputedStyle(sticky) : null;
      geometry = {
        pageHeight: document.documentElement.scrollHeight,
        sceneStart: (bounds?.top ?? 0) + window.scrollY,
        sceneEnd: (bounds?.bottom ?? 0) + window.scrollY,
        heroHeight:
          hero?.getBoundingClientRect().height ?? getWindowScroll().viewport,
        stickyTop: parseFloat(style?.top ?? '0') || 0,
        sticky: style?.position === 'sticky',
      };
    };
    measure();
    const getScrollY = () =>
      Math.max(
        0,
        Math.min(
          getWindowScroll().y,
          Math.max(0, geometry.pageHeight - getWindowScroll().viewport),
        ),
      );
    let previousY = getScrollY();
    const update = () => {
      const y = getScrollY();
      const delta = y - previousY;
      const overlapsHero = heroOverlapsViewport(
        y,
        getWindowScroll().viewport,
        geometry,
      );

      if (y <= SCROLL_THRESHOLD || overlapsHero) {
        setVisible(false);
        previousY = y;
      } else if (Math.abs(delta) >= SCROLL_THRESHOLD) {
        setVisible(delta < 0);
        previousY = y;
      }
    };
    const unsubscribe = subscribeWindowScroll(update);
    update();
    const refresh = () => {
      measure();
      update();
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    if (hero) observer.observe(hero);
    if (scene) observer.observe(scene);
    if (sticky) observer.observe(sticky);
    window.addEventListener('resize', refresh);
    return () => {
      unsubscribe();
      observer.disconnect();
      window.removeEventListener('resize', refresh);
    };
  }, []);

  return visible;
}
