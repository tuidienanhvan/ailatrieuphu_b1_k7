
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_6', name: 'Bạn lớp 6', role: 'Bạn học cùng lớp', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ mặt', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 1: NHÂN ĐA THỨC
  // ═══════════════════════════════════════════════════════════════════
  { question: "Kết quả của phép nhân $3x(2x - 5)$ là:", answers: ["$6x^2 - 15x$", "$6x^2 - 15$", "$6x - 15x$", "$5x^2 - 15x$"], correct: 0 },
  { question: "Thực hiện phép tính: $-2x^2(3x - 4y + 1)$", answers: ["$-6x^3 + 8x^2y - 2x^2$", "$-6x^3 - 8x^2y - 2x^2$", "$6x^3 + 8x^2y - 2x^2$", "$-6x^3 + 8x^2y + 2x^2$"], correct: 0 },
  { question: "Khai triển $(x + 3)(x - 2)$ được:", answers: ["$x^2 + x - 6$", "$x^2 - x - 6$", "$x^2 + 5x - 6$", "$x^2 - 5x + 6$"], correct: 0 },
  { question: "Tích $(2x - 1)(x^2 + 3x - 2)$ có hệ số của $x^2$ là:", answers: ["$5$", "$6$", "$-5$", "$7$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 2: HẰNG ĐẲNG THỨC ĐÁNG NHỚ
  // ═══════════════════════════════════════════════════════════════════
  { question: "Hằng đẳng thức $(A + B)^2$ bằng:", answers: ["$A^2 + 2AB + B^2$", "$A^2 - 2AB + B^2$", "$A^2 + B^2$", "$A^2 - B^2$"], correct: 0 },
  { question: "Khai triển $(x - 3)^2$ được:", answers: ["$x^2 - 6x + 9$", "$x^2 + 6x + 9$", "$x^2 - 9$", "$x^2 - 6x - 9$"], correct: 0 },
  { question: "Biểu thức $(2a + 5b)^2$ bằng:", answers: ["$4a^2 + 20ab + 25b^2$", "$4a^2 + 10ab + 25b^2$", "$2a^2 + 20ab + 5b^2$", "$4a^2 - 20ab + 25b^2$"], correct: 0 },
  { question: "Áp dụng hằng đẳng thức, $x^2 - 49$ bằng:", answers: ["$(x-7)(x+7)$", "$(x-7)^2$", "$(x+7)^2$", "$(x-49)(x+1)$"], correct: 0 },
  { question: "Giá trị của $99^2$ tính nhanh bằng $(100-1)^2$ là:", answers: ["$9801$", "$9901$", "$9899$", "$9800$"], correct: 0 },
  { question: "Khai triển $(x + 2)^3$ được:", answers: ["$x^3 + 6x^2 + 12x + 8$", "$x^3 + 4x^2 + 8x + 8$", "$x^3 + 6x^2 + 6x + 8$", "$x^3 + 2x^2 + 4x + 8$"], correct: 0 },
  { question: "Hằng đẳng thức $A^3 - B^3$ bằng:", answers: ["$(A-B)(A^2+AB+B^2)$", "$(A-B)(A^2-AB+B^2)$", "$(A+B)(A^2-AB+B^2)$", "$(A-B)^3$"], correct: 0 },
  { question: "$8x^3 + 27$ được viết thành:", answers: ["$(2x+3)(4x^2-6x+9)$", "$(2x+3)(4x^2+6x+9)$", "$(2x-3)(4x^2+6x+9)$", "$(2x+3)^3$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 3: PHÂN TÍCH ĐA THỨC THÀNH NHÂN TỬ
  // ═══════════════════════════════════════════════════════════════════
  { question: "Phân tích $6x^2 - 9x$ thành nhân tử:", answers: ["$3x(2x - 3)$", "$3(2x^2 - 3x)$", "$6x(x - 9)$", "$9x(x - 1)$"], correct: 0 },
  { question: "Đa thức $x^2 - 4x + 4$ phân tích thành:", answers: ["$(x-2)^2$", "$(x+2)^2$", "$(x-2)(x+2)$", "$(x-4)^2$"], correct: 0 },
  { question: "Phân tích $x^2 - 5x + 6$ thành nhân tử:", answers: ["$(x-2)(x-3)$", "$(x+2)(x+3)$", "$(x-1)(x-6)$", "$(x+1)(x-6)$"], correct: 0 },
  { question: "Biểu thức $x^3 - x$ phân tích thành:", answers: ["$x(x-1)(x+1)$", "$x(x^2-1)$", "$(x-1)(x^2+x)$", "$x^2(x-1)$"], correct: 0 },
  { question: "Phân tích $2x^2 + 5x + 2$ thành nhân tử:", answers: ["$(2x+1)(x+2)$", "$(2x+2)(x+1)$", "$(x+1)(2x+2)$", "$(2x-1)(x-2)$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 4: PHÂN THỨC ĐẠI SỐ
  // ═══════════════════════════════════════════════════════════════════
  { question: "Điều kiện xác định của phân thức $\\frac{3}{x-2}$ là:", answers: ["$x \\ne 2$", "$x \\ne 0$", "$x \\ne -2$", "$x > 2$"], correct: 0 },
  { question: "Rút gọn phân thức $\\frac{x^2-4}{x-2}$ được:", answers: ["$x + 2$", "$x - 2$", "$x^2 - 2$", "$2x$"], correct: 0 },
  { question: "Phân thức $\\frac{2x}{4x^2}$ rút gọn bằng:", answers: ["$\\frac{1}{2x}$", "$\\frac{1}{2}$", "$\\frac{x}{2}$", "$2x$"], correct: 0 },
  { question: "Tính: $\\frac{x}{x+1} + \\frac{1}{x+1}$ bằng:", answers: ["$1$", "$\\frac{x+1}{x+1}$", "$\\frac{x}{1}$", "$x + 1$"], correct: 0 },
  { question: "Tính: $\\frac{2x}{x-3} - \\frac{6}{x-3}$ bằng:", answers: ["$2$", "$\\frac{2x-6}{x-3}$", "$\\frac{2(x-3)}{x-3}$", "$2x - 6$"], correct: 0 },
  { question: "Tính: $\\frac{x}{2} \\cdot \\frac{4}{x^2}$ bằng:", answers: ["$\\frac{2}{x}$", "$\\frac{4x}{2x^2}$", "$\\frac{2x}{x^2}$", "$\\frac{x}{2x^2}$"], correct: 0 },
  { question: "Phép chia $\\frac{a}{b} : \\frac{c}{d}$ bằng:", answers: ["$\\frac{ad}{bc}$", "$\\frac{ac}{bd}$", "$\\frac{a}{b} \\cdot \\frac{c}{d}$", "$\\frac{bc}{ad}$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // HÌNH HỌC: TỨ GIÁC
  // ═══════════════════════════════════════════════════════════════════
  { question: "Tổng các góc trong của một tứ giác bằng:", answers: ["$360°$", "$180°$", "$540°$", "$720°$"], correct: 0 },
  { question: "Hình thang là tứ giác có:", answers: ["Hai cạnh đối song song", "Bốn cạnh bằng nhau", "Hai đường chéo bằng nhau", "Bốn góc vuông"], correct: 0 },
  { question: "Hình bình hành có tính chất:", answers: ["Hai đường chéo cắt nhau tại trung điểm mỗi đường", "Hai đường chéo vuông góc", "Hai đường chéo bằng nhau", "Bốn cạnh bằng nhau"], correct: 0 },
  { question: "Hình chữ nhật là hình bình hành có thêm:", answers: ["Một góc vuông", "Hai cạnh kề bằng nhau", "Hai đường chéo vuông góc", "Một đường chéo là đường phân giác"], correct: 0 },
  { question: "Hình thoi là hình bình hành có thêm:", answers: ["Hai cạnh kề bằng nhau", "Một góc vuông", "Hai đường chéo bằng nhau", "Bốn góc bằng nhau"], correct: 0 },
  { question: "Hình vuông là hình có:", answers: ["4 cạnh bằng nhau và 4 góc vuông", "4 cạnh bằng nhau", "4 góc vuông", "2 đường chéo bằng nhau"], correct: 0 },
  { question: "Đường trung bình của hình thang thì:", answers: ["Song song với hai đáy và bằng nửa tổng hai đáy", "Bằng trung bình cộng hai cạnh bên", "Vuông góc với hai đáy", "Bằng nửa hiệu hai đáy"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // HÌNH HỌC: ĐA GIÁC - DIỆN TÍCH
  // ═══════════════════════════════════════════════════════════════════
  { question: "Đa giác lồi $n$ cạnh có tổng các góc trong bằng:", answers: ["$(n-2) \\cdot 180°$", "$n \\cdot 180°$", "$(n-1) \\cdot 180°$", "$360°$"], correct: 0 },
  { question: "Lục giác đều có mỗi góc trong bằng:", answers: ["$120°$", "$108°$", "$135°$", "$140°$"], correct: 0 },
  { question: "Diện tích hình chữ nhật có chiều dài $a$, chiều rộng $b$ là:", answers: ["$S = a \\cdot b$", "$S = 2(a+b)$", "$S = a + b$", "$S = \\frac{a \\cdot b}{2}$"], correct: 0 },
  { question: "Diện tích hình bình hành có đáy $a$, chiều cao $h$ là:", answers: ["$S = a \\cdot h$", "$S = \\frac{a \\cdot h}{2}$", "$S = 2ah$", "$S = a + h$"], correct: 0 },
  { question: "Diện tích tam giác có đáy $a$, chiều cao $h$ là:", answers: ["$S = \\frac{1}{2}ah$", "$S = ah$", "$S = 2ah$", "$S = a + h$"], correct: 0 },
  { question: "Diện tích hình thoi có hai đường chéo $d_1$ và $d_2$ là:", answers: ["$S = \\frac{d_1 \\cdot d_2}{2}$", "$S = d_1 \\cdot d_2$", "$S = \\frac{d_1 + d_2}{2}$", "$S = 2(d_1 + d_2)$"], correct: 0 },
  { question: "Diện tích hình thang có đáy lớn $a$, đáy bé $b$, chiều cao $h$ là:", answers: ["$S = \\frac{(a+b)h}{2}$", "$S = (a+b)h$", "$S = \\frac{(a-b)h}{2}$", "$S = abh$"], correct: 0 }
];

export const BACKUP_QUESTIONS: Question[] = [
  // Câu hỏi dự phòng - hỗn hợp các chủ đề
  { question: "Kết quả $(a-b)(a+b)$ bằng:", answers: ["$a^2 - b^2$", "$a^2 + b^2$", "$(a-b)^2$", "$(a+b)^2$"], correct: 0 },
  { question: "Phân tích $x^2 + 2x + 1$ thành nhân tử:", answers: ["$(x+1)^2$", "$(x-1)^2$", "$(x+1)(x-1)$", "$x(x+2)+1$"], correct: 0 },
  { question: "Điều kiện xác định của $\\frac{5}{2x+6}$ là:", answers: ["$x \\ne -3$", "$x \\ne 3$", "$x \\ne 0$", "$x \\ne -6$"], correct: 0 },
  { question: "Trong hình bình hành ABCD, nếu $\\widehat{A} = 70°$ thì $\\widehat{B}$ bằng:", answers: ["$110°$", "$70°$", "$90°$", "$180°$"], correct: 0 },
  { question: "Ngũ giác đều có mỗi góc trong bằng:", answers: ["$108°$", "$120°$", "$100°$", "$72°$"], correct: 0 },
  { question: "Rút gọn $\\frac{x^2-9}{x+3}$ được:", answers: ["$x - 3$", "$x + 3$", "$x^2 - 3$", "$3 - x$"], correct: 0 },
  { question: "$(3x - 2)^2$ bằng:", answers: ["$9x^2 - 12x + 4$", "$9x^2 + 12x + 4$", "$9x^2 - 4$", "$3x^2 - 4$"], correct: 0 },
  { question: "Hình thang cân có tính chất:", answers: ["Hai đường chéo bằng nhau", "Hai đường chéo vuông góc", "Hai cạnh bên vuông góc", "Bốn góc bằng nhau"], correct: 0 }
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
