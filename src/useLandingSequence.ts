import { useEffect, useRef, useState } from 'react';
import { usePreferences } from './PreferencesProvider';

const SCROLL_STEP = 1;
const SEQUENCE_START = 0.25;
const CLOSING_SCROLL = 0.08;
const HINT_HOLD = 0.8;
const TRANSITION_SCROLL = 0.8;
const PROJECT_SCROLL = 1;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** One reversible timeline: sections → close → hint → portfolio → closing screen. */
export default function useLandingSequence(
  sectionCount: number,
  projectCount: number,
) {
  const { reduceMotion } = usePreferences();
  const [scroll, setScroll] = useState(() => ({
    y: window.scrollY,
    viewport: Math.max(window.innerHeight, 1),
  }));
  const [manualProject, setManualProject] = useState(0);
  const [manualService, setManualService] = useState(0);
  const checkpointRef = useRef<number | null>(null);
  const hintStart =
    SEQUENCE_START + sectionCount * SCROLL_STEP + CLOSING_SCROLL;
  const portfolioStart = hintStart + HINT_HOLD;
  const projectsStart = portfolioStart + TRANSITION_SCROLL;
  const closingStart = projectsStart + projectCount * PROJECT_SCROLL;

  useEffect(() => {
    const update = () => {
      setScroll({
        y: window.scrollY,
        viewport: Math.max(window.innerHeight, 1),
      });
      if (
        checkpointRef.current !== null &&
        Math.abs(window.scrollY - checkpointRef.current) < 2
      ) {
        checkpointRef.current = null;
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const position = scroll.y / scroll.viewport;
  const stage = Math.floor((position - SEQUENCE_START) / SCROLL_STEP);
  const stageProgress = (position - SEQUENCE_START) / SCROLL_STEP - stage;
  // Hold the top and bottom briefly; the page scroll exposes overflowing content in between.
  const heroScrollProgress =
    stage < 0
      ? clamp(position / SEQUENCE_START)
      : stage < sectionCount
        ? clamp((stageProgress - 0.08) / 0.84)
        : 0;
  const portfolioProgress = clamp(
    (position - portfolioStart) / TRANSITION_SCROLL,
  );
  const closingProgress = reduceMotion
    ? manualProject === projectCount
      ? 1
      : 0
    : clamp((position - closingStart) / TRANSITION_SCROLL);
  const sequenceEnd = closingStart + TRANSITION_SCROLL;
  const scrollShadowOpacity = reduceMotion
    ? 1
    : 1 - clamp((position - (sequenceEnd - 0.3)) / 0.3);
  const projectIndex = reduceMotion
    ? Math.min(manualProject, projectCount - 1)
    : Math.max(
        0,
        Math.min(
          projectCount - 1,
          Math.floor((position - projectsStart) / PROJECT_SCROLL),
        ),
      );

  return {
    activeIndex: reduceMotion
      ? manualService
      : stage >= 0 && stage < sectionCount
        ? stage
        : -1,
    heroScrollProgress,
    showAccentHint: reduceMotion || position >= hintStart,
    portfolioProgress,
    closingProgress,
    scrollShadowOpacity,
    projectIndex,
    minHeight: reduceMotion ? undefined : (sequenceEnd + 1.7) * scroll.viewport,
    selectService: (index: number) => {
      if (index < 0 || index >= sectionCount) return;
      if (reduceMotion) setManualService(index);
      else
        window.scrollTo({
          top: (SEQUENCE_START + index * SCROLL_STEP + 0.05) * scroll.viewport,
          behavior: 'instant',
        });
    },
    selectProject: (index: number) => {
      if (reduceMotion) setManualProject(index);
      else
        window.scrollTo({
          top:
            (projectsStart + index * PROJECT_SCROLL + 0.05) * scroll.viewport,
          behavior: 'instant',
        });
    },
    nextCheckpoint: () => {
      if (reduceMotion) {
        if (manualService < sectionCount - 1)
          setManualService((index) => index + 1);
        else if (manualProject < projectCount)
          setManualProject((index) => index + 1);
        return;
      }

      const currentPosition =
        (checkpointRef.current ?? window.scrollY) /
        Math.max(window.innerHeight, 1);
      const checkpoints = [
        ...Array.from(
          { length: sectionCount },
          (_, index) => SEQUENCE_START + index * SCROLL_STEP + 0.05,
        ),
        hintStart + 0.05,
        projectsStart + 0.05,
        ...Array.from(
          { length: projectCount },
          (_, index) => projectsStart + index * PROJECT_SCROLL + 0.05,
        ),
        sequenceEnd,
      ];
      const checkpoint = checkpoints.find(
        (point) => point > currentPosition + 0.02,
      );
      if (checkpoint === undefined) return;
      checkpointRef.current = checkpoint * Math.max(window.innerHeight, 1);
      window.scrollTo({ top: checkpointRef.current, behavior: 'smooth' });
    },
  };
}
