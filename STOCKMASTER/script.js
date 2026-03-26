const stockData = [
    { item: 'Widget A', sku: 'WA-001', stock: 50, status: 'Healthy', updated: '2024-05-20', category: 'Electronics', supplier: 'TechCorp' },
    { item: 'Gadget B', sku: 'GB-002', stock: 5, status: 'Critical', updated: '2024-05-21', category: 'Electronics', supplier: 'GadgetHub' },
    { item: 'Tool C', sku: 'TC-003', stock: 12, status: 'Low Stock', updated: '2024-05-19', category: 'Hardware', supplier: 'ToolMasters' },
    { item: 'Device D', sku: 'DD-004', stock: 89, status: 'Healthy', updated: '2024-05-22', category: 'Electronics', supplier: 'TechCorp' },
    { item: 'Component E', sku: 'CE-005', stock: 3, status: 'Critical', updated: '2024-05-23', category: 'Parts', supplier: 'PartsRUs' },
    { item: 'Product F', sku: 'PF-006', stock: 34, status: 'Healthy', updated: '2024-05-20', category: 'General', supplier: 'GeneralGoods' },
    { item: 'Item G', sku: 'IG-007', stock: 8, status: 'Low Stock', updated: '2024-05-21', category: 'Hardware', supplier: 'ToolMasters' }
];

const alertsData = [
    { id: 1, title: 'Critical Stock Alert: Gadget B', message: 'Stock level below minimum threshold (5 units remaining)', type: 'critical', time: '2 hours ago', read: false },
    { id: 2, title: 'Low Stock Warning: Tool C', message: 'Stock level at 12 units. Consider reordering soon.', type: 'warning', time: '5 hours ago', read: false },
    { id: 3, title: 'Supplier Delay Notice', message: 'TechCorp shipment delayed by 2 days', type: 'info', time: '1 day ago', read: true },
    { id: 4, title: 'Critical Stock Alert: Component E', message: 'Only 3 units remaining. Immediate reorder required.', type: 'critical', time: '1 day ago', read: false }
];

const usersData = [
    { id: 1, name: 'John Admin', email: 'john@stockmaster.com', role: 'admin', status: 'active', lastLogin: '2024-05-23 09:30' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@stockmaster.com', role: 'manager', status: 'active', lastLogin: '2024-05-23 08:15' },
    { id: 3, name: 'Mike Staff', email: 'mike@stockmaster.com', role: 'staff', status: 'active', lastLogin: '2024-05-22 16:45' },
    { id: 4, name: 'Lisa Viewer', email: 'lisa@stockmaster.com', role: 'viewer', status: 'inactive', lastLogin: '2024-05-20 11:20' }
];

const activityLog = [
    { action: 'Stock updated: Widget A (+20 units)', user: 'John Admin', time: '10 minutes ago', type: 'update' },
    { action: 'New item added: Product H', user: 'Sarah Manager', time: '1 hour ago', type: 'create' },
    { action: 'Report generated: Monthly Inventory', user: 'John Admin', time: '3 hours ago', type: 'report' },
    { action: 'Alert resolved: Gadget B reorder placed', user: 'Mike Staff', time: '5 hours ago', type: 'resolve' },
    { action: 'User permissions updated: Mike Staff', user: 'John Admin', time: '1 day ago', type: 'admin' }
];


const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = loginForm.querySelector('.btn-main');
        const originalText = btn.textContent;
        
        btn.textContent = 'Logging in...';
        btn.disabled = true;
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    });
}


function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        const btnPage = btn.getAttribute('data-page');
        if (btnPage) {
            const btnHref = btnPage === 'dashboard' ? 'index.html' : `${btnPage}.html`;
            if (currentPage === btnHref || (currentPage === '' && btnPage === 'dashboard')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
        
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('settings-btn')) {
                const page = btn.getAttribute('data-page');
                if (page) {
                    const target = page === 'dashboard' ? 'index.html' : `${page}.html`;
                    window.location.href = target;
                }
            }
        });
    });
    
    
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            window.location.href = 'admin.html?tab=settings';
        });
    }
}


function populateTable(data = stockData, tableId = 'stockTable') {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        let statusClass = '';
        if (item.status === 'Healthy') statusClass = 'status-healthy';
        else if (item.status === 'Low Stock') statusClass = 'status-low';
        else if (item.status === 'Critical') statusClass = 'status-critical';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.item}</strong></td>
            <td><code style="background: var(--gray-100); padding: 0.25rem 0.5rem; border-radius: var(--radius); font-size: 0.75rem;">${item.sku}</code></td>
            <td>${item.stock} units</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>${item.updated}</td>
            <td>
                <button class="action-btn" onclick="editItem('${item.sku}')" title="Edit">✏️</button>
                <button class="action-btn" onclick="viewItem('${item.sku}')" title="View">👁️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.textContent.trim();
            let filteredData = stockData;
            
            if (filter === 'In Stock') {
                filteredData = stockData.filter(item => item.status === 'Healthy');
            } else if (filter === 'Low Stock') {
                filteredData = stockData.filter(item => item.status === 'Low Stock');
            } else if (filter === 'Critical') {
                filteredData = stockData.filter(item => item.status === 'Critical');
            }
            
            populateTable(filteredData);
        });
    });
}


function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = stockData.filter(item => 
                item.item.toLowerCase().includes(query) || 
                item.sku.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
            populateTable(filtered);
        });
    }
}


function editItem(sku) {
    const item = stockData.find(i => i.sku === sku);
    if (item) {
        alert(`Edit Item:\n\nName: ${item.item}\nSKU: ${item.sku}\nStock: ${item.stock}\nStatus: ${item.status}`);
    }
}

function viewItem(sku) {
    const item = stockData.find(i => i.sku === sku);
    if (item) {
        alert(`Item Details:\n\nName: ${item.item}\nSKU: ${item.sku}\nCategory: ${item.category}\nStock: ${item.stock}\nSupplier: ${item.supplier}\nStatus: ${item.status}\nLast Updated: ${item.updated}`);
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        alert(`User ${userId} deleted successfully`);
    }
}

function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (user) {
        alert(`Edit User:\n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}`);
    }
}


function initStockList() {
    populateTable();
    initFilters();
    initSearch();
    
    
    const categoryFilter = document.querySelector('.category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            if (category === 'all') {
                populateTable(stockData);
            } else {
                const filtered = stockData.filter(item => 
                    item.category.toLowerCase() === category
                );
                populateTable(filtered);
            }
        });
    }
    
  
    const addBtn = document.querySelector('.add-stock-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            alert('Add New Stock Item - Form would open here');
        });
    }
}


function initScanPage() {
    const scanArea = document.querySelector('.scan-area');
    const scanForm = document.querySelector('#scanForm');
    
    if (scanArea) {
        scanArea.addEventListener('click', () => {
            scanArea.style.background = 'var(--primary)';
            setTimeout(() => {
                scanArea.style.background = '';
                alert('Scanner activated! (Camera access would be requested here)');
            }, 300);
        });
    }
    
    if (scanForm) {
        scanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = scanForm.querySelector('.btn-primary');
            btn.textContent = 'Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Add Item';
                btn.disabled = false;
                alert('Item added successfully!');
                scanForm.reset();
            }, 1000);
        });
    }
}


function initAlertsPage() {
    const alertsContainer = document.querySelector('.alerts-container');
    if (!alertsContainer) return;
    
    alertsContainer.innerHTML = '';
    
    alertsData.forEach(alert => {
        const alertCard = document.createElement('div');
        alertCard.className = `alert-card ${alert.type}`;
        alertCard.innerHTML = `
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
            </div>
            <div class="alert-meta">
                <div class="alert-time">${alert.time}</div>
                <div class="alert-actions">
                    <button class="action-btn" onclick="resolveAlert(${alert.id})" title="Resolve">✓</button>
                    <button class="action-btn" onclick="viewAlert(${alert.id})" title="View">👁️</button>
                </div>
            </div>
        `;
        alertsContainer.appendChild(alertCard);
    });
    
    
    const criticalCount = alertsData.filter(a => a.type === 'critical' && !a.read).length;
    const warningCount = alertsData.filter(a => a.type === 'warning' && !a.read).length;
    
    const critElement = document.querySelector('.stat-card.critical h3');
    const warnElement = document.querySelector('.stat-card.warning h3');
    
    if (critElement) critElement.textContent = criticalCount;
    if (warnElement) warnElement.textContent = warningCount;
}

function resolveAlert(alertId) {
    alert(`Alert ${alertId} marked as resolved`);
}

function viewAlert(alertId) {
    const alert = alertsData.find(a => a.id === alertId);
    if (alert) {
        alert(`Alert Details:\n\n${alert.title}\n\n${alert.message}\n\nReceived: ${alert.time}`);
    }
}


function initReportsPage() {
    
    const generateButtons = document.querySelectorAll('.btn-generate');
    generateButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.report-card');
            const title = card.querySelector('.report-title').textContent;
            
            btn.textContent = 'Generating...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Generate Report';
                btn.disabled = false;
                showReportPreview(title);
            }, 1500);
        });
    });
    
    
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Report downloaded as PDF');
        });
    });
    
   
    const dateInputs = document.querySelectorAll('.date-input');
    dateInputs.forEach(input => {
        input.addEventListener('change', () => {
            console.log('Date range updated');
        });
    });
}

function showReportPreview(reportTitle) {
    const previewSection = document.querySelector('.report-preview');
    if (previewSection) {
        previewSection.style.display = 'block';
        previewSection.scrollIntoView({ behavior: 'smooth' });
        
        const previewTitle = previewSection.querySelector('.preview-title');
        if (previewTitle) {
            previewTitle.textContent = `Preview: ${reportTitle}`;
        }
    }
}


function initAdminPanel() {
    
    const tabs = document.querySelectorAll('.admin-tab');
    const sections = document.querySelectorAll('.admin-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
           
            const url = new URL(window.location);
            url.searchParams.set('tab', targetTab);
            window.history.pushState({}, '', url);
        });
    });
    
   
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
        const targetTab = document.querySelector(`.admin-tab[data-tab="${tabParam}"]`);
        if (targetTab) targetTab.click();
    }
    
  
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const isActive = toggle.classList.contains('active');
            console.log(`Setting toggled: ${isActive}`);
        });
    });
    
   
    populateUsers();
    
    
    populateActivityLog();
    
    
    const addUserBtn = document.querySelector('.add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            alert('Add User dialog would open here');
        });
    }
    
    
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            btn = saveSettingsBtn;
            btn.textContent = 'Saving...';
            setTimeout(() => {
                btn.textContent = 'Save Changes';
                alert('Settings saved successfully!');
            }, 1000);
        });
    }
}

function populateUsers() {
    const userGrid = document.querySelector('.user-grid');
    if (!userGrid) return;
    
    userGrid.innerHTML = '';
    
    usersData.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="user-avatar">${user.name.charAt(0)}</div>
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-role ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
                <div style="font-size: 0.75rem; color: var(--gray-500);">${user.email}</div>
            </div>
            <div class="user-actions">
                <button class="icon-btn" onclick="editUser(${user.id})" title="Edit">✏️</button>
                <button class="icon-btn delete" onclick="deleteUser(${user.id})" title="Delete">🗑️</button>
            </div>
        `;
        userGrid.appendChild(userCard);
    });
}

function populateActivityLog() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    activityLog.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-dot"></div>
            <div class="activity-content">
                <div class="activity-title">${activity.action}</div>
                <div class="activity-time">by ${activity.user} • ${activity.time}</div>
            </div>
        `;
        activityList.appendChild(item);
    });
}


function initExport() {
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            let csv = 'Item,SKU,Stock,Status,Last Updated\n';
            stockData.forEach(item => {
                csv += `${item.item},${item.sku},${item.stock},${item.status},${item.updated}\n`;
            });
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `stock-report-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initExport();
    

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        populateTable(stockData.slice(0, 5)); // Show only recent 5 on dashboard
        initFilters();
    } else if (currentPage === 'stocklist.html') {
        initStockList();
    } else if (currentPage === 'scan.html') {
        initScanPage();
    } else if (currentPage === 'alerts.html') {
        initAlertsPage();
    } else if (currentPage === 'reports.html') {
        initReportsPage();
    } else if (currentPage === 'admin.html') {
        initAdminPanel();
    }
});

const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
    });
}