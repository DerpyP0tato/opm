// Corning BioOps — App Router & Core Logic
const App = {
  currentPage: 'dashboard',

  init() {
    this.bindNav();
    this.bindMobileMenu();
    this.navigateTo('dashboard');
    window.addEventListener('resize', () => this.handleResize());
  },

  bindNav() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        this.navigateTo(page);
        // Close mobile menu
        document.querySelector('.sidebar').classList.remove('open');
        document.querySelector('.sidebar-overlay').classList.remove('visible');
      });
    });
  },

  bindMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.sidebar-overlay');
    if (btn) {
      btn.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
        overlay.classList.toggle('visible');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.remove('open');
        overlay.classList.remove('visible');
      });
    }
  },

  navigateTo(page) {
    this.currentPage = page;

    // Update nav active state
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    // Show/hide sections
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.toggle('active', section.id === 'page-' + page);
    });

    // Update page title
    const titles = {
      dashboard: 'Dashboard',
      bioprocess: 'Bioprocess Operations',
      hardware: 'Hardware Workflows',
      inventory: 'Inventory & Supply',
      'control-tower': 'Operations Control Tower',
      subscription: 'Subscription & Account',
    };
    document.querySelector('.page-title').textContent = titles[page] || 'Dashboard';

    // Render page
    this.renderPage(page);
  },

  renderPage(page) {
    switch (page) {
      case 'dashboard': Pages.dashboard.render(); break;
      case 'bioprocess': Pages.bioprocess.render(); break;
      case 'hardware': Pages.hardware.render(); break;
      case 'inventory': Pages.inventory.render(); break;
      case 'control-tower': Pages.controlTower.render(); break;
      case 'subscription': Pages.subscription.render(); break;
    }
  },

  handleResize() {
    // Re-render charts on resize
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      this.renderPage(this.currentPage);
    }, 250);
  },

  // Utility: show toast notification
  toast(message, type = '') {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.className = 'toast' + (type ? ' toast-' + type : '');
    el.classList.add('visible');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('visible'), 3000);
  },

  // Utility: show/hide modal
  showModal(id) {
    document.getElementById(id).classList.add('visible');
  },
  hideModal(id) {
    document.getElementById(id).classList.remove('visible');
  },
};

// Pages namespace — populated by individual page scripts
const Pages = {};

document.addEventListener('DOMContentLoaded', () => App.init());
