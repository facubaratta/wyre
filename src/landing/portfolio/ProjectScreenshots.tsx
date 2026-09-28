import type { Project } from './projects';

export default function ProjectScreenshots({ projects, projectIndex, closing }: { projects: Project[]; projectIndex: number; closing: boolean }) {
  return <>
    {projects.map((project, index) => (
      <picture key={project.url} aria-hidden={index !== projectIndex || closing} style={{ opacity: index === projectIndex ? 1 : 0 }}>
        <source media="(max-width: 640px)" srcSet={project.mobileImage} />
        <img src={project.image} alt={`${project.name} website screenshot`} decoding="async" draggable={false} />
      </picture>
    ))}
  </>;
}
