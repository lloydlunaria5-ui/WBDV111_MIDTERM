

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSearch();
    initAuth();
    initForms();
    animateStats();
});


function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-btn');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchBtn) return;

    const demoBooks = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', status: 'Available', icon: '📖' },
        { title: '1984', author: 'George Orwell', year: '1949', status: 'Checked Out', icon: '📚' },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: '1960', status: 'Available', icon: '📗' },
    ];

    function performSearch(query) {
        if (!query.trim()) {
            showNotification('Please enter search terms', 'warning');
            return;
        }

        searchBtn.innerHTML = '🔍 Searching...';
        searchBtn.disabled = true;

        setTimeout(() => {
            searchBtn.innerHTML = 'Search Books';
            searchBtn.disabled = false;

            if (searchResults) {
                searchResults.innerHTML = demoBooks.map((book, index) => `
                    <div class="book-card" style="animation: fadeIn 0.3s ease ${index * 0.1}s both;">
                        <div class="card-icon">${book.icon}</div>
                        <div class="card-title">${book.title}</div>
                        <div class="card-text">${book.author}</div>
                        <div class="card-text">${book.year}</div>
                        <span class="status ${book.status === 'Available' ? 'active' : 'pending'}">${book.status}</span>
                        <button class="card-btn small" onclick="checkOut(${index + 1})">View Details</button>
                    </div>
                `).join('');
            }

            showNotification(`Found ${demoBooks.length} results for "${query}"`, 'success');
        }, 600);
    }

    searchBtn.addEventListener('click', () => performSearch(searchInput.value));

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}


function initAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            if (email && password) {
                showNotification('Login successful! Welcome back.', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showNotification('Please fill in all fields', 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input');
            let valid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (valid) {
                showNotification('Registration successful! Please login.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    }
}


function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '';
                }
            });

            input.addEventListener('focus', function() {
                this.style.borderColor = '';
            });
        });
    });
}


function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/[^0-9]/g, '')) || 0;

                if (numericValue > 0) {
                    let current = 0;
                    const increment = numericValue / 30;
                    const prefix = finalValue.match(/^[^0-9]*/)?.[0] || '';
                    const suffix = finalValue.match(/[^0-9]*$/)?.[0] || '';

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            target.textContent = prefix + Math.floor(current) + suffix;
                        }
                    }, 30);
                }

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}


function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    `;

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };

    notification.style.background = colors[type] || colors.info;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


function viewDetails(id) {
    showNotification(`Viewing details for item ${id}`, 'info');
}

function sendReminder(memberId) {
    showNotification(`Reminder sent to member ${memberId}`, 'success');
}

function checkOut(bookId) {
    showNotification(`Book ${bookId} added to checkout`, 'success');
}

function returnBook(bookId) {
    showNotification(`Book ${bookId} marked as returned`, 'success');
}


const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
