# Test Cases - AI Là Triệu Phú Minigame

## Test Environment
- **URL Local:** http://localhost:3000/
- **URL Staging:** https://ailatrieuphu-b1-k7.vercel.app/
- **Parent Frame:** https://apps.pistudy.vn/

---

## TC01: Welcome Screen Load
**Mô tả:** Kiểm tra màn hình chào mừng hiển thị đầy đủ
**Steps:**
1. Mở game URL
2. Chờ loading hoàn tất

**Expected:**
- [ ] LoadingScreen hiển thị ít nhất 1.5s
- [ ] Hiển thị logo PiStudy + tên game "AI LÀ TRIỆU PHÚ"
- [ ] Hiển thị tên user (hoặc "Khách" nếu không có)
- [ ] Hiển thị stats: Lượt chơi, Kỷ lục
- [ ] Hiển thị số dư tài khoản
- [ ] Nút "BẮT ĐẦU" và animation hoạt động

---

## TC02: Start Game & Question Display
**Mô tả:** Kiểm tra bắt đầu game và hiển thị câu hỏi
**Precondition:** Đang ở WelcomeScreen
**Steps:**
1. Click nút "BẮT ĐẦU"
2. Chờ game load câu hỏi

**Expected:**
- [ ] Chuyển sang PlayScreen
- [ ] Timer 30s bắt đầu đếm ngược
- [ ] Câu hỏi số 1 hiển thị rõ ràng
- [ ] 4 phương án A, B, C, D hiển thị
- [ ] SidebarPrizes hiển thị 15 mức thưởng
- [ ] Level hiện tại được highlight

---

## TC03: Answer Correctly
**Mô tả:** Kiểm tra trả lời đúng
**Precondition:** Đang ở PlayScreen, câu hỏi đang hiển thị
**Steps:**
1. Click đáp án đúng
2. Quan sát feedback

**Expected:**
- [ ] Đáp án chọn highlight màu vàng (SELECTED)
- [ ] Sau 1s, đáp án đổi sang màu xanh (CORRECT)
- [ ] Âm thanh "correct" phát
- [ ] Sau 1.5s, chuyển sang câu hỏi tiếp
- [ ] SidebarPrizes cập nhật level mới

---

## TC04: Answer Incorrectly
**Mô tả:** Kiểm tra trả lời sai
**Precondition:** Đang ở câu hỏi level 3+ (không có milestone protection)
**Steps:**
1. Click đáp án sai
2. Quan sát feedback

**Expected:**
- [ ] Đáp án chọn highlight màu đỏ (WRONG)
- [ ] Đáp án đúng highlight màu xanh
- [ ] Âm thanh "wrong" phát
- [ ] Hiển thị số tiền thực nhận (theo milestone)
- [ ] Chuyển sang GameOver screen
- [ ] API RESULT được gửi với result="gameover"

---

## TC05: Timer Expires
**Mô tả:** Kiểm tra hết giờ
**Precondition:** Đang ở PlayScreen
**Steps:**
1. Không chọn đáp án
2. Chờ timer đếm về 0

**Expected:**
- [ ] Timer chuyển màu đỏ khi < 10s
- [ ] Hiệu ứng heartbeat khi < 5s
- [ ] Khi hết giờ, xử lý như trả lời sai
- [ ] GameOver screen hiển thị

---

## TC06: Use 50:50 Lifeline
**Mô tả:** Kiểm tra quyền trợ giúp 50:50
**Precondition:** Đang ở PlayScreen, còn quyền 50:50
**Steps:**
1. Click icon 50:50 trên TopHud
2. Quan sát các đáp án

**Expected:**
- [ ] 2 đáp án sai bị ẩn (disabled)
- [ ] Chỉ còn 2 đáp án: 1 đúng + 1 sai
- [ ] Icon 50:50 bị disable (đã dùng)
- [ ] Có thể chọn 1 trong 2 đáp án còn lại

---

## TC07: Use Phone-a-Friend Lifeline
**Mô tả:** Kiểm tra quyền trợ giúp gọi điện
**Precondition:** Đang ở PlayScreen, còn quyền Phone
**Steps:**
1. Click icon Phone trên TopHud
2. Quan sát PhoneModal

**Expected:**
- [ ] Modal hiển thị với animation
- [ ] Có thể là joke (Phone Prank Event) hoặc gợi ý thật
- [ ] Nút "Đóng" hoạt động
- [ ] Icon Phone bị disable sau khi dùng

---

## TC08: Stop Game (Dừng cuộc)
**Mô tả:** Kiểm tra dừng cuộc chơi
**Precondition:** Đang ở câu hỏi level 5+
**Steps:**
1. Click nút "DỪNG CUỘC" trên TopHud
2. Confirm trong StopGameModal

**Expected:**
- [ ] StopGameModal hiển thị số tiền sẽ nhận
- [ ] Click "Xác nhận" → kết thúc game
- [ ] Hiển thị Victory screen với tiền thưởng
- [ ] API RESULT được gửi với result="stop"

---

## TC09: Victory (15 câu đúng)
**Mô tả:** Kiểm tra chiến thắng hoàn toàn
**Precondition:** Đã trả lời đúng 14 câu
**Steps:**
1. Trả lời đúng câu 15
2. Quan sát Victory screen

**Expected:**
- [ ] Màn hình Victory với confetti animation
- [ ] Hiển thị "CHIẾN THẮNG" và 150,000,000đ
- [ ] Âm thanh victory phát
- [ ] API RESULT được gửi với result="victory", level=15

---

## TC10: Shop Purchase
**Mô tả:** Kiểm tra mua vật phẩm trong shop
**Precondition:** Đang ở WelcomeScreen, có đủ tiền
**Steps:**
1. Click "CỬA HÀNG"
2. Chọn item (vd: quyền 50:50)
3. Confirm mua

**Expected:**
- [ ] ShopScreen hiển thị danh sách items
- [ ] PurchaseModal hiển thị khi chọn item
- [ ] Số dư giảm sau khi mua
- [ ] Item được thêm vào inventory
- [ ] API PURCHASE được gửi với coin=-price

---

## API Verification Checklist

### RESULT Message Structure
```json
{
  "msgid": "uuid-v4",
  "msgtype": "RESULT",
  "key": "",
  "tsms": timestamp,
  "user": "email_or_username",
  "payload": {
    "username": "...",
    "appid": "minigame-ai-la-trieu-phu",
    "clientid": "browser-xxx",
    "coin": 1000,
    "xp": 100,
    "bonus_coin": 0,
    "bonus_xp": 0,
    "score": 150000000,
    "result": "victory|gameover|stop",
    "level": 15,
    "wrong_answer_level": null,
    "lifelines_used": ["fiftyFifty", "phone"]
  }
}
```

### PURCHASE Message Structure
```json
{
  "msgid": "uuid-v4",
  "msgtype": "PURCHASE",
  "key": "",
  "tsms": timestamp,
  "user": "email_or_username",
  "payload": {
    "username": "...",
    "appid": "minigame-ai-la-trieu-phu",
    "clientid": "browser-xxx",
    "item_id": "...",
    "item_name": "...",
    "item_type": "lifeline|skin",
    "coin": -500
  }
}
```

---

## Cross-Browser Testing

| Browser | Fullscreen | Audio | Scale | Status |
|---------|-----------|-------|-------|--------|
| Chrome Desktop | | | | |
| Edge Desktop | | | | |
| Safari Desktop | | | | |
| Chrome Mobile | | | | |
| Safari iOS | | | | |

---

## Notes
- Tester: _______________
- Date: _______________
- Build: _______________
