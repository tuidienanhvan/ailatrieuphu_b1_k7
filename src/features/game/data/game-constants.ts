
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_6', name: 'Bạn lớp 6', role: 'Bạn học cùng lớp', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ mặt', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 1: SỐ TỰ NHIÊN - TẬP HỢP
  // ═══════════════════════════════════════════════════════════════════
  { question: "Tập hợp các số tự nhiên được kí hiệu là:", answers: ["$\\mathbb{N}$", "$\\mathbb{N}^*$", "$\\mathbb{Z}$", "$\\mathbb{Q}$"], correct: 0 },
  { question: "Số nào sau đây là số nguyên tố?", answers: ["$2$", "$4$", "$6$", "$9$"], correct: 0 },
  { question: "Kết quả của phép tính $3^2$ là:", answers: ["$9$", "$6$", "$5$", "$8$"], correct: 0 },
  { question: "Số La Mã XIX có giá trị là:", answers: ["$19$", "$21$", "$18$", "$20$"], correct: 0 },
  { question: "Thứ tự thực hiện phép tính đúng là:", answers: ["Lũy thừa -> Nhân/Chia -> Cộng/Trừ", "Nhân/Chia -> Lũy thừa -> Cộng/Trừ", "Cộng/Trừ -> Nhân/Chia -> Lũy thừa", "Từ trái sang phải"], correct: 0 },
  { question: "BCNN(4, 6) là:", answers: ["$12$", "$24$", "$2$", "$4$"], correct: 0 },
  { question: "ƯCLN(12, 18) là:", answers: ["$6$", "$3$", "$2$", "$12$"], correct: 0 },
  { question: "Số nào chia hết cho cả 2 và 5?", answers: ["$10$", "$12$", "$15$", "$8$"], correct: 0 },
  { question: "Phân tích 20 ra thừa số nguyên tố:", answers: ["$2^2 \\cdot 5$", "$2 \\cdot 10$", "$4 \\cdot 5$", "$20 \\cdot 1$"], correct: 0 },
  { question: "Số nào sau đây chia hết cho 3?", answers: ["$123$", "$124$", "$125$", "$122$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 2: SỐ NGUYÊN
  // ═══════════════════════════════════════════════════════════════════
  { question: "Tập hợp các số nguyên kí hiệu là:", answers: ["$\\mathbb{Z}$", "$\\mathbb{N}$", "$\\mathbb{N}^*$", "$\\mathbb{Q}$"], correct: 0 },
  { question: "Kết quả của $(-5) + (-3)$ là:", answers: ["$-8$", "$8$", "$2$", "$-2$"], correct: 0 },
  { question: "Số đối của $-7$ là:", answers: ["$7$", "$-7$", "$0$", "$\\frac{1}{7}$"], correct: 0 },
  { question: "Kết quả phép tính $10 - (-2)$ là:", answers: ["$12$", "$8$", "$-12$", "$-8$"], correct: 0 },
  { question: "Sắp xếp các số sau theo thứ tự tăng dần: $-2; 0; -5; 3$", answers: ["$-5; -2; 0; 3$", "$-2; -5; 0; 3$", "$0; -2; -5; 3$", "$3; 0; -2; -5$"], correct: 0 },
  { question: "Tích của hai số nguyên âm là:", answers: ["Số nguyên dương", "Số nguyên âm", "Số 0", "Số tự nhiên"], correct: 0 },
  { question: "Kết quả của $(-3) \\cdot 4$ là:", answers: ["$-12$", "$12$", "$1$", "$-7$"], correct: 0 },
  { question: "Giá trị tuyệt đối của $-15$ là:", answers: ["$15$", "$-15$", "$0$", "$1$"], correct: 0 },
  { question: "Ước của $-3$ gồm:", answers: ["$\\{1; -1; 3; -3\\}$", "$\\{1; 3\\}$", "$\\{-1; -3\\}$", "$\\{3; -3\\}$"], correct: 0 },
  { question: "Tổng của số nguyên âm lớn nhất và số nguyên dương nhỏ nhất là:", answers: ["$0$", "$2$", "$-2$", "$1$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 3: HÌNH HỌC TRỰC QUAN
  // ═══════════════════════════════════════════════════════════════════
  { question: "Tam giác đều có tính chất nào?", answers: ["3 cạnh bằng nhau, 3 góc bằng nhau", "3 cạnh bằng nhau, 1 góc vuông", "2 cạnh bằng nhau", "3 góc khác nhau"], correct: 0 },
  { question: "Hình vuông có mấy trục đối xứng?", answers: ["$4$", "$2$", "$1$", "$8$"], correct: 0 },
  { question: "Chu vi hình chữ nhật có chiều dài 5cm, chiều rộng 3cm là:", answers: ["$16cm$", "$15cm$", "$8cm$", "$24cm$"], correct: 0 },
  { question: "Diện tích hình thoi có hai đường chéo là 6cm và 8cm là:", answers: ["$24cm^2$", "$48cm^2$", "$14cm^2$", "$28cm^2$"], correct: 0 },
  { question: "Hình bình hành có diện tích 20cm², chiều cao 4cm. Độ dài đáy tương ứng là:", answers: ["$5cm$", "$80cm$", "$16cm$", "$10cm$"], correct: 0 },
  { question: "Trong hình thang cân, hai đường chéo:", answers: ["Bằng nhau", "Vuông góc", "Cắt nhau tại trung điểm", "Song song"], correct: 0 },
  { question: "Hình lục giác đều được ghép bởi mấy tam giác đều?", answers: ["$6$", "$4$", "$5$", "$8$"], correct: 0 },
  { question: "Công thức tính diện tích hình thang:", answers: ["$\\frac{(a+b)h}{2}$", "$(a+b)h$", "$ab$", "$\\frac{ah}{2}$"], correct: 0 },
  { question: "Hình nào sau đây luôn có tâm đối xứng?", answers: ["Hình bình hành", "Hình thang cân", "Tam giác đều", "Hình thang vuông"], correct: 0 },
  { question: "Chu vi hình vuông có diện tích $36cm^2$ là:", answers: ["$24cm$", "$20cm$", "$18cm$", "$12cm$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // NÂNG CAO - TỔNG HỢP
  // ═══════════════════════════════════════════════════════════════════
  { question: "Tìm $x$ biết $2^x = 16$:", answers: ["$x=4$", "$x=3$", "$x=5$", "$x=2$"], correct: 0 },
  { question: "Số tự nhiên nhỏ nhất chia hết cho cả 3, 4, 5 là:", answers: ["$60$", "$30$", "$120$", "$15$"], correct: 0 },
  { question: "Tổng $S = 1 + 2 + 3 + ... + 100$ bằng:", answers: ["$5050$", "$5000$", "$5100$", "$5150$"], correct: 0 },
  { question: "ƯCLN(24, 36, 60) là:", answers: ["$12$", "$6$", "$24$", "$4$"], correct: 0 },
  { question: "Trong phép chia có dư, số dư phải:", answers: ["Nhỏ hơn số chia", "Lớn hơn số chia", "Bằng số chia", "Lớn hơn 1"], correct: 0 },
  { question: "Giá trị biểu thức $100 - (70 - 45)$ là:", answers: ["$75$", "$25$", "$15$", "$65$"], correct: 0 },
  { question: "Có bao nhiêu số nguyên $x$ sao cho $|x| < 3$?", answers: ["$5$", "$4$", "$3$", "$6$"], correct: 0 },
  { question: "Hình thoi có chu vi 20cm thì cạnh của nó là:", answers: ["$5cm$", "$4cm$", "$10cm$", "$2cm$"], correct: 0 },
  { question: "Để số $\\overline{1x2}$ chia hết cho 3, $x$ có thể là:", answers: ["$0; 3; 6; 9$", "$1; 4; 7$", "$2; 5; 8$", "$3; 6; 9$"], correct: 0 },
  { question: "Nếu $a$ chia hết cho $m$ và $b$ chia hết cho $m$ thì:", answers: ["$(a+b)$ chia hết cho $m$", "$(a+b)$ không chia hết cho $m$", "$a.b$ không chia hết cho $m$", "$a-b$ không chia hết cho $m$"], correct: 0 },

  // DỰ PHÒNG CÁC LOẠI CÂU KHÁC
  { question: "Số $1$ là:", answers: ["Không phải số nguyên tố, không phải hợp số", "Số nguyên tố", "Hợp số", "Số chẵn"], correct: 0 },
  { question: "Góc bẹt có số đo là:", answers: ["$180^o$", "$90^o$", "$60^o$", "$360^o$"], correct: 0 },
  { question: "Hai đường thẳng song song là hai đường thẳng:", answers: ["Không có điểm chung", "Có 1 điểm chung", "Có 2 điểm chung", "Trùng nhau"], correct: 0 },
  { question: "Lũy thừa $5^3$ có giá trị là:", answers: ["$125$", "$15$", "$25$", "$75$"], correct: 0 },
  { question: "Phép nhân số nguyên có tính chất nào?", answers: ["Giao hoán, kết hợp, phân phối", "Chỉ giao hoán", "Chỉ kết hợp", "Không có tính chất nào"], correct: 0 }
];

export const BACKUP_QUESTIONS: Question[] = [
  { question: "Số nguyên tố nhỏ nhất là:", answers: ["$2$", "$1$", "$3$", "$0$"], correct: 0 },
  { question: "BCNN(3, 4, 5) là:", answers: ["$60$", "$12$", "$20$", "$30$"], correct: 0 },
  { question: "Kết quả $15 + (-3)$ bằng:", answers: ["$12$", "$18$", "$-12$", "$-18$"], correct: 0 },
  { question: "Hình chữ nhật có độ dài hai cạnh là 3cm và 4cm. Diện tích là:", answers: ["$12cm^2$", "$7cm^2$", "$14cm^2$", "$24cm^2$"], correct: 0 },
  { question: "Viết tập hợp $A = \\{x \\in \\mathbb{N} | 2 < x \\le 5\\}$:", answers: ["$\\{3; 4; 5\\}$", "$\\{2; 3; 4; 5\\}$", "$\\{3; 4\\}$", "$\\{2; 3; 4\\}$"], correct: 0 },
  { question: "Số chia hết cho 9 thì:", answers: ["Tổng các chữ số chia hết cho 9", "Chữ số tận cùng là 9", "Tổng các chữ số chia hết cho 3", "Là số lẻ"], correct: 0 },
  { question: "Diện tích hình vuông có cạnh 10m là:", answers: ["$100m^2$", "$40m^2$", "$20m^2$", "$1000m^2$"], correct: 0 },
  { question: "Kết quả $2^3 . 2^2$ bằng:", answers: ["$2^5$", "$2^6$", "$4^5$", "$4^6$"], correct: 0 }
];

export const PRIZES: Prize[] = [
  // ═══════════════════════════════════════════════════════════════════
  // TIER 1: Khởi Động (Câu 1-15) - Theme: Navy Blue
  // ═══════════════════════════════════════════════════════════════════
  { level: 1, amount: '200,000đ', milestone: false },
  { level: 2, amount: '400,000đ', milestone: false },
  { level: 3, amount: '600,000đ', milestone: false },
  { level: 4, amount: '1,000,000đ', milestone: false },
  { level: 5, amount: '2,000,000đ', milestone: true },  // Mốc an toàn
  { level: 6, amount: '3,000,000đ', milestone: false },
  { level: 7, amount: '6,000,000đ', milestone: false },
  { level: 8, amount: '10,000,000đ', milestone: false },
  { level: 9, amount: '14,000,000đ', milestone: false },
  { level: 10, amount: '22,000,000đ', milestone: true }, // Mốc an toàn
  { level: 11, amount: '30,000,000đ', milestone: false },
  { level: 12, amount: '40,000,000đ', milestone: false },
  { level: 13, amount: '60,000,000đ', milestone: false },
  { level: 14, amount: '85,000,000đ', milestone: false },
  { level: 15, amount: '150,000,000đ', milestone: true }, // 🏆 END TIER 1

  // ═══════════════════════════════════════════════════════════════════
  // TIER 2: Thử Thách (Câu 16-30) - Theme: Purple
  // ═══════════════════════════════════════════════════════════════════
  { level: 16, amount: '160,000,000đ', milestone: false },
  { level: 17, amount: '180,000,000đ', milestone: false },
  { level: 18, amount: '200,000,000đ', milestone: false },
  { level: 19, amount: '220,000,000đ', milestone: false },
  { level: 20, amount: '250,000,000đ', milestone: true }, // Mốc an toàn
  { level: 21, amount: '280,000,000đ', milestone: false },
  { level: 22, amount: '310,000,000đ', milestone: false },
  { level: 23, amount: '350,000,000đ', milestone: false },
  { level: 24, amount: '400,000,000đ', milestone: false },
  { level: 25, amount: '450,000,000đ', milestone: true }, // Mốc an toàn
  { level: 26, amount: '480,000,000đ', milestone: false },
  { level: 27, amount: '500,000,000đ', milestone: false },
  { level: 28, amount: '520,000,000đ', milestone: false },
  { level: 29, amount: '550,000,000đ', milestone: false },
  { level: 30, amount: '600,000,000đ', milestone: true }, // 🏆 END TIER 2

  // ═══════════════════════════════════════════════════════════════════
  // TIER 3: Đỉnh Cao (Câu 31-45) - Theme: Red
  // ═══════════════════════════════════════════════════════════════════
  { level: 31, amount: '620,000,000đ', milestone: false },
  { level: 32, amount: '650,000,000đ', milestone: false },
  { level: 33, amount: '680,000,000đ', milestone: false },
  { level: 34, amount: '720,000,000đ', milestone: false },
  { level: 35, amount: '750,000,000đ', milestone: true }, // Mốc an toàn
  { level: 36, amount: '780,000,000đ', milestone: false },
  { level: 37, amount: '820,000,000đ', milestone: false },
  { level: 38, amount: '860,000,000đ', milestone: false },
  { level: 39, amount: '900,000,000đ', milestone: false },
  { level: 40, amount: '920,000,000đ', milestone: true }, // Mốc an toàn
  { level: 41, amount: '940,000,000đ', milestone: false },
  { level: 42, amount: '960,000,000đ', milestone: false },
  { level: 43, amount: '980,000,000đ', milestone: false },
  { level: 44, amount: '990,000,000đ', milestone: false },
  { level: 45, amount: '1,000,000,000đ', milestone: true }, // 🏆 WINNER - 1 TỶ!
];

// Game configuration constants
export const TOTAL_LEVELS = 45;
export const TIER_MILESTONES = [14, 29, 44]; // Level index (0-based) kết thúc mỗi tier
export const TIER_END_LEVELS = [15, 30, 45]; // Level number (1-based) kết thúc mỗi tier
