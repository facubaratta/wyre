import Box from '@mui/material/Box';
import { lazy, Suspense } from 'react';
import { loadWhenNear } from '../../loading/loadWhenNear';
import { loadExampleFonts } from './loadExampleFonts';
// Keep the authored static markup if a layout update arrives before hydration.
let prerenderedExample = '';
const AiExample = lazy(() => {
  if (!import.meta.env.SSR)
    prerenderedExample = document.getElementById('ai-example')?.innerHTML ?? '';
  return loadWhenNear('ai-example', () => {
    loadExampleFonts();
    return import('./AiExample');
  });
});
function ExampleFallback() {
  return (
    <Box
      sx={{ display: 'contents' }}
      dangerouslySetInnerHTML={{ __html: prerenderedExample }}
    />
  );
}

export default function DeferredAiExample() {
  return (
    <Suspense fallback={<ExampleFallback />}>
      <AiExample />
    </Suspense>
  );
}
