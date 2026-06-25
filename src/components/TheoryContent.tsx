import { useState } from 'react';
import { Info, AlertTriangle, Lightbulb, BookOpen, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { ContentSection, InteractiveContent } from '../types/course';
import { RealWorldStory, FurtherReadingSection } from './RealWorldComponents';

interface TheorySectionProps {
  sections: ContentSection[];
  realWorldExample?: {
    title: string;
    scenario: string;
    story: string[];
    lessons: string[];
    simulation?: any[];
  };
  furtherReading?: {
    title: string;
    description: string;
    type: 'book' | 'article' | 'video' | 'practice';
    url?: string;
  }[];
}

const highlightStyles = {
  info: {
    bg: 'bg-sky-50 border-sky-200',
    icon: Info,
    iconColor: 'text-sky-500',
    textColor: 'text-sky-700'
  },
  warning: {
    bg: 'bg-amber-50 border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    textColor: 'text-amber-700'
  },
  tip: {
    bg: 'bg-emerald-50 border-emerald-200',
    icon: Lightbulb,
    iconColor: 'text-emerald-500',
    textColor: 'text-emerald-700'
  },
  definition: {
    bg: 'bg-indigo-50 border-indigo-200',
    icon: BookOpen,
    iconColor: 'text-indigo-500',
    textColor: 'text-indigo-700'
  }
};

function InteractiveDropdown({ content, onComplete }: { content: InteractiveContent; onComplete?: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    if (!answered) {
      setAnswered(true);
      onComplete?.();
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
          <Star className="w-4 h-4 text-white" />
        </div>
        <p className="text-gray-800 font-medium">{content.label}</p>
      </div>

      {!selected ? (
        <div className="relative space-y-2">
          {content.options?.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full p-4 text-left bg-white rounded-xl border border-purple-200 hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md transition-all group animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-purple-300 group-hover:border-purple-500 flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold text-purple-400 group-hover:text-purple-600">{idx + 1}</span>
                </div>
                <span className="text-gray-700">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="font-medium text-gray-800">
              {content.options?.find((o) => o.value === selected)?.label}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {content.options?.find((o) => o.value === selected)?.explanation}
          </p>
        </div>
      )}

      {selected && (
        <button
          onClick={() => { setSelected(null); }}
          className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Try another answer
        </button>
      )}
    </div>
  );
}

export function TheorySection({ sections, realWorldExample, furtherReading }: TheorySectionProps) {
  let sectionIndex = 0;

  return (
    <div className="space-y-8">
      {sections.map((section, idx) => {
        sectionIndex++;
        const delay = sectionIndex * 100;

        return (
          <div key={idx} className="animate-fadeIn" style={{ animationDelay: `${delay}ms` }}>
            {section.heading && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{section.heading}</h3>
              </div>
            )}

            {section.paragraphs?.map((para, pIdx) => (
              <p key={pIdx} className="text-gray-600 leading-relaxed mb-4 text-base">
                {para}
              </p>
            ))}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-4">
                {section.bulletPoints.map((point, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                    <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.highlight && (() => {
              const style = highlightStyles[section.highlight.type];
              const IconComponent = style.icon;
              return (
                <div className={`${style.bg} border-2 rounded-2xl p-5 mb-4 relative overflow-hidden shadow-sm`}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="flex items-start gap-4 relative">
                    <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
                    </div>
                    <p className={`${style.textColor} font-medium leading-relaxed text-base`}>
                      {section.highlight.text}
                    </p>
                  </div>
                </div>
              );
            })()}

            {section.interactiveExample && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-purple-600 font-medium">
                  <Sparkles className="w-4 h-4" />
                  Quick Challenge
                </div>
                <InteractiveDropdown content={section.interactiveExample.content} />
              </div>
            )}
          </div>
        );
      })}

      {realWorldExample && (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-2 animate-fadeIn border border-slate-200">
          <RealWorldStory example={realWorldExample} />
        </div>
      )}

      {furtherReading && furtherReading.length > 0 && (
        <div className="animate-fadeIn">
          <FurtherReadingSection readings={furtherReading} />
        </div>
      )}
    </div>
  );
}
