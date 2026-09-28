import type { Project } from './projects';

export default function BrowserToolbar({ project, closing }: { project: Project; closing: boolean }) {
  return (
    <div className={`portfolio__toolbar${closing ? ' portfolio__toolbar--closing' : ''}`} aria-hidden={closing} inert={closing}>
      <div className="portfolio__address">
        <svg aria-hidden="true" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="4.5" y="8.5" width="11" height="8" rx="2" />
          <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
        </svg>
        <span className="portfolio__url">{project.url.replace('https://', '')}</span>
      </div>
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="portfolio__visit" aria-label={`Open ${project.name} in a new tab`} title="Open website in a new tab">↗</a>
    </div>
  );
}
