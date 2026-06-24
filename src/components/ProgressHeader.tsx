import { BookOpen, Layers, Search, PenTool, ClipboardList, Wrench, Flame, Zap, ArrowLeft, Menu } from 'lucide-react';
import { Chapter } from '../types/course';

interface ProgressHeaderProps {
  xp: number;
  streak: number;
  onMenuClick: () => void;
}

export function ProgressHeader({ xp, streak, onMenuClick }: ProgressHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">ISTQB Mastery</h1>
              <p className="text-xs text-gray-500">Software Testing Certification</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-semibold text-orange-600">{streak}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-blue-600">{xp} XP</span>
          </div>
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-80 bg-white border-r border-gray-200 overflow-y-auto z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4">
          <h2 className="font-bold text-gray-800 mb-4 px-2">Course Content</h2>

          {chapters.map((chapter) => {
            const IconComponent = chapterIcons[chapter.icon] || BookOpen;
            const isActive = currentChapter === chapter.id;

            return (
              <div key={chapter.id} className="mb-4">
                <button
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                          : 'bg-gray-100'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {chapter.lessons.length} lessons
                      </p>
                    </div>
                  </div>
                </button>

                <div className={`ml-4 pl-4 border-l-2 ${isActive ? 'border-blue-200' : 'border-gray-100'}`}>
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
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className={`w-5 h-5 rounded-full border-2 ${
                              lesson.type === 'quiz' ? 'border-purple-400' : 'border-gray-300'
                            }`} />
                          )}
                          <span className="truncate">{lesson.title}</span>
                          <span className="ml-auto text-xs text-gray-400">{lesson.xpReward} XP</span>
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
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">{chapterTitle}</span>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-700">{lessonTitle}</span>
      </div>
    </div>
  );
}
