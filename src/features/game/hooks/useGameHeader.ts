import { useMemo } from 'react';

export const useGameHeader = (userName: string) => {
  const displayUserName = useMemo(() => userName || 'Khách', [userName]);
  
  return {
    displayUserName
  };
};