import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, HelpCircle, Trophy, Gem, Sparkles } from 'lucide-react';
import { Chapter, Lesson, MascotMessage } from '../types/course';
import { TheorySection } from './TheoryContent';
import { QuestionCard } from './QuizComponents';
import { Mascot } from './Mascot';

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
  const [quizProgress, setQuizProgress] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showMascot, setShowMascot] = useState(false);
  const [mascotMessage, setMascotMessage] = useState<MascotMessage | null>(null);
  const [quizResultShown, setQuizResultShown] = useState(false);
  const hasCompletedQuiz = useRef(false);

  // Reset quiz state when lesson changes
  useEffect(() => {
    setQuizProgress(0);
    setCorrectAnswers(0);
    setXpEarned(0);
    setQuizResultShown(false);
    hasCompletedQuiz.current = false;
  }, [lesson.id]);

  const handleAnswer = (isCorrect: boolean) => {
    const questions = lesson.content.questions || [];
    const xpPerQuestion = Math.floor(lesson.xpReward / questions.length);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setXpEarned((prev) => prev + xpPerQuestion);
      setMascotMessage({
        type: 'celebrate',
        text: `Excellent work! You earned ${xpPerQuestion} XP. Keep up the great momentum!`
      });
    } else {
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

  const handleLessonComplete = () => {
    onComplete(lesson.xpReward);
  };

  // Handle quiz completion in useEffect to avoid state updates during render
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
    }
  }, [quizProgress, lesson, correctAnswers, onComplete, quizResultShown]);

  if (lesson.type === 'theory') {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        {/* XP Badge */}
        <div className="fixed top-20 right-4 z-30 md:right-8">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold">
            <Gem className="w-4 h-4" />
            <span>{lesson.xpReward} XP</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-20 md:py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{chapter.title}</p>
              <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-gray-500">Complete this lesson to earn <span className="font-bold text-amber-600">{lesson.xpReward} XP</span></span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            {lesson.content.sections && (
              <TheorySection
                sections={lesson.content.sections}
                realWorldExample={lesson.content.realWorldExample}
                furtherReading={lesson.furtherReading}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium"
            >
              Back to Course
            </button>

            <div className="flex items-center gap-3">
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
              <button
                onClick={() => {
                  handleLessonComplete();
                  if (hasNext) {
                    onNext();
                  } else {
                    onBack();
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const questions = lesson.content.questions || [];
  const currentQuestion = questions[quizProgress];
  const totalQuestions = questions.length;
  const isQuizComplete = quizProgress >= totalQuestions;

  if (isQuizComplete && quizResultShown) {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const finalXp = correctAnswers * Math.floor(lesson.xpReward / totalQuestions);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-500 mb-6">Great effort on finishing this quiz.</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                <p className="text-3xl font-bold text-emerald-600">{correctAnswers}</p>
                <p className="text-xs text-emerald-600/80 font-medium">Correct</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <p className="text-3xl font-bold text-blue-600">{percentage}%</p>
                <p className="text-xs text-blue-600/80 font-medium">Score</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <p className="text-3xl font-bold text-amber-600">{finalXp}</p>
                <p className="text-xs text-amber-600/80 font-medium">XP Earned</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Course
              </button>
              {hasNext && (
                <button
                  onClick={onNext}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Next Lesson
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isQuizComplete && !quizResultShown) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Calculating results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* XP Badge */}
      <div className="fixed top-20 right-4 z-30 md:right-8">
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold">
          <Gem className="w-4 h-4" />
          <span>{lesson.xpReward} XP</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 md:py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-medium">{chapter.title}</p>
            <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
              {quizProgress + 1} / {totalQuestions}
            </span>
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress bar with percentage */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-purple-600">Progress</span>
            <span className="text-sm font-bold text-purple-600">{Math.round(((quizProgress + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="h-3 bg-purple-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${((quizProgress + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              showHint={false}
            />
          )}
        </div>

        <div className="mt-4 flex justify-between">
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-white hover:shadow-md transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
          )}
        </div>
      </div>

      <Mascot
        message={mascotMessage || { type: 'celebrate', text: '' }}
        isVisible={showMascot}
        onClose={() => setShowMascot(false)}
      />
    </div>
  );
}
