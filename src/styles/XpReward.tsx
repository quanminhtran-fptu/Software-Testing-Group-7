import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

// Animated number that counts up smoothly
export function AnimatedNumber({ value, className = '' }: { value: number; className?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, count, rounded]);

  return <span className={className}>{display}</span>;
}

interface FloatingXpProps {
  rewards: { id: number; amount: number }[];
  onRemove: (id: number) => void;
}

// Floating "+15 XP" text that floats up and fades out
export function FloatingXpRewards({ rewards, onRemove }: FloatingXpProps) {
  useEffect(() => {
    const timers = rewards.map((r) =>
      setTimeout(() => onRemove(r.id), 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, [rewards, onRemove]);

  return (
    <div className="fixed top-20 right-4 md:right-8 z-50 pointer-events-none">
      <AnimatePresence>
        {rewards.map((reward, i) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -60 - i * 10, scale: 1.1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 flex items-center gap-1.5 bg-gradient-to-r from-success-500 to-success-600 text-white font-bold text-sm px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
            style={{ boxShadow: '0 0 16px rgba(22, 196, 127, 0.4)' }}
          >
            <Zap className="w-3.5 h-3.5" />
            +{reward.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface XpCounterProps {
  xp: number;
  className?: string;
}

// XP counter badge with animated number
export function XpCounter({ xp, className = '' }: XpCounterProps) {
  return (
    <div className={`flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-full ${className}`}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Zap className="w-4 h-4 text-primary-500" />
      </motion.div>
      <span className="font-semibold text-primary-600 tabular-nums">
        <AnimatedNumber value={xp} /> XP
      </span>
    </div>
  );
}
