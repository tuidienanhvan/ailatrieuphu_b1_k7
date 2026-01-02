# 🔧 BACKEND API SPECIFICATION - RESULT Message

> **Đối tượng:** Backend Developers  
> **Mục đích:** Đặc tả chi tiết cách xử lý message `RESULT` từ Minigame  
> **Ngày:** 2026-01-02  
> **Version:** 1.0

---

## 📋 TỔNG QUAN

Message `RESULT` được frontend gửi khi user hoàn thành một ván chơi (victory/gameover/stop).

**Endpoint:** `POST /api/minigames/logs/`

**Content-Type:** `application/json`

**Authentication:** Cookie-based (edx-jwt-cookie-header-payload)

---

## 📨 REQUEST FORMAT

### Headers
```http
POST /api/minigames/logs/ HTTP/1.1
Content-Type: application/json
X-CSRFToken: <csrf_token>
Cookie: edx-jwt-cookie-header-payload=<jwt>; csrftoken=<token>
```

### Body Structure
```json
{
  "msgtype": "RESULT",
  "tsms": 1767290916605,
  "payload": {
    "appid": "minigame-ai-la-trieu-phu",
    "coin": 667,
    "xp": 7,
    "bonus_coin": 151,
    "bonus_xp": 0,
    "username": "913_tuanhvan2018",
    "email": "913.tuanhvan2018@gmail.com",
    "gameKey": "minigame-ai-la-trieu-phu",
    "clientid": "course-v1%3APiStudy%2BTOAN7%2B2025_T9",
    "score": 1,
    "result": "stop",
    "level": 1,
    "wrong_answer_level": null,
    "lifelines_used": []
  }
}
```

---

## 📊 FIELD DEFINITIONS

### Root Level

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `msgtype` | string | ✅ | Luôn là `"RESULT"` |
| `tsms` | number | ✅ | Timestamp (milliseconds) khi message được tạo |
| `payload` | object | ✅ | Chi tiết kết quả game |

### Payload Fields

#### Identification Fields
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `appid` | string | ✅ | ID của minigame | `"minigame-ai-la-trieu-phu"` |
| `gameKey` | string | ✅ | Key định danh game (thường giống `appid`) | `"minigame-ai-la-trieu-phu"` |
| `clientid` | string | ✅ | Course ID (URL-encoded) | `"course-v1%3APiStudy%2BTOAN7%2B2025_T9"` |
| `username` | string | ✅ | Username của user | `"913_tuanhvan2018"` |
| `email` | string | ✅ | Email của user | `"913.tuanhvan2018@gmail.com"` |

#### Reward Fields
| Field | Type | Required | Description | Range |
|-------|------|----------|-------------|-------|
| `coin` | number | ✅ | **Coin chính** - Phần thưởng theo level đạt được | 0 - 10,000 |
| `xp` | number | ✅ | **XP chính** - Kinh nghiệm theo level | 0 - 100 |
| `bonus_coin` | number | ✅ | **Bonus Coin** - Phần thưởng phụ (20%-60% của coin) | 0 - 6,000 |
| `bonus_xp` | number | ✅ | **Bonus XP** - Thường là 0 | 0 |

#### Game Result Fields
| Field | Type | Required | Description | Possible Values |
|-------|------|----------|-------------|-----------------|
| `score` | number | ✅ | Level/Điểm số đạt được | 0 - 15 |
| `result` | string | ✅ | Kết quả ván chơi | `"victory"`, `"gameover"`, `"stop"` |
| `level` | number | ✅ | Câu hỏi cuối cùng đạt được (1-indexed) | 1 - 15 |
| `wrong_answer_level` | number\|null | ❌ | Câu hỏi trả lời sai (nếu có) | `null` hoặc 1-15 |
| `lifelines_used` | array | ❌ | Danh sách cứu trợ đã dùng | `[]` hoặc `["fiftyFifty", "phone"]` |

---

## 🎯 YÊU CẦU XỬ LÝ BACKEND

### 1. Xác Thực (Authentication)

Backend lấy thông tin user từ **2 cookies** theo thứ tự ưu tiên:

> [!IMPORTANT]
> **ƯU TIÊN JWT** (`edx-jwt-cookie-header-payload`) vì có đầy đủ thông tin:
> - ✅ `user_id`, `email`, `name`, `preferred_username`
> - Fallback `edx-user-info` chỉ có `username` (thiếu `email`, `user_id`)

#### A. Cookie `edx-jwt-cookie-header-payload`
**Format:** JWT Token (3 parts: header.payload.signature)

**Decode Payload (Base64):**
```python
import jwt
import json

# Lấy JWT từ cookie
jwt_token = request.cookies.get('edx-jwt-cookie-header-payload')

# Decode (không verify - chỉ đọc payload)
payload = jwt.decode(jwt_token, options={"verify_signature": False})

# Kết quả:
{
    "preferred_username": "913_tuanhvan2018",
    "email": "913.tuanhvan2018@gmail.com",
    "name": "Anh Văn Từ",           # Họ tên đầy đủ
    "user_id": 13,                  # ID trong database
    "exp": 1767380437,              # Thời gian hết hạn
    "iat": 1767294037,              # Thời gian tạo
    "iss": "https://pistudy.vn/oauth2",
    "administrator": false,
    # ... các field khác
}
```

#### B. Cookie `edx-user-info`
**Format:** JSON string (URL-encoded)

**Decode:**
```python
import urllib.parse
import json

# Lấy từ cookie
raw = request.cookies.get('edx-user-info')

# Decode URL encoding
decoded = urllib.parse.unquote(raw)

# Remove quotes if wrapped
if decoded.startswith('"') and decoded.endswith('"'):
    decoded = decoded[1:-1]

# Replace escaped chars
decoded = decoded.replace('\\054', ',').replace('\\\\', '')

# Parse JSON
user_info = json.loads(decoded)

# Kết quả:
{
    "username": "913_tuanhvan2018",
    "email": "913.tuanhvan2018@gmail.com",
    "version": 1,
    "header_urls": {...},
    "user_image_urls": {...}
}
```

#### C. Code Mẫu Backend
```python
def get_user_from_request(request):
    """
    Lấy thông tin user từ JWT cookie
    """
    try:
        jwt_token = request.cookies.get('edx-jwt-cookie-header-payload')
        if not jwt_token:
            return None, "Missing JWT token"
        
        # Decode JWT (không verify signature vì đây là internal service)
        payload = jwt.decode(jwt_token, options={"verify_signature": False})
        
        return {
            'user_id': payload.get('user_id'),
            'username': payload.get('preferred_username'),
            'email': payload.get('email'),
            'name': payload.get('name'),
        }, None
        
    except jwt.DecodeError as e:
        return None, f"Invalid JWT: {str(e)}"
    except Exception as e:
        return None, f"Error: {str(e)}"


def save_minigame_result(request):
    # 1. Xác thực user
    user, error = get_user_from_request(request)
    if error:
        return JsonResponse({"error": error}, status=401)
    
    # 2. Parse payload
    data = json.loads(request.body)
    payload = data.get('payload', {})
    
    # 3. Validate user match (optional)
    if payload.get('email') != user['email']:
        return JsonResponse({"error": "Email mismatch"}, status=400)
    
    # 4. Process logic...
```

### 2. Decode ClientID
```python
from urllib.parse import unquote

# ClientID được URL-encoded
raw_client_id = payload.get('clientid')
course_id = unquote(raw_client_id)
# Result: "course-v1:PiStudy+TOAN7+2025_T9"
```

### 3. Tính Toán Best Score/Coin

**Logic hiện tại (theo phản hồi từ Dev Backend):**
```python
# Lấy record hiện tại của user cho game này
current_record = GameRecord.objects.filter(
    user_id=user_id,
    appid=payload['appid'],
    clientid=course_id
).first()

# Tính tổng coin + bonus_coin
total_coin_this_run = payload['coin'] + payload['bonus_coin']

if current_record:
    # So sánh với kỷ lục cũ
    current_best = current_record.best_coin
    
    if total_coin_this_run > current_best:
        # Phá kỷ lục - Cập nhật
        current_record.best_coin = total_coin_this_run
        current_record.best_score = payload['score']
        current_record.save()
    else:
        # Không phá kỷ lục - Giữ nguyên
        pass
else:
    # Lần đầu chơi - Tạo record mới
    GameRecord.objects.create(
        user_id=user_id,
        appid=payload['appid'],
        clientid=course_id,
        best_coin=total_coin_this_run,
        best_score=payload['score']
    )
```

### 4. Tính Tổng Coin Của User
```python
# total_coin = SUM(best_coin của tất cả games của user)
all_records = GameRecord.objects.filter(user_id=user_id)
total_coins = sum(record.best_coin for record in all_records)

# Cập nhật vào UserProfile
user_profile.total_coins = total_coins
user_profile.save()
```

---

## ⚠️ VẤN ĐỀ HIỆN TẠI

### Logic Max Score
Theo cơ chế hiện tại:
- Backend chỉ **lưu kỷ lục cao nhất** (`best_coin = MAX(coin + bonus_coin)`)
- Chơi đi chơi lại mà không phá kỷ lục → **Coin KHÔNG tăng**

**Ví dụ:**
| Ván | coin | bonus_coin | Total | Best Coin | User Balance |
|-----|------|------------|-------|-----------|--------------|
| 1 | 100 | 20 | 120 | 120 | 120 |
| 2 | 50 | 10 | 60 | 120 | 120 ⚠️ (không đổi) |
| 3 | 200 | 40 | 240 | 240 | 240 ✅ (phá kỷ lục) |

### Hậu quả
- ❌ User không thể "cày tiền" (grinding)
- ❌ `bonus_coin` không có tác dụng tích lũy
- ❌ Chỉ người chơi giỏi (phá kỷ lục) mới kiếm được tiền

---

## 💡 ĐỀ XUẤT CẢI TIẾN

### Option 1: Tách Coin và Bonus Coin

**Ý tưởng:** 
- `coin` → Theo logic Max (kỷ lục)  
- `bonus_coin` → **Cộng dồn mỗi ván** (tích lũy)

**Code mẫu:**
```python
# Cập nhật kỷ lục (coin + bonus_coin)
if total_coin_this_run > current_best:
    current_record.best_coin = total_coin_this_run
    current_record.save()

# Cộng dồn bonus_coin (LUÔN LUÔN)
BonusCoinLog.objects.create(
    user_id=user_id,
    appid=payload['appid'],
    amount=payload['bonus_coin'],
    earned_at=datetime.now()
)

# Tính tổng coin
total_coins = (
    sum(r.best_coin for r in all_records) +  # Kỷ lục
    sum(b.amount for b in BonusCoinLog.objects.filter(user_id=user_id))  # Tích lũy
)
```

**Ưu điểm:**
- ✅ Người chơi giỏi được thưởng kỷ lục (`coin`)
- ✅ Người chơi cần được thưởng tích lũy (`bonus_coin`)
- ✅ Khuyến khích chơi lại nhiều lần

---

### Option 2: Dùng PROGRESS Message

**Ý tưởng:**
- `RESULT` → Giữ nguyên logic Max Score
- `PROGRESS` → Cho phép cộng dồn coin mỗi ván

**Khi nào gửi:**
- Frontend gửi `RESULT` khi kết thúc game
- Frontend **thêm** gửi `PROGRESS` để tích lũy bonus

**Code mẫu:**
```python
if msg_type == 'PROGRESS':
    # Cộng dồn không cần check kỷ lục
    ProgressLog.objects.create(
        user_id=user_id,
        appid=payload['appid'],
        coin=payload['coin'],
        bonus_coin=payload['bonus_coin']
    )
    
    # Cập nhật total_coins
    total_progress = sum(p.coin + p.bonus_coin 
                        for p in ProgressLog.objects.filter(user_id=user_id))
    user_profile.total_coins = total_best_coins + total_progress
```

---

### Option 3: Flag `allow_accumulate`

**Ý tưởng:**
- Thêm field `allow_accumulate: boolean` vào payload
- Nếu `true` → Cộng dồn
- Nếu `false` → Logic Max Score

**Payload:**
```json
{
  "msgtype": "RESULT",
  "payload": {
    "coin": 100,
    "bonus_coin": 20,
    "allow_accumulate": true  // ← NEW FLAG
  }
}
```

**Code mẫu:**
```python
if payload.get('allow_accumulate', False):
    # Cộng dồn
    user_profile.total_coins += payload['coin'] + payload['bonus_coin']
else:
    # Logic Max Score (hiện tại)
    if total_coin > current_record.best_coin:
        current_record.best_coin = total_coin
```

---

## 🧪 TEST CASES

### Test 1: Lần Đầu Chơi
**Input:**
```json
{
  "msgtype": "RESULT",
  "payload": {
    "appid": "minigame-ai-la-trieu-phu",
    "coin": 667,
    "bonus_coin": 151,
    "score": 1
  }
}
```

**Expected:**
- Tạo record mới
- `best_coin = 667 + 151 = 818`
- `user.total_coins += 818`

---

### Test 2: Không Phá Kỷ Lục
**Setup:** Best coin hiện tại = 1000

**Input:**
```json
{
  "payload": {
    "coin": 500,
    "bonus_coin": 100
    // total = 600
  }
}
```

**Expected:**
- `best_coin` giữ nguyên = 1000
- `user.total_coins` **KHÔNG ĐỔI**

---

### Test 3: Phá Kỷ Lục
**Setup:** Best coin hiện tại = 1000

**Input:**
```json
{
  "payload": {
    "coin": 1500,
    "bonus_coin": 300
    // total = 1800
  }
}
```

**Expected:**
- `best_coin` = 1800 (cập nhật)
- `user.total_coins += (1800 - 1000) = +800`

---

## 📊 DATABASE SCHEMA (Đề xuất)

### Table: `minigame_records`
```sql
CREATE TABLE minigame_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    appid VARCHAR(100) NOT NULL,
    clientid VARCHAR(200) NOT NULL,
    best_coin INTEGER DEFAULT 0,
    best_score INTEGER DEFAULT 0,
    last_played_at TIMESTAMP,
    UNIQUE(user_id, appid, clientid)
);
```

### Table: `minigame_logs` (Chi tiết mỗi ván)
```sql
CREATE TABLE minigame_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    appid VARCHAR(100) NOT NULL,
    clientid VARCHAR(200) NOT NULL,
    msgtype VARCHAR(50),
    coin INTEGER,
    bonus_coin INTEGER,
    xp INTEGER,
    score INTEGER,
    result VARCHAR(50),
    level INTEGER,
    lifelines_used JSONB,
    created_at TIMESTAMP,
    tsms BIGINT
);
```

---

## 🔗 RESPONSE FORMAT

### Success Response
```json
{
  "status": "success",
  "message": "Result saved",
  "data": {
    "record_updated": true,
    "new_best_coin": 1800,
    "user_total_coins": 5000
  }
}
```

### Error Responses
```json
// 401 Unauthorized
{
  "error": "Unauthorized",
  "message": "Invalid or missing JWT token"
}

// 400 Bad Request
{
  "error": "Invalid payload",
  "message": "Missing required field: coin"
}
```

---

## 📝 CHANGELOG

### Version 1.0 (2026-01-02)
- Tạo specification ban đầu
- Đặc tả format RESULT message
- Mô tả logic Max Score hiện tại
- Đề xuất 3 options cải tiến
- Thêm test cases và database schema
