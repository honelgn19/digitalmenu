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
  mobileSelectionCount: document.getElementById('mobileSelectionCount'),
  openSelectionBtn: document.getElementById('openSelectionBtn'),
  openSelectionBtnMobile: document.getElementById('openSelectionBtnMobile'),
  selectionDrawerOverlay: document.getElementById('selectionDrawerOverlay'),
  closeSelectionBtn: document.getElementById('closeSelectionBtn'),
  drawerItemsList: document.getElementById('drawerItemsList'),
  clearSelectionBtn: document.getElementById('clearSelectionBtn'),
  dishModalOverlay: document.getElementById('dishModalOverlay'),
  closeDishModalBtn: document.getElementById('closeDishModalBtn'),
  modalContent: document.getElementById('modalContent'),
  qrModalOverlay: document.getElementById('qrModalOverlay'),
  closeQrBtn: document.getElementById('closeQrBtn'),
  qrCanvasBox: document.getElementById('qrCanvasBox'),
  printQrBtn: document.getElementById('printQrBtn'),
  copyUrlBtn: document.getElementById('copyUrlBtn'),
  shareMenuBtn: document.getElementById('shareMenuBtn'),
  openFeedbackBtn: document.getElementById('openFeedbackBtn'),
  feedbackModalOverlay: document.getElementById('feedbackModalOverlay'),
  closeFeedbackBtn: document.getElementById('closeFeedbackBtn'),
  feedbackForm: document.getElementById('feedbackForm')
};

// Modal Helper Functions (Forces inline style.display override)
function showModal(el) {
  if (!el) return;
  el.style.display = 'flex';
  el.classList.add('open');
}

function hideModal(el) {
  if (!el) return;
  el.style.display = 'none';
  el.classList.remove('open');
}

// Initialize Application (Instant non-blocking rendering)
function init() {
  document.documentElement.setAttribute('data-theme', state.theme);
  
  if (elements.langSelect) elements.langSelect.value = state.currentLang;
  if (elements.currencySelect) elements.currencySelect.value = state.currentCurrency;

  // 1. Apply Static Translations immediately
  applyTranslations();

  // 2. Render initial menu grid IMMEDIATELY from local data (0ms delay)
  renderCategoryNav();
  renderDietaryFilters();
  renderMenuGrid();
  updateSelectionCount();

  // 3. Bind ALL event listeners IMMEDIATELY (Buttons work instantly!)
  bindEvents();

  // 4. Fetch updated menu data from server in background without blocking UI
  loadMenuData().then(() => {
    renderCategoryNav();
    renderDietaryFilters();
    renderMenuGrid();
  }).catch(err => {
    console.log('Using static menu dataset');
  });
}

// Fetch Menu Data from PostgreSQL API or fallback safely
async function loadMenuData() {
  try {
    const res = await fetch(`/api/menu?lang=${state.currentLang}&currency=${state.currentCurrency}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.items && Array.isArray(data.items) && data.items.length > 0) {
        state.categories = (data.categories && data.categories.length > 0) 
          ? data.categories.map(c => ({
              id: c.id,
              icon: c.icon || '🍽️',
              title: typeof c.title === 'string' ? { [state.currentLang]: c.title, en: c.title } : (c.title || { en: c.id })
            }))
          : FALLBACK_CATEGORIES;

        state.menuItems = data.items.map(item => ({
          id: item.id,
          categoryId: item.categoryId,
          priceETB: item.priceETB || 500,
          rating: item.rating || 4.8,
          reviewCount: item.reviewCount || 50,
          spiciness: item.spiciness || 0,
          prepMinutes: item.prepMinutes || 15,
          calories: item.calories || 400,
          isPopular: Boolean(item.isPopular),
          isChefSpecial: Boolean(item.isChefSpecial),
          dietary: Array.isArray(item.dietary) ? item.dietary : (Array.isArray(item.dietaryTags) ? item.dietaryTags : []),
          image: item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
          title: typeof item.title === 'string' ? { [state.currentLang]: item.title, en: item.title } : (item.title || { en: 'Ethiopian Dish' }),
          description: typeof item.description === 'string' ? { [state.currentLang]: item.description, en: item.description } : (item.description || { en: '' }),
          allergens: item.allergens || [],
          chefTip: item.chefTip || null,
          pairing: item.pairing || null
        }));

        state.dataSource = data.source;
        return;
      }
    }
  } catch (err) {
    console.warn('API fetch error, using fallback dataset:', err);
  }

  // Safe Fallback
  state.categories = FALLBACK_CATEGORIES;
  state.menuItems = FALLBACK_MENU;
  state.dataSource = 'fallback-data';
}

// Translate Static Page Elements
function applyTranslations() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;

  if (state.currentLang === 'am') {
    document.body.classList.add('ethiopic-text');
  } else {
    document.body.classList.remove('ethiopic-text');
  }

  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (t[key]) el.textContent = t[key];
  });

  if (elements.searchInput) {
    elements.searchInput.placeholder = t.searchPlaceholder;
  }
}

// Format Price for Selected Currency
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
    const catTitle = typeof cat.title === 'string' ? cat.title : (cat.title[state.currentLang] || cat.title.en || cat.id);
    html += `
      <button class="cat-tab ${state.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.icon} ${catTitle}
      </button>
    `;
  });

  if (elements.categoryNav) {
    elements.categoryNav.innerHTML = html;

    elements.categoryNav.querySelectorAll('.cat-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat');
        state.activeCategory = catId;
        renderCategoryNav();
        renderMenuGrid();
        
        if (catId !== 'all') {
          const sec = document.getElementById(`sec-${catId}`);
          if (sec) {
            const yOffset = -120;
            const y = sec.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      });
    });
  }
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

  if (elements.filterPills) {
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
}

// Filter Menu Items
function getFilteredItems() {
  return state.menuItems.filter(item => {
    if (state.activeCategory !== 'all' && item.categoryId !== state.activeCategory) {
      return false;
    }

    for (let f of state.activeFilters) {
      if (f === 'spicy') {
        if (item.spiciness === 0) return false;
      } else {
        if (!item.dietary || !item.dietary.includes(f)) return false;
      }
    }

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
  if (!elements.menuContainer) return;
  
  const filtered = getFilteredItems();
  
  if (filtered.length === 0) {
    elements.menuContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
        <h3 style="color: var(--text-main);">No Ethiopian dishes match your search or filters</h3>
        <p style="font-size: 0.9rem; margin-top: 5px;">Try clearing filters or adjusting your search term.</p>
      </div>
    `;
    return;
  }

  const categoriesToRender = state.activeCategory === 'all' 
    ? state.categories 
    : state.categories.filter(c => c.id === state.activeCategory);

  let containerHtml = '';

  categoriesToRender.forEach(cat => {
    const catItems = filtered.filter(item => item.categoryId === cat.id);
    if (catItems.length === 0) return;

    const catTitle = typeof cat.title === 'string' ? cat.title : (cat.title[state.currentLang] || cat.title.en || cat.id);

    containerHtml += `
      <section class="category-section mb-8" id="sec-${cat.id}">
        <div class="category-header flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <span class="text-xl">${cat.icon}</span>
          <h2 class="font-display font-bold text-lg text-amber-400">${catTitle}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${catItems.map(item => createDishCardHtml(item)).join('')}
        </div>
      </section>
    `;
  });

  elements.menuContainer.innerHTML = containerHtml;

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

// Generate Dish Card HTML
function createDishCardHtml(item) {
  const title = typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en || 'Ethiopian Dish');
  const desc = typeof item.description === 'string' ? item.description : (item.description[state.currentLang] || item.description.en || '');
  const priceFormatted = formatPrice(item.priceETB);
  const isBookmarked = state.mySelection.has(item.id);

  let badgeHtml = '';
  if (item.isChefSpecial) {
    badgeHtml = `<span class="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-md text-[10px] font-bold">Chef Signature</span>`;
  } else if (item.isPopular) {
    badgeHtml = `<span class="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-md text-[10px] font-bold">Popular</span>`;
  }

  const dietaryIcons = (item.dietary || []).map(d => {
    if (d === 'vegan') return '🌱';
    if (d === 'vegetarian') return '🥗';
    if (d === 'glutenFree') return '🌾';
    if (d === 'halal') return '🥩';
    return '';
  }).join(' ');

  return `
    <div class="dish-card bg-[#141824] border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer hover:border-amber-400/40 transition-all" data-id="${item.id}">
      <div class="relative h-44 w-full overflow-hidden bg-slate-900">
        <img src="${item.image}" alt="${title}" class="w-full h-full object-cover" loading="lazy" />
        <div class="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div class="pointer-events-auto">${badgeHtml}</div>
          <button class="fav-bookmark-btn pointer-events-auto w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center text-xs ${isBookmarked ? 'bg-amber-500 text-black' : ''}" title="Save to My Selection">
            ${isBookmarked ? '🔖' : '📑'}
          </button>
        </div>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between gap-2">
        <div>
          <div class="flex items-start justify-between gap-2 mb-1">
            <h3 class="font-display font-bold text-sm sm:text-base text-white leading-snug">${title}</h3>
            <span class="font-bold text-amber-400 text-sm sm:text-base whitespace-nowrap">${priceFormatted}</span>
          </div>
          <p class="text-xs text-slate-400 line-clamp-2">${desc}</p>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
          <span class="text-amber-400 font-semibold">★ ${item.rating} (${item.reviewCount})</span>
          <span>${dietaryIcons}</span>
        </div>
      </div>
    </div>
  `;
}

// Toggle Wishlist
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

// Update Wishlist Badges
function updateSelectionCount() {
  const count = state.mySelection.size;
  if (elements.selectionCountBadge) {
    elements.selectionCountBadge.textContent = count;
    elements.selectionCountBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (elements.mobileSelectionCount) {
    elements.mobileSelectionCount.textContent = count;
  }
}

// Open Dish Detail Modal
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
    <img src="${item.image}" alt="${title}" class="w-full h-56 object-cover" />
    <div class="p-5">
      <h2 class="text-xl font-bold font-display text-white mb-2">${title}</h2>
      <div class="flex items-center justify-between mb-4">
        <span class="text-xl font-bold text-amber-400">${priceFormatted}</span>
        <button class="fav-bookmark-btn w-9 h-9 rounded-full bg-slate-800 border border-white/10 text-white flex items-center justify-center ${isBookmarked ? 'bg-amber-500 text-black' : ''}" id="modalFavBtn">
          ${isBookmarked ? '🔖' : '📑'}
        </button>
      </div>

      <p class="text-xs text-slate-300 mb-5 leading-relaxed">${desc}</p>

      <div class="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-xl border border-white/10 text-center mb-4 text-xs">
        <div>
          <div class="text-[10px] text-slate-500">${t.prepTime}</div>
          <div class="font-bold text-white mt-0.5">⏱️ ${item.prepMinutes}m</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-500">${t.calories}</div>
          <div class="font-bold text-white mt-0.5">🔥 ${item.calories}k</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-500">Rating</div>
          <div class="font-bold text-amber-400 mt-0.5">★ ${item.rating}</div>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">${t.allergens}</div>
        <p class="text-xs text-slate-300">${allergens}</p>
      </div>

      ${chefTip ? `
        <div class="mb-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300">
          <div class="font-bold mb-0.5">💡 ${t.chefTip}</div>
          <div>"${chefTip}"</div>
        </div>
      ` : ''}

      ${pairing ? `
        <div class="bg-slate-900 p-3 rounded-xl border border-white/10 flex items-center gap-3 text-xs">
          <span class="text-xl">🍷</span>
          <div>
            <div class="font-bold text-white">${pairing}</div>
            <div class="text-[10px] text-slate-400">Recommended drink pairing</div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  showModal(elements.dishModalOverlay);

  const modalFavBtn = document.getElementById('modalFavBtn');
  if (modalFavBtn) {
    modalFavBtn.addEventListener('click', () => {
      toggleWishlist(item.id);
      openDishModal(item.id);
    });
  }
}

// Render Selection Drawer
function renderSelectionDrawer() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  if (!elements.drawerItemsList) return;

  if (state.mySelection.size === 0) {
    elements.drawerItemsList.innerHTML = `
      <div class="text-center py-10 text-slate-400">
        <div class="text-3xl mb-2">📑</div>
        <h4 class="font-bold text-white text-sm">${t.selectionEmpty}</h4>
        <p class="text-xs mt-1 text-slate-500">${t.selectionSubhead}</p>
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
      <div class="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-white/10 rounded-xl">
        <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover" alt="${title}" />
        <div class="flex-1">
          <div class="font-semibold text-xs text-white">${title}</div>
          <div class="font-bold text-amber-400 text-xs">${priceFormatted}</div>
        </div>
        <button class="text-slate-400 hover:text-rose-400 px-2 py-1 text-xs" data-remove="${item.id}" title="Remove">✕</button>
      </div>
    `;
  });

  html += `
    <div class="mt-3 pt-3 border-t border-dashed border-white/10 flex justify-between font-bold text-sm">
      <span class="text-slate-300">Total Estimated:</span>
      <span class="text-amber-400">${formatPrice(totalETB)}</span>
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

// Generate Universal Table QR Code
function renderUniversalQrCode() {
  const universalUrl = window.location.origin + '/menu';
  if (!elements.qrCanvasBox) return;

  elements.qrCanvasBox.innerHTML = `
    <div class="bg-white p-3.5 rounded-xl inline-block shadow-xl">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(universalUrl)}" alt="Universal Restaurant Table QR Code" class="block mx-auto w-44 h-44" />
    </div>
    <p class="text-xs text-slate-400 mt-3 break-all">
      📍 <span class="text-amber-400 font-semibold">Table QR Menu URL:</span> ${universalUrl}
    </p>
  `;
}

// Bind Event Handlers
function bindEvents() {
  // Theme Toggle
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('lumiere_theme', state.theme);
      elements.themeToggleBtn.textContent = state.theme === 'dark' ? '🌙' : '☀️';
    });
  }

  // Language Switcher
  if (elements.langSelect) {
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
  }

  // Currency Switcher
  if (elements.currencySelect) {
    elements.currencySelect.addEventListener('change', (e) => {
      state.currentCurrency = e.target.value;
      localStorage.setItem('lumiere_currency', state.currentCurrency);
      renderMenuGrid();
      renderSelectionDrawer();
    });
  }

  // Live Search Input
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenuGrid();
    });
  }

  // Drawer Controls
  const openDrawerHandler = () => {
    renderSelectionDrawer();
    showModal(elements.selectionDrawerOverlay);
  };

  if (elements.openSelectionBtn) elements.openSelectionBtn.addEventListener('click', openDrawerHandler);
  if (elements.openSelectionBtnMobile) elements.openSelectionBtnMobile.addEventListener('click', openDrawerHandler);

  if (elements.closeSelectionBtn) {
    elements.closeSelectionBtn.addEventListener('click', () => {
      hideModal(elements.selectionDrawerOverlay);
    });
  }

  if (elements.clearSelectionBtn) {
    elements.clearSelectionBtn.addEventListener('click', () => {
      state.mySelection.clear();
      localStorage.removeItem('lumiere_selection');
      updateSelectionCount();
      renderMenuGrid();
      renderSelectionDrawer();
    });
  }

  // Modal Closures
  if (elements.closeDishModalBtn) {
    elements.closeDishModalBtn.addEventListener('click', () => {
      hideModal(elements.dishModalOverlay);
    });
  }

  if (elements.dishModalOverlay) {
    elements.dishModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.dishModalOverlay) {
        hideModal(elements.dishModalOverlay);
      }
    });
  }

  // Attach QR Modal Triggers to ALL [data-open-qr] elements
  document.querySelectorAll('[data-open-qr]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      renderUniversalQrCode();
      showModal(elements.qrModalOverlay);
    });
  });

  if (elements.closeQrBtn) {
    elements.closeQrBtn.addEventListener('click', () => {
      hideModal(elements.qrModalOverlay);
    });
  }

  if (elements.qrModalOverlay) {
    elements.qrModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.qrModalOverlay) {
        hideModal(elements.qrModalOverlay);
      }
    });
  }

  // Copy Link Action
  if (elements.copyUrlBtn) {
    elements.copyUrlBtn.addEventListener('click', () => {
      const menuUrl = window.location.origin + '/menu';
      navigator.clipboard.writeText(menuUrl);
      alert('Table QR Menu URL copied to clipboard!');
    });
  }

  // Print QR Code Action
  if (elements.printQrBtn) {
    elements.printQrBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Share Menu Action
  if (elements.shareMenuBtn) {
    elements.shareMenuBtn.addEventListener('click', () => {
      const menuUrl = window.location.origin + '/menu';
      if (navigator.share) {
        navigator.share({
          title: 'Selam Restaurant Digital Menu',
          text: 'Explore Selam Restaurant authentic Ethiopian digital menu!',
          url: menuUrl
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(menuUrl);
        alert('Menu link copied to clipboard!');
      }
    });
  }

  // Feedback Modal Actions
  if (elements.openFeedbackBtn) {
    elements.openFeedbackBtn.addEventListener('click', () => {
      showModal(elements.feedbackModalOverlay);
    });
  }

  if (elements.closeFeedbackBtn) {
    elements.closeFeedbackBtn.addEventListener('click', () => {
      hideModal(elements.feedbackModalOverlay);
    });
  }

  if (elements.feedbackModalOverlay) {
    elements.feedbackModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.feedbackModalOverlay) {
        hideModal(elements.feedbackModalOverlay);
      }
    });
  }

  // Submit Feedback Action
  if (elements.feedbackForm) {
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
          body: JSON.stringify({ rating: 5, guestName, comment })
        });
      } catch (err) {
        console.log('Feedback logged client-side');
      }

      alert(t.feedbackSuccess);
      hideModal(elements.feedbackModalOverlay);
      elements.feedbackForm.reset();
    });
  }
}

// Run Application on Load
document.addEventListener('DOMContentLoaded', init);
