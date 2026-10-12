import Box from '@mui/material/Box';
import Navbar from './navigation/Navbar';
import MeshBackground from './background/MeshBackground';
import HeroSection from './hero/HeroSection';
import Portfolio from './portfolio/Portfolio';
import WebPresence from './sections/WebPresence/WebPresence';
import About from './sections/About/About';

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100svh', background: '#181a19' }}>
      <MeshBackground />
      <Navbar />
      <Box component="main" sx={{ position: 'relative' }}>
        <HeroSection />
        <WebPresence />
        <About />
        <Portfolio />
      </Box>
    </Box>
  );
}
