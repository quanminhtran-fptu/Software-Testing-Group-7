import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  GitBranch,
  Boxes,
  Github,
  BarChart3,
} from 'lucide-react';
import { Chapter } from '../types/course';

interface HomeScreenProps {
  chapters: Chapter[];
  userXp: number;
  userStreak: number;
  completedLessons: Set<string>;
  onOpenChapter: (chapterId: number) => void;
}

const homeTasks = [
  {
    title: 'CI/CD Basics',
    tag: 'START HERE',
    level: 'LEVEL 1',
    icon: GitBranch,
    color: '#0ea5e9',
    description:
      'Learn what CI/CD means and why teams use it to automatically check code after every update.',
    lessons: [
      { title: 'What is CI?', done: true },
      { title: 'What is CD?', done: false },
    ],
  },
  {
    title: 'Pipeline Flow',
    tag: 'WORKFLOW',
    level: 'LEVEL 1',
    icon: Boxes,
    color: '#0284c7',
    description:
      'Understand how code moves through a pipeline: push, install, build, test, and report.',
    lessons: [
      { title: 'Pipeline steps', done: false },
      { title: 'Build and test flow', done: false },
    ],
  },
  {
    title: 'GitHub Actions',
    tag: 'AUTOMATION',
    level: 'LEVEL 1',
    icon: Github,
    color: '#2563eb',
    description:
      'See how GitHub Actions runs workflows automatically whenever developers push code.',
    lessons: [
      { title: 'Workflow file', done: false },
      { title: 'Push trigger', done: false },
    ],
  },
  {
    title: 'Testing & Reports',
    tag: 'RESULTS',
    level: 'LEVEL 1',
    icon: BarChart3,
    color: '#06b6d4',
    description:
      'Learn how automated tests show pass or fail results, and how reports help developers fix problems quickly.',
    lessons: [
      { title: 'Automated testing', done: false },
      { title: 'Reading reports', done: false },
    ],
  },
];

export function HomeScreen({
  chapters,
  userXp,
  userStreak,
  completedLessons,
  onOpenChapter,
}: HomeScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTask = homeTasks[activeIndex];
  const activeChapter = chapters[activeIndex] || chapters[0];

  const totalLessons = chapters.reduce(
    (sum, chapter) => sum + chapter.lessons.length,
    0
  );

  const progressPercent = Math.min(
    100,
    Math.round((completedLessons.size / Math.max(1, totalLessons)) * 100)
  );

  const startHeroLesson = () => {
    if (activeChapter) {
      onOpenChapter(activeChapter.id);
    }
  };

  return (
    <main className="pt-24 px-6 pb-10 bg-sky-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
        {/* Left column */}
        <div className="bg-white rounded-[32px] border border-sky-100 p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-sky-500 mb-6">
            Welcome
          </h2>

          <div className="rounded-[28px] border border-sky-100 bg-sky-50 p-5 mb-5">
            <div className="flex items-start justify-between mb-4">
              <div className="text-6xl font-extrabold text-sky-900 leading-none">
                {userStreak || 1}
              </div>

              <div className="text-right">
                <div className="text-4xl font-extrabold text-sky-900 leading-none">
                  {userXp}
                </div>
                <div className="text-sm font-bold text-sky-700">XP</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sky-700 font-semibold mb-4">
              <Zap className="w-5 h-5 text-sky-400" />
              learning streak
            </div>

            <p className="text-sky-900 font-semibold leading-7 mb-5">
              Complete 3 quick problems
              <br />
              to understand the CI/CD
              <br />
              flow.
            </p>

            <div className="flex items-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((day, index) => (
                <div
                  key={day}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0
                      ? 'bg-sky-500 text-white'
                      : 'bg-sky-100 text-sky-300'
                  }`}
                >
                  {index === 0 ? '✓' : '•'}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pl-1 text-xs font-bold text-sky-700">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm font-bold text-sky-900 mb-2">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>

            <div className="h-3 bg-sky-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <h2 className="text-2xl font-extrabold text-sky-900 mb-4">
            Jump back in
          </h2>

          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-sky-200 rounded-[36px] opacity-60" />
            <div className="absolute inset-0 translate-x-8 translate-y-8 bg-sky-100 rounded-[36px] opacity-80" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="relative grid grid-cols-1 lg:grid-cols-2 rounded-[36px] overflow-hidden bg-gradient-to-r from-sky-500 to-sky-700 shadow-xl"
              >
                <div className="relative min-h-[460px] flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-600">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="absolute top-10 left-8 bg-white text-sky-800 font-bold rounded-full px-4 py-2 shadow"
                  >
                    push
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="absolute top-28 right-10 bg-white text-sky-800 font-bold rounded-full px-4 py-2 shadow"
                  >
                    test
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 }}
                    className="absolute bottom-14 left-10 bg-white text-sky-800 font-bold rounded-full px-4 py-2 shadow"
                  >
                    build
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-80 h-80 rounded-full bg-white/20 border border-white/20 flex items-center justify-center"
                  >
                    <span className="text-white text-8xl font-extrabold drop-shadow-xl">
                      {activeIndex + 1}
                    </span>
                  </motion.div>
                </div>

                <div className="p-10 text-white flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="inline-block w-fit border border-white/50 rounded-full px-5 py-2 text-sm font-bold mb-6"
                  >
                    {activeTask.tag}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="text-5xl font-extrabold mb-3"
                  >
                    {activeTask.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="font-bold text-xl mb-8"
                  >
                    CI/CD & Reporting · {activeTask.level}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl leading-10 font-semibold mb-8 max-w-xl"
                  >
                    {activeTask.description}
                  </motion.p>

                  <div className="border-t border-white/20">
                    {activeTask.lessons.map((lesson, index) => (
                      <motion.div
                        key={`${activeIndex}-${index}`}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.22 + index * 0.08 }}
                        className="flex items-center justify-between py-5 border-b border-white/20"
                      >
                        <div className="flex items-center gap-4">
                          {lesson.done ? (
                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                          ) : (
                            <Lock className="w-10 h-10 text-sky-200" />
                          )}

                          <span className="text-2xl font-bold">
                            {index + 1}. {lesson.title}
                          </span>
                        </div>

                        <span className="font-bold text-lg">
                          {lesson.done ? 'Done' : 'Locked'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={startHeroLesson}
                    className="mt-8 w-full rounded-[22px] bg-sky-400 hover:bg-sky-300 text-white text-3xl font-extrabold py-5 shadow-lg transition-all flex items-center justify-center gap-3"
                  >
                    Start
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            {homeTasks.map((task, index) => {
              const Icon = task.icon;
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={task.title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={
                    isActive
                      ? { y: -5, scale: 1.03 }
                      : { y: 0, scale: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveIndex(index)}
                  className={`bg-white rounded-[24px] shadow-sm p-5 flex items-center gap-4 text-left border-2 ${
                    isActive ? 'border-navy-900' : 'border-sky-100'
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl text-white flex items-center justify-center"
                    style={{ backgroundColor: task.color }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <div className="text-sky-900 font-extrabold text-xl leading-6">
                      {task.title}
                    </div>
                    <div className="text-sky-500 font-bold text-sm mt-1">
                      {task.level}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}