function createCart() {
    // Private data (Chỉ có thể truy cập thông qua Closure)
    let items = [];
    let discountCode = "";

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            
            // Tìm xem sản phẩm đã tồn tại trong giỏ chưa
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Thêm một bản sao sản phẩm cùng với số lượng vào giỏ
                items.push({ ...product, quantity });
            }
        },
        
        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const existingItem = items.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity = newQuantity;
            }
        },
        
        // 4. Tính tổng tiền (Đã bao gồm mã giảm giá)
        getTotal() {
            // Tính tổng tiền gốc trước giảm giá
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Áp dụng các loại mã giảm giá
            switch (discountCode) {
                case "SALE10":
                    return subTotal * 0.9;
                case "SALE20":
                    return subTotal * 0.8;
                case "FREESHIP":
                    // Giảm 30.000đ, nếu tổng tiền nhỏ hơn 30k thì trả về 0 chứ không âm
                    return Math.max(0, subTotal - 30000);
                default:
                    return subTotal;
            }
        },
        
        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                discountCode = code;
                console.log(`[Hệ thống] Áp dụng mã ${code} thành công!`);
            } else {
                console.log(`[Hệ thống] Mã giảm giá "${code}" không hợp lệ.`);
            }
        },
        
        // 6. Lấy tổng số sản phẩm (tổng các quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        // 7. Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountCode = "";
        },

        // 8. In giỏ hàng dạng bảng chuẩn ASCII đẹp mắt
        printCart() {
            const formatMoney = (amount) => amount.toLocaleString('vi-VN');
            
            console.log("┌────────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm           │ SL │ Đơn giá      │ Tổng          │");
            console.log("├────────────────────────────────────────────────────────────┤");
            
            items.forEach((item, index) => {
                const stt = (index + 1).toString().padEnd(2);
                const name = item.name.padEnd(18);
                const qty = item.quantity.toString().padStart(2);
                const price = formatMoney(item.price).padStart(12);
                const total = formatMoney(item.price * item.quantity).padStart(13);
                
                console.log(`│ ${stt}│ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });
            
            console.log("├────────────────────────────────────────────────────────────┤");
            
            // Hiển thị dòng giảm giá nếu có
            if (discountCode) {
                let discountText = "";
                if (discountCode === "SALE10") discountText = "-10%";
                if (discountCode === "SALE20") discountText = "-20%";
                if (discountCode === "FREESHIP") discountText = "-30.000đ";
                
                console.log(`│ Mã giảm giá đã áp dụng: ${discountCode} (${discountText})`.padEnd(61) + "│");
                console.log("├────────────────────────────────────────────────────────────┤");
            }

            const finalTotal = formatMoney(this.getTotal()) + "đ";
            console.log(`│ Tổng cộng:` + finalTotal.padStart(47) + " │");
            console.log("└────────────────────────────────────────────────────────────┘");
        }
    };
}

// === RUN TEST ZONE ===
const cart = createCart();

// Thêm sản phẩm
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Trùng ID 1 -> Tăng SL lên 2

// In giỏ hàng lần 1 (Chưa giảm giá)
cart.printCart();

// Áp mã giảm giá SALE10
cart.applyDiscount("SALE10");
cart.printCart();

// Kiểm tra số lượng
console.log("Số SP hiện tại trong giỏ (tổng SL):", cart.getItemCount()); // → Kỳ vọng: 4

// Xóa AirPods Pro (ID = 3)
cart.removeItem(3);
console.log("\n--- SAU KHI XÓA AIRPODS PRO ---");
cart.printCart();
console.log("Số SP sau khi xóa:", cart.getItemCount()); 