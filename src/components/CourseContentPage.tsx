import { motion } from 'framer-motion';
import { Chapter } from '../types/course';
import { BookOpen, CheckCircle2, Lock, PlayCircle } from 'lucide-react';

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
    <main className="pt-24 px-6 pb-20 min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[40px] shadow-large border border-white/40 overflow-hidden"
        >
          {/* Header */}
          <div className="px-10 py-12 relative overflow-hidden bg-gradient-to-br from-primary-50 to-white/50 border-b border-white/60">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-glow flex items-center justify-center text-white">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-navy-900 tracking-tight">
                  Course Content
                </h1>
                <p className="text-navy-500 font-medium text-lg mt-1">
                  Choose a lesson to start learning CI/CD & Reporting.
                </p>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-10 bg-white/40">
            {chapters.map((chapter, chapterIndex) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: chapterIndex * 0.1 }}
                key={chapter.id}
                className="bg-white rounded-[32px] p-8 shadow-soft border border-navy-50 relative overflow-hidden group"
              >
                {/* Chapter background decoration */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex items-center gap-5 mb-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-400 border border-navy-100 flex items-center justify-center font-black text-2xl shadow-inner">
                    {chapterIndex + 1}
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-navy-900 tracking-tight">
                      {chapter.title}
                    </h2>
                    <p className="text-primary-600 font-bold text-sm tracking-widest uppercase mt-1">
                      {chapter.lessons.length} lessons
                    </p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {chapter.lessons.map((lesson, lessonIndex) => {
                    const lessonKey = `${chapter.id}-${lesson.id}`;
                    const isCompleted = completedLessons.has(lessonKey);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(chapter.id, lesson.id)}
                        className={`w-full rounded-2xl border-2 btn-press px-6 py-5 text-left transition-all duration-300 flex items-center justify-between gap-4 group/btn ${
                          isCompleted
                            ? 'bg-success-50/50 border-success-100 hover:border-success-300 hover:bg-success-50 hover:shadow-md'
                            : 'bg-white border-navy-100 hover:border-primary-300 hover:shadow-[0_8px_30px_rgba(45,127,249,0.12)]'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black shadow-sm transition-transform group-hover/btn:scale-110 ${
                            isCompleted 
                              ? 'bg-success-500 text-white shadow-glow-success' 
                              : 'bg-navy-50 text-navy-400 border border-navy-100 group-hover/btn:bg-primary-50 group-hover/btn:text-primary-600 group-hover/btn:border-primary-200'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : lessonIndex + 1}
                          </div>

                          <div>
                            <div className={`font-black text-lg transition-colors ${isCompleted ? 'text-navy-900' : 'text-navy-800 group-hover/btn:text-primary-700'}`}>
                              {lesson.title}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                                +{lesson.xpReward} XP
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`flex items-center gap-2 text-sm font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-colors ${
                            isCompleted 
                              ? 'text-success-600 bg-success-100/50' 
                              : 'text-primary-500 bg-primary-50 opacity-0 group-hover/btn:opacity-100 -translate-x-4 group-hover/btn:translate-x-0 transition-all duration-300'
                          }`}
                        >
                          {isCompleted ? (
                            'Completed'
                          ) : (
                            <>
                              Start <PlayCircle className="w-4 h-4" />
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}