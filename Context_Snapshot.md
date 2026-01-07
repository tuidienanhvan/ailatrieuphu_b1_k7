# 📸 CONTEXT SNAPSHOT
> Cập nhật: 2026-01-02 15:09

## ✅ Đã hoàn thành trong session này

### 1. Sửa PURCHASE API (coin = -price)
- `src/features/game/data/game-api.ts` - Sửa `coin: -price, bonus_coin: 0`
- `docs/MINIGAME_API_SPEC.yaml` - Cập nhật example và schema
- `docs/BACKEND_SPEC_PURCHASE.md` - **NEW** Đặc tả riêng cho PURCHASE

### 2. Mở rộng 45 câu hỏi + 3 Level
- `src/features/game/data/level-themes.ts` - **NEW** Config 3 tier themes
- `src/features/game/data/game-constants.ts` - PRIZES 15 → 45 mốc
- `src/common/utils/math-helpers.ts` - Mở rộng milestone falling
- `src/features/game/store/slices/createGameSessionSlice.ts` - `currentTier`, `startTier()`
- `src/features/game/store/useGameStore.ts` - Thêm `startTier` action
- `src/features/game/types/common.ts` - `TIER_COMPLETE`, `TIER_START`
- `src/features/game/hooks/play/usePlayScreen.ts` - Tier-based timer
- `src/features/game/hooks/play/useAnswers.ts` - Tier milestone check
- `src/pages/ResultScreen.tsx` - `isTierComplete`, `onContinue` props
- `src/App.tsx` - `handleContinueTier`, TIER_COMPLETE handling

## 📂 Trạng thái hiện tại
- Build: ✅ Thành công (`npm run build` exit code 0)
- Game flow: 45 câu / 3 tier với Chơi tiếp button

## 🎯 Bước tiếp theo
1. [ ] Test manual: Chơi qua 15 câu → Xác nhận tier transition
2. [ ] Test manual: Chơi qua 30 câu → Xác nhận tier 2 → 3
3. [ ] Test manual: Hoàn thành 45 câu → Victory 1 tỷ
4. [ ] Verify API payload gửi đúng level (1-45)
5. [ ] Cập nhật SidebarPrizes hiển thị theo tier (optional)
6. [ ] Dynamic theme background cho PlayScreen (optional)

## ⚠️ Known Issues
- ~~Chưa có ngân hàng 45 câu hỏi từ API → Đang dùng câu hỏi local repeat~~ ✅ **ĐÃ SỬA** (02/01/2026): Logic tạo 45 câu bằng cách lặp lại local pool
- ~~SidebarPrizes hiện tại hiển thị 15 levels → cần sửa nếu muốn show 45~~ ✅ **ĐÃ SỬA** (02/01/2026): Sidebar giờ hiển thị động 15 mốc theo tier
- ~~Bug: Game bị đứng khi thắng câu 15~~ ✅ **ĐÃ SỬA** (02/01/2026): fetchAndStartGame giờ tạo đủ 45 câu hỏi

## 🔗 References
- Implementation Plan: `brain/implementation_plan.md`
- Walkthrough: `brain/walkthrough.md`
- API Spec: `docs/MINIGAME_API_SPEC.yaml`
