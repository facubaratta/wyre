import { useState } from 'react';
import { usePreferences } from '../PreferencesProvider';
import {
  SERVICE_DISTANCE,
  SERVICE_START,
  clamp,
  progressBetween,
} from '../scrollTimeline';
import type { WindowScroll } from '../useWindowScroll';

export default function useServiceSequence(
  scroll: WindowScroll,
  serviceCount: number,
) {
  const { reduceMotion } = usePreferences();
  const [manualIndex, setManualIndex] = useState(0);
  const position = scroll.y / scroll.viewport;
  const offset = position - SERVICE_START;
  const index = Math.floor(offset / SERVICE_DISTANCE);
  const progress = (offset / SERVICE_DISTANCE) % 1;

  return {
    manualIndex,
    activeIndex: reduceMotion
      ? manualIndex
      : index >= 0 && index < serviceCount
        ? index
        : -1,
    heroScrollProgress:
      index < 0
        ? progressBetween(position, 0, SERVICE_START)
        : index < serviceCount
          ? clamp((progress - 0.08) / 0.84)
          : 0,
    showAccentHint:
      reduceMotion || position >= SERVICE_START + serviceCount * SERVICE_DISTANCE,
    selectService: (serviceIndex: number) => {
      if (serviceIndex < 0 || serviceIndex >= serviceCount) return;
      if (reduceMotion) {
        setManualIndex(serviceIndex);
        return;
      }

      window.scrollTo({
        top:
          (SERVICE_START + serviceIndex * SERVICE_DISTANCE + 0.05) *
          scroll.viewport,
        behavior: 'instant',
      });
    },
    nextManualService: () =>
      setManualIndex((index) => Math.min(index + 1, serviceCount - 1)),
  };
}
