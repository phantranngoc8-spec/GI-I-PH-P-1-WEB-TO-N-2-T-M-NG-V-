export interface QuestionChoice {
  id: 'A' | 'B' | 'C';
  text: string; // e.g. "8 + 5" or explanation text
}

export interface QuestionData {
  id: number;
  code: string;
  title: string;
  type: 'addition' | 'subtraction';
  story: string;
  questionText: string; // the specific question clause
  choices: QuestionChoice[]; // Expressions (no result shown)
  correctChoice: 'A' | 'B' | 'C';
  correctAnswer: number;
  unit: string;
  reasonChoices: QuestionChoice[];
  correctReason: 'A' | 'B' | 'C';
  hint1: string;
  hint2: string;
  solution: string;
  manipulativeType: 'flowers' | 'pencils' | 'books' | 'oranges' | 'blocks' | 'labels' | 'trees' | 'balls' | 'pages' | 'crayons';
  manipulativeConfig: {
    groupA: number;
    groupB: number;
    total?: number;
    labelA: string;
    labelB: string;
    operation: 'add' | 'subtract' | 'difference' | 'missing';
  };
}

export interface QuestionAttempt {
  questionId: number;
  selectedExpr: 'A' | 'B' | 'C' | null;
  submittedAnswer: string;
  selectedReason: 'A' | 'B' | 'C' | null;
  studentNote: string;
  // First attempt tracking (never overwritten)
  firstSelectedExpr: 'A' | 'B' | 'C' | null;
  firstSubmittedAnswer: string | null;
  firstSelectedReason: 'A' | 'B' | 'C' | null;
  firstExprCorrect: boolean | null;
  firstAnswerCorrect: boolean | null;
  firstReasonCorrect: boolean | null;
  // Support tracking
  usedHint1: boolean;
  usedHint2: boolean;
  usedManipulatives: boolean;
  usedSolution: boolean;
  checkCount: number;
  isCompleted: boolean;
  earnedSelfPoint: boolean; // only if all 3 correct on 1st check without prior aids
}

export interface SessionResult {
  id: string;
  timestamp: number;
  stageId: number;
  totalQuestions: number;
  completedQuestions: number;
  selfMadeScore: number;
  firstCorrectExprCount: number;
  firstCorrectAnswerCount: number;
  firstCorrectReasonCount: number;
  supportedQuestionCount: number;
  attempts: Record<number, QuestionAttempt>;
  teacherComments?: Record<number, string>;
}

export interface StageInfo {
  id: number;
  name: string;
  topic: string;
  status: 'completed' | 'in_progress' | 'not_started';
  score?: number;
  total: number;
  description: string;
}
