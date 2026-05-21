 ## PHẦN A — KIỂM TRA ĐỌC HIỂU 

### Câu A1 — HTTP & Browser
**Nguồn tham chiếu:** `01_introduction_html_universe.md` - Mục `1.1. Kiến trúc Client-Server` và `1.3. Browser Rendering`.
1. Khi nhập https://shopee.vn và nhấn Enter, trình duyệt sẽ đi qua một chuỗi bước theo thứ tự như sau:
-DNS Lookup (Phân giải tên miền)
-Thiết lập kết nối TCP
-Thiết lập HTTPS (TLS Handshake)
-Gửi HTTP Request
-Server xử lý và trả về HTTP Response
-Trình duyệt parse và render
-Tải tài nguyên phụ
2. Tab Network hiển thị:
-Danh sách tất cả request (HTML, CSS, JS, ảnh…)
-Status Code (200, 404…)
-Thời gian tải từng request
-Tổng thời gian load trang
-Kích thước file
-Loại tài nguyên (CSS, JS, Img…)

### Câu A2 — Semantic HTML
**Nguồn tham chiếu**: File Chương 04_visible_part_html.md - Mục:Semantic HTML5 và phần Bản đồ Semantic Elements.
Trang web trên bị Google đánh giá SEO thấp vì không sử dụng các thẻ HTML mang tính semantic (ngữ nghĩa), khiến công cụ tìm kiếm khó hiểu được cấu trúc và nội dung của trang. Cụ thể, có các lỗi sau:
-Sử dụng thẻ <div> thay cho <header> để định nghĩa phần đầu trang, làm giảm khả năng nhận diện bố cục.
-Menu điều hướng không dùng thẻ <nav> mà dùng <div>, khiến Google không xác định được khu vực điều hướng.
-Không sử dụng các thẻ tiêu đề như <h1>, <h2> cho tên sản phẩm, làm mất đi thông tin quan trọng về nội dung chính.
-Không dùng thẻ <main> để bao bọc nội dung chính của trang.
-Hình ảnh không có thuộc tính alt, làm giảm khả năng SEO hình ảnh.
-Không sử dụng thẻ <footer> cho phần cuối trang.
**Đoạn code sửa lại:
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </figure>
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>

### Câu A3 — Block vs Inline
**Nguồn tham chiếu**: File Chương 04_visible_part_html.md - Mục:Block vs Inline — Hai loại element cơ bản
1. Mô tả kết quả hiển thị (text art):

```text
+--------------------------------------------------+
| Hộp 1                                            |
+--------------------------------------------------+
Text A Text B
+--------------------------------------------------+
| Hộp 2                                            |
+--------------------------------------------------+
Text C **Text D**
+--------------------------------------------------+
| Hộp 3                                            |
+--------------------------------------------------+
```

2. Giải thích:

Thẻ <div> là phần tử dạng block nên luôn chiếm toàn bộ chiều ngang và tự động xuống dòng trước và sau nó, vì vậy mỗi “Hộp” sẽ hiển thị trên một dòng riêng. Trong khi đó, các thẻ <span> và <strong> là phần tử inline nên không xuống dòng, chỉ hiển thị liên tiếp trên cùng một dòng. Do đó, “Text A” và “Text B” nằm trên cùng một dòng, tương tự “Text C” và “Text D” cũng nằm cùng dòng; thẻ <strong> chỉ làm chữ đậm mà không làm thay đổi cách xuống dòng.

### Câu A4 — Table

**Nguồn tham chiếu**: File 05_tables_hyperlinks.md - Mục:TABLE-Bảng dữ liệu
-Sự khác nhau giữa <thead>, <tbody>, <tfoot>:
Trong bảng HTML, các thẻ <thead>, <tbody>, <tfoot> được dùng để phân chia bảng thành các phần có ý nghĩa rõ ràng:

<thead>: chứa phần tiêu đề của bảng (thường là các dòng tiêu đề cột), giúp xác định nội dung của từng cột.
<tbody>: chứa phần dữ liệu chính của bảng, tức là các dòng nội dung.
<tfoot>: chứa phần chân bảng, thường dùng để hiển thị tổng kết, ghi chú hoặc thông tin bổ sung.

Việc sử dụng các thẻ này giúp trình duyệt và công cụ tìm kiếm hiểu rõ cấu trúc bảng, đồng thời hỗ trợ tốt hơn cho việc hiển thị và truy cập dữ liệu.
-KHÔNG NÊN dùng table để tạo layout trang web vì:
    +Sai ngữ nghĩa (semantic): Table được thiết kế để hiển thị dữ liệu dạng bảng, không phải để bố trí giao diện. Dùng sai mục đích sẽ làm giảm chất lượng SEO và khả năng hiểu nội dung của công cụ tìm kiếm.
    +Khó bảo trì và mở rộng: Layout bằng table thường lồng nhiều bảng bên trong nhau, làm code phức tạp, khó đọc và khó chỉnh sửa khi cần thay đổi giao diện.
    +Hiệu năng kém: Trình duyệt phải tải và render toàn bộ bảng rồi mới hiển thị, khiến trang tải chậm hơn so với layout bằng CSS (Flexbox, Grid).
    +Không linh hoạt (responsive kém): Table khó thích nghi với các kích thước màn hình khác nhau (điện thoại, tablet), trong khi các kỹ thuật CSS hiện đại hỗ trợ responsive tốt hơn.

## PHẦN C — SUY LUẬN 
### Câu C1 — Thiết kế cấu trúc

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Trang Chi Tiết Sản Phẩm</title>
</head>
<body>

    <!-- Header: Chứa các thành phần định danh và điều hướng chính của website -->
    <header>
        <div class="logo">Logo</div>
        
        <!-- nav: Sử dụng cho các khối điều hướng chính của trang -->
        <nav aria-label="Main Navigation">
            <ul>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/products">Sản phẩm</a></li>
            </ul>
        </nav>
    </header>

    <!-- main: Xác định nội dung chính, duy nhất của trang web này -->
    <main>
        
        <!-- nav aria-label="breadcrumb": Chỉ định đây là thanh điều hướng phân cấp -->
        <nav aria-label="breadcrumb">
            <!-- ol: Dùng danh sách có thứ tự vì breadcrumb thể hiện cấp độ từ lớn đến nhỏ -->
            <ol>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/mobile">Điện thoại</a></li>
                <li aria-current="page">iPhone 16</li> <!-- aria-current: Đánh dấu trang hiện tại -->
            </ol>
        </nav>

        <!-- article: Dùng cho một thực thể nội dung độc lập (ở đây là một sản phẩm cụ thể) -->
        <article class="product-container">
            
            <div class="product-top-section">
                <!-- section: Nhóm các thành phần liên quan đến hình ảnh sản phẩm -->
                <section class="product-gallery">
                    <!-- figure: Chứa ảnh minh họa có thể đi kèm với chú thích -->
                    <figure class="main-image">
                        <img src="large-image.jpg" alt="iPhone 16 màu hồng">
                    </figure>
                    <!-- ul: Chứa danh sách các ảnh nhỏ (thumbnail) -->
                    <ul class="thumbnail-list">
                        <li><img src="thumb1.jpg" alt="Góc nghiêng"></li>
                        <li><img src="thumb2.jpg" alt="Cạnh dưới"></li>
                        <li><img src="thumb3.jpg" alt="Mặt sau"></li>
                        <li><img src="thumb4.jpg" alt="Màn hình"></li>
                        <li><img src="thumb5.jpg" alt="Hộp đựng"></li>
                    </ul>
                </section>

                <!-- section: Nhóm các thông tin chi tiết để mua hàng -->
                <section class="product-summary">
                    <!-- h1: Tên sản phẩm là tiêu đề quan trọng nhất của trang -->
                    <h1>iPhone 16 Pro Max 256GB</h1>

                    <div class="rating">
                        <!-- span: Dùng để bọc các biểu tượng sao và số lượng đánh giá -->
                        <span class="stars">★★★★★</span>
                        <span>(120 đánh giá)</span>
                    </div>

                    <!-- p hoặc div với class giá: Giúp nổi bật thông tin tài chính -->
                    <p class="price">29.990.000đ</p>

                    <div class="description-short">
                        <!-- h2: Tiêu đề phụ cho phần mô tả ngắn -->
                        <h2>Mô tả sản phẩm</h2>
                        <p>Chip A18 mạnh mẽ, hệ thống camera đột phá...</p>
                    </div>
                </section>
            </div>

            <!-- section: Dùng cho bảng thông số kỹ thuật chi tiết -->
            <section class="product-specs">
                <h2>Thông số kỹ thuật</h2>
                <!-- table: Cấu trúc tốt nhất để hiển thị dữ liệu dạng cặp Khóa - Giá trị -->
                <table>
                    <tr>
                        <th>Màn hình</th> <!-- th: Tiêu đề cột/hàng -->
                        <td>6.1 inch, Super Retina XDR</td> <!-- td: Dữ liệu ô -->
                    </tr>
                    <tr>
                        <th>Chipset</th>
                        <td>Apple A18</td>
                    </tr>
                </table>
            </section>

            <!-- section: Khu vực tương tác của người dùng -->
            <section class="product-reviews">
                <h2>Đánh giá từ khách hàng</h2>
                <!-- article: Mỗi bình luận là một nội dung độc lập, có thể tách rời -->
                <article class="review-item">
                    <header>
                        <strong>Nguyễn Văn A</strong>
                        <time datetime="2026-04-30">30/04/2026</time> <!-- time: Giúp máy học hiểu đúng định dạng thời gian -->
                    </header>
                    <p>Sản phẩm rất tuyệt vời, giao hàng nhanh.</p>
                </article>
            </section>

        </article>

        <!-- aside: Chứa nội dung liên quan gián tiếp đến nội dung chính (Sidebar) -->
        <aside class="related-products">
            <h2>Sản phẩm tương tự</h2>
            <ul>
                <li>
                    <a href="/iphone-15">
                        <img src="ip15.jpg" alt="iPhone 15">
                        <span>iPhone 15</span>
                    </a>
                </li>
            </ul>
        </aside>

    </main>

    <!-- footer: Chứa thông tin cuối trang như bản quyền, liên hệ -->
    <footer>
        <p>&copy; 2026 Thương mại điện tử. All rights reserved.</p>
    </footer>

</body>
</html>
```
### Câu C2 — So sánh & Tranh luận
Việc dùng <div> cho mọi thứ giống như việc bạn viết một cuốn sách mà không chia chương, không mục lục; người ta vẫn đọc được, nhưng trải nghiệm sẽ cực kỳ tệ. Dưới đây là vài lý do tại sao tư duy "chỉ cần class" thực tế lại đang tạo ra nợ kỹ thuật:

Về mặt kỹ thuật, Semantic HTML không phải là lý thuyết suông:

SEO (Tối ưu công cụ tìm kiếm): Google không chỉ đọc chữ, nó đọc "ý nghĩa". Các thẻ như <article>, <header> hay <aside> đóng vai trò như các biển chỉ dẫn. Nếu bạn dùng toàn <div>, con bot của Google sẽ phải "đoán" xem đâu là nội dung chính, dẫn đến việc đánh giá thấp giá trị trang web và ảnh hưởng trực tiếp đến thứ hạng tìm kiếm.

Accessibility (Khả năng tiếp cận): Đây là điểm yếu chí mạng của <div>. Những người dùng khiếm thị sử dụng trình đọc màn hình (Screen Reader) dựa vào các thẻ ngữ nghĩa để "nhảy" nhanh đến các khu vực như <nav> hoặc <main>. Nếu toàn bộ là <div>, họ sẽ bị lạc trong một mê cung không biển báo, và bạn sẽ phải tốn gấp đôi thời gian để thêm các thuộc tính aria-label thủ công chỉ để sửa sai.

Ví dụ thực tế nhất là cuộc chiến giữa <button> và <div onclick="...">:
Nếu bạn dùng <button>, trình duyệt mặc định hỗ trợ nhấn phím Enter/Space và tự động có trạng thái focus khi dùng phím Tab. Nếu dùng <div>, bạn buộc phải viết thêm JavaScript để bắt sự kiện bàn phím và thêm CSS để giả lập trạng thái focus. Tại sao phải tốn công "tái phát minh bánh xe" trong khi một thẻ HTML đơn giản đã giải quyết xong?

Tuy nhiên, <div> không phải là "tội đồ":
Thẻ <div> vẫn cực kỳ phù hợp khi bạn cần một Container trung tính chỉ để phục vụ mục đích trình bày (layout). Ví dụ: Khi bạn cần một lớp bọc để dùng display: flex căn giữa nội dung, hoặc tạo các khoảng trắng (spacing) mà lớp bọc đó không mang ý nghĩa về mặt nội dung hay thông tin.

## Phần B: Thực hành
### Câu B3:
Lỗi 1: Dòng 1 — Thiếu định nghĩa loại tài liệu.
Mô tả: <!DOCTYPE> đang để trống, trình duyệt sẽ không biết đây là chuẩn HTML nào.
Cách sửa: Sửa thành <!DOCTYPE html>.
Lỗi 2: Dòng 2 — Thiếu thẻ đóng tiêu đề trang.
Mô tả: Thẻ <title> mở ra nhưng không có thẻ </title> để kết thúc.
Cách sửa: Thêm </title> sau chữ "Trang web".
Lỗi 3: Dòng 3 — Sai giá trị bộ mã hiển thị ngôn ngữ.
Mô tả: utf8 không phải là định dạng chuẩn (thiếu dấu gạch ngang).
Cách sửa: Sửa thành charset="UTF-8".
Lỗi 4: Dòng 4 — Sai thẻ đóng tiêu đề nội dung.
Mô tả: Dòng <h1>Welcome to ShopTLU<h1> đang dùng hai thẻ mở.
Cách sửa: Sửa thẻ phía sau thành thẻ đóng </h1>.
Lỗi 5: Dòng 8 — Sai cú pháp thẻ đóng liên kết.
Mô tả: Thẻ <a> đóng lại bằng <a> là sai quy tắc.
Cách sửa: Sửa thành </a>.
Lỗi 6: Dòng 15 — Thẻ hình ảnh thiếu thuộc tính quan trọng.
Mô tả: Thẻ <img> thiếu thuộc tính alt (mô tả ảnh) và giá trị src không nằm trong dấu nháy.
Cách sửa: Sửa thành <img src="iphone.jpg" alt="iPhone 16 Pro">.
Lỗi 7: Dòng 17 — Lỗi lồng thẻ (Nested tags).
Mô tả: Thẻ <b> mở sau thẻ <p> nên phải được đóng trước thẻ </p>. Hiện tại đang đóng ngược </p></b>.
Cách sửa: Sửa thành <p>Giá: <b>25.990.000đ</b></p>.
Lỗi 8: Dòng 20-30 — Bảng dữ liệu thiếu cấu trúc chuẩn.
Mô tả: Các tiêu đề "Tên", "Giá" đang dùng thẻ <td> (dữ liệu thường).
Cách sửa: Đổi các thẻ tiêu đề đó sang thẻ <th> (Table Header).
Lỗi 9: Dòng 33 — Vi phạm quy tắc thẻ <main>.
Mô tả: Thẻ <main> đại diện cho nội dung chính và chỉ được xuất hiện 1 lần duy nhất trên một trang web.
Cách sửa: Đổi thẻ <main> thứ hai thành thẻ <aside> (nội dung phụ).
Lỗi 10: Dòng 38 — Thiếu thẻ đóng đoạn văn.
Mô tả: Thẻ <p> trong footer không có thẻ đóng </p>.
Cách sửa: Thêm </p> sau chữ "2026".
Lỗi 11: Toàn bộ bố cục — Sai thứ tự thẻ ngữ nghĩa.
Mô tả: Khối <header> (chứa thanh điều hướng) phải nằm trên cùng của <body>, không nên nằm dưới <h1>.
Cách sửa: Di chuyển toàn bộ đoạn <header>...</header> lên trên thẻ <h1>.

### Câu B4:Chọn trang web thegioididong.com
1. 
-3 thẻ semantic HTML5 mà trang đó sử dụng:
<header>: Nằm ở ngay đầu thẻ <body>, chứa logo và thanh tìm kiếm.

<nav>: Nằm bên trong header hoặc thanh danh mục sản phẩm (điện thoại, laptop...), dùng để chứa các liên kết điều hướng.

<footer>: Nằm ở dưới cùng trang web, chứa các thông tin về chính sách, tổng đài hỗ trợ và bản quyền.
-2 thẻ KHÔNG dùng đúng semantic (Lỗi thường gặp):
Thẻ <i> hoặc <span>: Thường được dùng để hiển thị các icon (như icon giỏ hàng, icon kính lúp) thay vì dùng các thẻ mang tính đồ họa hoặc SVG có thuộc tính mô tả.

Lạm dụng thẻ <div>: Các banner quảng cáo nhỏ hoặc các khung sản phẩm thường được bao bởi rất nhiều lớp <div> lồng nhau thay vì dùng thẻ <article> để đánh dấu đây là một nội dung sản phẩm độc lập.
2. Phân tích table(Bảng thông số kỹ thuật)
Bảng hiển thị chi tiết các thông số kỹ thuật của điện thoại Vivo V50 Lite 5G như: Màn hình, Hệ điều hành, Camera, Chip (CPU), RAM, và Pin.

Có dùng <thead>, <tbody> không?

<tbody>: Có sử dụng để nhóm các dòng dữ liệu thông số lại với nhau.

<thead>: Không sử dụng. Trang web dùng trực tiếp các thẻ <td> bôi đậm để làm tiêu đề cho từng hàng thay vì phân chia khối header riêng.
3. Phân tích Form
Thông tin Form:
Action: /tim-kiem (Dữ liệu sẽ được gửi về đường dẫn này).
Method: GET (Vì đây là ô tìm kiếm và không có thuộc tính method="post" trong code, nên mặc định trình duyệt sử dụng GET).
Input types được sử dụng:
type="text": Sử dụng cho ô nhập liệu từ khóa (thẻ <input id="skw">).
type="submit": Sử dụng cho nút gửi form (thẻ <button type="submit">).