import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'lesson' | 'compact';
  className?: string;
}

// Sticky animated progress bar with glow effect
export function ProgressBar({
  current,
  total,
  label = 'Progress',
  showPercentage = true,
  variant = 'lesson',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / total) * 100));
  const isCompact = variant === 'compact';

  return (
    <div className={className}>
      {!isCompact && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-primary-600">{label}</span>
          {showPercentage && (
            <motion.span
              key={percentage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-sm font-bold text-primary-600 tabular-nums"
            >
              {percentage}%
            </motion.span>
          )}
        </div>
      )}
      <div
        className={`relative ${
          isCompact ? 'h-2' : 'h-3'
        } bg-primary-100 rounded-full overflow-hidden`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          style={{
            boxShadow: '0 0 12px rgba(45, 127, 249, 0.5), 0 0 24px rgba(45, 127, 249, 0.2)',
          }}
        >
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Sticky top progress bar for lesson screens
export function StickyProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-navy-100">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-navy-500 whitespace-nowrap">
            {current + 1} / {total}
          </span>
          <div className="flex-1 h-2.5 bg-primary-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              style={{
                boxShadow: '0 0 12px rgba(45, 127, 249, 0.5)',
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
          <motion.span
            key={percentage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-sm font-bold text-primary-600 tabular-nums whitespace-nowrap"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}
