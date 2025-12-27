
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'bui_quoc_anh', name: 'Bùi Quốc Anh', role: 'GĐ TT Dữ liệu', rate: '95%', color: 'bg-blue-600' },
  { id: 'son_tung', name: 'Sơn Tùng MTP', role: 'Ca sĩ', rate: '70%', color: 'bg-sky-500' },
  { id: 'ki_bong', name: 'Ki Bông', role: 'Ca sĩ', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  { question: "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$ và:", answers: ["$b \\ne 0$", "$b = 0$", "$b > 0$", "$b \\in \\mathbb{N}$"], correct: 0 },
  { question: "Tập hợp các số hữu tỉ được kí hiệu là:", answers: ["$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{P}$", "$\\mathbb{Q}$"], correct: 3 },
  { question: "Số nào sau đây là số hữu tỉ dương?", answers: ["$-0,5$", "$\\frac{2}{3}$", "$0$", "$-\\frac{1}{4}$"], correct: 1 },
  { question: "Số đối của số hữu tỉ $\\frac{-3}{5}$ là:", answers: ["$\\frac{3}{5}$", "$\\frac{5}{3}$", "$-\\frac{5}{3}$", "$0,6$"], correct: 0 },
  { question: "Khẳng định nào sau đây là đúng?", answers: ["$\\mathbb{Q} \\subset \\mathbb{Z}$", "$\\mathbb{N} \\subset \\mathbb{Q}$", "$\\mathbb{Q} = \\mathbb{Z}$", "$\\mathbb{Q} \\subset \\mathbb{N}$"], correct: 1 },
  { question: "Điểm biểu diễn số hữu tỉ $\\frac{1}{2}$ trên trục số nằm ở:", answers: ["Bên trái điểm 0", "Bên phải điểm 0", "Chính giữa điểm 0 và -1", "Tại điểm 0"], correct: 1 },
  { question: "Số hữu tỉ nào sau đây bằng số hữu tỉ $-0,75$?", answers: ["$\\frac{3}{4}$", "$-\\frac{3}{4}$", "$-\\frac{75}{10}$", "$\\frac{-3}{-4}$"], correct: 1 },
  { question: "Trong các số sau, số nào là số hữu tỉ âm?", answers: ["$\\frac{-2}{-3}$", "$0$", "$-\\frac{5}{6}$", "$1,2$"], correct: 2 },
  { question: "Số nguyên $a$ có phải là số hữu tỉ không?", answers: ["Không", "Có, vì $a = \\frac{a}{1}$", "Chỉ khi $a > 0$", "Chỉ khi $a$ là số tự nhiên"], correct: 1 },
  { question: "Kết quả so sánh hai số hữu tỉ $-0,5$ và $\\frac{1}{4}$ là:", answers: ["$-0,5 > \\frac{1}{4}$", "$-0,5 = \\frac{1}{4}$", "$-0,5 < \\frac{1}{4}$", "Không so sánh được"], correct: 2 },
  { question: "Phân số nào sau đây biểu diễn số hữu tỉ $\\frac{2}{-5}$?", answers: ["$\\frac{-4}{10}$", "$\\frac{4}{10}$", "$\\frac{-2}{-5}$", "$\\frac{10}{-4}$"], correct: 0 },
  { question: "Giữa hai số hữu tỉ khác nhau luôn có:", answers: ["Vô số số hữu tỉ khác", "Chỉ 1 số hữu tỉ", "Chỉ 10 số hữu tỉ", "Không có số hữu tỉ nào"], correct: 0 },
  { question: "Số hữu tỉ không dương cũng không âm là số nào?", answers: ["$1$", "$-1$", "$0$", "Không tồn tại"], correct: 2 },
  { question: "Trên trục số, nếu điểm $x$ nằm bên trái điểm $y$ thì:", answers: ["$x > y$", "$x < y$", "$x = y$", "$x + y = 0$"], correct: 1 },
  { question: "Cho $x = \\frac{a}{m}, y = \\frac{b}{m}$ ($m > 0, a, b, m \\in \\mathbb{Z}$). Nếu $a < b$ thì:", answers: ["$x > y$", "$x < y$", "$x = y$", "$x = -y$"], correct: 1 }
];

export const BACKUP_QUESTIONS: Question[] = [
    { question: "Số $-3$ viết dưới dạng phân số là:", answers: ["$\\frac{-3}{1}$", "$\\frac{3}{1}$", "$\\frac{1}{-3}$", "$\\frac{-1}{3}$"], correct: 0 },
    { question: "Tập hợp số tự nhiên $\\mathbb{N}$ là tập con của tập hợp nào?", answers: ["$\\mathbb{Q}$", "Các số nguyên âm", "Không là tập con của tập nào", "Số vô tỉ"], correct: 0 },
    { question: "Hỗn số $1\\frac{1}{2}$ là số hữu tỉ đúng hay sai?", answers: ["Đúng", "Sai", "Chỉ là số tự nhiên", "Chỉ là phân số"], correct: 0 }
];

export const PRIZES: Prize[] = [
  { level: 1, amount: '200,000đ', milestone: false },
  { level: 2, amount: '400,000đ', milestone: false },
  { level: 3, amount: '600,000đ', milestone: false },
  { level: 4, amount: '1,000,000đ', milestone: false },
  { level: 5, amount: '2,000,000đ', milestone: true },
  { level: 6, amount: '3,000,000đ', milestone: false },
  { level: 7, amount: '6,000,000đ', milestone: false },
  { level: 8, amount: '10,000,000đ', milestone: false },
  { level: 9, amount: '14,000,000đ', milestone: false },
  { level: 10, amount: '22,000,000đ', milestone: true },
  { level: 11, amount: '30,000,000đ', milestone: false },
  { level: 12, amount: '40,000,000đ', milestone: false },
  { level: 13, amount: '60,000,000đ', milestone: false },
  { level: 14, amount: '85,000,000đ', milestone: false },
  { level: 15, amount: '150,000,000đ', milestone: false }
];
