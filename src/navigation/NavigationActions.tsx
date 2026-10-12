import LinkArrow from '../brand/LinkArrow';
import { useLanguage } from '../i18n/LanguageContext';
import { memo } from 'react';
import { Box, Button } from '@mui/material';
import LanguageToggle from './LanguageToggle';
import { useAbout } from '../sections/About/AboutContext';
import useOpenContact from '../contact/useOpenContact';
import { getWhatsAppUrl } from '../contact/contactUrls';

const fontSizes = {
  navigation: {
    hero: { xs: 13.2, sm: 15.4 },
    navbar: { xs: 12, sm: 14 },
  },
} as const;

function NavigationActions({ placement }: { placement: 'hero' | 'navbar' }) {
  const openContact = useOpenContact();
  const { expand } = useAbout();
  const { language, copy } = useLanguage();

  return (
    <Box
      component="nav"
      id={`${placement}-actions`}
      aria-label={copy.navigation.label}
      sx={{
        display: 'flex',
        flexWrap: placement === 'hero' ? 'wrap' : 'nowrap',
        alignItems: 'center',
        fontSize: fontSizes.navigation[placement],
        gap: { xs: placement === 'navbar' ? 0.5 : 1, sm: 2 },
        width: { xs: '100%', md: 'auto' },
        ml: placement === 'navbar' ? { md: 'auto' } : 0,
      }}
    >
      <Button
        component="a"
        href="#about"
        onClick={expand}
        sx={{
          display:
            placement === 'hero'
              ? 'inline-flex'
              : { xs: 'none', sm: 'inline-flex' },
          minWidth: 0,
          minHeight: placement === 'hero' ? 48.4 : 44,
          px: 1,
          color: 'text.primary',
          textTransform: 'none',
          fontSize: 'inherit',
        }}
      >
        {copy.heroDesign.about}
      </Button>
      <Button
        component="a"
        href="#crecimiento-real"
        sx={{
          display: placement === 'hero' ? 'none' : 'inline-flex',
          minHeight: placement === 'hero' ? 48.4 : 44,
          color: 'text.primary',
          textTransform: 'none',
          fontSize: 'inherit',
          px: placement === 'navbar' ? { xs: 0.5, sm: 1 } : 1,
          whiteSpace: 'nowrap',
          flex: { xs: placement === 'navbar' ? '0 0 auto' : 1, md: '0 0 auto' },
        }}
      >
        {copy.navigation.projects}
      </Button>
      <Button
        component="a"
        href={getWhatsAppUrl(null, language)}
        onClick={(event) => {
          event.preventDefault();
          openContact();
        }}
        variant="contained"
        sx={{
          minHeight: placement === 'hero' ? 48.4 : 44,
          px: { xs: placement === 'navbar' ? 1 : 1.5, sm: 2.5 },
          gap: 0.5,
          whiteSpace: 'nowrap',
          background: 'var(--brand-gradient)',
          color: '#181a19',
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: 1,
          fontSize: 'inherit',
          flex: { xs: placement === 'navbar' ? '0 0 auto' : 1, md: '0 0 auto' },
        }}
      >
        {copy.navigation.contact}
        <LinkArrow
          sx={{
            width: placement === 'navbar' ? 14 : 19.8,
            height: placement === 'navbar' ? 14 : 19.8,
          }}
        />
      </Button>
      <LanguageToggle />
    </Box>
  );
}

export default memo(NavigationActions);
