import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProgressHeader } from './components/ProgressHeader';
import { HomeScreen } from './components/HomeScreen';
import { LessonView } from './components/LessonView';
import { CourseContentPage } from './components/CourseContentPage';
import { istqbCourse } from './data/istqb-course';
import { pageTransition } from './styles';

type View = 'home' | 'lesson' | 'courses';

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

  const handleStartLesson = useCallback((chapterId: number, lessonId: number) => {
    setCurrentLesson({ chapterId, lessonId });
    setView('lesson');
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('home');
    setCurrentLesson(null);
  }, []);

  const handleOpenCourses = useCallback(() => {
    setView('courses');
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

  const handleNext = useCallback(() => {
    const next = getNextLesson();
    if (next) setCurrentLesson(next);
  }, [getNextLesson]);

  const handlePrevious = useCallback(() => {
    const prev = getPreviousLesson();
    if (prev) setCurrentLesson(prev);
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
        onMenuClick={handleOpenCourses}
        onHomeClick={handleBackToHome}
        onCourseClick={handleOpenCourses}
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
              onStartLesson={handleStartLesson}
              continueLesson={findFirstIncompleteLesson()}
            />
          </motion.div>
        )}

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
  );
}