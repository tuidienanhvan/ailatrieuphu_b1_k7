
import { useState, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { shuffleArray } from '../../../../common/utils/math-helpers';

export const useLifelines = (
  selectedAnswer: number | null,
  startTimer: (duration?: number) => void
) => {
  const [hiddenAnswers, setHiddenAnswers] = useState<number[]>([]);
  
  const lifelines = useGameStore(s => s.lifelines);
  const gameQuestions = useGameStore(s => s.gameQuestions);
  const currentLevel = useGameStore(s => s.currentLevel);
  const backupQuestions = useGameStore(s => s.backupQuestions);
  const userInfo = useGameStore(s => s.userInfo);
  
  // Flat actions
  const useLifeline = useGameStore(s => s.useLifeline);
  const replaceCurrentQuestion = useGameStore(s => s.replaceCurrentQuestion);
  const openModal = useGameStore(s => s.openModal);

  const handle5050 = useCallback(() => {
    if (lifelines.fiftyFifty <= 0 || selectedAnswer !== null) return;
    
    const currentQ = gameQuestions[currentLevel];
    // Find wrong answers
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correct);
    // Shuffle and take 2 to hide
    const toHide = shuffleArray(wrongIndices).slice(0, 2);
    
    setHiddenAnswers(toHide);
    useLifeline('fiftyFifty');
    playSound('lifeline');
  }, [lifelines.fiftyFifty, selectedAnswer, gameQuestions, currentLevel, useLifeline]);

  const handleChangeQuestion = useCallback(() => {
    if (lifelines.changeQuestion <= 0 || selectedAnswer !== null || backupQuestions.length === 0) return;
    replaceCurrentQuestion(backupQuestions[0]);
    useLifeline('changeQuestion');
    setHiddenAnswers([]);
    startTimer();
    playSound('lifeline');
  }, [lifelines.changeQuestion, selectedAnswer, backupQuestions, replaceCurrentQuestion, useLifeline, startTimer]);

  const handlePhone = useCallback(() => {
    if (lifelines.phone <= 0 || selectedAnswer !== null) return;
    openModal('phone');
  }, [lifelines.phone, selectedAnswer, openModal]);

  const handlePhoneSelect = useCallback((personName: string) => {
    const currentQ = gameQuestions[currentLevel];
    const isRight = Math.random() < 0.85; 
    const suggest = isRight 
        ? String.fromCharCode(65 + currentQ.correct) 
        : String.fromCharCode(65 + Math.floor(Math.random() * 4));
    
    openModal('message', {
        phoneTitle: `Gọi cho ${personName}`,
        phoneMessage: `Theo tôi thì phương án ${suggest} là chính xác nhất. Chúc bạn may mắn!`
    });
    useLifeline('phone');
    playSound('lifeline');
  }, [gameQuestions, currentLevel, openModal, useLifeline]);

  const handleAudience = useCallback(() => {
    if (lifelines.audience <= 0 || selectedAnswer !== null) return;
    const currentQ = gameQuestions[currentLevel];
    const diff = Math.max(0.3, 1 - (currentLevel * 0.05));
    const isRight = Math.random() < (0.6 + diff * 0.3);
    
    let stats = [0,0,0,0];
    if (isRight) {
        stats = stats.map((_, i) => i === currentQ.correct ? 50 + Math.random() * 30 : Math.random() * 20);
    } else {
        stats = stats.map(() => 25 + (Math.random() - 0.5) * 20);
    }
    const sum = stats.reduce((a, b) => a + b, 0);
    const finalStats = stats.map(val => Math.round((val / sum) * 100));
    
    openModal('audience', { audienceStats: finalStats });
    useLifeline('audience');
    playSound('lifeline');
  }, [lifelines.audience, selectedAnswer, gameQuestions, currentLevel, openModal, useLifeline]);

  const handleAskAI = useCallback(() => {
    if (lifelines.askAI <= 0 || selectedAnswer !== null) return;
    const currentQ = gameQuestions[currentLevel];
    
    // CHECK SHOP ITEM: Expert AI
    const hasExpertAI = userInfo.inventory.includes('expert_unlock');
    
    // If owned expert AI -> 99% accuracy, else 70% random chance + small deviation
    const accuracy = hasExpertAI ? 0.99 : 0.75;
    const isRight = Math.random() < accuracy; 
    
    const char = String.fromCharCode(65 + (isRight ? currentQ.correct : Math.floor(Math.random() * 4)));
    const percent = hasExpertAI ? (99 + Math.random()).toFixed(1) : (75 + Math.random() * 20).toFixed(1);

    const message = hasExpertAI 
        ? `[CHẾ ĐỘ CHUYÊN GIA] Phân tích sâu dữ liệu cho thấy đáp án ${char} chính xác tuyệt đối (${percent}%).`
        : `Dựa trên dữ liệu huấn luyện sơ bộ, tôi nghiêng về đáp án ${char} với xác suất khoảng ${percent}%.`;
    
    openModal('ai', { aiMessage: message });
    useLifeline('askAI');
    playSound('lifeline');
  }, [lifelines.askAI, selectedAnswer, gameQuestions, currentLevel, openModal, useLifeline, userInfo.inventory]);

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
