import { useLanguage } from '../i18n/LanguageContext';
import SectionHeading from './SectionHeading';
import WebPresenceScene from './WebPresence/WebPresenceScene';
import WebPresenceIntro from './WebPresence/WebPresenceIntro';
import WebPresenceServices from './WebPresence/WebPresenceServices';
import { useTitleTransition } from '../hero/transition/TitleTransitionContext';

export default function WebPresence() {
  const { copy } = useLanguage();
  const { complete } = useTitleTransition();
  return (
    <WebPresenceScene id="presencia-web" headingId="web-heading">
      <SectionHeading id="web-heading" icon="globe" hidden={!complete}>
        {copy.headings.web}
      </SectionHeading>
      <WebPresenceIntro />
      <WebPresenceServices />
    </WebPresenceScene>
  );
}
