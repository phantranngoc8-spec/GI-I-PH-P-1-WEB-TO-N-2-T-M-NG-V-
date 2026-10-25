import React from 'react';
import { Play, BookOpen, GraduationCap, LayoutGrid, Sparkles, School, User, Award } from 'lucide-react';
import { CharacterNam, CharacterMai } from './Characters';
import { sound } from '../utils/audio';

interface HomeScreenProps {
  completedCount: number;
  selfMadeScore: number;
  onStart: () => void;
  onOpenGuide: () => void;
  onOpenTeacher: () => void;
  onOpenStages: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  completedCount,
  selfMadeScore,
  onStart,
  onOpenGuide,
  onOpenTeacher,
  onOpenStages,
}) => {
  const isStarted = completedCount > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-b from-white via-sky-50/60 to-white rounded-3xl border-3 border-sky-200 shadow-xl p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-sky-200/40 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />

        {/* Top Product Pill */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-sm mb-4">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>TOÁN THÔNG MINH 2.0 • BỘ SÁCH KẾT NỐI TRI THỨC</span>
        </div>

        {/* Title & Slogan according to specification */}
        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-sky-950 tracking-tight mb-3">
          CHẶNG 4 – VẬN DỤNG
        </h1>
        <p className="font-display font-extrabold text-xl sm:text-2xl text-sky-700 mb-6">
          “Cùng Nam và Mai giải những bài toán quanh em!”
        </p>

        {/* Short Guide Banner according to specification */}
        <div className="max-w-2xl mx-auto bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 sm:p-4 mb-8 shadow-xs">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
            Quy trình thực hiện mỗi câu:
          </div>
          <div className="text-sm sm:text-base font-extrabold text-amber-950 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
              Đọc tình huống
            </span>
            <span className="text-amber-500 font-black">→</span>
            <span className="bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
              Chọn phép tính
            </span>
            <span className="text-amber-500 font-black">→</span>
            <span className="bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
              Điền đáp số
            </span>
            <span className="text-amber-500 font-black">→</span>
            <span className="bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
              Giải thích
            </span>
          </div>
        </div>

        {/* Characters Presentation */}
        <div className="flex items-end justify-center gap-6 sm:gap-14 mb-8">
          <CharacterNam size="lg" speech="Chào bạn, mình là Nam!" />
          <div className="hidden sm:flex flex-col items-center justify-center p-4 bg-sky-100/70 rounded-2xl border border-sky-200 text-sky-900 text-xs font-bold max-w-[200px] text-center mb-6">
            <Award className="w-6 h-6 text-amber-500 mb-1" />
            <span>10 tình huống thực tế hấp dẫn đang chờ em!</span>
          </div>
          <CharacterMai size="lg" speech="Cùng mình tính toán nhé!" />
        </div>

        {/* Action Buttons according to specification */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
          {/* Main Start / Continue Button */}
          <button
            onClick={() => {
              sound.playPop();
              onStart();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-display font-black text-lg sm:text-xl shadow-lg shadow-sky-200 transition transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>{isStarted ? 'Tiếp tục làm bài' : 'Bắt đầu ngay'}</span>
          </button>

          {/* Guide Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenGuide();
            }}
            className="px-6 py-3.5 rounded-2xl bg-yellow-100 hover:bg-yellow-200 text-amber-950 font-bold text-sm sm:text-base border-2 border-yellow-300 transition cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <BookOpen className="w-5 h-5 text-amber-700" />
            <span>Hướng dẫn</span>
          </button>

          {/* Teacher Corner Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenTeacher();
            }}
            className="px-6 py-3.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-sm sm:text-base border-2 border-emerald-300 transition cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <GraduationCap className="w-5 h-5 text-emerald-700" />
            <span>Góc giáo viên</span>
          </button>
        </div>

        {/* 4 Stages Quick Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              sound.playPop();
              onOpenStages();
            }}
            className="text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Xem tổng quan lộ trình 4 chặng</span>
          </button>
        </div>
      </div>

      {/* Teacher & School Info Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-2 text-slate-700 font-bold">
          <User className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Giáo viên thiết kế: <b>Trần Ngọc Phan</b></span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <School className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Trường TH & THCS Thổ Sơn, xã Hòn Đất, tỉnh An Giang</span>
        </div>
      </div>
    </div>
  );
};
