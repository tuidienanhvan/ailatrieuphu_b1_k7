
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

// NEW: Message structure interface
interface MinigameMessage {
  msgid: string;
  msgtype: 'RESULT' | 'PURCHASE';
  key: string;
  tsms: number;
  user: string;
  payload: Record<string, any>;
}

// ============================================================================
// HELPER: Generate UUID v4
// ============================================================================
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ============================================================================
// HELPER: Get Client ID (course ID from URL/referrer)
// ============================================================================
function getClientId(): string {
  // Try to extract course ID from various sources
  try {
    // 1. Try from document.referrer (parent page URL)
    const referrer = document.referrer || '';
    const courseMatch = referrer.match(/course-v1:[^/+&]+\+[^/+&]+\+[^/+&]+/);
    if (courseMatch) {
      return courseMatch[0];
    }

    // 2. Try from URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course_id') || urlParams.get('courseId');
    if (courseParam) {
      return courseParam;
    }

    // 3. Try from parent window location (if same origin)
    try {
      if (window.parent && window.parent !== window) {
        const parentUrl = window.parent.location.href;
        const parentMatch = parentUrl.match(/course-v1:[^/+&]+\+[^/+&]+\+[^/+&]+/);
        if (parentMatch) {
          return parentMatch[0];
        }
      }
    } catch (e) {
      // Cross-origin, can't access parent location
    }

    // 4. Fallback to localStorage cached value
    const cached = localStorage.getItem('minigame_course_id');
    if (cached && cached.startsWith('course-v1:')) {
      return cached;
    }

  } catch (e) {
    console.warn('[GameAPI] Error getting course ID:', e);
  }

  // Fallback to browser fingerprint
  let clientId = localStorage.getItem('minigame_client_id');
  if (!clientId) {
    clientId = `browser-${generateUUID().slice(0, 8)}`;
    localStorage.setItem('minigame_client_id', clientId);
  }
  return clientId;
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
function sendToBridge(data: MinigameMessage) {
  const bridgePayload = {
    type: 'MINIGAME_ACTION',
    action: 'SAVE_RESULT',
    data: data
  };

  if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
    window.parent.postMessage(bridgePayload, '*');
    console.log("[GameAPI] Sent to bridge:", data.msgtype, data.msgid);
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
// NEW STRUCTURE:
// {
//   msgid, msgtype, key, tsms, user,
//   payload: { username, appid, clientid, coin, xp, bonus_coin, bonus_xp, score, result, level, wrong_answer_level, lifelines_used }
// }
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

  // Level đạt được:
  // - 'stop': currentLevel là câu hiện tại (đã qua câu trước), không cộng 1
  // - 'victory'/'gameover': currentLevel + 1
  const levelReached = result === 'stop' ? currentLevel : (currentLevel + 1);

  // Tính XP và Coin dựa trên level (DELTA - số coin được thưởng thêm)
  const xp = Math.round(levelReached * 100 / 15);
  const coinReward = Math.round((levelReached / 15) * 10000); // Max 10,000 coin ở level 15

  // Lifelines đã dùng (những cái còn lại < 1 là đã dùng)
  const lifelinesUsed: string[] = [];
  if (lifelines.fiftyFifty < 1) lifelinesUsed.push('fiftyFifty');
  if (lifelines.phone < 1) lifelinesUsed.push('phone');
  if (lifelines.audience < 1) lifelinesUsed.push('audience');
  if (lifelines.askAI < 1) lifelinesUsed.push('askAI');
  if (lifelines.changeQuestion < 1) lifelinesUsed.push('changeQuestion');

  // User identifier for 'user' field
  const userIdentifier = userInfo.email || userInfo.name || 'guest';

  const resultData: MinigameMessage = {
    msgid: generateUUID(),
    msgtype: 'RESULT',
    key: '',
    tsms: Date.now(),
    user: userIdentifier,
    payload: {

      username: userInfo.name || 'guest',
      appid: 'minigame-ai-la-trieu-phu',
      clientid: getClientId(),

      coin: coinReward,
      xp: xp,
      bonus_coin: Math.round(coinReward * (0.2 + (levelReached / 15) * 0.4)),  // 20% → 60% theo level
      bonus_xp: 0,

      // Game result
      score: levelReached,
      result: result,
      level: levelReached,
      wrong_answer_level: wrongAnswerLevel,
      lifelines_used: lifelinesUsed
    }
  };

  console.log("[GameAPI] Saving RESULT:", resultData);
  sendToBridge(resultData);

  // Cập nhật balance ngay lập tức trong store (không đợi message từ parent)
  const setUserInfo = useGameStore.getState().setUserInfo;
  setUserInfo({ balance: userInfo.balance + coinReward });
}

// ============================================================================
// SAVE PURCHASE LOG (msgtype: PURCHASE)
// NEW STRUCTURE following same pattern
// ============================================================================
export async function savePurchaseLog(
  itemId: string,
  itemName: string,
  price: number,
  itemType: 'lifeline' | 'skin'
) {
  const state = useGameStore.getState();
  const userInfo = state.userInfo;

  // User identifier for 'user' field
  const userIdentifier = userInfo.email || userInfo.name || 'guest';

  const purchaseData: MinigameMessage = {
    msgid: generateUUID(),
    msgtype: 'PURCHASE',
    key: '',
    tsms: Date.now(),
    user: userIdentifier,
    payload: {
      username: userInfo.name || 'guest',
      appid: 'minigame-ai-la-trieu-phu',
      clientid: getClientId(),

      // Required fields theo schema
      coin: 0,
      xp: 0,
      bonus_coin: -price,  // Delta âm: trừ tiền mua đồ
      bonus_xp: 0,
      score: 0,

      // Purchase specific
      item_id: itemId,
      item_name: itemName,
      item_type: itemType
    }
  };

  console.log("[GameAPI] Saving PURCHASE:", purchaseData);
  sendToBridge(purchaseData);

  // Cập nhật balance ngay lập tức trong store (không đợi message từ parent)
  const setUserInfo = useGameStore.getState().setUserInfo;
  setUserInfo({ balance: userInfo.balance - price });
}

