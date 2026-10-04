export interface WindowScroll {
  y: number;
  viewport: number;
}

const serverSnapshot: WindowScroll = { y: 0, viewport: 900 };
const readWindow = (): WindowScroll =>
  typeof window === 'undefined'
    ? serverSnapshot
    : {
        y: window.scrollY,
        viewport: Math.max(window.innerHeight, 1),
      };
let snapshot = readWindow();
const listeners = new Set<() => void>();
let frame = 0;

function update() {
  frame = 0;
  const next = readWindow();
  if (snapshot.y === next.y && snapshot.viewport === next.viewport) return;
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

export const getWindowScroll = () => snapshot;
export const getServerWindowScroll = () => serverSnapshot;

export function subscribeWindowScroll(listener: () => void) {
  if (!listeners.size) {
    snapshot = readWindow();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size) return;
    cancelAnimationFrame(frame);
    frame = 0;
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}
