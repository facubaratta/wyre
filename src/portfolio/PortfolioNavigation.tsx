import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import PortfolioNavigationButton from './PortfolioNavigationButton';
import { projects } from './projects';

const navigationSx = {
  display: 'flex',
  justifyContent: 'center',
  gap: '24px',
  mt: '22px',
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
      <PortfolioNavigationButton
        onClick={() => onSelect(Math.max(0, selectedIndex - 1))}
        disabled={selectedIndex === 0}
        aria-label="Previous project"
      >
        ←
      </PortfolioNavigationButton>
      <PortfolioNavigationButton
        onClick={() => onSelect(Math.min(projects.length, selectedIndex + 1))}
        disabled={selectedIndex === projects.length}
        aria-label={
          projectIndex === projects.length - 1
            ? 'Show closing screen'
            : 'Next project'
        }
      >
        →
      </PortfolioNavigationButton>
    </Box>
  );
}
