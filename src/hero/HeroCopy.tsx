import { Box, Typography } from '@mui/material';
import {
  useTitleTransition,
  useHeroExit,
} from './transition/TitleTransitionContext';

// Match the section title and its moving copy so their measured bounds agree.
const titleSx = {
  display: 'inline-block',
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
};

const MathSymbol = ({ children }: { children: React.ReactNode }) => (
  <Typography
    component="span"
    sx={{
      mx: { xs: 1, sm: 2 },
      fontSize: { xs: 'clamp(28px, 7vw, 40px)', sm: 'clamp(36px, 4vw, 60px)' },
      fontWeight: 600,
      lineHeight: 1.2,
      color: 'var(--accent)',
    }}
  >
    {children}
  </Typography>
);

const HeroCopy = () => {
  const { moving } = useTitleTransition();
  const exit = useHeroExit();
  return (
    <Box
      sx={{
        maxWidth: 'min(680px, 100%)',
        minWidth: 0,
        textAlign: 'left',
        width: { xs: 'fit-content', md: 'auto' },
      }}
    >
      <Typography
        component="h1"
        id="hero-headline"
        sx={{
          fontSize: {
            xs: 'clamp(26px, 6.8vw, 40px)',
            sm: 'clamp(32px, 3.5vw, 56px)',
          },
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.035em',
          textWrap: 'balance',
        }}
      >
        <Box
          component="span"
          id="hero-title-web"
          sx={{
            ...titleSx,
            visibility: moving ? 'hidden' : 'visible',
          }}
          style={{ opacity: moving ? 0 : 1 - exit }}
        >
          Presencia web
        </Box>
        <br />
        <Box component="span" style={{ opacity: 1 - exit }}>
          <MathSymbol>+</MathSymbol>
        </Box>
        <br />
        <Box
          component="span"
          id="hero-title-human"
          sx={titleSx}
          style={{
            opacity: 1 - exit,
          }}
        >
          decisiones humanas
        </Box>
        <br />
        <Box component="span" style={{ opacity: 1 - exit }}>
          <MathSymbol>=</MathSymbol>
        </Box>
        <br />
        <Box
          component="span"
          id="hero-title-growth"
          sx={titleSx}
          style={{
            opacity: 1 - exit,
          }}
        >
          crecimiento real
        </Box>
      </Typography>
      <Box style={{ opacity: 1 - exit }} sx={{ mt: { xs: 3, sm: 4 } }}>
        <Typography
          component="p"
          sx={{
            maxWidth: 480,
            fontSize: { xs: 16, sm: 22 },
            lineHeight: 1.7,
            color: 'text.secondary',
            ml: { xs: 1, md: 2 },
          }}
        >
          Soluciones digitales
          <br />
          ideadas por profesionales
          <br />
          para tu negocio y tus clientes.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroCopy;
