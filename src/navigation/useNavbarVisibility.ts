import { useEffect, useState } from 'react';
import {
  getWindowScroll,
  subscribeWindowScroll,
} from '../scroll/windowScrollStore';

const SCROLL_THRESHOLD = 8;

export default function useNavbarVisibility() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getScrollY = () =>
      Math.max(
        0,
        Math.min(
          getWindowScroll().y,
          document.documentElement.scrollHeight - getWindowScroll().viewport,
        ),
      );
    let previousY = getScrollY();
    const update = () => {
      const y = getScrollY();
      const delta = y - previousY;
      const heroBounds = document
        .getElementById('hero')
        ?.getBoundingClientRect();
      const overlapsHero = heroBounds
        ? heroBounds.bottom > 0 && heroBounds.top < getWindowScroll().viewport
        : y <= getWindowScroll().viewport;

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
    return unsubscribe;
  }, []);

  return visible;
}
