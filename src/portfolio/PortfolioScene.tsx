import FadeIn from '../scroll/FadeIn';
import Portfolio from './Portfolio';

export default function PortfolioScene() {
  return (
    <FadeIn
      id="crecimiento-real"
      sx={{
        position: 'relative',
        scrollMarginTop: 'var(--header-height, 100px)',
      }}
    >
      <Portfolio />
    </FadeIn>
  );
}
