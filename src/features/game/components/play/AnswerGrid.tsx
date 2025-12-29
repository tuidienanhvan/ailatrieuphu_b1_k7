import React from 'react';
import { AnswerCard } from './AnswerCard';
import { useAnswerGrid } from '../../hooks/play/useAnswerGrid';

interface AnswerGridProps {
  hiddenAnswers: number[];
  selectedAnswer: number | null;
  answerState: 'default' | 'selected' | 'correct' | 'wrong';
  onSelect: (index: number) => void;
  hideContent?: boolean;
}

export const AnswerGrid: React.FC<AnswerGridProps> = ({
  hiddenAnswers,
  selectedAnswer,
  answerState,
  onSelect,
  hideContent
}) => {
  const { answers, correctIndex } = useAnswerGrid();

  return (
    <div className="w-full max-w-[1600px] grid grid-cols-2 gap-x-16 gap-y-6 px-24 mx-auto pb-10">
      {answers.map((ans, idx) => {
        let s: 'default' | 'selected' | 'correct' | 'wrong' | 'hidden' = 'default';

        if (hiddenAnswers.includes(idx)) {
          s = 'hidden';
        } else if (selectedAnswer === idx) {
          if (answerState === 'correct') s = 'correct';
          else if (answerState === 'wrong') s = 'wrong';
          else s = 'selected';
        } else if (answerState === 'wrong' && idx === correctIndex) {
          s = 'correct';
        }

        return (
          <div key={idx} className="w-full h-[100px]">
            <AnswerCard
              label={String.fromCharCode(65 + idx)}
              text={hideContent ? '' : ans}
              state={s}
              onClick={() => onSelect(idx)}
            />
          </div>
        );
      })}
    </div>
  );
};