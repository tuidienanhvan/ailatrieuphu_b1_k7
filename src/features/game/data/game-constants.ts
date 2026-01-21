import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_9', name: 'Bạn cùng lớp', role: 'Học sinh lớp 9', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // EASY TESTING QUESTIONS
  { question: "1 + 1 = ?", answers: ["2", "3", "4", "5"], correct: 0 },
  { question: "1 + 2 = ?", answers: ["3", "4", "5", "6"], correct: 0 },
  { question: "1 + 3 = ?", answers: ["4", "5", "6", "7"], correct: 0 },
  { question: "1 + 4 = ?", answers: ["5", "6", "7", "8"], correct: 0 },
  { question: "1 + 5 = ?", answers: ["6", "7", "8", "9"], correct: 0 },
  { question: "2 + 2 = ?", answers: ["4", "5", "6", "7"], correct: 0 },
  { question: "2 + 3 = ?", answers: ["5", "6", "7", "8"], correct: 0 },
  { question: "2 + 4 = ?", answers: ["6", "7", "8", "9"], correct: 0 },
  { question: "2 + 5 = ?", answers: ["7", "8", "9", "10"], correct: 0 },
  { question: "3 + 3 = ?", answers: ["6", "7", "8", "9"], correct: 0 },
  { question: "3 + 4 = ?", answers: ["7", "8", "9", "10"], correct: 0 },
  { question: "3 + 5 = ?", answers: ["8", "9", "10", "11"], correct: 0 },
  { question: "4 + 4 = ?", answers: ["8", "9", "10", "11"], correct: 0 },
  { question: "4 + 5 = ?", answers: ["9", "10", "11", "12"], correct: 0 },
  { question: "5 + 5 = ?", answers: ["10", "11", "12", "13"], correct: 0 },
  { question: "6 + 6 = ?", answers: ["12", "13", "14", "15"], correct: 0 },
  { question: "10 - 1 = ?", answers: ["9", "8", "7", "6"], correct: 0 },
  { question: "10 - 2 = ?", answers: ["8", "7", "6", "5"], correct: 0 },
  { question: "10 - 3 = ?", answers: ["7", "6", "5", "4"], correct: 0 },
  { question: "10 - 4 = ?", answers: ["6", "5", "4", "3"], correct: 0 },
];

export const BACKUP_QUESTIONS: Question[] = [
  { question: "1 + 0 = ?", answers: ["1", "0", "2", "3"], correct: 0 },
  { question: "0 + 1 = ?", answers: ["1", "0", "2", "3"], correct: 0 },
  { question: "2 - 1 = ?", answers: ["1", "2", "3", "0"], correct: 0 },
  { question: "1 + 1 + 1 = ?", answers: ["3", "2", "4", "5"], correct: 0 },
  { question: "2 + 0 = ?", answers: ["2", "0", "1", "3"], correct: 0 },
  { question: "3 - 0 = ?", answers: ["3", "0", "1", "2"], correct: 0 },
  { question: "0 + 0 = ?", answers: ["0", "1", "2", "3"], correct: 0 },
  { question: "5 - 0 = ?", answers: ["5", "0", "1", "4"], correct: 0 },
  { question: "2 - 2 = ?", answers: ["0", "1", "2", "3"], correct: 0 },
  { question: "1 - 1 = ?", answers: ["0", "1", "2", "3"], correct: 0 },
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
  { level: 15, amount: '150,000,000đ', milestone: true },
];

export const TOTAL_LEVELS = 15;
