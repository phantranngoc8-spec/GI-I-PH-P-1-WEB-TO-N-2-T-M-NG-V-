import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Download,
  Trash2,
  CheckSquare,
  BookOpen,
  MessageCircle,
  FileSpreadsheet,
  AlertTriangle,
  Save,
  Check,
} from 'lucide-react';
import { QuestionAttempt, SessionResult } from '../types/math';
import { QUESTIONS } from '../data/questions';
import { exportResultsToCSV, saveTeacherComment } from '../utils/storage';
import { sound } from '../utils/audio';

interface TeacherCornerProps {
  currentAttempts: Record<number, QuestionAttempt>;
  sessions: SessionResult[];
  teacherComments: Record<number, string>;
  onUpdateTeacherComment: (qId: number, comment: string) => void;
  onClearSessions: () => void;
  onClose: () => void;
}

export const TeacherCorner: React.FC<TeacherCornerProps> = ({
  currentAttempts,
  sessions,
  teacherComments,
  onUpdateTeacherComment,
  onClearSessions,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'results' | 'bank' | 'checklist' | 'history'>('results');
  const [savedNotif, setSavedNotif] = useState<number | null>(null);

  const handleSaveComment = (qId: number, comment: string) => {
    onUpdateTeacherComment(qId, comment);
    saveTeacherComment(qId, comment);
    setSavedNotif(qId);
    setTimeout(() => setSavedNotif(null), 2000);
  };

  const handleExportCSV = () => {
    sound.playPop();
    // Build a current session snapshot for export
    const completedCount = Object.values(currentAttempts).filter((a) => a.isCompleted).length;
    const selfMadeScore = Object.values(currentAttempts).filter((a) => a.earnedSelfPoint).length;
    const firstExpr = Object.values(currentAttempts).filter((a) => a.firstExprCorrect === true).length;
    const firstAns = Object.values(currentAttempts).filter((a) => a.firstAnswerCorrect === true).length;
    const firstReason = Object.values(currentAttempts).filter((a) => a.firstReasonCorrect === true).length;
    const supported = Object.values(currentAttempts).filter(
      (a) => a.usedHint1 || a.usedHint2 || a.usedManipulatives || a.usedSolution
    ).length;

    const currentSession: SessionResult = {
      id: `current_${Date.now()}`,
      timestamp: Date.now(),
      stageId: 4,
      totalQuestions: 10,
      completedQuestions: completedCount,
      selfMadeScore: selfMadeScore,
      firstCorrectExprCount: firstExpr,
      firstCorrectAnswerCount: firstAns,
      firstCorrectReasonCount: firstReason,
      supportedQuestionCount: supported,
      attempts: currentAttempts,
      teacherComments,
    };

    exportResultsToCSV(currentSession, teacherComments);
  };

  const handleClearHistoryConfirm = () => {
    if (window.confirm('Thầy/Cô có chắc chắn muốn xóa toàn bộ lịch sử các lượt học trên trình duyệt này?')) {
      onClearSessions();
      sound.playPop();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden border-4 border-emerald-400 shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <GraduationCap className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h2 id="teacher-modal-title" className="font-display font-extrabold text-lg sm:text-xl">
                Góc Giáo Viên - Toán Thông Minh 2.0
              </h2>
              <p className="text-xs text-emerald-100">
                GV: Trần Ngọc Phan • Trường TH & THCS Thổ Sơn, Hòn Đất, An Giang
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 overflow-x-auto gap-2">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('results');
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-t-2 border-x-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'results'
                ? 'bg-white border-emerald-400 text-emerald-800 -mb-px'
                : 'bg-slate-100 border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Kết quả lượt hiện tại</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('bank');
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-t-2 border-x-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'bank'
                ? 'bg-white border-emerald-400 text-emerald-800 -mb-px'
                : 'bg-slate-100 border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Ngân hàng 10 câu & Đáp án</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('checklist');
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-t-2 border-x-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-white border-emerald-400 text-emerald-800 -mb-px'
                : 'bg-slate-100 border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Bảng kiểm sư phạm</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('history');
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-t-2 border-x-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-white border-emerald-400 text-emerald-800 -mb-px'
                : 'bg-slate-100 border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Lịch sử ({sessions.length})</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Important Pedagogical Banner Required by Prompt */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 text-amber-950 text-xs sm:text-sm flex items-start gap-2.5 font-medium shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <b>Lưu ý sư phạm quan trọng:</b> Chọn đúng lý do chưa thay thế việc giải thích bằng lời. Giáo viên cần trao đổi với học sinh để kiểm tra mức độ hiểu sâu sắc của từng em.
            </div>
          </div>

          {/* TAB 1: Current Results */}
          {activeTab === 'results' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                  Chi tiết 3 thành phần & Nhận xét cho từng câu
                </h3>
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  title="Xuất file CSV mở chuẩn trên Microsoft Excel"
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất CSV (UTF-8 BOM)</span>
                </button>
              </div>

              <div className="space-y-4">
                {QUESTIONS.map((q) => {
                  const att = currentAttempts[q.id];
                  const comment = teacherComments[q.id] || '';

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-300 transition space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-sky-100 text-sky-800 font-black text-xs px-2 py-0.5 rounded-lg">
                            {q.code}
                          </span>
                          <span className="font-extrabold text-sm sm:text-base text-slate-900">
                            {q.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              att?.earnedSelfPoint
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            Điểm tự làm: {att?.earnedSelfPoint ? '1 điểm' : '0 điểm'}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            Số lần kiểm tra: {att?.checkCount || 0}
                          </span>
                        </div>
                      </div>

                      {/* 3 Components Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div
                          className={`p-2.5 rounded-xl border ${
                            att?.firstExprCorrect === true
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : att?.firstExprCorrect === false
                              ? 'bg-rose-50 border-rose-300 text-rose-900'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="font-bold">1. Phép tính (lần 1):</div>
                          <div className="font-mono text-sm mt-0.5">
                            {att?.firstSelectedExpr
                              ? `Đã chọn ${att.firstSelectedExpr} (${att.firstExprCorrect ? 'ĐÚNG' : 'SAI'})`
                              : 'Chưa làm'}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Đáp án: {q.choices.find((c) => c.id === q.correctChoice)?.text}
                          </div>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border ${
                            att?.firstAnswerCorrect === true
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : att?.firstAnswerCorrect === false
                              ? 'bg-rose-50 border-rose-300 text-rose-900'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="font-bold">2. Đáp số (lần 1):</div>
                          <div className="font-mono text-sm mt-0.5">
                            {att?.firstSubmittedAnswer
                              ? `${att.firstSubmittedAnswer} ${q.unit} (${att.firstAnswerCorrect ? 'ĐÚNG' : 'SAI'})`
                              : 'Chưa điền'}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Đáp án: {q.correctAnswer} {q.unit}
                          </div>
                        </div>

                        <div
                          className={`p-2.5 rounded-xl border ${
                            att?.firstReasonCorrect === true
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : att?.firstReasonCorrect === false
                              ? 'bg-rose-50 border-rose-300 text-rose-900'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="font-bold">3. Lý do (lần 1):</div>
                          <div className="font-mono text-sm mt-0.5">
                            {att?.firstSelectedReason
                              ? `Thẻ ${att.firstSelectedReason} (${att.firstReasonCorrect ? 'ĐÚNG' : 'SAI'})`
                              : 'Chưa chọn'}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Đáp án: Thẻ {q.correctReason}
                          </div>
                        </div>
                      </div>

                      {/* Supports used */}
                      <div className="text-xs text-slate-500 flex flex-wrap gap-2">
                        <span>Hỗ trợ đã dùng:</span>
                        {att?.usedHint1 && <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Gợi ý 1</span>}
                        {att?.usedHint2 && <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Gợi ý 2</span>}
                        {att?.usedManipulatives && (
                          <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">Đồ vật trực quan</span>
                        )}
                        {att?.usedSolution && (
                          <span className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">Xem cách làm</span>
                        )}
                        {!att?.usedHint1 && !att?.usedHint2 && !att?.usedManipulatives && !att?.usedSolution && (
                          <span className="text-emerald-700 font-bold">Không dùng hỗ trợ</span>
                        )}
                      </div>

                      {/* Student's written addition */}
                      {att?.studentNote && (
                        <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs">
                          <span className="font-bold text-blue-900">Em viết thêm: </span>
                          <span className="text-blue-950 italic">"{att.studentNote}"</span>
                        </div>
                      )}

                      {/* Teacher's Local Note Box */}
                      <div className="space-y-1.5 pt-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Nhận xét của giáo viên (lưu cục bộ trên máy):</span>
                          </span>
                          {savedNotif === q.id && (
                            <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                              <Check className="w-3.5 h-3.5" /> Đã lưu
                            </span>
                          )}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            defaultValue={comment}
                            placeholder="Ghi chú nhận xét cách giải thích bằng lời của học sinh..."
                            className="flex-1 px-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-300 focus:border-emerald-500 focus:bg-white outline-none"
                            onBlur={(e) => handleSaveComment(q.id, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                              handleSaveComment(q.id, input.value);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Lưu</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Question Bank with exact solutions & hints */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Ngân hàng chuẩn 10 tình huống toán học thực tế (5 bài phép cộng, 5 bài phép trừ trong phạm vi 20).
              </div>

              <div className="space-y-4">
                {QUESTIONS.map((q) => (
                  <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-sky-500 text-white text-xs font-black px-2 py-0.5 rounded-lg">
                          {q.code}
                        </span>
                        <span className="font-bold text-slate-900">{q.title}</span>
                      </div>
                      <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        {q.type === 'addition' ? 'Phép cộng' : 'Phép trừ'}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {q.story} <b className="text-sky-800">{q.questionText}</b>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200">
                        <div className="font-bold text-sky-900">Phép tính đúng:</div>
                        <div className="font-extrabold text-sm text-sky-700 mt-0.5">
                          Đáp án {q.correctChoice}: {q.choices.find((c) => c.id === q.correctChoice)?.text}
                        </div>
                      </div>

                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="font-bold text-amber-900">Đáp số chuẩn:</div>
                        <div className="font-extrabold text-sm text-amber-700 mt-0.5">
                          {q.correctAnswer} {q.unit}
                        </div>
                      </div>

                      <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-200">
                        <div className="font-bold text-indigo-900">Lý do phù hợp:</div>
                        <div className="font-extrabold text-sm text-indigo-700 mt-0.5">
                          Thẻ {q.correctReason}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>
                        <b>Gợi ý 1:</b> {q.hint1}
                      </div>
                      <div>
                        <b>Gợi ý 2:</b> {q.hint2}
                      </div>
                      <div className="pt-1 text-slate-700">
                        <b>Lời giải chi tiết:</b>
                        <p className="font-mono mt-0.5 text-emerald-800 font-bold whitespace-pre-line">
                          {q.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Pedagogical Checklist (Bảng kiểm giáo viên) */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                Bảng kiểm chuyên môn dành cho giáo viên Toán lớp 2
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Bộ tiêu chí bảo đảm tính chính xác, khoa học và tinh thần của bộ sách Kết nối tri thức với cuộc sống:
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    title: '1. Đề bài đủ dữ kiện, rõ nghĩa',
                    desc: 'Ngữ cảnh gần gũi với lứa tuổi lớp 2 (hoa, bút chì, sách vở, cam, bóng, khối gỗ...). Không gây hiểu lầm hoặc đa nghĩa.',
                  },
                  {
                    title: '2. Mỗi câu chỉ có một phương án phép tính phù hợp',
                    desc: 'Các phương án chỉ hiển thị phép tính biểu thức (không kèm đáp số) để tránh học sinh nhìn số đoán mò.',
                  },
                  {
                    title: '3. Đáp số và đơn vị chính xác',
                    desc: 'Đơn vị tính hiển thị sẵn ngoài ô nhập, đúng với câu hỏi trong bài toán.',
                  },
                  {
                    title: '4. Lý do phù hợp với quan hệ trong tình huống',
                    desc: 'Dựa trên ý nghĩa bản chất: gộp, thêm, bớt, phần chênh lệch hay phần còn thiếu, không suy đoán vô căn cứ.',
                  },
                  {
                    title: '5. Không dạy học sinh chỉ dựa vào một từ khóa',
                    desc: 'Ví dụ: Không phải cứ thấy chữ "thêm" là vội cộng, hay chữ "còn lại" là trừ máy móc; học sinh cần phân tích quan hệ thực sự.',
                  },
                  {
                    title: '6. Hình minh họa đúng quan hệ và số lượng',
                    desc: 'Hình trực quan vẽ chính xác số lượng đếm được. Câu 7 vẽ đủ 6 + 7 cây; câu 8 vẽ 2 hàng bóng ghép đôi chỉ rõ 4 quả chênh lệch; câu 10 vẽ 9 có sẵn và 7 vị trí trống.',
                  },
                  {
                    title: '7. Phù hợp nội dung đã học',
                    desc: 'Các bài toán gắn liền với phép cộng có nhớ và phép trừ có nhớ trong phạm vi 20 đã học ở các chặng trước.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-sm text-emerald-950">{item.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Session History */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">
                    Lịch sử các lượt học trên trình duyệt hiện tại
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dữ liệu được lưu an toàn trong localStorage của thiết bị này.
                  </p>
                </div>
                {sessions.length > 0 && (
                  <button
                    onClick={handleClearHistoryConfirm}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa lịch sử</span>
                  </button>
                )}
              </div>

              {sessions.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  Chưa có lượt học nào được lưu lại từ trước. Khi học sinh hoàn thành chặng, kết quả sẽ xuất hiện tại đây.
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((sess, idx) => (
                    <div
                      key={sess.id || idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          Lượt học lúc: {new Date(sess.timestamp).toLocaleString('vi-VN')}
                        </div>
                        <div className="text-xs text-slate-600 flex items-center gap-3 mt-1 flex-wrap">
                          <span>Điểm tự làm: <b className="text-amber-700">{sess.selfMadeScore}/10</b></span>
                          <span>Đã làm: <b className="text-sky-700">{sess.completedQuestions}/10</b> câu</span>
                          <span>Dùng hỗ trợ: <b>{sess.supportedQuestionCount}</b> câu</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          exportResultsToCSV(sess, teacherComments);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Xuất CSV</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center rounded-b-2xl">
          <span className="text-xs text-slate-500 font-medium">
            Phần mềm dạy học Toán lớp 2 • Trường TH & THCS Thổ Sơn
          </span>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
