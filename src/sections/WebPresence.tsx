import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from './SectionHeading';
import WebPresenceScene from './WebPresence/WebPresenceScene';
import WebPresenceIntro from './WebPresence/WebPresenceIntro';
import WebPresenceServices from './WebPresence/WebPresenceServices';

export default function WebPresence() {
  const { copy } = useLanguage();
  return (
    <WebPresenceScene id="presencia-web" headingId="web-heading">
      <SectionHeading id="web-heading" icon="globe">
        {copy.headings.web}
      </SectionHeading>
      <WebPresenceIntro />
      <WebPresenceServices />
    </WebPresenceScene>
  );
}
