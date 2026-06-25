import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export interface ToastItem {
  id: number;
  type: 'success' | 'error';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
}

// Brilliant-style toast notifications that slide in from bottom-left
export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast, onRemove }: { toast: ToastItem; onRemove: (id: number) => void }) {
  const isSuccess = toast.type === 'success';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: -60, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onAnimationComplete={() => {
        setTimeout(() => onRemove(toast.id), 2000);
      }}
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-large pointer-events-auto max-w-sm ${
        isSuccess
          ? 'bg-success-500 text-white'
          : 'bg-error-500 text-white'
      }`}
      style={{
        boxShadow: isSuccess
          ? '0 8px 32px rgba(22, 196, 127, 0.35)'
          : '0 8px 32px rgba(255, 90, 95, 0.35)',
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 flex-shrink-0" />
        )}
      </motion.div>
      <span className="font-semibold text-sm">{toast.message}</span>
    </motion.div>
  );
}

// Hook to manage toast state
import { useState, useCallback } from 'react';

export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
