import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import ServiceGroup from './ServiceGroup';
import { serviceGroups } from './serviceGroups';

function useIsAtTop(): boolean {
  const [isAtTop, setAtTop] = useState(true);

  useEffect(() => {
    const updateScrollPosition = () => {
      const nextIsAtTop = window.scrollY < 4;
      setAtTop((currentIsAtTop) =>
        currentIsAtTop === nextIsAtTop ? currentIsAtTop : nextIsAtTop,
      );
    };
    updateScrollPosition();
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return isAtTop;
}

export default function ServiceHighlights({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const isAtTop: boolean = useIsAtTop();

  const sectionsSx = {
    mt: 10,
    flex: '0 1 48%',
    minWidth: 0,
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(24,26,25,.94)',
    '@media (max-width:640px)': {
      flex: '0 0 auto',
      width: '100%',
      transition: 'margin-top 240ms cubic-bezier(.22,1,.36,1)',
      mt: isAtTop ? 4 : 0,
    },
  };

  return (
    <Box sx={sectionsSx}>
      {serviceGroups.map((section, index) => (
        <ServiceGroup
          key={section.title}
          section={section}
          index={index}
          active={activeIndex === index}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
}
