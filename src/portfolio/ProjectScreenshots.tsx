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
                alt={`${project.name} website screenshot`}
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
