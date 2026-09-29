import Box from '@mui/material/Box';
import ContactButtons from '../../contact/ContactButtons';

export default function HeroContact() {
  return <Box component="header" sx={{ position: 'absolute', top: { xs: '3svh', sm: '4svh' }, left: { xs: '8vw', sm: '7vw' }, right: { xs: '8vw', sm: '7vw' }, zIndex: 2 }}><ContactButtons placement="hero" /></Box>;
}
