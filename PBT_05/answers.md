# PHẦN A-KIỂM TRA ĐỌC HIỂU
## CÂU A1-VIEWPORT & MOBILE-FIRST
1. Thẻ <meta viewport> chuẩn và giải thích thuộc tính
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Giải thích thuộc tính: 
-name="viewport": Khai báo cho trình duyệt biết thẻ này dùng để cấu hình vùng hiển thị (viewport) của trang web trên các thiết bị.
-content="...": Chứa các tham số cấu hình cụ thể:
+width=device-width: Buộc chiều rộng của trang web phải tự động điều chỉnh sao cho bằng chính xác với chiều rộng màn hình của thiết bị thực tế (tính bằng pixels độc lập thiết bị - CSS pixels).

+initial-scale=1.0: Đặt mức độ phóng to/thu nhỏ (zoom) ban đầu là 1.0 (tương đương 100%) ngay khi trang web vừa được tải xong, ngăn trình duyệt tự ý thu nhỏ nội dung.
2. Cách hiển thị của iPhone nếu THIẾU thẻ <meta viewport>
Nếu không có thẻ này, các trình duyệt di động (như Safari trên iPhone) sẽ giả định rằng trang web này chỉ được thiết kế cho máy tính để bàn (Desktop).

Cơ chế: iPhone sẽ tự động đưa trang web vào một viewport ảo có chiều rộng mặc định là 980px (hoặc một số máy Android là 1024px).

Hiện tượng hiển thị: Trình duyệt sau đó sẽ "zoom out" (thu nhỏ tỉ lệ toàn bộ trang web) để nhét vừa khít khung hình 980px đó vào màn hình vật lý nhỏ bé của điện thoại.

Hệ quả: Nội dung trang web hiển thị như một bức ảnh thu nhỏ li ti; chữ biến thành các đường kẻ mờ, hình ảnh rất nhỏ và người dùng bắt buộc phải dùng hai ngón tay để phóng to (pinch-to-zoom) và cuộn ngang liên tục mới đọc được thông tin.
3. Phân biệt Mobile-first và Desktop-first
Tiêu chí	
    Mobile-First (Ưu tiên Di động)
	Desktop-First (Ưu tiên Máy tính)
Bản chất	
    Mobile:Thiết kế và viết CSS cho màn hình nhỏ nhất trước, sau đó dùng Media Queries để mở rộng cho màn hình lớn.	
    Desktop:Thiết kế và viết CSS cho màn hình lớn nhất trước, sau đó dùng Media Queries để thu hẹp cho màn hình nhỏ.
Từ khóa chính	
    Mobile: Thường sử dụng min-width (áp dụng từ kích thước này trở lên).	
    Desktop: Thường sử dụng max-width (áp dụng từ kích thước này trở xuống).

VD CSS 
*Cách viết Mobile-first:
.sidebar {
  width: 100%;
}
@media (min-width: 768px) {
  .sidebar {
    width: 30%;
    float: left;
  }
}
*Cách viết Desktop-first:
.sidebar {
      width: 30%;
      float: left;
    }
@media (max-width: 767px) {
      .sidebar {
        width: 100%;
        float: none;
      }
    }
    ```
=>Mobile-First được khuyên dùng vì nó tối ưu hóa hiệu năng, tập trung vào nội dung cốt lõi và xu hướng người dùng.

## CÂU A2-BREAKPOINTS
Hệ Breakpoint   |Kích thước Pixel|Thiết bị đại diện     
+---------------------------------------------------------+
Extra small(xs) |<576px          |Điện thoại di động
+---------------------------------------------------------+
Small(sm)       |>=576px         |Điện thoại di động cỡ lớn
+---------------------------------------------------------+
Medium(md)      |>=768px         |Máy tính bảng
+---------------------------------------------------------+
Large(lg)       |>=992px         |Máy tính xách tay, màn PC nhỏ
+---------------------------------------------------------+
Extra Large(xl) |>=1200px        |Màn hình máy tính để bàn
+---------------------------------------------------------+
Extra extra large|>=1400px       |Màn hình độ phân giải siêu cao
+---------------------------------------------------------+

## CÂU A3- MEDIA QUERIES
375PX-100%
600PX-540px
800px-720px
1000px-960px
1400px-1140px

## CÂU A4-SCSS BASICS
1. 4 TÍNH NĂNG CHÍNH CỦA SCSS
Variables: Cho phép lưu trữ một giá trị (như màu sắc, font chữ, kích thước, khoảng cách) vào một cái tên bắt đầu bằng ký tự $. Khi muốn thay đổi giao diện, bạn chỉ cần sửa giá trị tại nơi khai báo biến, toàn bộ website sẽ tự động cập nhật theo.
VD: 
    // Khai báo biến
$primary-color: #ff5a5f;
$font-base: 16px;

// Sử dụng biến
.button {
  background-color: $primary-color;
  font-size: $font-base;
}
Nesting: Cho phép viết các bộ chọn (selectors) lồng vào nhau tuân theo cấu trúc phân cấp trực quan của các thẻ HTML. Tính năng này giúp code gọn gàng hơn, tránh lặp lại tên thẻ cha nhiều lần và dễ quản lý
VD: 
    // Cách viết lồng nhau trong SCSS
.navbar {
  background: #fff;

  .nav-item {
    display: inline-block;

    a {
      color: #333;
      text-decoration: none;
    }
  }
}
Mixins: Định nghĩa một nhóm các thuộc tính CSS được sử dụng lặp đi lặp lại nhiều lần trong dự án bằng từ khóa @mixin. Bạn có thể truyền các tham số (biến số) vào mixin giống như hàm trong lập trình để tùy biến giá trị, sau đó gọi ra bằng @include.
VD:
    @mixin flex-center($direction: row) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: $direction;
    }
    .product-list {
      @include flex-center(row);
    }
Inheritance: Cho phép một selector chia sẻ hoặc "kế thừa" lại toàn bộ các thuộc tính CSS đã được định nghĩa ở một selector khác. Tính năng này giúp giảm thiểu việc lặp code và liên kết các thành phần có chung kiểu dáng cơ bản.
VD:
    %button-base {
      padding: 10px 20px;
      border-radius: 4px;
      border: none;
    }

    // Kế thừa lại khối trên
    .btn-success {
      @extend %button-base;
      background-color: green;
    }

    .btn-danger {
      @extend %button-base;
      background-color: red;
    }

2. Lý do: Các trình duyệt web (như Chrome, Safari, Edge, Firefox) được lập trình để chỉ hiểu và thông dịch các tệp chuẩn của Web Core bao gồm: **HTML, CSS thuần túy và JavaScript**. 
*   SCSS là một **Sass Pre-processor (Tiền xử lý CSS)** sở hữu cú pháp mở rộng (biến, hàm, lồng nhau) mà các engine của trình duyệt không được thiết kế để nhận diện. Nếu bạn nhúng trực tiếp file `.scss` vào thẻ `<link>`, trình duyệt sẽ báo lỗi cú pháp hoặc bỏ qua không xử lý.

3. Để chuyển scss->css phải thực hiện một bước gọi là **Biên dịch (Compile)** mã SCSS thành file CSS chuẩn.
**Cách thực hiện phổ biến:**
C1: Dùng extension của code editor
C2: Dùng dòng lệnh CLI
C3: Dùng các công cụ xây dựng tự động(Build tools)

# PHẦN C-
## CÂU C1:
1. Kích thước Mobile (375px)
Navigation: Header tối giản hóa hoàn toàn thành 1 thanh tìm kiếm duy nhất. Xuất hiện Thanh điều hướng dưới đáy màn hình (Bottom Nav) chứa các icon như một ứng dụng (App) di động.

Lưới Content: Lưới sản phẩm thu hẹp tối đa, chỉ còn hiển thị 2 cột cạnh nhau (hoặc 1 cột xếp dọc). Padding và margin giữa các khung được siết rất chặt.

Thành phần bị ẩn: Ẩn hoàn toàn các banner quảng cáo to bét bè, ẩn các đoạn text mô tả dài hoặc thông tin phụ không quan trọng.

Font size: Cỡ chữ tiêu đề giảm mạnh (xuống còn 16px - 18px), chữ tên sản phẩm thu nhỏ xuống 12px - 13px để tránh bị vỡ dòng.

2. Kích thước Tablet (768px)
Navigation: Thanh tìm kiếm thu hẹp lại; các chữ mô tả ở Header (Tài khoản, Giỏ hàng) bị ẩn đi, chỉ giữ lại các icon để tiết kiệm không gian.

Lưới Content: Hệ thống tự động co giãn, rớt dòng, giảm từ 6 cột xuống còn 3 hoặc 4 cột trên một hàng.

Thành phần bị ẩn/thay đổi: Banner lớn đổi sang tỉ lệ nhỏ hơn; thanh bộ lọc bên trái bị ẩn hoàn toàn, biến thành một nút bấm "Bộ lọc" (bấm vào mới hiện).

3. Kích thước Desktop (1440px)
Navigation: Hiển thị đầy đủ thanh tìm kiếm lớn, logo, giỏ hàng (kèm chữ) và menu danh mục sản phẩm bung rộng khắp màn hình.

Lưới Content: Danh sách sản phẩm hiển thị rộng rãi, chia làm 6 cột trên một hàng.

Thành phần hiển thị: Đầy đủ banner quảng cáo lớn ở trung tâm và hai bên cánh; hiện bộ lọc sản phẩm (Sidebar) cố định ở cạnh trái.

Font size: Sử dụng cỡ chữ lớn tiêu chuẩn (24px - 28px cho tiêu đề lớn, 14px - 15px cho tên sản phẩm).

## CÂU C2:
-GIAO DIỆN MOBILE:
┌───────────────────────────────────────────┐
│              [ LOGO ]                     │
│       [ HOTLINE: 090xxxxxxx ]             │  <-- Header (Xếp dọc)
├───────────────────────────────────────────┤
│                                           │
│               HERO IMAGE                  │  <-- Thu ngắn chiều cao
│         "Chào mừng tới nhà hàng"          │
│                                           │
├───────────────────────────────────────────┤
│ [Ảnh 1]                                   │
│ [Ảnh 2]                                   │  <-- Lưới ảnh món ăn
│ [Ảnh 3]                                   │      (1 cột duy nhất)
│ [Ảnh 4]                                   │
│ [Ảnh 5]                                   │
│ [Ảnh 6]                                   │
├───────────────────────────────────────────┤
│  FORM ĐẶT BÀN (Chiếm 100% chiều ngang)    │
│  [ Chọn Ngày       ]                      │
│  [ Chọn Giờ        ]                      │  <-- Các ô nhập liệu
│  [ Số Người        ]                      │      xếp dọc nhau
│  [ Ghi Chú...      ]                      │
│  ┌──────────────────────┐                 │
│  │     ĐẶT BÀN NGAY     │                 │
│  └──────────────────────┘                 │
├───────────────────────────────────────────┤
│                                           │
│            GOOGLE MAPS NHÚNG              │  <-- Đẩy xuống dưới Form
│         (Tràn viền màn hình dọc)          │
│                                           │
├───────────────────────────────────────────┤
│           FOOTER © 2026                   │
└───────────────────────────────────────────┘
**Form đặt bàn**: Nằm ở vị trí trung tâm, chiếm 100% chiều ngang màn hình. Các ô nhập liệu (Input) xếp dọc dọc theo thứ tự điền: Ngày-> Giờ ->Số người->Ghi chú ->Nút Đặt bàn.
**Những gì bị ẩn trên Mobile**: Ẩn bớt các đoạn văn bản giới thiệu dài dòng, ẩn các hiệu ứng hover chuyển động phức tạp để tăng tốc độ tải trang.
-GIAO DIỆN TABLET
┌───────────────────────────────────────────────────────────────────────┐
│ [ LOGO ]                                      [ HOTLINE: 090xxxxxxx ] │ <-- Header dàn ngang
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                              HERO IMAGE                               │
│                       "Chào mừng tới nhà hàng"                        │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐ │
│ │     [Ảnh 1]       │   │     [Ảnh 2]       │   │     [Ảnh 3]       │ │ <-- Lưới ảnh món ăn
│ └───────────────────┘   └───────────────────┘   └───────────────────┘ │     (Biến thành 3 cột)
│ ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐ │
│ │     [Ảnh 4]       │   │     [Ảnh 5]       │   │     [Ảnh 6]       │ │
│ └───────────────────┘   └───────────────────┘   └───────────────────┘ │
├───────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────┐ ┌─────────────────────────────┐ │
│ │ FORM ĐẶT BÀN                      │ │                             │ │ <-- Chia làm 2 cột
│ │ [ Chọn Ngày ]   [ Chọn Giờ ]      │ │      GOOGLE MAPS NHÚNG      │ │     đứng song song
│ │ [ Số Người  ]                     │ │   (Chiều cao bằng với Form) │ │
│ │ [ Ghi Chú...                    ] │ │                             │ │
│ │ ┌───────────────────────────────┐ │ │                             │ │
│ │ │         ĐẶT BÀN NGAY          │ │ │                             │ │
│ │ └───────────────────────────────┘ │ │                             │ │
│ └───────────────────────────────────┘ └─────────────────────────────┘ │
├───────────────────────────────────────────────────────────────────────┤
│                             FOOTER © 2026                             │
└───────────────────────────────────────────────────────────────────────┘
**Grid ảnh món ăn:** Chuyển sang cấu trúc 3 cột - 2 hàng (3 ảnh trên một hàng ngang), giúp giao diện gọn gàng, đỡ kéo dài trang
**Bản đồ:**Cột phải: Bản đồ Google Maps nhúng có chiều cao bằng với Form đặt bàn.
3. Giao diện DESKTOP 

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 KHUNG CONTAINER GIỚI HẠN GIỮA MÀN HÌNH                            │
│ ┌───────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [ LOGO ]                                                              [ HOTLINE: 090xxxxxxx ] │ │
│ ├───────────────────────────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                                               │ │
│ │                                           HERO IMAGE                                          │ │
│ │                                                                                               │ │
│ ├───────────────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐                              │ │
│ │ │[Ảnh 1]│  │[Ảnh 2]│  │[Ảnh 3]│  │[Ảnh 4]│  │[Ảnh 5]│  │[Ảnh 6]│                              │ │ <-- Lưới 6 ảnh dàn hàng ngang
│ │ └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘                              │ │
│ ├───────────────────────────────────────────────────────────────────┬───────────────────────────┤ │
│ │ VÙNG CHÍNH (MAIN CONTENT - 70%)                                   │ THANH PHỤ (SIDEBAR - 30%) │ │ <-- Chia bố cục dạng Main + Sidebar
│ │                                                                   │                           │ │
│ │ ┌───────────────────────────────────────────────────────────────┐ │ ┌───────────────────────┐ │ │
│ │ │ FORM ĐẶT BÀN                                                  │ │ │ Giờ mở cửa:           │ │ │
│ │ │ [ Chọn Ngày ]       [ Chọn Giờ ]       [ Số Người ]           │ │ │ 08:00 AM - 10:00 PM   │ │ │
│ │ │ [ Ghi Chú...                                                ] │ │                         │ │ │
│ │ │ ┌───────────────────────────────────────────────────────────┐ │ │ Ưu đãi hôm nay:       │ │ │
│ │ │ │                       ĐẶT BÀN NGAY                        │ │ │ - Giảm 10% lẩu nướng  │ │ │
│ │ │ └───────────────────────────────────────────────────────────┘ │ │ - Tặng nước ngọt      │ │ │
│ │ └───────────────────────────────────────────────────────────────┘ │                         │ │ │
│ │                                                                   │ Đánh giá khách hàng:    │ │ │
│ │ ┌───────────────────────────────────────────────────────────────┐ │ ⭐⭐⭐⭐⭐ (5/5)         │ │ │
│ │ │                                                               │ │ "Món ăn ngon, phục vụ │ │ │
│ │ │                       GOOGLE MAPS NHÚNG                       │ │  rất nhanh!"            │ │ │
│ │ │                        (Khung nhìn lớn)                      │ │                         │ │ │
│ │ └───────────────────────────────────────────────────────────────┘ │ └───────────────────────┘ │ │
│ ├───────────────────────────────────────────────────────────────────┴───────────────────────────┤ │
│ │                                         FOOTER © 2026                                         │ │
│ └───────────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────
**Layout đa cột nâng cao:** Sử dụng hệ thống bao bọc (Container) giới hạn chiều ngang tối đa (khoảng 1200px) để nội dung không bị bè quá bè sang hai bên.
**(Sidebar - chiếm 30%)**: Xuất hiện thêm một thanh nội dung phụ chứa: Thông tin giờ mở cửa, Các chương trình khuyến mãi hiện có, Hotline hỗ trợ trực tiếp và các đánh giá (Reviews) của khách hàng.

**CSS**
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

header {
  padding: 15px;
  text-align: center;
}

.hero {
  height: 60vh;
  background: url('hero.jpg') center/cover no-repeat;
}

.food-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding: 15px;
}

.booking-form, .map-embed, .sidebar {
  width: 100%;
  padding: 15px;
}

.sidebar {
  display: none;
}

footer {
  padding: 20px;
  text-align: center;
}

@media (min-width: 768px) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
  }

  .food-grid {
    grid-template-columns: repeat(3, 1fr);
    padding: 20px 50px;
  }

  .booking-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding: 20px 50px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .food-grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .main-layout {
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 40px;
    padding: 20px 0;
  }

  .booking-section {
    grid-template-columns: 1fr; 
    gap: 20px;
    padding: 0;
  }

    .sidebar {
    display: block;
  }
}

## CÂU B3-
**Câu lệnh dịch compile**:sử dụng công cụ Sass CLI (Dart Sass) cài đặt qua npm để thực hiện biên dịch cấu trúc thư mục SCSS thành file CSS chạy thực tế trên trình duyệt:
### 1. Câu lệnh biên dịch một lần (Single Compile)
```bash
sass scss/style.scss css/style.css
```
### 2. Câu lệnh tự động lắng nghe và cập nhật liên tục (Watch Mode)
```bash
sass --watch scss/style.scss css/style.css
```









