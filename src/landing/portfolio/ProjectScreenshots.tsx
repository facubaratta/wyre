import type { Project } from './projects';

export default function ProjectScreenshots({ projects, projectIndex, closing, enabled }: { projects: Project[]; projectIndex: number; closing: boolean; enabled: boolean }) {
  if (!enabled) return null;
  return <>
    {projects.map((project, index) => Math.abs(index - projectIndex) <= 1 && (
      <picture key={project.url} aria-hidden={index !== projectIndex || closing} style={{ opacity: index === projectIndex ? 1 : 0 }}>
        <source media="(max-width: 640px)" srcSet={project.mobileImage} />
        <img src={project.image} alt={`${project.name} website screenshot`} loading="lazy" decoding="async" draggable={false} />
      </picture>
    ))}
  </>;
}
