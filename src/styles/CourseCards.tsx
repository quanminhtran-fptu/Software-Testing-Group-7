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
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Chapter, Lesson } from '../types/course';

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD_H   = 500;   // card height (px)
const CARD_GAP = 24;    // gap between card centers (px)
const CARD_W   = 'min(340px, 82vw)' as const;

// Spring config from spec
const SPRING = { type: 'spring' as const, stiffness: 280, damping: 28, mass: 0.8 };

const DRAG_SENSITIVITY  = 0.65;  // lower = easier to flick
const FLICK_VELOCITY_PX = 300;   // px/s threshold for velocity-based snap

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

  // Drag state
  const isDragging  = useRef(false);
  const dragStartX  = useRef(0);
  const dragStartP  = useRef(0);
  const lastX       = useRef(0);
  const lastTime    = useRef(0);
  const velocityX   = useRef(0); // px/s, leftward = positive (→ next card)

  // Wheel lockout (one card per gesture group)
  const wheelLocked = useRef(false);

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

  const goNext = useCallback(() => goTo(activeRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(activeRef.current - 1), [goTo]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // Wheel / trackpad — snap exactly one card per gesture group
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLocked.current) return;
      // Prefer horizontal delta (trackpad), fall back to vertical (mouse wheel)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const dir = delta > 0 ? 1 : -1;
      goTo(activeRef.current + dir);
      wheelLocked.current = true;
      setTimeout(() => { wheelLocked.current = false; }, 680);
    },
    [goTo],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Pointer drag (mouse + touch via pointer capture)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartP.current = progress.get();
    lastX.current      = e.clientX;
    lastTime.current   = Date.now();
    velocityX.current  = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [progress]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const dt  = Math.max(1, now - lastTime.current);
    // leftward movement = positive velocity = next card
    velocityX.current = ((lastX.current - e.clientX) / dt) * 1000;
    lastX.current    = e.clientX;
    lastTime.current = now;

    const delta = (dragStartX.current - e.clientX) * DRAG_SENSITIVITY;
    const raw   = dragStartP.current + delta / strideRef.current;
    const lo = 0, hi = count - 1;
    const elastic = raw < lo
      ? lo + (raw - lo) * 0.14
      : raw > hi
      ? hi + (raw - hi) * 0.14
      : raw;
    progress.set(elastic);
  }, [count, progress]);

  const onPointerUp = useCallback((_e?: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const current = progress.get();
    let target = Math.round(current);
    if (velocityX.current >  FLICK_VELOCITY_PX) target = Math.ceil(current);
    if (velocityX.current < -FLICK_VELOCITY_PX) target = Math.floor(current);
    goTo(target);
  }, [progress, goTo]);

  return {
    activeIndex, progress, goTo, goNext, goPrev,
    strideRef, cardWRef, cardRef, containerRef,
    onPointerDown, onPointerMove, onPointerUp,
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

// ─── PaginationDot ────────────────────────────────────────────────────────────

function PaginationDot({
  index,
  isActive,
  progress,
  onClick,
}: {
  index: number;
  isActive: boolean;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  const dotOpacity = useTransform(progress, (p) => Math.max(0.25, 1 - Math.abs(p - index) * 0.75));
  return (
    <motion.button
      onClick={onClick}
      animate={{ width: isActive ? 24 : 8 }}
      transition={SPRING}
      aria-label={`Go to chapter ${index + 1}`}
      aria-current={isActive ? 'true' : undefined}
      className="rounded-full"
      style={{
        height: 8,
        background: isActive ? '#ffffff' : 'rgba(255,255,255,0.32)',
        opacity: dotOpacity,
        flexShrink: 0,
      } as React.CSSProperties}
    />
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
    activeIndex, progress, goTo, goNext, goPrev,
    strideRef, cardWRef, cardRef, containerRef,
    onPointerDown, onPointerMove, onPointerUp,
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
          className="relative cursor-grab active:cursor-grabbing touch-none"
          style={{ height: CARD_H, overflow: 'hidden' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          role="list"
          tabIndex={0}
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

        {/* Left / right nav buttons — centered vertically over the card area */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 z-20 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-20 transition-opacity"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 z-20 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            disabled={activeIndex === chapters.length - 1}
            className="pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-20 transition-opacity"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            aria-label="Next chapter"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Horizontal pagination dots */}
      <div
        className="relative z-20 flex items-center justify-center gap-2 pt-5 pb-8"
        role="tablist"
        aria-label="Chapter pagination"
      >
        {chapters.map((_, i) => (
          <PaginationDot
            key={i}
            index={i}
            isActive={i === activeIndex}
            progress={progress}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

// Legacy named export
export { HorizontalCourseList as CourseCard };
