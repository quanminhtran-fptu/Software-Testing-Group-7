import { motion } from 'framer-motion';
import { ChevronRight, Trophy, Loader2 } from 'lucide-react';

interface ContinueButtonProps {
  state: 'disabled' | 'default' | 'correct' | 'loading';
  label?: string;
  onClick?: () => void;
  className?: string;
  showIcon?: boolean;
}

// Continue button with disabled, default, correct (glow), and loading states
export function ContinueButton({
  state,
  label = 'Continue',
  onClick,
  className = '',
  showIcon = true,
}: ContinueButtonProps) {
  const isDisabled = state === 'disabled';
  const isCorrect = state === 'correct';
  const isLoading = state === 'loading';

  return (
    <motion.button
      onClick={isDisabled || isLoading ? undefined : onClick}
      disabled={isDisabled || isLoading}
      whileHover={!isDisabled && !isLoading ? { scale: 1.03 } : undefined}
      whileTap={!isDisabled && !isLoading ? { scale: 0.98 } : undefined}
      animate={
        isCorrect
          ? {
              boxShadow: [
                '0 0 12px rgba(22, 196, 127, 0.4)',
                '0 0 28px rgba(22, 196, 127, 0.7), 0 0 48px rgba(22, 196, 127, 0.3)',
                '0 0 12px rgba(22, 196, 127, 0.4)',
              ],
            }
          : {}
      }
      transition={{ duration: 1.5, repeat: isCorrect ? Infinity : 0, ease: 'easeInOut' }}
      className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-semibold text-base transition-colors duration-300 ${className} ${
        isDisabled
          ? 'bg-navy-100 text-navy-400 cursor-not-allowed'
          : isCorrect
          ? 'bg-gradient-to-r from-success-500 to-success-600 text-white'
          : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
      }`}
      style={{
        boxShadow: !isDisabled && !isCorrect && !isLoading
          ? '0 8px 24px rgba(45, 127, 249, 0.25)'
          : undefined,
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          {showIcon && (isCorrect ? <Trophy className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />)}
        </>
      )}
    </motion.button>
  );
}
