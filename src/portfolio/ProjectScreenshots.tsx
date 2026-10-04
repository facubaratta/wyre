import { useLanguage } from '../i18n/LanguageContext';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { Project } from './projects';

type ImageSources = Project['images'];
const srcSet = (images: ImageSources) =>
  images.map(({ src, width }) => `${src} ${width}w`).join(', ');
const sizes = '(max-width: 640px) 88vw, (max-width: 1200px) 80vw, 1100px';

const styles = {
  picture: {
    position: 'absolute',
    inset: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    '@media (max-width:640px)': {
      objectFit: 'cover',
      objectPosition: '50% top',
    },
  },
} satisfies Record<string, SxProps<Theme>>;

export default function ProjectScreenshots({
  projects,
  projectIndex,
  closing,
}: {
  projects: Project[];
  projectIndex: number;
  closing: boolean;
}) {
  const { copy } = useLanguage();
  useEffect(() => {
    if (closing) return;
    const section = document.getElementById('crecimiento-real');
    if (!section) return;
    let nearby = false;
    let retained: HTMLImageElement[] = [];
    const media = window.matchMedia('(max-width: 640px)');
    const preload = () => {
      if (!nearby) return;
      retained = projects
        .filter((_, index) => Math.abs(index - projectIndex) <= 1)
        .map((project) => {
          const images = media.matches ? project.mobileImages : project.images;
          const image = new Image();
          image.decoding = 'async';
          image.sizes = sizes;
          image.srcset = srcSet(images);
          image.src = images.at(-1)!.src;
          void image.decode().catch(() => {
            /* The visible image can retry normally. */
          });
          return image;
        });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        if (nearby) preload();
        else retained.length = 0;
      },
      { rootMargin: '1000px' },
    );
    observer.observe(section);
    media.addEventListener('change', preload);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', preload);
      retained.length = 0;
    };
  }, [projects, projectIndex, closing]);

  return (
    <>
      {projects.map(
        (project, index) =>
          Math.abs(index - projectIndex) <= 1 && (
            <Box
              component="picture"
              key={project.url}
              aria-hidden={index !== projectIndex || closing}
              sx={{
                ...styles.picture,
                opacity: index === projectIndex ? 1 : 0,
              }}
            >
              <source
                type="image/webp"
                media="(max-width: 640px)"
                srcSet={srcSet(project.mobileImages)}
                sizes={sizes}
              />
              <Box
                component="img"
                sx={styles.image}
                src={project.images.at(-1)!.src}
                srcSet={srcSet(project.images)}
                sizes={sizes}
                alt={`${project.name} ${copy.portfolio.screenshot}`}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </Box>
          ),
      )}
    </>
  );
}
