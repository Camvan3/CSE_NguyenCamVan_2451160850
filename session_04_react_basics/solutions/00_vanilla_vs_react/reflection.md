### 1. 
Mỗi lần có tương tác, chúng ta phải gọi ít nhất **2 hàm**:
- **Hàm xử lý hành động:** `addTodo()`, `deleteTodo()`, hoặc `toggleTodo()`.
- **Hàm đồng bộ giao diện:** Luôn phải gọi thủ công hàm `renderTodos()` ở cuối mỗi hành động để ép trình duyệt cập nhật lại DOM. 
Nếu không gọi `renderTodos()`, dữ liệu trong mảng `todos` thay đổi nhưng giao diện người dùng sẽ đứng im.

### 2.
Khi hàm `setTodos(...)` được gọi, React sẽ tự động thực hiện:
- Đánh dấu component cần được cập nhật và lên lịch chạy lại (re-render) hàm `TodoApp()`.
- Tạo ra một cây **Virtual DOM** mới phản ánh dữ liệu vừa thay đổi.
- So sánh cây Virtual DOM mới này với cây Virtual DOM cũ (cơ chế Diffing) nhằm tìm ra chính xác vị trí thẻ HTML nào bị thay đổi.
- Chỉ cập nhật (patch) những phần tử thực sự thay đổi lên DOM thật của trình duyệt thay vì xóa đi xây lại toàn bộ như `innerHTML` của JS thuần.

### 3.
Sử dụng **React** sẽ an toàn và tối ưu hơn rất nhiều. Vì:
- **Tránh lỗi bảo mật & Hiệu năng:** Nếu dùng JS thuần với `innerHTML`, việc lặp lại chuỗi HTML 50 lần rồi ghi đè liên tục sẽ khiến trình duyệt bị giật lag (do phải tính toán lại Layout và Paint). Ngoài ra, `innerHTML` rất dễ dính lỗi bảo mật XSS (Cross-Site Scripting).
- **Dễ bảo trì (Maintain):** Ở cách làm của React, giao diện gắn liền với State. Minh chỉ cần quan tâm đến việc thêm/sửa/xóa mảng dữ liệu, giao diện sẽ tự động biến đổi chuẩn xác theo, không sợ quên gọi hàm render hay can thiệp nhầm thẻ HTML.

### 4.
Cơ chế này được áp dụng trực tiếp cho trang Portfolio như sau:
- **`useState`**: Sẽ quản lý một mảng chứa 50 object dự án (lấy từ file `portfolio.js`) và một state chuỗi để lưu danh mục đang chọn (ví dụ: `activeCategory = 'Web'`).
- **`.filter()`**: Trước khi in ra màn hình, ta chạy `.filter()` mảng dự án tổng để giữ lại những dự án có danh mục trùng với `activeCategory` mà người dùng vừa click chọn.
- **`.map()`**: Chạy vòng lặp biến mảng các dự án đã lọc thành danh sách các thẻ `<ProjectCard />` tương ứng để hiển thị mượt mà trên giao diện.