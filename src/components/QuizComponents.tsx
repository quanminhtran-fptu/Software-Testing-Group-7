import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, Lightbulb } from 'lucide-react';
import { Question } from '../types/course';

interface QuestionComponentProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  showHint?: boolean;
}

export function MultipleChoice({ question, onAnswer, showHint }: QuestionComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHintState, setShowHintState] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setShowResult(true);
    onAnswer(selected === question.correctAnswer);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowResult(false);
    setShowHintState(false);
  };

  useEffect(() => {
    if (showHint && !showResult) {
      setShowHintState(true);
    }
  }, [showHint, showResult]);

  const isCorrect = selected === question.correctAnswer;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-lg font-medium text-gray-800">{question.question}</p>
        </div>
        {question.hint && !showResult && (
          <button
            onClick={() => setShowHintState(!showHintState)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Lightbulb className="w-5 h-5" />
          </button>
        )}
      </div>

      {showHintState && question.hint && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
          <p className="text-sky-700 text-sm">{question.hint}</p>
        </div>
      )}

      <div className="space-y-2">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && setSelected(option)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              showResult
                ? option === question.correctAnswer
                  ? 'border-emerald-500 bg-emerald-50'
                  : option === selected
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-200 bg-gray-50 opacity-50'
                : selected === option
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  showResult
                    ? option === question.correctAnswer
                      ? 'border-emerald-500 bg-emerald-500'
                      : option === selected
                      ? 'border-red-400 bg-red-400'
                      : 'border-gray-300'
                    : selected === option
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {showResult && option === question.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
                {showResult && option === selected && option !== question.correctAnswer && (
                  <XCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <span className={`font-medium ${showResult && option === question.correctAnswer ? 'text-emerald-700' : 'text-gray-700'}`}>
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
            selected
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-xl ${
              isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </p>
                <p className={`mt-1 text-sm ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>

          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="w-full py-3 px-6 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function DropdownQuestion({ question, onAnswer }: QuestionComponentProps) {
  const [selected, setSelected] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setShowResult(true);
    onAnswer(selected === question.correctAnswer);
  };

  const handleRetry = () => {
    setSelected('');
    setShowResult(false);
  };

  const isCorrect = selected === question.correctAnswer;

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-gray-800">{question.question}</p>

      <div className="relative">
        <button
          onClick={() => !showResult && setIsOpen(!isOpen)}
          disabled={showResult}
          className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
            showResult
              ? isCorrect
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-red-400 bg-red-50'
              : isOpen
              ? 'border-blue-500 bg-white shadow-lg'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <span className={selected ? 'text-gray-800' : 'text-gray-400'}>
            {selected || 'Select an answer...'}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && !showResult && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-10 overflow-hidden">
            {question.dropdownOptions?.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelected(option.label);
                  setIsOpen(false);
                }}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selected === option.label ? 'bg-blue-50' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
            selected
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-xl ${
              isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </p>
                <p className={`mt-1 text-sm ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>

          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="w-full py-3 px-6 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function TextInputQuestion({ question, onAnswer, showHint }: QuestionComponentProps) {
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHintState, setShowHintState] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setShowResult(true);
    const isCorrect = input.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase();
    onAnswer(isCorrect);
  };

  const handleRetry = () => {
    setInput('');
    setShowResult(false);
    setShowHintState(false);
  };

  const isCorrect = input.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase();

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <p className="text-lg font-medium text-gray-800 flex-1">{question.question}</p>
        {question.hint && !showResult && (
          <button
            onClick={() => setShowHintState(!showHintState)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {showHintState && question.hint && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
          <p className="text-sky-700 text-sm">{question.hint}</p>
        </div>
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !showResult && handleSubmit()}
        disabled={showResult}
        placeholder="Type your answer..."
        className={`w-full p-4 rounded-xl border-2 text-lg transition-all ${
          showResult
            ? isCorrect
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-red-400 bg-red-50'
            : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        } outline-none`}
      />

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
            input.trim()
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-xl ${
              isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Correct!' : `The answer was: ${question.correctAnswer}`}
                </p>
                <p className={`mt-1 text-sm ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>

          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="w-full py-3 px-6 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function MultiSelectQuestion({ question, onAnswer, showHint }: QuestionComponentProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showHintState, setShowHintState] = useState(false);

  const toggleOption = (option: string) => {
    if (showResult) return;
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    setShowResult(true);
    const correctAnswers = question.correctAnswer as string[];
    const isCorrect =
      selected.length === correctAnswers.length &&
      selected.every((s) => correctAnswers.includes(s));
    onAnswer(isCorrect);
  };

  const handleRetry = () => {
    setSelected([]);
    setShowResult(false);
    setShowHintState(false);
  };

  const correctAnswers = question.correctAnswer as string[];

  const isOptionCorrect = (option: string) => correctAnswers.includes(option);
  const isOptionSelected = (option: string) => selected.includes(option);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <p className="text-lg font-medium text-gray-800 flex-1">{question.question}</p>
        {question.hint && !showResult && (
          <button
            onClick={() => setShowHintState(!showHintState)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {showHintState && question.hint && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
          <p className="text-sky-700 text-sm">{question.hint}</p>
        </div>
      )}

      <p className="text-sm text-gray-500 italic">Select all that apply</p>

      <div className="space-y-2">
        {question.options?.map((option, index) => {
          const isSelected = isOptionSelected(option);
          const isCorrectOption = isOptionCorrect(option);

          let borderColor = 'border-gray-200';
          let bgColor = 'bg-white';

          if (showResult) {
            if (isCorrectOption) {
              borderColor = 'border-emerald-500';
              bgColor = 'bg-emerald-50';
            } else if (isSelected && !isCorrectOption) {
              borderColor = 'border-red-400';
              bgColor = 'bg-red-50';
            }
          } else if (isSelected) {
            borderColor = 'border-blue-500';
            bgColor = 'bg-blue-50';
          }

          return (
            <button
              key={index}
              onClick={() => toggleOption(option)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 ${borderColor} ${bgColor} transition-all`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    showResult
                      ? isCorrectOption
                        ? 'border-emerald-500 bg-emerald-500'
                        : isSelected
                        ? 'border-red-400 bg-red-400'
                        : 'border-gray-300'
                      : isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {(isSelected || (showResult && isCorrectOption)) && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <span
                  className={`font-medium ${
                    showResult && isCorrectOption ? 'text-emerald-700' : 'text-gray-700'
                  }`}
                >
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
            selected.length > 0
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-blue-700">Explanation</p>
                <p className="mt-1 text-sm text-blue-600">{question.explanation}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleRetry}
            className="w-full py-3 px-6 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export function QuestionCard({ question, onAnswer, showHint }: QuestionComponentProps) {
  switch (question.type) {
    case 'multiple-choice':
      return <MultipleChoice question={question} onAnswer={onAnswer} showHint={showHint} />;
    case 'dropdown':
      return <DropdownQuestion question={question} onAnswer={onAnswer} />;
    case 'text-input':
      return <TextInputQuestion question={question} onAnswer={onAnswer} showHint={showHint} />;
    case 'multi-select':
      return <MultiSelectQuestion question={question} onAnswer={onAnswer} showHint={showHint} />;
    default:
      return null;
  }
}
