import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

export type AnswerState = 'default' | 'selected' | 'correct' | 'wrong' | 'disabled';

interface AnswerButtonProps {
  label: string;
  state?: AnswerState;
  index?: number;
  onClick?: () => void;
  disabled?: boolean;
  showIndicator?: boolean;
  className?: string;
}

// Brilliant-style interactive answer button with all feedback states
export function AnswerButton({
  label,
  state = 'default',
  index,
  onClick,
  disabled = false,
  showIndicator = true,
  className = '',
}: AnswerButtonProps) {
  const [hovered, setHovered] = useState(false);

  const stateStyles: Record<AnswerState, { bg: string; border: string; text: string; indicator: string }> = {
    default: {
      bg: 'bg-white',
      border: 'border-navy-200',
      text: 'text-navy-700',
      indicator: 'border-navy-300 bg-white',
    },
    selected: {
      bg: 'bg-navy-800',
      border: 'border-navy-800',
      text: 'text-white',
      indicator: 'border-navy-600 bg-navy-600',
    },
    correct: {
      bg: 'bg-success-50',
      border: 'border-success-500',
      text: 'text-success-700',
      indicator: 'border-success-500 bg-success-500',
    },
    wrong: {
      bg: 'bg-error-50',
      border: 'border-error-500',
      text: 'text-error-700',
      indicator: 'border-error-500 bg-error-500',
    },
    disabled: {
      bg: 'bg-navy-50',
      border: 'border-navy-200',
      text: 'text-navy-400',
      indicator: 'border-navy-200 bg-navy-100',
    },
  };

  const styles = stateStyles[state];
  const isInteractive = !disabled && state === 'default';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={isInteractive ? { scale: 1.02, y: -2 } : undefined}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      animate={
        state === 'wrong'
          ? { x: [0, -8, 8, -6, 6, 0] }
          : state === 'correct'
          ? { scale: [1, 1.03, 1] }
          : {}
      }
      transition={{ duration: 0.4 }}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-colors duration-300 ${styles.bg} ${styles.border} ${styles.text} ${className}`}
      style={{
        boxShadow:
          state === 'correct'
            ? '0 0 20px rgba(22, 196, 127, 0.3)'
            : state === 'selected'
            ? '0 8px 24px rgba(15, 23, 42, 0.2)'
            : hovered && isInteractive
            ? '0 8px 24px rgba(15, 23, 42, 0.08)'
            : 'none',
      }}
    >
      <div className="flex items-center gap-3">
        {showIndicator && (
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${styles.indicator}`}
          >
            {state === 'correct' && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
            {state === 'wrong' && <X className="w-4 h-4 text-white" strokeWidth={3} />}
            {state === 'selected' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            {state === 'default' && typeof index === 'number' && (
              <span className="text-xs font-bold text-navy-400">{index + 1}</span>
            )}
          </div>
        )}
        <span className="font-medium flex-1">{label}</span>
      </div>
    </motion.button>
  );
}
