# 🎓 CẤU TRÚC WEBSITE MỚI - HỌC TRIẾT HIỆU QUẢ

## 📁 Cấu trúc thư mục

```
MLN111/
├── index.html                    # Trang chủ - Đặt vấn đề
├── styles.css                    # CSS chính cho toàn bộ website
├── script.js                     # JavaScript chính
├── review.js                     # JavaScript riêng cho trang ôn tập
├── README.md                     # Hướng dẫn chung
├── NAVIGATION.md                 # File này - Hướng dẫn điều hướng
│
├── pages/                        # Thư mục chứa các trang chính
│   ├── intro.html               # Giới thiệu dự án
│   ├── methods.html             # Phương pháp học (đang tạo)
│   ├── exam-tips.html           # Làm bài & Điểm cao (đang tạo)
│   ├── case-studies.html        # Ví dụ thực tiễn (đang tạo)
│   ├── review.html              # ⭐ Câu hỏi ôn tập (ĐÃ TẠO)
│   └── conclusion.html          # Kết luận (đang tạo)
│
└── chapters/                     # Thư mục chứa các chương học
    ├── chuong1.html             # Chương 1: Khái quát về Triết học
    ├── chuong2.html             # Chương 2: Vật chất & Ý thức
    ├── chuong3.html             # Chương 3: Phép biện chứng (đang tạo)
    └── chuong4.html             # Chương 4: Lý luận nhận thức (đang tạo)
```

## 🗺️ Sơ đồ điều hướng

### Menu chính (có ở tất cả trang):
```
Trang chủ | Giới thiệu | Nội dung ▾ | Phương pháp học | Làm bài | Ví dụ | Ôn tập | Kết luận
```

### Dropdown "Nội dung":
- Chương 1: Khái quát về Triết học
- Chương 2: Vật chất & Ý thức  
- Chương 3: Phép biện chứng
- Chương 4: Lý luận nhận thức

## 📄 Chi tiết từng trang

### 1. **index.html** - Trang chủ
**Nội dung:**
- Hero section với tiêu đề chính
- Vấn đề sinh viên gặp phải (3 cards)
- Các câu hỏi gợi mở (4 câu hỏi)
- Thông điệp chính của dự án
- Quick links đến các trang khác

**Đặc biệt:** Nhấn mạnh link đến trang "Ôn tập" (highlight màu tím)

---

### 2. **pages/intro.html** - Giới thiệu
**Nội dung:**
- Lý do chọn đề tài (3 reasons)
- Mục tiêu học tập (4 goals chi tiết)
- Ý nghĩa thực tiễn (3 khía cạnh)
- Triết học của chính dự án này

**Navigation:** Có nút "Bắt đầu Chương 1" và "Xem phương pháp học"

---

### 3. **chapters/chuong1.html** - Chương 1: Khái quát
**Nội dung:**
- Khái niệm cốt lõi:
  - Triết học là gì?
  - Vấn đề cơ bản
  - Chủ nghĩa duy vật biện chứng
- Ý chính quan trọng (3 điểm)
- Sơ đồ tư duy (mindmap + bảng so sánh)
- Ví dụ minh họa (3 examples)
- Câu hỏi thực hành (2 câu)
- Tóm tắt chương

**Navigation đặc biệt:** 
- Chapter navigation ở bottom: ← Chương trước | Chương 1/4 | Chương sau →
- Nút "Làm câu hỏi ôn tập" link đến review.html#chuong1

---

### 4. **chapters/chuong2.html** - Chương 2: Vật chất & Ý thức
**Nội dung:**
- Khái niệm: Vật chất, Ý thức, Mối quan hệ
- Ý chính: 3 nguyên lý quan trọng
- Sơ đồ quan hệ (flow diagram + comparison table)
- Ví dụ: Sức khỏe, Phương pháp học, Mục tiêu
- Câu hỏi thực hành
- Tóm tắt

**Tương tự:** Chapter navigation + link ôn tập

---

### 5. **pages/review.html** ⭐ - Câu hỏi Ôn tập
**Tính năng đặc biệt:**
- **Progress tracking:** Hiển thị số câu hỏi đã ôn (lưu trên localStorage)
- **Accordion:** Click để mở/đóng câu hỏi
- **Checkbox:** Đánh dấu ✓ khi ôn xong
- **Organized by chapter:** Chia theo từng chương

**Nội dung hiện tại:**
- Chương 1: 3 câu hỏi (khái niệm, vai trò, phân biệt)
- Chương 2: 3 câu hỏi (mối quan hệ, vật chất quyết định, vai trò ý thức)
- Chương 3: 3 câu hỏi (lượng-chất, mối liên hệ, phủ định)

**Mỗi câu hỏi có:**
- Dàn ý chi tiết
- Gợi ý trả lời
- Ví dụ minh họa
- Key points cần nhớ

**JavaScript:** review.js xử lý accordion và lưu tiến độ

---

### 6-9. Các trang còn lại (đang tạo):
- **methods.html:** Phương pháp học Triết hiệu quả
- **exam-tips.html:** Cách làm bài đạt điểm cao
- **case-studies.html:** 4 case study thực tiễn
- **conclusion.html:** Kết luận và thông điệp

## 🎨 Tính năng giao diện

### Dark Mode
- Toggle button ở góc phải màn hình (☀️/🌙)
- Lưu preference vào localStorage
- Hoạt động trên tất cả trang

### Animations
- Reveal on scroll (fade in từ dưới lên)
- Hover effects trên cards
- Smooth scrolling
- Dropdown menu

### Responsive
- Mobile-first design
- Breakpoints: 768px (tablet), 480px (mobile)
- Navigation collapse trên mobile

## 📊 Thống kê dự án

### Đã hoàn thành:
- ✅ Trang chủ (index.html)
- ✅ Giới thiệu (pages/intro.html)
- ✅ Chương 1 (chapters/chuong1.html)
- ✅ Chương 2 (chapters/chuong2.html)
- ✅ Câu hỏi Ôn tập (pages/review.html) ⭐
- ✅ CSS mở rộng (dropdown, accordion, chapter nav)
- ✅ JavaScript cho review page

### Đang thực hiện:
- 🔄 Chương 3: Phép biện chứng
- 🔄 Chương 4: Lý luận nhận thức
- 🔄 Phương pháp học
- 🔄 Làm bài & Điểm cao
- 🔄 Case studies
- 🔄 Kết luận

## 🚀 Cách sử dụng

### 1. Mở website:
```
File → Open → Chọn index.html
```
hoặc dùng Live Server trong VS Code

### 2. Điều hướng:
- Dùng menu trên cùng để di chuyển giữa các trang
- Hover vào "Nội dung" để xem dropdown các chương
- Dùng chapter navigation (ở bottom) khi đọc chương

### 3. Ôn tập:
- Vào trang "Ôn tập" (review.html)
- Click câu hỏi để xem gợi ý
- Đánh dấu ✓ khi ôn xong
- Theo dõi tiến độ ở trên cùng

### 4. Reset tiến độ ôn tập (nếu cần):
Mở Console (F12) và gõ:
```javascript
resetProgress()
```

## 💡 Điểm nổi bật

### 1. Chia nhỏ nội dung
- Không còn tập trung vào 1 file index.html
- Mỗi chương là 1 file riêng → Dễ học, dễ quản lý

### 2. Tab "Ôn tập" rất đắt giá
- Giảng viên sẽ đánh giá cao
- Có tính sư phạm
- Giúp sinh viên thực sự

### 3. Scientific structure
- Từ tổng quan → Chi tiết
- Từ lý thuyết → Thực hành
- Liên hệ thực tiễn sau mỗi chương

### 4. Interactive
- Checkbox tracking
- Accordion Q&A
- Progress stats
- localStorage persistence

## 🎯 Lộ trình học đề xuất

1. **Trang chủ** → Hiểu vấn đề
2. **Giới thiệu** → Biết mục tiêu
3. **Chương 1-4** → Học lý thuyết (theo thứ tự)
4. **Phương pháp học** → Biết cách học đúng
5. **Ôn tập** → Làm câu hỏi từng chương
6. **Làm bài** → Học cách viết bài thi
7. **Case studies** → Xem ví dụ thực tiễn
8. **Kết luận** → Tổng kết và áp dụng

## 📝 Ghi chú cho giảng viên

Website này thể hiện:
- ✅ Hiểu sâu nội dung Triết học
- ✅ Khả năng tổ chức kiến thức khoa học
- ✅ Ứng dụng công nghệ vào học tập
- ✅ Tư duy sư phạm (giúp người khác học)
- ✅ Tính thực tiễn cao (review page, examples)

**Đặc biệt:** Tab "Ôn tập" với checklist là điểm sáng!

---

*Cập nhật lần cuối: 27/01/2026*
*Tiến độ: 50% hoàn thành*
