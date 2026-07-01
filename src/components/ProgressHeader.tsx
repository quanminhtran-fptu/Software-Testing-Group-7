import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Home, ClipboardList, Menu } from 'lucide-react';
import { XpCounter, StreakBadge } from '../styles';

interface ProgressHeaderProps {
  xp: number;
  streak: number;
  onMenuClick: () => void;
  onHomeClick: () => void;
  onCourseClick: () => void;
}

export function ProgressHeader({
  xp,
  streak,
  onMenuClick,
  onHomeClick,
  onCourseClick,
}: ProgressHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 glass border-b border-navy-100 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-navy-100 rounded-lg md:hidden transition-colors"
            aria-label="Open courses"
          >
            <Menu className="w-5 h-5 text-navy-600" />
          </button>

          <motion.button
            onClick={onHomeClick}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-left"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-navy-900">CICD Lab</h1>
              <p className="text-xs text-navy-500">CI/CD & Reporting</p>
            </div>
          </motion.button>

          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={onHomeClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-navy-900 hover:bg-primary-50 transition-colors border-b-2 border-primary-500"
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={onCourseClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-navy-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
              Courses
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <StreakBadge streak={streak} isActive={streak > 0} />
          <XpCounter xp={xp} />
        </div>
      </div>
    </header>
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