import { BookOpen, Layers, Search, PenTool, ClipboardList, Wrench, ChevronRight, Star, Target, Award, Sparkles } from 'lucide-react';
import { Chapter } from '../types/course';

interface HomeScreenProps {
  chapters: Chapter[];
  userXp: number;
  userStreak: number;
  completedLessons: Set<string>;
  onStartLesson: (chapterId: number, lessonId: number) => void;
  continueLesson?: { chapterId: number; lessonId: number } | null;
}

const chapterIcons: Record<string, React.ElementType> = {
  BookOpen,
  Layers,
  Search,
  PenTool,
  ClipboardList,
  Wrench
};

const gradients = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-sky-500 to-cyan-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600'
];

export function HomeScreen({
  chapters,
  userXp,
  userStreak,
  completedLessons,
  onStartLesson,
  continueLesson
}: HomeScreenProps) {
  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-300" />
            </div>
            <span className="text-white/80 font-medium">ISTQB Foundation Level</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Master Software Testing
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            Learn the fundamentals of software testing through interactive lessons and quizzes based on the official ISTQB certification syllabus.
          </p>

          {continueLesson && (
            <button
              onClick={() => onStartLesson(continueLesson.chapterId, continueLesson.lessonId)}
              className="inline-flex items-center gap-3 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Continue Learning
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{progressPercent}%</p>
                <p className="text-sm text-gray-500">Complete</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{userXp}</p>
                <p className="text-sm text-gray-500">Total XP</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 text-orange-600 font-bold flex items-center justify-center">
                  {userStreak > 0 ? userStreak : '0'}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{userStreak}</p>
                <p className="text-sm text-gray-500">Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Chapters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const IconComponent = chapterIcons[chapter.icon] || BookOpen;
            const gradient = gradients[index % gradients.length];
            const chapterCompletedLessons = chapter.lessons.filter(
              (l) => completedLessons.has(`${chapter.id}-${l.id}`)
            ).length;
            const totalLessons = chapter.lessons.length;
            const firstIncompleteLesson = chapter.lessons.find(
              (l) => !completedLessons.has(`${chapter.id}-${l.id}`)
            );

            return (
              <div
                key={chapter.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              >
                <div className={`h-32 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
                      <IconComponent className="w-4 h-4" />
                      <span>Chapter {chapter.id}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(totalLessons)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < chapterCompletedLessons ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full" />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{chapter.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {chapterCompletedLessons}/{totalLessons} lessons
                    </span>
                    <button
                      onClick={() =>
                        onStartLesson(
                          chapter.id,
                          firstIncompleteLesson?.id || chapter.lessons[0].id
                        )
                      }
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                        firstIncompleteLesson
                          ? `bg-gradient-to-r ${gradient} text-white hover:shadow-md`
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {firstIncompleteLesson ? 'Start' : 'Review'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
