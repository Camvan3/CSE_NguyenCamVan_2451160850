# PHẦN A-TRACK BOOSTRAP
## CÂU A1-GRID SYSTEM
            |Số cột  |   Box layout  |
<768px      |col-12  |   1box/hàng
768-991px   |col-md-6|   2box/hàng
>= 992px    |col-lg-3|   4box/hàng

**col-6**:
col: Viết tắt của Column (Cột).
md: Viết tắt của Medium (Áp dụng cho kích thước màn hình từ ≥ 768px trở lên đến dưới 992px).
6: Chiếm 6 trên tổng số 12 cột của hệ thống Grid (tương đương 50% chiều rộng của vùng chứa).
=> Từ kích thước màn hình trung bình (md ≥ 768px) trở lên, phần tử này sẽ rộng bằng nửa màn hình (thừa sức xếp 2 phần tử cạnh nhau trên một hàng).
**Tại sao không cần viết col-sm-12?**
Do Bootstrap 5 thiết kế theo nguyên lý Mobile-First (ưu tiên thiết kế cho màn hình nhỏ nhất trước rồi mở rộng dần lên):

Class col-12 không có ký tự viết tắt nào ở giữa (như sm, md, lg) nghĩa là nó áp dụng cho kích thước nhỏ nhất (Extra Small < 576px).

Theo quy tắc kế thừa, cài đặt này sẽ tự động tràn lên các kích thước lớn hơn kế tiếp (bao gồm cả mức sm từ 576px đến 767px) cho đến khi gặp một class khác ghi đè lên nó (ở đây là col-md-6 xuất hiện tại mốc 768px).

Do đó, ở khoảng màn hình sm, các Box vẫn tự động nhận thuộc tính rộng 12 cột từ col-12. Việc viết thêm col-sm-12 là hoàn toàn dư thừa và làm bẩn code.

## CÂU A2-
**Giải thích**
Sự kết hợp này sử dụng cơ chế Mobile-First để ẩn/hiện phần tử dựa theo kích thước màn hình.

d-none: Ẩn phần tử này đi (display: none) ở kích thước màn hình nhỏ nhất (từ Mobile trở lên).

d-md-block: Từ mốc màn hình trung bình trở lên (md ≥ 768px), thuộc tính hiển thị sẽ bị ghi đè thành dạng khối (display: block).
**Liệt kê và giải thích 5 Spacing U**
1. mt-3 (Margin Top 3): Thêm khoảng cách phía trên bên ngoài của phần tử. Trong Bootstrap, mức 3 tương đương với 1rem (thường là 16px nếu cỡ chữ mặc định là 16px).

2. mb-auto (Margin Bottom Auto): Tự động đẩy khoảng cách phía dưới bên ngoài ở mức tối đa. Thường kết hợp với Flexbox để đẩy các phần tử khác về cuối trục.

3. px-4 (Padding X 4): Thêm khoảng cách bên trong theo trục ngang (bao gồm cả bên trái ps và bên phải pe). Mức 4 tương đương với 1.5rem (24px).

4. py-0 (Padding Y 0): Triệt tiêu hoàn toàn khoảng cách bên trong theo trục dọc (trên pt và dưới pb đều bằng 0).

5. ms-2 (Margin Start 2): Thêm khoảng cách bên ngoài ở phía bắt đầu (bên trái đối với ngôn ngữ đọc từ trái sang phải như tiếng Việt). Mức 2 tương đương với 0.5rem (8px).

**Sự khác nhau giữa .container, .container-fluid, và .container-md**
.container:	Co giãn theo từng nấc (Responsive): Nó sẽ có một chiều rộng cố định (max-width) ứng với từng mốc màn hình (sm, md, lg,...). Khi màn hình thay đổi, nó sẽ "nhảy" sang kích thước cố định tiếp theo.	
            Cố định theo mốc (Ví dụ: 1140px trên màn hình xl). Luôn có khoảng trống 2 bên.

.container-fluid: Tràn viền (Full width): Luôn chiếm toàn bộ 100% chiều rộng của màn hình ở bất kỳ kích thước nào, từ Mobile nhỏ nhất cho đến màn hình Desktop siêu rộng.	
Chiều rộng trên desktop: Luôn luôn là 100%.
.container-md: Tràn viền trên Mobile, Thu hẹp trên Desktop: Ở các màn hình nhỏ hơn 768px, nó hoạt động giống hệt container-fluid (rộng 100%). Nhưng từ mốc md (≥ 768px) trở lên, nó bắt đầu thu lại và hoạt động giống hệt .container cố định.
Chiều rộng trên desktop: Cố định giống y hệt .container thông thường.

# PHẦN C-

## CÂU C1:
**1. Quy trình đổi màu $primary sang #E63946**
1. Công cụ cần thiết:
-Node.js & NPM: Để quản lý và cài đặt các thư viện.

-Trình biên dịch SASS: Thường dùng gói sass hoặc dart-sass.

-Công cụ build: Gulp, Webpack, Vite, hoặc extension Live Sass Compiler trên VS Code để tự động biên dịch file .scss thành .css.
2. modified file
-Tải mã nguồn Bootstrap về qua npm: npm install bootstrap.

-Tạo một file SASS tùy biến riêng của bạn, ví dụ tên là assets/scss/custom.scss.

-Chạy trình biên dịch để chuyển file custom.scss thành file main.css để nhúng vào HTML.
**2. Tại sao KHÔNG nên ép đè trực tiếp .btn-primary { background: red; }**
Việc ghi đè trực tiếp bằng CSS thuần là một "anti-pattern" (cách làm tối kỵ) vì những lý do sau:

Hiệu ứng dây chuyền (Ecosystem): Trong Bootstrap, biến $primary không chỉ nuôi mỗi màu nền của nút bấm. Nó tự động tạo ra một hệ sinh thái gồm: màu chữ (.text-primary), màu nền (.bg-primary), màu viền (.border-primary), màu khi hover (:hover), màu khi click (:active), các hiệu ứng đổ bóng (box-shadow), và các thuộc tính của Form, Alert, Badge...

Hậu quả nếu đè CSS thủ công: Nếu bạn chỉ ép .btn-primary thành màu đỏ, thì khi hover nó vẫn có thể chuyển về màu xanh mặc định, hoặc viền của form khi click vào vẫn có màu xanh. Bạn sẽ phải mất công viết hàng trăm dòng CSS khác để ép đè toàn bộ các hiệu ứng ăn theo đó.

Dùng SASS variables: Khi bạn đổi $primary = #E63946, SASS sẽ tự động tính toán lại toàn bộ màu hover, màu alert, màu text... liên quan đến primary trên toàn hệ thống chỉ bằng 1 dòng code.

## CÂU C2-
SO SANHS CSS THUẦN-BOOSTRAP 5 VERSION
SO VỚI CSS THÌ BOOSTRAP:
1. Số dòng cần viết: 0 dòng css
2. Thời gian phát triển: Nhanh(5-10p)
3. Khả năng tùy biến: Bị giới hạn trong bộ khung utility có sẵn
4. Không nên dùng bootstrap khi:- Website Creative / Brand Identity cao: Các trang web sáng tạo, agency, portfolio nghệ thuật, hoặc landing page có thiết kế cực kỳ phá cách, nhiều animation độc lạ. Dùng Bootstrap lúc này giống như cố nhét một khối hình tròn vào một cái lỗ hình vuông.

-Tối ưu dung lượng (Performance tối đa): Bootstrap đi kèm một file CSS khá nặng chứa hàng ngàn class mà bạn có thể chỉ dùng tới 10% trong số đó. Nếu làm dự án siêu nhẹ cho thiết bị mạng yếu, nó sẽ gây lãng phí tài nguyên