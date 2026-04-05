document.addEventListener('DOMContentLoaded', function() {

    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

   
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Appointment booked successfully! We will contact you shortly to confirm.');
            this.reset();
        });
    }

   
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful!');
            window.location.href = 'home.html';
        });
    }

  
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Account created successfully! Welcome to MediCore.');
            window.location.href = 'home.html';
        });
    }

    
    const toggleBtn = document.getElementById('toggleAvailability');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const statuses = document.querySelectorAll('.staff-status');
            statuses.forEach(status => {
                if (status.classList.contains('status-available')) {
                    status.classList.remove('status-available');
                    status.classList.add('status-busy');
                    status.textContent = 'Busy';
                } else {
                    status.classList.remove('status-busy');
                    status.classList.add('status-available');
                    status.textContent = 'Available';
                }
            });
        });
    }
});
