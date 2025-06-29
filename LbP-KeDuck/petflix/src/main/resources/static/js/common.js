// Common functionality for all pages
class CommonUI {
    constructor() {
        this.init();
    }

    init() {
        this.setupSidebar();
        this.setupNavigation();
    }

    setupSidebar() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
            });
        }

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    setupNavigation() {
        // Set active nav item based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === currentPage) {
                item.classList.add('active');
            }
        });
    }
}

// Global functions
function navigateTo(page) {
    window.location.href = page;
}

function printTable() {
    window.print();
}

function filterTable(tableId = 'dataTable', searchInputId = 'searchInput') {
    const searchTerm = document.getElementById(searchInputId).value.toLowerCase();
    const rows = document.querySelectorAll(`#${tableId} tbody tr`);
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Initialize common UI
document.addEventListener('DOMContentLoaded', () => {
    new CommonUI();
});