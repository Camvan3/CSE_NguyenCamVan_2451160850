// 1. Dữ liệu Gallery & Commands mẫu
const images = [
    { id: 1, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", title: "Thung lũng Yosemite" },
    { id: 2, url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600", title: "Cánh đồng sương mù" },
    { id: 3, url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600", title: "Con đường rừng thu" },
    { id: 4, url: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=600", title: "Thảo nguyên xanh" }
];

const commands = [
    { name: "Chuyển sang ảnh kế tiếp", action: () => nextImage() },
    { name: "Quay lại ảnh trước đó", action: () => prevImage() },
    { name: "Bật/Tắt Tự động phát", action: () => toggleSlideshow() },
    { name: "Đổi nền trang sang Màu Tối", action: () => document.body.style.background = "#334155" },
    { name: "Đổi nền trang sang Màu Sáng", action: () => document.body.style.background = "#f8fafc" }
];

let currentIndex = 0;
let isPlaying = false;
let slideshowInterval = null;
let selectedCommandIndex = 0;
let filteredCommands = [...commands];

// 2. Khởi tạo Giao diện (100% JS)
function initApp() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="instructions">
            <strong>⌨️ Phím tắt Hệ thống:</strong><br>
            • <kbd>←</kbd> <kbd>→</kbd> : Chuyển ảnh | 
            • <kbd>1</kbd> - <kbd>4</kbd> : Nhảy nhanh đến số ảnh<br>
            • <kbd>Space</kbd> : Chạy/Dừng slideshow | 
            • <kbd>Ctrl</kbd> + <kbd>K</kbd> : Mở ô tìm kiếm lệnh (Command Palette)<br>
            • Trong tìm kiếm: dùng <kbd>↑</kbd> <kbd>↓</kbd> để chọn, <kbd>Enter</kbd> để chạy, <kbd>Esc</kbd> để đóng.
        </div>

        <div class="gallery-container" role="region" aria-label="Bộ sưu tập ảnh tương tác">
            <img id="gallery-img" class="main-img" src="" alt="" aria-live="polite">
            <h3 id="gallery-title"></h3>
            <p id="gallery-status" aria-live="polite"></p>
            <div class="controls">
                <button class="btn" id="btn-prev" aria-label="Ảnh trước">◀ Trước</button>
                <button class="btn" id="btn-play" aria-label="Tự động chạy slideshow">Play</button>
                <button class="btn" id="btn-next" aria-label="Ảnh sau">Sau ▶</button>
            </div>
        </div>

        <div id="palette" class="palette-overlay" role="dialog" aria-modal="true" aria-label="Bảng lệnh điều khiển nhanh">
            <div class="palette-box">
                <input type="text" id="palette-search" class="palette-input" placeholder="Gõ lệnh tìm kiếm... (Ví dụ: Chuyển, Đổi, Màu...)" aria-autocomplete="list">
                <ul id="command-list" class="command-list" role="listbox"></ul>
            </div>
        </div>
    `;

    // Gán sự kiện click cho các nút điều khiển trực quan
    document.getElementById('btn-prev').addEventListener('click', prevImage);
    document.getElementById('btn-next').addEventListener('click', nextImage);
    document.getElementById('btn-play').addEventListener('click', toggleSlideshow);
    document.getElementById('palette-search').addEventListener('input', handleCommandSearch);

    // Bắt sự kiện bàn phím toàn trang
    window.addEventListener('keydown', handleGlobalKeydown);

    // Cập nhật hiển thị ảnh đầu tiên
    updateGallery();
}

// 3. Logic Gallery
function updateGallery() {
    const img = document.getElementById('gallery-img');
    const title = document.getElementById('gallery-title');
    const status = document.getElementById('gallery-status');
    
    img.src = images[currentIndex].url;
    img.alt = `Ảnh số ${currentIndex + 1}: ${images[currentIndex].title}`;
    title.innerText = images[currentIndex].title;
    status.innerText = `Ảnh ${currentIndex + 1} trên tổng số ${images.length}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
}

function toggleSlideshow() {
    const btn = document.getElementById('btn-play');
    if (isPlaying) {
        clearInterval(slideshowInterval);
        btn.innerText = "Play";
        btn.setAttribute('aria-label', "Tự động chạy slideshow");
    } else {
        slideshowInterval = setInterval(nextImage, 2000);
        btn.innerText = "Pause";
        btn.setAttribute('aria-label', "Tạm dừng slideshow");
    }
    isPlaying = !isPlaying;
}

// 4. Logic Command Palette
function openCommandPalette() {
    const palette = document.getElementById('palette');
    const searchInput = document.getElementById('palette-search');
    palette.classList.add('open');
    searchInput.value = "";
    searchInput.focus(); // Đưa focus trực tiếp vào ô input (Focus management)
    renderCommands(commands);
}

function closeCommandPalette() {
    document.getElementById('palette').classList.remove('open');
}

function renderCommands(cmdArray) {
    const list = document.getElementById('command-list');
    list.innerHTML = "";
    filteredCommands = cmdArray;

    if (filteredCommands.length === 0) {
        list.innerHTML = `<li class="command-item" style="color: #64748b">Không tìm thấy lệnh nào...</li>`;
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement('li');
        li.className = `command-item ${idx === selectedCommandIndex ? 'selected' : ''}`;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', idx === selectedCommandIndex ? 'true' : 'false');
        li.innerHTML = `<span>${cmd.name}</span> <kbd>↵ Enter</kbd>`;
        
        li.addEventListener('click', () => {
            cmd.action();
            closeCommandPalette();
        });
        list.appendChild(li);
    });
}

function handleCommandSearch(e) {
    const term = e.target.value.toLowerCase();
    const matches = commands.filter(c => c.name.toLowerCase().includes(term));
    selectedCommandIndex = 0; // Reset con trỏ lựa chọn về đầu
    renderCommands(matches);
}

// 5. Xử lý Sự Kiện Phím Tắt (Core Logic)
function handleGlobalKeydown(e) {
    const palette = document.getElementById('palette');
    const isPaletteOpen = palette.classList.contains('open');

    // Phím tắt bất kỳ lúc nào: Ctrl + K để mở Palette
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
        return;
    }

    // A. Xử lý khi Command Palette ĐANG MỞ
    if (isPaletteOpen) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeCommandPalette();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
            renderCommands(filteredCommands);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommands(filteredCommands);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedCommandIndex]) {
                filteredCommands[selectedCommandIndex].action();
                closeCommandPalette();
            }
        }
        return; // Chặn không cho tác động tới Gallery khi đang mở bảng lệnh
    }

    // B. Xử lý phím tắt cho Gallery (Khi đóng bảng lệnh, ô input không được active)
    if (document.activeElement.tagName !== 'INPUT') {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === ' ') {
            e.preventDefault(); // Chặn hành vi scroll trang mặc định của phím Space
            toggleSlideshow();
        } else if (e.key >= '1' && e.key <= '9') {
            const num = parseInt(e.key) - 1;
            if (num < images.length) {
                currentIndex = num;
                updateGallery();
            }
        }
    }
}

// Chạy ứng dụng
initApp();