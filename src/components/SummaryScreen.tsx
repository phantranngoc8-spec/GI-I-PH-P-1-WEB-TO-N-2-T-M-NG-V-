import React from 'react';
import { Award, RotateCcw, Home, Sparkles, BookOpenCheck, CheckCircle2, HeartHandshake, Eye } from 'lucide-react';
import { QuestionAttempt } from '../types/math';
import { QUESTIONS } from '../data/questions';
import { CharacterNam, CharacterMai } from './Characters';
import { sound } from '../utils/audio';

interface SummaryScreenProps {
  attempts: Record<number, QuestionAttempt>;
  onReviewQuestion: (index: number) => void;
  onRestart: () => void;
  onGoHome: () => void;
  onOpenTeacher: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  attempts,
  onReviewQuestion,
  onRestart,
  onGoHome,
  onOpenTeacher,
}) => {
  const completedCount = Object.values(attempts).filter((a) => a.isCompleted).length;
  const selfMadeScore = Object.values(attempts).filter((a) => a.earnedSelfPoint).length;

  const firstCorrectExprCount = Object.values(attempts).filter((a) => a.firstExprCorrect === true).length;
  const firstCorrectAnswerCount = Object.values(attempts).filter((a) => a.firstAnswerCorrect === true).length;
  const firstCorrectReasonCount = Object.values(attempts).filter((a) => a.firstReasonCorrect === true).length;

  const supportedQuestionCount = Object.values(attempts).filter(
    (a) => a.usedHint1 || a.usedHint2 || a.usedManipulatives || a.usedSolution
  ).length;

  const isStageFullyCompleted = completedCount === 10;

  // Find questions needing practice (either not completed or checkCount > 1 or wrong in 1st attempt)
  const questionsNeedingReview = QUESTIONS.filter((q) => {
    const att = attempts[q.id];
    return !att?.isCompleted || !att?.earnedSelfPoint;
  });

  // Factual objective feedback based solely on actual data (no fake comparisons)
  let factualComment = '';
  if (selfMadeScore === 10) {
    factualComment = 'Em đã tự làm chính xác cả 10 câu hỏi ngay trong lần kiểm tra đầu tiên mà không cần dùng trợ giúp!';
  } else if (selfMadeScore >= 7) {
    factualComment = `Em đã đạt ${selfMadeScore}/10 điểm tự làm, hoàn thành ${completedCount}/10 tình huống toán học.`;
  } else {
    factualComment = `Em đã hoàn thành ${completedCount}/10 tình huống, trong đó có ${selfMadeScore} câu tự làm đạt điểm và ${supportedQuestionCount} câu có sử dụng công cụ hỗ trợ.`;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4 sm:p-6 bg-white rounded-3xl border-3 border-sky-200 shadow-xl animate-in zoom-in-95">
      {/* Header Banner */}
      <div className="text-center space-y-2 pb-4 border-b-2 border-slate-100">
        <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-800 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>TỔNG KẾT KẾT QUẢ HỌC TẬP</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-sky-950">
          Chặng 4: Vận Dụng
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-lg mx-auto">
          Giải quyết tình huống gần gũi bằng phép cộng, phép trừ trong phạm vi 20
        </p>
      </div>

      {/* Characters & Badge */}
      <div className="flex items-center justify-around py-3 bg-gradient-to-r from-sky-50 via-amber-50 to-sky-50 rounded-2xl border border-sky-100 p-4">
        <CharacterNam size="md" speech="Chúc mừng bạn!" />

        {/* Central Completion Badge */}
        <div className="flex flex-col items-center text-center p-3">
          {isStageFullyCompleted ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-lg ring-4 ring-amber-200 animate-pulse">
                <Award className="w-12 h-12" />
              </div>
              <span className="mt-2 text-xs font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Huy hiệu Hoàn thành chặng 4
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                <BookOpenCheck className="w-8 h-8" />
              </div>
              <span className="mt-2 text-xs font-bold text-slate-500">
                (Hoàn thành đủ 10 câu để nhận huy hiệu)
              </span>
            </div>
          )}
        </div>

        <CharacterMai size="md" speech="Em làm giỏi lắm!" />
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Self-made score */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-300 text-center space-y-1">
          <div className="text-xs font-bold text-amber-800">Điểm tự làm</div>
          <div className="font-display font-black text-3xl sm:text-4xl text-amber-900">
            {selfMadeScore} <span className="text-lg font-bold text-amber-700">/ 10</span>
          </div>
          <div className="text-[11px] text-amber-700 font-medium">Đúng ngay lần 1, không dùng trợ giúp</div>
        </div>

        {/* Completed questions */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-300 text-center space-y-1">
          <div className="text-xs font-bold text-emerald-800">Số câu hoàn thành</div>
          <div className="font-display font-black text-3xl sm:text-4xl text-emerald-900">
            {completedCount} <span className="text-lg font-bold text-emerald-700">/ 10</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">Đã giải đúng cả 3 phần</div>
        </div>

        {/* First attempt correct expr */}
        <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 text-center space-y-1">
          <div className="text-xs font-bold text-sky-800">Đúng phép tính lần 1</div>
          <div className="font-display font-black text-3xl sm:text-4xl text-sky-900">
            {firstCorrectExprCount} <span className="text-lg font-bold text-sky-700">/ 10</span>
          </div>
          <div className="text-[11px] text-sky-600 font-medium">Chọn đúng dạng cộng/trừ</div>
        </div>

        {/* First attempt correct answer */}
        <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center space-y-1">
          <div className="text-xs font-bold text-blue-800">Đúng đáp số lần 1</div>
          <div className="font-display font-black text-3xl sm:text-4xl text-blue-900">
            {firstCorrectAnswerCount} <span className="text-lg font-bold text-blue-700">/ 10</span>
          </div>
          <div className="text-[11px] text-blue-600 font-medium">Tính nhẩm chính xác</div>
        </div>

        {/* First attempt correct reason */}
        <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-center space-y-1">
          <div className="text-xs font-bold text-indigo-800">Đúng lý do lần 1</div>
          <div className="font-display font-black text-3xl sm:text-4xl text-indigo-900">
            {firstCorrectReasonCount} <span className="text-lg font-bold text-indigo-700">/ 10</span>
          </div>
          <div className="text-[11px] text-indigo-600 font-medium">Hiểu bản chất tình huống</div>
        </div>

        {/* Supported questions */}
        <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-200 text-center space-y-1">
          <div className="text-xs font-bold text-purple-800">Câu dùng hỗ trợ</div>
          <div className="font-display font-black text-3xl sm:text-4xl text-purple-900">
            {supportedQuestionCount} <span className="text-lg font-bold text-purple-700">/ 10</span>
          </div>
          <div className="text-[11px] text-purple-600 font-medium">Mở gợi ý, đồ vật hoặc lời giải</div>
        </div>
      </div>

      {/* Factual comment banner */}
      <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-slate-800 text-sm sm:text-base font-semibold leading-relaxed flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-sky-600 shrink-0" />
        <div>{factualComment}</div>
      </div>

      {/* Practice / Review section if any questions need review */}
      {questionsNeedingReview.length > 0 && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
          <div className="text-xs sm:text-sm font-bold text-amber-900 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>Các câu cần luyện thêm:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {questionsNeedingReview.map((q) => {
              const qIndex = QUESTIONS.findIndex((item) => item.id === q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sound.playPop();
                    onReviewQuestion(qIndex);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-xs sm:text-sm font-bold text-amber-950 transition cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Câu {q.id}</span>
                  <span className="text-[10px] text-slate-500">({q.title})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-slate-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              onGoHome();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Về trang chủ</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenTeacher();
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Góc giáo viên</span>
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {questionsNeedingReview.length > 0 && (
            <button
              onClick={() => {
                sound.playPop();
                const firstNeed = QUESTIONS.findIndex(
                  (item) => item.id === questionsNeedingReview[0].id
                );
                onReviewQuestion(firstNeed >= 0 ? firstNeed : 0);
              }}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs"
            >
              Luyện lại câu cần ôn
            </button>
          )}

          <button
            onClick={() => {
              sound.playPop();
              onRestart();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi lại từ đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
