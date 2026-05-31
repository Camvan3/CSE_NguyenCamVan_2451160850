const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// --- KHỞI TẠO CÁC BIẾN THỐNG KÊ ---
// 1. Đếm số SV mỗi xếp loại
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;

// 2. Tìm SV có điểm TB cao nhất và thấp nhất
let svCaoNhat = null;
let svThapNhat = null;

// 3. Tính điểm TB toàn lớp cho từng môn
let tongMath = 0, tongPhysics = 0, tongCS = 0;

// 4. Bonus: Tính điểm TB theo giới tính
let tongNam = 0, countNam = 0;
let tongNu = 0, countNu = 0;


// --- IN BẢNG KẾT QUẢ VÀ TÍNH TOÁN LOGIC TRONG VÒNG LẶP ---
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const sv = students[i];

    // Yêu cầu 1: Tính điểm trung bình của từng sinh viên
    const diemTB = (sv.math * 0.4) + (sv.physics * 0.3) + (sv.cs * 0.3);
    // Làm tròn đến 1 chữ số thập phân (ví dụ: 8.0)
    const diemTBRound = Math.round(diemTB * 10) / 10;

    // Yêu cầu 2: Xếp loại
    let xepLoai = "";
    if (diemTBRound >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (diemTBRound >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (diemTBRound >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    // Yêu cầu 3: In bảng kết quả (Sử dụng padEnd để căn lề cho đẹp mắt)
    const sttText = (i + 1).toString().padEnd(3);
    const nameText = sv.name.padEnd(6);
    const tbText = diemTBRound.toFixed(1).padEnd(4);
    console.log(`| ${sttText} | ${nameText} | ${tbText} | ${xepLoai.padEnd(11)} |`);

    // --- THU THẬP DỮ LIỆU THỐNG KÊ ---
    // Thống kê Cao nhất / Thấp nhất
    if (svCaoNhat === null || diemTB > svCaoNhat.diem) {
        svCaoNhat = { name: sv.name, diem: diemTBRound };
    }
    if (svThapNhat === null || diemTB < svThapNhat.diem) {
        svThapNhat = { name: sv.name, diem: diemTBRound };
    }

    // Thống kê điểm môn học toàn lớp
    tongMath += sv.math;
    tongPhysics += sv.physics;
    tongCS += sv.cs;

    // Thống kê theo giới tính
    if (sv.gender === "M") {
        tongNam += diemTB;
        countNam++;
    } else if (sv.gender === "F") {
        tongNu += diemTB;
        countNu++;
    }
}

console.log("-------------------------------------\n");

// --- IN KẾT QUẢ THỐNG KÊ ---

console.log("=== THỐNG KÊ XẾP LOẠI ===");
console.log(`- Giỏi:      ${countGioi} SV`);
console.log(`- Khá:       ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu:       ${countYeu} SV\n`);

console.log("=== KỶ LỤC ĐIỂM SỐ ===");
console.log(`- SV có ĐTB cao nhất: ${svCaoNhat.name} (${svCaoNhat.diem} điểm)`);
console.log(`- SV có ĐTB thấp nhất: ${svThapNhat.name} (${svThapNhat.diem} điểm)\n`);

console.log("=== ĐIỂM TRUNG BÌNH MÔN CỦA LỚP ===");
console.log(`- Toán (Math):      ${(tongMath / students.length).toFixed(2)}`);
console.log(`- Vật lý (Physics): ${(tongPhysics / students.length).toFixed(2)}`);
console.log(`- Tin học (CS):     ${(tongCS / students.length).toFixed(2)}\n`);

console.log("=== BONUS: ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH ===");
console.log(`- Nam (M): ${(tongNam / countNam).toFixed(2)}`);
console.log(`- Nữ (F):  ${(tongNu / countNu).toFixed(2)}`);