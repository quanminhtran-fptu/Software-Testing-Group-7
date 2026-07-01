/**
 * Horizontal stacked course carousel.
 *
 * Layout:  [prev peek] ← [ACTIVE card] → [next peek]
 * One card is always focused. Neighboring cards peek from left/right.
 * Every visual property (translateX, scale, opacity, blur, shadow, brightness)
 * interpolates continuously through spring physics during navigation.
 *
 * Interactions: drag, touch swipe, mouse wheel / trackpad, keyboard, buttons.
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from 'framer-motion';
import {
  BookOpen, Layers, Search, PenTool, ClipboardList, Wrench,
  CheckCircle2, Lock, Play, FileText, HelpCircle,
} from 'lucide-react';
import { Chapter, Lesson } from '../types/course';

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD_H   = 500;   // card height (px)
const CARD_GAP = 24;    // gap between card centers (px)
const CARD_W   = 'min(340px, 82vw)' as const;

// Spring config from spec
const SPRING = { type: 'spring' as const, stiffness: 280, damping: 28, mass: 0.8 };


// ─── Theme palette ────────────────────────────────────────────────────────────

const THEMES = [
  { accent: '#6366f1', rgb: '99,102,241',  bgFrom: '#18182e', level: 'LEVEL 1' },
  { accent: '#22c55e', rgb: '34,197,94',   bgFrom: '#121e16', level: 'LEVEL 2' },
  { accent: '#f59e0b', rgb: '245,158,11',  bgFrom: '#1e1a10', level: 'LEVEL 3' },
  { accent: '#38bdf8', rgb: '56,189,248',  bgFrom: '#101c24', level: 'LEVEL 4' },
  { accent: '#f43f5e', rgb: '244,63,94',   bgFrom: '#1e1014', level: 'LEVEL 5' },
  { accent: '#a855f7', rgb: '168,85,247',  bgFrom: '#1a1224', level: 'LEVEL 6' },
] as const;

const CHAPTER_ICONS: Record<string, React.ElementType> = {
  BookOpen, Layers, Search, PenTool, ClipboardList, Wrench,
};

// ─── useCarousel hook ─────────────────────────────────────────────────────────

function useCarousel(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef  = useRef(0);
  const progress   = useMotionValue(0); // float: 0=card 0, 1=card 1, …

  // Measured dimensions (kept in refs so useTransform closures are always fresh)
  const strideRef  = useRef(364);   // card width + gap
  const cardWRef   = useRef(340);   // card rendered width
  const cardRef    = useRef<HTMLDivElement>(null); // ref on card 0 for measurement
  const containerRef = useRef<HTMLDivElement>(null);

  activeRef.current = activeIndex;

  // Measure card width after mount and on resize
  useEffect(() => {
    const measure = () => {
      if (!cardRef.current) return;
      const w = cardRef.current.getBoundingClientRect().width;
      if (w > 0) {
        cardWRef.current  = w;
        strideRef.current = w + CARD_GAP;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (cardRef.current) ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(count - 1, index));
      activeRef.current = clamped;
      setActiveIndex(clamped);
      animate(progress, clamped, SPRING);
    },
    [count, progress],
  );

  return {
    activeIndex, progress, goTo,
    strideRef, cardWRef, cardRef, containerRef,
  };
}

// ─── LessonRow ────────────────────────────────────────────────────────────────

function LessonRow({
  lesson,
  chapterId,
  completedLessons,
  isNext,
  accent,
}: {
  lesson: Lesson;
  chapterId: number;
  completedLessons: Set<string>;
  isNext: boolean;
  accent: string;
}) {
  const done = completedLessons.has(`${chapterId}-${lesson.id}`);
  const Icon = lesson.type === 'quiz' ? HelpCircle : FileText;

  return (
    <div className="flex items-center gap-3 py-2">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2"
        style={
          done   ? { background: '#22c55e20', borderColor: '#22c55e' } :
          isNext ? { background: accent + '25', borderColor: accent } :
                   { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }
        }
      >
        {done   ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> :
         isNext ? <Icon className="w-3.5 h-3.5" style={{ color: accent }} /> :
                  <Lock className="w-3 h-3 text-white/20" />}
      </div>
      <span
        className="flex-1 text-[13px] font-medium leading-tight"
        style={{ color: done || isNext ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.28)' }}
      >
        {lesson.title}
      </span>
      <div
        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
        style={
          done   ? { background: '#22c55e', boxShadow: '0 0 6px #22c55e60' } :
          isNext ? { background: accent, boxShadow: `0 0 6px ${accent}60` } :
                   { background: 'rgba(255,255,255,0.08)' }
        }
      />
    </div>
  );
}

// ─── StackedCard ──────────────────────────────────────────────────────────────

interface StackedCardProps {
  chapter: Chapter;
  index: number;
  activeIndex: number;
  completedLessons: Set<string>;
  onStart: (chapterId: number, lessonId: number) => void;
  progress: MotionValue<number>;
  strideRef: React.RefObject<number>;
  cardWRef: React.RefObject<number>;
  elRef?: React.Ref<HTMLDivElement>;
}

function StackedCard({
  chapter,
  index,
  activeIndex,
  completedLessons,
  onStart,
  progress,
  strideRef,
  cardWRef,
  elRef,
}: StackedCardProps) {
  const theme = THEMES[index % THEMES.length];
  const Icon  = CHAPTER_ICONS[chapter.icon] || BookOpen;

  const doneCount      = chapter.lessons.filter(l => completedLessons.has(`${chapter.id}-${l.id}`)).length;
  const firstIncomplete = chapter.lessons.find(l => !completedLessons.has(`${chapter.id}-${l.id}`));
  const allDone        = doneCount === chapter.lessons.length;
  const targetLesson   = firstIncomplete ?? chapter.lessons[0];
  const ctaLabel       = allDone ? 'Review' : doneCount > 0 ? 'Continue' : 'Start';
  const isActive       = index === activeIndex;

  // Horizontal transforms — all driven by the shared progress MotionValue.
  // Cards are positioned at left:50%; translateX centers them and adds offset.
  const translateX = useTransform(progress, (p) => {
    const s  = strideRef.current ?? 364;
    const cw = cardWRef.current  ?? 340;
    return (index - p) * s - cw / 2;
  });
  const scale     = useTransform(progress, (p) => Math.max(0.82, 1 - Math.abs(index - p) * 0.07));
  const opacity   = useTransform(progress, (p) => Math.max(0.0,  1 - Math.abs(index - p) * 0.58));
  const filter    = useTransform(progress, (p) => {
    const d          = Math.abs(index - p);
    const blur       = Math.min(8, d * 4.2);
    const brightness = Math.max(0.55, 1 - d * 0.25);
    return `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(3)})`;
  });
  const boxShadow = useTransform(progress, (p) => {
    const d      = Math.abs(index - p);
    const alpha  = Math.max(0, 0.35 - d * 0.18);
    const spread = Math.max(16, 60 - d * 36);
    const border = Math.max(0, 0.14 - d * 0.14);
    return `0 24px ${spread}px rgba(0,0,0,${alpha.toFixed(3)}), 0 0 0 1px rgba(${theme.rgb},${border.toFixed(3)})`;
  });

  const zIndex = Math.max(0, 10 - Math.abs(index - activeIndex));

  return (
    <motion.div
      ref={elRef}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: CARD_W,
        height: CARD_H,
        translateX,
        scale,
        opacity,
        filter,
        boxShadow,
        zIndex,
        willChange: 'transform, opacity, filter',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      aria-hidden={!isActive}
    >
      {/* Card surface */}
      <div
        className="w-full h-full rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(165deg, ${theme.bgFrom} 0%, #0d0d14 100%)`,
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Header */}
        <div className="pt-6 pb-3 px-6 text-center flex-shrink-0">
          <h3 className="text-[18px] font-bold text-white leading-tight tracking-tight">
            {chapter.title}
          </h3>
          <span
            className="text-[10px] font-extrabold tracking-[0.22em] mt-1 block uppercase"
            style={{ color: theme.accent }}
          >
            {theme.level}
          </span>
        </div>

        {/* Illustration */}
        <div
          className="mx-6 rounded-2xl flex items-center justify-center py-5 flex-shrink-0 relative overflow-hidden"
          style={{ background: `rgba(${theme.rgb}, 0.08)` }}
        >
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at center, rgba(${theme.rgb},0.15) 0%, transparent 68%)` }}
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              background: `rgba(${theme.rgb},0.16)`,
              border: `1.5px solid rgba(${theme.rgb},0.3)`,
              boxShadow: `0 6px 24px rgba(${theme.rgb},0.22)`,
            }}
          >
            <Icon className="w-8 h-8" style={{ color: theme.accent }} />
          </motion.div>
        </div>

        {/* Lesson list */}
        <div className="flex-1 px-6 pt-2 pb-0 overflow-hidden divide-y divide-white/[0.05]">
          {chapter.lessons.map((lesson, li) => {
            const prevDone = li === 0 || completedLessons.has(`${chapter.id}-${chapter.lessons[li - 1].id}`);
            return (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                chapterId={chapter.id}
                completedLessons={completedLessons}
                isNext={lesson === firstIncomplete && prevDone}
                accent={theme.accent}
              />
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="px-6 pt-3 pb-6 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.018, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            onClick={() => onStart(chapter.id, targetLesson.id)}
            className="w-full py-[14px] rounded-2xl font-bold text-white text-sm relative overflow-hidden"
            style={{
              background: `linear-gradient(130deg, ${theme.accent}, ${theme.accent}bb)`,
              boxShadow: `0 6px 22px rgba(${theme.rgb}, 0.38)`,
            }}
          >
            <span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.18) 0%, transparent 50%)' }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <Play className="w-3.5 h-3.5 fill-white" />
              {ctaLabel}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── CarouselBackground ───────────────────────────────────────────────────────

function CarouselBackground({ activeIndex }: { activeIndex: number }) {
  const theme = THEMES[activeIndex % THEMES.length];
  return (
    <motion.div
      key={activeIndex}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(${theme.rgb},0.22) 0%, transparent 70%)`,
      }}
    />
  );
}

// ─── ChapterTab ───────────────────────────────────────────────────────────────

function ChapterTab({
  chapter,
  index,
  isActive,
  completedLessons,
  onClick,
}: {
  chapter: Chapter;
  index: number;
  isActive: boolean;
  completedLessons: Set<string>;
  onClick: () => void;
}) {
  const theme = THEMES[index % THEMES.length];
  const Icon  = CHAPTER_ICONS[chapter.icon] || BookOpen;
  const doneCount  = chapter.lessons.filter(l => completedLessons.has(`${chapter.id}-${l.id}`)).length;
  const allDone    = doneCount === chapter.lessons.length;
  const hasStarted = doneCount > 0;

  // Short label: first word of title or "Start"
  const label = index === 0
    ? 'Start'
    : chapter.title.split(' ').slice(0, 2).join(' ');

  return (
    <button
      onClick={onClick}
      aria-label={`Go to chapter: ${chapter.title}`}
      aria-current={isActive ? 'true' : undefined}
      className="flex flex-col items-center gap-1 flex-shrink-0 relative"
      style={{ minWidth: 72 }}
    >
      {/* Icon bubble */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200"
        style={{
          background: isActive
            ? theme.accent
            : hasStarted
            ? `rgba(${theme.rgb}, 0.18)`
            : 'rgba(255,255,255,0.07)',
          border: isActive
            ? `2.5px solid ${theme.accent}`
            : `2.5px solid ${hasStarted ? `rgba(${theme.rgb}, 0.35)` : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isActive
            ? `0 4px 16px rgba(${theme.rgb}, 0.45)`
            : 'none',
        }}
      >
        {/* Number badge (non-active) or icon */}
        {isActive ? (
          <Icon className="w-6 h-6 text-white" />
        ) : (
          <span
            className="text-lg font-extrabold leading-none"
            style={{ color: hasStarted ? theme.accent : 'rgba(255,255,255,0.35)' }}
          >
            {index}
          </span>
        )}

        {/* Completion ring */}
        {allDone && !isActive && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className="text-[10px] font-semibold leading-tight text-center max-w-[72px] line-clamp-1 transition-colors duration-200"
        style={{ color: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.38)' }}
      >
        {label}
      </span>

      {/* Active underline */}
      {isActive && (
        <motion.div
          layoutId="tab-underline"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 24, height: 3, background: theme.accent }}
          transition={SPRING}
        />
      )}
    </button>
  );
}

// ─── HorizontalCourseList ─────────────────────────────────────────────────────

export interface HorizontalCourseListProps {
  chapters: Chapter[];
  completedLessons: Set<string>;
  onStart: (chapterId: number, lessonId: number) => void;
  title?: string;
}

export function HorizontalCourseList({
  chapters,
  completedLessons,
  onStart,
  title = 'Course Chapters',
}: HorizontalCourseListProps) {
  const {
    activeIndex, progress, goTo,
    strideRef, cardWRef, cardRef, containerRef,
  } = useCarousel(chapters.length);

  const activeTheme = THEMES[activeIndex % THEMES.length];

  return (
    <section
      className="relative w-full select-none"
      aria-label={title}
      aria-roledescription="carousel"
      style={{ background: '#0a0a12' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#0a0a12' }} />
        <CarouselBackground activeIndex={activeIndex} />
      </div>

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-8 pb-5">
        <h2 className="text-xl font-bold text-white/90">{title}</h2>
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={SPRING}
          className="text-sm font-semibold"
          style={{ color: activeTheme.accent }}
        >
          {activeIndex + 1} / {chapters.length}
        </motion.p>
      </div>

      {/* Carousel area */}
      <div className="relative z-10">
        {/* Card container (clips peek cards) */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: CARD_H, overflow: 'hidden' }}
          role="list"
          aria-label={`${chapters.length} chapters`}
        >
          {chapters.map((chapter, index) => (
            <StackedCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              activeIndex={activeIndex}
              completedLessons={completedLessons}
              onStart={onStart}
              progress={progress}
              strideRef={strideRef}
              cardWRef={cardWRef}
              elRef={index === 0 ? cardRef : undefined}
            />
          ))}
        </div>
      </div>

      {/* Chapter tab bar — Duolingo-style icon navigation */}
      <div
        className="relative z-20 flex items-start justify-center gap-2 sm:gap-3 pt-6 pb-9 px-4 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Chapter navigation"
      >
        {chapters.map((chapter, i) => (
          <ChapterTab
            key={chapter.id}
            chapter={chapter}
            index={i}
            isActive={i === activeIndex}
            completedLessons={completedLessons}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

// Legacy named export
export { HorizontalCourseList as CourseCard };
