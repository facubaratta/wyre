import Box from '@mui/material/Box';
import { useLanguage } from '../i18n/LanguageContext';
import type { Project } from './projects';
import type { ProjectTheme } from './projectThemes';

export default function ProjectScreenshot({
  project,
  index,
  art,
  hovered,
}: {
  project: Project;
  index: number;
  art: ProjectTheme;
  hovered: boolean;
}) {
  const { copy } = useLanguage();
  return (
    <Box
      component="img"
      src={project.images.at(-1)!.src}
      srcSet={project.images
        .map(({ src, width }) => `${src} ${width}w`)
        .join(', ')}
      sizes="(min-width: 1200px) 620px, (min-width: 900px) 50vw, 76vw"
      alt={`${project.name} ${copy.portfolio.screenshot}`}
      loading="lazy"
      decoding="async"
      sx={{
        display: 'block',
        width: index % 2 ? '92%' : '100%',
        height: 'auto',
        border: '1px solid',
        borderColor: art.accent,
        boxSizing: 'border-box',
        boxShadow: `0 20px 45px -15px ${art.ink}55`,
        '@media (hover: hover)': {
          transform: hovered ? 'translateY(-8px)' : 'none',
        },
        transition: 'transform 400ms cubic-bezier(.2,.7,.2,1)',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          transform: 'none',
        },
      }}
    />
  );
}
