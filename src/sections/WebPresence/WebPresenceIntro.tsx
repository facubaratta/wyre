import Typography from '@mui/material/Typography';

export default function WebPresenceIntro() {
  return (
    <>
      <Typography
        component="p"
        sx={{
          mt: { xs: 3, sm: 4 },
          maxWidth: 760,
          fontSize: { xs: 19, sm: 26 },
          lineHeight: 1.5,
        }}
      >
        Una solución para lo que tu negocio necesita hoy. Y para lo que puede
        necesitar mañana.
      </Typography>
      <Typography
        component="p"
        sx={{
          mt: 2,
          maxWidth: 760,
          fontSize: { xs: 16, sm: 21 },
          lineHeight: 1.6,
          color: 'text.secondary',
        }}
      >
        Definimos juntos el alcance, las prioridades y el presupuesto. Si tu
        idea no encaja en estas categorías, también podemos construirla.
      </Typography>
    </>
  );
}
