import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { projects } from './projects';

export default function PortfolioIndex() {
  const { language } = useLanguage();
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

  return (
    <Box
      sx={{
        position: { md: 'sticky' },
        top: 'calc(var(--header-height, 100px) + 32px)',
        pb: { md: 5 },
      }}
    >
      <Box
        component="h2"
        id="growth-heading"
        sx={{
          m: 0,
          fontSize: {
            xs: 'clamp(66px, 18vw, 100px)',
            md: 'clamp(64px, 6.5vw, 94px)',
          },
          fontWeight: 600,
          letterSpacing: '-.075em',
          lineHeight: 0.95,
        }}
      >
        {language === 'es' ? 'Trabajo' : 'Selected'} <br />
        <Box
          component="span"
          sx={{
            color: 'transparent',
            WebkitTextStroke: '1px #ebe8de',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 400,
            letterSpacing: '-.035em',
          }}
        >
          {language === 'es' ? 'real.' : 'work.'}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 7 }}>
        <Box
          component="nav"
          aria-label={
            language === 'es' ? 'Índice de proyectos' : 'Project index'
          }
        >
          {projects.map((project, index) => (
            <Box
              component="a"
              key={project.url}
              href={`#project-${index + 1}`}
              aria-current={active === index ? 'location' : undefined}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.6,
                borderBottom: '1px solid rgba(235,232,222,.12)',
                color: active === index ? '#ebe8de' : '#969890',
                textDecoration: 'none',
                fontSize: 13,
                transition: 'color 180ms ease',
                '&:hover': { color: '#ebe8de' },
                '&:focus-visible': {
                  outline: '2px solid #e89ac4',
                  outlineOffset: 3,
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: 10,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {index + 1}
              </Box>
              <Box component="span" sx={{ flex: 1 }}>
                {project.name}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
