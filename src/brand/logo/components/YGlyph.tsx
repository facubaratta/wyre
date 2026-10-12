import Box from '@mui/material/Box';
import { CompactYGlyph } from './CompactYGlyph';
import { CircuitYGlyph } from './CircuitYGlyph';

interface YGlyphProps {
  id: string;
  compact?: boolean;
}

export function YGlyph({ id, compact = false }: YGlyphProps) {
  return (
    <Box
      component="span"
      sx={{
        position: 'relative',
        display: 'inline-block',
        lineHeight: compact ? 1 : 0,
        marginLeft: '.045em',
        marginRight: '-.045em',
        letterSpacing: 0,
      }}
    >
      {compact ? <CompactYGlyph id={id} /> : <CircuitYGlyph id={id} />}
    </Box>
  );
}
