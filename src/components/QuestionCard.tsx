import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  HelpCircle,
  Eye,
  ArrowRight,
  MessageSquare,
  Sparkles,
  BookMarked,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuestionData, QuestionAttempt } from '../types/math';
import { CharacterNam, CharacterMai } from './Characters';
import { sound } from '../utils/audio';

interface QuestionCardProps {
  question: QuestionData;
  questionIndex: number;
  totalQuestions: number;
  attempt: QuestionAttempt;
  onUpdateAttempt: (updated: Partial<QuestionAttempt>) => void;
  onOpenManipulatives: () => void;
  onNextQuestion: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  attempt,
  onUpdateAttempt,
  onOpenManipulatives,
  onNextQuestion,
}) => {
  // Local UI state for hints & feedback
  const [hintLevel, setHintLevel] = useState<number>(() => {
    if (attempt.usedHint2) return 2;
    if (attempt.usedHint1) return 1;
    return 0;
  });
  const [showSolution, setShowSolution] = useState<boolean>(attempt.usedSolution || attempt.isCompleted);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'partial' | null;
    message: string;
    details: {
      expr: boolean | null;
      answer: boolean | null;
      reason: boolean | null;
    };
  } | null>(() => {
    if (attempt.isCompleted) {
      return {
        type: 'success',
        message: 'Đúng rồi! Em đã giải được tình huống!',
        details: { expr: true, answer: true, reason: true },
      };
    }
    return null;
  });

  // Check if inputs are ready for validation
  const isReadyToCheck =
    attempt.selectedExpr !== null &&
    attempt.submittedAnswer.trim() !== '' &&
    attempt.selectedReason !== null;

  // Handle expression selection
  const handleSelectExpr = (id: 'A' | 'B' | 'C') => {
    sound.playPop();
    onUpdateAttempt({ selectedExpr: id });
  };

  // Handle number input (non-negative integer only)
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    onUpdateAttempt({ submittedAnswer: val });
  };

  // Handle reason card selection
  const handleSelectReason = (id: 'A' | 'B' | 'C') => {
    sound.playPop();
    onUpdateAttempt({ selectedReason: id });
  };

  // Handle student written explanation
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateAttempt({ studentNote: e.target.value });
  };

  // Check answers
  const handleCheck = () => {
    if (!isReadyToCheck) return;

    const isExprCorrect = attempt.selectedExpr === question.correctChoice;
    const numericAns = parseInt(attempt.submittedAnswer, 10);
    const isAnsCorrect = !isNaN(numericAns) && numericAns === question.correctAnswer;
    const isReasonCorrect = attempt.selectedReason === question.correctReason;

    const allCorrect = isExprCorrect && isAnsCorrect && isReasonCorrect;
    const nextCheckCount = (attempt.checkCount || 0) + 1;

    // Check if this is 1st check attempt
    const isFirstAttempt = attempt.checkCount === 0;

    // Self-made point condition:
    // All 3 correct on 1st check, and no hints, manipulatives, or solution opened beforehand
    const hadPriorAid =
      attempt.usedHint1 ||
      attempt.usedHint2 ||
      attempt.usedManipulatives ||
      attempt.usedSolution;

    const earnedPoint =
      attempt.earnedSelfPoint || (isFirstAttempt && allCorrect && !hadPriorAid);

    // Save first attempt data permanently
    const firstSelectedExpr = attempt.firstSelectedExpr ?? attempt.selectedExpr;
    const firstSubmittedAnswer = attempt.firstSubmittedAnswer ?? attempt.submittedAnswer;
    const firstSelectedReason = attempt.firstSelectedReason ?? attempt.selectedReason;
    const firstExprCorrect = attempt.firstExprCorrect ?? isExprCorrect;
    const firstAnswerCorrect = attempt.firstAnswerCorrect ?? isAnsCorrect;
    const firstReasonCorrect = attempt.firstReasonCorrect ?? isReasonCorrect;

    onUpdateAttempt({
      checkCount: nextCheckCount,
      isCompleted: allCorrect || attempt.isCompleted,
      earnedSelfPoint: earnedPoint,
      firstSelectedExpr,
      firstSubmittedAnswer,
      firstSelectedReason,
      firstExprCorrect,
      firstAnswerCorrect,
      firstReasonCorrect,
    });

    if (allCorrect) {
      sound.playCorrect();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Confetti optional
      }
      setFeedback({
        type: 'success',
        message: 'Đúng rồi! Em đã giải được tình huống!',
        details: { expr: true, answer: true, reason: true },
      });
      setShowSolution(true);
    } else {
      sound.playGentlePrompt();

      // Construct pedagogical feedback message
      const messages: string[] = [];
      if (!isExprCorrect && isAnsCorrect) {
        messages.push('Em đã tính đúng số, nhưng cần xem lại phép tính phù hợp với tình huống.');
      } else if (isExprCorrect && !isAnsCorrect) {
        messages.push('Em đã chọn đúng phép tính. Hãy kiểm tra lại kết quả.');
      } else if (!isExprCorrect && !isAnsCorrect) {
        messages.push('Hãy đọc kĩ lại đề bài và kiểm tra cả phép tính lẫn đáp số nhé.');
      }

      if (!isReasonCorrect) {
        messages.push('Em hãy đọc lại lý do chọn phép tính để giải thích cho chính xác.');
      }

      setFeedback({
        type: 'partial',
        message: messages.join(' '),
        details: {
          expr: isExprCorrect,
          answer: isAnsCorrect,
          reason: isReasonCorrect,
        },
      });
    }
  };

  // Toggle hints (Tier 1 -> Tier 2)
  const handleToggleHint = () => {
    sound.playPop();
    if (hintLevel === 0) {
      setHintLevel(1);
      onUpdateAttempt({ usedHint1: true });
    } else if (hintLevel === 1) {
      setHintLevel(2);
      onUpdateAttempt({ usedHint2: true });
    }
  };

  // View solution
  const handleToggleSolution = () => {
    sound.playPop();
    setShowSolution(!showSolution);
    onUpdateAttempt({ usedSolution: true });
  };

  // Character speech bubble depending on situation
  const isOdd = question.id % 2 === 1;

  return (
    <div className="bg-white rounded-3xl border-3 border-sky-200 shadow-md p-4 sm:p-7 space-y-6">
      {/* Top Bar: Problem Tag & Character Mascot */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-sky-500 text-white font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl shadow-xs">
            {question.code}
          </span>
          <span className="font-display font-extrabold text-base sm:text-lg text-sky-950">
            {question.title}
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
              question.type === 'addition'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-indigo-50 text-indigo-900 border-indigo-300'
            }`}
          >
            {question.type === 'addition' ? '➕ Tình huống Phép cộng' : '➖ Tình huống Phép trừ'}
          </span>
        </div>

        {/* Mini Character Companion */}
        <div className="hidden sm:flex items-center gap-2 bg-sky-50/80 px-3 py-1.5 rounded-2xl border border-sky-100">
          {isOdd ? <CharacterNam size="sm" /> : <CharacterMai size="sm" />}
          <div className="text-xs font-bold text-sky-900">
            {isOdd ? 'Nam đồng hành cùng em!' : 'Mai cổ vũ em nhé!'}
          </div>
        </div>
      </div>

      {/* Problem Statement: Minimum 24px as required */}
      <div className="bg-gradient-to-r from-sky-50/70 via-blue-50/50 to-indigo-50/70 rounded-2xl p-4 sm:p-5 border-2 border-sky-200/80">
        <div className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-800 leading-relaxed">
          <span>{question.story} </span>
          <span className="text-sky-800 font-extrabold">{question.questionText}</span>
        </div>
      </div>

      {/* 3 Step Interactive Workspace */}
      <div className="space-y-6">
        {/* ============================================================== */}
        {/* BƯỚC 1: CHỌN PHÉP TÍNH */}
        {/* ============================================================== */}
        <section className="bg-white rounded-2xl border-2 border-sky-100 p-4 sm:p-5 shadow-xs transition">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-base sm:text-lg text-sky-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-sm font-black flex items-center justify-center">
                1
              </span>
              <span>Bước 1: Chọn phép tính phù hợp</span>
            </h3>
            {feedback?.details.expr !== null && feedback?.details.expr !== undefined && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  feedback.details.expr ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {feedback.details.expr ? <Check className="w-3.5 h-3.5" /> : null}
                {feedback.details.expr ? 'Phép tính đúng' : 'Cần xem lại phép tính'}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mb-3">
            Em hãy chọn một trong ba phương án dưới đây (chỉ hiển thị phép tính):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {question.choices.map((choice) => {
              const isSelected = attempt.selectedExpr === choice.id;
              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectExpr(choice.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 font-display text-lg sm:text-xl font-extrabold flex items-center justify-between transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-sky-500 border-sky-600 text-white shadow-md scale-[1.02]'
                      : 'bg-slate-50 hover:bg-sky-50 border-slate-200 hover:border-sky-300 text-slate-800'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Phương án ${choice.id}: ${choice.text}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl font-sans text-sm font-black flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {choice.id}
                    </span>
                    <span>{choice.text}</span>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* BƯỚC 2: ĐIỀN ĐÁP SỐ */}
        {/* ============================================================== */}
        <section className="bg-white rounded-2xl border-2 border-sky-100 p-4 sm:p-5 shadow-xs transition">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-base sm:text-lg text-sky-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-black flex items-center justify-center">
                2
              </span>
              <span>Bước 2: Tính và điền đáp số</span>
            </h3>
            {feedback?.details.answer !== null && feedback?.details.answer !== undefined && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  feedback.details.answer ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {feedback.details.answer ? <Check className="w-3.5 h-3.5" /> : null}
                {feedback.details.answer ? 'Đáp số đúng' : 'Cần tính lại đáp số'}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
            <label htmlFor={`answer-input-${question.id}`} className="font-bold text-slate-700 text-base sm:text-lg">
              Đáp số:
            </label>
            <div className="flex items-center gap-2.5">
              <input
                id={`answer-input-${question.id}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={attempt.submittedAnswer}
                onChange={handleAnswerChange}
                placeholder="Điền số"
                className="w-32 sm:w-36 h-13 px-4 text-center font-display text-2xl font-black bg-white rounded-2xl border-3 border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-none text-slate-800 shadow-inner transition"
              />
              <span className="font-extrabold text-slate-800 text-base sm:text-lg bg-white px-3.5 py-2.5 rounded-xl border border-amber-200 shadow-xs">
                {question.unit}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 sm:mt-0 sm:ml-auto">
              (Nhập số nguyên không âm)
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* BƯỚC 3: GIẢI THÍCH LÝ DO */}
        {/* ============================================================== */}
        <section className="bg-white rounded-2xl border-2 border-sky-100 p-4 sm:p-5 shadow-xs transition">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-base sm:text-lg text-sky-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-indigo-500 text-white text-sm font-black flex items-center justify-center">
                3
              </span>
              <span>Bước 3: Giải thích lý do chọn phép tính</span>
            </h3>
            {feedback?.details.reason !== null && feedback?.details.reason !== undefined && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  feedback.details.reason ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {feedback.details.reason ? <Check className="w-3.5 h-3.5" /> : null}
                {feedback.details.reason ? 'Lý do phù hợp' : 'Cần đọc lại lý do'}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mb-3">
            Em hãy chọn một thẻ lý do đúng nhất với mối quan hệ trong bài toán:
          </p>

          <div className="space-y-2.5 mb-4">
            {question.reasonChoices.map((reason) => {
              const isSelected = attempt.selectedReason === reason.id;
              return (
                <button
                  key={reason.id}
                  onClick={() => handleSelectReason(reason.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-500 border-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 hover:bg-indigo-50/60 border-slate-200 hover:border-indigo-200 text-slate-800'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Lý do ${reason.id}: ${reason.text}`}
                >
                  <span
                    className={`w-7 h-7 shrink-0 rounded-xl text-xs font-black flex items-center justify-center mt-0.5 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {reason.id}
                  </span>
                  <span className="text-sm sm:text-base font-bold leading-snug flex-1">
                    {reason.text}
                  </span>
                  {isSelected && <Check className="w-5 h-5 shrink-0 text-white stroke-[3] mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Optional: Student writes additional thoughts */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label
              htmlFor={`note-input-${question.id}`}
              className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-sky-600" />
              <span>Em có thể viết thêm cách hiểu của mình (không bắt buộc):</span>
            </label>
            <textarea
              id={`note-input-${question.id}`}
              value={attempt.studentNote}
              onChange={handleNoteChange}
              placeholder="Ví dụ: Em gộp 8 với 2 thành 10 rồi cộng thêm 3..."
              rows={2}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 outline-none text-sm text-slate-700 bg-slate-50/50"
            />
            {/* Encouraging verbal prompt */}
            <div className="bg-sky-50 text-sky-900 text-xs sm:text-sm p-3 rounded-xl border border-sky-200 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
              <span>💬 <b>Lời nhắc bạn nhỏ:</b> Em hãy nói cách làm cho thầy cô hoặc bạn cùng nghe nhé!</span>
            </div>
          </div>
        </section>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-3 animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-extrabold text-base sm:text-lg">
              {feedback.type === 'success' ? 'Xuất sắc lắm!' : 'Cố gắng lên nhé!'}
            </div>
            <div className="text-sm sm:text-base font-semibold leading-relaxed">
              {feedback.message}
            </div>
          </div>
        </div>
      )}

      {/* Hints Display (Tier 1 & Tier 2) */}
      {hintLevel > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 sm:p-5 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Gợi ý hướng dẫn ({hintLevel}/2)</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-yellow-200 text-slate-800 text-sm sm:text-base font-medium">
            <p>
              <b>Gợi ý 1:</b> {question.hint1}
            </p>
          </div>
          {hintLevel >= 2 && (
            <div className="p-3 bg-white rounded-xl border border-yellow-200 text-slate-800 text-sm sm:text-base font-medium animate-in fade-in">
              <p>
                <b>Gợi ý 2:</b> {question.hint2}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Solution Display (Xem cách làm) */}
      {showSolution && (
        <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-4 sm:p-5 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 text-sky-950 font-extrabold text-sm sm:text-base">
            <BookMarked className="w-5 h-5 text-sky-600" />
            <span>Lời giải chi tiết:</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-sky-200 text-slate-800 font-mono text-sm sm:text-base whitespace-pre-line leading-relaxed font-semibold">
            {question.solution}
          </div>
        </div>
      )}

      {/* Bottom Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Hint button */}
          <button
            onClick={handleToggleHint}
            className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border transition cursor-pointer shadow-xs ${
              hintLevel > 0
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-amber-800'
            }`}
            title="Mở gợi ý từng mức"
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>{hintLevel === 0 ? 'Gợi ý' : hintLevel === 1 ? 'Thêm gợi ý 2' : 'Đã mở 2 gợi ý'}</span>
          </button>

          {/* Concrete manipulatives button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenManipulatives();
            }}
            className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 transition cursor-pointer shadow-xs"
            title="Mở hình ảnh đồ vật trực quan"
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Em thử bằng đồ vật</span>
          </button>

          {/* Show Solution button */}
          <button
            onClick={handleToggleSolution}
            className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Xem cách làm"
          >
            <Eye className="w-4 h-4 text-slate-600" />
            <span>{showSolution ? 'Ẩn cách làm' : 'Xem cách làm'}</span>
          </button>
        </div>

        {/* Primary Action: Check or Next */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleCheck}
            disabled={!isReadyToCheck}
            className={`px-6 sm:px-8 py-3 rounded-2xl font-extrabold text-sm sm:text-base shadow-md transition cursor-pointer flex items-center gap-2 ${
              isReadyToCheck
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white hover:scale-105 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
            aria-label="Kiểm tra câu trả lời"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Kiểm tra</span>
          </button>

          {attempt.isCompleted && questionIndex < totalQuestions - 1 && (
            <button
              onClick={() => {
                sound.playPop();
                onNextQuestion();
              }}
              className="px-5 sm:px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm sm:text-base shadow-md transition cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <span>Câu tiếp</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
