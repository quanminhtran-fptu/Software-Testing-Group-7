import { Chapter } from '../types/course';

interface CourseContentPageProps {
  chapters: Chapter[];
  completedLessons: Set<string>;
  onSelectLesson: (chapterId: number, lessonId: number) => void;
}

export function CourseContentPage({
  chapters,
  completedLessons,
  onSelectLesson,
}: CourseContentPageProps) {
  return (
    <main className="pt-24 px-6 pb-10 bg-sky-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[32px] border border-sky-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-sky-100">
            <h1 className="text-3xl font-extrabold text-sky-900">
              Course Content
            </h1>
            <p className="text-sky-600 mt-2">
              Choose a lesson to start learning CI/CD & Reporting.
            </p>
          </div>

          <div className="p-8 space-y-7">
            {chapters.map((chapter, chapterIndex) => (
              <div
                key={chapter.id}
                className="border border-sky-100 rounded-3xl p-6"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-extrabold text-xl">
                    {chapterIndex + 1}
                  </div>

                  <div>
                    <h2 className="text-2xl font-extrabold text-sky-900">
                      {chapter.title}
                    </h2>
                    <p className="text-sky-500">
                      {chapter.lessons.length} lessons
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {chapter.lessons.map((lesson, lessonIndex) => {
                    const lessonKey = `${chapter.id}-${lesson.id}`;
                    const isCompleted = completedLessons.has(lessonKey);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(chapter.id, lesson.id)}
                        className="w-full rounded-2xl border border-sky-100 hover:border-sky-300 hover:bg-sky-50 px-5 py-4 text-left transition"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                              {lessonIndex + 1}
                            </div>

                            <div>
                              <div className="font-bold text-sky-900">
                                {lesson.title}
                              </div>
                              <div className="text-sm text-sky-500">
                                {lesson.xpReward} XP
                              </div>
                            </div>
                          </div>

                          <div
                            className={`text-sm font-bold ${
                              isCompleted ? 'text-green-600' : 'text-sky-500'
                            }`}
                          >
                            {isCompleted ? 'Completed' : 'Start'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}