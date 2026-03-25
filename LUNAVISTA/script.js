// Room Data for Luna Vista with Real Images
const roomData = [
    { 
        id: 1, 
        name: "Ocean View Suite", 
        price: 5500.00, 
        type: "Suite", 
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
        amenities: ["Ocean View", "King Bed", "Jacuzzi", "Balcony"],
        featured: true,
        maxGuests: 4
    },
    { 
        id: 2, 
        name: "Garden Villa", 
        price: 4800.00, 
        type: "Villa", 
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        amenities: ["Private Garden", "Queen Bed", "Kitchen", "Patio"],
        featured: true,
        maxGuests: 3
    },
    { 
        id: 3, 
        name: "Skyline Penthouse", 
        price: 8500.00, 
        type: "Penthouse", 
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400",
        amenities: ["City View", "King Bed", "Rooftop", "Butler"],
        featured: true,
        maxGuests: 6
    },
    { 
        id: 4, 
        name: "Tropical Bungalow", 
        price: 4200.00, 
        type: "Bungalow", 
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
        amenities: ["Beach Access", "Queen Bed", "Hammock", "Outdoor Shower"],
        featured: false,
        maxGuests: 2
    },
    { 
        id: 5, 
        name: "Mountain Cabin", 
        price: 3800.00, 
        type: "Cabin", 
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=400",
        amenities: ["Fireplace", "Queen Bed", "Forest View", "Hot Tub"],
        featured: false,
        maxGuests: 4
    },
    { 
        id: 6, 
        name: "Poolside Deluxe", 
        price: 5200.00, 
        type: "Deluxe", 
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        amenities: ["Private Pool", "King Bed", "Mini Bar", "Lounge"],
        featured: true,
        maxGuests: 3
    },
    { 
        id: 7, 
        name: "Sunset Studio", 
        price: 3200.00, 
        type: "Studio", 
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400",
        amenities: ["Sunset View", "Queen Bed", "Workspace", "Kitchenette"],
        featured: false,
        maxGuests: 2
    },
    { 
        id: 8, 
        name: "Royal Presidential", 
        price: 12000.00, 
        type: "Presidential", 
        image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=400",
        amenities: ["Panoramic View", "King Bed", "Dining Room", "Spa"],
        featured: true,
        maxGuests: 4
    },
    { 
        id: 9, 
        name: "Zen Garden Room", 
        price: 3600.00, 
        type: "Standard", 
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400",
        amenities: ["Garden View", "Queen Bed", "Tea Set", "Meditation"],
        featured: false,
        maxGuests: 2
    },
    { 
        id: 10, 
        name: "Family Suite", 
        price: 6800.00, 
        type: "Suite", 
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400",
        amenities: ["2 Bedrooms", "Living Area", "Kitchen", "Games"],
        featured: false,
        maxGuests: 6
    },
    { 
        id: 11, 
        name: "Honeymoon Haven", 
        price: 7500.00, 
        type: "Suite", 
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
        amenities: ["Romantic Decor", "King Bed", "Champagne", "Tub"],
        featured: true,
        maxGuests: 2
    },
    { 
        id: 12, 
        name: "Eco Pod", 
        price: 2800.00, 
        type: "Unique", 
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
        amenities: ["Sustainable", "Queen Bed", "Nature", "Stargazing"],
        featured: false,
        maxGuests: 2
    }
];


let bookings = JSON.parse(localStorage.getItem('lunaBookings')) || [];
let currentUser = localStorage.getItem('lunaUser') || null;


const bannerImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200"
];
let currentBanner = 0;


document.addEventListener('DOMContentLoaded', () => {
    updateBookingCount();
    initCarousel();
    renderFeatured();
    renderRooms();
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


function renderFeatured() {
    const track = document.getElementById('featured-track');
    if (!track) return;

    const featured = roomData.filter(room => room.featured);
    
    track.innerHTML = featured.map(room => `
        <div class="featured-card" onclick="openModal(${room.id})">
            <img src="${room.image}" alt="${room.name}">
            <h3>${room.name}</h3>
            <p class="room-price">₱${room.price.toFixed(2)}<span>/night</span></p>
            <div class="amenities">
                ${room.amenities.slice(0, 2).map(a => `<span class="amenity-tag">${a}</span>`).join('')}
            </div>
            <span class="type-tag">${room.type}</span>
        </div>
    `).join('');

    document.getElementById('featured-prev')?.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
    });

    document.getElementById('featured-next')?.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
    });
}


function renderRooms(searchTerm = '', typeFilter = '') {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;

    let filtered = roomData;

    if (searchTerm) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(searchTerm) || 
            r.type.toLowerCase().includes(searchTerm) ||
            r.amenities.some(a => a.toLowerCase().includes(searchTerm))
        );
    }

    if (typeFilter) {
        filtered = filtered.filter(r => r.type === typeFilter);
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; font-size:1.2rem; color:var(--text-secondary);">No rooms found 🌴</p>';
        return;
    }

    grid.innerHTML = filtered.map(room => `
        <div class="room-card" onclick="openModal(${room.id})">
            <img src="${room.image}" alt="${room.name}">
            <h3>${room.name}</h3>
            <p class="room-price">₱${room.price.toFixed(2)}<span>/night</span></p>
            <div class="amenities">
                ${room.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join('')}
            </div>
            <span class="type-tag">${room.type}</span>
            <p style="margin-top:0.5rem; font-size:0.85rem; color:var(--text-secondary);">Max ${room.maxGuests} guests</p>
        </div>
    `).join('');
}


let selectedRoom = null;

function openModal(roomId) {
    selectedRoom = roomData.find(r => r.id === roomId);
    if (!selectedRoom) return;

    const modal = document.getElementById('booking-modal');
    const msg = document.getElementById('modal-msg');
    const nightsBox = document.getElementById('nights-box');
    const guestsBox = document.getElementById('guests-box');

    if (msg) msg.textContent = `Book ${selectedRoom.name} for ₱${selectedRoom.price.toFixed(2)}/night?`;
    if (nightsBox) nightsBox.style.display = 'block';
    if (guestsBox) guestsBox.style.display = 'block';
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.style.display = 'none';
    selectedRoom = null;
}

function confirmBooking() {
    if (!selectedRoom) return;

    const nightsInput = document.getElementById('stay-nights');
    const guestsInput = document.getElementById('stay-guests');
    const nights = parseInt(nightsInput?.value) || 1;
    const guests = parseInt(guestsInput?.value) || 2;

    
    const existing = bookings.find(b => b.id === selectedRoom.id);
    if (existing) {
        existing.nights += nights;
        existing.guests = Math.max(existing.guests, guests);
    } else {
        bookings.push({ 
            ...selectedRoom, 
            nights: nights,
            guests: guests,
            bookingDate: new Date().toISOString()
        });
    }

    saveBookings();
    updateBookingCount();
    showToast(`Booked ${selectedRoom.name} for ${nights} nights! 🌴`);
    closeModal();

    
    if (nightsInput) nightsInput.value = 1;
    if (guestsInput) guestsInput.value = 2;
}


function saveBookings() {
    localStorage.setItem('lunaBookings', JSON.stringify(bookings));
}

function updateBookingCount() {
    const count = bookings.reduce((sum, b) => sum + b.nights, 0);
    document.querySelectorAll('#booking-count').forEach(el => {
        el.textContent = count;
    });
}

function renderBookings() {
    const tbody = document.getElementById('booking-items');
    const totalEl = document.getElementById('total-price');
    
    if (!tbody) return;

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--text-secondary);">No bookings yet 🌙</td></tr>';
        if (totalEl) totalEl.textContent = '₱0.00';
        return;
    }

    tbody.innerHTML = bookings.map((booking, index) => `
        <tr>
            <td style="display:flex; align-items:center; gap:1rem;">
                <img src="${booking.image}" style="width:70px; height:70px; object-fit:cover; border-radius:12px; border:2px solid var(--secondary);">
                <div>
                    <div style="font-weight:700; color:var(--dark);">${booking.name}</div>
                    <div style="font-size:0.85rem; color:var(--text-secondary);">${booking.type}</div>
                </div>
            </td>
            <td>${booking.nights}</td>
            <td>${booking.guests}</td>
            <td>₱${(booking.price * booking.nights).toFixed(2)}</td>
            <td>
                <button onclick="removeBooking(${index})" style="background:var(--primary); color:white; border:none; padding:0.5rem 1rem; border-radius:20px; cursor:pointer; font-weight:600;">Cancel</button>
            </td>
        </tr>
    `).join('');

    const total = bookings.reduce((sum, b) => sum + (b.price * b.nights), 0);
    if (totalEl) totalEl.textContent = '₱' + total.toFixed(2);
}

function removeBooking(index) {
    bookings.splice(index, 1);
    saveBookings();
    updateBookingCount();
    renderBookings();
    showToast('Booking cancelled');
}

function clearBookings() {
    if (bookings.length === 0) return;
    
    if (confirm('Cancel all bookings? 🌴')) {
        bookings = [];
        saveBookings();
        updateBookingCount();
        renderBookings();
        showToast('All bookings cancelled');
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
    localStorage.setItem('lunaUser', email);
    showToast(`Welcome to Luna Vista! 🌙`);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('lunaUser');
    showToast('Logged out successfully');
}


function setupEventListeners() {
   
    document.getElementById('modal-yes')?.addEventListener('click', confirmBooking);
    document.getElementById('modal-no')?.addEventListener('click', closeModal);

   
    document.getElementById('booking-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'booking-modal') closeModal();
    });

   
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const type = btn.dataset.type;
            renderRooms('', type);
        });
    });

  
    document.getElementById('home-search')?.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const track = document.getElementById('featured-track');
        if (track && term) {
            const cards = track.querySelectorAll('.featured-card');
            cards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = name.includes(term) ? 'block' : 'none';
            });
        } else if (track) {
            track.querySelectorAll('.featured-card').forEach(c => c.style.display = 'block');
        }
    });

    
    if (document.getElementById('booking-items')) {
        renderBookings();
    }
}