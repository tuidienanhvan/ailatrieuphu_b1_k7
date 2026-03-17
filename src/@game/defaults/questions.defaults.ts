import { Question } from '@game/types';

export const QUESTIONS: Question[] = [
  { question: 'Square root of 49?', answers: ['7', '-7', '49', '14'], correct: 0 },
  { question: '2 + 2 = ?', answers: ['3', '4', '5', '6'], correct: 1 },
  { question: 'Capital of Vietnam?', answers: ['Hanoi', 'Ho Chi Minh City', 'Hue', 'Da Nang'], correct: 0 },
  { question: 'sin(30deg) = ?', answers: ['1', '1/2', 'sqrt(2)/2', '0'], correct: 1 },
  { question: 'Binary of decimal 10?', answers: ['1010', '1111', '1001', '1100'], correct: 0 },
  { question: 'HTML stands for?', answers: ['HyperText Markup Language', 'HighText Machine Language', 'Hyperlink Text Markup Language', 'Home Tool Markup Language'], correct: 0 },
  { question: 'Largest planet?', answers: ['Mars', 'Earth', 'Jupiter', 'Saturn'], correct: 2 },
  { question: '5 * 6 = ?', answers: ['11', '25', '30', '60'], correct: 2 },
  { question: 'CSS is used for?', answers: ['Data storage', 'Styling UI', 'Machine learning', 'Compilers'], correct: 1 },
  { question: 'Which is a JS runtime?', answers: ['Node.js', 'MySQL', 'Redis', 'Nginx'], correct: 0 },
  { question: 'What is React?', answers: ['Database', 'UI library', 'OS', 'Network protocol'], correct: 1 },
  { question: '3^2 = ?', answers: ['6', '9', '12', '18'], correct: 1 },
  { question: 'HTTP status for Not Found?', answers: ['200', '301', '404', '500'], correct: 2 },
  { question: 'Which is immutable in JS?', answers: ['Array', 'Object', 'String', 'Map'], correct: 2 },
  { question: 'Final question: 15th level marker?', answers: ['Bronze', 'Silver', 'Gold', 'Diamond'], correct: 3 },
];

export const BACKUP_QUESTIONS: Question[] = [
  { question: '1 + 1 = ?', answers: ['1', '2', '3', '4'], correct: 1 },
  { question: 'Color of clear sky?', answers: ['Red', 'Green', 'Blue', 'Purple'], correct: 2 },
  { question: 'Primary language in this project?', answers: ['Go', 'TypeScript', 'Rust', 'Java'], correct: 1 },
  { question: 'Git command to show status?', answers: ['git log', 'git status', 'git show', 'git diff'], correct: 1 },
  { question: '2^5 = ?', answers: ['10', '16', '32', '64'], correct: 2 },
  { question: 'Which one is a database?', answers: ['PostgreSQL', 'React', 'Tailwind', 'Vite'], correct: 0 },
  { question: 'What does API mean?', answers: ['Application Programming Interface', 'Applied Program Input', 'Access Point Interface', 'Automatic Protocol Integration'], correct: 0 },
  { question: 'Which tool bundles this app?', answers: ['Webpack', 'Vite', 'Gradle', 'Maven'], correct: 1 },
  { question: 'JSON is?', answers: ['Image format', 'Text data format', 'CPU architecture', 'Encryption algorithm'], correct: 1 },
  { question: 'Final backup question', answers: ['A', 'B', 'C', 'D'], correct: 0 },
];

export function applyQuestionPoolOverrides(pool?: {
  questions?: Question[];
  backups?: Question[];
}): void {
  if (pool?.questions && pool.questions.length > 0) {
    QUESTIONS.splice(0, QUESTIONS.length, ...pool.questions);
  }

  if (pool?.backups && pool.backups.length > 0) {
    BACKUP_QUESTIONS.splice(0, BACKUP_QUESTIONS.length, ...pool.backups);
  }
}
