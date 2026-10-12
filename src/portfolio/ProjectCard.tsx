import LinkArrow from '../brand/LinkArrow';
import Box from '@mui/material/Box';
import { useLanguage } from '../i18n/LanguageContext';
import { projects, type Project } from './projects';
import ProjectArtwork from './ProjectArtwork';

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { copy, language } = useLanguage();
  const number = String(index + 1).padStart(2, '0');
  return (
    <Box
      component="article"
      id={`project-${index + 1}`}
      sx={{ scrollMarginTop: 'calc(var(--header-height, 100px) + 32px)' }}
    >
      <Box
        component="a"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} — ${copy.portfolio.visit}`}
        sx={{
          position: 'relative',
          display: 'block',
          color: 'inherit',
          textDecoration: 'none',
          '&:focus-visible': { outline: '2px solid #e89ac4', outlineOffset: 8 },
          '@media (hover: hover)': {
            '&:hover img': { transform: 'translateY(-8px)' },
            '&:hover [data-project-arrow]': {
              background: '#ebe8de',
              color: '#181a19',
              transform: 'rotate(45deg)',
            },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '& img, & [data-project-arrow]': {
              transition: 'none',
              transform: 'none !important',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: { xs: 2, md: 3 },
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
          <Box
            component="span"
            data-project-arrow
            aria-hidden="true"
            sx={{
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              width: { xs: 42, md: 52 },
              height: { xs: 42, md: 52 },
              border: '1px solid rgba(235,232,222,.3)',
              borderRadius: '50%',
              fontSize: 25,
              transition:
                'transform 250ms ease, background 250ms ease, color 250ms ease',
            }}
          >
            <LinkArrow />
          </Box>
        </Box>
        <ProjectArtwork project={project} index={index} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1.5,
            color: 'text.secondary',
            fontSize: 11,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          <Box component="span">
            {number} / {String(projects.length).padStart(2, '0')}
          </Box>
          <Box component="span">
            {language === 'es' ? 'Explorar el sitio' : 'Explore the website'}{' '}
            <LinkArrow />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
