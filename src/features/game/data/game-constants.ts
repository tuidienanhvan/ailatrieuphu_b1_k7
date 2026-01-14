
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Teacher', role: 'English Teacher', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_6', name: 'Classmate', role: 'Grade 6 Friend', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Stranger', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════════
  // UNIT 1: MY NEW SCHOOL (Trường mới của em)
  // ═══════════════════════════════════════════════════════════════════
  { question: "I _____ a student at Nguyen Du Secondary School.", answers: ["am", "is", "are", "be"], correct: 0 },
  { question: "She _____ to school by bike every day.", answers: ["goes", "go", "going", "is go"], correct: 0 },
  { question: "My school has a big _____. We play football there.", answers: ["playground", "classroom", "library", "kitchen"], correct: 0 },
  { question: "_____ is your school? - It's in the city center.", answers: ["Where", "What", "When", "Who"], correct: 0 },
  { question: "There _____ 30 students in my class.", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "My favorite _____ is English. I love learning new words.", answers: ["subject", "teacher", "room", "book"], correct: 0 },
  { question: "The opposite of 'big' is _____.", answers: ["small", "tall", "long", "wide"], correct: 0 },
  { question: "We have lunch at the school _____.", answers: ["canteen", "library", "gym", "office"], correct: 0 },
  { question: "She _____ her homework every evening.", answers: ["does", "do", "doing", "is do"], correct: 0 },
  { question: "My classroom is on the _____ floor.", answers: ["second", "two", "twice", "double"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 2: MY HOME (Ngôi nhà của em)
  // ═══════════════════════════════════════════════════════════════════
  { question: "I live in a _____ in the countryside.", answers: ["house", "apartment", "flat", "hotel"], correct: 0 },
  { question: "The living room is _____ the bedroom.", answers: ["next to", "in", "on", "at"], correct: 0 },
  { question: "There is a TV _____ the living room.", answers: ["in", "on", "at", "under"], correct: 0 },
  { question: "My mother cooks in the _____.", answers: ["kitchen", "bedroom", "bathroom", "garden"], correct: 0 },
  { question: "Where _____ your bedroom? - It's upstairs.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "There _____ a sofa in the living room.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "The bookshelf is _____ the desk.", answers: ["behind", "front", "up", "down"], correct: 0 },
  { question: "We keep our clothes in the _____.", answers: ["wardrobe", "fridge", "oven", "sink"], correct: 0 },
  { question: "The lamp is _____ the table.", answers: ["on", "in", "under", "at"], correct: 0 },
  { question: "My house has three _____ and two bathrooms.", answers: ["bedrooms", "bedroom", "bed", "beds"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 3: MY FRIENDS (Bạn bè của em)
  // ═══════════════════════════════════════════════════════════════════
  { question: "My best friend _____ long black hair.", answers: ["has", "have", "having", "is have"], correct: 0 },
  { question: "She is very _____. She always helps others.", answers: ["kind", "lazy", "boring", "ugly"], correct: 0 },
  { question: "He _____ glasses because he can't see well.", answers: ["wears", "wear", "wearing", "is wear"], correct: 0 },
  { question: "My friend is _____. He makes everyone laugh.", answers: ["funny", "sad", "angry", "tired"], correct: 0 },
  { question: "What _____ she look like? - She's tall and slim.", answers: ["does", "do", "is", "are"], correct: 0 },
  { question: "Tom is _____ than his brother.", answers: ["taller", "tall", "tallest", "more tall"], correct: 0 },
  { question: "She has _____ eyes and a small nose.", answers: ["blue", "blues", "bluing", "blued"], correct: 0 },
  { question: "My sister is very _____. She gets good grades.", answers: ["clever", "lazy", "boring", "weak"], correct: 0 },
  { question: "He is _____. He spends a lot of time helping others.", answers: ["generous", "selfish", "mean", "rude"], correct: 0 },
  { question: "Who is that girl? - That's my friend, _____.", answers: ["Lan", "is Lan", "Lan is", "she Lan"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 4: MY NEIGHBOURHOOD (Khu phố của em)
  // ═══════════════════════════════════════════════════════════════════
  { question: "There is a _____ near my house. I buy bread there.", answers: ["bakery", "library", "school", "hospital"], correct: 0 },
  { question: "The bank is _____ the post office and the supermarket.", answers: ["between", "next", "behind", "in front"], correct: 0 },
  { question: "I often go to the _____ to borrow books.", answers: ["library", "cinema", "stadium", "market"], correct: 0 },
  { question: "Can you tell me the _____ to the museum?", answers: ["way", "road", "street", "path"], correct: 0 },
  { question: "Turn _____ at the traffic lights.", answers: ["left", "up", "down", "from"], correct: 0 },
  { question: "The supermarket is _____ to the pharmacy.", answers: ["next", "near", "between", "opposite"], correct: 0 },
  { question: "My neighbourhood is very _____. There's no noise.", answers: ["peaceful", "noisy", "crowded", "busy"], correct: 0 },
  { question: "Go _____ this street and turn right.", answers: ["along", "in", "at", "on"], correct: 0 },
  { question: "The hospital is _____ the school.", answers: ["opposite", "next", "between", "in"], correct: 0 },
  { question: "It's about 500 metres from here. It _____ take long.", answers: ["won't", "not", "isn't", "doesn't"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 5: NATURAL WONDERS OF THE WORLD (Kỳ quan thiên nhiên)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Ha Long Bay is a famous natural _____ in Vietnam.", answers: ["wonder", "country", "city", "river"], correct: 0 },
  { question: "The Sahara is the largest _____ in the world.", answers: ["desert", "forest", "river", "mountain"], correct: 0 },
  { question: "We should _____ more trees to protect the environment.", answers: ["plant", "cut", "burn", "destroy"], correct: 0 },
  { question: "The Amazon is the longest _____ in the world.", answers: ["river", "ocean", "sea", "lake"], correct: 0 },
  { question: "Mount Everest is the _____ mountain on Earth.", answers: ["highest", "higher", "high", "more high"], correct: 0 },
  { question: "The Great Barrier Reef is in _____.", answers: ["Australia", "Vietnam", "America", "China"], correct: 0 },
  { question: "We must _____ our natural wonders.", answers: ["protect", "destroy", "cut", "remove"], correct: 0 },
  { question: "Niagara Falls is a _____ waterfall.", answers: ["spectacular", "boring", "ugly", "dirty"], correct: 0 },
  { question: "There are many _____ in the rainforest.", answers: ["animals", "animal", "deserts", "cities"], correct: 0 },
  { question: "This island is _____ beautiful. I love it here.", answers: ["really", "very much", "so much", "too much"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 6: OUR TET HOLIDAY (Tết của chúng ta)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Tet is the most important _____ in Vietnam.", answers: ["festival", "day", "month", "week"], correct: 0 },
  { question: "Vietnamese people often _____ their houses before Tet.", answers: ["decorate", "destroy", "leave", "close"], correct: 0 },
  { question: "Children receive _____ money at Tet.", answers: ["lucky", "luck", "luckily", "unlucky"], correct: 0 },
  { question: "We _____ fireworks on New Year's Eve.", answers: ["watch", "watching", "watches", "watchs"], correct: 0 },
  { question: "People often _____ new clothes at Tet.", answers: ["wear", "wearing", "wears", "to wear"], correct: 0 },
  { question: "What _____ you do during Tet? - I visit my grandparents.", answers: ["do", "does", "are", "is"], correct: 0 },
  { question: "Banh chung is a _____ Vietnamese food.", answers: ["traditional", "modern", "new", "foreign"], correct: 0 },
  { question: "We wish each other _____ at Tet.", answers: ["good luck", "bad luck", "unlucky", "lucky bad"], correct: 0 },
  { question: "My family _____ going to visit relatives tomorrow.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "_____ do you do at Tet? - I eat lots of delicious food.", answers: ["What", "Where", "When", "Why"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // GRAMMAR: PRESENT SIMPLE TENSE (Thì hiện tại đơn)
  // ═══════════════════════════════════════════════════════════════════
  { question: "She _____ breakfast at 7 o'clock every day.", answers: ["has", "have", "having", "is have"], correct: 0 },
  { question: "My brother _____ football on Sundays.", answers: ["plays", "play", "playing", "is play"], correct: 0 },
  { question: "They _____ to school by bus.", answers: ["go", "goes", "going", "is go"], correct: 0 },
  { question: "_____ your parents work in the city?", answers: ["Do", "Does", "Is", "Are"], correct: 0 },
  { question: "He _____ like vegetables.", answers: ["doesn't", "don't", "isn't", "aren't"], correct: 0 },
  { question: "The sun _____ in the east.", answers: ["rises", "rise", "rising", "is rise"], correct: 0 },
  { question: "Water _____ at 100 degrees Celsius.", answers: ["boils", "boil", "boiling", "is boil"], correct: 0 },
  { question: "She always _____ to music in the evening.", answers: ["listens", "listen", "listening", "is listen"], correct: 0 },
  { question: "_____ Minh speak English well?", answers: ["Does", "Do", "Is", "Are"], correct: 0 },
  { question: "I _____ get up early on weekends.", answers: ["don't", "doesn't", "isn't", "won't"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // GRAMMAR: PRESENT CONTINUOUS TENSE (Thì hiện tại tiếp diễn)
  // ═══════════════════════════════════════════════════════════════════
  { question: "Look! The children _____ in the garden.", answers: ["are playing", "play", "plays", "is playing"], correct: 0 },
  { question: "She _____ her homework now.", answers: ["is doing", "does", "do", "doing"], correct: 0 },
  { question: "What _____ you doing? - I'm reading a book.", answers: ["are", "do", "does", "is"], correct: 0 },
  { question: "My mother _____ cooking dinner at the moment.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "They _____ watching TV right now.", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "_____ he sleeping? - No, he isn't.", answers: ["Is", "Are", "Do", "Does"], correct: 0 },
  { question: "I _____ studying English at the moment.", answers: ["am", "is", "are", "be"], correct: 0 },
  { question: "The students _____ listening to the teacher.", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "Be quiet! The baby _____.", answers: ["is sleeping", "sleeps", "sleep", "sleeping"], correct: 0 },
  { question: "We _____ having a party this weekend.", answers: ["are", "is", "am", "be"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // VOCABULARY: COMMON WORDS (Từ vựng thông dụng)
  // ═══════════════════════════════════════════════════════════════════
  { question: "The opposite of 'happy' is _____.", answers: ["sad", "glad", "angry", "tired"], correct: 0 },
  { question: "A person who teaches students is a _____.", answers: ["teacher", "doctor", "farmer", "driver"], correct: 0 },
  { question: "We use a _____ to write on paper.", answers: ["pen", "ruler", "eraser", "book"], correct: 0 },
  { question: "The seventh month of the year is _____.", answers: ["July", "June", "August", "May"], correct: 0 },
  { question: "How many _____ are there in a week? - Seven.", answers: ["days", "months", "years", "hours"], correct: 0 },
  { question: "The opposite of 'old' is _____.", answers: ["young", "tall", "short", "big"], correct: 0 },
  { question: "We use our _____ to see things.", answers: ["eyes", "ears", "nose", "mouth"], correct: 0 },
  { question: "A _____ is a large animal that lives in Africa.", answers: ["elephant", "cat", "dog", "fish"], correct: 0 },
  { question: "The color of the sky is _____.", answers: ["blue", "green", "red", "yellow"], correct: 0 },
  { question: "There are _____ letters in the English alphabet.", answers: ["26", "24", "25", "27"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // READING COMPREHENSION SKILLS (Kỹ năng đọc hiểu)
  // ═══════════════════════════════════════════════════════════════════
  { question: "'She is a hardworking student.' - 'Hardworking' means _____.", answers: ["working hard", "working slowly", "not working", "working lazily"], correct: 0 },
  { question: "'I usually go to bed at 10 pm.' - 'Usually' means _____.", answers: ["often", "never", "rarely", "sometimes"], correct: 0 },
  { question: "'The movie was boring.' - 'Boring' is the opposite of _____.", answers: ["interesting", "exciting", "amazing", "all correct"], correct: 3 },
  { question: "'My grandmother is elderly.' - 'Elderly' means _____.", answers: ["old", "young", "tall", "short"], correct: 0 },
  { question: "'This question is difficult.' - 'Difficult' means _____.", answers: ["hard", "easy", "simple", "fast"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // PREPOSITIONS OF PLACE (Giới từ chỉ nơi chốn)
  // ═══════════════════════════════════════════════════════════════════
  { question: "The cat is _____ the table.", answers: ["under", "in", "at", "to"], correct: 0 },
  { question: "There are pictures _____ the wall.", answers: ["on", "in", "at", "under"], correct: 0 },
  { question: "My school is _____ Le Loi Street.", answers: ["on", "in", "at", "to"], correct: 0 },
  { question: "The children are _____ the classroom.", answers: ["in", "on", "at", "under"], correct: 0 },
  { question: "She is standing _____ the bus stop.", answers: ["at", "in", "on", "to"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // QUESTION WORDS (Từ để hỏi)
  // ═══════════════════════════════════════════════════════════════════
  { question: "_____ is your birthday? - It's on May 5th.", answers: ["When", "What", "Where", "Who"], correct: 0 },
  { question: "_____ do you go to school? - By bike.", answers: ["How", "What", "When", "Where"], correct: 0 },
  { question: "_____ is your favorite teacher? - Mr. Hung.", answers: ["Who", "What", "When", "Where"], correct: 0 },
  { question: "_____ are you studying English? - Because I like it.", answers: ["Why", "What", "When", "How"], correct: 0 },
  { question: "_____ books do you have? - I have five books.", answers: ["How many", "How much", "What", "Which"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // ARTICLES (Mạo từ)
  // ═══════════════════════════════════════════════════════════════════
  { question: "I have _____ apple.", answers: ["an", "a", "the", "no article"], correct: 0 },
  { question: "She is _____ teacher.", answers: ["a", "an", "the", "no article"], correct: 0 },
  { question: "_____ sun is very hot today.", answers: ["The", "A", "An", "No article"], correct: 0 },
  { question: "He plays _____ guitar very well.", answers: ["the", "a", "an", "no article"], correct: 0 },
  { question: "I saw _____ elephant at the zoo.", answers: ["an", "a", "the", "no article"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // PLURALS (Danh từ số nhiều)
  // ═══════════════════════════════════════════════════════════════════
  { question: "One child, two _____.", answers: ["children", "childs", "childrens", "child"], correct: 0 },
  { question: "One foot, two _____.", answers: ["feet", "foots", "feets", "foot"], correct: 0 },
  { question: "One tooth, two _____.", answers: ["teeth", "tooths", "teeths", "tooth"], correct: 0 },
  { question: "One man, two _____.", answers: ["men", "mans", "mens", "man"], correct: 0 },
  { question: "One mouse, two _____.", answers: ["mice", "mouses", "mices", "mouse"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // POSSESSIVE ADJECTIVES (Tính từ sở hữu)
  // ═══════════════════════════════════════════════════════════════════
  { question: "This is _____ book. (I)", answers: ["my", "I", "me", "mine"], correct: 0 },
  { question: "That is _____ pen. (she)", answers: ["her", "she", "hers", "him"], correct: 0 },
  { question: "_____ name is Tom. (he)", answers: ["His", "He", "Him", "Her"], correct: 0 },
  { question: "We love _____ school. (we)", answers: ["our", "we", "us", "ours"], correct: 0 },
  { question: "Is this _____ bag? (you)", answers: ["your", "you", "yours", "yourself"], correct: 0 },
];

export const BACKUP_QUESTIONS: Question[] = [
  // Backup questions - Câu hỏi dự phòng Tiếng Anh 6 HK1
  { question: "I _____ a student.", answers: ["am", "is", "are", "be"], correct: 0 },
  { question: "She _____ to school every day.", answers: ["goes", "go", "going", "went"], correct: 0 },
  { question: "There _____ a book on the desk.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "My mother _____ in the kitchen.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "What color _____ your bag?", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "The children _____ playing now.", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "He _____ a doctor.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "We _____ students.", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "_____ is your name?", answers: ["What", "Where", "When", "How"], correct: 0 },
  { question: "I live _____ a house.", answers: ["in", "on", "at", "to"], correct: 0 },
  { question: "The cat is _____ the bed.", answers: ["under", "in", "on", "at"], correct: 0 },
  { question: "She has _____ hair.", answers: ["long", "tall", "high", "big"], correct: 0 },
  { question: "How _____ apples are there?", answers: ["many", "much", "old", "tall"], correct: 0 },
  { question: "He _____ up at 6 o'clock.", answers: ["gets", "get", "getting", "got"], correct: 0 },
  { question: "_____ you like English?", answers: ["Do", "Does", "Is", "Are"], correct: 0 },
  { question: "My school is very _____.", answers: ["big", "many", "a lot", "much"], correct: 0 },
  { question: "Look! He _____ running.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "I _____ have a pet.", answers: ["don't", "doesn't", "isn't", "aren't"], correct: 0 },
  { question: "This is _____ classroom.", answers: ["our", "we", "us", "ours"], correct: 0 },
  { question: "The opposite of 'hot' is _____.", answers: ["cold", "warm", "cool", "ice"], correct: 0 },
  { question: "I _____ English.", answers: ["study", "studies", "studying", "studied"], correct: 0 },
  { question: "There are 12 _____ in a year.", answers: ["months", "month", "days", "weeks"], correct: 0 },
  { question: "She _____ a beautiful voice.", answers: ["has", "have", "having", "had"], correct: 0 },
  { question: "My father _____ to work by car.", answers: ["goes", "go", "going", "went"], correct: 0 },
  { question: "It _____ raining now.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "_____ do you live?", answers: ["Where", "What", "Who", "When"], correct: 0 },
  { question: "We have English _____ Monday.", answers: ["on", "in", "at", "to"], correct: 0 },
  { question: "I'm 11 _____ old.", answers: ["years", "year", "ages", "age"], correct: 0 },
  { question: "He _____ like coffee.", answers: ["doesn't", "don't", "isn't", "aren't"], correct: 0 },
  { question: "_____ is that? - It's my friend.", answers: ["Who", "What", "Where", "When"], correct: 0 },
  { question: "The book is _____ the table.", answers: ["on", "in", "at", "to"], correct: 0 },
  { question: "She _____ cooking lunch now.", answers: ["is", "are", "am", "be"], correct: 0 },
  { question: "How old _____ you?", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "We _____ going to the park.", answers: ["are", "is", "am", "be"], correct: 0 },
  { question: "This is _____ umbrella.", answers: ["an", "a", "the", "no article"], correct: 0 },
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
