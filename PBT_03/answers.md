# PHẦN A:KIỂM TRA ĐỌC HIỂU
## CÂU A1: 3 cách nhúng css:
1. Inline CSS: Dùng thuộc tính style trực tiếp trong tag HTML
VD: <h1 style="color: blue;">Hello</h1>
Ưu/Nhược: Nhanh, độ ưu tiên cao nhất / Khó quản lý, làm code HTML rối.
Khi nào dùng: Khi cần test nhanh hoặc chỉ muốn style duy nhất cho 1 element đặc biệt.

2. Internal CSS: Dùng thẻ <style> đặt trong cặp thẻ <head>.
VD: <style> p { color: red; } </style>
Ưu/Nhược: Quản lý tập trung trong 1 file / Chỉ có tác dụng cho file đó, không tái sử dụng được cho trang khác.
Khi nào dùng: Khi trang web chỉ có 1 page duy nhất.
3. External CSS: Dùng thẻ <link> để kết nối file .css bên ngoài.
VD: <link rel="stylesheet" href="style.css">
Ưu/Nhược: Tái sử dụng tốt, code sạch sẽ / Cần thêm yêu cầu tải file từ server.
Khi nào dùng: Cách chuẩn nhất cho mọi dự án thực tế.

*Câu hỏi thêm: Nếu cùng áp dụng, Inline CSS sẽ "thắng" vì nó có độ ưu tiên (specificity) cao nhất so với Internal và External (ngoại trừ trường hợp dùng !important).

## CÂU A2: CSS Selectors-Dự đoán:
1. h1 : ShopTLU
2. .price : 25.990.000đ và 45.990.000đ
3. #app header : Toàn bộ nội dung trong header 
4. nav a: first-child : Home
5. .product.featured h2 : MacBook Pro
6. article > p : Các thẻ p là con trực tiếp của article (giá tiền và mô tả), tổng cộng 4 thẻ p.
7. a[href="/"] : Home
8. .top-bar.dark h1 : ShopTLU
## CÂU A3: Box Model - Tính toán
TH1: Chiều rộng hiển thị: $400 + 20 \times 2 (padding) + 5 \times 2 (border) = 450px$
     Không gian chiếm: $450 + 10 \times 2 (margin) = 470px$

TH2: Chiều rộng hiển thị: 400px (vì padding và border đã nằm trong width).  
    Kích thước content: $400 - 40 (padding) - 10 (border) = 350px$
    Không gian chiếm: $400 + 20 (margin) = 420px$

TH3: Khoảng cách giữa box-a box-b: 40px
     Giải thích: Khi 2 margin dọc gặp nhau, chúng không cộng dồn mà lấy giá trị lớn nhất.
## CÂU A4: SPECIFICITY
1.  Rule A (p): (0, 0, 1) 
    Rule B (.price): (0, 1, 0)  
    Rule C (#main-price): (1, 0, 0) Rule D (p.price): (0, 1, 1)

2. Màu đỏ vì ID selector có điểm cao nhất

3. Màu cam vì inline style đè lên ID selector

4. Màu đen vì !important là vũ khí tối thượng, phá vỡ mọi quy tắc specificity
# PHẦN C-DEBUG & SUY LUẬN
## CÂU C1: DEBUG LAYOUT
1+2.  Chiều rộng sidebar=  $300 (width) + 40 (padding) + 2 (border) = 342px$.
    Chiều rộng content= $660 (width) + 60 (padding) + 2 (border) = 722px$
    Tổng = 342 + 722=1064px(Vì 1064px>960px của container nên bị vỡ layout)

3. Cách sửa:
Cách 1: Thêm box-sizing: border-box; cho cả 2
Cách 2: Giảm width của sidebar xuống $258px$ và content xuống $598px$ (nếu giữ nguyên padding/border)
## CÂU C2: CASCADE PUZZLE
1.  font-size = 20px
    color = green
->.highlight (0,1,0) + !important > #featured .title (1,1,0).
2. color = blue
->Thừa hưởng (inherit) từ cha gần nhất là .card.
3.  font-size = 20px
    color = #333
->Thừa hưởng từ cha .card vì không có selector nào khác target nó.
4. color = green
->.highlight + !important thắng mọi quy tắc khác.

## CÂU B2:
Hộp 1 (content-box): Chiều rộng thực tế hiển thị = 350px. */J

Hộp 2 (border-box): Chiều rộng thực tế hiển thị = 300px.
*Giải thích sự khác biệt: content-box cộng thêm padding và border vào bên ngoài chiều rộng khai báo khiến hộp bị to ra ($300 + 40 + 10 = 350$). Trong khi đó, border-box bao gồm cả padding và border vào trong chiều rộng đã định sẵn ($250 + 40 + 10 = 300$), giúp việc kiểm soát kích thước layout chính xác hơn.
## CÂU B3: 10 RULES VÀ ĐIỂM SPECIFICITY
1. Trả Lời: 
1. p-(0,0,1)

2. body p-(0, 0, 2)

3. .text-(0, 1, 0)

4. p.text -(0, 1, 1)

5. p[class*="text"]- (0, 1, 1)

6. .text.highlight-(0, 2, 0)                     

7. #demo-(1, 0, 0)

8. p#demo-(1, 0, 1)          

9. #demo.text-(1, 1, 0)

10. .highlight { color: green !important; }
2. Hiển thị màu Xanh lá (green).
Giải thích: Mặc dù rule số 9 có điểm số ID + Class rất cao, nhưng rule số 10 sử dụng từ khóa !important, nó phá vỡ mọi quy tắc tính điểm thông thường để giành quyền ưu tiên cao nhất.
3. Không đổi
Giải thích: Thứ tự viết code (Cascade) chỉ có tác dụng khi hai selector có cùng điểm số Specificity. Trong danh sách trên, các rule có điểm số khác nhau rõ rệt, nên dù bạn đảo rule số 1 xuống cuối cùng thì rule số 10 vẫn thắng vì điểm nó cao hơn.