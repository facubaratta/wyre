import Box from '@mui/material/Box';
import SectionHeading from './SectionHeading';
import AiExample from './AiExample';
import HumanDecisionsCopy from './humanDecisions/HumanDecisionsCopy';

export default function HumanDecisions() {
  return (
    <Box
      component="section"
      id="decisiones-humanas"
      aria-labelledby="human-heading"
      sx={{
        position: 'relative',
        px: { xs: '6vw', sm: '7vw' },
        py: { xs: 7, sm: 12 },
        scrollMarginTop: 'var(--header-height, 100px)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: 'minmax(0, 1fr) 390px',
          },
          alignItems: 'start',
          gap: 4,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <SectionHeading id="human-heading" icon="brain">
            Decisiones Humanas
          </SectionHeading>
          <Box sx={{ mt: { xs: 4, sm: 6, md: 5 } }}>
            <HumanDecisionsCopy />
          </Box>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 390, minWidth: 0 }}>
          <AiExample />
        </Box>
      </Box>
    </Box>
  );
}
