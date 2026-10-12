import { useEffect, useState } from 'react';
import { projects } from './projects';

export default function useActiveProject() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry)
          setActive(Number(entry.target.id.replace('project-', '')) - 1);
      },
      { rootMargin: '-15% 0px -45% 0px' },
    );
    projects.forEach((_, index) => {
      const element = document.getElementById(`project-${index + 1}`);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}
