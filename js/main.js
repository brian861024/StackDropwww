/**
 * WattCalc — 主程式入口
 * 初始化、事件綁定、狀態訂閱
 */

'use strict';

/* ══════════════════════════════════════════════
   初始化
══════════════════════════════════════════════ */
function init() {
  // 渲染靜態內容
  renderSocketSection();
  renderCategoryTabs();

  // 綁定事件
  bindNavEvents();
  bindHeroEvents();
  bindPartsEvents();
  bindPowerEvents();
  bindResultEvents();

  // 訂閱狀態變更
  subscribeState();

  // scroll 監聽
  initScrollListener();

  // IntersectionObserver 進場動畫
  initScrollAnimations();

  // 初始 UI 更新
  updatePartsNextBtn([]);
}

/* ══════════════════════════════════════════════
   Scroll 監聽 → 進度條 / 導航點 / Header
══════════════════════════════════════════════ */
function initScrollListener() {
  let ticking = false;
  DOM.snapContainer.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const idx = getCurrentSectionIndex();
        updateProgressBar(idx);
        updateStepNav(idx);
        updateHeader(idx);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════
   導航點事件
══════════════════════════════════════════════ */
function bindNavEvents() {
  $$('#step-nav .step-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      scrollToSection(dot.dataset.target);
    });
  });
}

/* ══════════════════════════════════════════════
   Hero Section 事件
══════════════════════════════════════════════ */
function bindHeroEvents() {
  DOM.heroCta?.addEventListener('click', () => {
    scrollToSection('section-socket');
  });

  DOM.heroLearn?.addEventListener('click', () => {
    scrollToSection('section-features');
  });

  // features section CTA
  document.getElementById('features-cta')?.addEventListener('click', () => {
    scrollToSection('section-socket');
  });
}

/* ══════════════════════════════════════════════
   Parts Section 事件
══════════════════════════════════════════════ */
function bindPartsEvents() {
  // 搜尋欄
  DOM.partsSearch?.addEventListener('input', e => {
    state.setSearchQuery(e.target.value);
  });

  // 返回腳位選擇
  DOM.partsBack?.addEventListener('click', () => {
    scrollToSection('section-socket');
  });

  // 下一步：電費設定
  DOM.partsNext?.addEventListener('click', () => {
    if (!DOM.partsNext.disabled) {
      updatePowerPreview();
      scrollToSection('section-power');
    }
  });
}

/* ══════════════════════════════════════════════
   Power Section 事件
══════════════════════════════════════════════ */
function bindPowerEvents() {
  DOM.priceInput?.addEventListener('input', e => {
    state.setPricePerKwh(e.target.value);
  });

  DOM.hoursInput?.addEventListener('input', e => {
    state.setHoursPerDay(e.target.value);
  });

  DOM.powerBack?.addEventListener('click', () => {
    scrollToSection('section-parts');
  });

  DOM.powerNext?.addEventListener('click', () => {
    renderResult();
    scrollToSection('section-result');
  });
}

/* ══════════════════════════════════════════════
   Result Section 事件
══════════════════════════════════════════════ */
function bindResultEvents() {
  DOM.resultShare?.addEventListener('click', async () => {
    const url = buildShareUrl(state.snapshot());
    const ok  = await copyToClipboard(url);
    showToast(ok ? '✓ 分享連結已複製到剪貼簿！' : '分享連結：' + url, 3000);
  });

  DOM.resultRestart?.addEventListener('click', () => {
    state.reset();
    renderCategoryTabs();
    renderPartsList(null, 'cpu', '');
    DOM.partsSearch.value = '';
    scrollToSection('section-socket');
    // 清除腳位選取高亮
    $$('.socket-card').forEach(c => c.classList.remove('selected'));
  });
}

/* ══════════════════════════════════════════════
   狀態訂閱
══════════════════════════════════════════════ */
function subscribeState() {
  /* 腳位改變 → 重新渲染零件清單 */
  state.on('socketChanged', socketId => {
    renderPartsList(socketId, state.activeCategory, state.searchQuery);
  });

  /* 零件改變 → 更新計量器、按鈕狀態 */
  state.on('partsChanged', partIds => {
    updateWattMeter(partIds);
    updatePartsNextBtn(partIds);
    updatePowerPreview();
  });

  /* 類別切換 → 重新渲染零件清單 */
  state.on('categoryChanged', cat => {
    updateCategoryTabs(cat);
    renderPartsList(state.selectedSocket, cat, state.searchQuery);
  });

  /* 搜尋 → 重新渲染 */
  state.on('searchChanged', query => {
    renderPartsList(state.selectedSocket, state.activeCategory, query);
  });

  /* 電費設定 → 更新預覽 */
  state.on('powerSettingsChanged', () => {
    updatePowerPreview();
  });

  /* 重設 */
  state.on('reset', () => {
    updateWattMeter([]);
    updatePartsNextBtn([]);
    DOM.wattMeter.classList.remove('visible');
    if (DOM.heroCardValue) DOM.heroCardValue.textContent = '—';
  });

  /* 從 URL 還原 */
  state.on('restored', () => {
    restoreSocketSelection();
    renderCategoryTabs();
    if (state.selectedSocket) {
      renderPartsList(state.selectedSocket, state.activeCategory, '');
    }
    updateWattMeter(state.selectedPartIds);
    updatePartsNextBtn(state.selectedPartIds);
  });
}

/* ══════════════════════════════════════════════
   啟動
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', init);
