export interface Chapter {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  icon: string;
}

export interface Lesson {
  id: number;
  title: string;
  type: 'theory' | 'quiz';
  content: LessonContent;
  xpReward: number;
  furtherReading?: FurtherReading[];
}

export interface LessonContent {
  sections?: ContentSection[];
  questions?: Question[];
  realWorldExample?: RealWorldExample;
}

export interface ContentSection {
  heading?: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  highlight?: {
    text: string;
    type: 'info' | 'warning' | 'tip' | 'definition';
  };
  interactiveExample?: {
    type: 'dropdown' | 'slider' | 'toggle';
    content: InteractiveContent;
  };
}

export interface InteractiveContent {
  label: string;
  options?: { value: string; label: string; explanation: string }[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number | boolean;
  onUpdate?: string;
  showExplanation?: boolean;
}

export interface Question {
  id: number;
  type: 'multiple-choice' | 'dropdown' | 'text-input' | 'drag-drop' | 'multi-select';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
  dropdownOptions?: { id: string; label: string }[];
  dragItems?: { id: string; text: string; correctSlot: string }[];
  dropSlots?: { id: string; label: string }[];
}

export interface RealWorldExample {
  title: string;
  scenario: string;
  story: string[];
  lessons: string[];
  simulation?: SimulationStep[];
}

export interface SimulationStep {
  type: 'choice' | 'result' | 'info';
  text: string;
  choices?: { id: string; text: string; correct: boolean; feedback: string }[];
  result?: string;
  icon?: string;
}

export interface FurtherReading {
  title: string;
  description: string;
  type: 'book' | 'article' | 'video' | 'practice';
  url?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  current_chapter: number;
  total_xp: number;
  streak_days: number;
  last_activity_date: string;
}

export interface QuizResult {
  id: string;
  user_id: string;
  chapter_id: number;
  lesson_id: number;
  question_id: number;
  is_correct: boolean;
  attempts: number;
}

export interface MascotMessage {
  type: 'celebrate' | 'encourage' | 'warn' | 'hint' | 'welcome';
  text: string;
  emoji?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  progress: number;
  total: number;
}
