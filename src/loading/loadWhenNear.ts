/** Prerender immediately; hydrate an existing below-fold boundary near the viewport. */
export async function loadWhenNear<T>(
  id: string,
  load: () => Promise<T>,
): Promise<T> {
  if (!import.meta.env.SSR && 'IntersectionObserver' in window) {
    const element = document.getElementById(id);
    if (element)
      await new Promise<void>((resolve) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            resolve();
          },
          { rootMargin: '1000px' },
        );
        observer.observe(element);
      });
  }
  return load();
}
