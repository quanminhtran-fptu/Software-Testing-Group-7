import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, Lightbulb } from 'lucide-react';
import { Question } from '../types/course';
import { AnswerButton, ContinueButton, AnswerState } from '../styles';

interface QuestionComponentProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  showHint?: boolean;
  onReviewTheory?: () => void;
}

export function MultipleChoice({ question, onAnswer, showHint, onReviewTheory }: QuestionComponentProps) {
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

  const getButtonState = (option: string): AnswerState => {
    if (!showResult) {
      return selected === option ? 'selected' : 'default';
    }
    if (option === question.correctAnswer) return 'correct';
    if (option === selected) return 'wrong';
    return 'disabled';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-lg font-medium text-navy-900">{question.question}</p>
        </div>
        {question.hint && !showResult && (
          <button
            onClick={() => setShowHintState(!showHintState)}
            className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Lightbulb className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showHintState && question.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary-50 border border-primary-200 rounded-xl p-3 flex items-start gap-2"
          >
            <Lightbulb className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <p className="text-primary-700 text-sm">{question.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2.5">
        {question.options?.map((option, index) => (
          <AnswerButton
            key={index}
            label={option}
            index={index}
            state={getButtonState(option)}
            onClick={() => !showResult && setSelected(option)}
            disabled={showResult}
          />
        ))}
      </div>

      {!showResult ? (
        <ContinueButton
          state={selected ? 'default' : 'disabled'}
          label="Check Answer"
          onClick={handleSubmit}
        />
      ) : (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl ${
              isCorrect ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-success-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-error-500 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                  {isCorrect ? "That's right!" : 'Not quite right'}
                </p>
                <p className={`mt-1 text-sm ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </motion.div>

          {!isCorrect && (
            <div className="flex gap-3">
              {onReviewTheory && (
                <button
                  onClick={onReviewTheory}
                  className="flex-1 py-3 px-6 rounded-2xl font-semibold border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Review Theory
                </button>
              )}
              <button
                onClick={handleRetry}
                className="flex-1 py-3 px-6 rounded-2xl font-semibold bg-navy-100 text-navy-700 hover:bg-navy-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DropdownQuestion({ question, onAnswer, onReviewTheory }: QuestionComponentProps) {
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
      <p className="text-lg font-medium text-navy-900">{question.question}</p>

      <div className="relative">
        <motion.button
          whileHover={!showResult ? { scale: 1.01 } : undefined}
          whileTap={!showResult ? { scale: 0.99 } : undefined}
          onClick={() => !showResult && setIsOpen(!isOpen)}
          disabled={showResult}
          className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-colors ${
            showResult
              ? isCorrect
                ? 'border-success-500 bg-success-50'
                : 'border-error-500 bg-error-50'
              : isOpen
              ? 'border-primary-500 bg-white shadow-glow'
              : 'border-navy-200 bg-white hover:border-navy-300'
          }`}
        >
          <span className={selected ? 'text-navy-900' : 'text-navy-400'}>
            {selected || 'Select an answer...'}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-navy-400" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-navy-100 shadow-large z-10 overflow-hidden"
            >
              {question.dropdownOptions?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelected(option.label);
                    setIsOpen(false);
                  }}
                  className={`w-full p-4 text-left hover:bg-primary-50 transition-colors ${
                    selected === option.label ? 'bg-primary-50' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showResult ? (
        <ContinueButton
          state={selected ? 'default' : 'disabled'}
          label="Check Answer"
          onClick={handleSubmit}
        />
      ) : (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl ${
              isCorrect ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-success-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-error-500 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                  {isCorrect ? "That's right!" : 'Not quite right'}
                </p>
                <p className={`mt-1 text-sm ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </motion.div>

          {!isCorrect && (
            <div className="flex gap-3">
              {onReviewTheory && (
                <button
                  onClick={onReviewTheory}
                  className="flex-1 py-3 px-6 rounded-2xl font-semibold border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Review Theory
                </button>
              )}
              <button
                onClick={handleRetry}
                className="flex-1 py-3 px-6 rounded-2xl font-semibold bg-navy-100 text-navy-700 hover:bg-navy-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TextInputQuestion({ question, onAnswer, onReviewTheory }: QuestionComponentProps) {
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
        <p className="text-lg font-medium text-navy-900 flex-1">{question.question}</p>
        {question.hint && !showResult && (
          <button
            onClick={() => setShowHintState(!showHintState)}
            className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showHintState && question.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary-50 border border-primary-200 rounded-xl p-3 flex items-start gap-2"
          >
            <Lightbulb className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <p className="text-primary-700 text-sm">{question.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.input
        whileFocus={{ scale: 1.01 }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !showResult && handleSubmit()}
        disabled={showResult}
        placeholder="Type your answer..."
        className={`w-full p-4 rounded-2xl border-2 text-lg transition-colors ${
          showResult
            ? isCorrect
              ? 'border-success-500 bg-success-50'
              : 'border-error-500 bg-error-50'
            : 'border-navy-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white'
        } outline-none`}
      />

      {!showResult ? (
        <ContinueButton
          state={input.trim() ? 'default' : 'disabled'}
          label="Check Answer"
          onClick={handleSubmit}
        />
      ) : (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl ${
              isCorrect ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-success-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-error-500 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                  {isCorrect ? "That's right!" : `The answer was: ${question.correctAnswer}`}
                </p>
                <p className={`mt-1 text-sm ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </motion.div>

          {!isCorrect && (
            <div className="flex gap-3">
              {onReviewTheory && (
                <button
                  onClick={onReviewTheory}
                  className="flex-1 py-3 px-6 rounded-2xl font-semibold border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Review Theory
                </button>
              )}
              <button
                onClick={handleRetry}
                className="flex-1 py-3 px-6 rounded-2xl font-semibold bg-navy-100 text-navy-700 hover:bg-navy-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MultiSelectQuestion({ question, onAnswer, onReviewTheory }: QuestionComponentProps) {
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

  const getButtonState = (option: string): AnswerState => {
    if (!showResult) {
      return isOptionSelected(option) ? 'selected' : 'default';
    }
    if (isOptionCorrect(option)) return 'correct';
    if (isOptionSelected(option) && !isOptionCorrect(option)) return 'wrong';
    return 'disabled';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <p className="text-lg font-medium text-navy-900 flex-1">{question.question}</p>
        {question.hint && !showResult && (
          <button
            onClick={() => setShowHintState(!showHintState)}
            className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showHintState && question.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary-50 border border-primary-200 rounded-xl p-3 flex items-start gap-2"
          >
            <Lightbulb className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <p className="text-primary-700 text-sm">{question.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm text-navy-500 italic">Select all that apply</p>

      <div className="space-y-2.5">
        {question.options?.map((option, index) => (
          <AnswerButton
            key={index}
            label={option}
            index={index}
            state={getButtonState(option)}
            onClick={() => toggleOption(option)}
            disabled={showResult}
          />
        ))}
      </div>

      {!showResult ? (
        <ContinueButton
          state={selected.length > 0 ? 'default' : 'disabled'}
          label="Check Answer"
          onClick={handleSubmit}
        />
      ) : (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-primary-50 border border-primary-200"
          >
            <div className="flex items-start gap-3">
              <HelpCircle className="w-6 h-6 text-primary-500" />
              <div>
                <p className="font-semibold text-primary-700">Explanation</p>
                <p className="mt-1 text-sm text-primary-600">{question.explanation}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-3">
            {onReviewTheory && !isOptionCorrect(question.options![0]) && (
              <button
                onClick={onReviewTheory}
                className="flex-1 py-3 px-6 rounded-2xl font-semibold border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Review Theory
              </button>
            )}
            <button
              onClick={handleRetry}
              className="flex-1 py-3 px-6 rounded-2xl font-semibold bg-navy-100 text-navy-700 hover:bg-navy-200 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function QuestionCard({ question, onAnswer, showHint, onReviewTheory }: QuestionComponentProps) {
  switch (question.type) {
    case 'multiple-choice':
      return <MultipleChoice question={question} onAnswer={onAnswer} showHint={showHint} onReviewTheory={onReviewTheory} />;
    case 'dropdown':
      return <DropdownQuestion question={question} onAnswer={onAnswer} onReviewTheory={onReviewTheory} />;
    case 'text-input':
      return <TextInputQuestion question={question} onAnswer={onAnswer} showHint={showHint} onReviewTheory={onReviewTheory} />;
    case 'multi-select':
      return <MultiSelectQuestion question={question} onAnswer={onAnswer} showHint={showHint} onReviewTheory={onReviewTheory} />;
    default:
      return null;
  }
}
