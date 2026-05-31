// 1. Khởi tạo toàn bộ giao diện Form bằng JS (100% Content Render)
function initForm() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="form-container">
            <h2>Đăng Ký Tài Khoản</h2>
            <form id="register-form" autocomplete="off">
                <div class="form-group">
                    <label for="username">Họ và tên</label>
                    <div class="input-wrapper">
                        <input type="text" id="username" placeholder="Nhập từ 2 - 50 ký tự">
                        <span id="username-icon" class="status-icon"></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input type="text" id="email" placeholder="example@gmail.com">
                        <span id="email-icon" class="status-icon"></span>
                    </div>
                    <div id="email-error" class="error-msg">Email không đúng định dạng.</div>
                </div>

                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <div class="input-wrapper">
                        <input type="password" id="password" placeholder="Nhập mật khẩu">
                        <span id="password-icon" class="status-icon"></span>
                    </div>
                    <div class="strength-meter">
                        <div id="strength-bar" class="strength-bar"></div>
                    </div>
                    <span id="strength-text" class="strength-text"></span>
                </div>

                <div class="form-group">
                    <label for="confirm-pass">Xác nhận mật khẩu</label>
                    <div class="input-wrapper">
                        <input type="password" id="confirm-pass" placeholder="Nhập lại mật khẩu">
                        <span id="confirm-pass-icon" class="status-icon"></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <div class="input-wrapper">
                        <input type="text" id="phone" placeholder="0901-234-567" maxlength="12">
                        <span id="phone-icon" class="status-icon"></span>
                    </div>
                </div>

                <button type="submit" id="submit-btn" disabled>Đăng ký</button>
            </form>
        </div>

        <div id="success-modal" class="modal">
            <div class="modal-content">
                <h3>✅ Đăng ký thành công!</h3>
                <div id="modal-info"></div>
                <button id="close-modal-btn" style="margin-top:15px; padding:8px 20px; cursor:pointer;">Đóng</button>
            </div>
        </div>
    `;

    // Gán sự kiện lắng nghe (Real-time input)
    document.getElementById('username').addEventListener('input', validateUsername);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', handlePasswordInput);
    document.getElementById('confirm-pass').addEventListener('input', validateConfirmPassword);
    document.getElementById('phone').addEventListener('input', handlePhoneInput);
    document.getElementById('register-form').addEventListener('submit', handleSubmit);
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('success-modal').classList.remove('show');
    });
}

// 2. Các hàm kiểm tra dữ liệu trạng thái (State Validation)
let validState = { username: false, email: false, password: false, confirmPass: false, phone: false };

function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    const allValid = Object.values(validState).every(state => state === true);
    submitBtn.disabled = !allValid;
}

function setStatusStyles(inputEl, iconEl, isValid) {
    if (inputEl.value.trim() === "") {
        iconEl.innerText = "";
        inputEl.style.borderColor = "#ccc";
        return;
    }
    if (isValid) {
        iconEl.innerText = "✅";
        inputEl.style.borderColor = "var(--success-color)";
    } else {
        iconEl.innerText = "❌";
        inputEl.style.borderColor = "var(--error-color)";
    }
}

// 3. Logic Validate chi tiết từng trường
function validateUsername() {
    const input = document.getElementById('username');
    const icon = document.getElementById('username-icon');
    const len = input.value.trim().length;
    
    validState.username = len >= 2 && len <= 50;
    setStatusStyles(input, icon, validState.username);
    updateSubmitButton();
}

function validateEmail() {
    const input = document.getElementById('email');
    const icon = document.getElementById('email-icon');
    const error = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    validState.email = emailRegex.test(input.value);
    setStatusStyles(input, icon, validState.email);
    error.style.display = (input.value !== "" && !validState.email) ? "block" : "none";
    updateSubmitButton();
}

function handlePasswordInput() {
    validatePasswordStrength();
    validateConfirmPassword(); // Check lại confirm password phòng trường hợp đổi pass chính
}

function validatePasswordStrength() {
    const input = document.getElementById('password');
    const icon = document.getElementById('password-icon');
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    const val = input.value;

    let strength = 0;
    if (val.length === 0) {
        bar.style.width = "0%";
        text.innerText = "";
        validState.password = false;
        setStatusStyles(input, icon, false);
        return;
    }

    // Các tiêu chí regex định vị strength
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasDigit = /\d/.test(val);
    const hasCaps = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    if (val.length < 8) {
        strength = 1; // Yếu
    } else if (val.length >= 8 && hasLetter && hasDigit && !(hasCaps && hasLower && hasSpecial)) {
        strength = 2; // Trung bình
    } else if (val.length >= 8 && hasCaps && hasLower && hasDigit && hasSpecial) {
        strength = 3; // Mạnh
    } else {
        strength = 1; // Trường hợp >= 8 kí tự nhưng chỉ toàn số hoặc toàn chữ
    }

    // Cập nhật Progress Bar UI
    if (strength === 1) {
        bar.style.width = "33%";
        bar.style.backgroundColor = "var(--error-color)";
        text.innerText = "Yếu (Đỏ)";
        text.style.color = "var(--error-color)";
        validState.password = false; // Yếu thì không cho submit
    } else if (strength === 2) {
        bar.style.width = "66%";
        bar.style.backgroundColor = "var(--warning-color)";
        text.innerText = "Trung bình (Vàng)";
        text.style.color = "var(--warning-color)";
        validState.password = true;
    } else if (strength === 3) {
        bar.style.width = "100%";
        bar.style.backgroundColor = "var(--success-color)";
        text.innerText = "Mạnh (Xanh)";
        text.style.color = "var(--success-color)";
        validState.password = true;
    }

    setStatusStyles(input, icon, validState.password);
    updateSubmitButton();
}

function validateConfirmPassword() {
    const passInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-pass');
    const icon = document.getElementById('confirm-pass-icon');

    validState.confirmPass = confirmInput.value !== "" && passInput.value === confirmInput.value;
    setStatusStyles(confirmInput, icon, validState.confirmPass);
    updateSubmitButton();
}

function handlePhoneInput(e) {
    const input = document.getElementById('phone');
    const icon = document.getElementById('phone-icon');
    
    // Loại bỏ mọi ký tự không phải số
    let numStr = input.value.replace(/\D/g, "");
    
    // Định dạng real-time thêm dấu gạch nối: 0901-234-567
    if (numStr.length > 4 && numStr.length <= 7) {
        numStr = `${numStr.slice(0, 4)}-${numStr.slice(4)}`;
    } else if (numStr.length > 7) {
        numStr = `${numStr.slice(0, 4)}-${numStr.slice(4, 7)}-${numStr.slice(7, 10)}`;
    }
    
    input.value = numStr;

    // Check độ dài số thực nhận (bỏ dấu gạch) có đúng 10 số không
    const clearNum = numStr.replace(/-/g, "");
    validState.phone = clearNum.length === 10;
    setStatusStyles(input, icon, validState.phone);
    updateSubmitButton();
}

// 4. Submit & Render Modal thành công
function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    const modal = document.getElementById('success-modal');
    const modalInfo = document.getElementById('modal-info');
    
    modalInfo.innerHTML = `
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
    `;
    
    modal.classList.add('show');
    
    // Reset form sau khi submit thành công
    document.getElementById('register-form').reset();
    // Reset state & icon
    Object.keys(validState).forEach(key => validState[key] = false);
    document.querySelectorAll('.status-icon').forEach(icon => icon.innerText = "");
    document.querySelectorAll('input').forEach(input => input.style.borderColor = "#ccc");
    document.getElementById('strength-bar').style.width = "0%";
    document.getElementById('strength-text').innerText = "";
    updateSubmitButton();
}

// Khởi tạo chạy ứng dụng
initForm();