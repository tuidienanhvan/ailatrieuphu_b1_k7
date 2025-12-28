
import { Question } from '../types/entities';
import { shuffleArray, getPrizeAmount } from '../../../common/utils/math-helpers';
import { useGameStore } from '../store/useGameStore';
import { PRIZES } from './game-constants';

// ============================================================================
// INTERFACES
// ============================================================================
interface PistudyQuestion {
  id: string;
  question: string;
  answer_true: string;
  answer_false: string[];
}

interface PistudyResponse {
  mate_id: string;
  mate_content: {
    question_pool: PistudyQuestion[];
    total_question: number;
  };
}

// ============================================================================
// HELPER: Parse prize string to number
// "200,000đ" → 200000
// ============================================================================
function getPrizeNumber(prizeString: string): number {
  if (!prizeString) return 0;
  const numStr = prizeString.replace(/[^\d]/g, ''); // Remove non-digits
  return parseInt(numStr, 10) || 0;
}

// ============================================================================
// HELPER: Get prize number by level index
// ============================================================================
function getPrizeByLevel(levelIndex: number): number {
  if (levelIndex < 0 || levelIndex >= PRIZES.length) return 0;
  return getPrizeNumber(PRIZES[levelIndex].amount);
}

// ============================================================================
// HELPER: Send to Bridge
// ============================================================================
function sendToBridge(data: any) {
  const bridgePayload = {
    type: 'MINIGAME_ACTION',
    action: 'SAVE_RESULT',
    data: data
  };

  if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
    window.parent.postMessage(bridgePayload, '*');
    console.log("[GameAPI] Sent to bridge:", data.msgtype, data.payload);
  } else {
    const isLocal = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (isLocal) {
      console.log("⚠️ [Dev Mode] Payload:", JSON.stringify(bridgePayload, null, 2));
    }
  }
}

// ============================================================================
// FETCH QUIZ DATA
// ============================================================================
export async function fetchQuizData(mateId: string = 'math_lesson_001'): Promise<{ questions: Question[], backups: Question[] } | null> {
  try {
    let isLocal = false;
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
    }

    const BASE_URL = isLocal ? '' : 'https://pistudy.vn';
    const finalUrl = `${BASE_URL}/api/minigames/question-pool/${mateId}/`;

    console.log(`[GameAPI] Connecting to: ${finalUrl}`);

    const response = await fetch(finalUrl);

    if (!response.ok) {
      throw new Error(`API Error Status: ${response.status} ${response.statusText}`);
    }

    const data: PistudyResponse = await response.json();
    const rawPool = data.mate_content?.question_pool || [];

    if (rawPool.length === 0) {
      console.warn("[GameAPI] API returned empty pool.");
      return null;
    }

    console.log(`[GameAPI] Successfully loaded ${rawPool.length} questions.`);

    const mappedQuestions: Question[] = rawPool.map((q) => {
      const allAnswers = [q.answer_true, ...q.answer_false];
      const shuffledAnswers = shuffleArray(allAnswers);
      const correctIndex = shuffledAnswers.indexOf(q.answer_true);

      return {
        question: q.question,
        answers: shuffledAnswers,
        correct: correctIndex
      };
    });

    const fullPool = shuffleArray(mappedQuestions);
    const questions = fullPool.slice(0, 15);
    const backups = fullPool.slice(15);

    return { questions, backups };

  } catch (error) {
    console.warn(`[GameAPI] Fetch failed (${error instanceof Error ? error.message : 'Unknown'}). Using offline data.`);
    return null;
  }
}

// ============================================================================
// SAVE GAME RESULT (msgtype: RESULT)
// Params:
//   - result: 'victory' | 'gameover' | 'stop'
//   - wrongAnswerLevel: câu trả lời sai (null nếu stop/victory)
//   - playDuration: thời gian chơi (giây)
// ============================================================================
export async function saveMinigameResult(
  result: 'victory' | 'gameover' | 'stop',
  wrongAnswerLevel: number | null = null,
  playDuration: number = 0
) {
  const state = useGameStore.getState();
  const userInfo = state.userInfo;
  const currentLevel = state.currentLevel;  // 0-14 (index)
  const finalPrizeStr = state.finalPrize;   // "22,000,000đ"
  const lifelines = state.lifelines;

  // Parse prize string to number
  const finalPrize = getPrizeNumber(finalPrizeStr);

  // Level đạt được (1-15 cho hiển thị)
  const levelReached = currentLevel + 1;

  // Tính XP và Coin dựa trên level (max 100, max 1000)
  const xp = Math.round(levelReached * 100 / 15);
  const coin = Math.round(levelReached * 1000 / 15);

  // Lifelines đã dùng (những cái còn lại < 1 là đã dùng)
  const lifelinesUsed: string[] = [];
  if (lifelines.fiftyFifty < 1) lifelinesUsed.push('fiftyFifty');
  if (lifelines.phone < 1) lifelinesUsed.push('phone');
  if (lifelines.audience < 1) lifelinesUsed.push('audience');
  if (lifelines.askAI < 1) lifelinesUsed.push('askAI');
  if (lifelines.changeQuestion < 1) lifelinesUsed.push('changeQuestion');

  // mateId từ env (nếu có)
  const mateId = (userInfo as any).mateId || 'math_lesson_001';

  const resultData = {
    msgtype: 'RESULT',
    tsms: Date.now(),
    payload: {
      // User info
      email: userInfo.email || '',
      userId: userInfo.userId || 0,
      username: userInfo.name || 'guest',
      gameKey: 'minigame-ai-la-trieu-phu',

      // Game result
      result: result,
      level: levelReached,
      score: finalPrize,          // Số tiền (number)
      finalPrize: finalPrize,     // Duplicate cho rõ ràng
      xp: xp,
      coin: coin,

      // Gameplay details
      mateId: mateId,
      playDuration: playDuration,
      lifelinesUsed: lifelinesUsed,
      wrongAnswerLevel: wrongAnswerLevel
    }
  };

  console.log("[GameAPI] Saving RESULT:", resultData);
  sendToBridge(resultData);
}

// ============================================================================
// SAVE PURCHASE LOG (msgtype: PURCHASE)
// ============================================================================
export async function savePurchaseLog(
  itemId: string,
  itemName: string,
  price: number,
  itemType: 'lifeline' | 'skin'
) {
  const state = useGameStore.getState();
  const userInfo = state.userInfo;

  const purchaseData = {
    msgtype: 'PURCHASE',
    tsms: Date.now(),
    payload: {
      email: userInfo.email || '',
      userId: userInfo.userId || 0,
      username: userInfo.name || 'guest',
      gameKey: 'minigame-ai-la-trieu-phu',

      itemId: itemId,
      itemName: itemName,
      itemType: itemType,
      price: price,
      balanceAfter: userInfo.balance - price
    }
  };

  console.log("[GameAPI] Saving PURCHASE:", purchaseData);
  sendToBridge(purchaseData);
}
