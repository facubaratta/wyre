import ContactButtons from '../contact/ContactButtons';
import Box from '@mui/material/Box';
import { styles } from './styles';
import { usePreferences } from '../PreferencesProvider';

export default function ClosingScreen({ progress }: { progress: number }) {
  const { reduceMotion } = usePreferences();
  const visible = progress > 0;
  return (
    <Box
      component="section"
      sx={styles.closing}
      aria-labelledby="closing-heading"
      aria-hidden={progress < 0.5}
      inert={progress < 0.5}
      style={{
        pointerEvents: progress >= 0.5 ? 'auto' : 'none',
        opacity: progress,
        visibility: visible ? 'visible' : 'hidden',
        transform: reduceMotion
          ? undefined
          : `translateY(${(1 - progress) * 6}%)`,
      }}
    >
      <h1
        id="closing-heading"
        aria-label="Tu próxima web, app o perfil en redes sociales"
      >
        Tu próxima <em>web</em>, <em>app</em> o <em>perfil</em> en{' '}
        <em>redes sociales</em>
      </h1>
      <ContactButtons placement="closing" />
    </Box>
  );
}
