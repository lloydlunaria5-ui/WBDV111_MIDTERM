
const cakeData = [
    { id: 1, name: "Strawberry Dream", price: 850.00, category: "Fruity", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400", bestSeller: true },
    { id: 2, name: "Chocolate Fudge", price: 950.00, category: "Chocolate", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", bestSeller: true },
    { id: 3, name: "Vanilla Bean", price: 750.00, category: "Classic", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400", bestSeller: false },
    { id: 4, name: "Red Velvet", price: 900.00, category: "Classic", image: "https://images.unsplash.com/photo-1586788680434-30d324626f8a?w=400", bestSeller: true },
    { id: 5, name: "Lemon Zest", price: 800.00, category: "Fruity", image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=400", bestSeller: false },
    { id: 6, name: "Mango Tango", price: 880.00, category: "Fruity", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400", bestSeller: true },
    { id: 7, name: "Dark Ganache", price: 1100.00, category: "Chocolate", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400", bestSeller: false },
    { id: 8, name: "Caramel Swirl", price: 920.00, category: "Caramel", image: "https://images.unsplash.com/photo-1543508168-1f31b4601833?w=400", bestSeller: true },
    { id: 9, name: "Blueberry Bliss", price: 870.00, category: "Fruity", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400", bestSeller: false },
    { id: 10, name: "Coffee Mocha", price: 890.00, category: "Coffee", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400", bestSeller: true },
    { id: 11, name: "Matcha Green Tea", price: 950.00, category: "Tea", image: "https://images.unsplash.com/photo-1505253758473-96b701d2cd03?w=400", bestSeller: false },
    { id: 12, name: "Salted Caramel", price: 980.00, category: "Caramel", image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=400", bestSeller: true }
];


let cart = JSON.parse(localStorage.getItem('velvetCart')) || [];
let currentUser = localStorage.getItem('velvetUser') || null;


const bannerImages = [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200",
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200",
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1200"
];
let currentBanner = 0;


document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initCarousel();
    renderBestSellers();
    renderCakes();
    setupEventListeners();
});


function initCarousel() {
    const carouselImg = document.getElementById('carousel-img');
    if (!carouselImg) return;

   
    setInterval(() => {
        nextBanner();
    }, 5000);

   
    document.getElementById('prev-btn')?.addEventListener('click', prevBanner);
    document.getElementById('next-btn')?.addEventListener('click', nextBanner);
}

function nextBanner() {
    currentBanner = (currentBanner + 1) % bannerImages.length;
    updateBanner();
}

function prevBanner() {
    currentBanner = (currentBanner - 1 + bannerImages.length) % bannerImages.length;
    updateBanner();
}

function goToBanner(index) {
    currentBanner = index;
    updateBanner();
}

function updateBanner() {
    const img = document.getElementById('carousel-img');
    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = bannerImages[currentBanner];
            img.style.opacity = '1';
        }, 200);
    }

    
    document.querySelectorAll('.thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentBanner);
    });
}


function renderBestSellers() {
    const track = document.getElementById('best-sellers-track');
    if (!track) return;

    const bestSellers = cakeData.filter(cake => cake.bestSeller);
    
    track.innerHTML = bestSellers.map(cake => `
        <div class="best-seller-card" onclick="openModal(${cake.id})">
            <img src="${cake.image}" alt="${cake.name}">
            <h3>${cake.name}</h3>
            <p class="price">₱${cake.price.toFixed(2)}</p>
            <span class="category-tag">${cake.category}</span>
        </div>
    `).join('');

    document.getElementById('best-sellers-prev')?.addEventListener('click', () => {
        track.scrollBy({ left: -280, behavior: 'smooth' });
    });

    document.getElementById('best-sellers-next')?.addEventListener('click', () => {
        track.scrollBy({ left: 280, behavior: 'smooth' });
    });
}


function renderCakes(searchTerm = '', categoryFilter = '') {
    const grid = document.getElementById('full-grid');
    if (!grid) return;

    let filtered = cakeData;

    if (searchTerm) {
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(searchTerm) || 
            c.category.toLowerCase().includes(searchTerm)
        );
    }

    if (categoryFilter) {
        filtered = filtered.filter(c => c.category === categoryFilter);
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; font-size:1.2rem; color:var(--text-secondary);">No cakes found 🧁</p>';
        return;
    }

    grid.innerHTML = filtered.map(cake => `
        <div class="cake-card" onclick="openModal(${cake.id})">
            <img src="${cake.image}" alt="${cake.name}" style="width:100%; height:200px; object-fit:cover; border-radius:16px; margin-bottom:1rem; border:3px solid var(--secondary);">
            <h3>${cake.name}</h3>
            <p class="cake-price">₱${cake.price.toFixed(2)}</p>
            <span class="category-tag">${cake.category}</span>
        </div>
    `).join('');
}


let selectedCake = null;

function openModal(cakeId) {
    selectedCake = cakeData.find(c => c.id === cakeId);
    if (!selectedCake) return;

    const modal = document.getElementById('cart-modal');
    const msg = document.getElementById('modal-msg');
    const qtyBox = document.getElementById('qty-box');

    if (msg) msg.textContent = `Add ${selectedCake.name} to cart?`;
    if (qtyBox) qtyBox.style.display = 'block';
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.style.display = 'none';
    selectedCake = null;
}

function confirmAddToCart() {
    if (!selectedCake) return;

    const qtyInput = document.getElementById('item-qty');
    const qty = parseInt(qtyInput?.value) || 1;

    
    const existing = cart.find(item => item.id === selectedCake.id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...selectedCake, qty: qty });
    }

    saveCart();
    updateCartCount();
    showToast(`Added ${qty}x ${selectedCake.name} to cart! 🎂`);
    closeModal();

    
    if (qtyInput) qtyInput.value = 1;
}


function saveCart() {
    localStorage.setItem('velvetCart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

function renderCart() {
    const tbody = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    
    if (!tbody) return;

    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:2rem; color:var(--text-secondary);">Your cart is empty 🧁</td></tr>';
        if (totalEl) totalEl.textContent = '₱0.00';
        return;
    }

    tbody.innerHTML = cart.map((item, index) => `
        <tr>
            <td style="display:flex; align-items:center; gap:1rem;">
                <img src="${item.image}" style="width:60px; height:60px; object-fit:cover; border-radius:10px; border:2px solid var(--secondary);">
                <span style="font-weight:600;">${item.name}</span>
            </td>
            <td>${item.qty}</td>
            <td>₱${(item.price * item.qty).toFixed(2)}</td>
            <td>
                <button onclick="removeFromCart(${index})" style="background:var(--primary); color:white; border:none; padding:0.5rem 1rem; border-radius:20px; cursor:pointer; font-weight:600;">Remove</button>
            </td>
        </tr>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (totalEl) totalEl.textContent = '₱' + total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
    showToast('Item removed from cart');
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Clear your entire cart? 🧁')) {
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
        showToast('Cart cleared!');
    }
}


function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}


function fakeLogin(email) {
    currentUser = email;
    localStorage.setItem('velvetUser', email);
    showToast(`Welcome back! 🎂`);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('velvetUser');
    showToast('Logged out successfully');
}


function setupEventListeners() {
    
    document.getElementById('modal-yes')?.addEventListener('click', confirmAddToCart);
    document.getElementById('modal-no')?.addEventListener('click', closeModal);

    
    document.getElementById('cart-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'cart-modal') closeModal();
    });

   
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            renderCakes('', category);
        });
    });

   
    document.getElementById('home-search')?.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
       
        const track = document.getElementById('best-sellers-track');
        if (track && term) {
            const cards = track.querySelectorAll('.best-seller-card');
            cards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = name.includes(term) ? 'block' : 'none';
            });
        } else if (track) {
            track.querySelectorAll('.best-seller-card').forEach(c => c.style.display = 'block');
        }
    });

   
    if (document.getElementById('cart-items')) {
        renderCart();
    }
}