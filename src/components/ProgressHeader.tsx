import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Search, PenTool, ClipboardList, Wrench, ArrowLeft, Menu, X } from 'lucide-react';
import { Chapter } from '../types/course';
import { XpCounter, StreakBadge } from '../styles';

interface ProgressHeaderProps {
  xp: number;
  streak: number;
  onMenuClick: () => void;
}

export function ProgressHeader({ xp, streak, onMenuClick }: ProgressHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 glass border-b border-navy-100 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-navy-100 rounded-lg lg:hidden transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-navy-600" />
          </button>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-navy-900">ISTQB Mastery</h1>
              <p className="text-xs text-navy-500">Software Testing Certification</p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <StreakBadge streak={streak} isActive={streak > 0} />
          <XpCounter xp={xp} />
        </div>
      </div>
    </header>
  );
}

const chapterIcons: Record<string, React.ElementType> = {
  BookOpen,
  Layers,
  Search,
  PenTool,
  ClipboardList,
  Wrench
};

interface SidebarProps {
  chapters: Chapter[];
  currentChapter: number | null;
  currentLesson: number | null;
  onSelectLesson: (chapterId: number, lessonId: number) => void;
  completedLessons: Set<string>;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  chapters,
  currentChapter,
  currentLesson,
  onSelectLesson,
  completedLessons,
  isOpen,
  onClose
}: SidebarProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-16 left-0 bottom-0 w-80 bg-white border-r border-navy-100 overflow-y-auto z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="font-bold text-navy-900">Course Content</h2>
          <button onClick={onClose} className="p-1 hover:bg-navy-100 rounded-lg">
            <X className="w-5 h-5 text-navy-500" />
          </button>
        </div>

        <nav className="p-4">
          <h2 className="font-bold text-navy-900 mb-4 px-2 hidden lg:block">Course Content</h2>

          {chapters.map((chapter) => {
            const IconComponent = chapterIcons[chapter.icon] || BookOpen;
            const isActive = currentChapter === chapter.id;

            return (
              <div key={chapter.id} className="mb-4">
                <button
                  onClick={() => onSelectLesson(chapter.id, chapter.lessons[0].id)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    isActive ? 'bg-primary-50 border border-primary-200' : 'hover:bg-navy-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                          : 'bg-navy-100'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-navy-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy-900 text-sm truncate">
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-navy-500">
                        {chapter.lessons.length} lessons
                      </p>
                    </div>
                  </div>
                </button>

                <div className={`ml-4 pl-4 border-l-2 ${isActive ? 'border-primary-200' : 'border-navy-100'}`}>
                  {chapter.lessons.map((lesson) => {
                    const lessonKey = `${chapter.id}-${lesson.id}`;
                    const isCompleted = completedLessons.has(lessonKey);
                    const isCurrentLesson = currentChapter === chapter.id && currentLesson === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(chapter.id, lesson.id)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-all ${
                          isCurrentLesson
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'text-navy-600 hover:bg-navy-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <div className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                              lesson.type === 'quiz' ? 'border-accent-400' : 'border-navy-300'
                            }`} />
                          )}
                          <span className="truncate flex-1">{lesson.title}</span>
                          <span className="ml-auto text-xs text-navy-400 flex-shrink-0">{lesson.xpReward} XP</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

interface BreadcrumbProps {
  chapterTitle: string;
  lessonTitle: string;
  onBack: () => void;
}

export function Breadcrumb({ chapterTitle, lessonTitle, onBack }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <button
        onClick={onBack}
        className="p-2 hover:bg-navy-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-navy-600" />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-navy-500">{chapterTitle}</span>
        <span className="text-navy-300">/</span>
        <span className="font-medium text-navy-700">{lessonTitle}</span>
      </div>
    </div>
  );
}
