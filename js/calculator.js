/**
 * WattCalc — 計算引擎
 * 瓦數計算、PSU 建議、電費試算
 */

'use strict';

/** 固定系統額外耗電 */
const SYSTEM_BASE_WATT    = 50;  // 主機板 + 其他
const IGPU_FALLBACK_WATT  = 10;  // 若未選獨顯則加此值
const PSU_OVERHEAD_RATIO  = 1.20; // PSU 建議加 20% 餘量
const PSU_ROUND_TO        = 50;   // 取整至最近 50W
const PSU_MIN_WATT        = 350;  // 最低建議 PSU

/**
 * 計算已選零件的峰值瓦數總和
 *
 * @param {string[]} selectedPartIds   已選零件 ID 陣列
 * @returns {{
 *   totalPeakWatt: number,
 *   breakdown: Array<{ id, name, category, peakWatt }>,
 *   hasGpu: boolean
 * }}
 */
function calcTotalWatt(selectedPartIds) {
  const breakdown = [];
  let totalPeakWatt = SYSTEM_BASE_WATT;

  // 加入主機板固定耗電作為明細
  breakdown.push({ id: '_mobo', name: '主機板', category: 'system', peakWatt: SYSTEM_BASE_WATT });

  let hasGpu = false;

  for (const id of selectedPartIds) {
    const comp = getComponentById(id);
    if (!comp) continue;
    if (comp.category === 'gpu') hasGpu = true;
    totalPeakWatt += comp.peakWatt;
    breakdown.push({ id: comp.id, name: comp.name, category: comp.category, peakWatt: comp.peakWatt });
  }

  // 無獨顯時加入 iGPU 估算
  if (!hasGpu) {
    totalPeakWatt += IGPU_FALLBACK_WATT;
    breakdown.push({ id: '_igpu', name: '整合顯示 (iGPU)', category: 'system', peakWatt: IGPU_FALLBACK_WATT });
  }

  return { totalPeakWatt, breakdown, hasGpu };
}

/**
 * 根據峰值瓦數建議 PSU 規格
 *
 * @param {number} totalPeakWatt
 * @returns {number} 建議 PSU 瓦數
 */
function suggestPSU(totalPeakWatt) {
  const raw = totalPeakWatt * PSU_OVERHEAD_RATIO;
  const rounded = Math.ceil(raw / PSU_ROUND_TO) * PSU_ROUND_TO;
  return Math.max(rounded, PSU_MIN_WATT);
}

/**
 * 計算電費
 *
 * @param {number} totalPeakWatt  峰值功耗（瓦）
 * @param {number} hoursPerDay    每日使用時數
 * @param {number} pricePerKwh    每度電費（元）
 * @returns {{
 *   dailyCost:   number,
 *   monthlyCost: number,
 *   yearlyCost:  number,
 *   kwhPerMonth: number,
 * }}
 */
function calcElectricity(totalPeakWatt, hoursPerDay, pricePerKwh) {
  const kwhPerDay   = (totalPeakWatt / 1000) * hoursPerDay;
  const kwhPerMonth = kwhPerDay * 30;
  const kwhPerYear  = kwhPerDay * 365;

  const dailyCost   = kwhPerDay   * pricePerKwh;
  const monthlyCost = kwhPerMonth * pricePerKwh;
  const yearlyCost  = kwhPerYear  * pricePerKwh;

  return {
    dailyCost:   Math.round(dailyCost   * 100) / 100,
    monthlyCost: Math.round(monthlyCost * 100) / 100,
    yearlyCost:  Math.round(yearlyCost  * 100) / 100,
    kwhPerMonth: Math.round(kwhPerMonth * 10)  / 10,
  };
}

/**
 * 取得完整計算結果（組合所有函式）
 *
 * @param {string[]} selectedPartIds
 * @param {number}   pricePerKwh
 * @param {number}   hoursPerDay
 * @returns {{
 *   totalPeakWatt: number,
 *   suggestedPSU:  number,
 *   breakdown:     Array,
 *   hasGpu:        boolean,
 *   electricity:   Object,
 * }}
 */
function getFullResult(selectedPartIds, pricePerKwh, hoursPerDay) {
  const { totalPeakWatt, breakdown, hasGpu } = calcTotalWatt(selectedPartIds);
  const suggestedPSU = suggestPSU(totalPeakWatt);
  const electricity  = calcElectricity(totalPeakWatt, hoursPerDay, pricePerKwh);

  return { totalPeakWatt, suggestedPSU, breakdown, hasGpu, electricity };
}

/**
 * 取得 PSU 建議等級文字
 * @param {number} totalPeakWatt
 * @returns {{ watt: number, label: string, grade: 'ok'|'warn'|'danger' }}
 */
function getPSUGrade(totalPeakWatt) {
  const watt = suggestPSU(totalPeakWatt);
  let label, grade;
  if (watt <= 550) {
    label = '入門電供';
    grade = 'ok';
  } else if (watt <= 750) {
    label = '中階電供';
    grade = 'ok';
  } else if (watt <= 1000) {
    label = '高階電供';
    grade = 'warn';
  } else {
    label = '旗艦電供';
    grade = 'danger';
  }
  return { watt, label, grade };
}

/**
 * 格式化瓦數顯示
 * @param {number} w
 * @returns {string}
 */
function formatWatt(w) {
  return w.toLocaleString('zh-TW') + ' W';
}

/**
 * 格式化金額顯示
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return 'NT$ ' + Math.round(amount).toLocaleString('zh-TW');
}
