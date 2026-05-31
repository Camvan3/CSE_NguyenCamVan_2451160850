function PersonalChallenge() {
    // 1. Thông tin cá nhân
    const ten = "Nguyễn Cẩm Vân";
    const tuoi = 20;
    const queQuan = "Hải Phòng";

    // 2. Xử lý câu chào dựa vào giờ hiện tại
    const gioHienTai = new Date().getHours();
    let cauChao = "Chào buổi tối! 🌙";
    if (gioHienTai < 12) cauChao = "Chào buổi sáng! ☀️";
    else if (gioHienTai < 18) cauChao = "Chào buổi chiều! ⛅";

    // 3. Tính toán BMI (Cân nặng kg / (Chiều cao m * Chiều cao m))
    const canNang = 50; 
    const chieuCao = 1.68; // đơn vị mét
    const bmi = (canNang / (chieuCao * chieuCao)).toFixed(2);

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>{cauChao}</h2>
            
            <h3>Thông tin cá nhân:</h3>
            <p>Họ tên: {ten}</p>
            <p>Tuổi: {tuoi}</p>
            <p>Quê quán: {queQuan}</p>

            <h3>Chỉ số sức khỏe:</h3>
            <p>Cân nặng: {canNang} kg | Chiều cao: {chieuCao} m</p>
            <p>Chỉ số BMI của bạn là: <strong>{bmi}</strong></p>
            <p>Trạng thái: {bmi < 18.5 ? "Hơi gầy" : bmi < 24.9 ? "Cân đối" : "Thừa cân"}</p>
        </div>
    );
}
export default PersonalChallenge;
### BAI 2.2
function ConditionalChallenge() {
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0; 

    return (
        <div style={{ padding: "20px" }}>
            {/* 1. Trạng thái Online/Offline */}
            <h3>Trạng thái hệ thống: {isOnline ? "🟢 Đang hoạt động" : "🔴 Mất kết nối"}</h3>

            {/* 2. Hiện/ẩn menu dựa vào isLoggedIn bằng toán tử && */}
            {isLoggedIn && (
                <nav style={{ background: "#e2e3e5", padding: "10px", borderRadius: "5px" }}>
                    <a href="#profile" style={{ marginRight: "15px" }}>Hồ sơ của tôi</a>
                    <a href="#settings">Cài đặt</a>
                </nav>
            )}
            {!isLoggedIn && <button>Đăng nhập ngay</button>}

            {/* 3. Hiển thị Hết hàng khi stock = 0 */}
            <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #eee" }}>
                <h4>Sản phẩm: Áo sơ mi Blazer</h4>
                <p>Số lượng kho: {stock}</p>
                {/* Dùng toán tử && hoặc 3 ngôi để cảnh báo hết hàng */}
                {stock === 0 ? (
                    <span style={{ color: "red", fontWeight: "bold", background: "#f8d7da", padding: "5px 10px", borderRadius: "4px" }}>
                        ⚠️ HẾT HÀNG
                    </span>
                ) : (
                    <button style={{ background: "green", color: "white" }}>Thêm vào giỏ hàng</button>
                )}
            </div>
        </div>
    );
}
export default ConditionalChallenge;
### BAI 2.3
function ListChallenge() {
    // 1. Danh sách 5 sản phẩm (đơn vị: VNĐ)
    const danhSachSanPham = [
        { id: "P1", name: "Áo thun Local Brand", price: 250000 },
        { id: "P2", name: "Quần Jean Baggy", price: 450000 },
        { id: "P3", name: "Áo Khoác Da Biker", price: 1200000 }, // > 1 triệu
        { id: "P4", name: "Giày Sneaker Chunky", price: 1500000 }, // > 1 triệu
        { id: "P5", name: "Mũ Lưỡi Trai Classic", price: 150000 }
    ];

    // 3. Tính tổng giá tất cả sản phẩm bằng hàm reduce thuần JS
    const tongTien = danhSachSanPham.reduce((total, item) => total + item.price, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Cửa hàng Quần áo trực tuyến</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {/* Duyệt qua mảng sản phẩm bằng .map() */}
                {danhSachSanPham.map((sanPham) => {
                    // 2. Kiểm tra nếu giá > 1.000.000 thì tô màu đỏ
                    const laGiaCao = sanPham.price > 1000000;
                    
                    return (
                        <li 
                            key={sanPham.id} 
                            style={{ 
                                padding: "10px", 
                                borderBottom: "1px solid #ddd",
                                color: laGiaCao ? "red" : "black",
                                fontWeight: laGiaCao ? "bold" : "normal"
                            }}
                        >
                            📦 {sanPham.name} - {sanPham.price.toLocaleString('vi-VN')} đ
                            {laGiaCao && " 🔥 (Sản phẩm cao cấp)"}
                        </li>
                    );
                })}
            </ul>

            <div style={{ marginTop: "20px", padding: "15px", background: "#d1ecf1", borderRadius: "8px" }}>
                <strong>Tổng giá trị giỏ hàng: </strong> 
                <span style={{ fontSize: "1.2rem", color: "#0c5460" }}>
                    {tongTien.toLocaleString('vi-VN')} VNĐ
                </span>
            </div>
        </div>
    );
}
export default ListChallenge;
