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
  Award,
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
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-500',
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
    color: 'from-indigo-400 to-indigo-600',
    bgColor: 'bg-indigo-500',
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
    color: 'from-violet-400 to-purple-600',
    bgColor: 'bg-purple-500',
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
    color: 'from-emerald-400 to-teal-600',
    bgColor: 'bg-teal-500',
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
    <main className="pt-24 px-6 pb-12 min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8">
        
        {/* Left column - Stats & Progress */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[32px] p-8 shadow-large flex flex-col relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl font-extrabold gradient-text mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-primary-500" />
            Dashboard
          </h2>

          <div className="rounded-[28px] border border-white/40 bg-white/40 p-6 mb-8 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 leading-none drop-shadow-sm">
                  {userStreak || 1}
                </div>
                <div className="flex items-center gap-2 text-orange-600 font-bold mt-2">
                  <Zap className="w-5 h-5 fill-current animate-pulse" />
                  Day Streak
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-extrabold text-primary-600 leading-none">
                  {userXp}
                </div>
                <div className="text-sm font-black text-primary-400 tracking-widest mt-1 uppercase">XP</div>
              </div>
            </div>

            <p className="text-navy-700 font-medium leading-relaxed mb-6 text-sm relative z-10">
              Complete 3 quick lessons today to understand the CI/CD flow and maintain your streak!
            </p>

            <div className="flex items-center justify-between mb-2 relative z-10">
              {[1, 2, 3, 4, 5].map((day, index) => (
                <div
                  key={day}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-transform hover:scale-110 ${
                    index === 0
                      ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-glow-error'
                      : 'bg-white/60 text-navy-300 border border-white/50'
                  }`}
                >
                  {index === 0 ? <Zap className="w-4 h-4 fill-current" /> : '•'}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between px-2 text-xs font-black text-navy-400 relative z-10">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm font-black text-navy-800 mb-3">
              <span className="uppercase tracking-wider">Course Progress</span>
              <span className="text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">{progressPercent}%</span>
            </div>

            <div className="h-4 bg-navy-100/50 rounded-full overflow-hidden relative shadow-inner backdrop-blur-sm border border-white/40">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
              <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Right column - Main Content */}
        <div className="flex flex-col gap-8">
          
          {/* Featured Hero Card */}
          <div className="relative">
            {/* Ambient glow behind card */}
            <div className="absolute inset-0 translate-y-6 translate-x-4 bg-navy-900/5 rounded-[40px] blur-xl" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
                className={`relative grid grid-cols-1 lg:grid-cols-2 rounded-[40px] overflow-hidden bg-gradient-to-br ${activeTask.color} shadow-2xl border border-white/20`}
              >
                {/* 3D Visual Area */}
                <div className="relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden bg-black/10 backdrop-blur-sm">
                  {/* Decorative circles */}
                  <div className="absolute -top-20 -left-20 w-64 h-64 border-[40px] border-white/10 rounded-full blur-sm" />
                  <div className="absolute -bottom-32 -right-32 w-96 h-96 border-[60px] border-white/5 rounded-full blur-md" />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-12 left-10 bg-white/90 backdrop-blur-md text-navy-900 font-black rounded-2xl px-6 py-3 shadow-xl border border-white"
                  >
                    🚀 Push
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-32 right-12 bg-white/90 backdrop-blur-md text-navy-900 font-black rounded-2xl px-6 py-3 shadow-xl border border-white"
                  >
                    🧪 Test
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-20 left-16 bg-white/90 backdrop-blur-md text-navy-900 font-black rounded-2xl px-6 py-3 shadow-xl border border-white"
                  >
                    📦 Build
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
                    className="w-72 h-72 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center backdrop-blur-md shadow-glow relative z-10"
                  >
                    <span className="text-white text-9xl font-black drop-shadow-2xl">
                      {activeIndex + 1}
                    </span>
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="p-10 lg:p-12 text-white flex flex-col justify-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 text-xs font-black tracking-widest mb-6 w-fit uppercase shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {activeTask.tag}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl lg:text-6xl font-black mb-4 tracking-tight drop-shadow-md"
                  >
                    {activeTask.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-bold text-white/80 text-xl mb-6 uppercase tracking-wider text-sm"
                  >
                    CI/CD Module • {activeTask.level}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg lg:text-xl leading-relaxed font-medium mb-10 max-w-xl text-white/90"
                  >
                    {activeTask.description}
                  </motion.p>

                  <div className="space-y-4 mb-10">
                    {activeTask.lessons.map((lesson, index) => (
                      <motion.div
                        key={`${activeIndex}-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-black/10 border border-white/10 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-4">
                          {lesson.done ? (
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                              <CheckCircle2 className="w-6 h-6 text-green-300" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                              <Lock className="w-5 h-5 text-white/50" />
                            </div>
                          )}

                          <span className="text-xl font-bold text-white/90">
                            {index + 1}. {lesson.title}
                          </span>
                        </div>

                        <span className={`font-black text-sm uppercase tracking-wider ${lesson.done ? 'text-green-300' : 'text-white/40'}`}>
                          {lesson.done ? 'Done' : 'Locked'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startHeroLesson}
                    className="mt-auto w-full rounded-2xl bg-white text-navy-900 text-2xl font-black py-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-4 group"
                  >
                    Start Mission
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Grid Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {homeTasks.map((task, index) => {
              const Icon = task.icon;
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={task.title}
                  onClick={() => setActiveIndex(index)}
                  className={`app-card card-hover p-6 flex flex-col items-start gap-4 text-left border-2 group ${
                    isActive 
                      ? `border-${task.bgColor.replace('bg-', '')}` 
                      : 'border-transparent'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110 group-hover:-rotate-3 ${isActive ? task.bgColor : 'bg-navy-100 text-navy-400'}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="mt-2">
                    <div className="text-navy-900 font-black text-xl mb-1 group-hover:text-primary-600 transition-colors">
                      {task.title}
                    </div>
                    <div className="text-navy-400 font-bold text-xs tracking-widest uppercase">
                      {task.level}
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 h-1.5 w-full ${task.bgColor}`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

        </div>
      </div>
    </main>
  );
}