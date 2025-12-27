
import { Question } from '../types/entities';
import { shuffleArray } from '../../../common/utils/math-helpers';

// Interface cho cấu trúc response từ API Pistudy
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

export async function fetchQuizData(mateId: string = 'math_lesson_001'): Promise<{ questions: Question[], backups: Question[] } | null> {
  try {
    // Xử lý URL an toàn hơn để tránh lỗi "import.meta.env undefined"
    // Logic: Nếu hostname là localhost hoặc IP nội bộ -> Dùng Proxy (chuỗi rỗng)
    // Ngược lại -> Dùng URL thật
    let isLocal = false;
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
    }

    // Nếu là local thì dùng relative path để đi qua Vite Proxy.
    // Nếu là production (pistudy.vn) thì dùng full URL hoặc relative path đều được (nhưng full URL an toàn hơn nếu deploy subdomain khác).
    // Ở đây ta ưu tiên relative path cho Local để fix CORS.
    const BASE_URL = isLocal ? '' : 'https://pistudy.vn';
    const finalUrl = `${BASE_URL}/api/minigames/question-pool/${mateId}/`;

    console.log(`[GameAPI] Connecting to: ${finalUrl}`);

    // Gọi API
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

    // Convert sang format của Game
    const mappedQuestions: Question[] = rawPool.map((q) => {
      // Gộp đáp án đúng và sai
      const allAnswers = [q.answer_true, ...q.answer_false];
      
      // Shuffle vị trí các đáp án
      const shuffledAnswers = shuffleArray(allAnswers);
      
      // Tìm index mới của đáp án đúng
      const correctIndex = shuffledAnswers.indexOf(q.answer_true);

      return {
        question: q.question,
        answers: shuffledAnswers,
        correct: correctIndex
      };
    });

    // Shuffle toàn bộ câu hỏi để random thứ tự xuất hiện
    const fullPool = shuffleArray(mappedQuestions);

    // Cần tối thiểu 15 câu cho game, còn lại làm backup
    const questions = fullPool.slice(0, 15);
    const backups = fullPool.slice(15);

    return { questions, backups };

  } catch (error) {
    // Log warning nhẹ nhàng hơn, vì App sẽ tự fallback về data mẫu
    console.warn(`[GameAPI] Fetch failed (${error instanceof Error ? error.message : 'Unknown'}). Using offline data.`);
    return null;
  }
}

export async function saveMinigameResult(score: number, result: 'victory' | 'gameover' | 'stop') {
  // Cấu trúc dữ liệu theo yêu cầu log
  const resultData = {
    gameKey: "minigame-ai-la-trieu-phu",
    score: score,
    result: result,
    xp: score * 10,
    gold: score * 5
  };

  // Log ra console đúng format yêu cầu
  console.log("[Game] Gửi kết quả ra Bridge:", resultData);

  const payload = {
    type: 'MINIGAME_ACTION',
    action: 'SAVE_RESULT',
    data: resultData
  };

  if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
    window.parent.postMessage(payload, '*');
  } else {
    // Chỉ log khi ở dev mode (kiểm tra an toàn)
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if(isLocal) {
        console.log("⚠️ [Dev Mode] Result Saved:", JSON.stringify(payload, null, 2));
    }
  }
}
