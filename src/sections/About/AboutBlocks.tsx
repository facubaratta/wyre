import { Typography } from '@mui/material';
import FadeIn from '../../scroll/FadeIn';

export default function AboutBlocks({
  blocks,
}: {
  blocks: { title: string; paragraphs: string[] }[];
}) {
  return (
    <>
      {blocks.map((block) => (
        <FadeIn
          key={block.title}
          sx={{ borderTop: '1px solid rgba(235,232,222,.18)', pt: 3 }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 23, sm: 28 },
              fontWeight: 600,
              lineHeight: 1.3,
              letterSpacing: '-.025em',
              mb: 2.5,
            }}
          >
            {block.title}
          </Typography>
          {block.paragraphs.map((paragraph) => (
            <Typography
              key={paragraph}
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 16, sm: 18 },
                lineHeight: 1.75,
                mb: 2,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </FadeIn>
      ))}
    </>
  );
}
