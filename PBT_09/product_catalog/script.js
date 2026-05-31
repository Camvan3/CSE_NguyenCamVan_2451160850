// 1. Dữ liệu sản phẩm
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200x200/png?text=iPhone+16", rating: 4.9, inStock: true },
    { id: 2, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/200x200/png?text=MacBook", rating: 4.8, inStock: true },
    { id: 3, name: "Apple Watch S10", price: 10990000, category: "watch", image: "https://placehold.co/200x200/png?text=Watch", rating: 4.5, inStock: true },
    { id: 4, name: "iPad Pro M4", price: 28490000, category: "tablet", image: "https://placehold.co/200x200/png?text=iPad", rating: 4.7, inStock: false },
    { id: 5, name: "Samsung S24 Ultra", price: 26000000, category: "phone", image: "https://placehold.co/200x200/png?text=S24+Ultra", rating: 4.6, inStock: true },
    { id: 6, name: "Dell XPS 13", price: 35000000, category: "laptop", image: "https://placehold.co/200x200/png?text=Dell+XPS", rating: 4.4, inStock: true },
    { id: 7, name: "AirPods Pro 2", price: 6190000, category: "accessory", image: "https://placehold.co/200x200/png?text=AirPods", rating: 4.9, inStock: true },
    { id: 8, name: "Sony WH-1000XM5", price: 8490000, category: "accessory", image: "https://placehold.co/200x200/png?text=Sony+Headphone", rating: 4.8, inStock: true },
    { id: 9, name: "Garmin Fenix 7", price: 15000000, category: "watch", image: "https://placehold.co/200x200/png?text=Garmin", rating: 4.7, inStock: true },
    { id: 10, name: "Logitech MX Master 3S", price: 2500000, category: "accessory", image: "https://placehold.co/200x200/png?text=Mouse", rating: 4.9, inStock: true },
    { id: 11, name: "Asus ROG Zephyrus", price: 45000000, category: "laptop", image: "https://placehold.co/200x200/png?text=ROG", rating: 4.6, inStock: true },
    { id: 12, name: "Kindle Paperwhite", price: 3800000, category: "tablet", image: "https://placehold.co/200x200/png?text=Kindle", rating: 4.5, inStock: true },
];

let cartCount = 0;
let currentProducts = [...products];

// 2. Khởi tạo UI ban đầu
function initUI() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="cart-container">🛒<span class="badge" id="cart-badge">0</span></div>
        <h1>Tech Store</h1>
        <div class="controls">
            <input type="text" id="search" class="search-input" placeholder="Tìm tên sản phẩm...">
            <select id="category-filter">
                <option value="all">Tất cả danh mục</option>
                <option value="phone">Điện thoại</option>
                <option value="laptop">Laptop</option>
                <option value="watch">Đồng hồ</option>
                <option value="tablet">Máy tính bảng</option>
                <option value="accessory">Phụ kiện</option>
            </select>
            <select id="sort-filter">
                <option value="default">Sắp xếp</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="name-az">Tên A-Z</option>
                <option value="rating-desc">Đánh giá cao nhất</option>
            </select>
            <button id="theme-toggle" class="btn">🌓 Đổi chế độ</button>
        </div>
        <div id="product-grid" class="product-grid"></div>
        <div id="modal" class="modal"></div>
    `;

    // Gán sự kiện
    document.getElementById('search').addEventListener('input', handleSearch);
    document.getElementById('category-filter').addEventListener('change', handleFilter);
    document.getElementById('sort-filter').addEventListener('change', handleSort);
    document.getElementById('theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    
    renderProducts(products);
}

// 3. Logic Functions
function renderProducts(data) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "";

    data.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Giá: ${p.price.toLocaleString()}đ</p>
            <p>⭐ ${p.rating}</p>
            <button class="btn add-btn" data-id="${p.id}">Thêm giỏ</button>
        `;
        
        // Sự kiện click vào card (trừ nút "Thêm giỏ")
        card.addEventListener('click', (e) => {
            if(!e.target.classList.contains('add-btn')) showModal(p);
        });

        // Sự kiện thêm vào giỏ
        card.querySelector('.add-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            cartCount++;
            document.getElementById('cart-badge').innerText = cartCount;
        });

        grid.appendChild(card);
    });
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

function handleFilter(e) {
    const cat = e.target.value;
    currentProducts = cat === 'all' ? [...products] : products.filter(p => p.category === cat);
    renderProducts(currentProducts);
}

function handleSort(e) {
    const type = e.target.value;
    let sorted = [...currentProducts];
    if (type === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (type === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (type === 'name-az') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (type === 'rating-desc') sorted.sort((a, b) => b.rating - a.rating);
    renderProducts(sorted);
}

function showModal(p) {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${p.image}" style="width:100%">
            <h2>${p.name}</h2>
            <p><strong>Danh mục:</strong> ${p.category}</p>
            <p><strong>Giá:</strong> ${p.price.toLocaleString()} VNĐ</p>
            <p><strong>Trạng thái:</strong> ${p.inStock ? "Còn hàng" : "Hết hàng"}</p>
            <p><strong>Mô tả:</strong> Đây là sản phẩm công nghệ cao cấp nhất phân khúc.</p>
        </div>
    `;
    modal.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
}

// Chạy ứng dụng
initUI();