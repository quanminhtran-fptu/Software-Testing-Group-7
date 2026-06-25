import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, HelpCircle, Trophy, Gem, Sparkles, X } from 'lucide-react';
import { Chapter, Lesson, MascotMessage } from '../types/course';
import { TheorySection } from './TheoryContent';
import { QuestionCard } from './QuizComponents';
import { Mascot } from './Mascot';
import {
  StickyProgressBar,
  LessonIntro,
  ToastContainer,
  useToasts,
  FloatingXpRewards,
  LessonCelebration,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from '../styles';

interface LessonViewProps {
  chapter: Chapter;
  lesson: Lesson;
  onBack: () => void;
  onComplete: (xpEarned: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function LessonView({
  chapter,
  lesson,
  onBack,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: LessonViewProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [quizProgress, setQuizProgress] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showMascot, setShowMascot] = useState(false);
  const [mascotMessage, setMascotMessage] = useState<MascotMessage | null>(null);
  const [quizResultShown, setQuizResultShown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [xpRewards, setXpRewards] = useState<{ id: number; amount: number }[]>([]);
  const hasCompletedQuiz = useRef(false);

  const { toasts, addToast, removeToast } = useToasts();

  // Reset state when lesson changes
  useEffect(() => {
    setShowIntro(true);
    setQuizProgress(0);
    setCorrectAnswers(0);
    setQuizResultShown(false);
    setShowCelebration(false);
    setXpRewards([]);
    hasCompletedQuiz.current = false;
  }, [lesson.id]);

  const addXpReward = useCallback((amount: number) => {
    const id = Date.now() + Math.random();
    setXpRewards((prev) => [...prev, { id, amount }]);
  }, []);

  const removeXpReward = useCallback((id: number) => {
    setXpRewards((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    const questions = lesson.content.questions || [];
    const xpPerQuestion = Math.floor(lesson.xpReward / questions.length);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      addXpReward(xpPerQuestion);
      addToast('success', "That's right!");
      setMascotMessage({
        type: 'celebrate',
        text: `Excellent work! You earned ${xpPerQuestion} XP. Keep up the great momentum!`
      });
    } else {
      addToast('error', "That's wrong");
      setMascotMessage({
        type: 'warn',
        text: "That's not quite right, but don't worry! Learning from mistakes is part of the process. Try again!"
      });
    }
    setShowMascot(true);

    setTimeout(() => {
      setShowMascot(false);
      setTimeout(() => {
        setQuizProgress((prev) => prev + 1);
      }, 200);
    }, 1500);
  };

  // Handle quiz completion
  useEffect(() => {
    const questions = lesson.content.questions || [];
    if (
      lesson.type === 'quiz' &&
      quizProgress >= questions.length &&
      !hasCompletedQuiz.current &&
      !quizResultShown
    ) {
      hasCompletedQuiz.current = true;
      const totalQuestions = questions.length;
      const finalXp = correctAnswers * Math.floor(lesson.xpReward / totalQuestions);
      onComplete(finalXp);
      setQuizResultShown(true);
      setShowCelebration(true);
    }
  }, [quizProgress, lesson, correctAnswers, onComplete, quizResultShown]);

  // Show intro screen first
  if (showIntro) {
    return (
      <div className="pt-16">
        <LessonIntro
          chapter={chapter}
          lesson={lesson}
          onStart={() => setShowIntro(false)}
          estimatedMinutes={lesson.type === 'quiz' ? 5 : 10}
        />
      </div>
    );
  }

  // Theory lesson view
  if (lesson.type === 'theory') {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-white pt-16"
      >
        {/* XP Badge */}
        <motion.div
          variants={fadeInUp}
          className="fixed top-20 right-4 z-30 md:right-8"
        >
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold">
            <Gem className="w-4 h-4" />
            <span>{lesson.xpReward} XP</span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-navy-500 font-medium">{chapter.title}</p>
              <h1 className="text-2xl font-bold text-navy-900">{lesson.title}</h1>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-8 text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-navy-500">
              Complete this lesson to earn <span className="font-bold text-amber-600">{lesson.xpReward} XP</span>
            </span>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="bg-white rounded-3xl shadow-medium border border-navy-100 p-6 md:p-8 mb-8"
          >
            {lesson.content.sections && (
              <TheorySection
                sections={lesson.content.sections}
                realWorldExample={lesson.content.realWorldExample}
                furtherReading={lesson.furtherReading}
              />
            )}
          </motion.div>

          <motion.div variants={staggerItem} className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl text-navy-600 hover:bg-navy-100 transition-colors font-medium"
            >
              Back to Course
            </button>

            <div className="flex items-center gap-3">
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-navy-600 hover:bg-navy-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onComplete(lesson.xpReward);
                  if (hasNext) {
                    onNext();
                  } else {
                    onBack();
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-glow"
              >
                {hasNext ? (
                  <>
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Complete
                    <Trophy className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const questions = lesson.content.questions || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[quizProgress];
  const isQuizComplete = quizProgress >= totalQuestions;

  // Celebration screen
  if (isQuizComplete && quizResultShown) {
    return (
      <>
        <LessonCelebration
          show={showCelebration}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          xpEarned={correctAnswers * Math.floor(lesson.xpReward / totalQuestions)}
          onContinue={() => {
            setShowCelebration(false);
            onBack();
          }}
          hasNext={hasNext}
        />
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 flex items-center justify-center px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-large border border-navy-100 p-8 text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-br from-success-400 to-success-600 rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-navy-900 mb-2">Quiz Complete!</h2>
            <p className="text-navy-500 mb-6">Great effort on finishing this quiz.</p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-success-50 rounded-2xl p-4 border border-success-200">
                <p className="text-3xl font-bold text-success-600">{correctAnswers}</p>
                <p className="text-xs text-success-600/80 font-medium mt-1">Correct</p>
              </div>
              <div className="bg-primary-50 rounded-2xl p-4 border border-primary-200">
                <p className="text-3xl font-bold text-primary-600">
                  {Math.round((correctAnswers / totalQuestions) * 100)}%
                </p>
                <p className="text-xs text-primary-600/80 font-medium mt-1">Score</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                <p className="text-3xl font-bold text-amber-600">
                  {correctAnswers * Math.floor(lesson.xpReward / totalQuestions)}
                </p>
                <p className="text-xs text-amber-600/80 font-medium mt-1">XP Earned</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-2xl border-2 border-navy-200 text-navy-600 font-medium hover:bg-navy-50 transition-colors"
              >
                Back to Course
              </button>
              {hasNext && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNext}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-glow"
                >
                  Next Lesson
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // Loading state
  if (isQuizComplete && !quizResultShown) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-navy-500">Calculating results...</p>
        </div>
      </div>
    );
  }

  // Active quiz view
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-white pt-16">
      {/* XP Badge */}
      <div className="fixed top-20 right-4 z-30 md:right-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold"
        >
          <Gem className="w-4 h-4" />
          <span>{lesson.xpReward} XP</span>
        </motion.div>
      </div>

      {/* Sticky progress bar */}
      <StickyProgressBar current={quizProgress} total={totalQuestions} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-navy-500 font-medium">{chapter.title}</p>
              <h1 className="text-2xl font-bold text-navy-900">{lesson.title}</h1>
            </div>
            <button
              onClick={onBack}
              className="p-2 text-navy-400 hover:text-navy-600 hover:bg-navy-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={quizProgress}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-medium border border-navy-100 p-6 md:p-8"
            >
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  showHint={false}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex justify-between">
            {hasPrevious && (
              <button
                onClick={onPrevious}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-navy-600 hover:bg-white hover:shadow-md transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Floating XP rewards */}
      <FloatingXpRewards rewards={xpRewards} onRemove={removeXpReward} />

      {/* Mascot */}
      <Mascot
        message={mascotMessage || { type: 'celebrate', text: '' }}
        isVisible={showMascot}
        onClose={() => setShowMascot(false)}
      />
    </div>
  );
}
