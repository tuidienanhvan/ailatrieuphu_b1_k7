
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_6', name: 'Bạn lớp 6', role: 'Bạn học cùng lớp', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ mặt', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ===== KHÁI NIỆM SỐ HỮU TỈ =====
  { question: "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$ và:", answers: ["$b \\ne 0$", "$b = 0$", "$b > 0$", "$a \\ne 0$"], correct: 0 },
  { question: "Tập hợp các số hữu tỉ được ký hiệu là:", answers: ["$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{Q}$", "$\\mathbb{R}$"], correct: 2 },
  { question: "Số nào sau đây KHÔNG phải là số hữu tỉ?", answers: ["$-5$", "$0{,}25$", "$\\sqrt{2}$", "$\\frac{7}{3}$"], correct: 2 },

  // ===== PHÂN LOẠI SỐ HỮU TỈ =====
  { question: "Số hữu tỉ $\\frac{-5}{7}$ là:", answers: ["Số hữu tỉ dương", "Số hữu tỉ âm", "Số 0", "Không xác định"], correct: 1 },
  { question: "Số 0 thuộc loại số hữu tỉ nào?", answers: ["Số hữu tỉ dương", "Số hữu tỉ âm", "Không dương, không âm", "Cả dương và âm"], correct: 2 },
  { question: "Khẳng định nào sau đây đúng?", answers: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$", "$\\mathbb{Q} \\subset \\mathbb{Z}$", "$\\mathbb{Z} \\subset \\mathbb{N}$", "$\\mathbb{Q} = \\mathbb{Z}$"], correct: 0 },

  // ===== BIỂU DIỄN TRỤC SỐ =====
  { question: "Điểm biểu diễn số hữu tỉ $\\frac{3}{4}$ nằm ở đâu trên trục số?", answers: ["Bên trái điểm 0", "Giữa 0 và 1", "Bên phải điểm 1", "Tại điểm 1"], correct: 1 },
  { question: "Trên trục số, hai số hữu tỉ đối nhau có đặc điểm gì?", answers: ["Cùng phía so với O", "Khác phía, cách O bằng nhau", "Trùng nhau", "Một số bằng 0"], correct: 1 },

  // ===== SỐ ĐỐI =====
  { question: "Số đối của số hữu tỉ $\\frac{-3}{5}$ là:", answers: ["$\\frac{3}{5}$", "$\\frac{-5}{3}$", "$\\frac{5}{3}$", "$\\frac{-3}{-5}$"], correct: 0 },
  { question: "Số nào có số đối bằng chính nó?", answers: ["$1$", "$-1$", "$0$", "Không có"], correct: 2 },

  // ===== SO SÁNH SỐ HỮU TỈ =====
  { question: "So sánh: $\\frac{-3}{4}$ và $\\frac{-5}{6}$", answers: ["$\\frac{-3}{4} > \\frac{-5}{6}$", "$\\frac{-3}{4} < \\frac{-5}{6}$", "$\\frac{-3}{4} = \\frac{-5}{6}$", "Không so sánh được"], correct: 0 },
  { question: "Số hữu tỉ nào sau đây lớn nhất?", answers: ["$\\frac{2}{3}$", "$\\frac{5}{8}$", "$0{,}7$", "$\\frac{3}{5}$"], correct: 2 },

  // ===== VIẾT DẠNG PHÂN SỐ =====
  { question: "Số thập phân $-0{,}75$ viết dưới dạng phân số tối giản là:", answers: ["$\\frac{-75}{100}$", "$\\frac{-3}{4}$", "$\\frac{3}{4}$", "$\\frac{-15}{20}$"], correct: 1 },
  { question: "Hỗn số $-2\\frac{1}{3}$ bằng phân số nào?", answers: ["$\\frac{-5}{3}$", "$\\frac{-7}{3}$", "$\\frac{7}{3}$", "$\\frac{-1}{3}$"], correct: 1 }
];

export const BACKUP_QUESTIONS: Question[] = [
  { question: "Giữa hai số hữu tỉ khác nhau có bao nhiêu số hữu tỉ?", answers: ["Không có", "Một số", "Hữu hạn số", "Vô số"], correct: 3 },
  { question: "Số $\\frac{-12}{-8}$ là số hữu tỉ:", answers: ["Dương", "Âm", "Bằng 0", "Không xác định"], correct: 0 },
  { question: "Phân số nào sau đây bằng $\\frac{-2}{5}$?", answers: ["$\\frac{2}{-5}$", "$\\frac{-2}{-5}$", "$\\frac{4}{10}$", "$\\frac{2}{5}$"], correct: 0 },
  { question: "Số nguyên $-7$ viết dưới dạng phân số là:", answers: ["$\\frac{-7}{1}$", "$\\frac{7}{-1}$", "$\\frac{-7}{-1}$", "Cả A và B đúng"], correct: 3 },
  { question: "Số $0{,}333...$ (vô hạn tuần hoàn) là:", answers: ["Số hữu tỉ", "Số vô tỉ", "Số nguyên", "Không xác định"], correct: 0 }
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
