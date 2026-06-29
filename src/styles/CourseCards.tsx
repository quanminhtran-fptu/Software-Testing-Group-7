import { useRef, useState, useEffect, useCallback } from 'react';
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

// ─── Constants ───────────────────────────────────────────────────────────────

const CARD_GAP = 20;
const SNAP_VELOCITY = 400; // px/s threshold for flick-snap
const SPRING = { stiffness: 380, damping: 42, mass: 1 } as const;

const CHAPTER_ICONS: Record<string, React.ElementType> = {
  BookOpen, Layers, Search, PenTool, ClipboardList, Wrench,
};

const THEMES = [
  { accent: '#6366f1', accentRgb: '99,102,241',  level: 'LEVEL 1' },
  { accent: '#22c55e', accentRgb: '34,197,94',   level: 'LEVEL 2' },
  { accent: '#f59e0b', accentRgb: '245,158,11',  level: 'LEVEL 3' },
  { accent: '#38bdf8', accentRgb: '56,189,248',  level: 'LEVEL 4' },
  { accent: '#f43f5e', accentRgb: '244,63,94',   level: 'LEVEL 5' },
  { accent: '#a855f7', accentRgb: '168,85,247',  level: 'LEVEL 6' },
] as const;

// ─── useCarousel hook ────────────────────────────────────────────────────────

function useCarousel(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stride, setStride] = useState(360);
  const trackX = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Stable refs so callbacks don't stale-close over state
  const activeRef = useRef(0);
  const strideRef = useRef(stride);
  activeRef.current = activeIndex;
  strideRef.current = stride;

  // Measure card dimensions and re-sync position on resize
  useEffect(() => {
    const measure = () => {
      if (!cardRef.current) return;
      const w = cardRef.current.getBoundingClientRect().width;
      if (w <= 0) return;
      const s = w + CARD_GAP;
      strideRef.current = s;
      setStride(s);
      trackX.set(-activeRef.current * s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (cardRef.current) ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, [trackX]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(count - 1, index));
      activeRef.current = clamped;
      setActiveIndex(clamped);
      animate(trackX, -clamped * strideRef.current, { type: 'spring', ...SPRING });
    },
    [count, trackX],
  );

  const goNext = useCallback(() => goTo(activeRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(activeRef.current - 1), [goTo]);

  const handleDragEnd = useCallback(
    (velocityX: number) => {
      const x = trackX.get();
      let target = Math.round(-x / strideRef.current);
      if (velocityX < -SNAP_VELOCITY) target = activeRef.current + 1;
      if (velocityX >  SNAP_VELOCITY) target = activeRef.current - 1;
      goTo(target);
    },
    [trackX, goTo],
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  return { activeIndex, stride, trackX, goTo, goNext, goPrev, handleDragEnd, cardRef };
}

// ─── LessonRow ───────────────────────────────────────────────────────────────

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
    <div className="flex items-center gap-3 py-2.5">
      <div
        className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border-2"
        style={
          done
            ? { background: '#22c55e22', borderColor: '#22c55e' }
            : isNext
            ? { background: accent + '28', borderColor: accent }
            : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)' }
        }
      >
        {done
          ? <CheckCircle2 className="w-4 h-4 text-green-400" />
          : isNext
          ? <Icon className="w-4 h-4" style={{ color: accent }} />
          : <Lock className="w-3.5 h-3.5 text-white/25" />}
      </div>

      <span
        className="flex-1 text-sm font-medium leading-tight"
        style={{ color: done || isNext ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.32)' }}
      >
        {lesson.title}
      </span>

      <div
        className="w-4 h-4 rounded-full flex-shrink-0"
        style={
          done
            ? { background: '#22c55e', boxShadow: '0 0 8px #22c55e70' }
            : isNext
            ? { background: accent, boxShadow: `0 0 8px ${accent}70` }
            : { background: 'rgba(255,255,255,0.1)' }
        }
      />
    </div>
  );
}

// ─── CardIllustration ────────────────────────────────────────────────────────

function CardIllustration({
  Icon,
  accent,
  accentRgb,
}: {
  Icon: React.ElementType;
  accent: string;
  accentRgb: string;
}) {
  return (
    <div
      className="mx-6 rounded-2xl flex items-center justify-center py-8 relative overflow-hidden"
      style={{ background: `rgba(${accentRgb}, 0.08)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${accentRgb}, 0.16) 0%, transparent 70%)`,
        }}
      />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: `rgba(${accentRgb}, 0.16)`,
          border: `2px solid rgba(${accentRgb}, 0.28)`,
          boxShadow: `0 8px 28px rgba(${accentRgb}, 0.22)`,
        }}
      >
        <Icon className="w-10 h-10" style={{ color: accent }} />
      </motion.div>
    </div>
  );
}

// ─── PaginationDot (own component = own hooks, no loop violation) ─────────────

function PaginationDot({
  index,
  isActive,
  trackX,
  stride,
  onClick,
}: {
  index: number;
  isActive: boolean;
  trackX: MotionValue<number>;
  stride: number;
  onClick: () => void;
}) {
  const dotOpacity = useTransform(trackX, (x) => {
    const d = Math.abs((x + index * stride) / (stride || 360));
    return Math.max(0.28, 1 - d * 0.72);
  });

  return (
    <motion.button
      onClick={onClick}
      aria-label={`Go to chapter ${index + 1}`}
      aria-selected={isActive}
      role="tab"
      animate={{ width: isActive ? 24 : 8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      style={{
        height: 8,
        background: isActive ? '#6366f1' : 'rgba(15,23,42,0.22)',
        borderRadius: 4,
        opacity: dotOpacity,
        flexShrink: 0,
      }}
    />
  );
}

// ─── SessionCard ─────────────────────────────────────────────────────────────

interface SessionCardProps {
  chapter: Chapter;
  index: number;
  isActive: boolean;
  completedLessons: Set<string>;
  onStart: (chapterId: number, lessonId: number) => void;
  trackX: MotionValue<number>;
  stride: number;
  cardRef?: React.Ref<HTMLDivElement>;
}

function SessionCard({
  chapter,
  index,
  isActive,
  completedLessons,
  onStart,
  trackX,
  stride,
  cardRef,
}: SessionCardProps) {
  const theme = THEMES[index % THEMES.length];
  const Icon = CHAPTER_ICONS[chapter.icon] || BookOpen;

  const doneCount = chapter.lessons.filter(
    (l) => completedLessons.has(`${chapter.id}-${l.id}`)
  ).length;
  const firstIncomplete = chapter.lessons.find(
    (l) => !completedLessons.has(`${chapter.id}-${l.id}`)
  );
  const allDone = doneCount === chapter.lessons.length;
  const targetLesson = firstIncomplete ?? chapter.lessons[0];

  // Per-card motion transforms — hooks always called (no conditionals)
  const scale = useTransform(trackX, (x) => {
    const d = Math.abs((x + index * stride) / (stride || 360));
    return Math.max(0.83, 1 - d * 0.14);
  });
  const opacity = useTransform(trackX, (x) => {
    const d = Math.abs((x + index * stride) / (stride || 360));
    return Math.max(0.42, 1 - d * 0.44);
  });

  const ctaLabel = allDone ? 'Review' : doneCount > 0 ? 'Continue' : 'Start';

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="flex-shrink-0 w-[min(340px,82vw)] rounded-3xl overflow-hidden will-change-transform"
      aria-roledescription="slide"
      aria-label={`Chapter ${index + 1}: ${chapter.title}`}
    >
      <div
        className="rounded-3xl overflow-hidden h-full"
        style={{
          background: 'linear-gradient(160deg, #1e2232 0%, #12141e 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: isActive
            ? `0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(${theme.accentRgb}, 0.12)`
            : '0 12px 32px rgba(0,0,0,0.35)',
        }}
      >
        {/* Header */}
        <div className="pt-7 pb-4 px-6 text-center">
          <h3 className="text-[17px] font-bold text-white leading-tight tracking-tight">
            {chapter.title}
          </h3>
          <span
            className="text-[10px] font-bold tracking-[0.22em] mt-1.5 block uppercase"
            style={{ color: theme.accent }}
          >
            {theme.level}
          </span>
        </div>

        {/* Illustration */}
        <CardIllustration Icon={Icon} accent={theme.accent} accentRgb={theme.accentRgb} />

        {/* Lesson list */}
        <div className="px-6 pt-3 pb-1 divide-y divide-white/[0.05]">
          {chapter.lessons.map((lesson, li) => {
            const prevDone =
              li === 0 ||
              completedLessons.has(`${chapter.id}-${chapter.lessons[li - 1].id}`);
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

        {/* CTA */}
        <div className="px-6 pt-4 pb-7">
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.965 }}
            onClick={() => onStart(chapter.id, targetLesson.id)}
            className="w-full py-[14px] rounded-2xl font-bold text-white text-sm relative overflow-hidden"
            style={{
              background: `linear-gradient(130deg, ${theme.accent}, ${theme.accent}bb)`,
              boxShadow: `0 ${isActive ? 8 : 4}px ${isActive ? 28 : 14}px rgba(${theme.accentRgb}, ${isActive ? 0.42 : 0.22})`,
            }}
            aria-label={`${ctaLabel} ${chapter.title}`}
          >
            <span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.16) 0%, transparent 52%)' }}
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

// ─── HorizontalCourseList (root carousel) ────────────────────────────────────

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
  const { activeIndex, stride, trackX, goTo, goNext, goPrev, handleDragEnd, cardRef } =
    useCarousel(chapters.length);

  const dragLeft  = -(chapters.length - 1) * stride;
  const dragRight = 0;

  return (
    <section className="py-8" aria-label={title} aria-roledescription="carousel">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy-900">{title}</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="w-9 h-9 rounded-full bg-navy-100 hover:bg-navy-200 disabled:opacity-30 transition-colors flex items-center justify-center"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-5 h-5 text-navy-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            disabled={activeIndex === chapters.length - 1}
            className="w-9 h-9 rounded-full bg-navy-100 hover:bg-navy-200 disabled:opacity-30 transition-colors flex items-center justify-center"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-5 h-5 text-navy-600" />
          </motion.button>
        </div>
      </div>

      {/* Carousel viewport — overflow hidden clips side-cards */}
      <div
        className="overflow-hidden px-6 cursor-grab active:cursor-grabbing"
        role="list"
      >
        <motion.div
          className="flex"
          style={{ x: trackX, gap: CARD_GAP }}
          drag="x"
          dragConstraints={{ left: dragLeft, right: dragRight }}
          dragElastic={0.10}
          dragMomentum={false}
          onDragEnd={(_, info) => handleDragEnd(info.velocity.x)}
        >
          {chapters.map((chapter, index) => (
            <SessionCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              isActive={index === activeIndex}
              completedLessons={completedLessons}
              onStart={onStart}
              trackX={trackX}
              stride={stride}
              cardRef={index === 0 ? cardRef : undefined}
            />
          ))}
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div
        className="flex items-center justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Chapter pagination"
      >
        {chapters.map((_, i) => (
          <PaginationDot
            key={i}
            index={i}
            isActive={i === activeIndex}
            trackX={trackX}
            stride={stride}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

// Legacy named export
export { HorizontalCourseList as CourseCard };
