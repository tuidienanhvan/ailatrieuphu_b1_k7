# 📋 BÁO CÁO DEBUG: COIN SYNCHRONIZATION
## Game "Ai Là Triệu Phú" - PiStudy

> **Ngày:** 31/12/2024  
> **Frontend Dev:** Anh Văn Từ  
> **Backend Contact:** Lenguyenhaiduy

---

# I. VẤN ĐỀ

**Mô tả:** Sau khi chơi game, coin thưởng không được cộng vào `total_coins` của user.

**Triệu chứng:**
- Frontend gửi payload đúng format
- Backend báo `saveResult success`
- Nhưng `total_coins` KHÔNG thay đổi

---

# II. LOG THỰC TẾ

## 2.1. Khởi động game
```
[Bridge] fetchUserStats: { total_coins: 608400 }
[App] Received MINIGAME_DATA: { balance: 608400 }
```

## 2.2. Chơi game (đúng 1 câu, dừng)
```
[GameLog] GAME_END: { result: 'STOPPED', finalLevel: 1 }
[GameAPI] Saving RESULT: {
  msgtype: 'RESULT',
  payload: {
    appid: 'minigame-ai-la-trieu-phu',
    coin: 667,
    bonus_coin: 0,
    score: 1,
    result: 'stop',
    level: 1
  }
}
[Bridge] saveResult success ✅
```

## 2.3. Sau khi lưu
```
[Bridge] fetchUserStats: { total_coins: 608400 } ❌ KHÔNG ĐỔI!
[App] balance: 609067 (local), incomingBalance: 608400 (server)
```

**Kết luận:** Backend nhận payload, báo success, nhưng KHÔNG cộng coin vào `total_coins`.

---

# III. SO SÁNH VỚI 2 GAME KHÁC

Đã phân tích code 2 game mẫu:
- **Trò Chơi Trục Số** (`minigame-tro-choi-truc-so`)
- **Quantum Math** (`minigame-quantum-math`)

## 3.1. Cách 2 game mẫu gửi payload
```javascript
saveMinigameResult({
    result: 'finished',
    score: state.score,  // VD: 230
});

// Build inner payload:
innerPayload.coin = payload.score || 0;  // = 230
innerPayload.bonus_coin = 0;             // = 0
```

## 3.2. Game "Ai Là Triệu Phú" hiện tại
```typescript
payload: {
    coin: coinReward,    // 667
    bonus_coin: 0,       // 0
    score: levelReached, // 1
    ...
}
```

**Kết luận:** Frontend đang gửi ĐÚNG format giống 2 game mẫu.

---

# IV. HỎI ANH LENGUYENHAIDUY

**Ụa anh ơi sao `bonus_coin` nó không được ta?**

Em đang gửi payload như 2 game mẫu (Trục Số, Quantum Math):
```json
{
  "coin": 667,
  "bonus_coin": 0,
  "score": 1
}
```

Backend báo `saveResult success` nhưng `total_coins` không tăng 😭

**Câu hỏi cụ thể:**

1. **Công thức tính `total_coins` chính xác là gì?**
   - Em hiểu là: `total_coin = SUM(best_coin mỗi game) + SUM(bonus_coin)`
   - Đúng không anh?

2. **Tại sao không cộng coin?**
   - Em gửi `coin: 667`, `score: 1`
   - Backend nhận được, báo success
   - Nhưng `total_coins` vẫn giữ nguyên 608400

3. **Điều kiện để coin được tính:**
   - Có phải chỉ tính khi `score > best_score` không?
   - Nếu vậy, lần chơi đầu tiên của game này có được tính không?

4. **Về mua đồ (PURCHASE):**
   - Em gửi `bonus_coin: -8000` để trừ tiền
   - Backend có xử lý msgtype `PURCHASE` không?
   - Hay chỉ xử lý `RESULT` thôi?

**Anh check giúp em với ạ!** 🙏

---

# V. PAYLOAD MẪU ĐỀ XUẤT

## 5.1. Khi THẮNG/DỪNG game
```json
{
    "msgtype": "RESULT",
    "payload": {
        "appid": "minigame-ai-la-trieu-phu",
        "clientid": "course-v1:PiStudy+TOAN7+2025_T9",
        "coin": 667,
        "bonus_coin": 0,
        "score": 1,
        "result": "stop",
        "level": 1,
        "username": "913.tuanhvan2018@gmail.com"
    }
}
```

## 5.2. Khi MUA ĐỒ
```json
{
    "msgtype": "PURCHASE",
    "payload": {
        "appid": "minigame-ai-la-trieu-phu",
        "item_id": "extra_change_question",
        "item_name": "Đổi Câu Hỏi",
        "item_type": "lifeline",
        "bonus_coin": -8000
    }
}
```

---

# VI. YÊU CẦU BACKEND

1. **Xác nhận logic tính `total_coins`:**
   - Công thức chính xác là gì?
   - Điều kiện để coin được cộng?

2. **Fix hoặc hướng dẫn:**
   - Nếu logic đúng, tại sao không cập nhật?
   - Nếu cần thay đổi payload, format mới là gì?

3. **Test case:**
   - Chơi level 1, dừng → Coin thưởng: 667
   - Expected: `total_coins += 667`
   - Actual: `total_coins` không đổi

---

# VII. FRONTEND ĐÃ SỬA

| Thay đổi | Trước | Sau |
|----------|-------|-----|
| Công thức coin | `level * 100000` | `(level/15) * 10000` |
| Max coin | Không giới hạn | 10,000 (level 15) |
| Số câu hỏi | 14 | 15 |
| Field `coin` | Total balance | Delta (coinReward) |
| Field `bonus_coin` | coinReward | 0 |

**Công thức coin thưởng:**
```
coinReward = Math.round((levelReached / 15) * 10000)
```

| Level | Coin |
|-------|------|
| 1 | 667 |
| 5 | 3,333 |
| 10 | 6,667 |
| 15 | 10,000 |

---

# VIII. TÓM TẮT

✅ **Frontend đã hoàn thành:**
- Gửi payload đúng format (giống 2 game mẫu)
- Log chi tiết để debug
- Local update balance ngay lập tức
- Math.max() để tránh rollback

❌ **Vấn đề còn tồn tại:**
- Backend không cập nhật `total_coins` dù báo success
- Cần backend xác nhận/fix logic

📞 **Liên hệ:** Anh Lenguyenhaiduy để clarify logic backend
