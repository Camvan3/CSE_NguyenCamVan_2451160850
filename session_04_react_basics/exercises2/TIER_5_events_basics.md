### BAI 5.1
import { useState } from "react";

function ClickChallenge() {
    // 1. State đổi màu ngẫu nhiên
    const [bgColor, setBgColor] = useState("#3498db");
    // 2. State đếm số lần click riêng biệt cho 2 nút
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    // 3. State Like toggle
    const [isLiked, setIsLiked] = useState(false);

    // Hàm tạo mã màu HEX ngẫu nhiên
    const handleRandomColor = () => {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        setBgColor(randomColor);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thử thách 5.1: Click Events</h2>

            {/* 1. Đổi màu ngẫu nhiên */}
            <div style={{ backgroundColor: bgColor, width: "200px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", borderRadius: "8px", marginBottom: "10px", transition: "0.3s" }}>
                Hộp màu sắc
            </div>
            <button onClick={handleRandomColor}>Đổi màu ngẫu nhiên</button>

            <hr />

            {/* 2. Đếm số lần click nút riêng biệt */}
            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => setCountA(countA + 1)} style={{ marginRight: "10px" }}>Nút A ({countA})</button>
                <button onClick={() => setCountB(countB + 1)}>Nút B ({countB})</button>
            </div>

            <hr />

            {/* 3. Nút Like toggle */}
            <button onClick={() => setIsLiked(!isLiked)} style={{ fontSize: "1.2rem", cursor: "pointer" }}>
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>
        </div>
    );
}

export default ClickChallenge;

### BAI 5.2
import { useState } from "react";

function InputChallenge() {
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    // Hàm tính số từ chính xác (loại bỏ các khoảng trắng thừa)
    const countWords = (str) => {
        const trimmed = str.trim();
        return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thử thách 5.2: Input Events</h2>

            {/* 1. Ô nhập Email + Validate */}
            <div style={{ marginBottom: "20px" }}>
                <label>Nhập Email: </label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                />
                <div style={{ marginTop: "5px", fontSize: "0.9rem" }}>
                    {email.length === 0 ? "" : email.includes("@") ? (
                        <span style={{ color: "green" }}>✅ Định dạng email hợp lệ</span>
                    ) : (
                        <span style={{ color: "red" }}>❌ Email thiếu ký tự '@'</span>
                    )}
                </div>
            </div>

            <hr />

            {/* 2 + 3. Ô nhập văn bản + Preview + Đếm số từ */}
            <div>
                <label>Nhập văn bản (Preview Realtime):</label><br />
                <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nhập suy nghĩ của bạn..."
                    rows={4}
                    style={{ width: "300px", marginTop: "5px" }}
                />
                <p>📊 Số từ: <strong>{countWords(text)}</strong> từ | Số ký tự: <strong>{text.length}</strong></p>
                
                {text && (
                    <div style={{ background: "#f8f9fa", padding: "10px", borderLeft: "4px solid #007bff", width: "300px" }}>
                        <strong>Nội dung xem trước:</strong> <p style={{ margin: "5px 0 0 0" }}>{text}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputChallenge;

### BAI 5.3
import { useState, useEffect } from "react";

function KeyboardChallenge() {
    // 1. State Game đoán phím
    const targetKeys = ["a", "s", "d", "f", "w", "e", "r"];
    const [targetKey, setTargetKey] = useState("a");
    const [gameMessage, setGameMessage] = useState("Hãy nhấn phím hiển thị bên dưới!");

    // 2. State di chuyển ô vuông (X: ngang, Y: dọc)
    const [position, setPosition] = useState({ x: 50, y: 50 });

    // 3. State đổi màu nền bằng phím tắt
    const [isDarkBg, setIsDarkBg] = useState(false);

    // Hàm xử lý bắt phím toàn cục trên toàn màn hình
    function handleGlobalKeyDown(event) {
        const key = event.key.toLowerCase();

        // Thử thách 1: Game đoán phím
        if (targetKeys.includes(key)) {
            if (key === targetKey) {
                setGameMessage("🎉 Chuẩn xác! Đang chuyển phím tiếp theo...");
                // Chọn ngẫu nhiên phím mới
                const nextKey = targetKeys[Math.floor(Math.random() * targetKeys.length)];
                setTargetKey(nextKey);
            } else {
                setGameMessage(`❌ Sai rồi! Bạn vừa nhấn "${event.key}". Hãy thử lại!`);
            }
        }

        // Thử thách 2: Di chuyển ô vuông (mũi tên hoặc w,a,s,d)
        const step = 10;
        if (event.key === "ArrowUp") setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - step) }));
        if (event.key === "ArrowDown") setPosition(prev => ({ ...prev, y: Math.min(120, prev.y + step) }));
        if (event.key === "ArrowLeft") setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - step) }));
        if (event.key === "ArrowRight") setPosition(prev => ({ ...prev, x: Math.min(240, prev.x + step) }));

        // Thử thách 3: Phím tắt Ctrl + M (Nhấn giữ Ctrl và phím m) để bật/tắt chế độ tối màu
        if (event.ctrlKey && key === "m") {
            event.preventDefault(); // Ngăn trình duyệt mở tính năng mặc định nếu có
            setIsDarkBg(prev => !prev);
        }
    }

    return (
        <div 
            onKeyDown={handleGlobalKeyDown}
            tabIndex={0} // Ép div này nhận diện được sự kiện bàn phím khi nhấp chuột vào vùng làm việc
            style={{ 
                padding: "20px", 
                backgroundColor: isDarkBg ? "#2c3e50" : "#fff", 
                color: isDarkBg ? "#fff" : "#333",
                minHeight: "400px",
                outline: "none",
                border: "2px dashed #ccc"
            }}
        >
            <h2>Thử thách 5.3: Keyboard Events</h2>
            <p style={{ fontSize: "0.85rem", color: "gray" }}>⚠️ Click chuột vào khung viền đứt này trước khi bấm phím để kích hoạt vùng nhận diện sự kiện.</p>
            <p>💡 <strong>Phím tắt:</strong> Nhấn <code>Ctrl + M</code> để đổi màu nền giao diện.</p>

            <hr />

            {/* 1. Khu vực Game đoán phím */}
            <div>
                <h3>🎮 Trò chơi đoán phím</h3>
                <p>Phím cần bấm: <span style={{ fontSize: "2rem", color: "#e74c3c", fontWeight: "bold" }}>{targetKey.toUpperCase()}</span></p>
                <p>Trạng thái: <strong>{gameMessage}</strong></p>
            </div>

            <hr />

            {/* 2. Khu vực điều khiển ô vuông */}
            <h3>🕹️ Di chuyển ô vuông (Dùng các phím mũi tên ↑ ↓ ← →)</h3>
            <div style={{ position: "relative", width: "280px", height: "160px", background: "#eee", borderRadius: "8px", border: "1px solid #ddd" }}>
                <div 
                    style={{ 
                        position: "absolute", 
                        left: `${position.x}px`, 
                        top: `${position.y}px`, 
                        width: "30px", 
                        height: "30px", 
                        background: "#2ecc71", 
                        borderRadius: "4px",
                        transition: "0.1s ease" // Tạo hiệu ứng di chuyển mượt
                    }} 
                />
            </div>
        </div>
    );
}

export default KeyboardChallenge;
### BAI 5.4
function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
        ...formData,      
        [name]: value     
    });
}