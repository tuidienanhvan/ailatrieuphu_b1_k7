# PiAI Game Template

## Tổng quan

Đây là template chuẩn để tạo minigame cho hệ thống PiAI Gamification Hub.

**Mỗi game = 1 repo riêng**, deploy Vercel độc lập. Hub nhúng game qua `<iframe>` và điều khiển toàn bộ qua `postMessage`.

---

## Kiến trúc 2 lớp

```
src/
├── @platform/     ← KHÔNG SỬA — engine dùng chung mọi game
├── @game/         ← THAY ĐỔI — logic + UI riêng từng game
├── App.tsx        ← Entry: nhận config Hub → mount game
└── main.tsx       ← ReactDOM.createRoot
```

### @platform/ — Engine dùng chung (28 files)
Copy nguyên từ template. **Không bao giờ sửa** khi tạo game mới.

| Folder | Chức năng |
|--------|-----------|
| `bridge/` | Protocol Hub ↔ Game (receiver, sender, types) |
| `config/` | Merge defaults + Hub overrides, ConfigProvider context |
| `engine/` | Timer, prize calculator, event runtime (pure logic, không React) |
| `theme/` | ThemeProvider, token applier (CSS custom properties) |
| `components/` | AssetRenderer, BaseButton, ErrorBoundary, LoadingScreen, LatexDisplay, DarkModalFrame |
| `hooks/` | useFullscreen, useScaler (1920×1080 → viewport), useTimer |
| `types/` | Domain types chung: GameState, Question, Prize, ShopItem, UserInfo, GameEvent |
| `state/` | Store contracts (interfaces cho Zustand slices) |
| `utils/` | shuffleArray |

### @game/ — Logic riêng từng game (80+ files)
**Đây là phần bạn viết lại** khi tạo game mới.

| Folder | Chức năng | Ví dụ (Ai Là Triệu Phú) |
|--------|-----------|--------------------------|
| `defaults/` | Config mặc định (chạy standalone) | 15 levels, 3 tiers, prizes, shop items, questions |
| `store/` | Zustand store + slices | Player, System, GameSession, Log, Event |
| `hooks/` | React hooks cho game logic | usePlayScreen, useAnswers, useLifelines, useShopScreen |
| `theme/` | Visual layer: mỗi subfolder = 1 theme (premier/, natural/, night/...) | Theme "Premier" với 5 screens + 30 components |
| `events/` | Hệ thống event (pranks, rewards) | System error prank, phone joke, milestone celebration |
| `data/` | Bridge adapter (gọi sendResult/sendPurchase) | game-api.ts |
| `runtime/` | Merge Hub payload → apply vào runtime | config.ts |
| `audio/` | Sound engine | Web Audio synthesizer |
| `types/` | Types riêng game | Re-export + extend từ @platform/types |

---

## Luồng chạy

```
┌─────────────────┐                              ┌──────────────────────┐
│   GAME HUB      │                              │   GAME (Vercel)      │
│   (gamification) │                              │   (iframe)           │
│                 │                              │                      │
│                 │  ◄── MINIGAME_READY ────────  │  1. Game load xong   │
│                 │                              │                      │
│                 │  ── MINIGAME_DATA ─────────►  │  2. Nhận config      │
│                 │     {                         │     merge defaults   │
│                 │       user,                   │     apply runtime    │
│                 │       questionPool,           │     render game      │
│                 │       gameConfig,             │                      │
│                 │       shopConfig,             │                      │
│                 │       themeConfig,            │                      │
│                 │       eventConfig,            │                      │
│                 │       env                     │                      │
│                 │     }                         │                      │
│                 │                              │                      │
│                 │  ◄── MINIGAME_RESULT ───────  │  3. Game kết thúc    │
│                 │  ◄── MINIGAME_PURCHASE ─────  │  4. Mua item shop    │
└─────────────────┘                              └──────────────────────┘
```

### Chi tiết từng message:

**Hub → Game: `MINIGAME_DATA`** (Hub gửi sau khi nhận READY)
```typescript
{
  type: 'MINIGAME_DATA',
  user: {                          // Thông tin user
    name, username, email, userId,
    balance, inventory, stats, history, serverHistory
  },
  questionPool: {                  // Bộ câu hỏi
    questions: Question[],
    backups: Question[]
  },
  gameConfig: {                    // Luật chơi
    totalLevels, tiers, prizes, milestones, phoneHelpers
  },
  shopConfig: {                    // Shop
    enabled, items: ShopItem[]
  },
  themeConfig: {                   // Override màu sắc
    tokens: { 'brand-primary': '#0f172a', ... }
  },
  eventConfig: {                   // Events/pranks
    enabled, events: GameEvent[]
  },
  env: {                           // Môi trường
    courseId, apiBase
  }
}
```

**Game → Hub: `MINIGAME_RESULT`** (khi game kết thúc)
```typescript
{ type: 'MINIGAME_RESULT', payload: { result, wrongAnswerLevel, playDuration, score, level } }
```

**Game → Hub: `MINIGAME_PURCHASE`** (khi mua item)
```typescript
{ type: 'MINIGAME_PURCHASE', payload: { itemId, itemName, price, itemType } }
```

---

## Cơ chế merge config

Game luôn có **defaults** để chạy standalone (không cần Hub). Khi Hub gửi MINIGAME_DATA:

```
defaults (game.defaults.ts)  +  Hub overrides  =  MergedConfig
         ↓                           ↓                    ↓
   15 levels, prizes...      Hub thay questions     Runtime dùng cái này
```

File `@game/runtime/config.ts` xử lý:
1. `buildDefaultMergedConfig()` — lấy từ defaults/
2. `mergeHubPayloadWithDefaults(payload)` — deep merge
3. `applyMergedConfigToRuntime(config)` — ghi vào mutable objects

Hub có thể override **bất kỳ field nào** hoặc chỉ gửi 1 phần (ví dụ chỉ gửi questions mới, giữ nguyên shop).

---

## Cây thư mục đầy đủ

```
game-template/
│
├── package.json              # react, zustand, lucide-react, vite, typescript
├── tsconfig.json             # paths: @platform/*, @game/*
├── vite.config.ts            # aliases, port 3000
├── index.html                # MathJax, Tailwind CDN, viewport meta
├── index.css                 # Scroll jail, keyframes, GPU layers
│
├── src/
│   ├── main.tsx              # ReactDOM.createRoot
│   ├── App.tsx               # onHubMessage → merge → ConfigProvider → ThemeProvider → Screens
│   │
│   ├── @platform/            # ═══ KHÔNG SỬA ═══
│   │   ├── bridge/
│   │   │   ├── types.ts      # HubConfigPayload, GameResultPayload, GamePurchasePayload
│   │   │   ├── receiver.ts   # onHubMessage(callback) — lắng nghe postMessage
│   │   │   └── sender.ts     # sendReady(), sendResult(), sendPurchase()
│   │   ├── config/
│   │   │   ├── types.ts      # MergedConfig, GameConfig, ShopConfig, ThemeOverrides
│   │   │   ├── manager.ts    # mergeConfig(defaults, overrides) — deep merge
│   │   │   └── context.tsx   # <ConfigProvider>, useConfig(), useGameConfig()
│   │   ├── engine/
│   │   │   ├── timer.ts      # createTimer(duration) — pure logic
│   │   │   ├── prize.ts      # calculateFallingPrizeIndex(level, milestones)
│   │   │   └── event-runtime.ts  # checkForEvents(catalog, context)
│   │   ├── theme/
│   │   │   ├── Provider.tsx   # <ThemeProvider theme={...}>
│   │   │   ├── applier.ts    # applyTokens → CSS custom properties
│   │   │   └── types.ts      # ThemePackage interface
│   │   ├── components/
│   │   │   ├── AssetRenderer.tsx   # <AssetRenderer id="crown" size={48} />
│   │   │   ├── BaseButton.tsx      # primary/glass/accent variants
│   │   │   ├── ErrorBoundary.tsx   # Catch + reload
│   │   │   ├── LoadingScreen.tsx   # Overlay spinner
│   │   │   ├── LatexDisplay.tsx    # MathJax render
│   │   │   └── DarkModalFrame.tsx  # Modal container
│   │   ├── hooks/
│   │   │   ├── useFullscreen.ts    # iOS/native/CSS fallback
│   │   │   ├── useScaler.ts        # 1920×1080 → viewport fit
│   │   │   └── useTimer.ts         # RAF countdown hook
│   │   ├── types/
│   │   │   ├── game.ts       # GameState, Question, Prize, ModalType
│   │   │   ├── economy.ts    # ShopItem, UserInfo, MatchRecord
│   │   │   ├── event.ts      # EventTrigger, GameEvent
│   │   │   └── log.ts        # GameLogEvent, LogActionType
│   │   ├── state/
│   │   │   └── contracts.ts  # Store slice interfaces
│   │   ├── utils/
│   │   │   └── shuffle.ts    # Fisher-Yates shuffle
│   │   └── index.ts          # Public re-exports
│   │
│   └── @game/                # ═══ VIẾT LẠI CHO MỖI GAME ═══
│       ├── index.ts          # Game manifest: exports defaults, events, theme
│       │
│       ├── defaults/         # ← Config mặc định (Hub override được)
│       │   ├── game.defaults.ts      # Levels, tiers, prizes, milestones
│       │   ├── shop.defaults.ts      # Shop items
│       │   └── questions.defaults.ts # Câu hỏi mặc định + backup
│       │
│       ├── runtime/
│       │   └── config.ts     # buildDefaultMergedConfig, mergeHubPayload, applyToRuntime
│       │
│       ├── store/            # ← Zustand store
│       │   ├── useGameStore.ts
│       │   └── slices/
│       │       ├── createPlayerSlice.ts
│       │       ├── createSystemSlice.ts
│       │       ├── createGameSessionSlice.ts
│       │       ├── createLogSlice.ts
│       │       └── createEventSlice.ts
│       │
│       ├── hooks/            # ← Game logic hooks
│       │   ├── play/         # usePlayScreen, useAnswers, useLifelines, ...
│       │   ├── shop/         # useShopScreen, usePurchaseModal, ...
│       │   ├── history/      # useHistoryScreen, ...
│       │   ├── shared/       # useGameTimer, useGameAudio
│       │   └── layout/       # useGameHeader
│       │
│       ├── theme/            # ← Visual layer (MỖI SUBFOLDER = 1 THEME)
│       │   ├── types.ts      # Theme interface + ThemePackage (generic, không phụ thuộc theme nào)
│       │   ├── registry.ts   # THEMES map + getTheme(tier), getThemeById(id)
│       │   ├── token-runtime.ts # setActiveTokens, setThemeTokenOverrides, applyThemeTokens
│       │   ├── index.ts      # Re-exports
│       │   │
│       │   ├── premier/      # ← THEME 1: TV Show style (navy/blue/gold)
│       │   │   ├── index.ts  # ThemePackage export (metadata + components + tokens + assets)
│       │   │   ├── tokens.ts # PREMIER_TOKENS: bảng màu riêng theme này
│       │   │   ├── assets.tsx # SVG assets riêng theme này
│       │   │   ├── Background.tsx
│       │   │   ├── screens/  # 5 screens: Welcome, Play, Result, Shop, History
│       │   │   └── components/
│       │   │       ├── play/     # TopHud, QuestionBoard, AnswerGrid, modals/
│       │   │       ├── shop/     # ShopHeader, ShopItemCard, PurchaseModal
│       │   │       ├── history/  # Stats, Tabs, Items
│       │   │       ├── welcome/  # Effects, Title, Trophy, Spotlights
│       │   │       └── layout/   # GameHeader
│       │   │
│       │   ├── natural/      # ← THEME 2: (tạo tương tự premier/)
│       │   │   ├── index.ts
│       │   │   ├── tokens.ts # NATURAL_TOKENS: green/earth palette
│       │   │   ├── assets.tsx
│       │   │   ├── screens/
│       │   │   └── components/
│       │   │
│       │   └── night/        # ← THEME 3: (tạo tương tự premier/)
│       │       ├── index.ts
│       │       ├── tokens.ts # NIGHT_TOKENS: dark/neon palette
│       │       ├── assets.tsx
│       │       ├── screens/
│       │       └── components/
│       │
│       ├── events/           # ← Pranks & rewards
│       │   ├── index.ts      # GAME_EVENTS registry
│       │   ├── core/         # Event manager + types
│       │   ├── pranks/       # system-error, phone-joke
│       │   └── rewards/      # milestone-celebration
│       │
│       ├── data/
│       │   └── game-api.ts   # Bridge adapter: sendResult, sendPurchase
│       │
│       ├── audio/
│       │   └── manager.ts    # Web Audio synthesizer
│       │
│       └── types/
│           └── index.ts      # Game-specific type re-exports
```

---

## Tạo game mới (ví dụ: "Săn Sao")

### Bước 1: Clone template
```bash
cp -r ai-la-trieu-phu-v2 san-sao-v2
cd san-sao-v2
```

### Bước 2: Giữ nguyên @platform/, xóa @game/
```bash
rm -rf src/@game
mkdir -p src/@game/{defaults,runtime,store/slices,hooks,theme,events,data,audio,types}
```

### Bước 3: Viết @game/ mới

**Bắt buộc phải có:**

| File | Lý do |
|------|-------|
| `defaults/game.defaults.ts` | Config mặc định: levels, rules, timing |
| `defaults/questions.defaults.ts` | Câu hỏi mặc định (fallback khi Hub không gửi) |
| `defaults/shop.defaults.ts` | Shop items (hoặc empty array nếu không có shop) |
| `runtime/config.ts` | Merge Hub payload → apply vào runtime |
| `store/useGameStore.ts` | Zustand store chính |
| `theme/types.ts` | Interface cho Theme (screens + components) |
| `theme/registry.ts` | getTheme() factory |
| `theme/[tên-theme]/index.ts` | ThemePackage export |
| `theme/[tên-theme]/tokens.ts` | Bảng màu CSS custom properties |
| `theme/[tên-theme]/screens/` | Ít nhất: WelcomeScreen, PlayScreen, ResultScreen |
| `data/game-api.ts` | Adapter gọi sendResult/sendPurchase |
| `types/index.ts` | Re-export types cần dùng |
| `index.ts` | Game manifest |

**Tùy chọn:**
- `hooks/` — tách logic ra hooks nếu phức tạp
- `events/` — nếu game có pranks/rewards
- `audio/` — nếu game có sound
- `theme/[theme]/components/` — nếu screen phức tạp cần tách

### Bước 4: Sửa App.tsx
`App.tsx` import từ `@game/` nên chỉ cần sửa:
- Screen routing (game mới có thể không có Shop/History)
- Store selectors (game mới có state khác)
- Theme logic (game mới có thể không cần tier-based theme switching)

### Bước 5: Deploy
```bash
npm install
npm run build    # Vite build → dist/
# Push lên Vercel
```

### Bước 6: Hub nhúng
```html
<iframe src="https://san-sao-v2.vercel.app" />
```
Hub gửi `MINIGAME_DATA` qua postMessage → game nhận và chạy.

---

## Lưu ý quan trọng

1. **Game luôn chạy được standalone** — defaults đủ để chơi mà không cần Hub
2. **Hub override partial** — chỉ cần gửi field muốn thay, còn lại giữ default
3. **Không gọi API trực tiếp** — mọi data đi qua Hub postMessage
4. **1920×1080 canvas** — useScaler tự co giãn, không cần responsive CSS
5. **TypeScript strict: false** — để migration dễ hơn, nên bật strict khi game ổn định
6. **Tailwind qua CDN** — không cần build step riêng

---

## Tech stack

- React 19 + TypeScript
- Zustand 5 (state management)
- Vite 6 (bundler)
- Tailwind CSS (CDN)
- Lucide React (icons)
- MathJax 3 (LaTeX rendering)
- Web Audio API (sound — no mp3 files)
