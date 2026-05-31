// --- QUẢN LÝ DỮ LIỆU (STATE & LOCALSTORAGE) ---
let todos = JSON.parse(localStorage.getItem('vanilla_todos')) || [];
let currentFilter = 'all'; // Có thể là 'all', 'active', 'completed'

// --- CÁC ĐỐI TƯỢNG DOM ---
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const todoFilters = document.getElementById('todoFilters');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// --- HÀM LƯU LOCALSTORAGE ---
function saveToLocalStorage() {
    localStorage.setItem('vanilla_todos', JSON.stringify(todos));
}

// --- HÀM RENDER (ỨNG DỤNG CREAT ELEMENT CHÍNH XÁC) ---
function render() {
    // Xóa sạch list cũ trước khi render lại
    todoList.innerHTML = '';

    // Lọc dữ liệu theo filter hiện tại
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // 'all'
    });

    // Tạo các element bằng createElement (Không dùng innerHTML bừa bãi)
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.id = todo.id; // Gắn ID vào dataset để quản lý dữ liệu
        if (todo.completed) {
            li.classList.add('completed');
        }

        // Tạo phần text hiển thị
        const label = document.createElement('label');
        label.className = 'todo-text';
        label.textContent = todo.text;

        // Tạo nút xóa ❌
        const destroyBtn = document.createElement('button');
        destroyBtn.className = 'destroy-btn';
        destroyBtn.textContent = '❌';

        // Tạo ô input ẩn phục vụ cho tính năng Edit (Double Click)
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        // Gắn các con vào thẻ li
        li.appendChild(label);
        li.appendChild(destroyBtn);
        li.appendChild(editInput);

        // Đẩy li vào ul chính
        todoList.appendChild(li);
    });

    // Cập nhật số lượng items còn lại và hiển thị các nút chức năng
    updateFooter();
}

// Cập nhật Footer (Bộ đếm & Nút xóa Completed)
function updateFooter() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

    // Nếu không có todo nào đã hoàn thành thì ẩn nút 'Clear completed'
    const hasCompleted = todos.some(todo => todo.completed);
    clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
}

// --- CHỨC NĂNG 1: THÊM TODO ---
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Chặn việc reload trang mặc định của form
    const text = todoInput.value.trim();
    
    if (text !== '') {
        const newTodo = {
            id: Date.now().toString(), // Tạo ID độc nhất dựa trên timestamp
            text: text,
            completed: false
        };
        todos.push(newTodo);
        saveToLocalStorage();
        todoInput.value = ''; // Reset ô nhập
        render();
    }
});

// --- CHỨC NĂNG 2, 3, 4: EVENT DELEGATION (BẮT SỰ KIỆN TẠI #todoList) ---
todoList.addEventListener('click', function(e) {
    const target = e.target;
    const li = target.closest('li');
    if (!li) return;
    const id = li.dataset.id;

    // A. Toggle Completed (Khi click vào Label chữ)
    if (target.classList.contains('todo-text')) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveToLocalStorage();
        render();
    }

    // B. Xóa Todo (Khi click vào nút ❌)
    if (target.classList.contains('destroy-btn')) {
        todos = todos.filter(todo => todo.id !== id);
        saveToLocalStorage();
        render();
    }
});

// --- CHỨC NĂNG 5: EDIT TODO (DOUBLE CLICK & ENTER TO SAVE) ---
// Đăng ký sự kiện dblclick qua Event Delegation lên #todoList
todoList.addEventListener('dblclick', function(e) {
    const target = e.target;
    if (target.classList.contains('todo-text')) {
        const li = target.closest('li');
        li.classList.add('editing');
        
        const editInput = li.querySelector('.edit-input');
        editInput.focus();
        // Đặt con trỏ chuột ở cuối dòng chữ
        const length = editInput.value.length;
        editInput.setSelectionRange(length, length);
    }
});

// Lắng nghe sự kiện lưu nội dung sửa đổi (khi nhấn Enter hoặc Blur ra ngoài)
todoList.addEventListener('keydown', function(e) {
    const target = e.target;
    if (target.classList.contains('edit-input') && e.key === 'Enter') {
        saveEdit(target);
    }
});

todoList.addEventListener('focusout', function(e) {
    const target = e.target;
    if (target.classList.contains('edit-input')) {
        saveEdit(target);
    }
});

function saveEdit(inputElement) {
    const li = inputElement.closest('li');
    if (!li.classList.contains('editing')) return; // Tránh chạy 2 lần song song (Enter & Blur)

    const id = li.dataset.id;
    const updatedValue = inputElement.value.trim();

    if (updatedValue === '') {
        // Nếu xóa hết text thì coi như hành động xóa Todo đó luôn
        todos = todos.filter(todo => todo.id !== id);
    } else {
        // Cập nhật lại text mới
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: updatedValue };
            }
            return todo;
        });
    }
    
    li.classList.remove('editing');
    saveToLocalStorage();
    render();
}

// --- CHỨC NĂNG 6: FILTER (ALL / ACTIVE / COMPLETED) ---
todoFilters.addEventListener('click', function(e) {
    const target = e.target;
    if (target.classList.contains('filter-btn')) {
        // Đổi class active cho nút vừa click
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        // Gán trạng thái filter hiện tại và render lại giao diện
        currentFilter = target.dataset.filter;
        render();
    }
});

// --- CHỨC NĂNG 7: CLEAR COMPLETED ---
clearCompletedBtn.addEventListener('click', function() {
    todos = todos.filter(todo => !todo.completed); // Chỉ giữ lại các items chưa hoàn thành
    saveToLocalStorage();
    render();
});

// --- CHẠY LẦN ĐẦU KHI TẢI TRANG ---
render();