import { motion } from 'framer-motion';
import { BookOpen, Layers, Search, PenTool, ClipboardList, Wrench, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Chapter } from '../types/course';
import { fadeInUp } from './animations';

const chapterIcons: Record<string, React.ElementType> = {
  BookOpen,
  Layers,
  Search,
  PenTool,
  ClipboardList,
  Wrench,
};

const gradients = [
  'from-primary-500 to-primary-600',
  'from-success-500 to-success-600',
  'from-amber-500 to-orange-600',
  'from-sky-500 to-cyan-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
];

interface CourseCardProps {
  chapter: Chapter;
  index: number;
  completedLessons: Set<string>;
  onStart: (chapterId: number, lessonId: number) => void;
}

// Horizontal scrollable course card with hover glow and progress indicator
export function CourseCard({ chapter, index, completedLessons, onStart }: CourseCardProps) {
  const IconComponent = chapterIcons[chapter.icon] || BookOpen;
  const gradient = gradients[index % gradients.length];
  const chapterCompleted = chapter.lessons.filter((l) =>
    completedLessons.has(`${chapter.id}-${l.id}`)
  ).length;
  const totalLessons = chapter.lessons.length;
  const completionPercent = Math.round((chapterCompleted / totalLessons) * 100);
  const isComplete = chapterCompleted === totalLessons;
  const firstIncomplete = chapter.lessons.find(
    (l) => !completedLessons.has(`${chapter.id}-${l.id}`)
  );

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={() => onStart(chapter.id, firstIncomplete?.id || chapter.lessons[0].id)}
      className="snap-start flex-shrink-0 w-72 bg-white rounded-3xl overflow-hidden cursor-pointer group"
      style={{ boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)' }}
    >
      {/* Hover glow border */}
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl`} />

        {/* Card header with gradient */}
        <div className={`relative h-32 bg-gradient-to-br ${gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute top-4 right-4">
            {isComplete ? (
              <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            ) : (
              <span className="text-xs font-bold text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {completionPercent}%
              </span>
            )}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white/90 text-xs mb-2">
              <IconComponent className="w-3.5 h-3.5" />
              <span>Chapter {chapter.id}</span>
            </div>
            {/* Progress dots */}
            <div className="flex gap-1">
              {[...Array(totalLessons)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < chapterCompleted ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-bold text-navy-900 mb-1.5 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {chapter.title}
        </h3>
        <p className="text-navy-500 text-sm mb-4 line-clamp-2 leading-relaxed">{chapter.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-navy-400 font-medium">
            {chapterCompleted}/{totalLessons} lessons
          </span>
          <div className="flex items-center gap-1 text-primary-600 text-sm font-semibold group-hover:gap-2 transition-all">
            {firstIncomplete ? 'Start' : 'Review'}
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
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

// Horizontal scroll container with snap scrolling
export function HorizontalCourseList({
  chapters,
  completedLessons,
  onStart,
  title = 'Course Chapters',
}: HorizontalCourseListProps) {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h2 className="text-2xl font-bold text-navy-900">{title}</h2>
      </div>
      <div className="overflow-x-auto scrollbar-hide snap-x-mandatory pb-4">
        <div className="flex gap-5 px-6 max-w-7xl mx-auto">
          {chapters.map((chapter, index) => (
            <CourseCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              completedLessons={completedLessons}
              onStart={onStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
