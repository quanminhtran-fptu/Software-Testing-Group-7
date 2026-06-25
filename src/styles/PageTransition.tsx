import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageTransition } from './animations';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

// Wraps page content with fade + slide transitions
export function PageTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Loading skeleton for content loading states
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-navy-100 rounded-2xl overflow-hidden ${className}`}>
      <div className="animate-pulse">
        <div className="h-32 bg-navy-200/50" />
        <div className="p-5 space-y-3">
          <div className="h-4 bg-navy-200/50 rounded w-3/4" />
          <div className="h-3 bg-navy-200/50 rounded w-full" />
          <div className="h-3 bg-navy-200/50 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function LessonSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-navy-200/50 rounded-xl" />
          <div className="space-y-2">
            <div className="h-3 bg-navy-200/50 rounded w-24" />
            <div className="h-5 bg-navy-200/50 rounded w-48" />
          </div>
        </div>
        <div className="h-3 bg-navy-200/50 rounded-full" />
        <div className="bg-white rounded-2xl p-8 space-y-4">
          <div className="h-6 bg-navy-200/50 rounded w-3/4" />
          <div className="h-4 bg-navy-200/50 rounded w-full" />
          <div className="h-4 bg-navy-200/50 rounded w-5/6" />
          <div className="space-y-2 pt-4">
            <div className="h-14 bg-navy-100 rounded-2xl" />
            <div className="h-14 bg-navy-100 rounded-2xl" />
            <div className="h-14 bg-navy-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
