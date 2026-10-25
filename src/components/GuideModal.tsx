import React from 'react';
import { X, BookOpen, ArrowRight, Lightbulb, HelpCircle, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface GuideModalProps {
  onClose: () => void;
  onStart: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose, onStart }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border-4 border-amber-300 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-4 text-amber-950 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/40 rounded-xl">
              <BookOpen className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <h3 id="guide-title" className="font-display font-extrabold text-lg sm:text-xl">
                Hướng Dẫn Học Tập
              </h3>
              <p className="text-xs text-amber-900 font-bold">
                Quy trình 3 bước giải quyết bài toán
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center text-amber-950 transition cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 text-slate-700">
          {/* Main flow banner */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-300 p-4 rounded-2xl text-center space-y-2">
            <span className="text-xs font-black uppercase text-sky-800 tracking-wider">
              Khẩu quyết làm bài
            </span>
            <div className="font-display font-extrabold text-base sm:text-lg text-sky-950 flex flex-wrap items-center justify-center gap-2">
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-sky-200">
                Đọc tình huống
              </span>
              <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-sky-200">
                Chọn phép tính
              </span>
              <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-sky-200">
                Điền đáp số
              </span>
              <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-sky-200">
                Giải thích
              </span>
            </div>
          </div>

          {/* 3 Step Details */}
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-sky-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Bước 1: Chọn phép tính
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Đọc kĩ xem tình huống là <b>gộp thêm vào</b> (phép cộng) hay <b>bớt đi, tìm phần chênh lệch, tìm phần còn thiếu</b> (phép trừ). Chọn phương án A, B hoặc C.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Bước 2: Điền đáp số
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Thực hiện tính nhẩm (tạo thành 10 hoặc bớt về 10) và điền số vào ô. Đơn vị đã được ghi sẵn bên cạnh ô số.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-indigo-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Bước 3: Giải thích lý do
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  Chọn thẻ giải thích vì sao em lại làm phép tính đó. Em có thể viết thêm suy nghĩ của mình và chia sẻ cho thầy cô, bạn bè cùng nghe!
                </p>
              </div>
            </div>
          </div>

          {/* Tools Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <b>Nút Gợi ý:</b> Mở lần 1 xem câu hỏi định hướng; mở lần 2 xem mẹo tính tách số tạo 10.
              </div>
            </div>

            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <b>Nút Em thử bằng đồ vật:</b> Mở tranh vẽ đếm trực quan để hiểu tình huống dễ dàng hơn.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-2 rounded-b-2xl">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm transition cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              sound.playPop();
              onStart();
            }}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-sm transition cursor-pointer"
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>
    </div>
  );
};
