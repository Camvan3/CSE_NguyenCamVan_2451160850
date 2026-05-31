# PHẦN A
Câu A1 (5đ) — var / let / const
Dự đoán & Kết quả thực tế
Đoạn 1: undefined

Đoạn 2: Lỗi ReferenceError: Cannot access 'y' before initialization

Đoạn 3: Lỗi TypeError: Assignment to constant variable

Đoạn 4: [1, 2, 3, 4]

Đoạn 5: * Trong block: 2

Ngoài block: 1
Giải thích chi tiết
Đoạn 1: Do cơ chế Hoisting (giai đoạn khởi tạo). Khi dùng var, biến x được đưa lên đầu phạm vi (scope) và tự động gán giá trị undefined. Vì vậy khi gọi console.log(x) trước dòng gán x = 5, nó sẽ in ra undefined.

Đoạn 2: let cũng được hoisting, nhưng nó nằm trong Temporal Dead Zone (TDZ) (Vùng chết tạm thời) cho đến khi dòng khai báo được chạy tới. Truy cập biến trong TDZ sẽ gây ra lỗi ReferenceError.

Đoạn 3: const dùng để khai báo một hằng số. Bạn không thể tái gán (re-assign) một giá trị mới cho một biến const bằng toán tử =. Do đó code bị crash ngay dòng z = 20.

Đoạn 4: Tuy arr là const, nhưng nó là một Reference Type (Kiểu tham chiếu - Object/Array). const chỉ ngăn bạn không được đổi "địa chỉ ô nhớ" của arr (ví dụ: arr = [4, 5]), chứ không cấm bạn chỉnh sửa, thêm bớt các phần tử bên trong ô nhớ đó (arr.push(4)).

Đoạn 5: let có Block Scope (phạm vi trong cặp ngoặc {}). Biến let a = 2 bên trong block là một biến hoàn toàn biệt lập với let a = 1 ở ngoài. Khi ra ngoài block, biến a bên trong biến mất, chỉ còn a ngoài block.
Câu A2 (5đ) — Data Types & Coercion
Dự đoán & Kết quả thực tế
JavaScript
console.log(typeof null);              // "object" (Lỗi lịch sử của JS)
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number"
console.log("5" + 3);                 // "53" (Chuỗi)
console.log("5" - 3);                 // 2 (Số)
console.log("5" * "3");              // 15 (Số)
console.log(true + true);            // 2 (Số)
console.log([] + []);                // "" (Chuỗi rỗng)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" hoặc 0 tùy môi trường chạy console
Giải thích hiện tượng "5" + 3 và "5" - 3
Sự khác biệt này đến từ cơ chế Cơ ép kiểu tự động (Type Coercion) của JavaScript:

Phép cộng (+): Toán tử + trong JS có hai vai trò: cộng số học và nối chuỗi. JS quy định: Nếu ít nhất một trong hai vế là chuỗi (String), nó sẽ ưu tiên chuyển vế còn lại thành chuỗi rồi nối chúng lại với nhau. Vì thế "5" + 3 trở thành "5" + "3" = "53".

Phép trừ (-): Toán tử - chỉ có một vai trò duy nhất là trừ số học. Nó không có chức năng nào liên quan đến chuỗi. Do đó, JS bắt buộc phải ép kiểu chuỗi "5" về dạng số (5) để thực hiện phép tính. Kết quả là 5 - 3 = 2.

Câu A3 (5đ) — So sánh == vs ===
Dự đoán kết quả (true / false)
JavaScript
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false (NaN không bằng chính nó!)
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
Quy tắc: Nên dùng == hay ===? Tại sao?
Quy tắc vàng: Từ giờ trở đi, bạn LUÔN LUÔN nên dùng === (và !==).

Tại sao?

=== (Strict Equality): So sánh nghiêm ngặt, bắt buộc cả Giá trị và Kiểu dữ liệu phải giống nhau thì mới trả về true.

== (Loose Equality): So sánh lỏng lẻo, tự động ép kiểu hai vế về cùng một kiểu trước khi so sánh. Điều này dẫn đến những kết quả rất kỳ quặc và dễ sinh ra bug ngầm (ví dụ như 0 == false là true, hay "" == false là true).

Sử dụng === giúp code của bạn minh bạch, dễ đoán và tránh được các lỗi logic "ảo ma" do JS tự ép kiểu.

Câu A4 (5đ) — Truthy & Falsy
Danh sách TẤT CẢ các giá trị Falsy trong JavaScript
Trong JavaScript, chỉ có duy nhất 8 giá trị sau đây được coi là Falsy (khi đưa vào điều kiện if sẽ tính là false):

false

0 (số không)

-0 (số không âm)

0n (BigInt zero)

"" hoặc '' hoặc Template literal rỗng (chuỗi rỗng)

null

undefined

NaN

Mọi giá trị khác ngoài 8 giá trị này đều là Truthy (bao gồm cả mảng rỗng [] và object rỗng {}).

Dự đoán in hay không?
JavaScript
if ("0") console.log("A");          
if ("") console.log("B");            
if ([]) console.log("C");            
if ({}) console.log("D");            
if (null) console.log("E");         
if (0) console.log("F");             
if (-1) console.log("G");            
if (" ") console.log("H");           
Câu A5 (5đ) — Template Literals
Dưới đây là 3 đoạn code được viết lại bằng Template Literals (sử dụng dấu backtick ``), giúp code sạch sẽ và không cần dùng dấu + hay ký tự chống chéo \":

Cách 1:
JavaScript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
Cách 2:
JavaScript
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
Cách 3:
(Template literal hỗ trợ xuống dòng trực tiếp mà không cần nối chuỗi)

JavaScript
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

# PHẦN C
Câu C1-
1. Danh sách lỗi, giải thích và cách sửa
if (giaSauGiam = 0)
Thiếu dấu đóng ngoặc nhọn } ở cuối hàm
tinhGiaGiamGia("100000", 20)
const gia2 = tinhGiaGiamGia(50000, 110)
Dùng var giamGia
var i = 0 trong vòng lặp