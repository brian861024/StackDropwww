/**
 * WattCalc — UI 渲染層
 * 負責所有 DOM 操作、渲染與動畫觸發
 */

'use strict';

/* ══════════════════════════════════════════════
   DOM 參考快取
══════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const DOM = {
  snapContainer:  $('snap-container'),
  progressBar:    $('progress-bar'),
  siteHeader:     $('site-header'),
  stepNav:        $('step-nav'),
  wattMeter:      $('watt-meter'),
  wattMeterVal:   $('watt-meter-value'),
  wattMeterPsu:   $('watt-meter-psu'),
  toast:          $('toast'),

  /* Hero */
  heroCta:        $('hero-cta'),
  heroLearn:      $('hero-learn'),
  heroCardValue:  document.querySelector('.hero-card-preview__value'),
  heroCardRows:   document.querySelectorAll('.hero-card-preview__row span:last-child'),

  /* Socket */
  socketGrid:     $('socket-grid'),

  /* Parts */
  categoryTabs:   $('category-tabs'),
  partsList:      $('parts-list'),
  partsSearch:    $('parts-search'),
  partsBack:      $('parts-back'),
  partsNext:      $('parts-next'),

  /* Power */
  priceInput:     $('price-per-kwh'),
  hoursInput:     $('hours-per-day'),
  previewWatt:    $('preview-watt'),
  previewMonthly: $('preview-monthly'),
  previewYearly:  $('preview-yearly'),
  powerBack:      $('power-back'),
  powerNext:      $('power-next'),

  /* Result */
  resultTotalWatt:  $('result-total-watt'),
  resultPsuNote:    $('result-psu-note'),
  resultStats:      $('result-stats'),
  resultBreakdown:  $('result-breakdown'),
  resultPartsCount: $('result-parts-count'),
  resultShare:      $('result-share'),
  resultRestart:    $('result-restart'),
};

/* ══════════════════════════════════════════════
   Section 導航
══════════════════════════════════════════════ */
const SECTIONS = [
  'section-hero', 'section-features', 'section-socket',
  'section-parts', 'section-power', 'section-result'
];

function scrollToSection(idOrIndex) {
  const id = typeof idOrIndex === 'number' ? SECTIONS[idOrIndex] : idOrIndex;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function getCurrentSectionIndex() {
  const container = DOM.snapContainer;
  const scrollTop = container.scrollTop;
  const height    = container.clientHeight;
  return Math.round(scrollTop / height);
}

function updateProgressBar(idx) {
  const pct = (idx / (SECTIONS.length - 1)) * 100;
  DOM.progressBar.style.width = pct + '%';
}

function updateStepNav(idx) {
  $$('#step-nav .step-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

function updateHeader(idx) {
  DOM.siteHeader.classList.toggle('scrolled', idx > 0);
}

/* ══════════════════════════════════════════════
   Section 3 — 腳位選擇
══════════════════════════════════════════════ */
function renderSocketSection() {
  const sockets = getSocketList();
  const frag = document.createDocumentFragment();

  sockets.forEach(s => {
    const card = document.createElement('button');
    card.className = 'socket-card';
    card.dataset.socketId = s.id;
    card.setAttribute('aria-label', `選擇 ${s.name}`);
    card.innerHTML = `
      <span class="socket-card__era">${s.years}</span>
      <span class="socket-card__name">${s.name}</span>
      <span class="socket-card__brand socket-card__brand--${s.brand}">
        ${s.brand === 'intel' ? 'Intel' : 'AMD'}
      </span>
      <span class="socket-card__years">${s.desc}</span>
    `;
    card.addEventListener('click', () => {
      state.setSocket(s.id);
      // 更新 selected 樣式
      $$('.socket-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      // 延遲後滾動到下一個 Section
      setTimeout(() => scrollToSection('section-parts'), 320);
    });
    frag.appendChild(card);
  });

  DOM.socketGrid.appendChild(frag);

  // 觸發序列進場
  requestAnimationFrame(() => {
    DOM.socketGrid.classList.add('animate');
  });
}

/* ══════════════════════════════════════════════
   Section 4 — 類別 Tabs
══════════════════════════════════════════════ */
function renderCategoryTabs() {
  const cats = getCategoryList();
  DOM.categoryTabs.innerHTML = '';

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-tab';
    btn.dataset.catId = cat.id;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cat.id === state.activeCategory ? 'true' : 'false');
    btn.textContent = cat.label;
    if (cat.id === state.activeCategory) btn.classList.add('active');

    btn.addEventListener('click', () => {
      state.setActiveCategory(cat.id);
    });
    DOM.categoryTabs.appendChild(btn);
  });
}

function updateCategoryTabs(activeCat) {
  $$('#category-tabs .category-tab').forEach(btn => {
    const isActive = btn.dataset.catId === activeCat;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

/* ══════════════════════════════════════════════
   Section 4 — 零件清單
══════════════════════════════════════════════ */
function renderPartsList(socketId, category, query) {
  let items;
  if (query && query.trim()) {
    items = searchComponents(socketId, query).filter(c => c.category === category);
  } else {
    items = getComponentsByCategory(socketId, category);
  }

  DOM.partsList.innerHTML = '';

  if (!items.length) {
    DOM.partsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <div class="empty-state__text">找不到符合的零件</div>
      </div>
    `;
    return;
  }

  const frag = document.createDocumentFragment();
  items.forEach(comp => {
    const isSelected = !!state.selectedParts[comp.id];
    const card = document.createElement('div');
    card.className = 'part-card' + (isSelected ? ' selected' : '');
    card.dataset.partId = comp.id;
    card.setAttribute('role', 'checkbox');
    card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="part-card__check">
        <span class="part-card__check-icon" aria-hidden="true">✓</span>
      </div>
      <div class="part-card__info">
        <div class="part-card__name" title="${comp.name}">${comp.name}</div>
        <div class="part-card__tdp">TDP ${comp.tdp}W · ${comp.releaseYear}</div>
      </div>
      <div class="part-card__watt">${comp.peakWatt}W</div>
    `;

    const toggle = () => {
      state.togglePart(comp.id);
      const sel = !!state.selectedParts[comp.id];
      card.classList.toggle('selected', sel);
      card.setAttribute('aria-checked', sel ? 'true' : 'false');
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    frag.appendChild(card);
  });

  DOM.partsList.appendChild(frag);
}

/* ══════════════════════════════════════════════
   即時瓦數計量器更新
══════════════════════════════════════════════ */
function updateWattMeter(selectedPartIds) {
  const hasAny = selectedPartIds.length > 0;
  DOM.wattMeter.classList.toggle('visible', hasAny);

  if (!hasAny) return;

  const { totalPeakWatt } = calcTotalWatt(selectedPartIds);
  const psuWatt = suggestPSU(totalPeakWatt);

  const prevVal = DOM.wattMeterVal.textContent;
  const newVal  = totalPeakWatt.toString();
  if (prevVal !== newVal) {
    DOM.wattMeterVal.textContent = newVal;
    DOM.wattMeterVal.classList.remove('anim-number-change');
    void DOM.wattMeterVal.offsetWidth; // reflow
    DOM.wattMeterVal.classList.add('anim-number-change');
  }

  DOM.wattMeterPsu.textContent = psuWatt + ' W';

  // Hero 卡片預覽同步
  if (DOM.heroCardValue) DOM.heroCardValue.textContent = totalPeakWatt;
}

/* ══════════════════════════════════════════════
   Parts Next 按鈕狀態
══════════════════════════════════════════════ */
function updatePartsNextBtn(selectedPartIds) {
  const hasCpu = selectedPartIds.some(id => {
    const c = getComponentById(id);
    return c && c.category === 'cpu';
  });
  DOM.partsNext.disabled = !hasCpu;
}

/* ══════════════════════════════════════════════
   Section 5 — 電費預覽
══════════════════════════════════════════════ */
function updatePowerPreview() {
  const partIds = state.selectedPartIds;
  const { totalPeakWatt } = calcTotalWatt(partIds);
  const { monthlyCost, yearlyCost } = calcElectricity(
    totalPeakWatt, state.hoursPerDay, state.pricePerKwh
  );

  DOM.previewWatt.textContent    = totalPeakWatt;
  DOM.previewMonthly.textContent = formatCurrency(monthlyCost);
  DOM.previewYearly.textContent  = formatCurrency(yearlyCost);
}

/* ══════════════════════════════════════════════
   Section 6 — 結果渲染
══════════════════════════════════════════════ */
function renderResult() {
  const partIds = state.selectedPartIds;
  const result  = getFullResult(partIds, state.pricePerKwh, state.hoursPerDay);
  const { totalPeakWatt, suggestedPSU, breakdown, electricity } = result;
  const { monthlyCost, yearlyCost, kwhPerMonth } = electricity;
  const psuInfo = getPSUGrade(totalPeakWatt);

  /* 主數字 */
  DOM.resultTotalWatt.textContent = totalPeakWatt.toLocaleString('zh-TW');
  DOM.resultPsuNote.textContent   = `建議電供：${suggestedPSU} W（${psuInfo.label}）`;

  /* 統計格 */
  DOM.resultStats.innerHTML = `
    <div class="result-stat">
      <div class="result-stat__label">建議電供</div>
      <div class="result-stat__value">${suggestedPSU}<span class="result-stat__unit">W</span></div>
    </div>
    <div class="result-stat">
      <div class="result-stat__label">每月電費</div>
      <div class="result-stat__value">${Math.round(monthlyCost).toLocaleString('zh-TW')}<span class="result-stat__unit">元</span></div>
    </div>
    <div class="result-stat">
      <div class="result-stat__label">每年電費</div>
      <div class="result-stat__value">${Math.round(yearlyCost).toLocaleString('zh-TW')}<span class="result-stat__unit">元</span></div>
    </div>
    <div class="result-stat">
      <div class="result-stat__label">每月用電</div>
      <div class="result-stat__value">${kwhPerMonth}<span class="result-stat__unit">度</span></div>
    </div>
    <div class="result-stat">
      <div class="result-stat__label">每日時數</div>
      <div class="result-stat__value">${state.hoursPerDay}<span class="result-stat__unit">小時</span></div>
    </div>
    <div class="result-stat">
      <div class="result-stat__label">電費單價</div>
      <div class="result-stat__value">${state.pricePerKwh}<span class="result-stat__unit">元/度</span></div>
    </div>
  `;

  /* 零件明細（排除系統項目） */
  const userBreakdown = breakdown.filter(b => !b.id.startsWith('_'));
  DOM.resultPartsCount.textContent = userBreakdown.length + ' 件';

  DOM.resultBreakdown.innerHTML = breakdown.map(b => `
    <div class="parts-breakdown__item">
      <span class="parts-breakdown__name">${b.name}</span>
      <span class="parts-breakdown__watt">${b.peakWatt} W</span>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════════
   Toast 提示
══════════════════════════════════════════════ */
let _toastTimer;
function showToast(message, duration = 2500) {
  DOM.toast.textContent = message;
  DOM.toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), duration);
}

/* ══════════════════════════════════════════════
   IntersectionObserver — 進場動畫
══════════════════════════════════════════════ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.anim-fade-up, .anim-fade-in, .anim-scale-in').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   Socket 選取恢復（從 state 讀取）
══════════════════════════════════════════════ */
function restoreSocketSelection() {
  if (!state.selectedSocket) return;
  const card = document.querySelector(`.socket-card[data-socket-id="${state.selectedSocket}"]`);
  if (card) card.classList.add('selected');
}
