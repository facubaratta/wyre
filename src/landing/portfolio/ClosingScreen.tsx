import ContactButtons from '../../contact/ContactButtons';
import './portfolio.css';
import { usePreferences } from '../../preferences/PreferencesProvider';

export default function ClosingScreen({ progress }: { progress: number }) {
  const { reduceMotion } = usePreferences();
  const visible = progress > 0;
  return (
    <section className="closing-screen"
      aria-labelledby="closing-heading" aria-hidden={progress < .5} inert={progress < .5}
      style={{ pointerEvents: progress >= .5 ? 'auto' : 'none', opacity: progress, visibility: visible ? 'visible' : 'hidden',
        transform: reduceMotion ? undefined : `translateY(${(1 - progress) * 6}%)` }}>
      <h1 id="closing-heading" aria-label="Tu próxima web, app o perfil en redes sociales">
        Tu próxima <em>web</em>, <em>app</em> o <em>perfil</em> en <em>redes sociales</em>
      </h1>
      <ContactButtons />
    </section>
  );
}
