import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  Star,
  Sparkles,
  Zap,
  RotateCw,
  Check,
  X,
  TrendingUp,
} from 'lucide-react';
import { ContentSection, InteractiveContent } from '../types/course';
import { RealWorldStory, FurtherReadingSection } from './RealWorldComponents';

interface TheorySectionProps {
  sections: ContentSection[];
  realWorldExample?: {
    title: string;
    scenario: string;
    story: string[];
    lessons: string[];
    simulation?: any[];
  };
  furtherReading?: {
    title: string;
    description: string;
    type: 'book' | 'article' | 'video' | 'practice';
    url?: string;
  }[];
  onAllSectionsRead?: () => void;
}

const highlightStyles = {
  info: {
    bg: 'bg-sky-50 border-sky-200',
    icon: Info,
    iconColor: 'text-sky-500',
    textColor: 'text-sky-700',
    accent: 'bg-sky-500',
  },
  warning: {
    bg: 'bg-amber-50 border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    textColor: 'text-amber-700',
    accent: 'bg-amber-500',
  },
  tip: {
    bg: 'bg-emerald-50 border-emerald-200',
    icon: Lightbulb,
    iconColor: 'text-emerald-500',
    textColor: 'text-emerald-700',
    accent: 'bg-emerald-500',
  },
  definition: {
    bg: 'bg-indigo-50 border-indigo-200',
    icon: BookOpen,
    iconColor: 'text-indigo-500',
    textColor: 'text-indigo-700',
    accent: 'bg-indigo-500',
  },
};

/* ──────────────────────────────────────────────
   Inline knowledge check (true/false or pick one)
   ────────────────────────────────────────────── */
function InlineKnowledgeCheck({
  question,
  options,
  correctIndex,
  explanation,
  onAnswered,
}: {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onAnswered?: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handlePick = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    onAnswered?.(idx === correctIndex);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <p className="text-gray-800 font-semibold text-sm leading-snug">{question}</p>
      </div>

      <div className="relative space-y-2">
        {options.map((opt, idx) => {
          const isPicked = selected === idx;
          const isCorrect = idx === correctIndex;
          let stateClass = 'bg-white border-purple-200 hover:border-purple-400 hover:bg-purple-50/50';
          if (revealed && isCorrect) stateClass = 'bg-emerald-50 border-emerald-400';
          else if (revealed && isPicked && !isCorrect) stateClass = 'bg-rose-50 border-rose-400';
          else if (revealed) stateClass = 'bg-white border-purple-100 opacity-60';

          return (
            <button
              key={idx}
              onClick={() => handlePick(idx)}
              disabled={revealed}
              className={`w-full p-3 text-left rounded-xl border-2 transition-all flex items-center gap-3 ${stateClass}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                revealed && isCorrect ? 'bg-emerald-500' :
                revealed && isPicked && !isCorrect ? 'bg-rose-500' :
                'border-2 border-purple-300'
              }`}>
                {revealed && isCorrect && <Check className="w-3.5 h-3.5 text-white" />}
                {revealed && isPicked && !isCorrect && <X className="w-3.5 h-3.5 text-white" />}
                {!revealed && <span className="text-xs font-bold text-purple-400">{idx + 1}</span>}
              </div>
              <span className="text-sm text-gray-700 font-medium">{opt}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative mt-3"
          >
            <div className={`rounded-xl p-4 border ${selected === correctIndex ? 'bg-emerald-100 border-emerald-300' : 'bg-rose-100 border-rose-300'}`}>
              <div className="flex items-center gap-2 mb-1">
                {selected === correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-emerald-700">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-rose-600" />
                    <span className="font-bold text-sm text-rose-700">Not quite</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{explanation}</p>
            </div>
            <button
              onClick={reset}
              className="mt-2 flex items-center gap-1.5 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Concept flip card — 3D flip reveal
   ────────────────────────────────────────────── */
/* ──────────────────────────────────────────────
   Interactive checklist — bullets user clicks to "check off"
   ────────────────────────────────────────────── */
function InteractiveChecklist({ items, onAllChecked }: { items: string[]; onAllChecked?: () => void }) {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      if (next.every(Boolean)) onAllChecked?.();
      return next;
    });
  };

  const allDone = checked.every(Boolean);

  return (
    <ul className="space-y-2.5 mb-4">
      {items.map((point, idx) => (
        <motion.li
          key={idx}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.06 }}
          onClick={() => toggle(idx)}
          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all group ${
            checked[idx]
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-gray-50 border-gray-100 hover:border-sky-200 hover:bg-sky-50/50'
          }`}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            checked[idx]
              ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm'
              : 'border-2 border-gray-300 group-hover:border-sky-400'
          }`}>
            <AnimatePresence>
              {checked[idx] && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className={`text-sm transition-colors ${checked[idx] ? 'text-emerald-700 line-through opacity-70' : 'text-gray-700'}`}>
            {point}
          </span>
        </motion.li>
      ))}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm font-bold text-emerald-600 pl-1"
          >
            <CheckCircle2 className="w-4 h-4" />
            All steps checked!
          </motion.div>
        )}
      </AnimatePresence>
    </ul>
  );
}

/* ──────────────────────────────────────────────
   InteractiveDropdown (legacy support)
   ────────────────────────────────────────────── */
function InteractiveDropdown({ content }: { content: InteractiveContent }) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = content.options ?? [];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
          <Star className="w-4 h-4 text-white" />
        </div>
        <p className="text-gray-800 font-medium text-sm">{content.label}</p>
      </div>
      {!selected ? (
        <div className="relative space-y-2">
          {options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className="w-full p-3 text-left bg-white rounded-xl border border-purple-200 hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-purple-300 group-hover:border-purple-500 flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold text-purple-400 group-hover:text-purple-600">{idx + 1}</span>
                </div>
                <span className="text-sm text-gray-700">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="font-medium text-sm text-gray-800">
              {options.find((o) => o.value === selected)?.label}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {options.find((o) => o.value === selected)?.explanation}
          </p>
        </div>
      )}
      {selected && (
        <button
          onClick={() => setSelected(null)}
          className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Try another answer
        </button>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Auto-generated inline checks for each section
   ────────────────────────────────────────────── */
const sectionChecks: Record<string, {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}> = {};

function getCheckForSection(section: ContentSection, sectionNum: number): typeof sectionChecks[string] | null {
  const key = `${section.heading}-${sectionNum}`;
  if (sectionChecks[key]) return sectionChecks[key];

  // Auto-generate a simple comprehension check from the section content
  if (section.paragraphs && section.paragraphs.length > 0) {
    const heading = section.heading ?? 'this section';

    if (heading.toLowerCase().includes('what is continuous integration')) {
      return {
        question: 'What is the core idea of Continuous Integration?',
        options: [
          'Waiting until the end of a release cycle to merge all code',
          'Frequently merging code changes with automated verification',
          'Manually testing each feature before merging',
          'Deploying code to production on a fixed schedule',
        ],
        correctIndex: 1,
        explanation: 'CI is about integrating code frequently (often multiple times per day) and verifying each integration with automated build and test sequences.',
      };
    }
    if (heading.toLowerCase().includes('how ci works')) {
      return {
        question: 'In a typical CI workflow, what happens after a developer pushes code?',
        options: [
          'The code is immediately deployed to production',
          'Nothing happens until a reviewer manually triggers tests',
          'The CI system automatically runs build, test, and lint checks',
          'The code is merged without any checks',
        ],
        correctIndex: 2,
        explanation: 'The CI system detects the push and automatically runs a pipeline: installing dependencies, building, testing, and reporting results.',
      };
    }
    if (heading.toLowerCase().includes('why ci matters')) {
      return {
        question: 'What problem does CI solve?',
        options: [
          'It makes code run faster in production',
          'It eliminates the need for code reviews',
          'It prevents "integration hell" by making integration continuous',
          'It automatically writes tests for the code',
        ],
        correctIndex: 2,
        explanation: 'Without CI, integration happens late and painfully ("integration hell"). CI makes integration a non-event with small, frequent, automated integrations.',
      };
    }
    if (heading.toLowerCase().includes('ci and agile')) {
      return {
        question: 'How do CI and Agile complement each other?',
        options: [
          'CI replaces Agile in modern teams',
          'Agile manages the work; CI manages the technical execution',
          'They serve the exact same purpose',
          'CI is only useful without Agile',
        ],
        correctIndex: 1,
        explanation: 'Agile provides the process framework for iterative delivery, while CI provides the automation backbone that makes fast iteration sustainable.',
      };
    }
    if (heading.toLowerCase().includes('when to use ci')) {
      return {
        question: 'When should a team adopt CI?',
        options: [
          'Only when the team has more than 50 developers',
          'Only for web applications, not mobile',
          'As early as possible, but ensure the team can maintain the pipeline',
          'Never — CI is too expensive for small projects',
        ],
        correctIndex: 2,
        explanation: 'CI should be adopted early for maximum benefit, but the team must have the skills to maintain the pipeline. A broken CI pipeline no one can fix is worse than no CI.',
      };
    }
    if (heading.toLowerCase().includes('what is continuous delivery')) {
      return {
        question: 'What does Continuous Delivery ensure?',
        options: [
          'Code is automatically deployed to production on every commit',
          'Code is always in a deployable state, but a human decides when to release',
          'Code is never deployed without manual testing',
          'Code changes are held until the end of the sprint',
        ],
        correctIndex: 1,
        explanation: 'CD ensures every successful build is ready for production. Deployment is a business decision — a human pushes the button, but the process is automated up to that point.',
      };
    }
    if (heading.toLowerCase().includes('what is continuous deployment')) {
      return {
        question: 'What is the key difference between Continuous Delivery and Continuous Deployment?',
        options: [
          'Delivery is for web apps; Deployment is for mobile apps',
          'Delivery requires manual approval; Deployment auto-deploys after tests pass',
          'Delivery is faster; Deployment is slower',
          'There is no difference',
        ],
        correctIndex: 1,
        explanation: 'Continuous Delivery keeps code ready to deploy (human decides when). Continuous Deployment automatically deploys every change that passes all tests — no human intervention.',
      };
    }
    if (heading.toLowerCase().includes('deployment workflow')) {
      return {
        question: 'In the Amanotes deployment workflow, what happens after a build is uploaded to TestFlight?',
        options: [
          'The app is immediately released to the App Store',
          'A Slack notification alerts the QC team to perform manual testing',
          'The build is automatically rejected if tests fail',
          'Nothing — the build sits idle until manually promoted',
        ],
        correctIndex: 1,
        explanation: 'After the build is uploaded to TestFlight or Firebase App Distribution, a Slack notification alerts the QC team to download and manually test the build.',
      };
    }
    if (heading.toLowerCase().includes('benefits of cd')) {
      return {
        question: 'What is a key benefit of CD?',
        options: [
          'It replaces the need for any testing',
          'It eliminates manual steps so developers just commit code',
          'It makes releases larger and less frequent',
          'It ensures code never has bugs',
        ],
        correctIndex: 1,
        explanation: 'CD eliminates manual steps in the delivery process. The developer commits code, and everything else (build, test, deploy) is automated.',
      };
    }
    if (heading.toLowerCase().includes('choosing a ci/cd')) {
      return {
        question: 'How should a team select a CI/CD service?',
        options: [
          'Always pick the cheapest option available',
          'Use the same tool for every team regardless of tech stack',
          'Test tools on small projects and choose per team based on tech stack',
          'Pick the most popular tool; it must be the best',
        ],
        correctIndex: 2,
        explanation: 'Teams should consider ease of use, configuration, build speed, and platform support. Testing on small projects helps, but tool selection should be team-specific since each tech stack has different requirements.',
      };
    }
  }
  return null;
}

/* ──────────────────────────────────────────────
   Highlight callout with animated left bar
   ────────────────────────────────────────────── */
function HighlightCallout({ highlight }: { highlight: NonNullable<ContentSection['highlight']> }) {
  const style = highlightStyles[highlight.type];
  const IconComponent = style.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35 }}
      className={`${style.bg} border-2 rounded-2xl p-5 mb-4 relative overflow-hidden shadow-sm`}
    >
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ originY: 0 }}
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.accent}`}
      />
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="flex items-start gap-4 relative pl-2">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
        >
          <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
        </motion.div>
        <p className={`${style.textColor} font-medium leading-relaxed text-base`}>
          {highlight.text}
        </p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Collapsible accordion section
   ────────────────────────────────────────────── */
function AccordionSection({
  section,
  sectionNum,
  isOpen,
  onToggle,
  isRead,
  onMarkRead,
}: {
  section: ContentSection;
  sectionNum: number;
  isOpen: boolean;
  onToggle: () => void;
  isRead: boolean;
  onMarkRead: () => void;
}) {
  const check = getCheckForSection(section, sectionNum);

  return (
    <div className={`rounded-2xl border transition-all overflow-hidden ${
      isOpen ? 'border-sky-300 shadow-md bg-white' : 'border-gray-200 bg-white hover:border-sky-200'
    }`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-all flex-shrink-0 ${
          isRead
            ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
            : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
        }`}>
          {isRead ? <Check className="w-5 h-5" /> : sectionNum}
        </div>
        <h3 className="flex-1 text-lg font-bold text-gray-800">{section.heading}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {section.paragraphs?.map((para, pIdx) => (
                <motion.p
                  key={pIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + pIdx * 0.06 }}
                  className="text-gray-600 leading-relaxed text-base"
                >
                  {para}
                </motion.p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <InteractiveChecklist items={section.bulletPoints} />
              )}

              {section.highlight && <HighlightCallout highlight={section.highlight} />}

              {/* Inline knowledge check */}
              {check && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-3 text-sm text-purple-600 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Quick Check
                  </div>
                  <InlineKnowledgeCheck {...check} onAnswered={(correct) => { if (correct) onMarkRead(); }} />
                </div>
              )}

              {/* Mark as read button (if no check) */}
              {!check && (
                <button
                  onClick={onMarkRead}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isRead
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                  }`}
                >
                  {isRead ? <><CheckCircle2 className="w-4 h-4" /> Read</> : <><Circle className="w-4 h-4" /> Mark as read</>}
                </button>
              )}

              {/* Legacy interactive example */}
              {section.interactiveExample && (
                <div className="mt-4">
                  <InteractiveDropdown content={section.interactiveExample.content} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Sticky reading progress bar
   ────────────────────────────────────────────── */
function ReadingProgress({ progress }: { progress: number }) {
  return (
    <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <TrendingUp className="w-4 h-4 text-sky-500 flex-shrink-0" />
        <span className="text-xs font-bold text-gray-500 flex-shrink-0">
          {progress < 100 ? 'Reading progress' : 'All sections read!'}
        </span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </div>
        <span className="text-xs font-bold text-sky-600 tabular-nums flex-shrink-0">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────── */
export function TheorySection({ sections, realWorldExample, furtherReading, onAllSectionsRead }: TheorySectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [readSections, setReadSections] = useState<Set<number>>(new Set());

  const totalSections = sections.length;
  const progress = totalSections > 0 ? (readSections.size / totalSections) * 100 : 0;

  const toggleSection = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const markRead = useCallback((idx: number) => {
    setReadSections((prev) => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === totalSections) onAllSectionsRead?.();
      return next;
    });
  }, [totalSections, onAllSectionsRead]);

  // Auto-open first unread section on mount
  useEffect(() => {
    const firstUnread = sections.findIndex((_, idx) => !readSections.has(idx));
    if (firstUnread >= 0 && openIndex === null) setOpenIndex(firstUnread);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-0">
      <ReadingProgress progress={progress} />

      <div className="space-y-3 pt-4">
        {sections.map((section, idx) => (
          <AccordionSection
            key={idx}
            section={section}
            sectionNum={idx + 1}
            isOpen={openIndex === idx}
            onToggle={() => toggleSection(idx)}
            isRead={readSections.has(idx)}
            onMarkRead={() => markRead(idx)}
          />
        ))}
      </div>

      {realWorldExample && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-2 mt-6 border border-slate-200"
        >
          <RealWorldStory example={realWorldExample} />
        </motion.div>
      )}

      {furtherReading && furtherReading.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="mt-6"
        >
          <FurtherReadingSection readings={furtherReading} />
        </motion.div>
      )}

      {/* Completion celebration */}
      <AnimatePresence>
        {progress >= 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle2 className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-emerald-800 mb-1">All sections complete!</h3>
            <p className="text-sm text-emerald-600">You've read every section. Great work — now continue to earn your XP.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
