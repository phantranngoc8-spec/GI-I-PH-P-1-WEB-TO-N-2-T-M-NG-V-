/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { SummaryScreen } from './components/SummaryScreen';
import { ManipulativesModal } from './components/ManipulativesModal';
import { TeacherCorner } from './components/TeacherCorner';
import { StagesOverviewModal } from './components/StagesOverviewModal';
import { GuideModal } from './components/GuideModal';
import { QUESTIONS } from './data/questions';
import { QuestionAttempt, SessionResult } from './types/math';
import {
  loadCurrentAttempts,
  saveCurrentAttempts,
  getInitialAttempts,
  loadSessions,
  saveSession,
  clearSessions,
  loadTeacherComments,
  saveTeacherComment,
} from './utils/storage';
import { sound } from './utils/audio';

export default function App() {
  // Navigation & View state
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'summary'>('home');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // App data state
  const [attempts, setAttempts] = useState<Record<number, QuestionAttempt>>(() => loadCurrentAttempts());
  const [sessions, setSessions] = useState<SessionResult[]>(() => loadSessions());
  const [teacherComments, setTeacherComments] = useState<Record<number, string>>(() => loadTeacherComments());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.getSoundEnabled());

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState<boolean>(false);
  const [isStagesOpen, setIsStagesOpen] = useState<boolean>(false);
  const [isManipulativesOpen, setIsManipulativesOpen] = useState<boolean>(false);

  // Save current progress whenever attempts change
  useEffect(() => {
    saveCurrentAttempts(attempts);
  }, [attempts]);

  // Handle toggling sound
  const handleToggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  // Update specific question attempt
  const handleUpdateAttempt = (updated: Partial<QuestionAttempt>) => {
    const currentQ = QUESTIONS[currentIndex];
    setAttempts((prev) => {
      const nextAtt = {
        ...prev[currentQ.id],
        ...updated,
      };
      const newAttempts = {
        ...prev,
        [currentQ.id]: nextAtt,
      };

      // Check if session needs snapshot update
      const completedCount = Object.values(newAttempts).filter((a) => a.isCompleted).length;
      if (completedCount === 10) {
        // Record session
        const selfMade = Object.values(newAttempts).filter((a) => a.earnedSelfPoint).length;
        const firstExpr = Object.values(newAttempts).filter((a) => a.firstExprCorrect === true).length;
        const firstAns = Object.values(newAttempts).filter((a) => a.firstAnswerCorrect === true).length;
        const firstReason = Object.values(newAttempts).filter((a) => a.firstReasonCorrect === true).length;
        const supported = Object.values(newAttempts).filter(
          (a) => a.usedHint1 || a.usedHint2 || a.usedManipulatives || a.usedSolution
        ).length;

        const sessionSnapshot: SessionResult = {
          id: `session_${Date.now()}`,
          timestamp: Date.now(),
          stageId: 4,
          totalQuestions: 10,
          completedQuestions: completedCount,
          selfMadeScore: selfMade,
          firstCorrectExprCount: firstExpr,
          firstCorrectAnswerCount: firstAns,
          firstCorrectReasonCount: firstReason,
          supportedQuestionCount: supported,
          attempts: newAttempts,
          teacherComments,
        };
        saveSession(sessionSnapshot);
        setSessions(loadSessions());
      }

      return newAttempts;
    });
  };

  // Handle open manipulatives
  const handleOpenManipulatives = () => {
    const currentQ = QUESTIONS[currentIndex];
    handleUpdateAttempt({ usedManipulatives: true });
    setIsManipulativesOpen(true);
  };

  // Navigate to next question or summary
  const handleNextQuestion = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      sound.playFanfare();
      setCurrentScreen('summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Restart quiz
  const handleRestart = () => {
    const fresh = getInitialAttempts();
    setAttempts(fresh);
    saveCurrentAttempts(fresh);
    setCurrentIndex(0);
    setCurrentScreen('quiz');
  };

  // Review specific question
  const handleReviewQuestion = (idx: number) => {
    setCurrentIndex(idx);
    setCurrentScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all sessions
  const handleClearSessions = () => {
    clearSessions();
    setSessions([]);
  };

  // Save teacher comment
  const handleUpdateTeacherComment = (qId: number, comment: string) => {
    setTeacherComments((prev) => ({
      ...prev,
      [qId]: comment,
    }));
    saveTeacherComment(qId, comment);
  };

  const completedCount = Object.values(attempts).filter((a) => a.isCompleted).length;
  const selfMadeScore = Object.values(attempts).filter((a) => a.earnedSelfPoint).length;
  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100/50 via-sky-50 to-white flex flex-col text-slate-800 antialiased selection:bg-sky-200">
      {/* Global Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenTeacher={() => setIsTeacherOpen(true)}
        onOpenStages={() => setIsStagesOpen(true)}
        onGoHome={() => setCurrentScreen('home')}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 pb-16">
        {currentScreen === 'home' && (
          <HomeScreen
            completedCount={completedCount}
            selfMadeScore={selfMadeScore}
            onStart={() => setCurrentScreen('quiz')}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenTeacher={() => setIsTeacherOpen(true)}
            onOpenStages={() => setIsStagesOpen(true)}
          />
        )}

        {currentScreen === 'quiz' && (
          <div className="space-y-4">
            {/* Top Navigation & Status Bar */}
            <ProgressBar
              currentIndex={currentIndex}
              attempts={attempts}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
            />

            {/* Current Question Workspace */}
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionIndex={currentIndex}
              totalQuestions={QUESTIONS.length}
              attempt={attempts[currentQuestion.id]}
              onUpdateAttempt={handleUpdateAttempt}
              onOpenManipulatives={handleOpenManipulatives}
              onNextQuestion={handleNextQuestion}
            />

            {/* Bottom Quick Jump / View Summary Bar */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600 px-2 pt-2">
              <button
                onClick={() => setCurrentScreen('home')}
                className="hover:text-sky-700 cursor-pointer transition underline underline-offset-4"
              >
                ← Quay lại trang chủ
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setCurrentScreen('summary');
                }}
                className="bg-white hover:bg-sky-50 border border-sky-300 text-sky-800 px-4 py-2 rounded-xl cursor-pointer transition shadow-xs"
              >
                Xem trang tổng kết ({completedCount}/10 câu)
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'summary' && (
          <SummaryScreen
            attempts={attempts}
            onReviewQuestion={handleReviewQuestion}
            onRestart={handleRestart}
            onGoHome={() => setCurrentScreen('home')}
            onOpenTeacher={() => setIsTeacherOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {isManipulativesOpen && (
        <ManipulativesModal
          question={currentQuestion}
          onClose={() => setIsManipulativesOpen(false)}
        />
      )}

      {isTeacherOpen && (
        <TeacherCorner
          currentAttempts={attempts}
          sessions={sessions}
          teacherComments={teacherComments}
          onUpdateTeacherComment={handleUpdateTeacherComment}
          onClearSessions={handleClearSessions}
          onClose={() => setIsTeacherOpen(false)}
        />
      )}

      {isStagesOpen && (
        <StagesOverviewModal
          currentStageScore={selfMadeScore}
          completedCount={completedCount}
          onSelectStage4={() => {
            setCurrentScreen('quiz');
          }}
          onClose={() => setIsStagesOpen(false)}
        />
      )}

      {isGuideOpen && (
        <GuideModal
          onClose={() => setIsGuideOpen(false)}
          onStart={() => {
            setIsGuideOpen(false);
            setCurrentScreen('quiz');
          }}
        />
      )}

      {/* Footer info note */}
      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-100 bg-white/50">
        <p>
          TOÁN THÔNG MINH 2.0 • Chặng 4: Vận dụng • Trường TH & THCS Thổ Sơn, Hòn Đất, An Giang • GV: Trần Ngọc Phan
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Dữ liệu lưu trữ cục bộ trên trình duyệt • Không yêu cầu tài khoản hay thông tin cá nhân
        </p>
      </footer>
    </div>
  );
}
