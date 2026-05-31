# PHẦN A
### CÂU A1
1. Sơ đồ DOM Tree
                Document
                     |
               Element: <div id="app">
                 /           \
    Element: <header>       Element: <main>
      /          \             /          \
Element: <h1>  Element: <nav> Element: <form> Element: <ul id="todoList">
    |             /   |   \        /       \             /          \
Text: "Todo..."  <a> <a>  <a>    <input> <button>     <li>          <li>
2. Các câu lệnh querySelector
Chọn thẻ <h1>:
JavaScriptdocument.querySelector("header h1"); // Hoặc document.querySelector("h1");
Chọn input trong form:
JavaScriptdocument.querySelector("#todoForm input"); // Hoặc document.querySelector("#todoInput");
Chọn tất cả .todo-item:
JavaScriptdocument.querySelectorAll(".todo-item");
Chọn link đang active:
JavaScriptdocument.querySelector("nav a.active");
Chọn <li> đầu tiên trong #todoList:
JavaScriptdocument.querySelector("#todoList li:first-child"); // Hoặc document.querySelector("#todoList li");
Chọn tất cả <a> bên trong <nav>:
JavaScriptdocument.querySelectorAll("nav a");
### Câu A2 (5đ) — innerHTML vs textContent1. 
Sự khác nhau & Trường hợp sử dụngtextContent: Chỉ lấy hoặc ghi phần văn bản thuần túy (raw text) bên trong phần tử, tự động bỏ qua toàn bộ các thẻ HTML. Nó an toàn và có hiệu năng nhanh hơn.
Khi nào dùng: Khi hiển thị tên người dùng, giá tiền, số lượng, mô tả sản phẩm thuần chữ.innerHTML: Lấy hoặc ghi toàn bộ nội dung bao gồm cả văn bản và các thẻ HTML bên trong phần tử. Trình duyệt sẽ phân tích cú pháp (parse) chuỗi này thành các node DOM thật sự.Khi nào dùng: Khi bạn thực sự cần chèn một đoạn code HTML động (như chèn một block Card sản phẩm từ dữ liệu mảng).2. Tại sao innerHTML gây lỗ hổng XSS (Cross-Site Scripting)?Khi dùng innerHTML, trình duyệt sẽ thực thi bất kỳ thẻ <script> hoặc các thuộc tính bắt sự kiện (như onerror, onload, onclick) nằm trong chuỗi được chèn vào. Nếu chuỗi này đến từ dữ liệu do người lạ nhập (userInput), kẻ tấn công có thể chèn mã độc JavaScript để đánh cắp Cookie, Token hoặc điều hướng trang web của bạn sang trang lừa đảo.3. Cách sửa code chống XSSĐể sửa lỗi này, cách an toàn nhất là thay innerHTML bằng textContent. Lúc này, chuỗi độc hại sẽ chỉ hiển thị dưới dạng chữ thuần túy trên màn hình chứ không bị kích hoạt chạy code:JavaScript
const userInput = document.querySelector("#search").value;

// SỬA LẠI: Thay innerHTML bằng textContent
document.querySelector("#result").textContent = userInput; 

// Kết quả hiển thị ra màn hình: <img src=x onerror="alert('Hacked!')" chứ không bật alert lên.
 ### Câu A3 (5đ) — Event Bubbling (Sự kiện nổi bọt)
 Theo cơ chế nổi bọt mặc định của JavaScript, khi một sự kiện xảy ra trên một phần tử con, nó sẽ tự động "nổi bọt" (lan truyền) ngược lên các phần tử cha theo thứ tự từ trong ra ngoài.1. Trường hợp 1: Khi chưa uncomment stopPropagation()Khi click vào <button id="btn">, sự kiện sẽ nổi bọt từ button -> div#inner -> div#outer.Output in ra console:PlaintextBUTTON
INNER
OUTER
2. Trường hợp 2: Khi bỏ comment e.stopPropagation();Hàm e.stopPropagation() có nhiệm vụ ngăn chặn sự kiện nổi bọt, giữ cho sự kiện click chỉ dừng lại ngay tại phần tử kích hoạt nó và không lan lên các cha phía trên nữa.Output in ra console:PlaintextBUTTON

# PHẦN C
### CÂU C1
1. Danh sách các lỗi và cách khắc phục:
Sự kiện không hợp lệ (#decrementBtn): .addEventListener("onclick", ...) là sai. Khi dùng addEventListener, tên sự kiện phải bỏ chữ "on".

Sửa: "click".

Gán giá trị sai cho biến hằng (#resetBtn): countDisplay = count; sẽ gây lỗi vì countDisplay là một biến hằng (const) trỏ đến DOM Element, không thể gán trực tiếp số vào nó.

Sửa: countDisplay.innerHTML = count;.

Lỗi xóa phần tử (#clearHistory): item.remove; thiếu dấu ngoặc đơn để thực thi hàm.

Sửa: item.remove();.

Lỗi kiểu dữ liệu khi Load (window load): localStorage.getItem luôn trả về chuỗi (string). Nếu không chuyển đổi về số, khi bấm Increment (count++), kết quả sẽ là phép nối chuỗi (ví dụ: "0" + 1 = "01").

Sửa: count = Number(localStorage.getItem("count")) || 0;.

Lỗi null-safe khi Load: Nếu lần đầu mở trang (localStorage chưa có dữ liệu), countDisplay.textContent sẽ hiện chữ "null".

Sửa: Dùng mặc định || 0.

Lỗi History List chưa được khôi phục: Code mới chỉ load count mà chưa đổ lại dữ liệu historyList.innerHTML từ localStorage.

Sửa: historyList.innerHTML = localStorage.getItem("history") || "";.

Mất Event Listener khi khôi phục History: Khi dùng innerHTML để load history, các sự kiện click gắn vào từng thẻ li qua deleteHistory sẽ bị mất sạch (vì HTML string không lưu được JS function).

Sửa: Nên dùng Event Delegation cho historyList.

Xóa lịch sử không hiệu quả: historyList.innerHTML = null; hoạt động được nhưng chuẩn nhất nên dùng chuỗi rỗng "".

2. Đoạn code đã Fix hoàn chỉnh:

const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// Gán Event Delegation cho historyList thay vì từng li (Sửa lỗi số 7)
historyList.addEventListener("click", (e) => {
    if(e.target.tagName === "LI") e.target.remove();
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

// Lỗi 1: Tên event là "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.innerHTML = count; // Lỗi 2: Gán vào innerHTML
    historyList.innerHTML = "";     // Lỗi 8: Dùng chuỗi rỗng
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => item.remove()); // Lỗi 3: Thiếu dấu ()
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    // Lỗi 4 & 5: Ép kiểu Number và xử lý giá trị mặc định
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    // Lỗi 6: Phải khôi phục cả HTML history
    historyList.innerHTML = localStorage.getItem("history") || "";
});
### Câu C2 
1. Tại sao gắn 1000 event riêng lẻ là BAD PRACTICE?
Chi phí bộ nhớ: Mỗi Event Listener là một đối tượng trong bộ nhớ. 1000 đối tượng sẽ tiêu tốn đáng kể RAM, đặc biệt trên thiết bị di động.

Quản lý khó khăn: Khi bạn thêm hoặc xóa Item động, bạn lại phải mất công gắn thêm hoặc gỡ bỏ listener cho từng item đó.

Hiệu năng chậm: Trình duyệt mất nhiều thời gian hơn để khởi tạo và quản lý bảng theo dõi sự kiện khổng lồ.

Giải pháp: Event Delegation (Ủy quyền sự kiện)
Thay vì gắn vào từng con, ta gắn 1 listener duy nhất vào phần tử cha. Nhờ cơ chế Event Bubbling, khi click vào con, sự kiện nổi bọt lên cha. Ta chỉ cần kiểm tra e.target để biết chính xác con nào được click.

2. Refactor với DocumentFragment
Code cũ (Tệ): Gây ra 1000 lần Reflow/Repaint vì mỗi lần appendChild là trình duyệt phải tính toán lại toàn bộ giao diện.

Code mới (Tối ưu):

JavaScript
const fragment = document.createDocumentFragment(); // Tạo một "bộ nhớ đệm" ngoại tuyến

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Chỉ thêm vào bộ nhớ đệm, không gây Reflow
}

document.body.appendChild(fragment); // Thêm 1 lần duy nhất vào DOM thực
Tại sao nhanh hơn?DocumentFragment là một DOM Node "ảo" không nằm trên cây DOM chính.

Mọi thao tác thay đổi cấu trúc trên fragment đều diễn ra trong bộ nhớ (off-screen).

Khi bạn appendChild(fragment), trình duyệt chỉ chèn nội dung bên trong nó vào trang web.

Kết quả: Trình duyệt chỉ cần thực hiện 1 lần Reflow (tính toán lại kích thước/vị trí) và 1 lần Repaint (vẽ lại giao diện), giúp tăng tốc độ xử lý gấp nhiều lần so với việc thao tác 1000 lần trực tiếp.