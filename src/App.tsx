import { CssBaseline, ThemeProvider } from '@mui/material';
import LanguageProvider from './i18n/LanguageProvider';
import type { Language } from './i18n/messages';
import { PreferencesProvider } from './preferences/PreferencesProvider';
import ContactInterestProvider from './contact/ContactInterestProvider';
import AboutProvider from './sections/About/AboutProvider';
import LandingPage from './LandingPage';
import theme from './theme';

export default function App({ language = 'en' }: { language?: Language }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider initialLanguage={language}>
        <PreferencesProvider>
          <ContactInterestProvider>
            <AboutProvider>
              <LandingPage />
            </AboutProvider>
          </ContactInterestProvider>
        </PreferencesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
