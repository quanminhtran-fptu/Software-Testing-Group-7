import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, Trophy, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

// Daily streak counter badge
export function StreakBadge({ streak, isActive = true }: { streak: number; isActive?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
        isActive ? 'bg-amber-50' : 'bg-navy-100'
      }`}
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flame className={`w-4 h-4 ${isActive ? 'text-amber-500' : 'text-navy-400'}`} />
      </motion.div>
      <span className={`font-semibold text-sm ${isActive ? 'text-amber-600' : 'text-navy-500'}`}>
        {streak}
      </span>
    </motion.div>
  );
}

// XP progress ring (circular)
export function XpProgressRing({
  current,
  total,
  size = 120,
  strokeWidth = 10,
  label,
}: {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, (current / total) * 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-navy-100"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#xpGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D7FF9" />
            <stop offset="100%" stopColor="#16C47F" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-navy-900">{Math.round(percentage)}%</span>
        {label && <span className="text-xs text-navy-500 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

// Achievement badge
interface BadgeProps {
  icon: React.ElementType;
  title: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

export function AchievementBadge({ icon: Icon, title, description, unlocked, progress, total }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-colors ${
        unlocked
          ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
          : 'bg-navy-50 border-navy-100'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
          unlocked
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg'
            : 'bg-navy-200'
        }`}
      >
        <Icon className={`w-7 h-7 ${unlocked ? 'text-white' : 'text-navy-400'}`} />
      </div>
      <h4 className={`text-sm font-bold text-center ${unlocked ? 'text-navy-900' : 'text-navy-500'}`}>
        {title}
      </h4>
      <p className="text-xs text-navy-400 text-center mt-1 line-clamp-2">{description}</p>
      {!unlocked && progress !== undefined && total !== undefined && (
        <div className="mt-2 w-full">
          <div className="h-1.5 bg-navy-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(progress / total) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-primary-500 rounded-full"
            />
          </div>
          <span className="text-xs text-navy-400 mt-1 block text-center">
            {progress}/{total}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Lesson completion celebration with confetti
interface CelebrationProps {
  show: boolean;
  correctAnswers: number;
  totalQuestions: number;
  xpEarned: number;
  onContinue: () => void;
  hasNext: boolean;
}

export function LessonCelebration({
  show,
  correctAnswers,
  totalQuestions,
  xpEarned,
  onContinue,
  hasNext,
}: CelebrationProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm"
        >
          {windowSize.width > 0 && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
              colors={['#2D7FF9', '#16C47F', '#F59E0B', '#FF5A5F', '#8B5CF6']}
            />
          )}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-large max-w-md w-full p-8 text-center relative z-10"
          >
            {/* Trophy with pulse ring */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-navy-900 mb-2"
            >
              Quiz Complete!
            </motion.h2>
            <p className="text-navy-500 mb-6">Great effort on finishing this quiz.</p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-success-50 rounded-2xl p-4 border border-success-200"
              >
                <p className="text-3xl font-bold text-success-600">{correctAnswers}</p>
                <p className="text-xs text-success-600/80 font-medium mt-1">Correct</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-50 rounded-2xl p-4 border border-primary-200"
              >
                <p className="text-3xl font-bold text-primary-600">{percentage}%</p>
                <p className="text-xs text-primary-600/80 font-medium mt-1">Score</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-amber-50 rounded-2xl p-4 border border-amber-200"
              >
                <p className="text-3xl font-bold text-amber-600">{xpEarned}</p>
                <p className="text-xs text-amber-600/80 font-medium mt-1">XP Earned</p>
              </motion.div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onContinue}
                className="flex-1 py-3 rounded-2xl border-2 border-navy-200 text-navy-600 font-medium hover:bg-navy-50 transition-colors"
              >
                Back to Course
              </button>
              {hasNext && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onContinue}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg"
                >
                  Next Lesson
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Achievement popup modal
interface AchievementPopupProps {
  show: boolean;
  title: string;
  description: string;
  xpReward: number;
  onClose: () => void;
}

export function AchievementPopup({ show, title, description, xpReward, onClose }: AchievementPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-large max-w-sm w-full p-8 text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mb-2">Achievement Unlocked!</h2>
            <h3 className="text-lg font-medium text-amber-600 mb-3">{title}</h3>
            <p className="text-navy-500 mb-4">{description}</p>

            <div className="flex items-center justify-center gap-2 text-amber-600 mb-6">
              <Zap className="w-5 h-5" />
              <span className="font-bold text-lg">+{xpReward} XP</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg"
            >
              Awesome!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
