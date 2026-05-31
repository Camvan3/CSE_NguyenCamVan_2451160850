### BAI 4.1
import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);

    // Xác định màu sắc dựa trên giá trị count
    const getCountColor = () => {
        if (count > 0) return "green";
        if (count < 0) return "red";
        return "black";
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2 style={{ color: getCountColor() }}>Bộ đếm: {count}</h2>
            
            {/* Hiển thị trạng thái số âm/dương */}
            <p>Trạng thái: <strong>{count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Số không"}</strong></p>
            
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            
            {/* THỬ THÁCH: Thêm nút Tăng 5 */}
            <button onClick={() => setCount(count + 5)} style={{ fontWeight: "bold" }}>+5</button>
            
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
### BAI 4.2
import { useState } from "react";

function StringState() {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Kết hợp logic bài 4.3

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thử thách Input</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <input 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Nhập email..." 
                />
                {/* THỬ THÁCH: Đếm ký tự và validate email */}
                <p style={{ fontSize: "0.8rem" }}>{text.length}/100 ký tự</p>
                {text.includes("@") ? (
                    <span style={{ color: "green" }}>✅ Email hợp lệ</span>
                ) : (
                    text.length > 0 && <span style={{ color: "orange" }}>⚠️ Thiếu ký tự @</span>
                )}
            </div>

            {/* THỬ THÁCH: Ô nhập mật khẩu ẩn/hiện */}
            <div>
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Ẩn" : "Hiện"}
                </button>
            </div>
        </div>
    );
}

### BAI 4.3
import { useState } from "react";

function BooleanState() {
    const [isOn, setIsOn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ padding: "20px" }}>
            {/* THỬ THÁCH: Nút bật/tắt bóng đèn */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <div style={{ fontSize: "50px", filter: isOn ? "drop-shadow(0 0 10px yellow)" : "none" }}>
                    {isOn ? "💡" : "🌑"}
                </div>
                <button onClick={() => setIsOn(!isOn)}>
                    {isOn ? "TẮT" : "BẬT"}
                </button>
            </div>

            {/* THỬ THÁCH: Accordion đơn giản */}
            <div style={{ border: "1px solid #ddd", width: "300px" }}>
                <div 
                    onClick={() => setIsOpen(!isOpen)} 
                    style={{ background: "#eee", padding: "10px", cursor: "pointer", fontWeight: "bold" }}
                >
                    {isOpen ? "▼" : "▶"} Kiến thức React là gì?
                </div>
                {isOpen && (
                    <div style={{ padding: "10px", borderTop: "1px solid #ddd" }}>
                        React là thư viện JavaScript dùng để xây dựng giao diện người dùng (UI) dựa trên các Component.
                    </div>
                )}
            </div>
        </div>
    );
}
###  BAI 4.4
import { useState } from "react";

function FinalForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        // THỬ THÁCH: Validate tuổi
        const ageNum = parseInt(age);
        if (ageNum <= 0 || ageNum >= 100 || isNaN(ageNum)) {
            alert("Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
            return;
        }
        if (!email.includes("@")) {
            alert("Email không hợp lệ!");
            return;
        }
        setSubmitted(true);
    };

    return (
        <div style={{ padding: "20px" }}>
            {!submitted ? (
                <div>
                    <h2>Đăng ký tài khoản</h2>
                    <input placeholder="Tên" value={name} onChange={e => setName(e.target.value)} /><br/>
                    <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
                    <input type="number" placeholder="Tuổi" value={age} onChange={e => setAge(e.target.value)} /><br/>
                    <button onClick={handleSubmit} style={{ marginTop: "10px" }}>Đăng ký</button>
                    
                    {/* THỬ THÁCH: Hiển thị xin chào thời gian thực */}
                    {name && <p>Đang nhập: Xin chào <strong>{name}</strong>!</p>}
                </div>
            ) : (
                <div style={{ color: "green" }}>
                    <h3>✅ Đăng ký thành công!</h3>
                    <p>Chào mừng {name} ({email}) gia nhập hệ thống.</p>
                    <button onClick={() => setSubmitted(false)}>Làm lại</button>
                </div>
            )}
        </div>
    );
}
