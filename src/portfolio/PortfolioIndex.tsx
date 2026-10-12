import Box from '@mui/material/Box';
import LinkArrow from '../brand/LinkArrow';
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
          sx={{ color: 'transparent', WebkitTextStroke: '1px #ebe8de' }}
        >
          {language === 'es' ? 'real.' : 'work.'}
        </Box>
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            display: 'inline-block',
            width: 13,
            height: 13,
            ml: 1.5,
            mb: 1,
            borderRadius: '50%',
            background: 'var(--brand-gradient)',
          }}
        />
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
                sx={{ fontSize: 10, fontVariantNumeric: 'tabular-nums' }}
              >
                {String(index + 1).padStart(2, '0')}
              </Box>
              <Box component="span" sx={{ flex: 1 }}>
                {project.name}
              </Box>
              <Box
                component="span"
                aria-hidden="true"
                sx={{ opacity: active === index ? 1 : 0 }}
              >
                <LinkArrow />
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'text.secondary',
            fontSize: 10,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          <Box
            component="span"
            sx={{
              width: 32,
              height: 1,
              background: 'var(--brand-gradient)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
