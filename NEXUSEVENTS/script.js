// Nexus Events - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initYear();
  initPartyMode();
  initTicketBuilder();
  initAccordion();
  initEventFilter();
  initAdminLogin();
  initLoginForm();
});

// Navigation active state
function initNavigation() {
  const currentPage = document.body.dataset.page;
  const navLinks = document.querySelectorAll('[data-nav]');
  
  navLinks.forEach(link => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
    }
  });
}

// Dynamic year in footer
function initYear() {
  const yearElements = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);
}

// Party Mode Toggle
function initPartyMode() {
  const toggle = document.querySelector('[data-party-toggle]');
  if (!toggle) return;
  
  // Check saved state
  const isPartyMode = localStorage.getItem('partyMode') === 'true';
  if (isPartyMode) {
    document.body.classList.add('party-mode');
    toggle.textContent = 'Party Mode: ON';
  }
  
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('party-mode');
    const isActive = document.body.classList.contains('party-mode');
    toggle.textContent = isActive ? 'Party Mode: ON' : 'Party Mode: OFF';
    localStorage.setItem('partyMode', isActive);
  });
}

// Ticket Builder
function initTicketBuilder() {
  const rows = document.querySelectorAll('[data-ticket-row]');
  const totalEl = document.querySelector('[data-total]');
  
  if (!rows.length || !totalEl) return;
  
  function updateTotal() {
    let total = 0;
    rows.forEach(row => {
      const price = parseInt(row.dataset.price);
      const qty = parseInt(row.querySelector('[data-qty]').value) || 0;
      total += price * qty;
    });
    totalEl.textContent = `$${total}`;
  }
  
  rows.forEach(row => {
    const minusBtn = row.querySelector('[data-qty-minus]');
    const plusBtn = row.querySelector('[data-qty-plus]');
    const qtyInput = row.querySelector('[data-qty]');
    
    minusBtn.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 0;
      if (val > 0) {
        qtyInput.value = val - 1;
        updateTotal();
      }
    });
    
    plusBtn.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 0;
      if (val < 10) {
        qtyInput.value = val + 1;
        updateTotal();
      }
    });
    
    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value) || 0;
      if (val < 0) val = 0;
      if (val > 10) val = 10;
      qtyInput.value = val;
      updateTotal();
    });
  });
}

// Accordion
function initAccordion() {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;
  
  const items = accordion.querySelectorAll('.accordion-item');
  
  items.forEach(item => {
    const button = item.querySelector('button');
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all items
      items.forEach(i => i.classList.remove('open'));
      
      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// Event Filter & Search
function initEventFilter() {
  const searchInput = document.querySelector('[data-search]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-event-card]');
  
  if (!cards.length) return;
  
  let currentFilter = 'all';
  let searchTerm = '';
  
  function filterCards() {
    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      
      const matchesFilter = currentFilter === 'all' || tags.includes(currentFilter);
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        desc.includes(searchTerm) ||
        tags.includes(searchTerm);
      
      if (matchesFilter && matchesSearch) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      filterCards();
    });
  });
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      filterCards();
    });
  }
}

// Admin Login
function initAdminLogin() {
  const form = document.querySelector('[data-admin-form]');
  if (!form) return;
  
  const statusEl = document.querySelector('[data-admin-status]');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = form.querySelector('[data-admin-user]').value;
    const pass = form.querySelector('[data-admin-pass]').value;
    
    // Demo credentials
    if (user === 'admin' && pass === 'nexus2026') {
      statusEl.textContent = '✓ Access granted! Redirecting...';
      statusEl.className = 'status success';
      
      setTimeout(() => {
        alert('Welcome to the Admin Dashboard! (Demo only)');
      }, 1000);
    } else {
      statusEl.textContent = '✗ Invalid credentials. Try admin / nexus2026';
      statusEl.className = 'status error';
    }
  });
}

// Member Login Form
function initLoginForm() {
  const form = document.querySelector('[data-login-form]');
  if (!form) return;
  
  const statusEl = document.querySelector('[data-login-status]');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = form.querySelector('[data-login-email]').value;
    const pass = form.querySelector('[data-login-pass]').value;
    
    // Demo validation
    if (email && pass.length >= 6) {
      statusEl.textContent = '✓ Login successful! Redirecting...';
      statusEl.className = 'status success';
      
      setTimeout(() => {
        alert('Welcome back, member! (Demo only)');
      }, 1000);
    } else {
      statusEl.textContent = '✗ Please enter valid email and password (min 6 chars)';
      statusEl.className = 'status error';
    }
  });
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);