import React from 'react';
import { X, Sparkles, HelpCircle } from 'lucide-react';
import { QuestionData } from '../types/math';
import { sound } from '../utils/audio';

interface ManipulativesModalProps {
  question: QuestionData;
  onClose: () => void;
}

export const ManipulativesModal: React.FC<ManipulativesModalProps> = ({ question, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manipulative-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-sky-300 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 p-4 text-white flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 id="manipulative-title" className="font-display font-extrabold text-lg sm:text-xl">
                Em thử bằng đồ vật trực quan
              </h3>
              <p className="text-xs text-sky-100 font-medium">
                {question.code} - {question.title}
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

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-slate-800 text-sm sm:text-base flex items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sky-900">Tình huống: </span>
              {question.story} <b className="text-sky-700">{question.questionText}</b>
            </div>
          </div>

          {/* Visual Canvas for the specific question */}
          <div className="border-2 border-dashed border-sky-200 rounded-2xl p-4 sm:p-6 bg-slate-50/60">
            {renderManipulativeContent(question)}
          </div>

          {/* Pedagogical Notice */}
          <div className="text-center text-xs text-slate-500 bg-amber-50 border border-amber-200 p-2.5 rounded-xl font-medium">
            💡 Em hãy quan sát số lượng đồ vật, đếm và thử gộp hoặc bớt để tìm ra câu trả lời nhé!
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end rounded-b-2xl">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm sm:text-base shadow-sm transition cursor-pointer"
          >
            Đã hiểu, em tự giải tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

function renderManipulativeContent(question: QuestionData) {
  switch (question.id) {
    case 1:
      // Giỏ hoa: 8 hoa ban đầu + 5 hoa tặng thêm
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Mai có 8 bông hoa hồng, Nam tặng thêm 5 bông hoa cúc vàng
          </div>
          <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
            <div className="text-xs font-extrabold text-pink-700 mb-2 flex items-center justify-between">
              <span>🌸 Hoa của Mai (8 bông ban đầu):</span>
              <span className="bg-pink-100 px-2 py-0.5 rounded-full">8 bông</span>
            </div>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-2xl bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-2xl shadow-xs">
                    🌸
                  </div>
                  <span className="text-[10px] font-bold text-pink-800 mt-0.5">{i + 1}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className="text-xs font-extrabold text-amber-700 mb-2 flex items-center justify-between">
                <span>🌼 Nam tặng thêm (5 bông hoa vàng):</span>
                <span className="bg-amber-100 px-2 py-0.5 rounded-full">5 bông</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-2xl bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-2xl shadow-xs">
                      🌼
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 mt-0.5">+{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 font-semibold text-center">
              👉 Cách tạo thành 10: Lấy 2 bông hoa vàng gộp với 8 bông hoa hồng thành <b>10</b> bông, còn lại 3 bông. Tổng là <b>10 + 3 = 13</b> bông hoa.
            </div>
          </div>
        </div>
      );

    case 2:
      // Hộp bút chì: 13 chiếc, lấy ra 5 chiếc
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Ban đầu trong hộp có 13 chiếc bút chì. Bình lấy ra 5 chiếc.
          </div>
          <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-3">
              <span>Đang có: 13 chiếc</span>
              <span className="text-rose-600 font-extrabold">Bớt đi: 5 chiếc (có dấu gạch chéo)</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 sm:gap-2.5">
              {Array.from({ length: 13 }).map((_, i) => {
                const isTakenOut = i >= 8; // last 5 taken out
                return (
                  <div
                    key={i}
                    className={`relative p-2 rounded-xl flex flex-col items-center justify-center border-2 transition ${
                      isTakenOut
                        ? 'bg-rose-50 border-rose-300 opacity-60'
                        : 'bg-emerald-50 border-emerald-300'
                    }`}
                  >
                    <span className="text-2xl">✏️</span>
                    <span className={`text-[10px] font-extrabold mt-0.5 ${isTakenOut ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {i + 1}
                    </span>
                    {isTakenOut && (
                      <div className="absolute inset-0 flex items-center justify-center text-rose-600 font-black text-xl">
                        ✕
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold text-center">
              👉 Đếm số bút chì còn lại chưa bị gạch: còn đúng <b>8</b> chiếc bút chì!
            </div>
          </div>
        </div>
      );

    case 3:
      // Góc đọc sách: Ngăn trên 7 quyển, ngăn dưới 6 quyển
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Giá sách có hai ngăn: Cần gộp cả hai ngăn lại!
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border-4 border-amber-300 space-y-4 shadow-sm">
            {/* Top Shelf */}
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <div className="text-xs font-extrabold text-blue-700 mb-2">Ngăn trên: 7 quyển sách 📘</div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-10 h-12 bg-blue-500 rounded-lg border-2 border-blue-600 flex items-center justify-center text-white text-lg shadow-xs">
                      📘
                    </div>
                    <span className="text-[10px] font-bold text-blue-800">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Shelf */}
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <div className="text-xs font-extrabold text-orange-700 mb-2">Ngăn dưới: 6 quyển sách 📙</div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-10 h-12 bg-orange-500 rounded-lg border-2 border-orange-600 flex items-center justify-center text-white text-lg shadow-xs">
                      📙
                    </div>
                    <span className="text-[10px] font-bold text-orange-800">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl text-xs text-amber-900 font-semibold text-center border border-amber-200">
              👉 Tách 6 thành 3 và 3: Gộp 7 với 3 thành <b>10</b>, 10 cộng 3 thành <b>13</b> quyển.
            </div>
          </div>
        </div>
      );

    case 4:
      // Giỏ cam: 15 quả, lấy 7 quả
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Giỏ có 15 quả cam. Mẹ lấy ra 7 quả để mời khách.
          </div>
          <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-3">
              <span>Tổng số cam trong giỏ: 15 quả</span>
              <span className="text-orange-700 font-extrabold">Đã lấy ra: 7 quả</span>
            </div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {Array.from({ length: 15 }).map((_, i) => {
                const isTaken = i >= 8;
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-xl flex flex-col items-center justify-center border-2 transition ${
                      isTaken
                        ? 'bg-orange-50/50 border-dashed border-orange-300 opacity-50'
                        : 'bg-orange-100 border-orange-400'
                    }`}
                  >
                    <span className="text-2xl">🍊</span>
                    <span className="text-[10px] font-bold text-orange-900">{i + 1}</span>
                    {isTaken && <span className="text-[10px] text-rose-600 font-bold">Mời khách</span>}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-950 font-semibold text-center">
              👉 Bớt 7 từ 15: Tách 7 thành 5 và 2. Lấy 15 - 5 = 10, rồi 10 - 2 = <b>8</b> quả cam còn lại.
            </div>
          </div>
        </div>
      );

    case 5:
      // Khối gỗ xây nhà: 9 đỏ + 5 xanh
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Gộp 9 khối gỗ đỏ và 5 khối gỗ xanh để xây nhà
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <div className="text-xs font-extrabold text-red-700 mb-1.5">9 Khối gỗ màu đỏ 🟥:</div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-xl bg-red-500 border-2 border-red-600 flex items-center justify-center text-white font-black text-sm shadow-xs"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <div className="text-xs font-extrabold text-blue-700 mb-1.5">5 Khối gỗ màu xanh 🟦:</div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-xl bg-blue-500 border-2 border-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs"
                  >
                    +{i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 font-semibold text-center border border-slate-200">
              👉 Lấy 1 khối xanh ghép với 9 khối đỏ thành <b>10</b> khối, còn lại 4 khối xanh. Tổng cộng là <b>14</b> khối gỗ.
            </div>
          </div>
        </div>
      );

    case 6:
      // Nhãn vở của Lan: 14 nhãn, tặng bạn 6 nhãn
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Lan có 14 nhãn vở, đã tặng bạn 6 nhãn vở
          </div>
          <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-xs">
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const isGiven = i >= 8;
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center text-center ${
                      isGiven
                        ? 'bg-purple-50/50 border-dashed border-purple-300 opacity-60'
                        : 'bg-purple-100 border-purple-400'
                    }`}
                  >
                    <span className="text-xl">🏷️</span>
                    <span className="text-[10px] font-bold text-purple-900">{i + 1}</span>
                    {isGiven && <span className="text-[9px] text-rose-600 font-extrabold">Đã tặng</span>}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-purple-50 rounded-xl text-xs text-purple-950 font-semibold text-center border border-purple-200">
              👉 Bớt 6 nhãn vở từ 14: Tách 6 thành 4 và 2. Lấy 14 - 4 = 10, rồi 10 - 2 = <b>8</b> nhãn vở.
            </div>
          </div>
        </div>
      );

    case 7:
      // Chăm sóc cây: Tổ 1 có 6 cây. Tổ 2 nhiều hơn 7 cây.
      // Yêu cầu đặc biệt: minh họa số cây của Tổ Một và phần nhiều hơn của Tổ Hai, không vẽ 7 thành toàn bộ số cây của Tổ Hai.
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Minh họa số cây Tổ Một và Tổ Hai (Tổ Hai trồng nhiều hơn Tổ Một 7 cây)
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs space-y-4">
            {/* Tổ Một: 6 cây */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-xs font-extrabold text-emerald-800 mb-1 flex items-center justify-between">
                <span>🌱 Tổ Một trồng:</span>
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">6 cây hoa</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-2xl">🌷</span>
                    <span className="text-[10px] font-bold text-emerald-800">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tổ Hai: 6 cây (bằng tổ 1) + 7 cây (phần nhiều hơn) = 13 cây */}
            <div className="p-3 bg-sky-50 rounded-xl border-2 border-sky-300">
              <div className="text-xs font-extrabold text-sky-900 mb-1 flex items-center justify-between">
                <span>🌸 Tổ Hai trồng: Gồm phần bằng Tổ Một + Phần nhiều hơn</span>
                <span className="bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full font-black">
                  6 + 7 = 13 cây hoa
                </span>
              </div>

              {/* Phần 1: Bằng Tổ Một (6 cây) */}
              <div className="mb-2">
                <span className="text-[11px] font-bold text-slate-600">Phần bằng Tổ Một (6 cây):</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center bg-white p-1 rounded-lg border border-sky-200">
                      <span className="text-2xl">🌷</span>
                      <span className="text-[10px] font-bold text-sky-800">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phần 2: Nhiều hơn (7 cây) */}
              <div className="border-t border-dashed border-sky-300 pt-2">
                <span className="text-[11px] font-bold text-amber-700">Phần trồng nhiều hơn (+ 7 cây):</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center bg-amber-50 p-1 rounded-lg border border-amber-300">
                      <span className="text-2xl">🌻</span>
                      <span className="text-[10px] font-bold text-amber-800">+{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-950 font-semibold text-center border border-amber-200">
              ⚠️ <b>Lưu ý:</b> Số cây Tổ Hai không phải chỉ là 7 cây! Tổ Hai trồng được tất cả là 6 + 7 = <b>13</b> cây hoa.
            </div>
          </div>
        </div>
      );

    case 8:
      // Quả bóng của hai nhóm: Nam 12 quả, Mai 8 quả.
      // Yêu cầu đặc biệt: dùng hai hàng bóng ghép tương ứng để thể hiện phần chênh lệch.
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Ghép tương ứng từng cặp bóng của Nhóm Nam và Nhóm Mai
          </div>
          <div className="bg-white p-4 rounded-xl border border-sky-200 shadow-xs space-y-4">
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[420px] space-y-3">
                {/* Hàng 1: Nhóm Nam (12 quả) */}
                <div>
                  <div className="text-xs font-extrabold text-blue-800 mb-1">⚽ Nhóm Nam: 12 quả bóng</div>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const isExtra = i >= 8;
                      return (
                        <div
                          key={i}
                          className={`w-9 h-11 rounded-xl flex flex-col items-center justify-center border-2 ${
                            isExtra
                              ? 'bg-amber-100 border-amber-400 scale-105'
                              : 'bg-blue-50 border-blue-300'
                          }`}
                        >
                          <span className="text-lg">⚽</span>
                          <span className={`text-[9px] font-extrabold ${isExtra ? 'text-amber-800' : 'text-blue-700'}`}>
                            {i + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Đường nối ghép 1-1 */}
                <div className="flex items-center gap-1.5 pl-2 text-slate-400 text-xs font-mono">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-9 text-center font-bold text-slate-400">
                      ↕️
                    </div>
                  ))}
                  <div className="pl-4 text-xs font-extrabold text-amber-700">
                    ← Phần ghép đôi (8 cặp) | Phần nhiều hơn (4 quả) →
                  </div>
                </div>

                {/* Hàng 2: Nhóm Mai (8 quả) */}
                <div>
                  <div className="text-xs font-extrabold text-pink-800 mb-1">🏐 Nhóm Mai: 8 quả bóng</div>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-9 h-11 rounded-xl flex flex-col items-center justify-center bg-pink-50 border-2 border-pink-300"
                      >
                        <span className="text-lg">🏐</span>
                        <span className="text-[9px] font-extrabold text-pink-700">{i + 1}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1.5 pl-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-9 h-11 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 text-xs"
                        >
                          (thiếu)
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-950 font-semibold text-center border border-amber-200">
              👉 8 quả bóng của Mai ghép đôi vừa vặn với 8 quả của Nam. Nhóm Nam còn thừa ra <b>4</b> quả bóng. Vậy nhóm Nam nhiều hơn <b>4</b> quả bóng!
            </div>
          </div>
        </div>
      );

    case 9:
      // Quyển truyện: Sáng 8 trang, chiều 9 trang
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Tổng số trang truyện Mai đọc cả hai buổi (Sáng 8 trang + Chiều 9 trang)
          </div>
          <div className="bg-white p-4 rounded-xl border border-sky-200 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="text-xs font-extrabold text-amber-900 mb-1.5">🌅 Buổi sáng: 8 trang</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="p-1.5 bg-white rounded-lg border border-amber-200 text-center font-bold text-xs text-amber-900">
                      Trang {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="text-xs font-extrabold text-indigo-900 mb-1.5">🌇 Buổi chiều: 9 trang mới</div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="p-1.5 bg-white rounded-lg border border-indigo-200 text-center font-bold text-xs text-indigo-900">
                      Trang +{i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-sky-50 rounded-xl text-xs text-sky-950 font-semibold text-center border border-sky-200">
              👉 Tách 9 trang buổi chiều thành 2 và 7. Gộp 8 với 2 thành <b>10</b>. Sau đó 10 + 7 = <b>17</b> trang truyện.
            </div>
          </div>
        </div>
      );

    case 10:
      // Bổ sung bút màu: Có 9 chiếc, muốn đủ 16 chiếc
      // Yêu cầu đặc biệt: minh họa số đang có và các vị trí còn thiếu đến số cần có.
      return (
        <div className="space-y-4">
          <div className="text-center font-bold text-slate-700 text-sm sm:text-base">
            Hộp cần đủ 16 chiếc bút màu. Đang có 9 chiếc, cần thêm bao nhiêu chiếc nữa?
          </div>
          <div className="bg-white p-4 rounded-xl border border-violet-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-emerald-700">Đã có trong hộp: 9 chiếc</span>
              <span className="text-amber-700">Các vị trí còn trống cần thêm: ?</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {Array.from({ length: 16 }).map((_, i) => {
                const hasPen = i < 9;
                return (
                  <div
                    key={i}
                    className={`h-16 rounded-xl flex flex-col items-center justify-center border-2 transition ${
                      hasPen
                        ? 'bg-emerald-50 border-emerald-400'
                        : 'bg-amber-50/70 border-2 border-dashed border-amber-400'
                    }`}
                  >
                    <span className="text-xl">{hasPen ? '🖍️' : '❓'}</span>
                    <span className={`text-[10px] font-extrabold ${hasPen ? 'text-emerald-800' : 'text-amber-800'}`}>
                      {hasPen ? `Có sẵn ${i + 1}` : `Thêm ${i - 9 + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-950 font-semibold text-center border border-amber-200">
              👉 Đếm các ô trống có dấu hỏi chấm: Cần thêm đúng <b>7</b> chiếc bút nữa để có đủ 16 chiếc (9 + 7 = 16)!
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
