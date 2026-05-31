### BAI 6.1
import { useState } from "react";

function ListBasics() {
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    // THỬ THÁCH: Tính tuổi trung bình bằng hàm reduce
    const averageAge = students.length > 0 
        ? (students.reduce((sum, s) => sum + s.age, 0) / students.length).toFixed(1)
        : 0;
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách sinh viên</h2>
            {students.map((student, index) => {
                // THỬ THÁCH: Sinh viên >= 20 tuổi hiển thị màu xanh lá
                const isAdult = student.age >= 20;
                
                return (
                    <div key={student.id} style={{ 
                        padding: "8px", 
                        margin: "5px 0",
                        background: "#f9f9f9",
                        color: isAdult ? "#27ae60" : "#333",
                        fontWeight: isAdult ? "bold" : "normal"
                    }}>
                        {/* THỬ THÁCH: Hiển thị số thứ tự (STT = index + 1) */}
                        {index + 1}. {student.name} - {student.age} tuổi
                    </div>
                );
            })}
            
            <div style={{ marginTop: "15px", padding: "10px", background: "#e8f4f8", borderRadius: "4px" }}>
                📊 <strong>Tuổi trung bình:</strong> {averageAge} tuổi
            </div>
        </div>
    );
}
export default ListBasics;

### BAI 6.2
import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    const [successMsg, setSuccessMsg] = useState(""); // State thông báo thành công
    const inputRef = useRef(null); // Ref để điều khiển ô input

    function handleAdd() {
        // THỬ THÁCH: Validate không cho phép thêm nếu chuỗi rỗng
        if (newName.trim() === "") {
            alert("Tên môn học không được để trống!");
            return;
        }
        
        const newItem = {
            id: Date.now(),
            name: newName.trim()
        };
        
        setItems([...items, newItem]);
        setNewName("");
        
        // THỬ THÁCH: Hiển thị thông báo thành công biến mất sau 2 giây
        setSuccessMsg("🎉 Đã thêm môn học thành công!");
        setTimeout(() => setSuccessMsg(""), 2000);

        // THỬ THÁCH: Tự động đưa con trỏ chuột (Focus) lại vào ô input
        inputRef.current.focus();
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Thêm môn học</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <input 
                    ref={inputRef} // Gắn ref vào input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Nhập tên môn học..."
                    style={{ padding: "8px", marginRight: "10px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px" }}>➕ Thêm</button>
            </div>

            {successMsg && <p style={{ color: "green", fontWeight: "bold" }}>{successMsg}</p>}
            
            <h3>Danh sách ({items.length} môn):</h3>
            {items.map(item => <div key={item.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.name}</div>)}
        </div>
    );
}
export default CreateItem;
### BAI 6.3
import { useState, useRef } from "react";

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    const [alertMsg, setAlertMsg] = useState("");
    const lastDeletedItem = useRef(null); // Lưu trữ tạm thời phần tử vừa xóa để Undo
    const undoTimeout = useRef(null);

    function handleDelete(id, name) {
        // THỬ THÁCH: Chỉ cho xóa khi người dùng bấm Confirm xác nhận
        if (!window.confirm(`Bạn có chắc chắn muốn xóa sinh viên ${name}?`)) return;

        // Lưu lại vị trí và dữ liệu để phục vụ tính năng Hoàn tác
        const itemToDelete = items.find(item => item.id === id);
        lastDeletedItem.current = itemToDelete;

        // Tiến hành lọc bỏ phần tử (Xóa)
        setItems(items.filter(item => item.id !== id));
        
        // THỬ THÁCH: Hiện thông báo và nút Hoàn tác trong 5 giây
        setAlertMsg(`❌ Đã xóa sinh viên ${name}.`);
        
        if (undoTimeout.current) clearTimeout(undoTimeout.current);
        undoTimeout.current = setTimeout(() => {
            setAlertMsg("");
            lastDeletedItem.current = null;
        }, 5000);
    }

    // THỬ THÁCH: Hàm Hoàn tác (Undo) khôi phục lại mảng cũ
    function handleUndo() {
        if (lastDeletedItem.current) {
            setItems(prev => [...prev, lastDeletedItem.current].sort((a, b) => a.id - b.id));
            setAlertMsg("🔙 Đã khôi phục thành công!");
            lastDeletedItem.current = null;
            clearTimeout(undoTimeout.current);
            setTimeout(() => setAlertMsg(""), 2000);
        }
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Quản lý xóa sinh viên</h2>
            
            {alertMsg && (
                <div style={{ background: "#fff3cd", padding: "10px", marginBottom: "15px", borderRadius: "4px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <span>{alertMsg}</span>
                    {lastDeletedItem.current && (
                        <button onClick={handleUndo} style={{ background: "#3498db", color: "white", border: "none", padding: "3px 8px", borderRadius: "4px", cursor: "pointer" }}>
                            Hoàn tác (5s)
                        </button>
                    )}
                </div>
            )}
            
            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Danh sách trống</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", margin: "5px 0", background: "#f9f9f9" }}>
                        <span>{item.name}</span>
                        <button onClick={() => handleDelete(item.id, item.name)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}>Xóa</button>
                    </div>
                ))
            )}
        </div>
    );
}
export default DeleteItem;
### BAI 6.4
import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 }
    ]);
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [successId, setSuccessId] = useState(null); // State lưu id vừa sửa xong để báo "Đã lưu!"

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
        setSuccessId(null);
    }
    
    function saveEdit() {
        // THỬ THÁCH: Validate không cho phép lưu nếu tên trống hoặc tuổi rỗng
        if (editName.trim() === "" || editAge.trim() === "") {
            alert("Vui lòng nhập đầy đủ thông tin trước khi lưu!");
            return;
        }
        
        // Sử dụng mảng .map() để tìm và cập nhật chính xác object cần sửa
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName.trim(), age: parseInt(editAge) }
                : item
        ));
        
        setSuccessId(editingId); // Báo hiệu sửa thành công phần tử này
        setEditingId(null);
        
        // Ẩn chữ "Đã lưu!" sau 2 giây
        setTimeout(() => setSuccessId(null), 2000);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Sửa thông tin sinh viên</h2>
            
            {items.map(item => (
                <div key={item.id} style={{ padding: "10px", margin: "5px 0", background: "#f9f9f9", borderRadius: "5px" }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            {/* THỬ THÁCH: Highlight ô input bằng border màu xanh blue nổi bật */}
                            <input 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" ? saveEdit() : e.key === "Escape" && setEditingId(null)}
                                autoFocus
                                style={{ padding: "6px", border: "2px solid #3498db", borderRadius: "4px", outline: "none" }}
                            />
                            <input 
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" ? saveEdit() : e.key === "Escape" && setEditingId(null)}
                                style={{ padding: "6px", border: "2px solid #3498db", borderRadius: "4px", width: "60px", outline: "none" }}
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer" }}>✓ Lưu</button>
                            <button onClick={() => setEditingId(null)} style={{ background: "#95a5a6", color: "white", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer" }}>✕ Hủy</button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>
                                {item.name} - {item.age} tuổi 
                                {/* THỬ THÁCH: Hiển thị nhãn Đã lưu sau khi hoàn thành cập nhật */}
                                {successId === item.id && <span style={{ color: "#27ae60", marginLeft: "10px", fontWeight: "bold" }}>✓ Đã lưu!</span>}
                            </span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>✏️ Sửa</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
export default UpdateItem;