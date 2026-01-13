
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_6', name: 'Bạn lớp 6', role: 'Bạn học cùng lớp', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ mặt', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════════
  // UNIT 1: PRESENT TENSES (Thì hiện tại)
  // ═══════════════════════════════════════════════════════════════════
  { question: "She _____ to school every day.", answers: ["goes", "go", "going", "went"], correct: 0 },
  { question: "They _____ playing football now.", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "I _____ in this city since 2010.", answers: ["have lived", "live", "am living", "lived"], correct: 0 },
  { question: "He _____ English for 5 years.", answers: ["has studied", "studies", "is studying", "studied"], correct: 0 },
  { question: "Water _____ at 100 degrees Celsius.", answers: ["boils", "boil", "is boiling", "boiled"], correct: 0 },
  { question: "Look! The children _____ in the garden.", answers: ["are playing", "play", "plays", "played"], correct: 0 },
  { question: "My mother usually _____ breakfast at 7 am.", answers: ["cooks", "cook", "is cooking", "cooked"], correct: 0 },
  { question: "We _____ each other for ten years.", answers: ["have known", "know", "are knowing", "knew"], correct: 0 },
  { question: "She _____ her homework at the moment.", answers: ["is doing", "does", "do", "has done"], correct: 0 },
  { question: "The sun _____ in the east.", answers: ["rises", "rise", "is rising", "rose"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 2: PAST TENSES (Thì quá khứ)
  // ═══════════════════════════════════════════════════════════════════
  { question: "I _____ to the cinema yesterday.", answers: ["went", "go", "am going", "have gone"], correct: 0 },
  { question: "When I arrived, they _____ dinner.", answers: ["were having", "had", "have", "are having"], correct: 0 },
  { question: "He _____ his homework before he went out.", answers: ["had finished", "finished", "has finished", "finish"], correct: 0 },
  { question: "She _____ in London in 2015.", answers: ["lived", "lives", "has lived", "is living"], correct: 0 },
  { question: "We _____ TV when the phone rang.", answers: ["were watching", "watched", "watch", "have watched"], correct: 0 },
  { question: "They _____ the house before the storm came.", answers: ["had left", "left", "leave", "are leaving"], correct: 0 },
  { question: "I _____ my keys this morning.", answers: ["lost", "lose", "have lost", "am losing"], correct: 0 },
  { question: "While she _____, I was cleaning the room.", answers: ["was cooking", "cooked", "cooks", "has cooked"], correct: 0 },
  { question: "He _____ his car last week.", answers: ["sold", "sells", "has sold", "is selling"], correct: 0 },
  { question: "After I _____ lunch, I went for a walk.", answers: ["had eaten", "ate", "have eaten", "eat"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 3: FUTURE TENSES (Thì tương lai)
  // ═══════════════════════════════════════════════════════════════════
  { question: "I _____ visit my grandparents next week.", answers: ["will", "am", "have", "do"], correct: 0 },
  { question: "She _____ going to travel to Paris tomorrow.", answers: ["is", "will", "has", "does"], correct: 0 },
  { question: "They _____ married next month.", answers: ["are getting", "get", "will get", "got"], correct: 0 },
  { question: "The train _____ at 8 pm tonight.", answers: ["leaves", "will leave", "is leaving", "left"], correct: 0 },
  { question: "I think it _____ rain tomorrow.", answers: ["will", "is", "does", "has"], correct: 0 },
  { question: "We _____ a party this Saturday.", answers: ["are having", "have", "will have", "had"], correct: 0 },
  { question: "By next year, I _____ for this company for 5 years.", answers: ["will have worked", "will work", "work", "am working"], correct: 0 },
  { question: "Look at those clouds! It _____ rain.", answers: ["is going to", "will", "is", "does"], correct: 0 },
  { question: "The meeting _____ at 3 pm tomorrow.", answers: ["starts", "will start", "is starting", "started"], correct: 0 },
  { question: "I promise I _____ be late again.", answers: ["won't", "don't", "am not", "haven't"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 4: CONDITIONAL SENTENCES (Câu điều kiện)
  // ═══════════════════════════════════════════════════════════════════
  { question: "If it rains, I _____ stay at home.", answers: ["will", "would", "can", "may"], correct: 0 },
  { question: "If I _____ rich, I would travel around the world.", answers: ["were", "am", "was", "be"], correct: 0 },
  { question: "If he had studied harder, he _____ passed the exam.", answers: ["would have", "will", "would", "will have"], correct: 0 },
  { question: "If you heat ice, it _____.", answers: ["melts", "melt", "will melt", "would melt"], correct: 0 },
  { question: "If I _____ you, I would accept that job.", answers: ["were", "am", "was", "be"], correct: 0 },
  { question: "If she _____ harder, she will succeed.", answers: ["works", "work", "worked", "will work"], correct: 0 },
  { question: "If they had arrived earlier, they _____ the beginning of the movie.", answers: ["would have seen", "will see", "see", "saw"], correct: 0 },
  { question: "If you _____ hungry, I will make you a sandwich.", answers: ["are", "were", "will be", "would be"], correct: 0 },
  { question: "If I had known you were coming, I _____ prepared lunch.", answers: ["would have", "will", "would", "have"], correct: 0 },
  { question: "Unless you hurry, you _____ the train.", answers: ["will miss", "miss", "would miss", "missed"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 5: PASSIVE VOICE (Câu bị động)
  // ═══════════════════════════════════════════════════════════════════
  { question: "The letter _____ by her yesterday.", answers: ["was written", "wrote", "is written", "writes"], correct: 0 },
  { question: "English _____ all over the world.", answers: ["is spoken", "speaks", "spoke", "was spoken"], correct: 0 },
  { question: "The house _____ in 1990.", answers: ["was built", "built", "is built", "builds"], correct: 0 },
  { question: "The problem _____ by the teacher now.", answers: ["is being explained", "explains", "explained", "was explained"], correct: 0 },
  { question: "A new bridge _____ next year.", answers: ["will be built", "builds", "is built", "was built"], correct: 0 },
  { question: "The car _____ by John.", answers: ["was stolen", "stole", "steals", "is stealing"], correct: 0 },
  { question: "This book _____ by millions of people.", answers: ["has been read", "reads", "read", "is reading"], correct: 0 },
  { question: "Dinner _____ at 7 pm every day.", answers: ["is served", "serves", "served", "was served"], correct: 0 },
  { question: "The windows _____ every week.", answers: ["are cleaned", "clean", "cleaned", "cleans"], correct: 0 },
  { question: "His homework _____ before he went to bed.", answers: ["had been finished", "finished", "is finished", "finishes"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 6: REPORTED SPEECH (Câu gián tiếp)
  // ═══════════════════════════════════════════════════════════════════
  { question: "She said, 'I am studying.' → She said she _____ studying.", answers: ["was", "is", "am", "were"], correct: 0 },
  { question: "He said, 'I will come tomorrow.' → He said he _____ come the next day.", answers: ["would", "will", "can", "may"], correct: 0 },
  { question: "They asked me, 'Where do you live?' → They asked me where I _____.", answers: ["lived", "live", "am living", "was living"], correct: 0 },
  { question: "She said, 'I have finished my work.' → She said she _____ her work.", answers: ["had finished", "has finished", "finished", "finishes"], correct: 0 },
  { question: "He said to me, 'Don't be late!' → He told me _____ late.", answers: ["not to be", "don't be", "not be", "to not be"], correct: 0 },
  { question: "Mary said, 'I can swim.' → Mary said she _____ swim.", answers: ["could", "can", "may", "will"], correct: 0 },
  { question: "John said, 'I am going to the party.' → John said he _____ to the party.", answers: ["was going", "is going", "goes", "went"], correct: 0 },
  { question: "She asked, 'Have you seen Tom?' → She asked if I _____ Tom.", answers: ["had seen", "have seen", "saw", "see"], correct: 0 },
  { question: "He said, 'I bought a car yesterday.' → He said he _____ a car the day before.", answers: ["had bought", "bought", "has bought", "buys"], correct: 0 },
  { question: "The teacher said, 'Be quiet!' → The teacher told us _____ quiet.", answers: ["to be", "be", "being", "are"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 7: PREPOSITIONS (Giới từ)
  // ═══════════════════════════════════════════════════════════════════
  { question: "She arrived _____ the airport at 6 pm.", answers: ["at", "in", "on", "to"], correct: 0 },
  { question: "I was born _____ 1990.", answers: ["in", "on", "at", "by"], correct: 0 },
  { question: "The book is _____ the table.", answers: ["on", "in", "at", "by"], correct: 0 },
  { question: "We will meet _____ Monday.", answers: ["on", "in", "at", "by"], correct: 0 },
  { question: "He lives _____ New York.", answers: ["in", "on", "at", "by"], correct: 0 },
  { question: "The meeting is _____ 3 pm.", answers: ["at", "in", "on", "by"], correct: 0 },
  { question: "She is good _____ English.", answers: ["at", "in", "on", "for"], correct: 0 },
  { question: "I'm interested _____ music.", answers: ["in", "at", "on", "for"], correct: 0 },
  { question: "He went to school _____ bus.", answers: ["by", "on", "in", "at"], correct: 0 },
  { question: "The picture is _____ the wall.", answers: ["on", "in", "at", "by"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 8: PHRASAL VERBS (Cụm động từ)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Please _____ your shoes before entering.", answers: ["take off", "put on", "turn on", "look for"], correct: 0 },
  { question: "I need to _____ some information about the course.", answers: ["look for", "look at", "look after", "look up"], correct: 0 },
  { question: "Can you _____ the TV? I can't hear it.", answers: ["turn up", "turn down", "turn on", "turn off"], correct: 0 },
  { question: "She _____ her younger brother while her parents are away.", answers: ["looks after", "looks for", "looks at", "looks up"], correct: 0 },
  { question: "The meeting has been _____.", answers: ["put off", "put on", "put up", "put down"], correct: 0 },
  { question: "He _____ smoking last year.", answers: ["gave up", "gave in", "gave out", "gave away"], correct: 0 },
  { question: "Please _____ the form and send it to us.", answers: ["fill in", "fill out", "fill up", "fill with"], correct: 0 },
  { question: "I can't _____ with his bad behavior anymore.", answers: ["put up", "put on", "put off", "put down"], correct: 0 },
  { question: "She _____ early this morning.", answers: ["got up", "got on", "got off", "got over"], correct: 0 },
  { question: "They decided to _____ the wedding.", answers: ["call off", "call on", "call for", "call up"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 9: VOCABULARY - WORD FORMS (Từ loại)
  // ═══════════════════════════════════════════════════════════════════
  { question: "She is a very _____ person. (care)", answers: ["careful", "careless", "caring", "care"], correct: 0 },
  { question: "The movie was really _____. (excite)", answers: ["exciting", "excited", "excitement", "excite"], correct: 0 },
  { question: "He speaks English very _____. (fluent)", answers: ["fluently", "fluent", "fluency", "fluence"], correct: 0 },
  { question: "I feel _____ when I listen to music. (relax)", answers: ["relaxed", "relaxing", "relax", "relaxation"], correct: 0 },
  { question: "Her _____ was very impressive. (perform)", answers: ["performance", "perform", "performer", "performing"], correct: 0 },
  { question: "This book is very _____. (use)", answers: ["useful", "useless", "using", "use"], correct: 0 },
  { question: "He made an important _____ yesterday. (decide)", answers: ["decision", "decide", "decisive", "deciding"], correct: 0 },
  { question: "The weather is _____ today. (beauty)", answers: ["beautiful", "beautifully", "beauty", "beautify"], correct: 0 },
  { question: "She gave me a _____ smile. (friend)", answers: ["friendly", "friendship", "friend", "friendliness"], correct: 0 },
  { question: "His _____ surprised everyone. (arrive)", answers: ["arrival", "arrive", "arriving", "arrived"], correct: 0 }
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
