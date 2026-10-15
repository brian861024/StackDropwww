/**
 * WattCalc — 分享功能
 * base64 編碼 / 解碼計算結果
 */

'use strict';

const SHARE_VERSION = 1;

/**
 * 將 state 快照序列化成 URL-safe base64 字串
 * @param {Object} snapshot  state.snapshot() 的輸出
 * @returns {string}
 */
function encodeResult(snapshot) {
  const payload = { v: SHARE_VERSION, ...snapshot };
  const json    = JSON.stringify(payload);
  // btoa 需要 ASCII，使用 encodeURIComponent 處理中文
  const b64     = btoa(unescape(encodeURIComponent(json)));
  return b64;
}

/**
 * 將 URL-safe base64 字串還原為 state 快照
 * @param {string} encoded
 * @returns {Object|null}
 */
function decodeResult(encoded) {
  try {
    const json    = decodeURIComponent(escape(atob(encoded)));
    const payload = JSON.parse(json);
    if (!payload || payload.v !== SHARE_VERSION) return null;
    const { v, ...snapshot } = payload;
    return snapshot;
  } catch (e) {
    console.warn('[WattCalc] 解碼分享連結失敗:', e);
    return null;
  }
}

/**
 * 產生完整分享 URL
 * @param {Object} snapshot
 * @returns {string}
 */
function buildShareUrl(snapshot) {
  const encoded = encodeResult(snapshot);
  const base    = location.href.replace(/\/[^/]*$/, '/result.html');
  return `${base}?d=${encoded}`;
}

/**
 * 從目前的 URL 讀取 d 參數並解碼
 * @returns {Object|null}
 */
function readShareFromUrl() {
  const params  = new URLSearchParams(location.search);
  const encoded = params.get('d');
  if (!encoded) return null;
  return decodeResult(encoded);
}

/**
 * 複製文字到剪貼簿，回傳 Promise<boolean>
 * @param {string} text
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    return success;
  } catch {
    return false;
  }
}
