import { motion } from 'framer-motion';
import { Clock, BookOpen, HelpCircle, Trophy, ChevronRight } from 'lucide-react';
import { FloatingObject } from './FloatingObjects';
import { staggerContainer, staggerItem, floatLoop } from './animations';
import type { Chapter, Lesson } from '../types/course';

interface LessonIntroProps {
  chapter: Chapter;
  lesson: Lesson;
  onStart: () => void;
  estimatedMinutes?: number;
}

// Premium lesson introduction page with staggered entrance animations
export function LessonIntro({ chapter, lesson, onStart, estimatedMinutes = 10 }: LessonIntroProps) {
  const isQuiz = lesson.type === 'quiz';
  const objectColor = isQuiz ? '#8B5CF6' : '#2D7FF9';
  const objectType = isQuiz ? 'octahedron' : 'sphere';

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-2xl w-full text-center">
        {/* 3D floating object */}
        <motion.div variants={staggerItem} className="relative w-48 h-48 mx-auto mb-8">
          <motion.div variants={floatLoop} animate="animate" className="w-full h-full">
            <FloatingObject type={objectType} color={objectColor} />
          </motion.div>
          {/* Glow behind object */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-30"
            style={{ background: `radial-gradient(circle, ${objectColor}, transparent 70%)` }}
          />
        </motion.div>

        {/* Chapter label */}
        <motion.div variants={staggerItem} className="flex items-center justify-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${objectColor}20` }}
          >
            {isQuiz ? (
              <HelpCircle className="w-4 h-4" style={{ color: objectColor }} />
            ) : (
              <BookOpen className="w-4 h-4" style={{ color: objectColor }} />
            )}
          </div>
          <span className="text-sm font-medium text-navy-500">{chapter.title}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={staggerItem}
          className="text-3xl md:text-4xl font-bold text-navy-900 mb-3 text-balance"
        >
          {lesson.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={staggerItem} className="text-lg text-navy-500 mb-8 max-w-md mx-auto">
          {isQuiz
            ? `Test your knowledge with ${lesson.content.questions?.length || 0} interactive questions`
            : 'Explore the fundamentals through interactive examples and real-world stories'}
        </motion.p>

        {/* Meta info */}
        <motion.div variants={staggerItem} className="flex items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-navy-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{estimatedMinutes} min</span>
          </div>
          <div className="w-px h-4 bg-navy-200" />
          <div className="flex items-center gap-2 text-navy-500">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">{lesson.xpReward} XP</span>
          </div>
          <div className="w-px h-4 bg-navy-200" />
          <div className="flex items-center gap-2 text-navy-500">
            {isQuiz ? <HelpCircle className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
            <span className="text-sm font-medium">{isQuiz ? 'Quiz' : 'Theory'}</span>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div variants={staggerItem}>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-large"
            style={{ boxShadow: '0 12px 32px rgba(45, 127, 249, 0.3)' }}
          >
            Start Lesson
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
