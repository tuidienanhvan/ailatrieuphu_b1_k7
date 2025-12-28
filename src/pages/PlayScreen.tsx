
import React from 'react';
import { useGameStore } from '../features/game/store/useGameStore';
import { usePlayScreen } from '../features/game/hooks/play/usePlayScreen';
import { TIMER_DURATION, PHONE_HELPERS } from '../features/game/data/game-constants';

// Modals
import { PhoneModal } from '../features/game/components/play/modals/PhoneModal';
import { MessageModal } from '../features/game/components/play/modals/MessageModal';
import { AudienceModal } from '../features/game/components/play/modals/AudienceModal';
import { AIConsultModal } from '../features/game/components/play/modals/AIConsultModal';
import { StopGameModal } from '../features/game/components/play/modals/StopGameModal';

// Components
import { TopHud } from '../features/game/components/play/TopHud';
import { QuestionBoard } from '../features/game/components/play/QuestionBoard';
import { AnswerGrid } from '../features/game/components/play/AnswerGrid';

export const PlayScreen: React.FC = () => {
  const activeModal = useGameStore(s => s.activeModal);
  const modalData = useGameStore(s => s.modalData);

  const { 
    timer,
    selectedAnswer,
    answerState,
    hiddenAnswers,
    handleAnswer, 
    lifelineHandlers, 
    systemHandlers, 
    visualEffects 
  } = usePlayScreen();

  return (
    <div className="flex-1 flex flex-col w-full h-full relative overflow-hidden animate-fade-in bg-black">
      
      {/* --- STUDIO BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e3a8a_0%,#020617_60%,#000000_100%)] opacity-80"></div>
          <div className="absolute bottom-0 w-full h-[50%] bg-[linear-gradient(to_bottom,transparent_0%,#000000_100%)] z-10"></div>
          <div 
            className="absolute -bottom-[50%] -left-[50%] w-[200%] h-[100%] z-0 opacity-20"
            style={{
                background: `
                    linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent)
                `,
                backgroundSize: '100px 100px',
                transform: 'perspective(1000px) rotateX(60deg)'
            }}
          ></div>
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[80%] bg-[conic-gradient(from_180deg_at_50%_0%,transparent_45%,rgba(255,255,255,0.03)_50%,transparent_55%)] blur-2xl z-0"></div>
      </div>

      {/* --- CONTENT LAYERS --- */}
      <div className="flex-1 flex flex-col relative z-10 h-full">
          <div className="flex flex-col w-full">
              <TopHud 
                lifelineHandlers={lifelineHandlers}
                onStopGame={systemHandlers.onStopGame}
              />
              <div className="mt-4">
                <QuestionBoard 
                  timer={timer}
                  maxDuration={TIMER_DURATION}
                />
              </div>
          </div>

          <div className="flex-1 flex flex-col justify-end pb-12">
             <AnswerGrid 
                hiddenAnswers={hiddenAnswers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={handleAnswer}
              />
          </div>
      </div>

      {/* --- MODALS (Imported Directly) --- */}
      <PhoneModal 
        isOpen={activeModal === 'phone'} 
        onSelect={(id) => {
             const helper = PHONE_HELPERS.find((p: any) => p.id === id);
             lifelineHandlers.onPhoneSelect(helper?.name || 'Người bí ẩn');
        }} 
        onClose={systemHandlers.closeModal} 
      />
      <MessageModal 
        isOpen={activeModal === 'message'} 
        title={modalData.phoneTitle || ''} 
        message={modalData.phoneMessage || ''} 
        onClose={systemHandlers.closeModal} 
      />
      <AudienceModal 
        isOpen={activeModal === 'audience'} 
        animatedStats={visualEffects.audienceBars} 
        onClose={systemHandlers.closeModal} 
      />
      <AIConsultModal 
        isOpen={activeModal === 'ai'} 
        isThinking={visualEffects.ai.isThinking}
        displayText={visualEffects.ai.text}
        isExpert={modalData.isExpert}
        onClose={systemHandlers.closeModal} 
      />
      <StopGameModal 
        isOpen={activeModal === 'stop'} 
        amount={modalData.stopAmount || '0đ'} 
        onConfirm={systemHandlers.confirmStopGame} 
        onCancel={systemHandlers.closeModal} 
      />
    </div>
  );
};
