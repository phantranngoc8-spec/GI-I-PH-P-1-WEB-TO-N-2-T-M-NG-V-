import React from 'react';
import { X, CheckCircle, Clock, PlayCircle, Award, Sparkles, BookOpen } from 'lucide-react';
import { ALL_STAGES } from '../data/stages';
import { sound } from '../utils/audio';

interface StagesOverviewModalProps {
  currentStageScore: number;
  completedCount: number;
  onSelectStage4: () => void;
  onClose: () => void;
}

export const StagesOverviewModal: React.FC<StagesOverviewModalProps> = ({
  currentStageScore,
  completedCount,
  onSelectStage4,
  onClose,
}) => {
  // Check if all 4 stages are completed to calculate /40 total
  // As per instructions: "Chặng chưa học hiển thị Chưa thực hiện, không tự gán điểm 0. Chỉ tính tổng điểm tự làm trên 40 khi có đủ dữ liệu tương ứng."
  const hasAll4Stages = false; // Chặng 1, 2, 3 are displayed as "Chưa thực hiện"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stages-overview-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-sky-300 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4 text-white flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <BookOpen className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 id="stages-overview-title" className="font-display font-extrabold text-lg sm:text-xl">
                Tổng Quan 4 Chặng - TOÁN THÔNG MINH 2.0
              </h3>
              <p className="text-xs text-sky-100 font-medium">
                Môn Toán Lớp 2 • Bộ sách Kết nối tri thức với cuộc sống
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
        <div className="p-4 sm:p-6 space-y-5">
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-sky-50 border border-sky-200 p-3.5 rounded-2xl">
            Lộ trình học tập gồm 4 chặng xuyên suốt chủ đề phép cộng, phép trừ có nhớ trong phạm vi 20. Kết quả mỗi chặng được theo dõi độc lập.
          </div>

          {/* Stages List */}
          <div className="space-y-3">
            {ALL_STAGES.map((stg) => {
              const isStage4 = stg.id === 4;

              return (
                <div
                  key={stg.id}
                  className={`p-4 rounded-2xl border-2 transition ${
                    isStage4
                      ? 'bg-gradient-to-r from-sky-50 to-blue-50 border-sky-400 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-90'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center ${
                          isStage4 ? 'bg-sky-500 text-white' : 'bg-slate-300 text-slate-700'
                        }`}
                      >
                        {stg.id}
                      </span>
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {stg.name}: <span className="text-sky-800">{stg.topic}</span>
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isStage4 ? (
                        <span className="text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Đang thực hiện ({completedCount}/10 câu)</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Chưa thực hiện</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{stg.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    {isStage4 ? (
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-700">
                          Điểm tự làm: <b className="text-amber-700 font-black">{currentStageScore} / 10</b>
                        </span>
                        <span className="text-slate-500">
                          Hoàn thành: <b>{completedCount} / 10</b>
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">
                        Chưa có dữ liệu điểm (Không gán 0 điểm)
                      </span>
                    )}

                    {isStage4 && (
                      <button
                        onClick={() => {
                          sound.playPop();
                          onSelectStage4();
                          onClose();
                        }}
                        className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs text-xs"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Vào bài học</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 40 Points Rule Note */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Quy tắc ghi nhận điểm 4 chặng:</span>
            </div>
            <p className="text-slate-700">
              Tổng điểm tự làm trên 40 chỉ được tính khi học sinh đã hoàn thành đầy đủ cả 4 chặng. Các chặng chưa học được thể hiện trạng thái <i>Chưa thực hiện</i> để phản ánh trung thực tiến trình của học sinh.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end rounded-b-2xl">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
