import Box from '@mui/material/Box';
import { useLanguage } from '../i18n/LanguageContext';
import type { Project } from './projects';

const artDirections = [
  { background: '#dce5da', ink: '#344d3c', accent: '#a4bea8', align: 'center' },
  {
    background: '#e8d9c8',
    ink: '#654938',
    accent: '#c4a281',
    align: 'flex-end',
  },
  { background: '#492b35', ink: '#f4c8ab', accent: '#ad604c', align: 'center' },
  {
    background: '#c9dce7',
    ink: '#254963',
    accent: '#8daec5',
    align: 'flex-start',
  },
  { background: '#d1c4e5', ink: '#463156', accent: '#aa8dcc', align: 'center' },
] as const;

export default function ProjectArtwork({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { copy, language } = useLanguage();
  const art = artDirections[index % artDirections.length];
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
        pt: { xs: 7, md: 11 },
        pb: { xs: 7, md: 11 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 24, md: 32 },
          right: { xs: 24, md: 32 },
          top: { xs: 20, md: 24 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 10,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
        }}
      >
        <Box component="span">WYRE / {number}</Box>
        <Box component="span">
          {language === 'es' ? 'Proyecto web' : 'Web project'}
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
          boxShadow: `0 20px 45px -15px ${art.ink}55`,
          transition: 'transform 400ms cubic-bezier(.2,.7,.2,1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 24 },
          right: { xs: 24, md: 32 },
          fontSize: 11,
          letterSpacing: '.015em',
        }}
      >
        {domain}
      </Box>
    </Box>
  );
}
