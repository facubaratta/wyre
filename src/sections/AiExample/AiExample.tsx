import Box from '@mui/material/Box';
import BrowserFrame from './BrowserFrame';
import ExampleHero from './ExampleHero';
import ExamplePatterns from './ExamplePatterns';
import ExampleActions from './ExampleActions';

// Adapted from https://tangled.org/oppi.li/every-fucking-website.
export default function AiExample() {
  return (
    <BrowserFrame>
      <Box
        lang="es"
        sx={{
          height: '100%',
          bgcolor: '#f0eee6',
          color: '#141413',
          fontFamily: '"Roboto Mono", monospace',
        }}
      >
        <Box
          sx={{
            p: 'clamp(20px, 6cqw, 32px)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4cqw',
          }}
        >
          <ExampleHero />
          <ExamplePatterns />
          <ExampleActions />
        </Box>
      </Box>
    </BrowserFrame>
  );
}
