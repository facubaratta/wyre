import { useLanguage } from '../../i18n/LanguageContext';
import SectionHeading from '../SectionHeading';
import WebPresenceScene from './WebPresenceScene';
import WebPresenceIntro from './WebPresenceIntro';
import WebPresenceServices from './WebPresenceServices';

export default function WebPresence() {
  const { copy } = useLanguage();
  return (
    <WebPresenceScene id="presencia-web" headingId="web-heading">
      <SectionHeading id="web-heading">{copy.headings.web}</SectionHeading>
      <WebPresenceIntro />
      <WebPresenceServices />
    </WebPresenceScene>
  );
}
