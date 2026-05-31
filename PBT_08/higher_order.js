// 1. pipe() — Nối chuỗi các functions (Thực hiện từ trái qua phải)
function pipe(...fns) {
    // Trả về một hàm nhận tham số đầu vào là x
    return function(x) {
        // Sử dụng reduce để truyền kết quả từ hàm trước vào hàm sau
        return fns.reduce((value, fn) => fn(value), x);
    };
}

// 2. memoize() — Lưu trữ (cache) kết quả tính toán dựa trên tham số đầu vào
function memoize(fn) {
    // Sử dụng một Object làm kho lưu trữ cache
    const cache = {};
    
    return function(...args) {
        // Biến các tham số thành một chuỗi key để lưu vào cache
        const key = JSON.stringify(args);
        
        if (key in cache) {
            return cache[key]; // Nếu đã có kết quả trong cache, trả về luôn
        }
        
        // Nếu chưa có, thực thi hàm gốc và lưu vào cache
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// 3. debounce() — Trì hoãn thực thi cho đến khi hành động ngừng lặp lại trong một khoảng thời gian
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        // Mỗi khi hàm được gọi, xóa bộ đếm cũ
        if (timeoutId) clearTimeout(timeoutId);
        
        // Thiết lập bộ đếm mới
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// 4. retry() — Thử lại một hàm không đồng bộ (Promise) khi xảy ra lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Thử thực thi hàm và trả về kết quả ngay nếu thành công
            return await fn();
        } catch (error) {
            lastError = error;
            console.log(`[Lần ${attempt}] Thử lại thất bại...`);
            
            // Nếu là lần thử cuối cùng vẫn lỗi thì thoát vòng lặp
            if (attempt === maxAttempts) break;
        }
    }
    
    // Nếu hết số lần thử mà vẫn lỗi, ném ra lỗi cuối cùng
    throw new Error(`Thất bại sau ${maxAttempts} lần thử. Lỗi gốc: ${lastError.message}`);
}

// --- KIỂM TRA (TEST ZONE) ---

// Test pipe
const processValue = pipe(
    x => x * 2,        
    x => x + 10,       
    x => x.toString(), 
    x => "Kết quả: " + x
);
console.log("--- TEST PIPE ---");
console.log(processValue(5)); // → "Kết quả: 20"


// Test memoize
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log("\n--- TEST MEMOIZE ---");
console.log(expensiveCalc(1000000)); // Hiện "Đang tính..."
console.log(expensiveCalc(1000000)); // Lấy từ cache (không in "Đang tính...")


// Test debounce
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);
console.log("\n--- TEST DEBOUNCE (Chờ 0.5s) ---");
search("a");
search("ab");
search("abc"); // Chỉ "abc" được thực thi sau 500ms


// Test retry
const mockApiCall = async () => {
    // Giả lập tỉ lệ lỗi 70%
    if (Math.random() < 0.7) throw new Error("Server quá tải");
    return "Dữ liệu API thành công!";
};

console.log("\n--- TEST RETRY ---");
retry(mockApiCall, 5)
    .then(res => console.log("Kết quả:", res))
    .catch(err => console.error(err.message));