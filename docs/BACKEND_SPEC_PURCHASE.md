# 🛒 BACKEND SPEC: PURCHASE Message

> **Phiên bản:** 1.0.0  
> **Ngày cập nhật:** 2026-01-02  
> **Tác giả:** Frontend Team  

---

## 📋 Mục Lục

1. [Tổng Quan](#1-tổng-quan)
2. [Endpoint](#2-endpoint)
3. [Xác Thực](#3-xác-thực)
4. [Request](#4-request)
5. [Response](#5-response)
6. [Mã Lỗi](#6-mã-lỗi)
7. [Logic Backend](#7-logic-backend)
8. [Test Cases](#8-test-cases)
9. [Ví Dụ Code](#9-ví-dụ-code)

---

## 1. Tổng Quan

### 1.1 Mục Đích
API lưu giao dịch mua item trong minigame shop. Khi user mua lifeline hoặc skin, frontend gửi message PURCHASE để backend:
- Trừ tiền từ balance của user
- Cộng item vào inventory của user
- Ghi log giao dịch

### 1.2 Thông Tin Chung

| Thuộc tính | Giá trị |
|------------|---------|
| **Tên API** | Minigame Purchase Log |
| **Base URL** | `https://pistudy.vn/api/minigames` |
| **Giao thức** | HTTPS |
| **Định dạng** | JSON |
| **Phương thức** | POST |

---

## 2. Endpoint

```
POST /api/minigames/logs/
```

### 2.1 Headers Bắt Buộc

| Header | Giá trị | Mô tả |
|--------|---------|-------|
| `Content-Type` | `application/json` | Định dạng body |
| `X-CSRFToken` | `{csrf_token}` | Token từ cookie `csrftoken` |
| `Cookie` | `edx-jwt-cookie-header-payload=...` | JWT authentication |

---

## 3. Xác Thực

### 3.1 Cookie JWT (Ưu Tiên)
```
Cookie: edx-jwt-cookie-header-payload=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Decode JWT payload:**
```json
{
  "user_id": 13,
  "preferred_username": "913_tuanhvan2018",
  "email": "913.tuanhvan2018@gmail.com",
  "name": "Anh Văn Từ"
}
```

### 3.2 Fallback: Cookie edx-user-info
Nếu không có JWT, sử dụng cookie `edx-user-info` nhưng sẽ thiếu `email` và `user_id`.

---

## 4. Request

### 4.1 Request Body Schema

```json
{
  "msgtype": "PURCHASE",
  "tsms": 1767290916605,
  "payload": {
    "appid": "minigame-ai-la-trieu-phu",
    "coin": -8000,
    "xp": 0,
    "bonus_coin": 0,
    "bonus_xp": 0,
    "userId": 13,
    "username": "913_tuanhvan2018",
    "email": "913.tuanhvan2018@gmail.com",
    "gameKey": "minigame-ai-la-trieu-phu",
    "clientid": "course-v1%3APiStudy%2BTOAN7%2B2025_T9",
    "score": 0,
    "item_id": "extra_change_question",
    "item_name": "Đổi Câu Hỏi",
    "item_type": "lifeline"
  }
}
```

### 4.2 Mô Tả Các Trường

#### Thông Tin Message

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `msgtype` | string | ✅ | Luôn = `"PURCHASE"` |
| `tsms` | integer | ✅ | Timestamp (milliseconds) |

#### Payload - Identification

| Trường | Kiểu | Bắt buộc | Mô tả | Ví dụ |
|--------|------|----------|-------|-------|
| `appid` | string | ✅ | ID minigame | `"minigame-ai-la-trieu-phu"` |
| `gameKey` | string | ✅ | Key game (= appid) | `"minigame-ai-la-trieu-phu"` |
| `clientid` | string | ✅ | Course ID (URL-encoded) | `"course-v1%3APiStudy%2BTOAN7%2B2025_T9"` |
| `userId` | integer | ❌ | User ID từ JWT | `13` |
| `username` | string | ✅ | preferred_username từ JWT | `"913_tuanhvan2018"` |
| `email` | string | ✅ | Email từ JWT | `"913.tuanhvan2018@gmail.com"` |

#### Payload - Transaction

| Trường | Kiểu | Bắt buộc | Mô tả | Ví dụ |
|--------|------|----------|-------|-------|
| `coin` | integer | ✅ | **Số tiền trừ** (SỐ ÂM) | `-8000` |
| `xp` | integer | ✅ | Luôn = 0 | `0` |
| `bonus_coin` | integer | ✅ | Luôn = 0 | `0` |
| `bonus_xp` | integer | ✅ | Luôn = 0 | `0` |
| `score` | integer | ✅ | Luôn = 0 | `0` |

#### Payload - Item

| Trường | Kiểu | Bắt buộc | Mô tả | Ví dụ |
|--------|------|----------|-------|-------|
| `item_id` | string | ✅ | ID vật phẩm | `"extra_change_question"` |
| `item_name` | string | ✅ | Tên hiển thị | `"Đổi Câu Hỏi"` |
| `item_type` | string | ✅ | Loại: `lifeline` hoặc `skin` | `"lifeline"` |

### 4.3 Công Thức Tính `coin`

```
coin = -price
```

| Item | Giá | coin |
|------|-----|------|
| Đổi Câu Hỏi | 8,000 | -8000 |
| Hỏi AI | 6,000 | -6000 |
| Skin Premium | 50,000 | -50000 |

---

## 5. Response

### 5.1 Thành Công (200 OK)

```json
{
  "status": "success",
  "message": "Purchase completed",
  "data": {
    "item_id": "extra_change_question",
    "balance_before": 50000,
    "balance_after": 42000,
    "inventory_updated": true
  }
}
```

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `status` | string | `"success"` |
| `message` | string | Thông báo |
| `data.item_id` | string | ID item đã mua |
| `data.balance_before` | integer | Balance trước khi mua |
| `data.balance_after` | integer | Balance sau khi mua |
| `data.inventory_updated` | boolean | Item đã được thêm vào inventory |

---

## 6. Mã Lỗi

### 6.1 400 Bad Request

#### Thiếu trường bắt buộc
```json
{
  "error": "Invalid payload",
  "message": "Missing required field: item_id"
}
```

#### msgtype không hợp lệ
```json
{
  "error": "Invalid msgtype",
  "message": "msgtype must be 'PURCHASE'"
}
```

#### Không đủ tiền
```json
{
  "error": "Insufficient balance",
  "message": "User balance (5000) is less than item price (8000)",
  "data": {
    "current_balance": 5000,
    "required": 8000,
    "shortage": 3000
  }
}
```

### 6.2 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid JWT token"
}
```

### 6.3 404 Not Found

```json
{
  "error": "Item not found",
  "message": "Item 'invalid_item' does not exist"
}
```

### 6.4 500 Internal Server Error

```json
{
  "error": "Internal error",
  "message": "Database connection failed"
}
```

---

## 7. Logic Backend

### 7.1 Luồng Xử Lý

```
┌─────────────────┐
│ Nhận Request    │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Validate JWT    │──── Lỗi ───► 401 Unauthorized
└────────┬────────┘
         ▼
┌─────────────────┐
│ Parse payload   │──── Lỗi ───► 400 Bad Request
└────────┬────────┘
         ▼
┌─────────────────┐
│ Check item tồn  │──── Lỗi ───► 404 Not Found
│ tại trong shop  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Check balance   │──── Không đủ ─► 400 Insufficient balance
│ >= |coin|       │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Trừ balance     │
│ user += coin    │   (coin < 0 nên balance giảm)
└────────┬────────┘
         ▼
┌─────────────────┐
│ Thêm item vào   │
│ inventory       │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Ghi log giao    │
│ dịch vào DB     │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Return 200 OK   │
└─────────────────┘
```

### 7.2 Pseudocode

```python
def handle_purchase(request):
    # 1. Xác thực user
    user = authenticate_from_jwt(request)
    if not user:
        return Response({"error": "Unauthorized"}, status=401)
    
    # 2. Parse payload
    data = request.json()
    if data.get('msgtype') != 'PURCHASE':
        return Response({"error": "Invalid msgtype"}, status=400)
    
    payload = data.get('payload', {})
    
    # 3. Validate required fields
    required = ['item_id', 'item_name', 'item_type', 'coin']
    for field in required:
        if field not in payload:
            return Response({
                "error": "Invalid payload",
                "message": f"Missing required field: {field}"
            }, status=400)
    
    # 4. Check item exists
    item_id = payload['item_id']
    item = ShopItem.objects.filter(id=item_id).first()
    if not item:
        return Response({"error": "Item not found"}, status=404)
    
    # 5. Check balance
    price = abs(payload['coin'])  # coin là số âm
    if user.balance < price:
        return Response({
            "error": "Insufficient balance",
            "message": f"User balance ({user.balance}) < price ({price})"
        }, status=400)
    
    # 6. Process transaction
    balance_before = user.balance
    user.balance -= price
    user.inventory.append(item_id)
    user.save()
    
    # 7. Log transaction
    MinigameLog.objects.create(
        user=user,
        msgtype='PURCHASE',
        tsms=data.get('tsms'),
        payload=payload
    )
    
    return Response({
        "status": "success",
        "message": "Purchase completed",
        "data": {
            "item_id": item_id,
            "balance_before": balance_before,
            "balance_after": user.balance,
            "inventory_updated": True
        }
    })
```

---

## 8. Test Cases

### 8.1 Happy Path

| # | Mô tả | Input | Expected |
|---|-------|-------|----------|
| 1 | Mua lifeline thành công | balance=50000, price=8000 | 200 OK, balance=42000 |
| 2 | Mua skin thành công | balance=100000, price=50000 | 200 OK, balance=50000 |
| 3 | Mua item cuối cùng | balance=8000, price=8000 | 200 OK, balance=0 |

### 8.2 Error Cases

| # | Mô tả | Input | Expected |
|---|-------|-------|----------|
| 4 | Không đủ tiền | balance=5000, price=8000 | 400 Insufficient balance |
| 5 | Thiếu JWT token | No cookie | 401 Unauthorized |
| 6 | Item không tồn tại | item_id="invalid" | 404 Not Found |
| 7 | Thiếu item_id | payload without item_id | 400 Missing field |
| 8 | msgtype sai | msgtype="RESULT" | 400 Invalid msgtype |

### 8.3 Edge Cases

| # | Mô tả | Input | Expected |
|---|-------|-------|----------|
| 9 | coin = 0 | coin=0 | 400 Invalid (giá = 0?) |
| 10 | coin dương | coin=8000 | 400 Invalid (phải âm) |
| 11 | Mua trùng item | item đã có trong inventory | Tùy business logic |

---

## 9. Ví Dụ Code

### 9.1 Frontend (TypeScript)

```typescript
async function savePurchaseLog(
  itemId: string,
  itemName: string,
  price: number,
  itemType: 'lifeline' | 'skin'
) {
  const payload = {
    msgtype: 'PURCHASE',
    tsms: Date.now(),
    payload: {
      appid: 'minigame-ai-la-trieu-phu',
      coin: -price,  // ❗ Số âm = trừ tiền
      xp: 0,
      bonus_coin: 0,
      bonus_xp: 0,
      userId: userInfo.userId,
      username: userInfo.username,
      email: userInfo.email,
      gameKey: 'minigame-ai-la-trieu-phu',
      clientid: encodeURIComponent(courseId),
      score: 0,
      item_id: itemId,
      item_name: itemName,
      item_type: itemType
    }
  };
  
  // Gửi qua Engine
  window.parent.postMessage({
    type: 'MINIGAME_ACTION',
    action: 'SAVE_RESULT',
    data: payload
  }, '*');
}
```

### 9.2 cURL

```bash
curl -X POST "https://pistudy.vn/api/minigames/logs/" \
  -H "Content-Type: application/json" \
  -H "X-CSRFToken: abc123" \
  -H "Cookie: edx-jwt-cookie-header-payload=eyJ..." \
  -d '{
    "msgtype": "PURCHASE",
    "tsms": 1767290916605,
    "payload": {
      "appid": "minigame-ai-la-trieu-phu",
      "coin": -8000,
      "xp": 0,
      "bonus_coin": 0,
      "bonus_xp": 0,
      "userId": 13,
      "username": "913_tuanhvan2018",
      "email": "913.tuanhvan2018@gmail.com",
      "gameKey": "minigame-ai-la-trieu-phu",
      "clientid": "course-v1%3APiStudy%2BTOAN7%2B2025_T9",
      "score": 0,
      "item_id": "extra_change_question",
      "item_name": "Đổi Câu Hỏi",
      "item_type": "lifeline"
    }
  }'
```

---

## 📝 Ghi Chú

> **⚠️ QUAN TRỌNG:**
> - `coin` PHẢI là số ÂM để trừ tiền
> - Backend cần validate `abs(coin) <= user.balance` trước khi xử lý
> - Nên có transaction lock để tránh race condition khi mua đồng thời
