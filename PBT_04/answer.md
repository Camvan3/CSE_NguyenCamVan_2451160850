# PHẦN A-KIỂM TRA ĐỌC HIỂU
## CÂU A1-5 LOẠI POSITIONING
Position    |Vẫn chiếm chỗ trong flow   |Tham chiếu vị trí  |Cuộn theo trang    |UC             
static      |có                         |mặc định theo luồng|có                 |Vị trí mặc định của mọi phần tử, không cần dịch chuyển.
            |                           |văn bản            |                   |
relative    |có                         |Chính vị trí ban   |có                 |Dịch chuyển nhẹ phần tử mà không làm xáo trộn bố cục xung        quanh;                                  |                   |                   | hoặc làm gốc tọa độ cho phần tử con dùng absolute
            |                           |đầu của nó         |                   |
absolute    |không                      |Nearest positioned |có                 |Làm menu dropdown, tooltip, các icon thông báo nhỏ nằm góc trên 
                                        |ancestor (Tổ tiên  |                   |ảnh, hoặc các layout đè lên nhau
                                        |gần nhất có position|                  |
                                        |khác static)       |                   |
fixed       |không                      |Viewport (Khung hình|không             |Viewport (Khung hình hiển thị của trình duyệt)nút "Back to top",
                                        |hiển thị của trình |                   |hoặc các khung chat, popup quảng cáo góc màn hình.
                                        |duyệt)             |                   |
sticky      |có                         |Khung chứa nó      |có                 |                   
                                        |(parent) và Viewport|                  |Làm tiêu đề cột của bảng (table header), thanh danh mục bên, sườn
                                        |                   |                   |muốn giữ lại cho người dùng dễ nhìn khi cuộn trang dài.

1. Khi nào absolute tham chiếu đến body? Khi nào tham chiếu đến parent?
-Tham chiếu đến body: Khi tất cả các thẻ bao bọc bên ngoài nó (từ bố, mẹ, ông, bà...) đều không cài đặt thuộc tính position nào cả (hoặc chỉ ở mặc định static). Lúc này, nó không tìm được điểm tựa nào nên sẽ bám vào thẻ <body> (hoặc chính xác hơn là <html> - viewport ban đầu) để tính tọa độ top, left.

-Tham chiếu đến parent (hoặc ancestor): Khi thẻ cha (hoặc một thẻ tổ tiên nào đó bao ngoài) được cài đặt thuộc tính position là một trong các giá trị: relative, absolute, fixed, hoặc sticky.
2. Giải thích khái niệm "nearest positioned ancestor"
Cụm từ này dịch sát nghĩa là "Tổ tiên gần nhất có định vị".

Tổ tiên (Ancestor): Là các thẻ bao bọc bên ngoài nó (thẻ cha, thẻ ông, thẻ bà...).

Có định vị (Positioned): Là bất kỳ phần tử nào có thuộc tính position khác với static (tức là dùng relative, absolute, fixed, hoặc sticky).

Gần nhất (Nearest): Nếu có nhiều thẻ tổ tiên cùng có định vị, phần tử absolute sẽ chọn thẻ nào gần nó nhất về mặt cấp bậc HTML để làm gốc tọa độ (0,0).
## CÂU A2:
TH1:
Dự đoán: Cả 4 items sẽ nằm trên 1 hàng duy nhất. Vì có thuộc tính flex: 1 (viết tắt của flex-grow: 1), cả 4 items sẽ tự động chia đều không gian trống và có độ rộng bằng nhau 100% (mỗi item chiếm đúng 25% chiều rộng container).

Sơ đồ bố cục:
+-------------------------------------------------------+
| [ Item 1 ] | [ Item 2 ] | [ Item 3 ] | [ Item 4 ]     |
+-------------------------------------------------------+
TH2:
Dự đoán: Bố cục gồm 3 hàng, mỗi hàng 2 cột.
Mỗi item chiếm 45% (width) + 2.5%*2 (margin trái/phải) = 50% tổng chiều rộng. Vì vậy, một hàng chỉ chứa vừa khít 2 items.
Do có flex-wrap: wrap, các item thứ 3, 5 sẽ tự động nhảy xuống hàng mới.

Sơ đồ bố cục:
+-------------------------------------------------------+
|  +----------+              +----------+               |
|  |  Item 1  |              |  Item 2  |               |
|  +----------+              +----------+               |
|  +----------+              +----------+               |
|  |  Item 3  |              |  Item 4  |               |
|  +----------+              +----------+               |
|  +----------+              +----------+               |
|  |  Item 5  |              |  Item 6  |               |
|  +----------+              +----------+               |
+-------------------------------------------------------+
TH3:
Dự đoán: Cả 3 items nằm trên 1 hàng.
justify-content: space-between đẩy Item 1 sát lề trái, Item 3 sát lề phải, Item 2 nằm chính giữa. Khoảng trống giữa các item là bằng nhau.
align-items: center giúp các item (dù cao thấp khác nhau) đều được căn giữa theo chiều dọc của container.

Sơ đồ bố cục:
+-------------------------------------------------------+
| +--------+              +--------+              +----+|
| | Item 1 |              | Item 2 |              |Item |
| +--------+              +--------+              +----+|
+-------------------------------------------------------+
TH4:
Dự đoán: Bố cục 1 hàng, 3 cột (đây là layout dạng Holy Grail kinh điển).
Cột 1 và Cột 3 cố định độ rộng 200px (thường làm Sidebar).
Cột 2 ở giữa dùng 1fr sẽ tự động co giãn để húp trọn toàn bộ phần không gian còn lại ở giữa (thường làm Main Content).
Giữa các cột có một khoảng cách (gap) rộng 20px.

Sơ đồ bố cục:
+-------------------------------------------------------+
| <-200px->  <20px>    <----- 1fr ----->   <20px> <-200px-> |
| +--------+          +------------------+        +--------+|
| | Item 1 |          |      Item 2      |        | Item 3 ||
| +--------+          +------------------+        +--------+|
+-------------------------------------------------------+
TH5:
Dự đoán: Bố cục gồm 3 hàng, 3 cột.
Grid chia không gian thành 3 cột bằng nhau (repeat(3, 1fr)).
Hàng 1 chứa Item 1, 2, 3. Hàng 2 chứa Item 4, 5, 6.
Item 7 (cuối cùng) sẽ nằm ở hàng thứ 3, bắt đầu tại vị trí của cột đầu tiên bên trái. Hai ô lưới còn lại của hàng 3 sẽ bỏ trống (không giống Flexbox, Grid giữ nguyên cấu trúc ô cố định chứ không tự căn giữa hay kéo giãn item lẻ loi này).

Sơ đồ bố cục:
+-------------------------------------------------------+
| [  Item 1  ]  <10px>  [  Item 2  ]  <10px>  [  Item 3  ] |
|                                                          |
| [  Item 4  ]          [  Item 5  ]          [  Item 6  ] |
|                                                          |
| [  Item 7  ]          (Trống)               (Trống)      |
+-------------------------------------------------------+

# PHẦN C-SUY LUẬN
## Câu C1 (10đ) — Flexbox vs Grid: 
1. Navigation bar ngang (logo + menu + buttons)
Lựa chọn: Flexbox

Giải thích: Thanh điều hướng (Navbar) là một layout 1 chiều (chiều ngang). Các phần tử bên trong (logo, menu, nút) thường có kích thước không cố định, phụ thuộc vào độ dài của chữ. Flexbox cực mạnh trong việc dàn hàng ngang và phân bổ không gian linh hoạt bằng cách dùng justify-content: space-between hoặc đẩy cụm nút sang bên phải bằng margin-left: auto.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
Lựa chọn: Grid

Giải thích: Đây là layout 2 chiều (vừa chia cột cố định, vừa xếp hàng dọc vuông vức). Với Grid, bạn chỉ cần định nghĩa số cột một lần duy nhất bằng thuộc tính grid-template-columns: repeat(3, 1fr). Khi dữ liệu đổ về bao nhiêu ảnh đi chăng nữa, trình duyệt sẽ tự động xếp chúng vào đúng các ô lưới mà không lo bị lệch hàng.

3. Layout blog: main content + sidebar
Lựa chọn: Dùng cái nào cũng tốt (Grid được ưu tiên hơn cho tổng thể cấu trúc)

Giải thích: Nếu dùng Grid: Phù hợp nhất để dựng bộ khung lớn (Layout vĩ mô) cho trang web. Bạn kiểm soát được tỷ lệ chính xác của Sidebar và Main Content, đồng thời dễ dàng dùng grid-template-areas để đảo vị trí của chúng trên điện thoại (đẩy sidebar xuống dưới content).
            Nếu dùng Flexbox: Vẫn làm được rất nhanh với .content { flex: 1; } và .sidebar { width: 300px; flex-shrink: 0; }.

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
Lựa chọn: Kết hợp cả hai (hoặc Grid cho an toàn)

Giải thích: Dùng Grid cho khung ngoài của Footer (grid-template-columns: repeat(4, 1fr)) để đảm bảo 4 cột luôn thẳng hàng tăm tắp, ngay cả khi nội dung bên trong một cột bỗng nhiên dài ra. (Nếu dùng Flexbox ở đây mà chữ dài quá, các cột rất dễ bị co giãn không đều nhau).

            Dùng Flexbox cho nội dung bên trong từng cột (xếp các thẻ <a> theo chiều dọc bằng flex-direction: column) để dễ dàng căn chỉnh khoảng cách giữa các link.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
Lựa chọn: Flexbox

Giải thích: Bản chất layout bên trong một chiếc Card là 1 chiều theo trục dọc (flex-direction: column). Như đã phân tích ở bài debug trước, Flexbox cho phép chúng ta xử lý việc nút dính đáy cực kỳ thanh thoát bằng cách đặt margin-top: auto cho phần tử nút bấm, giúp nó tự động chiếm lấy khoảng trống còn thừa và "găm" chặt vào đáy card.

## CÂU C2-DEBUG FLEXBOX
Lỗi 1: Cards không đều chiều cao — nút "Mua" bị lệch
-Nguyên nhân:
Mặc dù thuộc tính mặc định của Flexbox là .card-container sẽ kéo giãn các .card có chiều cao bằng nhau (align-items: stretch), nhưng bản thân bên trong mỗi .card lại là một luồng văn bản (block) thông thường.
Khi tiêu đề h3 hoặc đoạn mô tả của card này dài hơn card khác, phần nội dung chữ sẽ đẩy nút .btn xuống. Card nào ít chữ hơn thì nút .btn sẽ bị hụt lên trên, tạo ra sự nhấp nhô mất thẩm mỹ.

Lỗi 2: Items không căn giữa cả ngang lẫn dọc trong container 100vh
-Nguyên nhân:
Khi bạn viết display: flex cho .hero, trình duyệt mới chỉ kích hoạt hệ thống Flexbox chứ chưa hề nhận được lệnh phải căn chỉnh các phần tử con như thế nào. Theo mặc định, các phần tử con sẽ xếp từ trái sang phải, từ trên xuống dưới (gốc trên bên trái). Thuộc tính text-align: center chỉ có tác dụng căn giữa các dòng chữ hoặc phần tử inline bên trong nội dung của .hero-content, chứ không thể căn giữa chính khối .hero-content đó so với cha .hero.

Lỗi 3: Sidebar bị bóp nghẹt (co lại) khi content quá dài
-Nguyên nhân:
Trong Flexbox, có một thuộc tính ngầm định cực kỳ "tai quái" tên là flex-shrink (độ co phần tử khi thiếu không gian) có giá trị mặc định là 1.
Khi khối .content có quá nhiều nội dung dài dặc, hoặc chứa một bức ảnh/bảng quá to, nó sẽ phình ra và ép các phần tử cùng hàng phải co lại để nhường chỗ. Do .sidebar có flex-shrink: 1, trình duyệt sẽ thản nhiên "bóp" chiều rộng 250px của nó xuống còn một mẩu nhỏ xíu để ưu tiên cho thằng .content.

