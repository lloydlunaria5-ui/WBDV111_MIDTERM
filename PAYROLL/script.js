document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const detailsBtn = document.getElementById('details-btn');
    const detailsModal = document.getElementById('details-modal');
    const closeModal = document.querySelector('.close-modal');
    const btnViews = document.querySelectorAll('.btn-view');
    const payrollDownloads = document.querySelectorAll('.payroll-download');

  
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });


    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            authForms.forEach(form => form.classList.remove('active'));
            document.getElementById(targetTab + '-form').classList.add('active');
        });
    });


    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Welcome back! Redirecting to dashboard.');
        document.querySelector('a[href="#home"]').click();
    });


    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Account created successfully! Please login.');
        document.querySelector('[data-tab="login"]').click();
    });

 
    detailsBtn.addEventListener('click', function() {
        detailsModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', function() {
        detailsModal.classList.add('hidden');
    });

    detailsModal.addEventListener('click', function(e) {
        if (e.target === detailsModal) {
            detailsModal.classList.add('hidden');
        }
    });

 
    btnViews.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.closest('.team-card').querySelector('h3').textContent;
            alert('Opening profile for: ' + name);
        });
    });


    payrollDownloads.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const month = this.closest('.payroll-item').querySelector('h4').textContent;
            alert('Downloading payslip for ' + month + '...');
        });
    });
});