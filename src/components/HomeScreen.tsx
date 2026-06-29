import { motion } from 'framer-motion';
import { Star, Target, Award, Sparkles, ChevronRight, Zap, Flame, TrendingUp } from 'lucide-react';
import { Chapter } from '../types/course';
import { HorizontalCourseList, FloatingObjects, XpProgressRing, fadeInUp, staggerContainer, staggerItem } from '../styles';

interface HomeScreenProps {
  chapters: Chapter[];
  userXp: number;
  userStreak: number;
  completedLessons: Set<string>;
  onStartLesson: (chapterId: number, lessonId: number) => void;
  continueLesson?: { chapterId: number; lessonId: number } | null;
}

export function HomeScreen({
  chapters,
  userXp,
  userStreak,
  completedLessons,
  onStartLesson,
  continueLesson,
}: HomeScreenProps) {
  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D objects */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-navy-900"
      >
        {/* 3D floating objects background */}
        <div className="absolute inset-0 opacity-40">
          <FloatingObjects variant="hero" className="w-full h-full" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-300" />
            </div>
            <span className="text-white/80 font-medium">ISTQB Foundation Level</span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance max-w-3xl"
          >
            Master Software Testing
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            Learn the fundamentals of software testing through interactive lessons and quizzes based on the official ISTQB certification syllabus.
          </motion.p>

          {continueLesson && (
            <motion.button
              variants={staggerItem}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartLesson(continueLesson.chapterId, continueLesson.lessonId)}
              className="inline-flex items-center gap-3 bg-white text-primary-600 font-semibold px-8 py-4 rounded-2xl shadow-large"
            >
              <Sparkles className="w-5 h-5" />
              Continue Learning
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Decorative blurs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 -mt-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Progress card with ring */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 shadow-large border border-navy-100 flex items-center gap-6"
          >
            <XpProgressRing current={completedCount} total={totalLessons} size={100} strokeWidth={8} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-primary-500" />
                <span className="text-sm text-navy-500 font-medium">Overall Progress</span>
              </div>
              <p className="text-3xl font-bold text-navy-900">{progressPercent}%</p>
              <p className="text-sm text-navy-500 mt-1">{completedCount} of {totalLessons} lessons</p>
            </div>
          </motion.div>

          {/* XP card */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 shadow-large border border-navy-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-navy-900 tabular-nums">{userXp}</p>
                <p className="text-sm text-navy-500">Total XP Earned</p>
              </div>
            </div>
            <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (userXp / 1000) * 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              />
            </div>
            <p className="text-xs text-navy-400 mt-2">Next level: {1000 - (userXp % 1000)} XP to go</p>
          </motion.div>

          {/* Streak card */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 shadow-large border border-navy-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-3xl font-bold text-navy-900 tabular-nums">{userStreak}</p>
                <p className="text-sm text-navy-500">Day Streak</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 300 }}
                  className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    i < Math.min(userStreak, 7)
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                      : 'bg-navy-100 text-navy-400'
                  }`}
                >
                  {i < Math.min(userStreak, 7) ? <Flame className="w-3.5 h-3.5" /> : i + 1}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stacked Course Carousel */}
      <HorizontalCourseList
        chapters={chapters}
        completedLessons={completedLessons}
        onStart={onStartLesson}
      />

      {/* Achievement preview section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-success-500/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary-400" />
              <span className="text-primary-400 font-medium text-sm">Your Journey</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 max-w-xl">
              Keep your streak alive and earn achievements
            </h2>
            <p className="text-white/70 mb-8 max-w-lg">
              Complete lessons daily to build your streak, earn XP, and unlock achievements as you master software testing.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Award, label: 'First Lesson', unlocked: completedCount >= 1 },
                { icon: Star, label: '5 Lessons', unlocked: completedCount >= 5 },
                { icon: Flame, label: '3-Day Streak', unlocked: userStreak >= 3 },
                { icon: Target, label: '50% Complete', unlocked: progressPercent >= 50 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-3 p-4 rounded-2xl ${
                    item.unlocked ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.unlocked ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-white/10'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.unlocked ? 'text-white' : 'text-white/40'}`} />
                  </div>
                  <span className={`text-sm font-medium ${item.unlocked ? 'text-white' : 'text-white/50'}`}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
