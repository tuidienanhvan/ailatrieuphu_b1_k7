
import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const useGameModals = () => {
  const activeModal = useGameStore(s => s.activeModal);
  const modalData = useGameStore(s => s.modalData);
  
  const [aiText, setAiText] = useState({ text: '', isThinking: true });
  const [audienceBars, setAudienceBars] = useState<number[]>([0,0,0,0]);

  useEffect(() => {
    if (activeModal === 'ai' && modalData.aiMessage) {
      setAiText({ text: '', isThinking: true });
      const t1 = setTimeout(() => {
        setAiText(prev => ({ ...prev, isThinking: false }));
        let i = 0;
        const msg = modalData.aiMessage || '';
        const t2 = setInterval(() => {
          if (i <= msg.length) {
            setAiText(prev => ({ ...prev, text: msg.slice(0, i) }));
            i++;
          } else clearInterval(t2);
        }, 30);
        return () => clearInterval(t2);
      }, 1500);
      return () => clearTimeout(t1);
    }
  }, [activeModal, modalData.aiMessage]);

  useEffect(() => {
    if (activeModal === 'audience' && modalData.audienceStats) {
      setAudienceBars([0,0,0,0]);
      setTimeout(() => setAudienceBars(modalData.audienceStats || [0,0,0,0]), 100);
    } else {
      setAudienceBars([0,0,0,0]);
    }
  }, [activeModal, modalData.audienceStats]);

  return { visualEffects: { ai: aiText, audienceBars } };
};
