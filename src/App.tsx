import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProgressHeader, Sidebar } from './components/ProgressHeader';
import { HomeScreen } from './components/HomeScreen';
import { LessonView } from './components/LessonView';
import { MascotAvatar } from './components/Mascot';
import { istqbCourse } from './data/istqb-course';
import { MascotMessage } from './types/course';
import { Sparkles } from 'lucide-react';
import { pageTransition } from './styles';

type View = 'home' | 'lesson';

interface LessonState {
  chapterId: number;
  lessonId: number;
}

export default function App() {
  const [view, setView] = useState<View>('home');
  const [currentLesson, setCurrentLesson] = useState<LessonState | null>(null);
  const [userXp, setUserXp] = useState(0);
  const [userStreak, setUserStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeMessage] = useState<MascotMessage>({
    type: 'welcome',
    text: 'Welcome to ISTQB Mastery! Learn software testing fundamentals through interactive lessons and quizzes. Click on any chapter to get started!'
  });

  useEffect(() => {
    const savedXp = localStorage.getItem('istqb_xp');
    const savedStreak = localStorage.getItem('istqb_streak');
    const savedCompleted = localStorage.getItem('istqb_completed');
    const savedLastVisit = localStorage.getItem('istqb_last_visit');

    if (savedXp) setUserXp(parseInt(savedXp, 10));
    if (savedStreak) setUserStreak(parseInt(savedStreak, 10));
    if (savedCompleted) setCompletedLessons(new Set(JSON.parse(savedCompleted)));

    const today = new Date().toDateString();
    if (savedLastVisit) {
      const lastVisit = new Date(savedLastVisit);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisit.toDateString() === today) {
        // Same day, keep streak
      } else if (lastVisit.toDateString() === yesterday.toDateString()) {
        // Consecutive day, increment streak
        const newStreak = (savedStreak ? parseInt(savedStreak, 10) : 0) + 1;
        setUserStreak(newStreak);
        localStorage.setItem('istqb_streak', newStreak.toString());
      } else {
        // Streak broken
        setUserStreak(1);
        localStorage.setItem('istqb_streak', '1');
      }
    } else {
      setUserStreak(1);
      localStorage.setItem('istqb_streak', '1');
    }

    localStorage.setItem('istqb_last_visit', today);
  }, []);

  const saveProgress = useCallback((xp: number, completed: Set<string>) => {
    localStorage.setItem('istqb_xp', xp.toString());
    localStorage.setItem('istqb_completed', JSON.stringify([...completed]));
  }, []);

  const handleStartLesson = useCallback((chapterId: number, lessonId: number) => {
    setCurrentLesson({ chapterId, lessonId });
    setView('lesson');
    setSidebarOpen(false);
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('home');
    setCurrentLesson(null);
  }, []);

  const handleLessonComplete = useCallback((xpEarned: number) => {
    const lessonKey = `${currentLesson?.chapterId ?? 0}-${currentLesson?.lessonId ?? 0}`;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonKey);
    setCompletedLessons(newCompleted);

    const newXp = userXp + xpEarned;
    setUserXp(newXp);
    saveProgress(newXp, newCompleted);
  }, [currentLesson, completedLessons, userXp, saveProgress]);

  const getNextLesson = useCallback((): LessonState | null => {
    if (!currentLesson) return null;

    const chapter = istqbCourse.find((c) => c.id === currentLesson.chapterId);
    if (!chapter) return null;

    const lessonIndex = chapter.lessons.findIndex((l) => l.id === currentLesson.lessonId);
    if (lessonIndex < chapter.lessons.length - 1) {
      return { chapterId: chapter.id, lessonId: chapter.lessons[lessonIndex + 1].id };
    }

    const chapterIndex = istqbCourse.findIndex((c) => c.id === chapter.id);
    if (chapterIndex < istqbCourse.length - 1) {
      const nextChapter = istqbCourse[chapterIndex + 1];
      return { chapterId: nextChapter.id, lessonId: nextChapter.lessons[0].id };
    }

    return null;
  }, [currentLesson]);

  const getPreviousLesson = useCallback((): LessonState | null => {
    if (!currentLesson) return null;

    const chapter = istqbCourse.find((c) => c.id === currentLesson.chapterId);
    if (!chapter) return null;

    const lessonIndex = chapter.lessons.findIndex((l) => l.id === currentLesson.lessonId);
    if (lessonIndex > 0) {
      return { chapterId: chapter.id, lessonId: chapter.lessons[lessonIndex - 1].id };
    }

    const chapterIndex = istqbCourse.findIndex((c) => c.id === chapter.id);
    if (chapterIndex > 0) {
      const prevChapter = istqbCourse[chapterIndex - 1];
      return {
        chapterId: prevChapter.id,
        lessonId: prevChapter.lessons[prevChapter.lessons.length - 1].id
      };
    }

    return null;
  }, [currentLesson]);

  const handleNext = useCallback(() => {
    const next = getNextLesson();
    if (next) {
      setCurrentLesson(next);
    }
  }, [getNextLesson]);

  const handlePrevious = useCallback(() => {
    const prev = getPreviousLesson();
    if (prev) {
      setCurrentLesson(prev);
    }
  }, [getPreviousLesson]);

  const currentChapterData = currentLesson
    ? istqbCourse.find((c) => c.id === currentLesson.chapterId)
    : null;
  const currentLessonData = currentChapterData
    ? currentChapterData.lessons.find((l) => l.id === currentLesson?.lessonId)
    : null;

  const findFirstIncompleteLesson = (): LessonState | null => {
    for (const chapter of istqbCourse) {
      for (const lesson of chapter.lessons) {
        if (!completedLessons.has(`${chapter.id}-${lesson.id}`)) {
          return { chapterId: chapter.id, lessonId: lesson.id };
        }
      }
    }
    return { chapterId: 1, lessonId: 1 };
  };

  return (
    <div className="min-h-screen bg-white">
      <ProgressHeader
        xp={userXp}
        streak={userStreak}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar
        chapters={istqbCourse}
        currentChapter={currentLesson?.chapterId || null}
        currentLesson={currentLesson?.lessonId || null}
        onSelectLesson={handleStartLesson}
        completedLessons={completedLessons}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-80">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <HomeScreen
                chapters={istqbCourse}
                userXp={userXp}
                userStreak={userStreak}
                completedLessons={completedLessons}
                onStartLesson={handleStartLesson}
                continueLesson={findFirstIncompleteLesson()}
              />

              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="fixed bottom-6 right-6 max-w-sm z-30"
                >
                  <div className="bg-white rounded-3xl shadow-large border border-navy-100 p-6">
                    <div className="flex items-start gap-4">
                      <MascotAvatar size="lg" animate />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-primary-500" />
                          <h4 className="font-bold text-navy-900">Welcome!</h4>
                        </div>
                        <p className="text-sm text-navy-500 mb-4">{welcomeMessage.text}</p>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowWelcome(false)}
                          className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium text-sm shadow-glow"
                        >
                          Let's Get Started
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === 'lesson' && currentChapterData && currentLessonData && (
            <motion.div
              key={`lesson-${currentLesson?.chapterId}-${currentLesson?.lessonId}`}
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <LessonView
                chapter={currentChapterData}
                lesson={currentLessonData}
                onBack={handleBackToHome}
                onComplete={handleLessonComplete}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={getNextLesson() !== null}
                hasPrevious={getPreviousLesson() !== null}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
