import { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, Award, Lightbulb, MessageCircle } from 'lucide-react';
import { MascotMessage } from '../types/course';

interface MascotProps {
  message: MascotMessage;
  onClose: () => void;
  isVisible: boolean;
}

const mascotStates = {
  celebrate: {
    emoji: '🎉',
    bgGradient: 'from-emerald-500 to-teal-600',
    icon: Award,
    animation: 'animate-bounce'
  },
  encourage: {
    emoji: '💪',
    bgGradient: 'from-blue-500 to-indigo-600',
    icon: Sparkles,
    animation: 'animate-pulse'
  },
  warn: {
    emoji: '😊',
    bgGradient: 'from-amber-500 to-orange-600',
    icon: AlertCircle,
    animation: 'animate-wiggle'
  },
  hint: {
    emoji: '💡',
    bgGradient: 'from-sky-500 to-cyan-600',
    icon: Lightbulb,
    animation: 'animate-pulse'
  },
  welcome: {
    emoji: '👋',
    bgGradient: 'from-violet-500 to-purple-600',
    icon: MessageCircle,
    animation: ''
  }
};

export function Mascot({ message, onClose, isVisible }: MascotProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShow(true), 100);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  if (!isVisible && !show) return null;

  const state = mascotStates[message.type];
  const IconComponent = state.icon;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${show ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div
        className={`relative max-w-md w-full transform transition-all duration-500 ${
          show ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8'
        }`}
      >
        <div className={`relative bg-gradient-to-br ${state.bgGradient} rounded-3xl p-1 shadow-2xl`}>
          <div className="bg-white rounded-[22px] p-6 relative overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`relative mb-4 ${state.animation}`}>
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-4xl">{state.emoji}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <IconComponent className={`w-4 h-4 text-${message.type === 'celebrate' ? 'emerald' : message.type === 'warn' ? 'amber' : 'blue'}-500`} />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {message.type === 'celebrate' && 'Great Job!'}
                {message.type === 'encourage' && 'Keep Going!'}
                {message.type === 'warn' && 'Not Quite Right'}
                {message.type === 'hint' && 'Here\'s a Hint'}
                {message.type === 'welcome' && 'Welcome!'}
              </h3>

              <p className="text-gray-600 leading-relaxed">{message.text}</p>
            </div>

            {message.type === 'celebrate' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px]">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'][i % 5],
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MascotAvatar({ size = 'md', animate = false }: { size?: 'sm' | 'md' | 'lg'; animate?: boolean }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${animate ? 'animate-wiggle' : ''}`}>
      <span>🧪</span>
    </div>
  );
}
