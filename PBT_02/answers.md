PHẦN A: KIỂM TRA ĐỌC HIỂU
CÂU A1:
-10 input types phổ biến trong HTML5:
1. type="email" → Ô nhập văn bản, tự động kiểm tra định dạng email (phải có dấu @ và tên miền) → Use case: Dùng cho form đăng ký tài khoản hoặc đăng ký nhận tin bản tin khuyến mãi (newsletter).

2. type="password" → Các ký tự nhập vào sẽ hiển thị dưới dạng dấu chấm hoặc sao để bảo mật → Use case: Dùng trong form đăng nhập hoặc đổi mật khẩu cho khách hàng.

3. type="number" → Ô nhập chỉ chấp nhận số, có nút tăng/giảm ở cạnh; có thể giới hạn min và max → Use case: Dùng để khách hàng chọn số lượng sản phẩm muốn thêm vào giỏ hàng.

4. type="tel" → Ô nhập văn bản tối ưu cho bàn phím số trên điện thoại; không tự động validate nhưng hỗ trợ thuộc tính pattern → Use case: Dùng để nhập số điện thoại trong thông tin giao hàng (Shipping address).

5. type="date" → Hiển thị một bảng chọn lịch (calendar picker) để chọn ngày/tháng/năm → Use case: Dùng để khách hàng chọn ngày mong muốn nhận hàng hoặc nhập ngày sinh để nhận ưu đãi thành viên.

6. type="checkbox" → Ô vuông nhỏ cho phép tích chọn hoặc bỏ chọn; khách hàng có thể chọn nhiều ô cùng lúc → Use case: Dùng trong bộ lọc sản phẩm (Filter) để chọn nhiều danh mục như "Màu sắc", "Kích cỡ" hoặc "Thương hiệu".

7. type="radio" → Ô tròn nhỏ cho phép chọn duy nhất một lựa chọn trong một nhóm → Use case: Dùng để chọn phương thức thanh toán (ví dụ: chọn giữa "Thanh toán khi nhận hàng" hoặc "Chuyển khoản ngân hàng").

8. type="file" → Nút bấm cho phép người dùng mở thư mục máy tính để chọn và tải tập tin lên → Use case: Dùng trong phần đánh giá sản phẩm để khách hàng tải ảnh hoặc video thực tế của sản phẩm đã mua.

9. type="search" → Giao diện giống ô text nhưng thường có nút "x" để xóa nhanh nội dung; tối ưu hóa cho các công cụ tìm kiếm → Use case: Dùng làm thanh tìm kiếm sản phẩm trên đầu trang web.

10. type="range" → Thanh trượt (slider) cho phép chọn một giá trị trong khoảng định sẵn bằng cách kéo nút điều khiển → Use case: Dùng trong bộ lọc giá sản phẩm (ví dụ: kéo để chọn khoảng giá từ 1.000.000đ đến 5.000.000đ).
CÂU A2:
Dự đoán các trường hợp
Trường hợp 1: <input type="text" required value="">

Dự đoán: Trình duyệt sẽ chặn việc gửi form (submit) và hiển thị thông báo yêu cầu điền vào trường này (ví dụ: "Please fill out this field").

Lý do: Thuộc tính required bắt buộc trường phải có dữ liệu. Tuy nhiên, thuộc tính value đang bị rỗng, vi phạm điều kiện này.

Trường hợp 2: <input type="email" value="abc">

Dự đoán: Trình duyệt sẽ chặn submit và hiển thị thông báo lỗi về định dạng email (ví dụ: "Please enter an email address" hoặc "Please include an '@' in the email address").

Lý do: Giá trị "abc" không phải là một địa chỉ email hợp lệ vì thiếu ký tự @ và phần tên miền.

Trường hợp 3: <input type="number" min="1" max="10" value="15">

Dự đoán: Trình duyệt sẽ chặn submit và hiển thị thông báo lỗi vượt quá giới hạn (ví dụ: "Value must be less than or equal to 10").

Lý do: Giá trị 15 lớn hơn giá trị tối đa max="10" được định nghĩa.

Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123">

Dự đoán: Trình duyệt sẽ chặn submit và hiển thị thông báo lỗi theo định dạng (ví dụ: "Please match the requested format").

Lý do: Thuộc tính pattern yêu cầu chuỗi phải bao gồm đúng 10 ký tự số từ 0 đến 9. Giá trị "abc123" bao gồm cả các chữ cái (a, b, c) và không đủ 10 ký tự.

Trường hợp 5: <input type="password" minlength="8" value="123">

Dự đoán: Trình duyệt sẽ chặn submit và hiển thị thông báo lỗi về độ dài tối thiểu (ví dụ: "Please lengthen this text to 8 characters or more").

Lý do: Thuộc tính minlength quy định độ dài tối thiểu là 8 ký tự. Giá trị "123" chỉ có 3 ký tự.
So sánh dự đoán và thực tế
Khi mở file validation_test.html trên trình duyệt và bấm Submit:

Lần lượt các lỗi sẽ được kiểm tra từ trên xuống dưới, và kết quả thực tế từ trình duyệt sẽ khớp hoàn toàn với 5 dự đoán đã được nêu ở trên (trình duyệt sẽ hiển thị pop-up cảnh báo lỗi và ngăn việc gửi form cho đến khi bạn sửa lại đúng yêu cầu của từng trường).

CÂU A3:
Tại sao <label for="email"> quan trọng cho screen reader?

Kết nối dữ liệu: Thuộc tính for kết nối nhãn (label) với ID của ô nhập liệu (input). Khi người dùng khiếm thị dùng Screen Reader (trình đọc màn hình) di chuyển vào ô input, phần mềm sẽ đọc to nội dung trong nhãn đó lên. Nếu không có <label>, người dùng sẽ chỉ nghe thấy "Edit text" mà không biết ô đó yêu cầu nhập cái gì (tên, email hay mật khẩu).

Mở rộng vùng nhấn: Nó giúp người dùng có vấn đề về vận động dễ dàng nhấn vào nhãn để kích hoạt ô nhập liệu thay vì phải nhấn chính xác vào ô input nhỏ.

Khi nào dùng <fieldset> + <legend>? Cho ví dụ:

Khi nào dùng: Dùng để nhóm các phần tử có liên quan lại với nhau trong một form lớn và đặt tên cho nhóm đó. Điều này giúp cấu trúc form mạch lạc và giúp Screen Reader thông báo tên nhóm khi người dùng tương tác với các phần tử bên trong.

Ví dụ: Nhóm các lựa chọn phương thức thanh toán.

HTML
<fieldset>
    <legend>Phương thức thanh toán</legend>
    <input type="radio" id="cod" name="payment"> <label for="cod">COD</label><br>
    <input type="radio" id="card" name="payment"> <label for="card">Thẻ tín dụng</label>
</fieldset>
aria-label dùng khi nào? Tại sao KHÔNG nên dùng khi đã có <label>?

Khi nào dùng: Dùng khi giao diện không cho phép hiển thị nhãn bằng chữ (ví dụ: nút "X" để đóng cửa sổ hoặc nút Search chỉ có icon kính lúp).

Tại sao không dùng chung: Nếu đã có <label>, trình đọc màn hình sẽ ưu tiên đọc aria-label và bỏ qua nội dung trong <label>. Điều này gây lãng phí mã nguồn và đôi khi gây mâu thuẫn thông tin nếu nội dung của hai thẻ khác nhau.

CÂU A4:
Thuộc tính loading="lazy" trên thẻ <img>:

Giải thích: Đây là kỹ thuật "tải lười". Trình duyệt sẽ trì hoãn việc tải ảnh cho đến khi người dùng cuộn trang đến gần vị trí của ảnh đó.

Cải thiện: Giúp trang web tải nhanh hơn ở lần đầu, tiết kiệm băng thông và giảm tải cho thiết bị.

Khi nào KHÔNG nên dùng: Không dùng cho những ảnh nằm ở "màn hình đầu tiên" (Above the fold) như banner chính hoặc logo, vì nó sẽ khiến ảnh hiện lên chậm, làm xấu trải nghiệm người dùng.

Tại sao cung cấp nhiều <source> trong <video>? 3 format phổ biến:

Lý do: Mỗi trình duyệt hỗ trợ các loại giải mã (codec) khác nhau. Cung cấp nhiều nguồn giúp trình duyệt tự chọn định dạng tốt nhất mà nó có thể chạy được.

3 format phổ biến: .mp4 (phổ biến nhất), .webm (dung lượng nhẹ, mã nguồn mở), .ogg.

Thuộc tính alt dùng để làm gì? Viết alt tốt cho 3 trường hợp:

Công dụng: Hiển thị văn bản thay thế nếu ảnh bị lỗi không tải được và để Screen Reader đọc cho người khiếm thị hiểu nội dung ảnh.

Viết alt tốt:

-Ảnh iPhone 16: alt="Điện thoại iPhone 16 màu xanh Titan nhìn từ mặt lưng" (Mô tả chi tiết sản phẩm).

-Ảnh trang trí: alt="" (Để trống để Screen Reader bỏ qua, không đọc làm phiền người dùng).

-Biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột cho thấy doanh thu Quý 1 năm 2026 tăng trưởng 15% so với cùng kỳ năm trước" (Tóm tắt thông tin quan trọng nhất của biểu đồ).

CÂU A5:
1. Phân tích sự khác biệt
Cách 1 (<img> đứng độc lập):

Bản chất: Chỉ là một phần tử đồ họa đơn thuần.

Đặc điểm: Nó thường nằm lẫn trong dòng văn bản hoặc là một phần của giao diện (icon, logo, ảnh minh họa nhỏ). Nếu xóa nó đi, nội dung văn bản xung quanh vẫn phải giữ được ý nghĩa.

Cách 2 (<figure> + <figcaption>):

Bản chất: Là một đơn vị nội dung độc lập (self-contained).

Đặc điểm: Thẻ <figure> bao bọc lấy ảnh, và <figcaption> cung cấp một chú thích rõ ràng. Cấu trúc này báo hiệu cho trình duyệt và trình đọc màn hình rằng: "Đây là một khối tư liệu có chú thích đi kèm". Cậu có thể di chuyển khối này đi chỗ khác trong bài viết mà không làm hỏng mạch văn.
2. Khi nào dùng và Ví dụ thực tế
Cách 1 (<img>): Dùng cho các ảnh mang tính chất trang trí, biểu tượng hoặc ảnh không cần giải thích thêm bằng lời.
Ví dụ 1: Logo của cửa hàng trên thanh Header.
Ví dụ 2: Các icon phương thức thanh toán (Visa, MoMo) ở cuối trang.
Cách 2 (<figure>): Dùng khi ảnh là một nội dung quan trọng cần có chú thích, tên gọi hoặc giá cả đi kèm để người dùng hiểu rõ.
Ví dụ 1: Ảnh chi tiết sản phẩm kèm theo tên và giá (như mẫu của cậu).
Ví dụ 2: Biểu đồ so sánh thông số kỹ thuật giữa iPhone 15 và iPhone 16.

PHẦN C — PHÂN TÍCH & SUY LUẬN

Câu C1 — Debug Form
-Liệt kê lỗi và cách sửa:
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="..."> và thiếu thuộc tính id, vi phạm accessibility (người dùng Screen Reader sẽ không biết ô này dùng để làm gì).
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Ô Email dùng placeholder thay thế hoàn toàn cho label. Khi người dùng gõ chữ vào, placeholder biến mất khiến họ quên mất ô này là gì.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required>

Lỗi 3: Dòng 6 — Ô Mật khẩu thiếu thuộc tính minlength. Điều này cho phép user Submit mật khẩu quá ngắn, không an toàn.
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" minlength="8" required>

Lỗi 4: Dòng 7 — Hai ô nhập mật khẩu có cùng placeholder hoặc không có tên phân biệt (name), khiến việc xử lý dữ liệu ở backend gặp khó khăn.
Sửa: <label for="re-password">Nhập lại mật khẩu:</label> <input type="password" id="re-password" name="re_password" required>

Lỗi 5: Dòng 9 — Ô Phone dùng type="text". Điều này không tối ưu bàn phím số trên di động.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

Lỗi 6: Dòng 11 — Thẻ <select> thiếu id, name và nhãn mô tả.
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">...</select>

Lỗi 7: Dòng 16 — Thẻ <label> chứa nội dung "Tôi đồng ý..." nhưng không được kết nối với bất kỳ input type="checkbox" nào.
Sửa: <input type="checkbox" id="terms" name="terms" required> <label for="terms">Tôi đồng ý điều khoản</label>

Lỗi 8: Cấu trúc chung — Toàn bộ các thẻ input đang viết sát nhau trên một dòng. Khi hiển thị thực tế sẽ bị dính chùm, rất khó nhìn.
Sửa: Nên bao bọc mỗi cặp label/input vào một thẻ <div> hoặc dùng <br> để xuống dòng.

CÂU C2 — Thiết kế chiến lược Validation
1. Viết pattern regex cho CMND/CCCD và Số tài khoản
    CMND/CCCD (Đúng 12 chữ số):
pattern="[0-9]{12}" hoặc pattern="\d{12}"
Giải thích: Đảm bảo người dùng nhập đúng từ 0-9 và có độ dài chính xác là 12 ký tự.

    Số tài khoản (10-15 chữ số):
pattern="[0-9]{10,15}"
Giải thích: Giới hạn độ dài tối thiểu là 10 và tối đa là 15 chữ số.
2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
CHƯA ĐỦ.
Tại sao?
Dễ bị vô hiệu hóa: Bất kỳ ai cũng có thể vào trình duyệt, nhấn F12 (Inspect) và xóa thuộc tính required hoặc pattern trong mã nguồn. Khi đó, form sẽ gửi đi bất kỳ dữ liệu gì họ muốn.
Bypass (Vượt rào): Kẻ xấu có thể sử dụng các công cụ như Postman hoặc dòng lệnh (curl) để gửi dữ liệu trực tiếp đến server mà không cần thông qua trình duyệt, nghĩa là bỏ qua hoàn toàn các bước kiểm tra của HTML5.
3. Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
-So sánh giữa hai ô (Comparison): Ví dụ kiểm tra xem ô "Nhập lại mật khẩu" có trùng khớp với ô "Mật khẩu" hay không.

-Kiểm tra tính duy nhất (Asynchronous/Unique check): Ví dụ kiểm tra xem Email này đã có người đăng ký trong hệ thống chưa (cần gọi API để hỏi server).

-Logic điều kiện (Conditional logic): Ví dụ: Nếu người dùng chọn "Quốc tịch khác" thì mới yêu cầu hiện ra và bắt buộc nhập ô "Số hộ chiếu".
4. Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend
-Tấn công SQL Injection / Cross-Site Scripting (XSS): Kẻ tấn công có thể gửi các đoạn mã độc vào ô nhập liệu (vì Frontend đã bị chúng vô hiệu hóa validation). Nếu Backend không kiểm tra lại, mã độc này sẽ chui vào database hoặc thực thi trên trình duyệt của người dùng khác, dẫn đến mất dữ liệu hoặc chiếm quyền điều khiển.

-Sai lệch dữ liệu hệ thống (Data Integrity): Những con số không hợp lệ (ví dụ số tiền âm, số tài khoản chứa chữ cái) có thể gây treo hệ thống xử lý giao dịch hoặc tạo ra các lệnh chuyển tiền lỗi, gây thiệt hại tài chính nghiêm trọng cho ngân hàng.

Link video thực hành: https://drive.google.com/file/d/19O-MkITjOFZR1k5SqGRvAp3Mo1JKJL94/view?usp=sharing


