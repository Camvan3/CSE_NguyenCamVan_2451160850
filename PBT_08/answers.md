# PHẦN A
Câu A1 (5đ) — Function Declaration vs Expression vs Arrow
1. Ba cách viết hàm tinhThueBaoHiem
JavaScript
// Cách 1: Function Declaration
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}

// Cách 2: Function Expression
const tinhThueBaoHiemExpr = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};

// Cách 3: Arrow Function
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
2. Sự khác biệt về Hoisting
Ba cách này có sự khác biệt rất lớn về Hoisting:

Function Declaration: Được "nhấc" toàn bộ định nghĩa lên đầu phạm vi. Bạn có thể gọi hàm trước khi dòng code khai báo nó xuất hiện.

Function Expression & Arrow Function: Khi được gán vào biến (const/let), chúng tuân theo quy tắc hoisting của biến. Chúng nằm trong Temporal Dead Zone và không thể sử dụng trước khi khai báo.

Ví dụ cụ thể:

JavaScript
console.log(cach1(12000000)); // Chạy bình thường (Hoisting toàn bộ)
function cach1(l) { return l * 0.1; }

console.log(cach2(12000000)); // Lỗi: ReferenceError
const cach2 = function(l) { return l * 0.1; };
Câu A2 (5đ) — Scope & Closure
1. Dự đoán Output
Đoạn 1 (Closure):

c.increment() → 1

c.increment() → 2

c.increment() → 3

c.decrement() → 2

c.getCount()  → 2

Đoạn 2 (Vòng lặp setTimeout):

Sau 100ms: var: 3, var: 3, var: 3

Sau 200ms: let: 0, let: 1, let: 2

2. Giải thích chi tiết (var vs let)
Với var: var có Function Scope. Trong vòng lặp for, chỉ có một thực thể biến i duy nhất được tạo ra và dùng chung cho cả 3 lần lặp. Khi hàm setTimeout chạy (sau khi vòng lặp đã kết thúc), giá trị của i lúc đó đã là 3. Cả 3 hàm callback đều nhìn vào cùng một ô nhớ có giá trị 3.

Với let: let có Block Scope. Ở mỗi vòng lặp, JavaScript tạo ra một bản ghi phạm vi mới và một biến j mới hoàn toàn cho lượt lặp đó. Hàm callback trong setTimeout sẽ "đóng gói" (closure) giá trị của j tại đúng thời điểm vòng lặp đó diễn ra.

Câu A3 (5đ) — Array Methods
Với const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:

const even = nums.filter(n => n % 2 === 0);

const triple = nums.map(n => n * 3);

const total = nums.reduce((sum, n) => sum + n, 0);

const firstGt7 = nums.find(n => n > 7);

const hasGt10 = nums.some(n => n > 10);

const allPositive = nums.every(n => n > 0);

const desc = nums.map(n => "Số " + n + " là " + (n % 2 === 0 ? "chẵn" : "lẻ"));

const reversed = [...nums].reverse(); (Dùng spread để copy mảng tránh làm hỏng mảng gốc)

Câu A4 (5đ) — Object Destructuring & Spread
1. Dự đoán Output
JavaScript
console.log(name, price, ram, color);  // "iPhone 16" 25990000 8 "Titan"
console.log(specs);                     // Lỗi: ReferenceError (specs đã bị bóc tách lấy ram/color, không được khai báo trực tiếp)

console.log(updated.price);            // 23990000 (Giá trị mới ghi đè giá trị cũ)
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (Gốc KHÔNG đổi, spread tạo object mới)

console.log(product.specs.ram);        // 16
2. Giải thích lỗi "Spread gotcha"
Khi dùng const copy = { ...product };, JavaScript thực hiện Shallow Copy (Copy nông).

Các giá trị nguyên thủy (String, Number) được copy giá trị.

Các giá trị phức tạp (Object, Array như specs) chỉ được copy địa chỉ ô nhớ.

Vì vậy, copy.specs và product.specs vẫn đang cùng trỏ về một ô nhớ dữ liệu duy nhất. Khi bạn sửa ram ở bản copy, dữ liệu ở object gốc bị thay đổi theo. Để tránh điều này, ta cần thực hiện Deep Copy.

# PHẦN C
CÂU C1-
const processOrders = (orders) => 
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id, customer, total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
CÂU C2-
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (const item of arr) {
            result.push(fn(item));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (const item of arr) {
            if (fn(item)) result.push(item);
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        // Nếu không truyền initialValue, lấy phần tử đầu tiên làm accumulator và duyệt từ phần tử thứ 2
        let hasInitial = initialValue !== undefined;
        let accumulator = hasInitial ? initialValue : arr[0];
        
        for (let i = hasInitial ? 0 : 1; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i]);
        }
        return accumulator;
    }
};

// --- TEST CASES RUN ---
console.log(miniArray.map([1, 2, 3], x => x * 2));          // → [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // → [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10