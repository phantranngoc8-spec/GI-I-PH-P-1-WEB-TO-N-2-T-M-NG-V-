import { QuestionAttempt, SessionResult } from '../types/math';
import { QUESTIONS } from '../data/questions';

const STORAGE_KEY_CURRENT = 'toanthongminh_chang4_current';
const STORAGE_KEY_SESSIONS = 'toanthongminh_chang4_sessions';
const STORAGE_KEY_TEACHER_COMMENTS = 'toanthongminh_chang4_comments';

export function getInitialAttempts(): Record<number, QuestionAttempt> {
  const attempts: Record<number, QuestionAttempt> = {};
  QUESTIONS.forEach((q) => {
    attempts[q.id] = {
      questionId: q.id,
      selectedExpr: null,
      submittedAnswer: '',
      selectedReason: null,
      studentNote: '',
      firstSelectedExpr: null,
      firstSubmittedAnswer: null,
      firstSelectedReason: null,
      firstExprCorrect: null,
      firstAnswerCorrect: null,
      firstReasonCorrect: null,
      usedHint1: false,
      usedHint2: false,
      usedManipulatives: false,
      usedSolution: false,
      checkCount: 0,
      isCompleted: false,
      earnedSelfPoint: false,
    };
  });
  return attempts;
}

export function loadCurrentAttempts(): Record<number, QuestionAttempt> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (!raw) return getInitialAttempts();
    const parsed = JSON.parse(raw);
    const initial = getInitialAttempts();
    return { ...initial, ...parsed };
  } catch (e) {
    console.error('Lỗi khi đọc dữ liệu lượt học hiện tại:', e);
    return getInitialAttempts();
  }
}

export function saveCurrentAttempts(attempts: Record<number, QuestionAttempt>): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(attempts));
    return true;
  } catch (e) {
    console.error('Lỗi khi lưu dữ liệu:', e);
    return false;
  }
}

export function loadSessions(): SessionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Lỗi khi đọc lịch sử học tập:', e);
    return [];
  }
}

export function saveSession(session: SessionResult): boolean {
  try {
    const sessions = loadSessions();
    const updated = [session, ...sessions.filter((s) => s.id !== session.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Lỗi khi lưu phiên học:', e);
    return false;
  }
}

export function clearSessions(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY_SESSIONS);
    return true;
  } catch (e) {
    console.error('Lỗi khi xóa lịch sử:', e);
    return false;
  }
}

export function loadTeacherComments(): Record<number, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEACHER_COMMENTS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Lỗi khi đọc nhận xét giáo viên:', e);
    return {};
  }
}

export function saveTeacherComment(questionId: number, comment: string): boolean {
  try {
    const comments = loadTeacherComments();
    comments[questionId] = comment;
    localStorage.setItem(STORAGE_KEY_TEACHER_COMMENTS, JSON.stringify(comments));
    return true;
  } catch (e) {
    console.error('Lỗi khi lưu nhận xét giáo viên:', e);
    return false;
  }
}

export function exportResultsToCSV(session: SessionResult, teacherComments: Record<number, string>): void {
  // Format with UTF-8 BOM so Excel opens Vietnamese characters correctly
  const BOM = '\uFEFF';
  const headers = [
    'Câu',
    'Tên bài toán',
    'Phép tính đúng',
    'Đáp án đúng',
    'Đơn vị',
    'Chọn phép tính (lần 1)',
    'Kết quả phép tính',
    'Điền đáp số (lần 1)',
    'Kết quả đáp số',
    'Chọn lý do (lần 1)',
    'Kết quả lý do',
    'Số lần kiểm tra',
    'Dùng gợi ý 1',
    'Dùng gợi ý 2',
    'Dùng đồ vật',
    'Xem lời giải',
    'Điểm tự làm',
    'Hoàn thành',
    'Lời giải thích thêm của học sinh',
    'Nhận xét của giáo viên',
  ];

  const rows: string[][] = [headers];

  QUESTIONS.forEach((q) => {
    const att = session.attempts[q.id];
    const teacherNote = teacherComments[q.id] || '';

    const firstExprText = att?.firstSelectedExpr
      ? q.choices.find((c) => c.id === att.firstSelectedExpr)?.text || att.firstSelectedExpr
      : 'Chưa làm';

    const row = [
      q.code,
      `"${q.title}"`,
      `"${q.choices.find((c) => c.id === q.correctChoice)?.text || q.correctChoice}"`,
      `${q.correctAnswer}`,
      `"${q.unit}"`,
      `"${firstExprText}"`,
      att?.firstExprCorrect === true ? 'ĐÚNG' : att?.firstExprCorrect === false ? 'SAI' : 'Chưa làm',
      `"${att?.firstSubmittedAnswer ?? 'Chưa điền'}"`,
      att?.firstAnswerCorrect === true ? 'ĐÚNG' : att?.firstAnswerCorrect === false ? 'SAI' : 'Chưa làm',
      att?.firstSelectedReason ?? 'Chưa chọn',
      att?.firstReasonCorrect === true ? 'ĐÚNG' : att?.firstReasonCorrect === false ? 'SAI' : 'Chưa làm',
      `${att?.checkCount || 0}`,
      att?.usedHint1 ? 'Có' : 'Không',
      att?.usedHint2 ? 'Có' : 'Không',
      att?.usedManipulatives ? 'Có' : 'Không',
      att?.usedSolution ? 'Có' : 'Không',
      att?.earnedSelfPoint ? '1' : '0',
      att?.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành',
      `"${(att?.studentNote || '').replace(/"/g, '""')}"`,
      `"${teacherNote.replace(/"/g, '""')}"`,
    ];
    rows.push(row);
  });

  const summaryRows = [
    [],
    ['TỔNG HỢP KẾT QUẢ CHẶNG 4 - VẬN DỤNG'],
    ['Thời gian', new Date(session.timestamp).toLocaleString('vi-VN')],
    ['Tổng điểm tự làm', `${session.selfMadeScore} / 10`],
    ['Số câu hoàn thành', `${session.completedQuestions} / 10`],
    ['Đúng phép tính lần 1', `${session.firstCorrectExprCount} / 10`],
    ['Đúng đáp số lần 1', `${session.firstCorrectAnswerCount} / 10`],
    ['Đúng lý do lần 1', `${session.firstCorrectReasonCount} / 10`],
    ['Số câu có dùng hỗ trợ', `${session.supportedQuestionCount} / 10`],
  ];

  summaryRows.forEach((r) => rows.push(r));

  const csvContent = BOM + rows.map((e) => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Ket_qua_ToanThongMinh_Chang4_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
