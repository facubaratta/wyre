import {
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

/** Native control interaction state, for styles applied directly to the control. */
export default function useControlState() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  const events = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== 'touch') setHovered(true);
    },
    onPointerLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      setFocusVisible(false);
      if (event.button === 0) setPressed(true);
    },
    onPointerUp: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
    onFocus: (event: FocusEvent<HTMLElement>) =>
      setFocusVisible(event.currentTarget.matches(':focus-visible')),
    onBlur: () => {
      setFocusVisible(false);
      setPressed(false);
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      setFocusVisible(event.currentTarget.matches(':focus-visible'));
      if (event.key === ' ' || event.key === 'Enter') setPressed(true);
    },
    onKeyUp: () => setPressed(false),
  };

  return { hovered, pressed, focusVisible, events };
}
