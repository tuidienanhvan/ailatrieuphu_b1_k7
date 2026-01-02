
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

// Message structure interface (theo game mẫu Đua Xe)
interface MinigameMessage {
  msgtype: 'RESULT' | 'PURCHASE';
  tsms: number;
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
// HELPER: Get Course ID (clientid) - Logic từ game mẫu Đua Xe
// ============================================================================
function getCourseId(): string {
  // 1. Try from window.location pathname
  try {
    const path = window.location?.pathname || '';
    const parts = path.split('/');
    for (const seg of parts) {
      if (!seg) continue;
      if (seg.indexOf('course-v1:') === 0) {
        return seg;
      }
      if (seg.indexOf('block-v1:') === 0) {
        const s = seg.substring('block-v1:'.length);
        const tp = s.indexOf('+type');
        const coursePart = tp !== -1 ? s.substring(0, tp) : s;
        if (coursePart) return 'course-v1:' + coursePart;
      }
    }
  } catch (e) { /* ignore */ }

  // 2. Try from document.referrer
  try {
    const referrer = document.referrer || '';
    if (referrer) {
      const url = new URL(referrer);
      const parts = url.pathname.split('/');
      for (const seg of parts) {
        if (!seg) continue;
        if (seg.indexOf('course-v1:') === 0) return seg;
        if (seg.indexOf('block-v1:') === 0) {
          const s = seg.substring('block-v1:'.length);
          const tp = s.indexOf('+type');
          const coursePart = tp !== -1 ? s.substring(0, tp) : s;
          if (coursePart) return 'course-v1:' + coursePart;
        }
      }
    }
  } catch (e) { /* ignore */ }

  // 3. Try from ancestor frames (same-origin)
  try {
    let anc: Window = window;
    let depth = 0;
    while (anc && anc !== anc.parent && depth < 6) {
      try {
        const ap = anc.location?.pathname || '';
        if (ap) {
          const aparts = ap.split('/');
          for (const segA of aparts) {
            if (!segA) continue;
            if (segA.indexOf('course-v1:') === 0) return segA;
            if (segA.indexOf('block-v1:') === 0) {
              const ss = segA.substring('block-v1:'.length);
              const tpos = ss.indexOf('+type');
              const cpart = tpos !== -1 ? ss.substring(0, tpos) : ss;
              if (cpart) return 'course-v1:' + cpart;
            }
          }
        }
      } catch (e) { /* cross-origin */ }
      try { anc = anc.parent; } catch (e) { break; }
      depth++;
    }
  } catch (e) { /* ignore */ }

  // 4. Fallback to localStorage cache
  const cached = localStorage.getItem('minigame_course_id');
  if (cached && cached.startsWith('course-v1:')) {
    return cached;
  }

  // 5. Final fallback to browser fingerprint
  let clientId = localStorage.getItem('minigame_client_id');
  if (!clientId) {
    clientId = `browser-${generateUUID().slice(0, 8)}`;
    localStorage.setItem('minigame_client_id', clientId);
  }
  return clientId;
}

// Alias for backward compatibility
function getClientId(): string {
  return getCourseId();
}

// ============================================================================
// HELPER: Get API Base URL (từ game mẫu Đua Xe)
// ============================================================================
function getMinigameApiBase(): string | null {
  let origin = '';
  try {
    origin = window.location?.origin || '';
  } catch (e) {
    origin = '';
  }

  if (!origin || origin === 'null' || origin.indexOf('blob:') === 0) {
    try {
      if (document?.referrer) {
        origin = new URL(document.referrer).origin;
      }
    } catch (e) {
      origin = '';
    }
  }

  if ((!origin || origin === 'null') && window.parent?.location) {
    try {
      origin = window.parent.location.origin;
    } catch (e) {
      // cross-origin
    }
  }

  if (!origin || origin === 'null') return null;

  // Nếu ở Studio thì chuyển sang domain chính
  if (origin.indexOf('://studio.') > -1) {
    origin = origin.replace('://studio.', '://');
  }

  while (origin.endsWith('/')) origin = origin.slice(0, -1);
  return origin + '/api/minigames/';
}

// ============================================================================
// FETCH MINIGAME STATS (lần chơi, kỷ lục) - Logic từ game mẫu Đua Xe
// ============================================================================
export async function fetchMinigameStats(): Promise<{ playCount: number; bestScore: number } | null> {
  const API_BASE = getMinigameApiBase();
  if (!API_BASE) return null;

  try {
    // Ưu tiên fetch từ parent nếu có
    let fetchFn: typeof fetch = fetch;
    try {
      if (window.parent?.fetch) {
        fetchFn = window.parent.fetch.bind(window.parent);
      }
    } catch (e) { /* ignore */ }

    const res = await fetchFn(API_BASE + 'logs/', { credentials: 'include' });
    if (!res.ok) return null;

    const data = await res.json();
    const rows = Array.isArray(data) ? data : (Array.isArray(data.results) ? data.results : []);

    let playCount = 0;
    let bestScore = 0;

    rows.forEach((row: any) => {
      if (!row || typeof row !== 'object') return;
      const p = row.payload || {};
      const appKey = p.gameKey || p.appid || null;

      // Match game này
      if (appKey === 'minigame-ai-la-trieu-phu') {
        playCount += 1;
        const s = Number(p.score || p.bestScore || p.lastScore || 0);
        if (s > bestScore) bestScore = s;
      }
    });

    return { playCount, bestScore };
  } catch (e) {
    console.warn('[GameAPI] fetchMinigameStats skip', e);
    return null;
  }
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
    console.log("[GameAPI] Sent to bridge:", data.msgtype);
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

  const resultData: MinigameMessage = {
    msgtype: 'RESULT',
    tsms: Date.now(),
    payload: {
      // Thứ tự giống game mẫu Đua Xe
      appid: 'minigame-ai-la-trieu-phu',
      coin: coinReward,
      xp: xp,
      bonus_coin: Math.round(coinReward * (0.2 + (levelReached / 15) * 0.4)),  // 20% → 60% theo level
      bonus_xp: 0,
      userId: userInfo.userId || null,  // thêm userId giống Đua Xe
      username: userInfo.username || userInfo.name || 'guest',
      email: userInfo.email || '',
      gameKey: 'minigame-ai-la-trieu-phu',
      clientid: encodeURIComponent(getCourseId()),

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

  const purchaseData: MinigameMessage = {
    msgtype: 'PURCHASE',
    tsms: Date.now(),
    payload: {
      // Thứ tự giống game mẫu Đua Xe
      appid: 'minigame-ai-la-trieu-phu',
      coin: -price,  // Delta âm: trừ tiền mua đồ
      xp: 0,
      bonus_coin: 0,
      bonus_xp: 0,
      userId: userInfo.userId || null,  // thêm userId giống Đua Xe
      username: userInfo.username || userInfo.name || 'guest',
      email: userInfo.email || '',
      gameKey: 'minigame-ai-la-trieu-phu',
      clientid: encodeURIComponent(getCourseId()),
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

