
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_6', name: 'Bạn lớp 6', role: 'Bạn học cùng lớp', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ mặt', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 1: CĂN BẬC HAI - CĂN BẬC BA (Square Roots & Cube Roots)
  // ═══════════════════════════════════════════════════════════════════
  { question: "$\\sqrt{16}$ bằng:", answers: ["$4$", "$8$", "$2$", "$\\pm 4$"], correct: 0 },
  { question: "$\\sqrt{49}$ bằng:", answers: ["$7$", "$49$", "$\\pm 7$", "$14$"], correct: 0 },
  { question: "Căn bậc hai số học của $81$ là:", answers: ["$9$", "$\\pm 9$", "$6561$", "$40,5$"], correct: 0 },
  { question: "$\\sqrt{25} + \\sqrt{9}$ bằng:", answers: ["$8$", "$5$", "$34$", "$\\sqrt{34}$"], correct: 0 },
  { question: "$\\sqrt{100} - \\sqrt{36}$ bằng:", answers: ["$4$", "$6$", "$64$", "$\\sqrt{64}$"], correct: 0 },
  { question: "Điều kiện để $\\sqrt{x}$ có nghĩa là:", answers: ["$x \\geq 0$", "$x > 0$", "$x \\leq 0$", "$x \\neq 0$"], correct: 0 },
  { question: "$\\sqrt{64} : \\sqrt{4}$ bằng:", answers: ["$4$", "$8$", "$2$", "$16$"], correct: 0 },
  { question: "$\\sqrt{2} \\cdot \\sqrt{8}$ bằng:", answers: ["$4$", "$\\sqrt{10}$", "$16$", "$\\sqrt{16}$"], correct: 0 },
  { question: "Rút gọn: $\\sqrt{12}$", answers: ["$2\\sqrt{3}$", "$3\\sqrt{2}$", "$6$", "$\\sqrt{6}$"], correct: 0 },
  { question: "$\\sqrt{x^2}$ với $x \\geq 0$ bằng:", answers: ["$x$", "$-x$", "$|x|$", "$x^2$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 2: CĂN THỨC BẬC HAI - BIẾN ĐỔI (Radical Expressions)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Rút gọn: $\\sqrt{18}$", answers: ["$3\\sqrt{2}$", "$2\\sqrt{3}$", "$9\\sqrt{2}$", "$6$"], correct: 0 },
  { question: "Rút gọn: $\\sqrt{50}$", answers: ["$5\\sqrt{2}$", "$2\\sqrt{5}$", "$25\\sqrt{2}$", "$10$"], correct: 0 },
  { question: "$2\\sqrt{3} + 3\\sqrt{3}$ bằng:", answers: ["$5\\sqrt{3}$", "$6\\sqrt{3}$", "$5\\sqrt{6}$", "$\\sqrt{15}$"], correct: 0 },
  { question: "$5\\sqrt{2} - 2\\sqrt{2}$ bằng:", answers: ["$3\\sqrt{2}$", "$7\\sqrt{2}$", "$3$", "$10$"], correct: 0 },
  { question: "Trục căn thức ở mẫu: $\\frac{1}{\\sqrt{2}}$", answers: ["$\\frac{\\sqrt{2}}{2}$", "$\\frac{1}{2}$", "$\\sqrt{2}$", "$2$"], correct: 0 },
  { question: "Trục căn thức ở mẫu: $\\frac{2}{\\sqrt{3}}$", answers: ["$\\frac{2\\sqrt{3}}{3}$", "$\\frac{\\sqrt{3}}{3}$", "$2\\sqrt{3}$", "$\\frac{2}{3}$"], correct: 0 },
  { question: "$\\sqrt{48} - \\sqrt{12}$ bằng:", answers: ["$2\\sqrt{3}$", "$4\\sqrt{3}$", "$\\sqrt{36}$", "$6$"], correct: 0 },
  { question: "Khử mẫu trong căn: $\\sqrt{\\frac{3}{4}}$", answers: ["$\\frac{\\sqrt{3}}{2}$", "$\\frac{3}{2}$", "$\\frac{\\sqrt{12}}{4}$", "$\\frac{3}{4}$"], correct: 0 },
  { question: "$\\sqrt{20} + \\sqrt{45}$ bằng:", answers: ["$5\\sqrt{5}$", "$\\sqrt{65}$", "$7\\sqrt{5}$", "$5$"], correct: 0 },
  { question: "So sánh: $\\sqrt{5}$ và $2$", answers: ["$\\sqrt{5} > 2$", "$\\sqrt{5} < 2$", "$\\sqrt{5} = 2$", "Không so sánh được"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 3: HÀM SỐ BẬC HAI (Quadratic Functions)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Hàm số $y = 2x^2$ có đồ thị là:", answers: ["Parabol", "Đường thẳng", "Hypebol", "Đường tròn"], correct: 0 },
  { question: "Với $a > 0$, đồ thị hàm số $y = ax^2$ có dạng:", answers: ["Parabol có bề lõm quay lên", "Parabol có bề lõm quay xuống", "Đường thẳng đi lên", "Đường thẳng đi xuống"], correct: 0 },
  { question: "Đỉnh parabol $y = x^2$ là:", answers: ["$(0; 0)$", "$(1; 1)$", "$(0; 1)$", "$(1; 0)$"], correct: 0 },
  { question: "Trục đối xứng của parabol $y = x^2$ là:", answers: ["Trục tung (Oy)", "Trục hoành (Ox)", "$y = x$", "Không có"], correct: 0 },
  { question: "Nếu $x = 2$ thì $y = x^2$ bằng:", answers: ["$4$", "$2$", "$8$", "$0$"], correct: 0 },
  { question: "Với $a < 0$, đồ thị hàm số $y = ax^2$ có dạng:", answers: ["Parabol có bề lõm quay xuống", "Parabol có bề lõm quay lên", "Đường thẳng", "Hypebol"], correct: 0 },
  { question: "Hàm số $y = -3x^2$ đồng biến khi:", answers: ["$x < 0$", "$x > 0$", "Mọi $x$", "Không đồng biến"], correct: 0 },
  { question: "Hàm số $y = 2x^2$ nghịch biến khi:", answers: ["$x < 0$", "$x > 0$", "Mọi $x$", "Không nghịch biến"], correct: 0 },
  { question: "Giá trị nhỏ nhất của hàm số $y = x^2$ là:", answers: ["$0$", "$1$", "$-1$", "Không có"], correct: 0 },
  { question: "Đồ thị hàm số $y = -x^2$ đi qua điểm nào?", answers: ["$(2; -4)$", "$(2; 4)$", "$(1; 1)$", "$(-1; 1)$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 4: PHƯƠNG TRÌNH BẬC HAI (Quadratic Equations)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Dạng tổng quát của phương trình bậc hai là:", answers: ["$ax^2 + bx + c = 0$ (với $a \\neq 0$)", "$ax + b = 0$", "$ax^2 = 0$", "$x^2 + 1 = 0$"], correct: 0 },
  { question: "Nghiệm của phương trình $x^2 = 9$ là:", answers: ["$x = \\pm 3$", "$x = 3$", "$x = -3$", "$x = 81$"], correct: 0 },
  { question: "Phương trình $x^2 - 4 = 0$ có nghiệm là:", answers: ["$x = \\pm 2$", "$x = 2$", "$x = 4$", "$x = \\pm 4$"], correct: 0 },
  { question: "Biệt thức $\\Delta$ của phương trình $ax^2 + bx + c = 0$ là:", answers: ["$\\Delta = b^2 - 4ac$", "$\\Delta = b - 4ac$", "$\\Delta = b^2 + 4ac$", "$\\Delta = 4ac - b^2$"], correct: 0 },
  { question: "Phương trình bậc hai có hai nghiệm phân biệt khi:", answers: ["$\\Delta > 0$", "$\\Delta = 0$", "$\\Delta < 0$", "$\\Delta \\geq 0$"], correct: 0 },
  { question: "Phương trình bậc hai có nghiệm kép khi:", answers: ["$\\Delta = 0$", "$\\Delta > 0$", "$\\Delta < 0$", "$\\Delta \\neq 0$"], correct: 0 },
  { question: "Phương trình bậc hai vô nghiệm khi:", answers: ["$\\Delta < 0$", "$\\Delta > 0$", "$\\Delta = 0$", "$\\Delta \\geq 0$"], correct: 0 },
  { question: "Công thức nghiệm của phương trình bậc hai là:", answers: ["$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$", "$x = \\frac{b \\pm \\sqrt{\\Delta}}{2a}$", "$x = \\frac{-b \\pm \\Delta}{2a}$", "$x = \\frac{-b}{2a}$"], correct: 0 },
  { question: "Nghiệm của phương trình $x^2 - 5x + 6 = 0$ là:", answers: ["$x_1 = 2, x_2 = 3$", "$x_1 = 1, x_2 = 6$", "$x_1 = -2, x_2 = -3$", "Vô nghiệm"], correct: 0 },
  { question: "Với phương trình $x^2 + 2x + 1 = 0$, ta có:", answers: ["Nghiệm kép $x = -1$", "Hai nghiệm phân biệt", "Vô nghiệm", "$x = 1$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 5: HỆ THỨC VI-ÈT (Vieta's Formulas)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Theo hệ thức Vi-ét, với phương trình $ax^2 + bx + c = 0$ có hai nghiệm $x_1, x_2$ thì:", answers: ["$x_1 + x_2 = -\\frac{b}{a}$", "$x_1 + x_2 = \\frac{b}{a}$", "$x_1 + x_2 = \\frac{c}{a}$", "$x_1 + x_2 = -\\frac{c}{a}$"], correct: 0 },
  { question: "Theo hệ thức Vi-ét: $x_1 \\cdot x_2 = $ ?", answers: ["$\\frac{c}{a}$", "$-\\frac{c}{a}$", "$\\frac{b}{a}$", "$-\\frac{b}{a}$"], correct: 0 },
  { question: "Phương trình $x^2 - 7x + 12 = 0$ có hai nghiệm $x_1, x_2$. Tính $x_1 + x_2$:", answers: ["$7$", "$-7$", "$12$", "$-12$"], correct: 0 },
  { question: "Phương trình $x^2 - 5x + 6 = 0$ có hai nghiệm $x_1, x_2$. Tính $x_1 \\cdot x_2$:", answers: ["$6$", "$5$", "$-5$", "$-6$"], correct: 0 },
  { question: "Để phương trình $x^2 + px + q = 0$ có hai nghiệm $x_1 = 2, x_2 = 3$ thì:", answers: ["$p = -5, q = 6$", "$p = 5, q = 6$", "$p = -5, q = -6$", "$p = 5, q = -6$"], correct: 0 },
  { question: "Phương trình có hai nghiệm $x_1 = 1, x_2 = 4$ là:", answers: ["$x^2 - 5x + 4 = 0$", "$x^2 + 5x + 4 = 0$", "$x^2 - 5x - 4 = 0$", "$x^2 + 5x - 4 = 0$"], correct: 0 },
  { question: "Nếu $x_1 + x_2 = 3$ và $x_1 \\cdot x_2 = 2$ thì phương trình là:", answers: ["$x^2 - 3x + 2 = 0$", "$x^2 + 3x + 2 = 0$", "$x^2 - 3x - 2 = 0$", "$x^2 + 3x - 2 = 0$"], correct: 0 },
  { question: "Phương trình $x^2 + 4x + 3 = 0$ có $x_1 + x_2$ bằng:", answers: ["$-4$", "$4$", "$3$", "$-3$"], correct: 0 },
  { question: "Phương trình $2x^2 - 6x + 4 = 0$ có $x_1 \\cdot x_2$ bằng:", answers: ["$2$", "$3$", "$-2$", "$-3$"], correct: 0 },
  { question: "Biết $x_1, x_2$ là nghiệm của $x^2 - 6x + 8 = 0$. Tính $x_1^2 + x_2^2$:", answers: ["$20$", "$36$", "$8$", "$14$"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 6: HỆ PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN (Systems of Linear Equations)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Nghiệm của hệ phương trình $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$ là:", answers: ["$(3; 2)$", "$(2; 3)$", "$(4; 1)$", "$(1; 4)$"], correct: 0 },
  { question: "Nghiệm của hệ $\\begin{cases} 2x + y = 7 \\\\ x + y = 4 \\end{cases}$ là:", answers: ["$(3; 1)$", "$(1; 3)$", "$(2; 2)$", "$(4; 0)$"], correct: 0 },
  { question: "Hệ phương trình $\\begin{cases} x + 2y = 8 \\\\ 2x - y = 1 \\end{cases}$ có nghiệm:", answers: ["$(2; 3)$", "$(3; 2)$", "$(1; 3,5)$", "$(4; 2)$"], correct: 0 },
  { question: "Phương pháp thế là:", answers: ["Biểu diễn ẩn này theo ẩn kia rồi thế vào phương trình còn lại", "Cộng hoặc trừ hai phương trình", "Nhân hai phương trình", "Chia hai phương trình"], correct: 0 },
  { question: "Phương pháp cộng đại số là:", answers: ["Cộng hoặc trừ từng vế để khử ẩn", "Thế ẩn này vào ẩn kia", "Nhân hai phương trình", "Chia hai phương trình"], correct: 0 },
  { question: "Hệ $\\begin{cases} x - y = 0 \\\\ x + y = 4 \\end{cases}$ có nghiệm:", answers: ["$(2; 2)$", "$(0; 0)$", "$(4; 0)$", "$(0; 4)$"], correct: 0 },
  { question: "Hệ $\\begin{cases} 3x + y = 10 \\\\ x + y = 4 \\end{cases}$ có nghiệm:", answers: ["$(3; 1)$", "$(1; 3)$", "$(2; 2)$", "$(4; 0)$"], correct: 0 },
  { question: "Giải hệ $\\begin{cases} 2x = 6 \\\\ x + y = 5 \\end{cases}$, ta có:", answers: ["$(3; 2)$", "$(2; 3)$", "$(6; -1)$", "$(3; 5)$"], correct: 0 },
  { question: "Hệ $\\begin{cases} x + y = 10 \\\\ x - y = 2 \\end{cases}$ có nghiệm $x$ bằng:", answers: ["$6$", "$4$", "$8$", "$5$"], correct: 0 },
  { question: "Hệ vô nghiệm khi:", answers: ["Hai đường thẳng song song", "Hai đường thẳng trùng nhau", "Hai đường thẳng cắt nhau", "Hai đường thẳng vuông góc"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 7: GÓC VỚI ĐƯỜNG TRÒN (Angles and Circles)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Góc ở tâm là góc có đỉnh:", answers: ["Tại tâm đường tròn", "Trên đường tròn", "Bên trong đường tròn", "Bên ngoài đường tròn"], correct: 0 },
  { question: "Cung lớn và cung nhỏ của đường tròn có:", answers: ["Tổng số đo bằng $360°$", "Tổng số đo bằng $180°$", "Số đo bằng nhau", "Hiệu số đo bằng $90°$"], correct: 0 },
  { question: "Số đo cung là:", answers: ["Số đo góc ở tâm chắn cung đó", "Độ dài cung đó", "Bán kính đường tròn", "Đường kính đường tròn"], correct: 0 },
  { question: "Trong đường tròn, hai cung bằng nhau thì:", answers: ["Hai dây căng hai cung đó bằng nhau", "Hai dây song song", "Hai dây vuông góc", "Không liên quan"], correct: 0 },
  { question: "Đường kính là dây cung:", answers: ["Lớn nhất", "Nhỏ nhất", "Bất kỳ", "Trung bình"], correct: 0 },
  { question: "Đường kính đi qua trung điểm của dây (không qua tâm) thì:", answers: ["Vuông góc với dây đó", "Song song với dây đó", "Trùng với dây đó", "Không liên quan"], correct: 0 },
  { question: "Trong đường tròn, hai dây bằng nhau thì:", answers: ["Cách đều tâm", "Tạo góc vuông", "Song song", "Trùng nhau"], correct: 0 },
  { question: "Liên hệ giữa dây và khoảng cách đến tâm:", answers: ["Dây lớn hơn thì gần tâm hơn", "Dây lớn hơn thì xa tâm hơn", "Không liên quan", "Luôn bằng nhau"], correct: 0 },
  { question: "Tiếp tuyến của đường tròn là đường thẳng:", answers: ["Có một điểm chung duy nhất với đường tròn", "Có hai điểm chung với đường tròn", "Không có điểm chung", "Có vô số điểm chung"], correct: 0 },
  { question: "Tiếp tuyến tại một điểm thì:", answers: ["Vuông góc với bán kính tại điểm đó", "Song song với bán kính", "Trùng với bán kính", "Tạo góc $45°$ với bán kính"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHƯƠNG 8: GÓC NỘI TIẾP (Inscribed Angles)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Góc nội tiếp là góc có đỉnh:", answers: ["Trên đường tròn", "Tại tâm đường tròn", "Bên trong đường tròn", "Bên ngoài đường tròn"], correct: 0 },
  { question: "Góc nội tiếp có số đo bằng:", answers: ["Nửa số đo cung bị chắn", "Số đo cung bị chắn", "Gấp đôi số đo cung bị chắn", "Gấp ba số đo cung bị chắn"], correct: 0 },
  { question: "Góc nội tiếp chắn nửa đường tròn là góc:", answers: ["Vuông", "Nhọn", "Tù", "Bẹt"], correct: 0 },
  { question: "Các góc nội tiếp cùng chắn một cung thì:", answers: ["Bằng nhau", "Bù nhau", "Phụ nhau", "Đối đỉnh"], correct: 0 },
  { question: "Góc nội tiếp và góc ở tâm cùng chắn một cung thì:", answers: ["Góc nội tiếp bằng nửa góc ở tâm", "Góc nội tiếp bằng góc ở tâm", "Góc nội tiếp gấp đôi góc ở tâm", "Không liên quan"], correct: 0 },
  { question: "Trong đường tròn, góc có đỉnh bên trong đường tròn có số đo bằng:", answers: ["Nửa tổng số đo hai cung bị chắn", "Tổng số đo hai cung bị chắn", "Nửa hiệu số đo hai cung bị chắn", "Hiệu số đo hai cung bị chắn"], correct: 0 },
  { question: "Tứ giác nội tiếp đường tròn có:", answers: ["Tổng hai góc đối bằng $180°$", "Tổng hai góc đối bằng $90°$", "Hai góc đối bằng nhau", "Bốn góc bằng nhau"], correct: 0 },
  { question: "Một tứ giác là tứ giác nội tiếp khi:", answers: ["Tổng hai góc đối bằng $180°$", "Có ba đỉnh cùng nằm trên đường tròn", "Có hai đỉnh cùng nằm trên đường tròn", "Có bốn cạnh bằng nhau"], correct: 0 },
  { question: "Góc tạo bởi tia tiếp tuyến và dây cung có số đo bằng:", answers: ["Nửa số đo cung bị chắn", "Số đo cung bị chắn", "Gấp đôi số đo cung bị chắn", "$90°$"], correct: 0 },
  { question: "Trong đường tròn $(O)$, nếu góc ở tâm bằng $80°$ thì góc nội tiếp cùng chắn cung đó bằng:", answers: ["$40°$", "$80°$", "$160°$", "$20°$"], correct: 0 }
];

export const BACKUP_QUESTIONS: Question[] = [
  // Backup questions - Câu hỏi dự phòng Toán 9 HK1
  { question: "$\\sqrt{36}$ bằng:", answers: ["$6$", "$18$", "$\\pm 6$", "$12$"], correct: 0 },
  { question: "Nghiệm của phương trình $x^2 = 16$ là:", answers: ["$x = \\pm 4$", "$x = 4$", "$x = 8$", "$x = 2$"], correct: 0 },
  { question: "Rút gọn: $\\sqrt{27}$", answers: ["$3\\sqrt{3}$", "$9\\sqrt{3}$", "$\\sqrt{9}$", "$27$"], correct: 0 },
  { question: "Trục căn thức: $\\frac{3}{\\sqrt{3}}$", answers: ["$\\sqrt{3}$", "$3$", "$\\frac{1}{3}$", "$9$"], correct: 0 },
  { question: "Hàm số $y = x^2$ có đồ thị là:", answers: ["Parabol", "Đường thẳng", "Hypebol", "Đường tròn"], correct: 0 },
  { question: "Biệt thức $\\Delta$ của $x^2 - 4x + 4 = 0$ là:", answers: ["$0$", "$4$", "$16$", "$-16$"], correct: 0 },
  { question: "Phương trình có nghiệm kép khi:", answers: ["$\\Delta = 0$", "$\\Delta > 0$", "$\\Delta < 0$", "$\\Delta \\neq 0$"], correct: 0 },
  { question: "Theo Vi-ét, với $x^2 - 3x + 2 = 0$: $x_1 + x_2$ bằng:", answers: ["$3$", "$-3$", "$2$", "$-2$"], correct: 0 },
  { question: "Nghiệm của hệ $\\begin{cases} x + y = 6 \\\\ x - y = 2 \\end{cases}$ là:", answers: ["$(4; 2)$", "$(2; 4)$", "$(3; 3)$", "$(6; 0)$"], correct: 0 },
  { question: "$\\sqrt{4} + \\sqrt{9}$ bằng:", answers: ["$5$", "$\\sqrt{13}$", "$13$", "$7$"], correct: 0 },
  { question: "Điều kiện để $\\sqrt{x - 1}$ có nghĩa:", answers: ["$x \\geq 1$", "$x > 1$", "$x \\leq 1$", "$x \\neq 1$"], correct: 0 },
  { question: "$3\\sqrt{5} + 2\\sqrt{5}$ bằng:", answers: ["$5\\sqrt{5}$", "$6\\sqrt{5}$", "$5\\sqrt{10}$", "$\\sqrt{25}$"], correct: 0 },
  { question: "Nghiệm của $x^2 - 9 = 0$ là:", answers: ["$x = \\pm 3$", "$x = 3$", "$x = 9$", "$x = \\pm 9$"], correct: 0 },
  { question: "Đỉnh của parabol $y = -x^2$ là:", answers: ["$(0; 0)$", "$(1; -1)$", "$(-1; -1)$", "$(0; 1)$"], correct: 0 },
  { question: "Công thức nghiệm phương trình bậc hai:", answers: ["$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$", "$x = \\frac{b \\pm \\sqrt{\\Delta}}{2a}$", "$x = \\frac{-b}{2a}$", "$x = \\sqrt{\\Delta}$"], correct: 0 },
  { question: "Nghiệm của $x^2 + 2x + 1 = 0$ là:", answers: ["$x = -1$ (kép)", "$x = 1$", "$x = \\pm 1$", "Vô nghiệm"], correct: 0 },
  { question: "Hệ $\\begin{cases} 2x + y = 8 \\\\ x = 3 \\end{cases}$ có nghiệm:", answers: ["$(3; 2)$", "$(2; 3)$", "$(3; 8)$", "$(8; 2)$"], correct: 0 },
  { question: "Góc nội tiếp chắn nửa đường tròn:", answers: ["$90°$", "$180°$", "$45°$", "$60°$"], correct: 0 },
  { question: "Tứ giác nội tiếp có tổng hai góc đối:", answers: ["$180°$", "$90°$", "$360°$", "$270°$"], correct: 0 },
  { question: "$\\sqrt{64} : \\sqrt{16}$ bằng:", answers: ["$2$", "$4$", "$8$", "$48$"], correct: 0 },
  { question: "Rút gọn: $\\sqrt{32}$", answers: ["$4\\sqrt{2}$", "$2\\sqrt{4}$", "$8\\sqrt{4}$", "$16$"], correct: 0 },
  { question: "Phương trình $x^2 - 6x + 9 = 0$ có nghiệm:", answers: ["$x = 3$ (kép)", "$x = \\pm 3$", "$x = 6$", "$x = 9$"], correct: 0 },
  { question: "Với $x^2 - 4x + 3 = 0$: $x_1 \\cdot x_2$ bằng:", answers: ["$3$", "$4$", "$-4$", "$-3$"], correct: 0 },
  { question: "Tiếp tuyến với đường tròn tại một điểm thì:", answers: ["Vuông góc với bán kính tại điểm đó", "Song song với bán kính", "Trùng với bán kính", "Tạo góc $45°$"], correct: 0 },
  { question: "Góc ở tâm chắn cung $120°$ thì góc nội tiếp cùng chắn cung đó:", answers: ["$60°$", "$120°$", "$240°$", "$30°$"], correct: 0 },
  { question: "$\\sqrt{75} - \\sqrt{12}$ bằng:", answers: ["$3\\sqrt{3}$", "$\\sqrt{63}$", "$5\\sqrt{3}$", "$63$"], correct: 0 },
  { question: "Hàm số $y = -2x^2$ nghịch biến khi:", answers: ["$x > 0$", "$x < 0$", "Mọi $x$", "Không nghịch biến"], correct: 0 },
  { question: "Phương trình vô nghiệm khi:", answers: ["$\\Delta < 0$", "$\\Delta = 0$", "$\\Delta > 0$", "$\\Delta \\geq 0$"], correct: 0 },
  { question: "Nghiệm của hệ $\\begin{cases} x = y \\\\ x + y = 10 \\end{cases}$ là:", answers: ["$(5; 5)$", "$(10; 0)$", "$(0; 10)$", "$(6; 4)$"], correct: 0 },
  { question: "Trong đường tròn, hai dây bằng nhau thì:", answers: ["Cách đều tâm", "Song song", "Vuông góc", "Trùng nhau"], correct: 0 },
  { question: "$\\sqrt{x^2}$ với $x < 0$ bằng:", answers: ["$-x$", "$x$", "$|x|$", "$0$"], correct: 0 },
  { question: "Phương trình có hai nghiệm $x_1 = 2, x_2 = -3$ là:", answers: ["$x^2 + x - 6 = 0$", "$x^2 - x - 6 = 0$", "$x^2 + x + 6 = 0$", "$x^2 - x + 6 = 0$"], correct: 0 },
  { question: "Đường kính là dây cung:", answers: ["Lớn nhất", "Nhỏ nhất", "Trung bình", "Bất kỳ"], correct: 0 },
  { question: "Khử mẫu: $\\sqrt{\\frac{5}{9}}$", answers: ["$\\frac{\\sqrt{5}}{3}$", "$\\frac{5}{3}$", "$\\frac{\\sqrt{45}}{9}$", "$\\frac{\\sqrt{5}}{9}$"], correct: 0 },
  { question: "Phương pháp giải hệ bằng cách cộng/trừ từng vế:", answers: ["Phương pháp cộng đại số", "Phương pháp thế", "Phương pháp Cramer", "Phương pháp đồ thị"], correct: 0 }
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
