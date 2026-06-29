import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Layers, Search, PenTool, ClipboardList, Wrench,
  ChevronLeft, ChevronRight, CheckCircle2, Lock, Play, FileText, HelpCircle,
} from 'lucide-react';
import { Chapter, Lesson } from '../types/course';

const chapterIcons: Record<string, React.ElementType> = {
  BookOpen, Layers, Search, PenTool, ClipboardList, Wrench,
};

const chapterThemes = [
  { bg: 'from-slate-800 to-slate-900', accent: '#6366f1', accentLight: 'rgba(99,102,241,0.15)', level: 'LEVEL 1' },
  { bg: 'from-slate-800 to-slate-900', accent: '#22c55e', accentLight: 'rgba(34,197,94,0.15)', level: 'LEVEL 2' },
  { bg: 'from-slate-800 to-slate-900', accent: '#f59e0b', accentLight: 'rgba(245,158,11,0.15)', level: 'LEVEL 3' },
  { bg: 'from-slate-800 to-slate-900', accent: '#38bdf8', accentLight: 'rgba(56,189,248,0.15)', level: 'LEVEL 4' },
  { bg: 'from-slate-800 to-slate-900', accent: '#f43f5e', accentLight: 'rgba(244,63,94,0.15)', level: 'LEVEL 5' },
  { bg: 'from-slate-800 to-slate-900', accent: '#a855f7', accentLight: 'rgba(168,85,247,0.15)', level: 'LEVEL 6' },
];

function LessonRow({
  lesson,
  chapterId,
  completedLessons,
  isFirst,
}: {
  lesson: Lesson;
  chapterId: number;
  completedLessons: Set<string>;
  isFirst: boolean;
}) {
  const key = `${chapterId}-${lesson.id}`;
  const done = completedLessons.has(key);
  const LessonIcon = lesson.type === 'quiz' ? HelpCircle : FileText;

  return (
    <div className="flex items-center gap-3 py-2.5">
      {/* Avatar circle */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2"
        style={
          done
            ? { background: '#22c55e22', borderColor: '#22c55e' }
            : isFirst
            ? { background: 'rgba(99,102,241,0.18)', borderColor: '#6366f1' }
            : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)' }
        }
      >
        {done ? (
          <CheckCircle2 className="w-4 h-4 text-green-400" />
        ) : isFirst ? (
          <LessonIcon className="w-4 h-4 text-indigo-400" />
        ) : (
          <Lock className="w-3.5 h-3.5 text-white/30" />
        )}
      </div>

      {/* Title */}
      <span
        className="flex-1 text-sm font-medium leading-tight"
        style={done ? { color: '#fff' } : isFirst ? { color: '#fff' } : { color: 'rgba(255,255,255,0.4)' }}
      >
        {lesson.title}
      </span>

      {/* Status dot */}
      <div
        className="w-5 h-5 rounded-full flex-shrink-0"
        style={
          done
            ? { background: '#22c55e', boxShadow: '0 0 6px #22c55e80' }
            : isFirst
            ? { background: '#6366f1', boxShadow: '0 0 6px #6366f180' }
            : { background: 'rgba(255,255,255,0.12)' }
        }
      />
    </div>
  );
}

interface SessionCardProps {
  chapter: Chapter;
  index: number;
  completedLessons: Set<string>;
  onStart: (chapterId: number, lessonId: number) => void;
}

function SessionCard({ chapter, index, completedLessons, onStart }: SessionCardProps) {
  const theme = chapterThemes[index % chapterThemes.length];
  const IconComponent = chapterIcons[chapter.icon] || BookOpen;

  const chapterDone = chapter.lessons.filter(
    (l) => completedLessons.has(`${chapter.id}-${l.id}`)
  ).length;
  const firstIncomplete = chapter.lessons.find(
    (l) => !completedLessons.has(`${chapter.id}-${l.id}`)
  );
  const allDone = chapterDone === chapter.lessons.length;

  const targetLesson = firstIncomplete || chapter.lessons[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className={`snap-center flex-shrink-0 w-[min(340px,82vw)] rounded-3xl overflow-hidden bg-gradient-to-b ${theme.bg} select-none`}
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
      }}
    >
      {/* Card header */}
      <div className="pt-7 pb-4 px-6 text-center">
        <h3 className="text-xl font-bold text-white leading-tight">{chapter.title}</h3>
        <span className="text-xs font-bold tracking-widest mt-1 block" style={{ color: theme.accent }}>
          {theme.level}
        </span>
      </div>

      {/* Illustration area */}
      <div className="mx-6 rounded-2xl overflow-hidden flex items-center justify-center py-8" style={{ background: theme.accentLight }}>
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: theme.accent + '30', border: `2px solid ${theme.accent}40` }}
        >
          <IconComponent className="w-10 h-10" style={{ color: theme.accent }} />
        </div>
      </div>

      {/* Lessons list */}
      <div className="px-6 pt-4 pb-2 divide-y divide-white/5">
        {chapter.lessons.map((lesson, li) => {
          const isAccessible =
            li === 0 ||
            completedLessons.has(`${chapter.id}-${chapter.lessons[li - 1].id}`);
          const isFirst = lesson === firstIncomplete && isAccessible;

          return (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              chapterId={chapter.id}
              completedLessons={completedLessons}
              isFirst={isFirst}
            />
          );
        })}
      </div>

      {/* Start button */}
      <div className="px-6 pt-4 pb-7">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onStart(chapter.id, targetLesson.id)}
          className="w-full py-4 rounded-2xl font-bold text-white text-base relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
            boxShadow: `0 4px 20px ${theme.accent}55`,
          }}
        >
          {/* Shine overlay */}
          <span
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
          />
          <span className="relative flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-white" />
            {allDone ? 'Review' : chapterDone > 0 ? 'Continue' : 'Start'}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

interface HorizontalCourseListProps {
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 360 : -360, behavior: 'smooth' });
  };

  return (
    <div className="py-8">
      {/* Header row */}
      <div className="max-w-7xl mx-auto px-6 mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy-900">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-navy-100 hover:bg-navy-200 transition-colors flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-navy-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-navy-100 hover:bg-navy-200 transition-colors flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-navy-600" />
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex gap-5 px-6 max-w-7xl mx-auto">
          {chapters.map((chapter, index) => (
            <SessionCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              completedLessons={completedLessons}
              onStart={onStart}
            />
          ))}
          {/* Trailing space so last card snaps cleanly */}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>
    </div>
  );
}

// Keep named export for legacy imports
export { SessionCard as CourseCard };
