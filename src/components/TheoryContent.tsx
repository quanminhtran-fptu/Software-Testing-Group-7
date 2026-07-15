import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  Sparkles,
  Zap,
  RotateCw,
  Check,
  X,
  TrendingUp,
  Heart,
  Flame,
  Timer,
  Trophy,
  Lock,
  Unlock,
} from 'lucide-react';
import { ContentSection, InteractiveContent } from '../types/course';
import { RealWorldStory, FurtherReadingSection } from './RealWorldComponents';
import { SectionVisual } from './SectionVisuals';

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
  info: { bg: 'bg-sky-50 border-sky-200', icon: Info, iconColor: 'text-sky-500', textColor: 'text-sky-700', accent: 'bg-sky-500' },
  warning: { bg: 'bg-amber-50 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-500', textColor: 'text-amber-700', accent: 'bg-amber-500' },
  tip: { bg: 'bg-emerald-50 border-emerald-200', icon: Lightbulb, iconColor: 'text-emerald-500', textColor: 'text-emerald-700', accent: 'bg-emerald-500' },
  definition: { bg: 'bg-indigo-50 border-indigo-200', icon: BookOpen, iconColor: 'text-indigo-500', textColor: 'text-indigo-700', accent: 'bg-indigo-500' },
};

/* ──────────────────────────────────────────────
   Game-style knowledge check with timer, lives, streak
   ────────────────────────────────────────────── */
function GameKnowledgeCheck({
  question,
  options,
  correctIndex,
  explanation,
  onCorrect,
}: {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onCorrect?: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [lives, setLives] = useState(3);
  const [correct, setCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [showXpBurst, setShowXpBurst] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setLives((l) => l - 1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  // Out of lives — reset
  useEffect(() => {
    if (lives <= 0 && !revealed) {
      setRevealed(true);
      setSelected(-1);
    }
  }, [lives, revealed]);

  const handlePick = (idx: number) => {
    if (revealed || timeLeft === 0) return;

    if (idx === correctIndex) {
      setSelected(idx);
      setRevealed(true);
      setCorrect(true);
      if (timerRef.current) clearInterval(timerRef.current);
      const timeBonus = Math.ceil(timeLeft / 3);
      const newStreak = streak + 1;
      setStreak(newStreak);
      const baseXp = 10;
      const streakBonus = newStreak >= 2 ? newStreak * 5 : 0;
      const totalXp = baseXp + timeBonus + streakBonus;
      setXpGained(totalXp);
      setShowXpBurst(true);
      onCorrect?.();
    } else {
      setSelected(idx);
      setLives((l) => l - 1);
      setStreak(0);
      // Flash wrong then reset selection
      setTimeout(() => setSelected(null), 600);
      if (lives - 1 <= 0) {
        setRevealed(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
    setLives(3);
    setTimeLeft(15);
    setCorrect(false);
    setStreak(0);
    setXpGained(0);
    setShowXpBurst(false);
    startTimer();
  };

  const timeColor = timeLeft > 10 ? 'text-emerald-500' : timeLeft > 5 ? 'text-amber-500' : 'text-rose-500';
  const timeBg = timeLeft > 10 ? 'bg-emerald-100' : timeLeft > 5 ? 'bg-amber-100' : 'bg-rose-100';

  return (
    <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 rounded-2xl p-5 relative overflow-hidden shadow-lg">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Game HUD */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={i >= lives ? { scale: [1, 1.3, 0.8], opacity: [1, 0.5, 0.3] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Heart className={`w-4 h-4 ${i < lives ? 'text-rose-300 fill-rose-400' : 'text-white/20'}`} />
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/40"
            >
              <Flame className="w-3 h-3 text-orange-200" />
              <span className="text-[10px] font-bold text-orange-100">{streak}x</span>
            </motion.div>
          )}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${timeBg} backdrop-blur`}>
            <Timer className={`w-3.5 h-3.5 ${timeColor}`} />
            <span className={`text-sm font-bold tabular-nums ${timeColor}`}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <motion.div
          className={`h-full rounded-full ${timeLeft > 10 ? 'bg-emerald-400' : timeLeft > 5 ? 'bg-amber-400' : 'bg-rose-400'}`}
          animate={{ width: `${(timeLeft / 15) * 100}%` }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </div>

      {/* Question */}
      <div className="relative flex items-start gap-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur"
        >
          <Sparkles className="w-4 h-4 text-white" />
        </motion.div>
        <p className="text-white font-semibold text-sm leading-snug">{question}</p>
      </div>

      {/* Answer cards — flip on reveal */}
      <div className="relative space-y-2">
        {options.map((opt, idx) => {
          const isPicked = selected === idx;
          const isCorrect = idx === correctIndex;
          let cardClass = 'bg-white/15 border-white/20 hover:bg-white/25 hover:border-white/40';
          if (revealed && isCorrect) cardClass = 'bg-emerald-400/30 border-emerald-300';
          else if (revealed && isPicked && !isCorrect) cardClass = 'bg-rose-400/30 border-rose-300';
          else if (revealed) cardClass = 'bg-white/5 border-white/10 opacity-50';

          return (
            <motion.button
              key={idx}
              onClick={() => handlePick(idx)}
              disabled={revealed}
              whileHover={!revealed ? { scale: 1.02, x: 4 } : undefined}
              whileTap={!revealed ? { scale: 0.98 } : undefined}
              animate={isPicked && !isCorrect && !revealed ? { x: [0, -8, 8, -4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`w-full p-3 text-left rounded-xl border-2 transition-all flex items-center gap-3 ${cardClass}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                revealed && isCorrect ? 'bg-emerald-500' :
                revealed && isPicked && !isCorrect ? 'bg-rose-500' :
                'bg-white/20'
              }`}>
                {revealed && isCorrect && <Check className="w-4 h-4 text-white" />}
                {revealed && isPicked && !isCorrect && <X className="w-4 h-4 text-white" />}
                {!revealed && <span className="text-xs font-bold text-white/80">{String.fromCharCode(65 + idx)}</span>}
              </div>
              <span className="text-sm text-white font-medium">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Result + XP burst */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-4"
          >
            {showXpBurst && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 1], y: [-10, -30, -50] }}
                transition={{ duration: 1.2 }}
                onAnimationComplete={() => setShowXpBurst(false)}
                className="absolute -top-2 right-4 z-10 flex items-center gap-1 text-amber-300 font-extrabold text-lg drop-shadow-lg"
              >
                <Zap className="w-5 h-5 fill-amber-400" />
                +{xpGained} XP
              </motion.div>
            )}
            <div className={`rounded-xl p-4 border backdrop-blur ${
              correct ? 'bg-emerald-900/40 border-emerald-400/50' : 'bg-rose-900/40 border-rose-400/50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {correct ? (
                  <>
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <Trophy className="w-5 h-5 text-amber-300" />
                    </motion.div>
                    <span className="font-bold text-sm text-amber-200">Correct!</span>
                    {streak >= 2 && (
                      <span className="ml-auto flex items-center gap-1 text-xs font-bold text-orange-300">
                        <Flame className="w-3 h-3" /> {streak}x streak!
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-300" />
                    <span className="font-bold text-sm text-rose-200">{lives <= 0 ? 'Out of lives!' : 'Not quite'}</span>
                  </>
                )}
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{explanation}</p>
              {correct && xpGained > 0 && (
                <div className="mt-2 flex items-center gap-2 text-xs text-amber-200/80">
                  <Zap className="w-3 h-3" />
                  Base 10 + Time {Math.ceil((timeLeft) / 3)} + Streak {streak >= 2 ? streak * 5 : 0} = {xpGained} XP
                </div>
              )}
            </div>
            <button
              onClick={reset}
              className="mt-3 flex items-center gap-1.5 text-sm text-white/80 hover:text-white font-medium"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Play again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Interactive checklist — quest steps
   ────────────────────────────────────────────── */
function QuestChecklist({ items, onAllChecked }: { items: string[]; onAllChecked?: () => void }) {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      if (next.every(Boolean)) onAllChecked?.();
      return next;
    });
  };

  const doneCount = checked.filter(Boolean).length;
  const allDone = doneCount === items.length;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
          <Zap className="w-4 h-4 text-amber-500" />
          Quest Steps
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-20 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
              animate={{ width: `${(doneCount / items.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-amber-600 tabular-nums">{doneCount}/{items.length}</span>
        </div>
      </div>
      <ul className="space-y-2">
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
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                : 'bg-gray-50 border-gray-100 hover:border-amber-200 hover:bg-amber-50/30'
            }`}
          >
            <motion.div
              whileTap={{ scale: 0.85 }}
              className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                checked[idx]
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm'
                  : 'border-2 border-gray-300 group-hover:border-amber-400'
              }`}>
              <AnimatePresence>
                {checked[idx] && (
                  <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <span className={`text-sm transition-all ${checked[idx] ? 'text-emerald-700 line-through opacity-70' : 'text-gray-700'}`}>
              {point}
            </span>
            {!checked[idx] && (
              <span className="ml-auto text-xs font-bold text-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity">
                tap!
              </span>
            )}
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm font-bold text-emerald-600 mt-2 pl-1"
          >
            <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 0.5, repeat: 2 }}>
              <Trophy className="w-4 h-4" />
            </motion.div>
            Quest complete! +5 XP
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Legacy InteractiveDropdown
   ────────────────────────────────────────────── */
function InteractiveDropdown({ content }: { content: InteractiveContent }) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = content.options ?? [];
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 p-5 relative overflow-hidden mt-4">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <p className="text-gray-800 font-medium text-sm">{content.label}</p>
      </div>
      {!selected ? (
        <div className="relative space-y-2">
          {options.map((option, idx) => (
            <button key={option.value} onClick={() => setSelected(option.value)}
              className="w-full p-3 text-left bg-white rounded-xl border border-purple-200 hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-purple-300 group-hover:border-purple-500 flex items-center justify-center">
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
            <span className="font-medium text-sm text-gray-800">{options.find((o) => o.value === selected)?.label}</span>
          </div>
          <p className="text-sm text-gray-600">{options.find((o) => o.value === selected)?.explanation}</p>
        </div>
      )}
      {selected && <button onClick={() => setSelected(null)} className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium">Try another</button>}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Per-section comprehension checks
   ────────────────────────────────────────────── */
function getCheckForSection(section: ContentSection): {
  question: string; options: string[]; correctIndex: number; explanation: string;
} | null {
  const h = (section.heading ?? '').toLowerCase();

  if (h.includes('what is continuous integration')) return {
    question: 'What is the core idea of Continuous Integration?',
    options: ['Wait until the end of a cycle to merge', 'Frequently merge code with automated verification', 'Manually test each feature', 'Deploy on a fixed schedule'],
    correctIndex: 1,
    explanation: 'CI means integrating code frequently — multiple times per day — with automated build and test verification.',
  };
  if (h.includes('how ci works')) return {
    question: 'After a developer pushes code, what does the CI system do?',
    options: ['Deploys to production immediately', 'Waits for manual trigger', 'Automatically runs build, test, and lint', 'Merges without checks'],
    correctIndex: 2,
    explanation: 'The CI system detects the push and runs a pipeline: install, build, test, lint, and report.',
  };
  if (h.includes('why ci matters')) return {
    question: 'What problem does CI solve?',
    options: ['Makes code run faster', 'Eliminates code reviews', 'Prevents "integration hell"', 'Auto-writes tests'],
    correctIndex: 2,
    explanation: 'CI makes integration continuous instead of a big-bang event, preventing "integration hell".',
  };
  if (h.includes('ci and agile')) return {
    question: 'How do CI and Agile complement each other?',
    options: ['CI replaces Agile', 'Agile manages work; CI manages technical execution', 'Same purpose', 'CI is useless with Agile'],
    correctIndex: 1,
    explanation: 'Agile provides the process framework; CI provides the automation backbone.',
  };
  if (h.includes('when to use ci')) return {
    question: 'When should a team adopt CI?',
    options: ['Only with 50+ developers', 'Only for web apps', 'Early, but ensure team can maintain it', 'Never for small projects'],
    correctIndex: 2,
    explanation: 'Adopt CI early for max benefit, but the team must maintain the pipeline.',
  };
  if (h.includes('what is continuous delivery') && !h.includes('deployment')) return {
    question: 'What does Continuous Delivery ensure?',
    options: ['Auto-deploys on every commit', 'Code is deployable, human decides when', 'Never deploys without manual testing', 'Holds code until sprint end'],
    correctIndex: 1,
    explanation: 'CD keeps code ready to deploy. A human makes the final release decision.',
  };
  if (h.includes('what is continuous deployment')) return {
    question: 'Key difference between Delivery and Deployment?',
    options: ['Delivery = web, Deployment = mobile', 'Delivery = manual approval, Deployment = auto-deploy', 'Delivery is faster', 'No difference'],
    correctIndex: 1,
    explanation: 'Continuous Deployment auto-deploys every change that passes tests — no human needed.',
  };
  if (h.includes('deployment workflow')) return {
    question: 'After a build uploads to TestFlight, what happens next?',
    options: ['Released to App Store', 'Slack notification alerts QC team', 'Auto-rejected if tests fail', 'Sits idle'],
    correctIndex: 1,
    explanation: 'A Slack notification alerts the QC team to download and manually test the build.',
  };
  if (h.includes('benefits of cd')) return {
    question: 'What is a key benefit of CD?',
    options: ['Replaces all testing', 'Eliminates manual steps — dev just commits', 'Larger, less frequent releases', 'No bugs ever'],
    correctIndex: 1,
    explanation: 'CD automates everything: dev commits, the rest (build, test, deploy) is automated.',
  };
  if (h.includes('choosing a ci/cd')) return {
    question: 'How should a team select a CI/CD service?',
    options: ['Always cheapest', 'Same tool for every team', 'Test on small projects, choose per team', 'Most popular = best'],
    correctIndex: 2,
    explanation: 'Consider ease of use, config, speed. Test on small projects, but select per team by tech stack.',
  };
  return null;
}

/* ──────────────────────────────────────────────
   Highlight callout
   ────────────────────────────────────────────── */
function HighlightCallout({ highlight }: { highlight: NonNullable<ContentSection['highlight']> }) {
  const style = highlightStyles[highlight.type];
  const Icon = style.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35 }}
      className={`${style.bg} border-2 rounded-2xl p-5 mb-4 relative overflow-hidden shadow-sm`}
    >
      <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }} style={{ originY: 0 }}
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.accent}`}
      />
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="flex items-start gap-4 relative pl-2">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </motion.div>
        <p className={`${style.textColor} font-medium leading-relaxed text-base`}>{highlight.text}</p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Accordion section with visual + game check
   ────────────────────────────────────────────── */
function AccordionSection({
  section, sectionNum, isOpen, onToggle, isRead, onMarkRead,
}: {
  section: ContentSection; sectionNum: number; isOpen: boolean; onToggle: () => void;
  isRead: boolean; onMarkRead: () => void;
}) {
  const check = getCheckForSection(section);

  return (
    <div className={`rounded-2xl border transition-all overflow-hidden ${
      isOpen ? 'border-violet-300 shadow-lg bg-white' : 'border-gray-200 bg-white hover:border-violet-200'
    }`}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 text-left">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0 ${
            isRead
              ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
              : 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
          }`}>
          {isRead ? <Check className="w-5 h-5" /> : sectionNum}
        </motion.div>
        <h3 className="flex-1 text-lg font-bold text-gray-800">{section.heading}</h3>
        {isRead && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Lock className="w-4 h-4 text-emerald-400" />
          </motion.div>
        )}
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
              {/* Unique animated section visual */}
              {section.heading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <SectionVisual heading={section.heading} />
                </motion.div>
              )}

              {section.paragraphs?.map((para, pIdx) => (
                <motion.p key={pIdx}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + pIdx * 0.06 }}
                  className="text-gray-600 leading-relaxed text-base">
                  {para}
                </motion.p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <QuestChecklist items={section.bulletPoints} />
              )}

              {section.highlight && <HighlightCallout highlight={section.highlight} />}

              {/* Game-style knowledge check */}
              {check && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-3 text-sm font-bold text-violet-600">
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    Challenge Round
                  </div>
                  <GameKnowledgeCheck {...check} onCorrect={onMarkRead} />
                </div>
              )}

              {/* Manual mark (if no check) */}
              {!check && (
                <button onClick={onMarkRead}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isRead ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                  }`}>
                  {isRead ? <><CheckCircle2 className="w-4 h-4" /> Read</> : <><Circle className="w-4 h-4" /> Mark as read</>}
                </button>
              )}

              {section.interactiveExample && <InteractiveDropdown content={section.interactiveExample.content} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Sticky reading progress bar (game HUD style)
   ────────────────────────────────────────────── */
function ReadingProgress({ progress, sectionsRead, totalSections }: { progress: number; sectionsRead: number; totalSections: number }) {
  return (
    <div className="sticky top-16 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <motion.div animate={progress < 100 ? { rotate: 360 } : {}} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
          <TrendingUp className="w-4 h-4 text-violet-500 flex-shrink-0" />
        </motion.div>
        <span className="text-xs font-bold text-gray-500 flex-shrink-0">
          {progress < 100 ? `Section ${sectionsRead + 1} of ${totalSections}` : 'All sections cleared!'}
        </span>
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-bold text-amber-600 tabular-nums">{Math.round(progress)}%</span>
        </div>
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

  const toggleSection = (idx: number) => setOpenIndex((prev) => (prev === idx ? null : idx));

  const markRead = useCallback((idx: number) => {
    setReadSections((prev) => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === totalSections) onAllSectionsRead?.();
      return next;
    });
  }, [totalSections, onAllSectionsRead]);

  useEffect(() => {
    const firstUnread = sections.findIndex((_, idx) => !readSections.has(idx));
    if (firstUnread >= 0 && openIndex === null) setOpenIndex(firstUnread);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-0">
      <ReadingProgress progress={progress} sectionsRead={readSections.size} totalSections={totalSections} />

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
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.35 }}
          className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-2 mt-6 border border-slate-200">
          <RealWorldStory example={realWorldExample} />
        </motion.div>
      )}

      {furtherReading && furtherReading.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.35 }}
          className="mt-6">
          <FurtherReadingSection readings={furtherReading} />
        </motion.div>
      )}

      {/* Completion celebration */}
      <AnimatePresence>
        {progress >= 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl p-6 text-center relative overflow-hidden">
            <motion.div className="absolute inset-0"
              animate={{ background: ['radial-gradient(circle at 30% 50%, rgba(167,139,250,0.1), transparent)', 'radial-gradient(circle at 70% 50%, rgba(217,70,239,0.1), transparent)', 'radial-gradient(circle at 30% 50%, rgba(167,139,250,0.1), transparent)'] }}
              transition={{ duration: 4, repeat: Infinity }} />
            <motion.div
              initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                <Trophy className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
            <h3 className="text-lg font-bold text-violet-800 mb-1 relative">All sections cleared!</h3>
            <p className="text-sm text-violet-600 relative flex items-center justify-center gap-1.5">
              <Unlock className="w-4 h-4" /> Continue button unlocked — go earn your XP!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
