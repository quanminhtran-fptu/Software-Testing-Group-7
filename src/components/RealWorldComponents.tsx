import { useState } from 'react';
import { BookOpen, Video, FileText, Code, ExternalLink, ChevronRight, User, Briefcase, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { RealWorldExample, FurtherReading, SimulationStep } from '../types/course';

interface RealWorldStoryProps {
  example: RealWorldExample;
}

export function RealWorldStory({ example }: RealWorldStoryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-800">Real-World Story</h3>
            <p className="text-sm text-gray-500">{example.title}</p>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {expanded && (
        <div className="px-5 pb-5 animate-fadeIn">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <p className="text-gray-600 italic mb-4">{example.scenario}</p>

            <div className="space-y-4">
              {example.story.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Key Lessons</h4>
                <ul className="space-y-2">
                  {example.lessons.map((lesson, idx) => (
                    <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {example.simulation && <Simulation steps={example.simulation} />}
        </div>
      )}
    </div>
  );
}

interface SimulationProps {
  steps: SimulationStep[];
}

function Simulation({ steps }: SimulationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = steps[currentStep];

  const handleChoice = (choiceId: string, correct: boolean) => {
    setSelectedChoice(choiceId);
    setShowResult(true);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(c => c + 1);
      setSelectedChoice(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-bold text-emerald-800 text-lg mb-2">Simulation Complete!</h4>
          <p className="text-emerald-700">You scored {score} out of {steps.filter(s => s.type === 'choice').length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-indigo-800 flex items-center gap-2">
          <User className="w-5 h-5" />
          Interactive Simulation
        </h4>
        <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        {step.type === 'info' && (
          <p className="text-gray-700">{step.text}</p>
        )}

        {step.type === 'choice' && !showResult && (
          <>
            <p className="text-gray-700 mb-4">{step.text}</p>
            <div className="space-y-2">
              {step.choices?.map(choice => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.id, choice.correct)}
                  className="w-full text-left p-3 rounded-lg border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </>
        )}

        {step.type === 'choice' && showResult && step.choices && (
          <>
            <p className="text-gray-700 mb-3">{step.text}</p>
            <div className="space-y-2">
              {step.choices.map(choice => (
                <div
                  key={choice.id}
                  className={`p-3 rounded-lg border ${
                    choice.correct
                      ? 'border-emerald-400 bg-emerald-50'
                      : selectedChoice === choice.id
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {choice.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : selectedChoice === choice.id ? (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    ) : null}
                    <div>
                      <p className="font-medium text-gray-800">{choice.text}</p>
                      <p className="text-sm text-gray-600 mt-1">{choice.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step.type === 'result' && (
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700">{step.text}</p>
          </div>
        )}
      </div>

      {(step.type === 'info' || step.type === 'result' || showResult) && (
        <button
          onClick={handleNext}
          className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
        >
          {currentStep < steps.length - 1 ? 'Continue' : 'Complete Simulation'}
        </button>
      )}
    </div>
  );
}

interface FurtherReadingProps {
  readings: FurtherReading[];
}

const typeIcons = {
  book: BookOpen,
  article: FileText,
  video: Video,
  practice: Code
};

const typeColors = {
  book: 'from-blue-400 to-indigo-500',
  article: 'from-emerald-400 to-teal-500',
  video: 'from-rose-400 to-pink-500',
  practice: 'from-amber-400 to-orange-500'
};

export function FurtherReadingSection({ readings }: FurtherReadingProps) {
  return (
    <div className="mt-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Further Reading</h3>
          <p className="text-sm text-gray-500">Explore these resources to learn more</p>
        </div>
      </div>

      <div className="grid gap-3">
        {readings.map((reading, idx) => {
          const Icon = typeIcons[reading.type];
          const colorClass = typeColors[reading.type];

          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm">{reading.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{reading.description}</p>
              </div>
              {reading.url && (
                <a
                  href={reading.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
