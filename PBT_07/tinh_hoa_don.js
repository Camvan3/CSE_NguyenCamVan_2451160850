function inHoaDon(danhSachMon, coTip = true) {
    // 1. Tính tổng tiền gốc từ danh sách món ăn
    let tongCong = 0;
    danhSachMon.forEach(mon => {
        tongCong += mon.gia * mon.soLuong;
    });

    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 15;
    } else if (tongCong > 500000) {
        phanTramGiam = 10;
    }

    const homNay = new Date().getDay();
    if (homNay === 2) {
        phanTramGiam += 5;
    }

    const tienGiamGia = tongCong * phanTramGiam / 100;
    const tienSauGiam = tongCong - tienGiamGia;
    
    const vat = tienSauGiam * 0.08;
    const tip = coTip ? tienSauGiam * 0.05 : 0;
    
    const thanhToan = tienSauGiam + vat + tip;

    const formatMoney = (amount) => amount.toLocaleString('vi-VN') + "đ";
    
    const canPhai = (chuoi, doDai) => chuoi.padStart(doDai, ' ');

    console.log("╔════════════════════════════════════════════════╗");
    console.log("║               HÓA ĐƠN NHÀ HÀNG                 ║");
    console.log("╠════════════════════════════════════════════════╣");
    
    danhSachMon.forEach((mon, index) => {
        const textTen = `${index + 1}. ${mon.ten}`;
        const textChiTiet = `x${mon.soLuong} @${mon.gia / 1000}k = ${formatMoney(mon.gia * mon.soLuong)}`;
        const spaceCount = 46 - textTen.length - textChiTiet.length;
        const spaces = ' '.repeat(spaceCount > 0 ? spaceCount : 1);
        console.log(`║ ${textTen}${spaces}${textChiTiet} ║`);
    });
    
    console.log("╠════════════════════════════════════════════════╣");
    console.log(`║ Tổng cộng:      ${canPhai(formatMoney(tongCong), 30)} ║`);
    console.log(`║ Giảm giá (${phanTramGiam}%):   ${canPhai("-" + formatMoney(tienGiamGia), 30)} ║`);
    console.log(`║ VAT (8%):       ${canPhai(formatMoney(vat), 30)} ║`);
    console.log(`║ Tip (5%):       ${canPhai(formatMoney(tip), 30)} ║`);
    console.log("╠════════════════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:     ${canPhai(formatMoney(thanhToan), 30)} ║`);
    console.log("╚════════════════════════════════════════════════╝");
}

const orderCuaKhach = [
    { ten: "Phở bò đặc biệt", gia: 65000, soLuong: 2 },
    { ten: "Trà đá sâm dứa", gia: 5000, soLuong: 3 },
    { ten: "Bún chả Hà Nội", gia: 55000, soLuong: 1 },
    { ten: "Lẩu hải sản (Lớn)", gia: 450000, soLuong: 1 } 
];

inHoaDon(orderCuaKhach, true);