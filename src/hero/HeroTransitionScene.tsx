import FadeIn from '../scroll/FadeIn';
import HeroSection from './HeroSection';

export default function HeroTransitionScene() {
  return (
    <FadeIn id="hero-scene">
      <HeroSection />
    </FadeIn>
  );
}
