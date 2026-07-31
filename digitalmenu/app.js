import { TRANSLATIONS, CURRENCY_RATES, CATEGORIES as FALLBACK_CATEGORIES, MENU_ITEMS as FALLBACK_MENU } from './menuData.js';

// Application State
const state = {
  currentLang: localStorage.getItem('lumiere_lang') || 'en',
  currentCurrency: localStorage.getItem('lumiere_currency') || 'ETB',
  theme: localStorage.getItem('lumiere_theme') || 'dark',
  activeCategory: 'all',
  searchQuery: '',
  activeFilters: new Set(),
  mySelection: new Set(JSON.parse(localStorage.getItem('lumiere_selection') || '[]')),
  categories: FALLBACK_CATEGORIES,
  menuItems: FALLBACK_MENU,
  dataSource: 'initial'
};

// DOM Elements
const elements = {
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  langSelect: document.getElementById('langSelect'),
  currencySelect: document.getElementById('currencySelect'),
  tableNoticeBar: document.getElementById('tableNoticeBar'),
  searchInput: document.getElementById('searchInput'),
  filterPills: document.getElementById('filterPills'),
  categoryNav: document.getElementById('categoryNav'),
  menuContainer: document.getElementById('menuContainer'),
  selectionCountBadge: document.getElementById('selectionCountBadge'),
  openSelectionBtn: document.getElementById('openSelectionBtn'),
  selectionDrawerOverlay: document.getElementById('selectionDrawerOverlay'),
  closeSelectionBtn: document.getElementById('closeSelectionBtn'),
  drawerItemsList: document.getElementById('drawerItemsList'),
  clearSelectionBtn: document.getElementById('clearSelectionBtn'),
  dishModalOverlay: document.getElementById('dishModalOverlay'),
  closeDishModalBtn: document.getElementById('closeDishModalBtn'),
  modalContent: document.getElementById('modalContent'),
  openQrBtn: document.getElementById('openQrBtn'),
  qrModalOverlay: document.getElementById('qrModalOverlay'),
  closeQrBtn: document.getElementById('closeQrBtn'),
  qrCanvasBox: document.getElementById('qrCanvasBox'),
  printQrBtn: document.getElementById('printQrBtn'),
  shareMenuBtn: document.getElementById('shareMenuBtn'),
  openFeedbackBtn: document.getElementById('openFeedbackBtn'),
  feedbackModalOverlay: document.getElementById('feedbackModalOverlay'),
  closeFeedbackBtn: document.getElementById('closeFeedbackBtn'),
  feedbackForm: document.getElementById('feedbackForm')
};

// Initialize Application
async function init() {
  document.documentElement.setAttribute('data-theme', state.theme);
  
  // Set initial control values
  elements.langSelect.value = state.currentLang;
  elements.currencySelect.value = state.currentCurrency;

  // Render static translated strings
  applyTranslations();

  // Bind Event Listeners
  bindEvents();

  // Load menu data from PostgreSQL API
  await loadMenuData();

  // Render Dynamic Components
  renderCategoryNav();
  renderDietaryFilters();
  renderMenuGrid();
  updateSelectionCount();
}

// Fetch Menu Data from PostgreSQL API or fallback to static file
async function loadMenuData() {
  try {
    const res = await fetch(`/api/menu?lang=${state.currentLang}&currency=${state.currentCurrency}`);
    if (res.ok) {
      const data = await res.json();
      if (data.categories && data.items) {
        state.categories = data.categories.map(c => ({
          id: c.id,
          icon: c.icon,
          title: { [state.currentLang]: c.title }
        }));

        state.menuItems = data.items.map(item => ({
          id: item.id,
          categoryId: item.categoryId,
          priceETB: item.priceETB,
          rating: item.rating,
          reviewCount: item.reviewCount,
          spiciness: item.spiciness,
          prepMinutes: item.prepMinutes,
          calories: item.calories,
          isPopular: item.isPopular,
          isChefSpecial: item.isChefSpecial,
          dietary: item.dietary,
          image: item.image,
          title: { [state.currentLang]: item.title },
          description: { [state.currentLang]: item.description },
          allergens: { [state.currentLang]: item.allergens },
          chefTip: item.chefTip ? { [state.currentLang]: item.chefTip } : null,
          pairing: item.pairing ? { [state.currentLang]: item.pairing } : null
        }));

        state.dataSource = data.source;
        return;
      }
    }
  } catch (err) {
    console.log('Using local client dataset');
  }

  // Fallback to static menuData.js
  state.categories = FALLBACK_CATEGORIES;
  state.menuItems = FALLBACK_MENU;
  state.dataSource = 'fallback-data';
}

// Translate Page Static & Dynamic Texts
function applyTranslations() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;

  // Apply Amharic specific typography styling if selected
  if (state.currentLang === 'am') {
    document.body.classList.add('ethiopic-text');
  } else {
    document.body.classList.remove('ethiopic-text');
  }

  // Update Data Translatable Elements
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (t[key]) el.textContent = t[key];
  });

  // Update Search Placeholder
  elements.searchInput.placeholder = t.searchPlaceholder;
}

// Formats Price based on current Currency Rate & Symbol
function formatPrice(priceETB) {
  const currencyInfo = CURRENCY_RATES[state.currentCurrency] || CURRENCY_RATES.ETB;
  const converted = (priceETB * currencyInfo.rate).toFixed(
    state.currentCurrency === 'ETB' ? 0 : 2
  );
  
  if (currencyInfo.position === 'before') {
    return `${currencyInfo.symbol}${converted}`;
  } else {
    return `${converted} ${currencyInfo.symbol}`;
  }
}

// Render Sticky Category Navigation
function renderCategoryNav() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  
  let html = `
    <button class="cat-tab ${state.activeCategory === 'all' ? 'active' : ''}" data-cat="all">
      🍽️ ${t.allCategories}
    </button>
  `;

  state.categories.forEach(cat => {
    const catTitle = typeof cat.title === 'string' ? cat.title : (cat.title[state.currentLang] || cat.title.en);
    html += `
      <button class="cat-tab ${state.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.icon} ${catTitle}
      </button>
    `;
  });

  elements.categoryNav.innerHTML = html;

  // Tab click handler
  elements.categoryNav.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-cat');
      state.activeCategory = catId;
      renderCategoryNav();
      renderMenuGrid();
      
      // Smooth scroll to section if specific
      if (catId !== 'all') {
        const sec = document.getElementById(`sec-${catId}`);
        if (sec) {
          const yOffset = -140;
          const y = sec.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
}

// Render Dietary Pills
function renderDietaryFilters() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  const filterKeys = ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree', 'spicy'];

  let html = '';
  filterKeys.forEach(key => {
    const isActive = state.activeFilters.has(key);
    html += `
      <button class="pill-btn ${isActive ? 'active' : ''}" data-filter="${key}">
        ${t.filters[key]}
      </button>
    `;
  });

  elements.filterPills.innerHTML = html;

  elements.filterPills.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (state.activeFilters.has(filter)) {
        state.activeFilters.delete(filter);
      } else {
        state.activeFilters.add(filter);
      }
      renderDietaryFilters();
      renderMenuGrid();
    });
  });
}

// Filter Menu Items based on category, search query & active dietary tags
function getFilteredItems() {
  return state.menuItems.filter(item => {
    // Category Filter
    if (state.activeCategory !== 'all' && item.categoryId !== state.activeCategory) {
      return false;
    }

    // Dietary Filters
    for (let f of state.activeFilters) {
      if (f === 'spicy') {
        if (item.spiciness === 0) return false;
      } else {
        if (!item.dietary.includes(f)) return false;
      }
    }

    // Search Query Filter
    if (state.searchQuery.trim() !== '') {
      const query = state.searchQuery.toLowerCase();
      const title = (typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en || '')).toLowerCase();
      const desc = (typeof item.description === 'string' ? item.description : (item.description[state.currentLang] || item.description.en || '')).toLowerCase();
      return title.includes(query) || desc.includes(query);
    }

    return true;
  });
}

// Render Menu Grid Grouped by Category
function renderMenuGrid() {
  const filtered = getFilteredItems();
  
  if (filtered.length === 0) {
    elements.menuContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
        <h3>No dishes match your search or filters</h3>
        <p style="font-size: 0.9rem; margin-top: 5px;">Try clearing filters or adjusting your search term.</p>
      </div>
    `;
    return;
  }

  // Group items by Category
  const categoriesToRender = state.activeCategory === 'all' 
    ? state.categories 
    : state.categories.filter(c => c.id === state.activeCategory);

  let containerHtml = '';

  categoriesToRender.forEach(cat => {
    const catItems = filtered.filter(item => item.categoryId === cat.id);
    if (catItems.length === 0) return;

    const catTitle = typeof cat.title === 'string' ? cat.title : (cat.title[state.currentLang] || cat.title.en);

    containerHtml += `
      <section class="category-section" id="sec-${cat.id}">
        <div class="category-header">
          <span class="category-icon">${cat.icon}</span>
          <h2 class="category-title">${catTitle}</h2>
        </div>
        <div class="menu-grid">
          ${catItems.map(item => createDishCardHtml(item)).join('')}
        </div>
      </section>
    `;
  });

  elements.menuContainer.innerHTML = containerHtml;

  // Attach card click & bookmark click handlers
  elements.menuContainer.querySelectorAll('.dish-card').forEach(card => {
    const itemId = card.getAttribute('data-id');

    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-bookmark-btn')) return;
      openDishModal(itemId);
    });

    const favBtn = card.querySelector('.fav-bookmark-btn');
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(itemId);
      });
    }
  });
}

// Helper: Generate Dish Card HTML
function createDishCardHtml(item) {
  const title = typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en);
  const desc = typeof item.description === 'string' ? item.description : (item.description[state.currentLang] || item.description.en);
  const priceFormatted = formatPrice(item.priceETB);
  const isBookmarked = state.mySelection.has(item.id);

  let badgeHtml = '';
  if (item.isChefSpecial) {
    badgeHtml = `<span class="badge-chip">Chef Signature</span>`;
  } else if (item.isPopular) {
    badgeHtml = `<span class="badge-chip">Popular</span>`;
  }

  const dietaryIcons = item.dietary.map(d => {
    if (d === 'vegan') return '🌱';
    if (d === 'vegetarian') return '🥗';
    if (d === 'glutenFree') return '🌾';
    if (d === 'halal') return '🥩';
    return '';
  }).join(' ');

  return `
    <div class="dish-card" data-id="${item.id}">
      <div class="dish-img-wrapper">
        <img src="${item.image}" alt="${title}" class="dish-img" loading="lazy" />
        <div class="dish-badge-row">
          <div>${badgeHtml}</div>
          <button class="fav-bookmark-btn ${isBookmarked ? 'active' : ''}" title="Save to My Selection">
            ${isBookmarked ? '🔖' : '📑'}
          </button>
        </div>
      </div>
      <div class="dish-info">
        <div class="dish-header-row">
          <h3 class="dish-name">${title}</h3>
          <span class="dish-price">${priceFormatted}</span>
        </div>
        <p class="dish-desc">${desc}</p>
        <div class="dish-footer-meta">
          <span class="rating-star">★ ${item.rating} (${item.reviewCount})</span>
          <span class="tags-inline">${dietaryIcons}</span>
        </div>
      </div>
    </div>
  `;
}

// Toggle Wishlist / My Selection
function toggleWishlist(id) {
  if (state.mySelection.has(id)) {
    state.mySelection.delete(id);
  } else {
    state.mySelection.add(id);
  }
  
  localStorage.setItem('lumiere_selection', JSON.stringify(Array.from(state.mySelection)));
  updateSelectionCount();
  renderMenuGrid();
  renderSelectionDrawer();
}

// Update Wishlist Counter Badge
function updateSelectionCount() {
  const count = state.mySelection.size;
  elements.selectionCountBadge.textContent = count;
  elements.selectionCountBadge.style.display = count > 0 ? 'flex' : 'none';
}

// Dish Modal
function openDishModal(id) {
  const item = state.menuItems.find(m => m.id === id);
  if (!item) return;

  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  const title = typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en);
  const desc = typeof item.description === 'string' ? item.description : (item.description[state.currentLang] || item.description.en);
  const priceFormatted = formatPrice(item.priceETB);
  
  let allergens = 'None';
  if (Array.isArray(item.allergens)) {
    allergens = item.allergens.join(', ');
  } else if (item.allergens && item.allergens[state.currentLang]) {
    allergens = Array.isArray(item.allergens[state.currentLang]) ? item.allergens[state.currentLang].join(', ') : item.allergens[state.currentLang];
  }

  const chefTip = item.chefTip ? (typeof item.chefTip === 'string' ? item.chefTip : (item.chefTip[state.currentLang] || item.chefTip.en)) : null;
  const pairing = item.pairing ? (typeof item.pairing === 'string' ? item.pairing : (item.pairing[state.currentLang] || item.pairing.en)) : null;
  const isBookmarked = state.mySelection.has(item.id);

  elements.modalContent.innerHTML = `
    <img src="${item.image}" alt="${title}" class="modal-hero-img" />
    <div class="modal-body">
      <h2 class="modal-title">${title}</h2>
      <div class="modal-price-row">
        <span class="modal-price">${priceFormatted}</span>
        <button class="fav-bookmark-btn ${isBookmarked ? 'active' : ''}" id="modalFavBtn" style="width: 40px; height: 40px;">
          ${isBookmarked ? '🔖' : '📑'}
        </button>
      </div>

      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">${desc}</p>

      <div class="modal-meta-grid">
        <div>
          <div style="color: var(--text-subtle);">${t.prepTime}</div>
          <div class="modal-meta-val">⏱️ ${item.prepMinutes} mins</div>
        </div>
        <div>
          <div style="color: var(--text-subtle);">${t.calories}</div>
          <div class="modal-meta-val">🔥 ${item.calories} kcal</div>
        </div>
        <div>
          <div style="color: var(--text-subtle);">Rating</div>
          <div class="modal-meta-val">★ ${item.rating} / 5</div>
        </div>
      </div>

      <div class="section-block">
        <div class="block-heading">${t.allergens}</div>
        <p style="font-size: 0.9rem; color: var(--text-muted);">${allergens}</p>
      </div>

      ${chefTip ? `
        <div class="section-block">
          <div class="block-heading">${t.chefTip}</div>
          <p style="font-size: 0.9rem; color: var(--accent-gold); font-style: italic;">"${chefTip}"</p>
        </div>
      ` : ''}

      ${pairing ? `
        <div class="section-block">
          <div class="block-heading">${t.recommendedPairing}</div>
          <div class="pairing-box">
            <span style="font-size: 1.4rem;">🍷</span>
            <div>
              <div style="font-weight: 600; color: var(--text-main);">${pairing}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Pairs exceptionally well with this dish</div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  elements.dishModalOverlay.classList.add('open');

  const modalFavBtn = document.getElementById('modalFavBtn');
  if (modalFavBtn) {
    modalFavBtn.addEventListener('click', () => {
      toggleWishlist(item.id);
      openDishModal(item.id);
    });
  }
}

// Selection Drawer Rendering
function renderSelectionDrawer() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  
  if (state.mySelection.size === 0) {
    elements.drawerItemsList.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">📑</div>
        <h4 style="color: var(--text-main);">${t.selectionEmpty}</h4>
        <p style="font-size: 0.85rem; margin-top: 5px;">${t.selectionSubhead}</p>
      </div>
    `;
    return;
  }

  const selectedItems = state.menuItems.filter(m => state.mySelection.has(m.id));
  
  let html = '';
  let totalETB = 0;

  selectedItems.forEach(item => {
    totalETB += item.priceETB;
    const title = typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en);
    const priceFormatted = formatPrice(item.priceETB);

    html += `
      <div class="drawer-item-card">
        <img src="${item.image}" class="drawer-item-img" alt="${title}" />
        <div class="drawer-item-info">
          <div style="font-weight: 600; font-size: 0.95rem;">${title}</div>
          <div style="color: var(--accent-gold); font-weight: 700; font-size: 0.9rem;">${priceFormatted}</div>
        </div>
        <button class="remove-btn" data-remove="${item.id}" title="Remove">✕</button>
      </div>
    `;
  });

  html += `
    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed var(--border-subtle); display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 700;">
      <span>Total Estimated:</span>
      <span style="color: var(--accent-gold);">${formatPrice(totalETB)}</span>
    </div>
  `;

  elements.drawerItemsList.innerHTML = html;

  elements.drawerItemsList.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove');
      toggleWishlist(id);
    });
  });
}

// Generate Universal Table QR Code pointing directly to the Menu URL
function renderUniversalQrCode() {
  const universalUrl = `${window.location.origin}${window.location.pathname}`;
  
  elements.qrCanvasBox.innerHTML = `
    <div style="background: #ffffff; padding: 16px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(universalUrl)}" alt="Universal Restaurant Table QR Code" style="display: block; margin: 0 auto;" />
    </div>
    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 12px; word-break: break-all;">
      📍 <span style="color: var(--accent-gold); font-weight: 600;">Scan URL:</span> ${universalUrl}
    </p>
  `;
}

// Bind Event Handlers
function bindEvents() {
  // Theme Toggle
  elements.themeToggleBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('lumiere_theme', state.theme);
    elements.themeToggleBtn.textContent = state.theme === 'dark' ? '🌙' : '☀️';
  });

  // Language Switcher
  elements.langSelect.addEventListener('change', async (e) => {
    state.currentLang = e.target.value;
    localStorage.setItem('lumiere_lang', state.currentLang);
    applyTranslations();
    await loadMenuData();
    renderCategoryNav();
    renderDietaryFilters();
    renderMenuGrid();
    renderSelectionDrawer();
  });

  // Currency Switcher
  elements.currencySelect.addEventListener('change', (e) => {
    state.currentCurrency = e.target.value;
    localStorage.setItem('lumiere_currency', state.currentCurrency);
    renderMenuGrid();
    renderSelectionDrawer();
  });

  // Live Search Input
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderMenuGrid();
  });

  // Drawer Controls
  elements.openSelectionBtn.addEventListener('click', () => {
    renderSelectionDrawer();
    elements.selectionDrawerOverlay.classList.add('open');
  });

  elements.closeSelectionBtn.addEventListener('click', () => {
    elements.selectionDrawerOverlay.classList.remove('open');
  });

  elements.clearSelectionBtn.addEventListener('click', () => {
    state.mySelection.clear();
    localStorage.removeItem('lumiere_selection');
    updateSelectionCount();
    renderMenuGrid();
    renderSelectionDrawer();
  });

  // Modal Closures
  elements.closeDishModalBtn.addEventListener('click', () => {
    elements.dishModalOverlay.classList.remove('open');
  });

  elements.dishModalOverlay.addEventListener('click', (e) => {
    if (e.target === elements.dishModalOverlay) {
      elements.dishModalOverlay.classList.remove('open');
    }
  });

  // Universal QR Modal Trigger
  elements.openQrBtn.addEventListener('click', () => {
    renderUniversalQrCode();
    elements.qrModalOverlay.classList.add('open');
  });

  elements.closeQrBtn.addEventListener('click', () => {
    elements.qrModalOverlay.classList.remove('open');
  });

  // Print QR Code Action
  elements.printQrBtn.addEventListener('click', () => {
    window.print();
  });

  // Share Menu
  elements.shareMenuBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lumière Digital Menu',
        text: 'Explore our gourmet digital menu!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Menu link copied to clipboard!');
    }
  });

  // Feedback Modal
  elements.openFeedbackBtn.addEventListener('click', () => {
    elements.feedbackModalOverlay.classList.add('open');
  });

  elements.closeFeedbackBtn.addEventListener('click', () => {
    elements.feedbackModalOverlay.classList.remove('open');
  });

  // Submit Feedback via API
  elements.feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
    
    const inputs = elements.feedbackForm.querySelectorAll('input, textarea');
    const guestName = inputs[0]?.value || 'Anonymous Guest';
    const comment = inputs[1]?.value || '';

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: 5,
          guestName,
          comment
        })
      });
    } catch (err) {
      console.log('Feedback logged client-side');
    }

    alert(t.feedbackSuccess);
    elements.feedbackModalOverlay.classList.remove('open');
    elements.feedbackForm.reset();
  });
}

// Run Application on Load
document.addEventListener('DOMContentLoaded', init);
