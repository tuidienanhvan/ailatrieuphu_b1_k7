
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_9', name: 'Bạn cùng lớp', role: 'Học sinh lớp 9', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ĐA THỨC & HẰNG ĐẲNG THỨC
  { question: "Kết quả của phép nhân x(x+2) là?", answers: ["x² + 2x", "x² + 2", "2x²", "x + 2x"], correct: 0 },
  { question: "Hằng đẳng thức (A+B)² bằng?", answers: ["A² + 2AB + B²", "A² + B²", "A² - 2AB + B²", "A² - B²"], correct: 0 },
  { question: "Khai triển x² - 4 ta được?", answers: ["(x-2)(x+2)", "(x-2)²", "(x+2)²", "x(x-4)"], correct: 0 },
  { question: "Bậc của đa thức 5x³ - 2x² + 1 là?", answers: ["3", "5", "2", "1"], correct: 0 },
  { question: "Giá trị biểu thức x² - 2x + 1 tại x = 11 là?", answers: ["100", "121", "10", "120"], correct: 0 },
  { question: "(x-y)² bằng?", answers: ["x² - 2xy + y²", "x² + y²", "x² - y²", "(x+y)(x-y)"], correct: 0 },
  { question: "Đơn thức đồng dạng với 3xy² là?", answers: ["-5xy²", "3x²y", "3xy", "xy"], correct: 0 },
  { question: "Phân tích x² - 2x thành nhân tử?", answers: ["x(x-2)", "x(x+2)", "2(x-1)", "x(2-x)"], correct: 0 },
  { question: "Kết quả của 20x²y : 5xy là?", answers: ["4x", "4y", "4xy", "5x"], correct: 0 },
  { question: "Hệ số của x² trong (x+1)(x-2) là?", answers: ["1", "-1", "2", "-2"], correct: 0 },

  // PHÂN THỨC ĐẠI SỐ
  { question: "ĐKXĐ của phân thức 2/(x-3) là?", answers: ["x ≠ 3", "x ≠ 0", "x = 3", "x ≠ -3"], correct: 0 },
  { question: "Phân thức (x-2)/(x²-4) rút gọn thành?", answers: ["1/(x+2)", "x+2", "1/(x-2)", "x-2"], correct: 0 },
  { question: "Mẫu thức chung của 1/x và 1/(x+1) là?", answers: ["x(x+1)", "x", "x+1", "x²"], correct: 0 },
  { question: "Phân thức nghịch đảo của (x-1)/5 là?", answers: ["5/(x-1)", "-(x-1)/5", "(1-x)/5", "5(x-1)"], correct: 0 },
  { question: "Giá trị phân thức x/2 tại x = 4 là?", answers: ["2", "4", "8", "1"], correct: 0 },

  // HÌNH HỌC: TỨ GIÁC
  { question: "Tổng các góc trong một tứ giác bằng?", answers: ["360°", "180°", "90°", "270°"], correct: 0 },
  { question: "Hình thang có 2 cạnh bên song song là hình?", answers: ["Hình bình hành", "Hình thang cân", "Hình chữ nhật", "Hình vuông"], correct: 0 },
  { question: "Hình bình hành có 1 góc vuông là hình?", answers: ["Hình chữ nhật", "Hình thoi", "Hình vuông", "Hình thang vuông"], correct: 0 },
  { question: "Hình thoi có 2 đường chéo?", answers: ["Vuông góc", "Bằng nhau", "Song song", "Trùng nhau"], correct: 0 },
  { question: "Tứ giác có 4 cạnh bằng nhau là?", answers: ["Hình thoi", "Hình bình hành", "Hình chữ nhật", "Hình thang"], correct: 0 },
  { question: "Hình vuông là hình chữ nhật có?", answers: ["2 cạnh kề bằng nhau", "2 đường chéo bằng nhau", "1 góc vuông", "Các cạnh đối song song"], correct: 0 },
  { question: "Hình thang cân là hình thang có?", answers: ["Hai góc kề một đáy bằng nhau", "Hai cạnh bên bằng nhau", "Hai đường chéo vuông góc", "Một góc vuông"], correct: 0 },
  { question: "Dấu hiệu nhận biết hình bình hành?", answers: ["Các cạnh đối song song", "Hai đường chéo vuông góc", "Có 1 góc vuông", "Hai cạnh liền bằng nhau"], correct: 0 },
  { question: "Đường trung bình của tam giác thì?", answers: ["Song song cạnh thứ 3", "Vuông góc cạnh thứ 3", "Bằng cạnh thứ 3", "Cắt nhau tại trọng tâm"], correct: 0 },
  { question: "Hình chữ nhật có hai đường chéo?", answers: ["Bằng nhau", "Vuông góc", "Là phân giác", "Song song"], correct: 0 },

  // DỮ LIỆU & BIỂU ĐỒ
  { question: "Biểu đồ tranh dùng gì để thể hiện?", answers: ["Biểu tượng/Hình ảnh", "Cột", "Đường", "Quạt tròn"], correct: 0 },
  { question: "Dữ liệu nào là số liệu rời rạc?", answers: ["Số học sinh", "Chiều cao", "Cân nặng", "Nhiệt độ"], correct: 0 },
  { question: "Để so sánh tỉ lệ phần trăm, dùng?", answers: ["Biểu đồ quạt tròn", "Biểu đồ cột", "Biểu đồ đoạn thẳng", "Biểu đồ tranh"], correct: 0 },
  { question: "Xác suất thực nghiệm phụ thuộc vào?", answers: ["Kết quả thí nghiệm", "Lý thuyết", "Dự đoán", "Công thức"], correct: 0 },
  { question: "Tần số tương đối thường viết dưới dạng?", answers: ["Phần trăm (%)", "Số nguyên", "Số thập phân", "Hỗn số"], correct: 0 },
];

export const BACKUP_QUESTIONS: Question[] = [
  { question: "x . x = ?", answers: ["x²", "2x", "x", "1"], correct: 0 },
  { question: "Hình vuông có mấy trục đối xứng?", answers: ["4", "2", "1", "Vô số"], correct: 0 },
  { question: "(x+1)² = ?", answers: ["x² + 2x + 1", "x² + 1", "x² - 1", "2x + 2"], correct: 0 },
  { question: "Hình bình hành có tâm đối xứng là?", answers: ["Giao điểm 2 đường chéo", "Giao điểm 2 cạnh", "Đỉnh bất kỳ", "Trọng tâm"], correct: 0 },
  { question: "Đa thức x² + 1 có nghiệm không?", answers: ["Không", "Có 2 nghiệm", "Có 1 nghiệm", "Vô số"], correct: 0 },
  { question: "Hình thang có 2 đáy thế nào?", answers: ["Song song", "Bằng nhau", "Vuông góc", "Cắt nhau"], correct: 0 },
  { question: "2x + 3x = ?", answers: ["5x", "6x", "5x²", "6x²"], correct: 0 },
  { question: "Tứ giác ABCD có A+B+C+D = ?", answers: ["360°", "180°", "270°", "90°"], correct: 0 },
  { question: "A = B.Q + R. R được gọi là?", answers: ["Dư", "Thương", "Số bị chia", "Số chia"], correct: 0 },
  { question: "Hình chữ nhật có mấy tâm đối xứng?", answers: ["1", "2", "4", "0"], correct: 0 },
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
  { level: 16, amount: '160,000,000đ', milestone: false },
  { level: 17, amount: '180,000,000đ', milestone: false },
  { level: 18, amount: '200,000,000đ', milestone: false },
  { level: 19, amount: '220,000,000đ', milestone: false },
  { level: 20, amount: '250,000,000đ', milestone: true },
  { level: 21, amount: '280,000,000đ', milestone: false },
  { level: 22, amount: '310,000,000đ', milestone: false },
  { level: 23, amount: '350,000,000đ', milestone: false },
  { level: 24, amount: '400,000,000đ', milestone: false },
  { level: 25, amount: '450,000,000đ', milestone: true },
  { level: 26, amount: '480,000,000đ', milestone: false },
  { level: 27, amount: '500,000,000đ', milestone: false },
  { level: 28, amount: '520,000,000đ', milestone: false },
  { level: 29, amount: '550,000,000đ', milestone: false },
  { level: 30, amount: '600,000,000đ', milestone: true },
  { level: 31, amount: '620,000,000đ', milestone: false },
  { level: 32, amount: '650,000,000đ', milestone: false },
  { level: 33, amount: '680,000,000đ', milestone: false },
  { level: 34, amount: '720,000,000đ', milestone: false },
  { level: 35, amount: '750,000,000đ', milestone: true },
  { level: 36, amount: '780,000,000đ', milestone: false },
  { level: 37, amount: '820,000,000đ', milestone: false },
  { level: 38, amount: '860,000,000đ', milestone: false },
  { level: 39, amount: '900,000,000đ', milestone: false },
  { level: 40, amount: '920,000,000đ', milestone: true },
  { level: 41, amount: '940,000,000đ', milestone: false },
  { level: 42, amount: '960,000,000đ', milestone: false },
  { level: 43, amount: '980,000,000đ', milestone: false },
  { level: 44, amount: '990,000,000đ', milestone: false },
  { level: 45, amount: '1,000,000,000đ', milestone: true },
];

export const TOTAL_LEVELS = 45;
export const TIER_MILESTONES = [14, 29, 44];
export const TIER_END_LEVELS = [15, 30, 45];
