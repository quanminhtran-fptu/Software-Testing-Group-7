import { Trophy, Star, Flame, Zap, Target, BookOpen, Award, Crown, Medal, Gift } from 'lucide-react';
import { Achievement, Badge } from '../types/course';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center transform animate-scaleIn">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse-ring" />
          <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Achievement Unlocked!</h2>
        <h3 className="text-lg font-medium text-amber-600 mb-3">{achievement.title}</h3>
        <p className="text-gray-600 mb-4">{achievement.description}</p>

        <div className="flex items-center justify-center gap-2 text-amber-600 mb-6">
          <Zap className="w-5 h-5" />
          <span className="font-bold text-lg">+{achievement.xpReward} XP</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'amber' | 'emerald' | 'purple';
}

const colorGradients = {
  blue: 'from-blue-500 to-indigo-600',
  amber: 'from-amber-500 to-orange-600',
  emerald: 'from-emerald-500 to-teal-600',
  purple: 'from-purple-500 to-indigo-600'
};

export function XPProgressBar({ current, total, label, showPercentage = true, color = 'blue' }: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-gray-600">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-gray-800">{percentage}%</span>
          )}
        </div>
      )}
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${colorGradients[color]} rounded-full transition-all duration-700 ease-out relative`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 shimmer" />
        </div>
      </div>
    </div>
  );
}

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeDisplay({ badge, size = 'md' }: BadgeDisplayProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const isComplete = badge.progress >= badge.total;

  return (
    <div className="relative group">
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-all ${
          isComplete
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg'
            : 'bg-gray-200 opacity-50'
        }`}
      >
        <span className={`${iconSizes[size]} ${isComplete ? 'text-white' : 'text-gray-400'}`}>
          {badge.icon}
        </span>
      </div>

      {!isComplete && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 border-2 border-white">
          {badge.progress}/{badge.total}
        </div>
      )}

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {badge.name}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}

interface LevelIndicatorProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export function LevelIndicator({ level, xp, xpToNextLevel }: LevelIndicatorProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Crown className="w-6 h-6 text-yellow-300" />
        </div>
        <div>
          <p className="text-white/70 text-xs">Current Level</p>
          <p className="text-2xl font-bold">Level {level}</p>
        </div>
      </div>

      <XPProgressBar
        current={xp}
        total={xpToNextLevel}
        label="Progress to next level"
        color="purple"
      />
    </div>
  );
}

interface DailyStreakProps {
  streak: number;
  isActive: boolean;
}

export function DailyStreak({ streak, isActive }: DailyStreakProps) {
  return (
    <div className={`rounded-xl p-4 ${isActive ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-gray-100'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gray-200'}`}>
          <Flame className={`w-5 h-5 ${isActive ? 'text-yellow-300' : 'text-gray-400'}`} />
        </div>
        <div>
          <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>Daily Streak</p>
          <p className={`text-xl font-bold ${isActive ? 'text-white' : 'text-gray-700'}`}>{streak} days</p>
        </div>
      </div>
    </div>
  );
}

interface LearningPathCardProps {
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: string;
  onClick: () => void;
  isLocked?: boolean;
}

export function LearningPathCard({
  title,
  description,
  progress,
  totalLessons,
  completedLessons,
  icon,
  onClick,
  isLocked = false
}: LearningPathCardProps) {
  return (
    <div
      onClick={isLocked ? undefined : onClick}
      className={`relative bg-white rounded-2xl p-5 shadow-lg border border-gray-100 transition-all ${
        isLocked
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:shadow-xl hover:border-blue-200 cursor-pointer'
      }`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="text-gray-400 text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🔒</span>
            </div>
            <p className="font-medium">Complete previous chapter</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{description}</p>

          <div className="flex items-center gap-3">
            <XPProgressBar
              current={completedLessons}
              total={totalLessons}
              color="emerald"
              showPercentage={false}
            />
            <span className="text-sm font-medium text-gray-600 flex-shrink-0">
              {completedLessons}/{totalLessons}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
