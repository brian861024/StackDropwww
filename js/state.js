/**
 * WattCalc — 狀態管理
 * 單一狀態物件 + mini 事件匯流排
 */

'use strict';

/* ══════════════════════════════════════════════
   初始狀態
══════════════════════════════════════════════ */
const _state = {
  /** 目前選擇的腳位世代 ID，例如 'LGA1155' */
  selectedSocket: null,

  /** 已選擇的零件 ID 集合 { [componentId]: true } */
  selectedParts: {},

  /** 電費設定 */
  pricePerKwh: 3.5,    // 元 / 度
  hoursPerDay: 8,       // 小時 / 天

  /** 目前顯示的類別 Tab */
  activeCategory: 'cpu',

  /** 搜尋關鍵字 */
  searchQuery: '',
};

/* ══════════════════════════════════════════════
   事件匯流排
══════════════════════════════════════════════ */
const _listeners = {};

/**
 * 訂閱事件
 * @param {string} event
 * @param {Function} callback
 * @returns {Function} unsubscribe 函式
 */
function subscribe(event, callback) {
  if (!_listeners[event]) _listeners[event] = [];
  _listeners[event].push(callback);
  return () => {
    _listeners[event] = _listeners[event].filter(cb => cb !== callback);
  };
}

/**
 * 發布事件
 * @param {string} event
 * @param {*} payload
 */
function emit(event, payload) {
  (_listeners[event] || []).forEach(cb => cb(payload));
}

/* ══════════════════════════════════════════════
   Getter / Setter
══════════════════════════════════════════════ */

const state = {
  /* ── 讀取 ── */
  get selectedSocket()  { return _state.selectedSocket; },
  get selectedParts()   { return { ..._state.selectedParts }; },
  get pricePerKwh()     { return _state.pricePerKwh; },
  get hoursPerDay()     { return _state.hoursPerDay; },
  get activeCategory()  { return _state.activeCategory; },
  get searchQuery()     { return _state.searchQuery; },

  /** 已選擇的零件 ID 陣列 */
  get selectedPartIds() {
    return Object.keys(_state.selectedParts).filter(id => _state.selectedParts[id]);
  },

  /* ── 設定腳位世代 ── */
  setSocket(socketId) {
    if (_state.selectedSocket === socketId) return;
    _state.selectedSocket = socketId;
    // 切換腳位時清空已選零件
    _state.selectedParts = {};
    _state.activeCategory = 'cpu';
    _state.searchQuery = '';
    emit('socketChanged', socketId);
    emit('partsChanged', this.selectedPartIds);
  },

  /* ── 切換零件選取 ── */
  togglePart(componentId) {
    if (_state.selectedParts[componentId]) {
      delete _state.selectedParts[componentId];
    } else {
      _state.selectedParts[componentId] = true;
    }
    emit('partsChanged', this.selectedPartIds);
  },

  /* ── 設定是否選中某零件 ── */
  setPart(componentId, selected) {
    if (selected) {
      _state.selectedParts[componentId] = true;
    } else {
      delete _state.selectedParts[componentId];
    }
    emit('partsChanged', this.selectedPartIds);
  },

  /* ── 清空所有零件 ── */
  clearParts() {
    _state.selectedParts = {};
    emit('partsChanged', []);
  },

  /* ── 設定電費 ── */
  setPricePerKwh(val) {
    const v = parseFloat(val);
    if (isNaN(v) || v <= 0) return;
    _state.pricePerKwh = v;
    emit('powerSettingsChanged', { pricePerKwh: v, hoursPerDay: _state.hoursPerDay });
  },

  /* ── 設定每日使用時數 ── */
  setHoursPerDay(val) {
    const v = parseFloat(val);
    if (isNaN(v) || v <= 0 || v > 24) return;
    _state.hoursPerDay = v;
    emit('powerSettingsChanged', { pricePerKwh: _state.pricePerKwh, hoursPerDay: v });
  },

  /* ── 設定類別 Tab ── */
  setActiveCategory(cat) {
    if (_state.activeCategory === cat) return;
    _state.activeCategory = cat;
    emit('categoryChanged', cat);
  },

  /* ── 設定搜尋關鍵字 ── */
  setSearchQuery(q) {
    _state.searchQuery = q;
    emit('searchChanged', q);
  },

  /* ── 重設全部狀態 ── */
  reset() {
    _state.selectedSocket = null;
    _state.selectedParts = {};
    _state.pricePerKwh = 3.5;
    _state.hoursPerDay = 8;
    _state.activeCategory = 'cpu';
    _state.searchQuery = '';
    emit('reset');
  },

  /* ── 從序列化物件還原 ── */
  restore(snapshot) {
    _state.selectedSocket  = snapshot.selectedSocket  ?? null;
    _state.selectedParts   = snapshot.selectedParts   ?? {};
    _state.pricePerKwh     = snapshot.pricePerKwh     ?? 3.5;
    _state.hoursPerDay     = snapshot.hoursPerDay     ?? 8;
    _state.activeCategory  = 'cpu';
    _state.searchQuery     = '';
    emit('restored', snapshot);
    emit('partsChanged', this.selectedPartIds);
  },

  /* ── 匯出可序列化的快照 ── */
  snapshot() {
    return {
      selectedSocket: _state.selectedSocket,
      selectedParts:  { ..._state.selectedParts },
      pricePerKwh:    _state.pricePerKwh,
      hoursPerDay:    _state.hoursPerDay,
    };
  },

  /* ── 訂閱 ── */
  on:  subscribe,
};
