import Box from '@mui/material/Box';
import LinkArrow from '../brand/LinkArrow';
import { useLanguage } from '../i18n/LanguageContext';
import type { Project } from './projects';
import { projectThemes } from './projectThemes';

export default function ProjectArtwork({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { copy, language } = useLanguage();
  const art = projectThemes[index % projectThemes.length];
  const number = String(index + 1).padStart(2, '0');
  const domain = new URL(project.url).hostname.replace(/^www\./, '');
  return (
    <Box
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: art.align,
        background: art.background,
        color: art.ink,
        px: { xs: 3, md: 5 },
        pt: { xs: 3, md: 4 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          mb: { xs: 3, md: 4 },
        }}
      >
        <Box
          component="h3"
          sx={{
            m: 0,
            fontSize: { xs: 27, md: 'clamp(30px, 3vw, 44px)' },
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-.045em',
          }}
        >
          {project.name}
        </Box>
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: '78%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: art.accent,
          opacity: 0.45,
          top: index % 2 ? '-40%' : '32%',
          left: index % 2 ? '35%' : '-25%',
          zIndex: -1,
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: '-.16em',
          left: '.015em',
          fontSize: { xs: '160px', md: '260px' },
          fontWeight: 600,
          letterSpacing: '-.085em',
          lineHeight: 1,
          opacity: 0.12,
          zIndex: -1,
        }}
      >
        {number}
      </Box>
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
          transition: 'transform 400ms cubic-bezier(.2,.7,.2,1)',
        }}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1.5,
          mt: { xs: 3, md: 4 },
          fontSize: 11,
        }}
      >
        <Box component="span" sx={{ overflowWrap: 'anywhere' }}>
          {domain}
        </Box>
        <Box
          component="span"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            ml: 'auto',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          {language === 'es' ? 'Explorar el sitio' : 'Explore the website'}
          <Box
            component="span"
            data-project-arrow
            aria-hidden="true"
            sx={{ display: 'flex', transition: 'transform 250ms ease' }}
          >
            <LinkArrow />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
