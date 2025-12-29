
import { useState, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { shuffleArray } from '../../../../common/utils/math-helpers';
import { usePhoneJoke } from '../../events/pranks/phone-joke/usePhoneJoke';

export const useLifelines = (
  selectedAnswer: number | null,
  startTimer: (duration?: number) => void,
  triggerEventCheck?: (level: number, action: 'on_lifeline' | 'on_correct' | 'on_wrong' | 'on_timeout' | 'on_start') => any
) => {
  const [hiddenAnswers, setHiddenAnswers] = useState<number[]>([]);

  const lifelines = useGameStore(s => s.lifelines);
  const usedInRound = useGameStore(s => s.usedInRound);

  const gameQuestions = useGameStore(s => s.gameQuestions);
  const currentLevel = useGameStore(s => s.currentLevel);
  const backupQuestions = useGameStore(s => s.backupQuestions);
  const userInfo = useGameStore(s => s.userInfo);

  // Flat actions
  const useLifeline = useGameStore(s => s.useLifeline);
  const replaceCurrentQuestion = useGameStore(s => s.replaceCurrentQuestion);
  const openModal = useGameStore(s => s.openModal);
  const logEvent = useGameStore(s => s.logEvent);
  const clearEvent = useGameStore(s => s.clearEvent);

  // Event Hooks
  const { executePhonePrank } = usePhoneJoke();

  const handle5050 = useCallback(() => {
    if (lifelines.fiftyFifty <= 0 || selectedAnswer !== null || usedInRound.includes('fiftyFifty')) return;

    const currentQ = gameQuestions[currentLevel];
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correct);
    const toHide = shuffleArray(wrongIndices).slice(0, 2);

    setHiddenAnswers(toHide);
    useLifeline('fiftyFifty');
    logEvent('USE_LIFELINE', { type: '50:50', hiddenIndices: toHide });
    playSound('lifeline');
  }, [lifelines.fiftyFifty, selectedAnswer, gameQuestions, currentLevel, useLifeline, usedInRound, logEvent]);

  const handleChangeQuestion = useCallback(() => {
    if (lifelines.changeQuestion <= 0 || selectedAnswer !== null || backupQuestions.length === 0 || usedInRound.includes('changeQuestion')) return;

    replaceCurrentQuestion(backupQuestions[0]);
    useLifeline('changeQuestion');
    setHiddenAnswers([]);
    clearEvent(); // Clear active event (prank)
    startTimer();

    logEvent('USE_LIFELINE', { type: 'CHANGE_QUESTION', newQuestion: backupQuestions[0].question });
    playSound('lifeline');
  }, [lifelines.changeQuestion, selectedAnswer, backupQuestions, replaceCurrentQuestion, useLifeline, startTimer, usedInRound, logEvent, clearEvent]);

  const handlePhone = useCallback(() => {
    if (lifelines.phone <= 0 || selectedAnswer !== null || usedInRound.includes('phone')) return;
    openModal('phone');
  }, [lifelines.phone, selectedAnswer, openModal, usedInRound]);

  const handlePhoneSelect = useCallback((personName: string) => {
    // 1. Check for prank event first
    const prankEvent = triggerEventCheck?.(currentLevel, 'on_lifeline');

    if (prankEvent && prankEvent.id === 'phone_joke') {
      executePhonePrank(personName, prankEvent);
    } else {
      // 2. Normal Logic
      const currentQ = gameQuestions[currentLevel];
      const isRight = Math.random() < 0.85;
      const suggest = isRight
        ? String.fromCharCode(65 + currentQ.correct)
        : String.fromCharCode(65 + Math.floor(Math.random() * 4));

      openModal('message', {
        phoneTitle: `Gọi cho ${personName}`,
        phoneMessage: `Theo tôi thì phương án ${suggest} là chính xác nhất. Chúc bạn may mắn!`
      });
    }

    useLifeline('phone');
    logEvent('USE_LIFELINE', { type: 'PHONE_FRIEND', person: personName, isPrank: !!prankEvent });
    playSound('lifeline');
  }, [gameQuestions, currentLevel, openModal, useLifeline, logEvent, triggerEventCheck, executePhonePrank]);

  const handleAudience = useCallback(() => {
    if (lifelines.audience <= 0 || selectedAnswer !== null || usedInRound.includes('audience')) return;

    const currentQ = gameQuestions[currentLevel];
    const diff = Math.max(0.3, 1 - (currentLevel * 0.05));
    const isRight = Math.random() < (0.6 + diff * 0.3);

    let stats = [0, 0, 0, 0];
    if (isRight) {
      stats = stats.map((_, i) => i === currentQ.correct ? 50 + Math.random() * 30 : Math.random() * 20);
    } else {
      stats = stats.map(() => 25 + (Math.random() - 0.5) * 20);
    }
    const sum = stats.reduce((a, b) => a + b, 0);
    const finalStats = stats.map(val => Math.round((val / sum) * 100));

    openModal('audience', { audienceStats: finalStats });
    useLifeline('audience');
    logEvent('USE_LIFELINE', { type: 'ASK_AUDIENCE', stats: finalStats });
    playSound('lifeline');
  }, [lifelines.audience, selectedAnswer, gameQuestions, currentLevel, openModal, useLifeline, usedInRound, logEvent]);

  const handleAskAI = useCallback(() => {
    if (lifelines.askAI <= 0 || selectedAnswer !== null || usedInRound.includes('askAI')) return;

    const currentQ = gameQuestions[currentLevel];
    const hasExpertAI = userInfo.inventory.includes('expert_unlock');

    const accuracy = hasExpertAI ? 0.998 : 0.50;
    const isRight = Math.random() < accuracy;

    let finalAnswerIndex = currentQ.correct;
    if (!isRight) {
      const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correct);
      finalAnswerIndex = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
    }

    const char = String.fromCharCode(65 + finalAnswerIndex);

    const percent = hasExpertAI
      ? (99 + Math.random()).toFixed(1)
      : (65 + Math.random() * 25).toFixed(1);

    const message = hasExpertAI
      ? `[CHẾ ĐỘ CHUYÊN GIA QUANTUM] Phân tích 14 triệu khả năng... Kết quả: Đáp án ${char} có xác suất chính xác ${percent}%.`
      : `[CHẾ ĐỘ CƠ BẢN] Dữ liệu không đầy đủ. Dựa trên phân tích sơ bộ, tôi đoán là ${char} (${percent}%). Cẩn thận nhé!`;

    openModal('ai', { aiMessage: message, isExpert: hasExpertAI });
    useLifeline('askAI');
    logEvent('USE_LIFELINE', { type: 'ASK_AI', mode: hasExpertAI ? 'Expert' : 'Basic', suggestion: char });
    playSound('lifeline');
  }, [lifelines.askAI, selectedAnswer, gameQuestions, currentLevel, openModal, useLifeline, userInfo.inventory, usedInRound, logEvent]);

  return {
    hiddenAnswers,
    setHiddenAnswers,
    lifelineHandlers: {
      on5050: handle5050,
      onChangeQuestion: handleChangeQuestion,
      onPhone: handlePhone,
      onPhoneSelect: handlePhoneSelect,
      onAudience: handleAudience,
      onAskAI: handleAskAI
    }
  };
};
