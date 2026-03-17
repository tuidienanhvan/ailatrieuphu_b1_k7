# PiAI Game Standard (Boilerplate Guide)

Tài liệu này quy định cấu trúc thư mục chuẩn cho các dự án game trong hệ sinh thái PiAI. Việc tuân thủ cấu trúc này giúp dự án dễ bảo trì, dễ nhân bản và tối ưu cho việc cộng tác.

## 📁 Cấu trúc thư mục

### ⚙️ `@platform/` (The Mechanism - Engine)

Đóng vai trò là "Cỗ máy vĩnh cửu" của game. Tuyệt đối **KHÔNG** import từ `@game`.

- **engine/**: Chứa logic thuần túy (Math, Timer, Event Runtime).
- **bridge/**: Giao tiếp với Hub bên ngoài qua `postMessage`.
- **components/**: Các UI "Hạ tầng" (Scaler, ErrorBoundary, Loading).
- **types/**: Định nghĩa các "Hợp đồng" dữ liệu chuẩn của PiAI.

### 🎭 `@game/` (The Content - Linh hồn)

Nơi chứa nội dung cụ thể của trò chơi hiện tại. Sử dụng tài nguyên từ `@platform`.

- **theme/**: Định nghĩa bộ nhận diện (Tokens, Skin, Layout).
- **events/**: Kho kịch bản sự kiện (Pranks, Rewards).
- **store/**: Quản lý trạng thái bằng Zustand slices.
- **hooks/**: Logic "Nối luồng" giữa UI và Engine.
- **defaults/**: Nơi cấu hình các hằng số (Số câu hỏi, Milestone, Giá vật phẩm).

---

## 🛠️ Quy trình phát triển game mới từ Boilerplate

1. **Nhân bản**: Copy toàn bộ project hiện tại (hoặc Repo template).
2. **Cấu hình content**: Sửa file trong `@game/defaults/` để thay đổi luật chơi cơ bản.
3. **Thay da đổi thịt**: Cập nhật `@game/theme/` để có giao diện mới.
4. **Viết kịch bản**: Thêm các sự kiện mới vào `@game/events/`.
5. **Nâng cấp Engine (nếu cần)**: Chỉ sửa `@platform` nếu game mới yêu cầu một cơ chế tính toán hoàn toàn khác.

## ⚠️ Quy tắc vàng

> **Engine (@platform) không được biết Game (@game) là gì.** Nó chỉ thực thi các lệnh được truyền vào.

---

_PiAI Engineering Team Standard v1.0_
