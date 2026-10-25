import React from 'react';
import { Check, Star } from 'lucide-react';
import { QuestionAttempt } from '../types/math';
import { QUESTIONS } from '../data/questions';
import { sound } from '../utils/audio';

interface ProgressBarProps {
  currentIndex: number;
  attempts: Record<number, QuestionAttempt>;
  onSelectQuestion: (index: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  attempts,
  onSelectQuestion,
}) => {
  const completedCount = Object.values(attempts).filter((a) => a.isCompleted).length;
  const earnedPointCount = Object.values(attempts).filter((a) => a.earnedSelfPoint).length;

  return (
    <div className="w-full bg-white/80 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border-2 border-sky-100 shadow-sm mb-4">
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full text-xs font-extrabold">
            Câu {currentIndex + 1} / 10
          </span>
          <span className="hidden sm:inline text-slate-500 font-medium">
            Đã hoàn thành: <b className="text-sky-700">{completedCount}</b>/10
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full text-amber-900 text-xs font-extrabold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>Điểm tự làm: {earnedPointCount}/10</span>
        </div>
      </div>

      {/* Steps track */}
      <div className="grid grid-cols-10 gap-1 sm:gap-2">
        {QUESTIONS.map((q, idx) => {
          const attempt = attempts[q.id];
          const isCurrent = idx === currentIndex;
          const isDone = attempt?.isCompleted;
          const hasSelfPoint = attempt?.earnedSelfPoint;

          let btnClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
          if (isDone) {
            btnClass = hasSelfPoint
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
              : 'bg-sky-500 text-white border-sky-600 shadow-xs';
          }
          if (isCurrent) {
            btnClass += ' ring-3 ring-amber-400 ring-offset-1 font-black scale-105';
          }

          return (
            <button
              key={q.id}
              onClick={() => {
                sound.playPop();
                onSelectQuestion(idx);
              }}
              className={`h-9 sm:h-11 rounded-xl text-xs sm:text-sm font-extrabold flex flex-col items-center justify-center transition border cursor-pointer ${btnClass}`}
              title={`Câu ${idx + 1}: ${q.title} (${isDone ? 'Đã hoàn thành' : 'Chưa làm'})`}
              aria-label={`Chuyển tới câu ${idx + 1}`}
            >
              <span>{idx + 1}</span>
              {isDone && (
                <Check className="w-3 h-3 stroke-[3]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
