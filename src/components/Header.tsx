import React from 'react';
import { Volume2, VolumeX, BookOpen, GraduationCap, LayoutGrid, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
  onOpenTeacher: () => void;
  onOpenStages: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenGuide,
  onOpenTeacher,
  onOpenStages,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-sky-100 shadow-sm transition-all">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group transition cursor-pointer"
          aria-label="Về trang chủ Toán Thông Minh"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-200 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display font-extrabold text-lg sm:text-xl text-sky-900 tracking-tight">
                TOÁN THÔNG MINH
              </span>
              <span className="text-xs font-black bg-amber-400 text-amber-950 px-2 py-0.5 rounded-lg shadow-xs">
                2.0
              </span>
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-sky-600 flex items-center gap-1">
              <span>Chặng 4: Vận dụng</span>
              <span className="text-slate-300">•</span>
              <span className="hidden md:inline text-slate-500 font-medium">Toán lớp 2 - Kết nối tri thức</span>
            </div>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border transition cursor-pointer ${
              soundEnabled
                ? 'bg-sky-50 border-sky-300 text-sky-700 hover:bg-sky-100'
                : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Đang bật âm thanh (Bấm để tắt)' : 'Đang tắt âm thanh (Bấm để bật)'}
            aria-label="Bật hoặc tắt âm thanh"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline">Âm thanh</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Tắt tiếng</span>
              </>
            )}
          </button>

          {/* Guide Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenGuide();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-amber-900 transition cursor-pointer shadow-xs"
            title="Hướng dẫn làm bài"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Hướng dẫn</span>
          </button>

          {/* 4 Stages Overview */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenStages();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-300 text-sky-800 transition cursor-pointer shadow-xs"
            title="Tổng quan 4 chặng"
          >
            <LayoutGrid className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">4 Chặng</span>
          </button>

          {/* Teacher Corner */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenTeacher();
            }}
            className="p-2 sm:px-3.5 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xs transition cursor-pointer"
            title="Góc giáo viên"
          >
            <GraduationCap className="w-4 h-4 text-emerald-100" />
            <span className="hidden sm:inline">Góc giáo viên</span>
          </button>
        </div>
      </div>
    </header>
  );
};
