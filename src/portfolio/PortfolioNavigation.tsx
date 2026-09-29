import Box from '@mui/material/Box';
import { projects } from './projects';
import { styles } from './styles';

interface Props {
  selectedIndex: number;
  projectIndex: number;
  onSelect: (index: number) => void;
}

export default function PortfolioNavigation({
  selectedIndex,
  projectIndex,
  onSelect,
}: Props) {
  return (
    <Box component="nav" sx={styles.navigation} aria-label="Portfolio projects">
      <button
        onClick={() => onSelect(Math.max(0, selectedIndex - 1))}
        disabled={selectedIndex === 0}
        aria-label="Previous project"
      >
        ←
      </button>
      <button
        onClick={() => onSelect(Math.min(projects.length, selectedIndex + 1))}
        disabled={selectedIndex === projects.length}
        aria-label={
          projectIndex === projects.length - 1
            ? 'Show closing screen'
            : 'Next project'
        }
      >
        →
      </button>
    </Box>
  );
}
