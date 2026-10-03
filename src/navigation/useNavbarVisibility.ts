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

      if (y <= SCROLL_THRESHOLD) {
        setVisible(false);
        previousY = y;
      } else if (Math.abs(delta) >= SCROLL_THRESHOLD) {
        setVisible(delta < 0);
        previousY = y;
      }
    };
    return subscribeWindowScroll(update);
  }, []);

  return visible;
}
