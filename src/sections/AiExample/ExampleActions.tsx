import Box from '@mui/material/Box';

export default function ExampleActions() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0 }}>
      {['Acción principal', 'Acción secundaria que nadie toca →'].map(
        (label, index) => (
          <Box
            key={label}
            sx={{
              px: 1.8,
              py: 1.2,
              border: '1px solid',
              borderColor: index === 0 ? '#d97757' : '#cbc6b4',
              borderRadius: 1,
              bgcolor: index === 0 ? '#d97757' : '#faf9f5',
              color: index === 0 ? '#faf9f5' : '#141413',
              fontSize: 'clamp(9px, 1.3cqw, 12px)',
            }}
          >
            {label}
          </Box>
        ),
      )}
    </Box>
  );
}
