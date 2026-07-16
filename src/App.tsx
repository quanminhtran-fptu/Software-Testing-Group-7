import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProgressHeader } from './components/ProgressHeader';
import { HomeScreen } from './components/HomeScreen';
import { LessonView } from './components/LessonView';
import { CourseContentPage } from './components/CourseContentPage';
import { ChapterOverviewPage } from './components/ChapterOverviewPage';
import { istqbCourse } from './data/istqb-course';
import { pageTransition } from './styles';

type View = 'home' | 'lesson' | 'courses' | 'chapterOverview';

interface LessonState {
  chapterId: number;
  lessonId: number;
}

interface ViewState {
  view: View;
  currentLesson: LessonState | null;
  currentChapterId: number | null;
}

export default function App() {
  const [view, setView] = useState<View>('home');
  const [viewHistory, setViewHistory] = useState<ViewState[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonState | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);
  const [userXp, setUserXp] = useState(0);
  const [userStreak, setUserStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

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
        // same day
      } else if (lastVisit.toDateString() === yesterday.toDateString()) {
        const newStreak = (savedStreak ? parseInt(savedStreak, 10) : 0) + 1;
        setUserStreak(newStreak);
        localStorage.setItem('istqb_streak', newStreak.toString());
      } else {
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

  const navigateTo = useCallback((newView: View, newLesson: LessonState | null = null, newChapterId: number | null = null) => {
    setViewHistory(prev => [...prev, { view, currentLesson, currentChapterId }]);
    setView(newView);
    setCurrentLesson(newLesson);
    setCurrentChapterId(newChapterId);
  }, [view, currentLesson, currentChapterId]);

  const handleStartLesson = useCallback((chapterId: number, lessonId: number) => {
    navigateTo('lesson', { chapterId, lessonId }, currentChapterId);
  }, [navigateTo, currentChapterId]);

  const handleOpenChapter = useCallback((chapterId: number) => {
    navigateTo('chapterOverview', currentLesson, chapterId);
  }, [navigateTo, currentLesson]);

  const handleBackToHome = useCallback(() => {
    navigateTo('home', null, null);
  }, [navigateTo]);

  const handleOpenCourses = useCallback(() => {
    navigateTo('courses', currentLesson, currentChapterId);
  }, [navigateTo, currentLesson, currentChapterId]);

  const handleGoBack = useCallback(() => {
    setViewHistory(prev => {
      const newHistory = [...prev];
      const prevState = newHistory.pop();
      if (prevState) {
        setView(prevState.view);
        setCurrentLesson(prevState.currentLesson);
        setCurrentChapterId(prevState.currentChapterId);
      } else {
        setView('home');
        setCurrentLesson(null);
        setCurrentChapterId(null);
      }
      return newHistory;
    });
  }, []);

  const handleLessonComplete = useCallback(
    (xpEarned: number) => {
      const lessonKey = `${currentLesson?.chapterId ?? 0}-${currentLesson?.lessonId ?? 0}`;
      const newCompleted = new Set(completedLessons);
      newCompleted.add(lessonKey);
      setCompletedLessons(newCompleted);

      const newXp = userXp + xpEarned;
      setUserXp(newXp);
      saveProgress(newXp, newCompleted);
    },
    [currentLesson, completedLessons, userXp, saveProgress]
  );

  const getNextLesson = useCallback((): LessonState | null => {
    if (!currentLesson) return null;

    const chapter = istqbCourse.find((c) => c.id === currentLesson.chapterId);
    if (!chapter) return null;

    const lessonIndex = chapter.lessons.findIndex((l) => l.id === currentLesson.lessonId);

    if (lessonIndex < chapter.lessons.length - 1) {
      return {
        chapterId: chapter.id,
        lessonId: chapter.lessons[lessonIndex + 1].id,
      };
    }

    const chapterIndex = istqbCourse.findIndex((c) => c.id === chapter.id);

    if (chapterIndex < istqbCourse.length - 1) {
      const nextChapter = istqbCourse[chapterIndex + 1];
      return {
        chapterId: nextChapter.id,
        lessonId: nextChapter.lessons[0].id,
      };
    }

    return null;
  }, [currentLesson]);

  const getPreviousLesson = useCallback((): LessonState | null => {
    if (!currentLesson) return null;

    const chapter = istqbCourse.find((c) => c.id === currentLesson.chapterId);
    if (!chapter) return null;

    const lessonIndex = chapter.lessons.findIndex((l) => l.id === currentLesson.lessonId);

    if (lessonIndex > 0) {
      return {
        chapterId: chapter.id,
        lessonId: chapter.lessons[lessonIndex - 1].id,
      };
    }

    const chapterIndex = istqbCourse.findIndex((c) => c.id === chapter.id);

    if (chapterIndex > 0) {
      const prevChapter = istqbCourse[chapterIndex - 1];
      return {
        chapterId: prevChapter.id,
        lessonId: prevChapter.lessons[prevChapter.lessons.length - 1].id,
      };
    }

    return null;
  }, [currentLesson]);

  const isLessonUnlocked = useCallback((chapterId: number, lessonId: number) => {
    const chapterIdx = istqbCourse.findIndex((c) => c.id === chapterId);
    if (chapterIdx === -1) return false;

    const chapter = istqbCourse[chapterIdx];
    const lessonIdx = chapter.lessons.findIndex((l) => l.id === lessonId);
    if (lessonIdx === -1) return false;

    if (chapterIdx === 0 && lessonIdx === 0) return true;

    if (lessonIdx > 0) {
      const prevLessonId = chapter.lessons[lessonIdx - 1].id;
      return completedLessons.has(`${chapterId}-${prevLessonId}`);
    }

    const prevChapter = istqbCourse[chapterIdx - 1];
    const prevLessonId = prevChapter.lessons[prevChapter.lessons.length - 1].id;
    return completedLessons.has(`${prevChapter.id}-${prevLessonId}`);
  }, [completedLessons]);

  const handleNext = useCallback(() => {
    const next = getNextLesson();
    if (next) navigateTo('lesson', next, currentChapterId);
  }, [getNextLesson, navigateTo, currentChapterId]);

  const handlePrevious = useCallback(() => {
    const prev = getPreviousLesson();
    if (prev) navigateTo('lesson', prev, currentChapterId);
  }, [getPreviousLesson, navigateTo, currentChapterId]);

  const currentChapterData = currentLesson
    ? istqbCourse.find((c) => c.id === currentLesson.chapterId)
    : null;

  const currentLessonData = currentChapterData
    ? currentChapterData.lessons.find((l) => l.id === currentLesson?.lessonId)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 mesh-bg relative z-0 overflow-hidden font-sans text-navy-900 transition-colors duration-500">
      {/* Ambient background particles */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-ring" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-success-400/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

      <ProgressHeader
        xp={userXp}
        streak={userStreak}
        onMenuClick={handleOpenCourses}
        onHomeClick={handleBackToHome}
        onCourseClick={handleOpenCourses}
        canGoBack={viewHistory.length > 0}
        onBackClick={handleGoBack}
      />

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
              onOpenChapter={handleOpenChapter}
              isLessonUnlocked={isLessonUnlocked}
            />
          </motion.div>
        )}

        {view === 'chapterOverview' && currentChapterId !== null && (() => {
          const chapter = istqbCourse.find((c) => c.id === currentChapterId);
          const chapterIdx = istqbCourse.findIndex((c) => c.id === currentChapterId);
          if (!chapter) return null;
          return (
            <motion.div
              key={`chapter-${currentChapterId}`}
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ChapterOverviewPage
                chapter={chapter}
                chapterIndex={chapterIdx}
                completedLessons={completedLessons}
                onStartLesson={handleStartLesson}
                onBack={handleGoBack}
                isLessonUnlocked={isLessonUnlocked}
              />
            </motion.div>
          );
        })()}

        {view === 'courses' && (
          <motion.div
            key="courses"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CourseContentPage
              chapters={istqbCourse}
              completedLessons={completedLessons}
              onSelectLesson={handleStartLesson}
              isLessonUnlocked={isLessonUnlocked}
            />
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
              onBack={handleGoBack}
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
  );
}