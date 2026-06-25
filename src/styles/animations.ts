import type { Variants } from 'framer-motion';

// Shared Framer Motion variants for consistent animations across the app

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInBottom: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.25 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

export const floatLoop: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      '0 0 12px rgba(45, 127, 249, 0.4)',
      '0 0 28px rgba(45, 127, 249, 0.7), 0 0 48px rgba(45, 127, 249, 0.3)',
      '0 0 12px rgba(45, 127, 249, 0.4)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const shake: Variants = {
  animate: {
    x: [0, -8, 8, -6, 6, 0],
    transition: { duration: 0.4 },
  },
};

export const successPop: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: [0.8, 1.1, 1],
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Spring configs
export const springConfig = {
  stiff: { type: 'spring' as const, stiffness: 400, damping: 25 },
  soft: { type: 'spring' as const, stiffness: 200, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 500, damping: 15 },
};
