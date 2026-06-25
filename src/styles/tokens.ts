// Brilliant.org-inspired design tokens
// Centralized color system, spacing, and motion constants

export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#2D7FF9',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E3A8A',
    900: '#172554',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#16C47F',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#FF5A5F',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  accent: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  navy: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
} as const;

export const motion = {
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  springSoft: { type: 'spring' as const, stiffness: 200, damping: 25 },
  easeOut: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  fast: { duration: 0.3, ease: 'easeOut' as const },
  slow: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  soft: '0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
  medium: '0 8px 24px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)',
  large: '0 20px 48px rgba(15, 23, 42, 0.12), 0 8px 16px rgba(15, 23, 42, 0.06)',
  glow: '0 0 24px rgba(45, 127, 249, 0.35)',
  successGlow: '0 0 24px rgba(22, 196, 127, 0.4)',
  errorGlow: '0 0 24px rgba(255, 90, 95, 0.4)',
} as const;
