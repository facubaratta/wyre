import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { projects } from './projects';

const navigationSx = {
  display: 'flex',
  justifyContent: 'center',
  gap: '24px',
  mt: '22px',
  '& button': {
    font: 'inherit',
    fontSize: '24px',
    width: '44px',
    height: '44px',
    p: 0,
    color: 'var(--accent)',
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    '&:disabled': { opacity: 0.25, cursor: 'default' },
  },
} satisfies SxProps<Theme>;

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
    <Box component="nav" sx={navigationSx} aria-label="Portfolio projects">
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
