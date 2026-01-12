
import { Question, Prize, PhoneHelper } from '../types/entities';

export const TIMER_DURATION = 30;

export const PHONE_HELPERS: PhoneHelper[] = [
  { id: 'thay_giao', name: 'Thầy giáo', role: 'Giáo viên Toán', rate: '95%', color: 'bg-blue-600' },
  { id: 'ban_lop_6', name: 'Bạn lớp 6', role: 'Bạn học cùng lớp', rate: '70%', color: 'bg-sky-500' },
  { id: 'nguoi_la', name: 'Người lạ mặt', role: '???', rate: '20%', color: 'bg-orange-600' },
];

export const QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CHAPTER 1: ANCIENT MESOPOTAMIA - Cradle of Civilization
  // ═══════════════════════════════════════════════════════════════════
  { question: "Which ancient civilization is known as the 'Cradle of Civilization'?", answers: ["Mesopotamia", "Egypt", "Greece", "Rome"], correct: 0 },
  { question: "What is the name of the Sumerian writing system?", answers: ["Cuneiform", "Hieroglyphs", "Latin", "Sanskrit"], correct: 0 },
  { question: "Who was the first empire builder in Mesopotamia?", answers: ["Sargon of Akkad", "Hammurabi", "Nebuchadnezzar", "Gilgamesh"], correct: 0 },
  { question: "The Code of Hammurabi is an example of what characteristic of civilization?", answers: ["Written laws", "Agriculture", "Trade", "Religion"], correct: 0 },
  { question: "Which civilization invented the wheel?", answers: ["Sumerians", "Egyptians", "Greeks", "Romans"], correct: 0 },
  { question: "The land between the Tigris and Euphrates rivers is called:", answers: ["Mesopotamia", "Nile Valley", "Indus Valley", "Yellow River"], correct: 0 },
  { question: "Ziggurats were built by the Mesopotamians as:", answers: ["Religious temples", "Palaces", "Granaries", "Fortresses"], correct: 0 },
  { question: "Which Mesopotamian civilization created the first known code of laws?", answers: ["Babylonians", "Sumerians", "Assyrians", "Persians"], correct: 0 },
  { question: "What material did Mesopotamians use to make writing tablets?", answers: ["Clay", "Papyrus", "Stone", "Wood"], correct: 0 },
  { question: "The Epic of Gilgamesh is one of the world's oldest:", answers: ["Stories/Epics", "Laws", "Maps", "Calendars"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHAPTER 2: ANCIENT EGYPT - Land of Pharaohs
  // ═══════════════════════════════════════════════════════════════════
  { question: "What was the Egyptian writing system called?", answers: ["Hieroglyphs", "Cuneiform", "Alphabet", "Pictographs"], correct: 0 },
  { question: "The Nile River was important to Ancient Egypt because it:", answers: ["Provided fertile soil for farming", "Was used only for drinking water", "Had no fish", "Flooded unpredictably"], correct: 0 },
  { question: "What were the pyramids built for?", answers: ["Tombs for pharaohs", "Temples for worship", "Homes for nobles", "Military fortresses"], correct: 0 },
  { question: "Who was considered a god-king in Ancient Egypt?", answers: ["The Pharaoh", "The Priest", "The Scribe", "The Soldier"], correct: 0 },
  { question: "What is the process used by Ancient Egyptians to preserve dead bodies?", answers: ["Mummification", "Cremation", "Burial", "Embalming"], correct: 0 },
  { question: "The Great Pyramid of Giza was built for which pharaoh?", answers: ["Khufu (Cheops)", "Tutankhamun", "Ramses II", "Cleopatra"], correct: 0 },
  { question: "What stone helped historians decode Egyptian hieroglyphs?", answers: ["Rosetta Stone", "Code of Hammurabi", "Dead Sea Scrolls", "Tablet of Destiny"], correct: 0 },
  { question: "Which river did Ancient Egypt build itself on?", answers: ["Nile River", "Tigris River", "Euphrates River", "Indus River"], correct: 0 },
  { question: "The Sphinx has the body of a lion and the head of a:", answers: ["Human", "Eagle", "Snake", "Bull"], correct: 0 },
  { question: "What material did Egyptians use to make paper-like writing material?", answers: ["Papyrus", "Clay", "Animal skin", "Wood"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHAPTER 3: ANCIENT GREECE - Birthplace of Democracy
  // ═══════════════════════════════════════════════════════════════════
  { question: "Which famous Greek philosopher tutored Alexander the Great?", answers: ["Aristotle", "Plato", "Socrates", "Pythagoras"], correct: 0 },
  { question: "Greece is located on a _____, which means land surrounded by water on 3 sides.", answers: ["Peninsula", "Island", "Continent", "Archipelago"], correct: 0 },
  { question: "What was a Greek city-state called?", answers: ["Polis", "Empire", "Kingdom", "Colony"], correct: 0 },
  { question: "Which Greek city-state was known for its powerful military?", answers: ["Sparta", "Athens", "Corinth", "Thebes"], correct: 0 },
  { question: "Which Greek city-state is credited with developing democracy?", answers: ["Athens", "Sparta", "Troy", "Macedonia"], correct: 0 },
  { question: "The ancient Olympic Games were held in honor of which Greek god?", answers: ["Zeus", "Apollo", "Athena", "Poseidon"], correct: 0 },
  { question: "What is the Parthenon?", answers: ["A temple dedicated to Athena", "A palace for kings", "An amphitheater", "A marketplace"], correct: 0 },
  { question: "Who wrote the epic poems 'The Iliad' and 'The Odyssey'?", answers: ["Homer", "Herodotus", "Sophocles", "Euripides"], correct: 0 },
  { question: "What geometric shape did the Greeks use extensively in their architecture?", answers: ["Columns/Pillars", "Triangles only", "Circles only", "Squares only"], correct: 0 },
  { question: "Alexander the Great spread Greek culture throughout:", answers: ["Asia and North Africa", "Only Greece", "Only Europe", "Only Africa"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHAPTER 4: ANCIENT ROME - The Eternal City
  // ═══════════════════════════════════════════════════════════════════
  { question: "What was the first form of government in Rome?", answers: ["Republic", "Monarchy", "Empire", "Democracy"], correct: 0 },
  { question: "Who was the first Emperor to become Christian?", answers: ["Constantine", "Julius Caesar", "Augustus", "Nero"], correct: 0 },
  { question: "What language did the Romans speak?", answers: ["Latin", "Greek", "Hebrew", "Arabic"], correct: 0 },
  { question: "The Roman Colosseum was used for:", answers: ["Gladiator fights and entertainment", "Religious ceremonies only", "Government meetings", "Housing citizens"], correct: 0 },
  { question: "What famous Roman general crossed the Rubicon River?", answers: ["Julius Caesar", "Mark Antony", "Pompey", "Brutus"], correct: 0 },
  { question: "The period of peace and prosperity in Rome was called:", answers: ["Pax Romana", "Renaissance", "Golden Age", "Republic Era"], correct: 0 },
  { question: "What is an aqueduct?", answers: ["A structure to carry water", "A type of road", "A building for worship", "A military fort"], correct: 0 },
  { question: "Which mountain range protected Rome from northern invasions?", answers: ["Alps", "Himalayas", "Pyrenees", "Andes"], correct: 0 },
  { question: "The Roman numeral 'X' represents what number?", answers: ["10", "5", "50", "100"], correct: 0 },
  { question: "What was the Roman forum?", answers: ["A public marketplace and meeting place", "An army training ground", "A temple", "A palace"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHAPTER 5: ANCIENT CHINA - The Middle Kingdom
  // ═══════════════════════════════════════════════════════════════════
  { question: "What river did Ancient China build itself on?", answers: ["Yellow River (Huang He)", "Yangtze River", "Mekong River", "Nile River"], correct: 0 },
  { question: "The Great Wall of China was built to:", answers: ["Protect from invasions", "Show wealth", "Mark boundaries only", "Store grains"], correct: 0 },
  { question: "What important material did the Chinese invent for writing and art?", answers: ["Paper", "Papyrus", "Parchment", "Clay tablets"], correct: 0 },
  { question: "Which Chinese philosophy emphasizes respect for elders and social order?", answers: ["Confucianism", "Buddhism", "Taoism", "Legalism"], correct: 0 },
  { question: "What luxury item did China trade along the Silk Road?", answers: ["Silk", "Spices", "Gold", "Ivory"], correct: 0 },
  { question: "The Terracotta Army was built for which Chinese emperor?", answers: ["Qin Shi Huang", "Han Wudi", "Tang Taizong", "Confucius"], correct: 0 },
  { question: "What were oracle bones used for in Ancient China?", answers: ["Predicting the future/divination", "Writing stories", "Building materials", "Currency"], correct: 0 },
  { question: "Which dynasty began the construction of the Great Wall?", answers: ["Qin Dynasty", "Han Dynasty", "Tang Dynasty", "Ming Dynasty"], correct: 0 },
  { question: "What important navigation tool did the Chinese invent?", answers: ["Compass", "Telescope", "Sextant", "Astrolabe"], correct: 0 },
  { question: "Chinese writing uses:", answers: ["Characters/Logograms", "Alphabet", "Cuneiform", "Hieroglyphs"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHAPTER 6: ANCIENT INDIA - Land of Diversity
  // ═══════════════════════════════════════════════════════════════════
  { question: "Which river valley was home to one of India's earliest civilizations?", answers: ["Indus River Valley", "Ganges River Valley", "Nile River Valley", "Tigris River Valley"], correct: 0 },
  { question: "What major religion originated in Ancient India?", answers: ["Hinduism and Buddhism", "Christianity", "Islam", "Judaism"], correct: 0 },
  { question: "The caste system in Ancient India divided people into:", answers: ["Social classes based on birth", "Rich and poor only", "Citizens and slaves", "Farmers and warriors"], correct: 0 },
  { question: "Who founded Buddhism?", answers: ["Siddhartha Gautama (Buddha)", "Confucius", "Mahavira", "Krishna"], correct: 0 },
  { question: "What ancient Indian cities showed advanced urban planning?", answers: ["Harappa and Mohenjo-daro", "Delhi and Mumbai", "Varanasi and Agra", "Calcutta and Chennai"], correct: 0 },
  { question: "What number system did Ancient India give to the world?", answers: ["Decimal system with zero", "Roman numerals", "Binary system", "Hexadecimal system"], correct: 0 },
  { question: "The sacred texts of Hinduism are called:", answers: ["Vedas", "Bible", "Quran", "Torah"], correct: 0 },
  { question: "What achievement is Ancient India known for in medicine?", answers: ["Ayurveda and surgery", "Modern chemistry", "Antibiotics", "Vaccines"], correct: 0 },
  { question: "The Mauryan Empire's most famous ruler who spread Buddhism was:", answers: ["Ashoka", "Chandragupta", "Akbar", "Shah Jahan"], correct: 0 },
  { question: "Sanskrit is an ancient language of:", answers: ["India", "China", "Greece", "Rome"], correct: 0 },

  // ═══════════════════════════════════════════════════════════════════
  // CHAPTER 7: GENERAL ANCIENT CIVILIZATIONS - Cross-Cultural Knowledge
  // ═══════════════════════════════════════════════════════════════════
  { question: "What do all early civilizations have in common?", answers: ["Developed near rivers", "Built in deserts", "Had no government", "Avoided trade"], correct: 0 },
  { question: "The study of ancient writings and artifacts is called:", answers: ["Archaeology", "Geology", "Biology", "Astronomy"], correct: 0 },
  { question: "What was the main reason ancient civilizations needed rivers?", answers: ["Water for crops and drinking", "Transportation only", "Religious ceremonies", "Defense from enemies"], correct: 0 },
  { question: "A surplus of food in ancient civilizations led to:", answers: ["Specialization of jobs", "Famine", "War", "Migration"], correct: 0 },
  { question: "What type of government is ruled by religious leaders?", answers: ["Theocracy", "Democracy", "Republic", "Monarchy"], correct: 0 },
  { question: "Trade routes connecting East and West were called:", answers: ["Silk Road", "Spice Road", "King's Highway", "Royal Road"], correct: 0 },
  { question: "Which ancient wonder of the world still stands today?", answers: ["Great Pyramid of Giza", "Hanging Gardens of Babylon", "Colossus of Rhodes", "Lighthouse of Alexandria"], correct: 0 },
  { question: "Polytheism means belief in:", answers: ["Many gods", "One god", "No gods", "Nature spirits only"], correct: 0 },
  { question: "What is a primary source in history?", answers: ["A document/artifact from the time period", "A modern textbook", "A movie about history", "A teacher's lecture"], correct: 0 },
  { question: "Pictographs and ideographs are examples of:", answers: ["Early writing systems", "Trade goods", "Types of government", "Religious beliefs"], correct: 0 }
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
