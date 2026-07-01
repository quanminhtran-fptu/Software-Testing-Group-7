import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, HelpCircle, ChevronLeft, Zap, CheckCircle2 } from 'lucide-react';
import { Chapter } from '../types/course';

interface ChapterOverviewPageProps {
  chapter: Chapter;
  completedLessons: Set<string>;
  onStartLesson: (chapterId: number, lessonId: number) => void;
  onBack: () => void;
  chapterIndex: number;
}

export function ChapterOverviewPage({
  chapter,
  completedLessons,
  onStartLesson,
  onBack,
  chapterIndex,
}: ChapterOverviewPageProps) {
  const totalXp = chapter.lessons.reduce((sum, l) => sum + l.xpReward, 0);
  const doneCount = chapter.lessons.filter((l) =>
    completedLessons.has(`${chapter.id}-${l.id}`)
  ).length;

  const firstIncomplete = chapter.lessons.find(
    (l) => !completedLessons.has(`${chapter.id}-${l.id}`)
  ) ?? chapter.lessons[0];

  const learningGoals: Record<number, string[]> = {
    1: [
      'Explain what CI and CD mean and how they differ.',
      'Describe the automated steps triggered by a pull request.',
      'Identify the benefits and drawbacks of CI/CD in a team.',
    ],
    2: [
      'Describe how stages and jobs form a pipeline.',
      'Configure a basic .gitlab-ci.yml pipeline file.',
      'Understand what runners do and how variables work.',
    ],
    3: [
      'Compare build configuration across CI/CD platforms.',
      'Define job dependencies using workflow requires.',
      'Migrate a Buildkite pipeline to CircleCI step by step.',
    ],
    4: [
      'Explain how Bitrise automates mobile builds and tests.',
      'Use Build Cache to speed up pipeline execution.',
      'Read CI/CD reports and act on failures to improve quality.',
    ],
  };
  const goals = learningGoals[chapter.id] ?? [];

  return (
    <main className="pt-20 min-h-screen bg-sky-50">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sky-700 font-semibold hover:text-sky-900 transition-colors px-4 py-2 rounded-2xl hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
          Home
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 xl:grid-cols-[480px_1fr] gap-8 items-start">
        {/* ── LEFT PANEL ── */}
        <div className="space-y-4">
          {/* Module card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-[28px] border border-sky-100 shadow-sm p-7"
          >
            {/* Number badge */}
            <div className="w-20 h-20 rounded-[20px] bg-sky-500 text-white flex items-center justify-center text-5xl font-extrabold shadow-md mb-5">
              {chapterIndex + 1}
            </div>

            <p className="text-xs font-bold tracking-widest text-sky-400 uppercase mb-1">
              Module {chapterIndex + 1}
            </p>
            <h1 className="text-3xl font-extrabold text-sky-900 mb-1">
              {chapter.title}
            </h1>
            <p className="text-sky-500 font-medium mb-5">{chapter.description}</p>

            {/* Learning goals */}
            {goals.length > 0 && (
              <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 mb-5">
                <p className="text-xs font-bold tracking-widest text-sky-400 uppercase mb-3">
                  You'll be able to
                </p>
                <ul className="space-y-2">
                  {goals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-3 text-sky-800 text-sm font-medium">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-sky-200 text-sky-700 flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats row */}
            <div className="flex items-center gap-8 text-sky-900">
              <div>
                <p className="text-2xl font-extrabold">{chapter.lessons.length}</p>
                <p className="text-xs font-bold text-sky-400 uppercase tracking-wide">lessons</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">{totalXp}</p>
                <p className="text-xs font-bold text-sky-400 uppercase tracking-wide">XP</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">
                  {doneCount}/{chapter.lessons.length}
                </p>
                <p className="text-xs font-bold text-sky-400 uppercase tracking-wide">done</p>
              </div>
            </div>
          </motion.div>

          {/* Begin card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="bg-white rounded-[28px] border border-sky-100 shadow-sm p-7"
          >
            <p className="text-xs font-bold tracking-widest text-sky-400 uppercase mb-1">
              {doneCount === 0 ? 'Begin' : doneCount >= chapter.lessons.length ? 'Completed' : 'Continue'}
            </p>
            <h2 className="text-2xl font-extrabold text-sky-900 mb-5">
              {firstIncomplete.title}
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onStartLesson(chapter.id, firstIncomplete.id)}
              className="w-full rounded-[18px] bg-sky-500 hover:bg-sky-400 text-white text-xl font-extrabold py-4 shadow-md transition-all flex items-center justify-center gap-3"
            >
              Start
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* ── RIGHT PANEL: Lesson trail ── */}
        <div className="flex flex-col items-center pt-2">
          {chapter.lessons.map((lesson, idx) => {
            const isCompleted = completedLessons.has(`${chapter.id}-${lesson.id}`);
            const isQuiz = lesson.type === 'quiz';
            const isFirst = idx === 0;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * idx }}
                className="flex flex-col items-center w-full max-w-xs"
              >
                {/* Top connector line (not for first item) */}
                {!isFirst && (
                  <div className="w-0.5 h-10 bg-sky-200" />
                )}

                {/* Node */}
                <button
                  onClick={() => onStartLesson(chapter.id, lesson.id)}
                  className="group relative flex flex-col items-center w-full"
                >
                  {/* Icon bubble */}
                  <div className="relative mb-2">
                    {/* Outer ring for active/first */}
                    {isFirst && !isCompleted && (
                      <motion.div
                        animate={{ scale: [1, 1.18, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-sky-300 opacity-40 -m-2"
                      />
                    )}

                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all group-hover:scale-110 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isFirst
                          ? 'bg-sky-500 text-white'
                          : isQuiz
                          ? 'bg-sky-200 text-sky-700'
                          : 'bg-sky-100 text-sky-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7" />
                      ) : isQuiz ? (
                        <HelpCircle className="w-7 h-7" />
                      ) : (
                        <BookOpen className="w-7 h-7" />
                      )}
                    </div>
                  </div>

                  {/* Lesson label */}
                  <span
                    className={`text-sm font-bold text-center leading-snug ${
                      isCompleted
                        ? 'text-green-600'
                        : isFirst
                        ? 'text-sky-700'
                        : 'text-sky-400'
                    }`}
                  >
                    {lesson.title}
                  </span>

                  {/* XP badge */}
                  <span className="mt-1 flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Zap className="w-3 h-3" />
                    {lesson.xpReward} XP
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
