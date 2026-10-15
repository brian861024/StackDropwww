/**
 * WattCalc — 零組件資料庫
 * 涵蓋 2001 年 Socket 423 至今，CPU 15 個腳位世代，GPU 完整世代
 */

'use strict';

/* ══════════════════════════════════════════════
   腳位世代定義
══════════════════════════════════════════════ */
const SOCKET_LIST = [
  { id: 'S423',     name: 'Socket 423',      brand: 'intel', years: '2001–2002', desc: 'Pentium 4 Willamette' },
  { id: 'S478',     name: 'Socket 478',      brand: 'intel', years: '2002–2004', desc: 'Pentium 4 Northwood / Prescott' },
  { id: 'S604',     name: 'Socket 604',      brand: 'intel', years: '2001–2007', desc: 'Xeon 伺服器 / 工作站' },
  { id: 'S939',     name: 'Socket 754/939/940', brand: 'amd', years: '2003–2007', desc: 'Athlon 64 / Opteron' },
  { id: 'LGA775',   name: 'LGA 775',         brand: 'intel', years: '2004–2011', desc: 'Core 2 Duo / Core 2 Quad' },
  { id: 'LGA1156',  name: 'LGA 1156',        brand: 'intel', years: '2009–2011', desc: 'Core i5 / i7 1st Gen' },
  { id: 'LGA1155',  name: 'LGA 1155',        brand: 'intel', years: '2011–2013', desc: 'Sandy Bridge / Ivy Bridge' },
  { id: 'LGA1150',  name: 'LGA 1150',        brand: 'intel', years: '2013–2015', desc: 'Haswell / Broadwell' },
  { id: 'LGA1151',  name: 'LGA 1151',        brand: 'intel', years: '2015–2021', desc: '6th–9th Gen Core' },
  { id: 'LGA1200',  name: 'LGA 1200',        brand: 'intel', years: '2020–2021', desc: '10th–11th Gen Core' },
  { id: 'LGA1700',  name: 'LGA 1700',        brand: 'intel', years: '2021–present', desc: '12th–14th Gen Core' },
  { id: 'AM2',      name: 'AM2 / AM2+',      brand: 'amd',   years: '2006–2009', desc: 'Athlon 64 X2 / Phenom' },
  { id: 'AM3',      name: 'AM3 / AM3+',      brand: 'amd',   years: '2009–2014', desc: 'Phenom II / FX 系列' },
  { id: 'AM4',      name: 'AM4',             brand: 'amd',   years: '2017–2022', desc: 'Ryzen 1000–5000' },
  { id: 'AM5',      name: 'AM5',             brand: 'amd',   years: '2022–present', desc: 'Ryzen 7000 / 9000' },
];

/* ══════════════════════════════════════════════
   類別定義
══════════════════════════════════════════════ */
const CATEGORY_LIST = [
  { id: 'cpu',     label: 'CPU 處理器',     icon: '⬛' },
  { id: 'gpu',     label: 'GPU 顯示卡',     icon: '🎮' },
  { id: 'ram',     label: '記憶體 RAM',     icon: '📊' },
  { id: 'storage', label: '儲存裝置',        icon: '💾' },
  { id: 'cooling', label: '散熱器',          icon: '❄️' },
  { id: 'fan',     label: '機殼風扇',        icon: '🌀' },
];

/* ══════════════════════════════════════════════
   零組件資料庫
══════════════════════════════════════════════ */
const COMPONENTS = [

  /* ──────────────────────────────────────────
     CPU — Intel Socket 423 (2001–2002)
  ────────────────────────────────────────── */
  { id:'cpu-p4-1500-s423',  name:'Pentium 4 1.5 GHz',            category:'cpu', socket:['S423'], tdp:55,  peakWatt:65,  releaseYear:2001 },
  { id:'cpu-p4-1700-s423',  name:'Pentium 4 1.7 GHz',            category:'cpu', socket:['S423'], tdp:55,  peakWatt:65,  releaseYear:2001 },
  { id:'cpu-p4-1800-s423',  name:'Pentium 4 1.8 GHz',            category:'cpu', socket:['S423'], tdp:62,  peakWatt:75,  releaseYear:2001 },
  { id:'cpu-p4-2000-s423',  name:'Pentium 4 2.0 GHz (S423)',      category:'cpu', socket:['S423'], tdp:62,  peakWatt:75,  releaseYear:2001 },

  /* ──────────────────────────────────────────
     CPU — Intel Socket 478 (2002–2004)
  ────────────────────────────────────────── */
  { id:'cpu-p4-2000-s478',  name:'Pentium 4 2.0 GHz (Northwood)', category:'cpu', socket:['S478'], tdp:52,  peakWatt:62,  releaseYear:2002 },
  { id:'cpu-p4-2400-s478',  name:'Pentium 4 2.4 GHz (Northwood)', category:'cpu', socket:['S478'], tdp:57,  peakWatt:68,  releaseYear:2002 },
  { id:'cpu-p4-2800-s478',  name:'Pentium 4 2.8 GHz (Northwood)', category:'cpu', socket:['S478'], tdp:68,  peakWatt:80,  releaseYear:2002 },
  { id:'cpu-p4-ht-306',     name:'Pentium 4 HT 3.06 GHz',        category:'cpu', socket:['S478'], tdp:82,  peakWatt:95,  releaseYear:2002 },
  { id:'cpu-p4-3000-pre',   name:'Pentium 4 3.0 GHz (Prescott)', category:'cpu', socket:['S478'], tdp:89,  peakWatt:105, releaseYear:2003 },
  { id:'cpu-p4-3200-pre',   name:'Pentium 4 3.2 GHz (Prescott)', category:'cpu', socket:['S478'], tdp:89,  peakWatt:105, releaseYear:2003 },
  { id:'cpu-p4-3400-pre',   name:'Pentium 4 3.4 GHz (Prescott)', category:'cpu', socket:['S478'], tdp:115, peakWatt:135, releaseYear:2003 },
  { id:'cpu-cel-24-s478',   name:'Celeron 2.4 GHz (S478)',        category:'cpu', socket:['S478'], tdp:52,  peakWatt:60,  releaseYear:2002 },
  { id:'cpu-pm-16',         name:'Pentium M 1.6 GHz (Dothan)',    category:'cpu', socket:['S478'], tdp:21,  peakWatt:27,  releaseYear:2004 },
  { id:'cpu-pm-20',         name:'Pentium M 2.0 GHz (Dothan)',    category:'cpu', socket:['S478'], tdp:27,  peakWatt:33,  releaseYear:2004 },

  /* ──────────────────────────────────────────
     CPU — Intel Socket 604 Xeon (2001–2007)
  ────────────────────────────────────────── */
  { id:'cpu-xeon-20-s603',  name:'Xeon 2.0 GHz (Foster, S603)',   category:'cpu', socket:['S604'], tdp:56,  peakWatt:68,  releaseYear:2001 },
  { id:'cpu-xeon-24-s604',  name:'Xeon 2.4 GHz (Prestonia)',      category:'cpu', socket:['S604'], tdp:60,  peakWatt:72,  releaseYear:2002 },
  { id:'cpu-xeon-28-s604',  name:'Xeon 2.8 GHz (Prestonia)',      category:'cpu', socket:['S604'], tdp:66,  peakWatt:79,  releaseYear:2002 },
  { id:'cpu-xeon-30-irw',   name:'Xeon 3.0 GHz (Irwindale)',      category:'cpu', socket:['S604'], tdp:110, peakWatt:130, releaseYear:2005 },
  { id:'cpu-xeon-36-irw',   name:'Xeon 3.6 GHz (Irwindale)',      category:'cpu', socket:['S604'], tdp:110, peakWatt:130, releaseYear:2005 },
  { id:'cpu-xeon-pax',      name:'Xeon DC 3.0 GHz (Paxville)',    category:'cpu', socket:['S604'], tdp:130, peakWatt:155, releaseYear:2005 },

  /* ──────────────────────────────────────────
     CPU — AMD Socket 754 / 939 / 940 (2003–2007)
  ────────────────────────────────────────── */
  { id:'cpu-a64-3200-s754', name:'Athlon 64 3200+ (S754)',         category:'cpu', socket:['S939'], tdp:59,  peakWatt:70,  releaseYear:2003 },
  { id:'cpu-a64-3400-s754', name:'Athlon 64 3400+ (S754)',         category:'cpu', socket:['S939'], tdp:59,  peakWatt:70,  releaseYear:2003 },
  { id:'cpu-a64-3000-s939', name:'Athlon 64 3000+ (S939)',         category:'cpu', socket:['S939'], tdp:67,  peakWatt:80,  releaseYear:2004 },
  { id:'cpu-a64-3500-s939', name:'Athlon 64 3500+ (S939)',         category:'cpu', socket:['S939'], tdp:67,  peakWatt:80,  releaseYear:2004 },
  { id:'cpu-a64-3800-s939', name:'Athlon 64 3800+ (S939)',         category:'cpu', socket:['S939'], tdp:89,  peakWatt:105, releaseYear:2004 },
  { id:'cpu-a64x2-3800',    name:'Athlon 64 X2 3800+ (S939)',      category:'cpu', socket:['S939'], tdp:89,  peakWatt:105, releaseYear:2005 },
  { id:'cpu-a64x2-4400',    name:'Athlon 64 X2 4400+ (S939)',      category:'cpu', socket:['S939'], tdp:110, peakWatt:128, releaseYear:2005 },
  { id:'cpu-a64x2-4800',    name:'Athlon 64 X2 4800+ (S939)',      category:'cpu', socket:['S939'], tdp:110, peakWatt:128, releaseYear:2005 },
  { id:'cpu-a64fx-55',      name:'Athlon 64 FX-55 (S939)',         category:'cpu', socket:['S939'], tdp:104, peakWatt:122, releaseYear:2004 },
  { id:'cpu-a64fx-60',      name:'Athlon 64 FX-60 (S939)',         category:'cpu', socket:['S939'], tdp:110, peakWatt:128, releaseYear:2006 },
  { id:'cpu-opt-146',       name:'Opteron 146 (S940)',             category:'cpu', socket:['S939'], tdp:67,  peakWatt:80,  releaseYear:2005 },
  { id:'cpu-opt-248',       name:'Opteron 248 (S940)',             category:'cpu', socket:['S939'], tdp:89,  peakWatt:105, releaseYear:2004 },

  /* ──────────────────────────────────────────
     CPU — Intel LGA775 (2004–2011)
  ────────────────────────────────────────── */
  { id:'cpu-pd-820',        name:'Pentium D 820',                  category:'cpu', socket:['LGA775'], tdp:95,  peakWatt:110, releaseYear:2005 },
  { id:'cpu-pd-840',        name:'Pentium D 840',                  category:'cpu', socket:['LGA775'], tdp:130, peakWatt:150, releaseYear:2005 },
  { id:'cpu-pd-945',        name:'Pentium D 945',                  category:'cpu', socket:['LGA775'], tdp:95,  peakWatt:110, releaseYear:2006 },
  { id:'cpu-c2d-e4300',     name:'Core 2 Duo E4300',               category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:77,  releaseYear:2007 },
  { id:'cpu-c2d-e6300',     name:'Core 2 Duo E6300',               category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:77,  releaseYear:2006 },
  { id:'cpu-c2d-e6600',     name:'Core 2 Duo E6600',               category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:77,  releaseYear:2006 },
  { id:'cpu-c2d-e7500',     name:'Core 2 Duo E7500',               category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:77,  releaseYear:2009 },
  { id:'cpu-c2d-e8400',     name:'Core 2 Duo E8400',               category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:77,  releaseYear:2008 },
  { id:'cpu-c2d-e8500',     name:'Core 2 Duo E8500',               category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:77,  releaseYear:2008 },
  { id:'cpu-c2d-e8600',     name:'Core 2 Duo E8600',               category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:77,  releaseYear:2008 },
  { id:'cpu-c2q-q6600',     name:'Core 2 Quad Q6600',              category:'cpu', socket:['LGA775'], tdp:105, peakWatt:125, releaseYear:2007 },
  { id:'cpu-c2q-q8200',     name:'Core 2 Quad Q8200',              category:'cpu', socket:['LGA775'], tdp:95,  peakWatt:112, releaseYear:2008 },
  { id:'cpu-c2q-q9400',     name:'Core 2 Quad Q9400',              category:'cpu', socket:['LGA775'], tdp:95,  peakWatt:112, releaseYear:2008 },
  { id:'cpu-c2q-q9550',     name:'Core 2 Quad Q9550',              category:'cpu', socket:['LGA775'], tdp:95,  peakWatt:112, releaseYear:2008 },
  { id:'cpu-c2q-q9650',     name:'Core 2 Quad Q9650',              category:'cpu', socket:['LGA775'], tdp:95,  peakWatt:112, releaseYear:2008 },
  { id:'cpu-c2e-qx9650',    name:'Core 2 Extreme QX9650',          category:'cpu', socket:['LGA775'], tdp:130, peakWatt:152, releaseYear:2007 },
  { id:'cpu-xeon-x3350',    name:'Xeon X3350',                     category:'cpu', socket:['LGA775'], tdp:95,  peakWatt:112, releaseYear:2007 },
  { id:'cpu-cel-e3400',     name:'Celeron E3400',                   category:'cpu', socket:['LGA775'], tdp:65,  peakWatt:75,  releaseYear:2009 },

  /* ──────────────────────────────────────────
     CPU — Intel LGA1156 (2009–2011)
  ────────────────────────────────────────── */
  { id:'cpu-i3-530',        name:'Core i3-530',                    category:'cpu', socket:['LGA1156'], tdp:73,  peakWatt:87,  releaseYear:2010 },
  { id:'cpu-i5-750',        name:'Core i5-750',                    category:'cpu', socket:['LGA1156'], tdp:95,  peakWatt:112, releaseYear:2009 },
  { id:'cpu-i5-760',        name:'Core i5-760',                    category:'cpu', socket:['LGA1156'], tdp:95,  peakWatt:112, releaseYear:2010 },
  { id:'cpu-i7-860',        name:'Core i7-860',                    category:'cpu', socket:['LGA1156'], tdp:95,  peakWatt:112, releaseYear:2009 },
  { id:'cpu-i7-870',        name:'Core i7-870',                    category:'cpu', socket:['LGA1156'], tdp:95,  peakWatt:112, releaseYear:2009 },
  { id:'cpu-i7-875k',       name:'Core i7-875K',                   category:'cpu', socket:['LGA1156'], tdp:95,  peakWatt:112, releaseYear:2010 },
  { id:'cpu-i7-880',        name:'Core i7-880',                    category:'cpu', socket:['LGA1156'], tdp:95,  peakWatt:112, releaseYear:2010 },
  { id:'cpu-xeon-x3470',    name:'Xeon X3470',                     category:'cpu', socket:['LGA1156'], tdp:95,  peakWatt:112, releaseYear:2009 },

  /* ──────────────────────────────────────────
     CPU — Intel LGA1155 (2011–2013)
  ────────────────────────────────────────── */
  { id:'cpu-cel-g530',      name:'Celeron G530',                    category:'cpu', socket:['LGA1155'], tdp:65,  peakWatt:75,  releaseYear:2011 },
  { id:'cpu-pen-g630',      name:'Pentium G630',                    category:'cpu', socket:['LGA1155'], tdp:65,  peakWatt:75,  releaseYear:2011 },
  { id:'cpu-i3-2100',       name:'Core i3-2100',                    category:'cpu', socket:['LGA1155'], tdp:65,  peakWatt:77,  releaseYear:2011 },
  { id:'cpu-i3-2120',       name:'Core i3-2120',                    category:'cpu', socket:['LGA1155'], tdp:65,  peakWatt:77,  releaseYear:2012 },
  { id:'cpu-i5-2300',       name:'Core i5-2300',                    category:'cpu', socket:['LGA1155'], tdp:95,  peakWatt:112, releaseYear:2011 },
  { id:'cpu-i5-2400',       name:'Core i5-2400',                    category:'cpu', socket:['LGA1155'], tdp:95,  peakWatt:112, releaseYear:2011 },
  { id:'cpu-i5-2500',       name:'Core i5-2500',                    category:'cpu', socket:['LGA1155'], tdp:95,  peakWatt:112, releaseYear:2011 },
  { id:'cpu-i5-2500k',      name:'Core i5-2500K',                   category:'cpu', socket:['LGA1155'], tdp:95,  peakWatt:112, releaseYear:2011 },
  { id:'cpu-i7-2600',       name:'Core i7-2600',                    category:'cpu', socket:['LGA1155'], tdp:95,  peakWatt:112, releaseYear:2011 },
  { id:'cpu-i7-2600k',      name:'Core i7-2600K',                   category:'cpu', socket:['LGA1155'], tdp:95,  peakWatt:112, releaseYear:2011 },
  { id:'cpu-i7-2700k',      name:'Core i7-2700K',                   category:'cpu', socket:['LGA1155'], tdp:95,  peakWatt:112, releaseYear:2011 },
  { id:'cpu-i3-3220',       name:'Core i3-3220',                    category:'cpu', socket:['LGA1155'], tdp:55,  peakWatt:65,  releaseYear:2012 },
  { id:'cpu-i5-3470',       name:'Core i5-3470',                    category:'cpu', socket:['LGA1155'], tdp:77,  peakWatt:92,  releaseYear:2012 },
  { id:'cpu-i5-3570',       name:'Core i5-3570',                    category:'cpu', socket:['LGA1155'], tdp:77,  peakWatt:92,  releaseYear:2012 },
  { id:'cpu-i5-3570k',      name:'Core i5-3570K',                   category:'cpu', socket:['LGA1155'], tdp:77,  peakWatt:92,  releaseYear:2012 },
  { id:'cpu-i7-3770',       name:'Core i7-3770',                    category:'cpu', socket:['LGA1155'], tdp:77,  peakWatt:92,  releaseYear:2012 },
  { id:'cpu-i7-3770k',      name:'Core i7-3770K',                   category:'cpu', socket:['LGA1155'], tdp:77,  peakWatt:92,  releaseYear:2012 },
  { id:'cpu-i7-3770s',      name:'Core i7-3770S',                   category:'cpu', socket:['LGA1155'], tdp:65,  peakWatt:78,  releaseYear:2012 },

  /* ──────────────────────────────────────────
     CPU — Intel LGA1150 (2013–2015)
  ────────────────────────────────────────── */
  { id:'cpu-cel-g1820',     name:'Celeron G1820',                   category:'cpu', socket:['LGA1150'], tdp:53,  peakWatt:62,  releaseYear:2013 },
  { id:'cpu-pen-g3220',     name:'Pentium G3220',                   category:'cpu', socket:['LGA1150'], tdp:54,  peakWatt:63,  releaseYear:2013 },
  { id:'cpu-pen-g3258',     name:'Pentium G3258',                   category:'cpu', socket:['LGA1150'], tdp:53,  peakWatt:62,  releaseYear:2014 },
  { id:'cpu-i3-4130',       name:'Core i3-4130',                    category:'cpu', socket:['LGA1150'], tdp:54,  peakWatt:64,  releaseYear:2013 },
  { id:'cpu-i3-4160',       name:'Core i3-4160',                    category:'cpu', socket:['LGA1150'], tdp:54,  peakWatt:64,  releaseYear:2014 },
  { id:'cpu-i5-4430',       name:'Core i5-4430',                    category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2013 },
  { id:'cpu-i5-4440',       name:'Core i5-4440',                    category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2013 },
  { id:'cpu-i5-4460',       name:'Core i5-4460',                    category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2014 },
  { id:'cpu-i5-4570',       name:'Core i5-4570',                    category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2013 },
  { id:'cpu-i5-4590',       name:'Core i5-4590',                    category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2014 },
  { id:'cpu-i5-4670k',      name:'Core i5-4670K',                   category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2013 },
  { id:'cpu-i5-4690k',      name:'Core i5-4690K',                   category:'cpu', socket:['LGA1150'], tdp:88,  peakWatt:105, releaseYear:2014 },
  { id:'cpu-i7-4770',       name:'Core i7-4770',                    category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2013 },
  { id:'cpu-i7-4770k',      name:'Core i7-4770K',                   category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2013 },
  { id:'cpu-i7-4790',       name:'Core i7-4790',                    category:'cpu', socket:['LGA1150'], tdp:84,  peakWatt:100, releaseYear:2014 },
  { id:'cpu-i7-4790k',      name:'Core i7-4790K',                   category:'cpu', socket:['LGA1150'], tdp:88,  peakWatt:105, releaseYear:2014 },
  { id:'cpu-xeon-e3v3',     name:'Xeon E3-1231 v3',                 category:'cpu', socket:['LGA1150'], tdp:80,  peakWatt:95,  releaseYear:2014 },

  /* ──────────────────────────────────────────
     CPU — Intel LGA1151 6th–9th Gen (2015–2021)
  ────────────────────────────────────────── */
  { id:'cpu-pen-g4560',     name:'Pentium G4560',                   category:'cpu', socket:['LGA1151'], tdp:54,  peakWatt:63,  releaseYear:2017 },
  { id:'cpu-i3-6100',       name:'Core i3-6100',                    category:'cpu', socket:['LGA1151'], tdp:51,  peakWatt:60,  releaseYear:2015 },
  { id:'cpu-i3-7100',       name:'Core i3-7100',                    category:'cpu', socket:['LGA1151'], tdp:51,  peakWatt:60,  releaseYear:2017 },
  { id:'cpu-i3-8100',       name:'Core i3-8100',                    category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2017 },
  { id:'cpu-i3-9100f',      name:'Core i3-9100F',                   category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2019 },
  { id:'cpu-i5-6400',       name:'Core i5-6400',                    category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2015 },
  { id:'cpu-i5-6500',       name:'Core i5-6500',                    category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2015 },
  { id:'cpu-i5-6600k',      name:'Core i5-6600K',                   category:'cpu', socket:['LGA1151'], tdp:91,  peakWatt:108, releaseYear:2015 },
  { id:'cpu-i5-7400',       name:'Core i5-7400',                    category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2017 },
  { id:'cpu-i5-7500',       name:'Core i5-7500',                    category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2017 },
  { id:'cpu-i5-7600k',      name:'Core i5-7600K',                   category:'cpu', socket:['LGA1151'], tdp:91,  peakWatt:108, releaseYear:2017 },
  { id:'cpu-i5-8400',       name:'Core i5-8400',                    category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2017 },
  { id:'cpu-i5-8600k',      name:'Core i5-8600K',                   category:'cpu', socket:['LGA1151'], tdp:95,  peakWatt:113, releaseYear:2017 },
  { id:'cpu-i5-9400f',      name:'Core i5-9400F',                   category:'cpu', socket:['LGA1151'], tdp:65,  peakWatt:78,  releaseYear:2019 },
  { id:'cpu-i5-9600k',      name:'Core i5-9600K',                   category:'cpu', socket:['LGA1151'], tdp:95,  peakWatt:113, releaseYear:2018 },
  { id:'cpu-i7-6700k',      name:'Core i7-6700K',                   category:'cpu', socket:['LGA1151'], tdp:91,  peakWatt:108, releaseYear:2015 },
  { id:'cpu-i7-7700k',      name:'Core i7-7700K',                   category:'cpu', socket:['LGA1151'], tdp:91,  peakWatt:108, releaseYear:2017 },
  { id:'cpu-i7-8700k',      name:'Core i7-8700K',                   category:'cpu', socket:['LGA1151'], tdp:95,  peakWatt:130, releaseYear:2017 },
  { id:'cpu-i7-9700k',      name:'Core i7-9700K',                   category:'cpu', socket:['LGA1151'], tdp:95,  peakWatt:135, releaseYear:2018 },
  { id:'cpu-i9-9900k',      name:'Core i9-9900K',                   category:'cpu', socket:['LGA1151'], tdp:95,  peakWatt:150, releaseYear:2018 },
  { id:'cpu-i9-9900ks',     name:'Core i9-9900KS',                  category:'cpu', socket:['LGA1151'], tdp:127, peakWatt:165, releaseYear:2019 },

  /* ──────────────────────────────────────────
     CPU — Intel LGA1200 10th–11th Gen (2020–2021)
  ────────────────────────────────────────── */
  { id:'cpu-i3-10100',      name:'Core i3-10100',                   category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:90,  releaseYear:2020 },
  { id:'cpu-i3-10100f',     name:'Core i3-10100F',                  category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:90,  releaseYear:2020 },
  { id:'cpu-i3-10105f',     name:'Core i3-10105F',                  category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:90,  releaseYear:2021 },
  { id:'cpu-i5-10400',      name:'Core i5-10400',                   category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:134, releaseYear:2020 },
  { id:'cpu-i5-10400f',     name:'Core i5-10400F',                  category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:134, releaseYear:2020 },
  { id:'cpu-i5-10600k',     name:'Core i5-10600K',                  category:'cpu', socket:['LGA1200'], tdp:125, peakWatt:182, releaseYear:2020 },
  { id:'cpu-i7-10700',      name:'Core i7-10700',                   category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:150, releaseYear:2020 },
  { id:'cpu-i7-10700k',     name:'Core i7-10700K',                  category:'cpu', socket:['LGA1200'], tdp:125, peakWatt:229, releaseYear:2020 },
  { id:'cpu-i9-10900',      name:'Core i9-10900',                   category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:165, releaseYear:2020 },
  { id:'cpu-i9-10900k',     name:'Core i9-10900K',                  category:'cpu', socket:['LGA1200'], tdp:125, peakWatt:250, releaseYear:2020 },
  { id:'cpu-i5-11400f',     name:'Core i5-11400F',                  category:'cpu', socket:['LGA1200'], tdp:65,  peakWatt:154, releaseYear:2021 },
  { id:'cpu-i5-11600k',     name:'Core i5-11600K',                  category:'cpu', socket:['LGA1200'], tdp:125, peakWatt:182, releaseYear:2021 },
  { id:'cpu-i7-11700k',     name:'Core i7-11700K',                  category:'cpu', socket:['LGA1200'], tdp:125, peakWatt:229, releaseYear:2021 },
  { id:'cpu-i9-11900k',     name:'Core i9-11900K',                  category:'cpu', socket:['LGA1200'], tdp:125, peakWatt:250, releaseYear:2021 },

  /* ──────────────────────────────────────────
     CPU — Intel LGA1700 12th–14th Gen (2021–present)
  ────────────────────────────────────────── */
  { id:'cpu-i3-12100f',     name:'Core i3-12100F',                  category:'cpu', socket:['LGA1700'], tdp:58,  peakWatt:89,  releaseYear:2022 },
  { id:'cpu-i5-12400',      name:'Core i5-12400',                   category:'cpu', socket:['LGA1700'], tdp:65,  peakWatt:117, releaseYear:2022 },
  { id:'cpu-i5-12400f',     name:'Core i5-12400F',                  category:'cpu', socket:['LGA1700'], tdp:65,  peakWatt:117, releaseYear:2022 },
  { id:'cpu-i5-12600k',     name:'Core i5-12600K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:150, releaseYear:2021 },
  { id:'cpu-i5-12600kf',    name:'Core i5-12600KF',                 category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:150, releaseYear:2021 },
  { id:'cpu-i7-12700',      name:'Core i7-12700',                   category:'cpu', socket:['LGA1700'], tdp:65,  peakWatt:180, releaseYear:2022 },
  { id:'cpu-i7-12700k',     name:'Core i7-12700K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:190, releaseYear:2021 },
  { id:'cpu-i9-12900k',     name:'Core i9-12900K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:241, releaseYear:2021 },
  { id:'cpu-i9-12900ks',    name:'Core i9-12900KS',                 category:'cpu', socket:['LGA1700'], tdp:150, peakWatt:241, releaseYear:2022 },
  { id:'cpu-i3-13100f',     name:'Core i3-13100F',                  category:'cpu', socket:['LGA1700'], tdp:58,  peakWatt:89,  releaseYear:2023 },
  { id:'cpu-i5-13400f',     name:'Core i5-13400F',                  category:'cpu', socket:['LGA1700'], tdp:65,  peakWatt:154, releaseYear:2023 },
  { id:'cpu-i5-13500',      name:'Core i5-13500',                   category:'cpu', socket:['LGA1700'], tdp:65,  peakWatt:154, releaseYear:2022 },
  { id:'cpu-i5-13600k',     name:'Core i5-13600K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:181, releaseYear:2022 },
  { id:'cpu-i5-13600kf',    name:'Core i5-13600KF',                 category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:181, releaseYear:2022 },
  { id:'cpu-i7-13700k',     name:'Core i7-13700K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:253, releaseYear:2022 },
  { id:'cpu-i7-13700kf',    name:'Core i7-13700KF',                 category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:253, releaseYear:2022 },
  { id:'cpu-i9-13900k',     name:'Core i9-13900K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:253, releaseYear:2022 },
  { id:'cpu-i9-13900ks',    name:'Core i9-13900KS',                 category:'cpu', socket:['LGA1700'], tdp:150, peakWatt:320, releaseYear:2023 },
  { id:'cpu-i5-14400f',     name:'Core i5-14400F',                  category:'cpu', socket:['LGA1700'], tdp:65,  peakWatt:154, releaseYear:2024 },
  { id:'cpu-i5-14600k',     name:'Core i5-14600K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:181, releaseYear:2023 },
  { id:'cpu-i7-14700k',     name:'Core i7-14700K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:253, releaseYear:2023 },
  { id:'cpu-i9-14900k',     name:'Core i9-14900K',                  category:'cpu', socket:['LGA1700'], tdp:125, peakWatt:253, releaseYear:2023 },
  { id:'cpu-i9-14900ks',    name:'Core i9-14900KS',                 category:'cpu', socket:['LGA1700'], tdp:150, peakWatt:320, releaseYear:2024 },

  /* ──────────────────────────────────────────
     CPU — AMD AM2 / AM2+ (2006–2009)
  ────────────────────────────────────────── */
  { id:'cpu-a64x2-3600-am2',name:'Athlon 64 X2 3600+',             category:'cpu', socket:['AM2'], tdp:65,  peakWatt:78,  releaseYear:2006 },
  { id:'cpu-a64x2-4200-am2',name:'Athlon 64 X2 4200+',             category:'cpu', socket:['AM2'], tdp:65,  peakWatt:78,  releaseYear:2006 },
  { id:'cpu-a64x2-4600-am2',name:'Athlon 64 X2 4600+',             category:'cpu', socket:['AM2'], tdp:89,  peakWatt:105, releaseYear:2006 },
  { id:'cpu-a64x2-5000-am2',name:'Athlon 64 X2 5000+',             category:'cpu', socket:['AM2'], tdp:65,  peakWatt:78,  releaseYear:2006 },
  { id:'cpu-a64x2-5200-am2',name:'Athlon 64 X2 5200+',             category:'cpu', socket:['AM2'], tdp:89,  peakWatt:105, releaseYear:2006 },
  { id:'cpu-a64x2-6000-am2',name:'Athlon 64 X2 6000+',             category:'cpu', socket:['AM2'], tdp:125, peakWatt:148, releaseYear:2007 },
  { id:'cpu-ph-x4-9550',    name:'Phenom X4 9550',                  category:'cpu', socket:['AM2'], tdp:95,  peakWatt:112, releaseYear:2007 },
  { id:'cpu-ph-x4-9750',    name:'Phenom X4 9750',                  category:'cpu', socket:['AM2'], tdp:95,  peakWatt:112, releaseYear:2008 },
  { id:'cpu-ph-x4-9850',    name:'Phenom X4 9850 BE',               category:'cpu', socket:['AM2'], tdp:125, peakWatt:148, releaseYear:2008 },
  { id:'cpu-ph2-x4-920',    name:'Phenom II X4 920',                category:'cpu', socket:['AM2'], tdp:125, peakWatt:148, releaseYear:2009 },
  { id:'cpu-ph2-x4-940',    name:'Phenom II X4 940 BE',             category:'cpu', socket:['AM2'], tdp:125, peakWatt:148, releaseYear:2009 },
  { id:'cpu-ath2-x4-620',   name:'Athlon II X4 620',                category:'cpu', socket:['AM2'], tdp:95,  peakWatt:112, releaseYear:2009 },

  /* ──────────────────────────────────────────
     CPU — AMD AM3 / AM3+ (2009–2014)
  ────────────────────────────────────────── */
  { id:'cpu-ph2-x4-955',    name:'Phenom II X4 955 BE',             category:'cpu', socket:['AM3'], tdp:125, peakWatt:148, releaseYear:2009 },
  { id:'cpu-ph2-x4-960t',   name:'Phenom II X4 960T',               category:'cpu', socket:['AM3'], tdp:95,  peakWatt:112, releaseYear:2010 },
  { id:'cpu-ph2-x4-965',    name:'Phenom II X4 965 BE',             category:'cpu', socket:['AM3'], tdp:125, peakWatt:148, releaseYear:2009 },
  { id:'cpu-ph2-x6-1055t',  name:'Phenom II X6 1055T',              category:'cpu', socket:['AM3'], tdp:125, peakWatt:148, releaseYear:2010 },
  { id:'cpu-ph2-x6-1090t',  name:'Phenom II X6 1090T',              category:'cpu', socket:['AM3'], tdp:125, peakWatt:148, releaseYear:2010 },
  { id:'cpu-ath2-x4-640',   name:'Athlon II X4 640',                category:'cpu', socket:['AM3'], tdp:95,  peakWatt:112, releaseYear:2010 },
  { id:'cpu-fx-4100',       name:'FX-4100',                          category:'cpu', socket:['AM3'], tdp:95,  peakWatt:125, releaseYear:2011 },
  { id:'cpu-fx-4300',       name:'FX-4300',                          category:'cpu', socket:['AM3'], tdp:95,  peakWatt:125, releaseYear:2012 },
  { id:'cpu-fx-6100',       name:'FX-6100',                          category:'cpu', socket:['AM3'], tdp:95,  peakWatt:125, releaseYear:2011 },
  { id:'cpu-fx-6300',       name:'FX-6300',                          category:'cpu', socket:['AM3'], tdp:95,  peakWatt:125, releaseYear:2012 },
  { id:'cpu-fx-8120',       name:'FX-8120',                          category:'cpu', socket:['AM3'], tdp:125, peakWatt:165, releaseYear:2011 },
  { id:'cpu-fx-8150',       name:'FX-8150',                          category:'cpu', socket:['AM3'], tdp:125, peakWatt:165, releaseYear:2011 },
  { id:'cpu-fx-8300',       name:'FX-8300',                          category:'cpu', socket:['AM3'], tdp:95,  peakWatt:125, releaseYear:2012 },
  { id:'cpu-fx-8320',       name:'FX-8320',                          category:'cpu', socket:['AM3'], tdp:125, peakWatt:165, releaseYear:2012 },
  { id:'cpu-fx-8350',       name:'FX-8350',                          category:'cpu', socket:['AM3'], tdp:125, peakWatt:165, releaseYear:2012 },
  { id:'cpu-fx-9370',       name:'FX-9370',                          category:'cpu', socket:['AM3'], tdp:220, peakWatt:260, releaseYear:2013 },
  { id:'cpu-fx-9590',       name:'FX-9590',                          category:'cpu', socket:['AM3'], tdp:220, peakWatt:260, releaseYear:2013 },

  /* ──────────────────────────────────────────
     CPU — AMD AM4 (2017–2022)
  ────────────────────────────────────────── */
  { id:'cpu-r3-1200',       name:'Ryzen 3 1200',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2017 },
  { id:'cpu-r3-1300x',      name:'Ryzen 3 1300X',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2017 },
  { id:'cpu-r3-2200g',      name:'Ryzen 3 2200G',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2018 },
  { id:'cpu-r3-3100',       name:'Ryzen 3 3100',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2020 },
  { id:'cpu-r3-3300x',      name:'Ryzen 3 3300X',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2020 },
  { id:'cpu-r5-1400',       name:'Ryzen 5 1400',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2017 },
  { id:'cpu-r5-1500x',      name:'Ryzen 5 1500X',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2017 },
  { id:'cpu-r5-1600',       name:'Ryzen 5 1600',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2017 },
  { id:'cpu-r5-1600x',      name:'Ryzen 5 1600X',                    category:'cpu', socket:['AM4'], tdp:95,  peakWatt:130, releaseYear:2017 },
  { id:'cpu-r5-2600',       name:'Ryzen 5 2600',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2018 },
  { id:'cpu-r5-2600x',      name:'Ryzen 5 2600X',                    category:'cpu', socket:['AM4'], tdp:95,  peakWatt:130, releaseYear:2018 },
  { id:'cpu-r5-3600',       name:'Ryzen 5 3600',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2019 },
  { id:'cpu-r5-3600x',      name:'Ryzen 5 3600X',                    category:'cpu', socket:['AM4'], tdp:95,  peakWatt:130, releaseYear:2019 },
  { id:'cpu-r5-5500',       name:'Ryzen 5 5500',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2022 },
  { id:'cpu-r5-5600',       name:'Ryzen 5 5600',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2022 },
  { id:'cpu-r5-5600x',      name:'Ryzen 5 5600X',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:105, releaseYear:2020 },
  { id:'cpu-r5-5600g',      name:'Ryzen 5 5600G',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2021 },
  { id:'cpu-r7-1700',       name:'Ryzen 7 1700',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2017 },
  { id:'cpu-r7-1700x',      name:'Ryzen 7 1700X',                    category:'cpu', socket:['AM4'], tdp:95,  peakWatt:130, releaseYear:2017 },
  { id:'cpu-r7-1800x',      name:'Ryzen 7 1800X',                    category:'cpu', socket:['AM4'], tdp:95,  peakWatt:130, releaseYear:2017 },
  { id:'cpu-r7-2700',       name:'Ryzen 7 2700',                     category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2018 },
  { id:'cpu-r7-2700x',      name:'Ryzen 7 2700X',                    category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2018 },
  { id:'cpu-r7-3700x',      name:'Ryzen 7 3700X',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2019 },
  { id:'cpu-r7-3800x',      name:'Ryzen 7 3800X',                    category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2019 },
  { id:'cpu-r7-5700x',      name:'Ryzen 7 5700X',                    category:'cpu', socket:['AM4'], tdp:65,  peakWatt:88,  releaseYear:2022 },
  { id:'cpu-r7-5800x',      name:'Ryzen 7 5800X',                    category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2020 },
  { id:'cpu-r7-5800x3d',    name:'Ryzen 7 5800X3D',                  category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2022 },
  { id:'cpu-r9-3900x',      name:'Ryzen 9 3900X',                    category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2019 },
  { id:'cpu-r9-3950x',      name:'Ryzen 9 3950X',                    category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2019 },
  { id:'cpu-r9-5900x',      name:'Ryzen 9 5900X',                    category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2020 },
  { id:'cpu-r9-5950x',      name:'Ryzen 9 5950X',                    category:'cpu', socket:['AM4'], tdp:105, peakWatt:142, releaseYear:2020 },

  /* ──────────────────────────────────────────
     CPU — AMD AM5 (2022–present)
  ────────────────────────────────────────── */
  { id:'cpu-r5-7600',       name:'Ryzen 5 7600',                     category:'cpu', socket:['AM5'], tdp:65,  peakWatt:88,  releaseYear:2023 },
  { id:'cpu-r5-7600x',      name:'Ryzen 5 7600X',                    category:'cpu', socket:['AM5'], tdp:105, peakWatt:142, releaseYear:2022 },
  { id:'cpu-r5-9600x',      name:'Ryzen 5 9600X',                    category:'cpu', socket:['AM5'], tdp:65,  peakWatt:88,  releaseYear:2024 },
  { id:'cpu-r7-7700',       name:'Ryzen 7 7700',                     category:'cpu', socket:['AM5'], tdp:65,  peakWatt:162, releaseYear:2023 },
  { id:'cpu-r7-7700x',      name:'Ryzen 7 7700X',                    category:'cpu', socket:['AM5'], tdp:105, peakWatt:162, releaseYear:2022 },
  { id:'cpu-r7-7800x3d',    name:'Ryzen 7 7800X3D',                  category:'cpu', socket:['AM5'], tdp:120, peakWatt:162, releaseYear:2023 },
  { id:'cpu-r7-9700x',      name:'Ryzen 7 9700X',                    category:'cpu', socket:['AM5'], tdp:65,  peakWatt:88,  releaseYear:2024 },
  { id:'cpu-r9-7900',       name:'Ryzen 9 7900',                     category:'cpu', socket:['AM5'], tdp:65,  peakWatt:170, releaseYear:2023 },
  { id:'cpu-r9-7900x',      name:'Ryzen 9 7900X',                    category:'cpu', socket:['AM5'], tdp:170, peakWatt:230, releaseYear:2022 },
  { id:'cpu-r9-7950x',      name:'Ryzen 9 7950X',                    category:'cpu', socket:['AM5'], tdp:170, peakWatt:230, releaseYear:2022 },
  { id:'cpu-r9-7950x3d',    name:'Ryzen 9 7950X3D',                  category:'cpu', socket:['AM5'], tdp:120, peakWatt:162, releaseYear:2023 },
  { id:'cpu-r9-9900x',      name:'Ryzen 9 9900X',                    category:'cpu', socket:['AM5'], tdp:120, peakWatt:162, releaseYear:2024 },
  { id:'cpu-r9-9950x',      name:'Ryzen 9 9950X',                    category:'cpu', socket:['AM5'], tdp:170, peakWatt:230, releaseYear:2024 },

  /* ══════════════════════════════════════════════
     GPU — 通用（不綁腳位，socket:['ANY']）
  ══════════════════════════════════════════════ */

  /* NVIDIA GeForce 早期（2001–2006）*/
  { id:'gpu-gf2-gts',       name:'GeForce2 GTS',                     category:'gpu', socket:['ANY'], tdp:20,  peakWatt:25,  releaseYear:2000 },
  { id:'gpu-gf3-ti200',     name:'GeForce3 Ti 200',                  category:'gpu', socket:['ANY'], tdp:30,  peakWatt:37,  releaseYear:2001 },
  { id:'gpu-gf4-ti4200',    name:'GeForce4 Ti 4200',                 category:'gpu', socket:['ANY'], tdp:40,  peakWatt:48,  releaseYear:2002 },
  { id:'gpu-gf4-ti4600',    name:'GeForce4 Ti 4600',                 category:'gpu', socket:['ANY'], tdp:45,  peakWatt:55,  releaseYear:2002 },
  { id:'gpu-gffx-5200',     name:'GeForce FX 5200',                  category:'gpu', socket:['ANY'], tdp:45,  peakWatt:55,  releaseYear:2003 },
  { id:'gpu-gffx-5600',     name:'GeForce FX 5600',                  category:'gpu', socket:['ANY'], tdp:50,  peakWatt:60,  releaseYear:2003 },
  { id:'gpu-gffx-5900xt',   name:'GeForce FX 5900 XT',               category:'gpu', socket:['ANY'], tdp:65,  peakWatt:78,  releaseYear:2003 },
  { id:'gpu-gffx-5900u',    name:'GeForce FX 5900 Ultra',            category:'gpu', socket:['ANY'], tdp:75,  peakWatt:90,  releaseYear:2003 },
  { id:'gpu-gf6600gt',      name:'GeForce 6600 GT',                  category:'gpu', socket:['ANY'], tdp:63,  peakWatt:76,  releaseYear:2004 },
  { id:'gpu-gf6600',        name:'GeForce 6600',                     category:'gpu', socket:['ANY'], tdp:50,  peakWatt:60,  releaseYear:2004 },
  { id:'gpu-gf6800gt',      name:'GeForce 6800 GT',                  category:'gpu', socket:['ANY'], tdp:85,  peakWatt:102, releaseYear:2004 },
  { id:'gpu-gf6800u',       name:'GeForce 6800 Ultra',               category:'gpu', socket:['ANY'], tdp:110, peakWatt:132, releaseYear:2004 },
  { id:'gpu-gf7300gt',      name:'GeForce 7300 GT',                  category:'gpu', socket:['ANY'], tdp:40,  peakWatt:48,  releaseYear:2005 },
  { id:'gpu-gf7600gt',      name:'GeForce 7600 GT',                  category:'gpu', socket:['ANY'], tdp:40,  peakWatt:48,  releaseYear:2006 },
  { id:'gpu-gf7800gt',      name:'GeForce 7800 GT',                  category:'gpu', socket:['ANY'], tdp:103, peakWatt:124, releaseYear:2005 },
  { id:'gpu-gf7800gtx',     name:'GeForce 7800 GTX',                 category:'gpu', socket:['ANY'], tdp:103, peakWatt:124, releaseYear:2005 },
  { id:'gpu-gf7900gt',      name:'GeForce 7900 GT',                  category:'gpu', socket:['ANY'], tdp:74,  peakWatt:89,  releaseYear:2006 },
  { id:'gpu-gf7900gtx',     name:'GeForce 7900 GTX',                 category:'gpu', socket:['ANY'], tdp:90,  peakWatt:108, releaseYear:2006 },

  /* ATI Radeon 早期（2001–2006）*/
  { id:'gpu-r-ddr',         name:'Radeon DDR',                       category:'gpu', socket:['ANY'], tdp:20,  peakWatt:25,  releaseYear:2000 },
  { id:'gpu-r-7500',        name:'Radeon 7500',                      category:'gpu', socket:['ANY'], tdp:20,  peakWatt:25,  releaseYear:2001 },
  { id:'gpu-r-8500',        name:'Radeon 8500',                      category:'gpu', socket:['ANY'], tdp:30,  peakWatt:37,  releaseYear:2001 },
  { id:'gpu-r-9500p',       name:'Radeon 9500 Pro',                  category:'gpu', socket:['ANY'], tdp:50,  peakWatt:60,  releaseYear:2002 },
  { id:'gpu-r-9600p',       name:'Radeon 9600 Pro',                  category:'gpu', socket:['ANY'], tdp:35,  peakWatt:43,  releaseYear:2003 },
  { id:'gpu-r-9700p',       name:'Radeon 9700 Pro',                  category:'gpu', socket:['ANY'], tdp:60,  peakWatt:72,  releaseYear:2002 },
  { id:'gpu-r-9800p',       name:'Radeon 9800 Pro',                  category:'gpu', socket:['ANY'], tdp:70,  peakWatt:84,  releaseYear:2003 },
  { id:'gpu-r-9800xt',      name:'Radeon 9800 XT',                   category:'gpu', socket:['ANY'], tdp:75,  peakWatt:90,  releaseYear:2003 },
  { id:'gpu-r-x700p',       name:'Radeon X700 Pro',                  category:'gpu', socket:['ANY'], tdp:41,  peakWatt:50,  releaseYear:2004 },
  { id:'gpu-r-x800p',       name:'Radeon X800 Pro',                  category:'gpu', socket:['ANY'], tdp:73,  peakWatt:88,  releaseYear:2004 },
  { id:'gpu-r-x800xt',      name:'Radeon X800 XT',                   category:'gpu', socket:['ANY'], tdp:73,  peakWatt:88,  releaseYear:2004 },
  { id:'gpu-r-x850xtpe',    name:'Radeon X850 XT PE',                category:'gpu', socket:['ANY'], tdp:99,  peakWatt:119, releaseYear:2004 },
  { id:'gpu-r-x1600p',      name:'Radeon X1600 Pro',                 category:'gpu', socket:['ANY'], tdp:50,  peakWatt:60,  releaseYear:2005 },
  { id:'gpu-r-x1800xl',     name:'Radeon X1800 XL',                  category:'gpu', socket:['ANY'], tdp:100, peakWatt:120, releaseYear:2005 },
  { id:'gpu-r-x1900xtx',    name:'Radeon X1900 XTX',                 category:'gpu', socket:['ANY'], tdp:120, peakWatt:144, releaseYear:2006 },

  /* NVIDIA 8/9/200 系列（2006–2010）*/
  { id:'gpu-gf8400gs',      name:'GeForce 8400 GS',                  category:'gpu', socket:['ANY'], tdp:25,  peakWatt:30,  releaseYear:2007 },
  { id:'gpu-gf8600gt',      name:'GeForce 8600 GT',                  category:'gpu', socket:['ANY'], tdp:43,  peakWatt:52,  releaseYear:2007 },
  { id:'gpu-gf8600gts',     name:'GeForce 8600 GTS',                 category:'gpu', socket:['ANY'], tdp:71,  peakWatt:85,  releaseYear:2007 },
  { id:'gpu-gf8800gt',      name:'GeForce 8800 GT',                  category:'gpu', socket:['ANY'], tdp:105, peakWatt:126, releaseYear:2007 },
  { id:'gpu-gf8800gts512',  name:'GeForce 8800 GTS 512',             category:'gpu', socket:['ANY'], tdp:130, peakWatt:156, releaseYear:2007 },
  { id:'gpu-gf8800gtx',     name:'GeForce 8800 GTX',                 category:'gpu', socket:['ANY'], tdp:155, peakWatt:186, releaseYear:2006 },
  { id:'gpu-gf8800u',       name:'GeForce 8800 Ultra',               category:'gpu', socket:['ANY'], tdp:180, peakWatt:216, releaseYear:2007 },
  { id:'gpu-gf9600gt',      name:'GeForce 9600 GT',                  category:'gpu', socket:['ANY'], tdp:96,  peakWatt:115, releaseYear:2008 },
  { id:'gpu-gf9800gtx',     name:'GeForce 9800 GTX+',                category:'gpu', socket:['ANY'], tdp:141, peakWatt:169, releaseYear:2008 },
  { id:'gpu-gf9800gx2',     name:'GeForce 9800 GX2',                 category:'gpu', socket:['ANY'], tdp:197, peakWatt:236, releaseYear:2008 },
  { id:'gpu-gtx260',        name:'GeForce GTX 260',                  category:'gpu', socket:['ANY'], tdp:182, peakWatt:218, releaseYear:2008 },
  { id:'gpu-gtx275',        name:'GeForce GTX 275',                  category:'gpu', socket:['ANY'], tdp:219, peakWatt:263, releaseYear:2009 },
  { id:'gpu-gtx280',        name:'GeForce GTX 280',                  category:'gpu', socket:['ANY'], tdp:236, peakWatt:283, releaseYear:2008 },
  { id:'gpu-gtx285',        name:'GeForce GTX 285',                  category:'gpu', socket:['ANY'], tdp:183, peakWatt:220, releaseYear:2009 },
  { id:'gpu-gtx295',        name:'GeForce GTX 295',                  category:'gpu', socket:['ANY'], tdp:289, peakWatt:347, releaseYear:2009 },

  /* ATI Radeon HD 2000–5000（2007–2010）*/
  { id:'gpu-hd2600p',       name:'Radeon HD 2600 Pro',               category:'gpu', socket:['ANY'], tdp:45,  peakWatt:54,  releaseYear:2007 },
  { id:'gpu-hd2600xt',      name:'Radeon HD 2600 XT',                category:'gpu', socket:['ANY'], tdp:47,  peakWatt:56,  releaseYear:2007 },
  { id:'gpu-hd2900xt',      name:'Radeon HD 2900 XT',                category:'gpu', socket:['ANY'], tdp:215, peakWatt:258, releaseYear:2007 },
  { id:'gpu-hd3650',        name:'Radeon HD 3650',                   category:'gpu', socket:['ANY'], tdp:45,  peakWatt:54,  releaseYear:2008 },
  { id:'gpu-hd3870',        name:'Radeon HD 3870',                   category:'gpu', socket:['ANY'], tdp:105, peakWatt:126, releaseYear:2007 },
  { id:'gpu-hd4650',        name:'Radeon HD 4650',                   category:'gpu', socket:['ANY'], tdp:45,  peakWatt:54,  releaseYear:2008 },
  { id:'gpu-hd4670',        name:'Radeon HD 4670',                   category:'gpu', socket:['ANY'], tdp:59,  peakWatt:71,  releaseYear:2008 },
  { id:'gpu-hd4830',        name:'Radeon HD 4830',                   category:'gpu', socket:['ANY'], tdp:110, peakWatt:132, releaseYear:2008 },
  { id:'gpu-hd4850',        name:'Radeon HD 4850',                   category:'gpu', socket:['ANY'], tdp:110, peakWatt:132, releaseYear:2008 },
  { id:'gpu-hd4870',        name:'Radeon HD 4870',                   category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2008 },
  { id:'gpu-hd4870x2',      name:'Radeon HD 4870 X2',               category:'gpu', socket:['ANY'], tdp:286, peakWatt:343, releaseYear:2008 },
  { id:'gpu-hd4890',        name:'Radeon HD 4890',                   category:'gpu', socket:['ANY'], tdp:190, peakWatt:228, releaseYear:2009 },
  { id:'gpu-hd5670',        name:'Radeon HD 5670',                   category:'gpu', socket:['ANY'], tdp:64,  peakWatt:77,  releaseYear:2010 },
  { id:'gpu-hd5770',        name:'Radeon HD 5770',                   category:'gpu', socket:['ANY'], tdp:108, peakWatt:130, releaseYear:2009 },
  { id:'gpu-hd5850',        name:'Radeon HD 5850',                   category:'gpu', socket:['ANY'], tdp:151, peakWatt:181, releaseYear:2009 },
  { id:'gpu-hd5870',        name:'Radeon HD 5870',                   category:'gpu', socket:['ANY'], tdp:188, peakWatt:226, releaseYear:2009 },
  { id:'gpu-hd5970',        name:'Radeon HD 5970',                   category:'gpu', socket:['ANY'], tdp:294, peakWatt:353, releaseYear:2009 },

  /* NVIDIA GTX 400/500（2010–2012）*/
  { id:'gpu-gt430',         name:'GeForce GT 430',                   category:'gpu', socket:['ANY'], tdp:49,  peakWatt:59,  releaseYear:2010 },
  { id:'gpu-gtx460',        name:'GeForce GTX 460',                  category:'gpu', socket:['ANY'], tdp:160, peakWatt:192, releaseYear:2010 },
  { id:'gpu-gtx470',        name:'GeForce GTX 470',                  category:'gpu', socket:['ANY'], tdp:215, peakWatt:258, releaseYear:2010 },
  { id:'gpu-gtx480',        name:'GeForce GTX 480',                  category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2010 },
  { id:'gpu-gtx550ti',      name:'GeForce GTX 550 Ti',               category:'gpu', socket:['ANY'], tdp:116, peakWatt:139, releaseYear:2011 },
  { id:'gpu-gtx560',        name:'GeForce GTX 560',                  category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2011 },
  { id:'gpu-gtx560ti',      name:'GeForce GTX 560 Ti',               category:'gpu', socket:['ANY'], tdp:170, peakWatt:204, releaseYear:2011 },
  { id:'gpu-gtx570',        name:'GeForce GTX 570',                  category:'gpu', socket:['ANY'], tdp:219, peakWatt:263, releaseYear:2010 },
  { id:'gpu-gtx580',        name:'GeForce GTX 580',                  category:'gpu', socket:['ANY'], tdp:244, peakWatt:293, releaseYear:2010 },
  { id:'gpu-gtx590',        name:'GeForce GTX 590',                  category:'gpu', socket:['ANY'], tdp:365, peakWatt:438, releaseYear:2011 },

  /* AMD Radeon HD 6000/7000（2010–2013）*/
  { id:'gpu-hd6790',        name:'Radeon HD 6790',                   category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2011 },
  { id:'gpu-hd6850',        name:'Radeon HD 6850',                   category:'gpu', socket:['ANY'], tdp:127, peakWatt:152, releaseYear:2010 },
  { id:'gpu-hd6870',        name:'Radeon HD 6870',                   category:'gpu', socket:['ANY'], tdp:151, peakWatt:181, releaseYear:2010 },
  { id:'gpu-hd6950',        name:'Radeon HD 6950',                   category:'gpu', socket:['ANY'], tdp:200, peakWatt:240, releaseYear:2010 },
  { id:'gpu-hd6970',        name:'Radeon HD 6970',                   category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2010 },
  { id:'gpu-hd6990',        name:'Radeon HD 6990',                   category:'gpu', socket:['ANY'], tdp:375, peakWatt:450, releaseYear:2011 },
  { id:'gpu-hd7750',        name:'Radeon HD 7750',                   category:'gpu', socket:['ANY'], tdp:55,  peakWatt:66,  releaseYear:2012 },
  { id:'gpu-hd7770',        name:'Radeon HD 7770',                   category:'gpu', socket:['ANY'], tdp:80,  peakWatt:96,  releaseYear:2012 },
  { id:'gpu-hd7850',        name:'Radeon HD 7850',                   category:'gpu', socket:['ANY'], tdp:130, peakWatt:156, releaseYear:2012 },
  { id:'gpu-hd7870',        name:'Radeon HD 7870',                   category:'gpu', socket:['ANY'], tdp:175, peakWatt:210, releaseYear:2012 },
  { id:'gpu-hd7950',        name:'Radeon HD 7950',                   category:'gpu', socket:['ANY'], tdp:200, peakWatt:240, releaseYear:2012 },
  { id:'gpu-hd7970',        name:'Radeon HD 7970',                   category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2012 },
  { id:'gpu-hd7970ghz',     name:'Radeon HD 7970 GHz',               category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2012 },
  { id:'gpu-hd7990',        name:'Radeon HD 7990',                   category:'gpu', socket:['ANY'], tdp:375, peakWatt:450, releaseYear:2013 },

  /* NVIDIA GTX 600/700（2012–2015）*/
  { id:'gpu-gt630',         name:'GeForce GT 630',                   category:'gpu', socket:['ANY'], tdp:65,  peakWatt:78,  releaseYear:2012 },
  { id:'gpu-gtx650',        name:'GeForce GTX 650',                  category:'gpu', socket:['ANY'], tdp:64,  peakWatt:77,  releaseYear:2012 },
  { id:'gpu-gtx650ti',      name:'GeForce GTX 650 Ti',               category:'gpu', socket:['ANY'], tdp:110, peakWatt:132, releaseYear:2012 },
  { id:'gpu-gtx660',        name:'GeForce GTX 660',                  category:'gpu', socket:['ANY'], tdp:140, peakWatt:168, releaseYear:2012 },
  { id:'gpu-gtx660ti',      name:'GeForce GTX 660 Ti',               category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2012 },
  { id:'gpu-gtx670',        name:'GeForce GTX 670',                  category:'gpu', socket:['ANY'], tdp:170, peakWatt:204, releaseYear:2012 },
  { id:'gpu-gtx680',        name:'GeForce GTX 680',                  category:'gpu', socket:['ANY'], tdp:195, peakWatt:234, releaseYear:2012 },
  { id:'gpu-gtx690',        name:'GeForce GTX 690',                  category:'gpu', socket:['ANY'], tdp:300, peakWatt:360, releaseYear:2012 },
  { id:'gpu-gtx750ti',      name:'GeForce GTX 750 Ti',               category:'gpu', socket:['ANY'], tdp:60,  peakWatt:72,  releaseYear:2014 },
  { id:'gpu-gtx760',        name:'GeForce GTX 760',                  category:'gpu', socket:['ANY'], tdp:170, peakWatt:204, releaseYear:2013 },
  { id:'gpu-gtx770',        name:'GeForce GTX 770',                  category:'gpu', socket:['ANY'], tdp:230, peakWatt:276, releaseYear:2013 },
  { id:'gpu-gtx780',        name:'GeForce GTX 780',                  category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2013 },
  { id:'gpu-gtx780ti',      name:'GeForce GTX 780 Ti',               category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2013 },
  { id:'gpu-titan',         name:'GeForce GTX Titan',                category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2013 },
  { id:'gpu-titan-black',   name:'GeForce GTX Titan Black',          category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2014 },
  { id:'gpu-titan-z',       name:'GeForce GTX Titan Z',              category:'gpu', socket:['ANY'], tdp:375, peakWatt:450, releaseYear:2014 },

  /* AMD R9/R7 系列（2013–2016）*/
  { id:'gpu-r7-250',        name:'Radeon R7 250',                    category:'gpu', socket:['ANY'], tdp:65,  peakWatt:78,  releaseYear:2013 },
  { id:'gpu-r7-260x',       name:'Radeon R7 260X',                   category:'gpu', socket:['ANY'], tdp:115, peakWatt:138, releaseYear:2013 },
  { id:'gpu-r9-270',        name:'Radeon R9 270',                    category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2013 },
  { id:'gpu-r9-270x',       name:'Radeon R9 270X',                   category:'gpu', socket:['ANY'], tdp:180, peakWatt:216, releaseYear:2013 },
  { id:'gpu-r9-280',        name:'Radeon R9 280',                    category:'gpu', socket:['ANY'], tdp:200, peakWatt:240, releaseYear:2014 },
  { id:'gpu-r9-280x',       name:'Radeon R9 280X',                   category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2013 },
  { id:'gpu-r9-290',        name:'Radeon R9 290',                    category:'gpu', socket:['ANY'], tdp:275, peakWatt:330, releaseYear:2013 },
  { id:'gpu-r9-290x',       name:'Radeon R9 290X',                   category:'gpu', socket:['ANY'], tdp:300, peakWatt:360, releaseYear:2013 },
  { id:'gpu-r9-295x2',      name:'Radeon R9 295X2',                  category:'gpu', socket:['ANY'], tdp:500, peakWatt:600, releaseYear:2014 },
  { id:'gpu-r9-380',        name:'Radeon R9 380',                    category:'gpu', socket:['ANY'], tdp:190, peakWatt:228, releaseYear:2015 },
  { id:'gpu-r9-380x',       name:'Radeon R9 380X',                   category:'gpu', socket:['ANY'], tdp:190, peakWatt:228, releaseYear:2015 },
  { id:'gpu-r9-390',        name:'Radeon R9 390',                    category:'gpu', socket:['ANY'], tdp:275, peakWatt:330, releaseYear:2015 },
  { id:'gpu-r9-390x',       name:'Radeon R9 390X',                   category:'gpu', socket:['ANY'], tdp:275, peakWatt:330, releaseYear:2015 },
  { id:'gpu-r9-furyx',      name:'Radeon R9 Fury X',                 category:'gpu', socket:['ANY'], tdp:275, peakWatt:330, releaseYear:2015 },
  { id:'gpu-r9-nano',       name:'Radeon R9 Nano',                   category:'gpu', socket:['ANY'], tdp:175, peakWatt:210, releaseYear:2015 },

  /* NVIDIA GTX 900/10 系列（2014–2018）*/
  { id:'gpu-gtx950',        name:'GeForce GTX 950',                  category:'gpu', socket:['ANY'], tdp:90,  peakWatt:108, releaseYear:2015 },
  { id:'gpu-gtx960',        name:'GeForce GTX 960',                  category:'gpu', socket:['ANY'], tdp:120, peakWatt:144, releaseYear:2015 },
  { id:'gpu-gtx970',        name:'GeForce GTX 970',                  category:'gpu', socket:['ANY'], tdp:145, peakWatt:174, releaseYear:2014 },
  { id:'gpu-gtx980',        name:'GeForce GTX 980',                  category:'gpu', socket:['ANY'], tdp:165, peakWatt:198, releaseYear:2014 },
  { id:'gpu-gtx980ti',      name:'GeForce GTX 980 Ti',               category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2015 },
  { id:'gpu-titan-x-m',     name:'GeForce GTX Titan X (Maxwell)',    category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2015 },
  { id:'gpu-gtx1050',       name:'GeForce GTX 1050',                 category:'gpu', socket:['ANY'], tdp:75,  peakWatt:90,  releaseYear:2016 },
  { id:'gpu-gtx1050ti',     name:'GeForce GTX 1050 Ti',              category:'gpu', socket:['ANY'], tdp:75,  peakWatt:90,  releaseYear:2016 },
  { id:'gpu-gtx1060-3',     name:'GeForce GTX 1060 3GB',             category:'gpu', socket:['ANY'], tdp:120, peakWatt:144, releaseYear:2016 },
  { id:'gpu-gtx1060-6',     name:'GeForce GTX 1060 6GB',             category:'gpu', socket:['ANY'], tdp:120, peakWatt:144, releaseYear:2016 },
  { id:'gpu-gtx1070',       name:'GeForce GTX 1070',                 category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2016 },
  { id:'gpu-gtx1070ti',     name:'GeForce GTX 1070 Ti',              category:'gpu', socket:['ANY'], tdp:180, peakWatt:216, releaseYear:2017 },
  { id:'gpu-gtx1080',       name:'GeForce GTX 1080',                 category:'gpu', socket:['ANY'], tdp:180, peakWatt:216, releaseYear:2016 },
  { id:'gpu-gtx1080ti',     name:'GeForce GTX 1080 Ti',              category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2017 },
  { id:'gpu-titan-x-p',     name:'GeForce GTX Titan X (Pascal)',     category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2016 },
  { id:'gpu-titan-xp',      name:'GeForce GTX Titan Xp',             category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2017 },

  /* AMD RX 400/500/Vega（2016–2018）*/
  { id:'gpu-rx460',         name:'Radeon RX 460',                    category:'gpu', socket:['ANY'], tdp:75,  peakWatt:90,  releaseYear:2016 },
  { id:'gpu-rx470',         name:'Radeon RX 470',                    category:'gpu', socket:['ANY'], tdp:120, peakWatt:144, releaseYear:2016 },
  { id:'gpu-rx480',         name:'Radeon RX 480',                    category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2016 },
  { id:'gpu-rx550',         name:'Radeon RX 550',                    category:'gpu', socket:['ANY'], tdp:50,  peakWatt:60,  releaseYear:2017 },
  { id:'gpu-rx560',         name:'Radeon RX 560',                    category:'gpu', socket:['ANY'], tdp:80,  peakWatt:96,  releaseYear:2017 },
  { id:'gpu-rx570',         name:'Radeon RX 570',                    category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2017 },
  { id:'gpu-rx580',         name:'Radeon RX 580',                    category:'gpu', socket:['ANY'], tdp:185, peakWatt:222, releaseYear:2017 },
  { id:'gpu-rx590',         name:'Radeon RX 590',                    category:'gpu', socket:['ANY'], tdp:225, peakWatt:270, releaseYear:2018 },
  { id:'gpu-vega56',        name:'Radeon RX Vega 56',                category:'gpu', socket:['ANY'], tdp:210, peakWatt:252, releaseYear:2017 },
  { id:'gpu-vega64',        name:'Radeon RX Vega 64',                category:'gpu', socket:['ANY'], tdp:295, peakWatt:354, releaseYear:2017 },
  { id:'gpu-vega64lc',      name:'Radeon RX Vega 64 LC',             category:'gpu', socket:['ANY'], tdp:345, peakWatt:414, releaseYear:2017 },

  /* NVIDIA RTX 20（2018–2020）*/
  { id:'gpu-rtx2060',       name:'GeForce RTX 2060',                 category:'gpu', socket:['ANY'], tdp:160, peakWatt:192, releaseYear:2019 },
  { id:'gpu-rtx2060s',      name:'GeForce RTX 2060 Super',           category:'gpu', socket:['ANY'], tdp:175, peakWatt:210, releaseYear:2019 },
  { id:'gpu-rtx2070',       name:'GeForce RTX 2070',                 category:'gpu', socket:['ANY'], tdp:175, peakWatt:210, releaseYear:2018 },
  { id:'gpu-rtx2070s',      name:'GeForce RTX 2070 Super',           category:'gpu', socket:['ANY'], tdp:215, peakWatt:258, releaseYear:2019 },
  { id:'gpu-rtx2080',       name:'GeForce RTX 2080',                 category:'gpu', socket:['ANY'], tdp:215, peakWatt:258, releaseYear:2018 },
  { id:'gpu-rtx2080s',      name:'GeForce RTX 2080 Super',           category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2019 },
  { id:'gpu-rtx2080ti',     name:'GeForce RTX 2080 Ti',              category:'gpu', socket:['ANY'], tdp:260, peakWatt:312, releaseYear:2018 },
  { id:'gpu-rtx-titan',     name:'GeForce RTX Titan',                category:'gpu', socket:['ANY'], tdp:280, peakWatt:336, releaseYear:2018 },

  /* AMD RX 5000（2019–2020）*/
  { id:'gpu-rx5500xt',      name:'Radeon RX 5500 XT',                category:'gpu', socket:['ANY'], tdp:130, peakWatt:156, releaseYear:2019 },
  { id:'gpu-rx5600xt',      name:'Radeon RX 5600 XT',                category:'gpu', socket:['ANY'], tdp:150, peakWatt:180, releaseYear:2020 },
  { id:'gpu-rx5700',        name:'Radeon RX 5700',                   category:'gpu', socket:['ANY'], tdp:180, peakWatt:216, releaseYear:2019 },
  { id:'gpu-rx5700xt',      name:'Radeon RX 5700 XT',                category:'gpu', socket:['ANY'], tdp:225, peakWatt:270, releaseYear:2019 },

  /* NVIDIA RTX 30（2020–2022）*/
  { id:'gpu-rtx3050',       name:'GeForce RTX 3050',                 category:'gpu', socket:['ANY'], tdp:130, peakWatt:156, releaseYear:2022 },
  { id:'gpu-rtx3060',       name:'GeForce RTX 3060',                 category:'gpu', socket:['ANY'], tdp:170, peakWatt:204, releaseYear:2021 },
  { id:'gpu-rtx3060ti',     name:'GeForce RTX 3060 Ti',              category:'gpu', socket:['ANY'], tdp:200, peakWatt:240, releaseYear:2020 },
  { id:'gpu-rtx3070',       name:'GeForce RTX 3070',                 category:'gpu', socket:['ANY'], tdp:220, peakWatt:264, releaseYear:2020 },
  { id:'gpu-rtx3070ti',     name:'GeForce RTX 3070 Ti',              category:'gpu', socket:['ANY'], tdp:290, peakWatt:348, releaseYear:2021 },
  { id:'gpu-rtx3080',       name:'GeForce RTX 3080 10GB',            category:'gpu', socket:['ANY'], tdp:320, peakWatt:384, releaseYear:2020 },
  { id:'gpu-rtx3080ti',     name:'GeForce RTX 3080 Ti',              category:'gpu', socket:['ANY'], tdp:350, peakWatt:420, releaseYear:2021 },
  { id:'gpu-rtx3090',       name:'GeForce RTX 3090',                 category:'gpu', socket:['ANY'], tdp:350, peakWatt:420, releaseYear:2020 },
  { id:'gpu-rtx3090ti',     name:'GeForce RTX 3090 Ti',              category:'gpu', socket:['ANY'], tdp:450, peakWatt:540, releaseYear:2022 },

  /* AMD RX 6000（2020–2022）*/
  { id:'gpu-rx6500xt',      name:'Radeon RX 6500 XT',                category:'gpu', socket:['ANY'], tdp:107, peakWatt:128, releaseYear:2022 },
  { id:'gpu-rx6600',        name:'Radeon RX 6600',                   category:'gpu', socket:['ANY'], tdp:132, peakWatt:158, releaseYear:2021 },
  { id:'gpu-rx6600xt',      name:'Radeon RX 6600 XT',                category:'gpu', socket:['ANY'], tdp:160, peakWatt:192, releaseYear:2021 },
  { id:'gpu-rx6650xt',      name:'Radeon RX 6650 XT',                category:'gpu', socket:['ANY'], tdp:176, peakWatt:211, releaseYear:2022 },
  { id:'gpu-rx6700xt',      name:'Radeon RX 6700 XT',                category:'gpu', socket:['ANY'], tdp:230, peakWatt:276, releaseYear:2021 },
  { id:'gpu-rx6750xt',      name:'Radeon RX 6750 XT',                category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2022 },
  { id:'gpu-rx6800',        name:'Radeon RX 6800',                   category:'gpu', socket:['ANY'], tdp:250, peakWatt:300, releaseYear:2020 },
  { id:'gpu-rx6800xt',      name:'Radeon RX 6800 XT',                category:'gpu', socket:['ANY'], tdp:300, peakWatt:360, releaseYear:2020 },
  { id:'gpu-rx6900xt',      name:'Radeon RX 6900 XT',                category:'gpu', socket:['ANY'], tdp:300, peakWatt:360, releaseYear:2020 },
  { id:'gpu-rx6950xt',      name:'Radeon RX 6950 XT',                category:'gpu', socket:['ANY'], tdp:335, peakWatt:402, releaseYear:2022 },

  /* NVIDIA RTX 40（2022–present）*/
  { id:'gpu-rtx4060',       name:'GeForce RTX 4060',                 category:'gpu', socket:['ANY'], tdp:115, peakWatt:138, releaseYear:2023 },
  { id:'gpu-rtx4060ti-8',   name:'GeForce RTX 4060 Ti 8GB',          category:'gpu', socket:['ANY'], tdp:165, peakWatt:198, releaseYear:2023 },
  { id:'gpu-rtx4060ti-16',  name:'GeForce RTX 4060 Ti 16GB',         category:'gpu', socket:['ANY'], tdp:165, peakWatt:198, releaseYear:2023 },
  { id:'gpu-rtx4070',       name:'GeForce RTX 4070',                 category:'gpu', socket:['ANY'], tdp:200, peakWatt:240, releaseYear:2023 },
  { id:'gpu-rtx4070s',      name:'GeForce RTX 4070 Super',           category:'gpu', socket:['ANY'], tdp:220, peakWatt:264, releaseYear:2024 },
  { id:'gpu-rtx4070ti',     name:'GeForce RTX 4070 Ti',              category:'gpu', socket:['ANY'], tdp:285, peakWatt:342, releaseYear:2023 },
  { id:'gpu-rtx4070tis',    name:'GeForce RTX 4070 Ti Super',        category:'gpu', socket:['ANY'], tdp:285, peakWatt:342, releaseYear:2024 },
  { id:'gpu-rtx4080',       name:'GeForce RTX 4080',                 category:'gpu', socket:['ANY'], tdp:320, peakWatt:384, releaseYear:2022 },
  { id:'gpu-rtx4080s',      name:'GeForce RTX 4080 Super',           category:'gpu', socket:['ANY'], tdp:320, peakWatt:384, releaseYear:2024 },
  { id:'gpu-rtx4090',       name:'GeForce RTX 4090',                 category:'gpu', socket:['ANY'], tdp:450, peakWatt:540, releaseYear:2022 },

  /* AMD RX 7000（2022–present）*/
  { id:'gpu-rx7600',        name:'Radeon RX 7600',                   category:'gpu', socket:['ANY'], tdp:165, peakWatt:198, releaseYear:2023 },
  { id:'gpu-rx7700xt',      name:'Radeon RX 7700 XT',                category:'gpu', socket:['ANY'], tdp:245, peakWatt:294, releaseYear:2023 },
  { id:'gpu-rx7800xt',      name:'Radeon RX 7800 XT',                category:'gpu', socket:['ANY'], tdp:263, peakWatt:316, releaseYear:2023 },
  { id:'gpu-rx7900gre',     name:'Radeon RX 7900 GRE',               category:'gpu', socket:['ANY'], tdp:260, peakWatt:312, releaseYear:2023 },
  { id:'gpu-rx7900xt',      name:'Radeon RX 7900 XT',                category:'gpu', socket:['ANY'], tdp:315, peakWatt:378, releaseYear:2022 },
  { id:'gpu-rx7900xtx',     name:'Radeon RX 7900 XTX',               category:'gpu', socket:['ANY'], tdp:355, peakWatt:426, releaseYear:2022 },

  /* ══════════════════════════════════════════════
     RAM — 代表性型號（通用）
  ══════════════════════════════════════════════ */
  { id:'ram-ddr2-1g',       name:'DDR2 1GB（單條）',                  category:'ram', socket:['ANY'], tdp:2,   peakWatt:3,   releaseYear:2004 },
  { id:'ram-ddr3-2g',       name:'DDR3 2GB（單條）',                  category:'ram', socket:['ANY'], tdp:2,   peakWatt:3,   releaseYear:2007 },
  { id:'ram-ddr3-4g',       name:'DDR3 4GB（單條）',                  category:'ram', socket:['ANY'], tdp:3,   peakWatt:4,   releaseYear:2009 },
  { id:'ram-ddr3-8g',       name:'DDR3 8GB（單條）',                  category:'ram', socket:['ANY'], tdp:3,   peakWatt:4,   releaseYear:2012 },
  { id:'ram-ddr4-8g',       name:'DDR4 8GB（單條）',                  category:'ram', socket:['ANY'], tdp:3,   peakWatt:4,   releaseYear:2014 },
  { id:'ram-ddr4-16g',      name:'DDR4 16GB（單條）',                 category:'ram', socket:['ANY'], tdp:3,   peakWatt:4,   releaseYear:2016 },
  { id:'ram-ddr4-32g',      name:'DDR4 32GB（單條）',                 category:'ram', socket:['ANY'], tdp:4,   peakWatt:5,   releaseYear:2018 },
  { id:'ram-ddr5-16g',      name:'DDR5 16GB（單條）',                 category:'ram', socket:['ANY'], tdp:5,   peakWatt:6,   releaseYear:2021 },
  { id:'ram-ddr5-32g',      name:'DDR5 32GB（單條）',                 category:'ram', socket:['ANY'], tdp:5,   peakWatt:6,   releaseYear:2022 },

  /* ══════════════════════════════════════════════
     儲存裝置（通用）
  ══════════════════════════════════════════════ */
  { id:'stor-hdd-35',       name:'3.5" HDD 機械硬碟',                 category:'storage', socket:['ANY'], tdp:6,   peakWatt:10,  releaseYear:2005 },
  { id:'stor-hdd-25',       name:'2.5" HDD 筆電硬碟',                 category:'storage', socket:['ANY'], tdp:2,   peakWatt:4,   releaseYear:2005 },
  { id:'stor-ssd-sata',     name:'SATA SSD',                         category:'storage', socket:['ANY'], tdp:2,   peakWatt:3,   releaseYear:2010 },
  { id:'stor-nvme-gen3',    name:'NVMe SSD (PCIe 3.0)',               category:'storage', socket:['ANY'], tdp:4,   peakWatt:6,   releaseYear:2015 },
  { id:'stor-nvme-gen4',    name:'NVMe SSD (PCIe 4.0)',               category:'storage', socket:['ANY'], tdp:7,   peakWatt:10,  releaseYear:2019 },
  { id:'stor-optical',      name:'DVD / 光碟機',                      category:'storage', socket:['ANY'], tdp:18,  peakWatt:24,  releaseYear:2005 },

  /* ══════════════════════════════════════════════
     散熱器（通用）
  ══════════════════════════════════════════════ */
  { id:'cool-stock',        name:'原廠散熱器（風冷）',                  category:'cooling', socket:['ANY'], tdp:3,   peakWatt:5,   releaseYear:2005 },
  { id:'cool-air-budget',   name:'入門塔式散熱（風冷）',                category:'cooling', socket:['ANY'], tdp:4,   peakWatt:6,   releaseYear:2010 },
  { id:'cool-air-mid',      name:'中階塔式散熱（風冷）',                category:'cooling', socket:['ANY'], tdp:5,   peakWatt:8,   releaseYear:2012 },
  { id:'cool-air-high',     name:'高階雙塔散熱（風冷）',                category:'cooling', socket:['ANY'], tdp:6,   peakWatt:10,  releaseYear:2015 },
  { id:'cool-aio-120',      name:'120mm AIO 一體水冷',                 category:'cooling', socket:['ANY'], tdp:8,   peakWatt:12,  releaseYear:2015 },
  { id:'cool-aio-240',      name:'240mm AIO 一體水冷',                 category:'cooling', socket:['ANY'], tdp:12,  peakWatt:18,  releaseYear:2016 },
  { id:'cool-aio-280',      name:'280mm AIO 一體水冷',                 category:'cooling', socket:['ANY'], tdp:15,  peakWatt:22,  releaseYear:2017 },
  { id:'cool-aio-360',      name:'360mm AIO 一體水冷',                 category:'cooling', socket:['ANY'], tdp:18,  peakWatt:25,  releaseYear:2018 },

  /* ══════════════════════════════════════════════
     機殼風扇（通用）
  ══════════════════════════════════════════════ */
  { id:'fan-80mm',          name:'80mm 機殼風扇',                     category:'fan', socket:['ANY'], tdp:1,   peakWatt:2,   releaseYear:2005 },
  { id:'fan-120mm',         name:'120mm 機殼風扇',                    category:'fan', socket:['ANY'], tdp:2,   peakWatt:3,   releaseYear:2005 },
  { id:'fan-140mm',         name:'140mm 機殼風扇',                    category:'fan', socket:['ANY'], tdp:2,   peakWatt:3,   releaseYear:2010 },
  { id:'fan-200mm',         name:'200mm 機殼風扇',                    category:'fan', socket:['ANY'], tdp:3,   peakWatt:4,   releaseYear:2015 },
];

/* ══════════════════════════════════════════════
   查詢函式
══════════════════════════════════════════════ */

/**
 * 取得所有腳位世代定義
 * @returns {Array}
 */
function getSocketList() {
  return SOCKET_LIST;
}

/**
 * 依腳位篩選可用零件（CPU 需符合腳位，GPU/RAM/Storage/Cooling/Fan 為通用）
 * @param {string} socketId
 * @returns {Array}
 */
function getComponentsBySocket(socketId) {
  return COMPONENTS.filter(c =>
    c.socket.includes('ANY') || c.socket.includes(socketId)
  );
}

/**
 * 依腳位 + 類別篩選零件，並按名稱排序
 * @param {string} socketId
 * @param {string} category
 * @returns {Array}
 */
function getComponentsByCategory(socketId, category) {
  return COMPONENTS
    .filter(c =>
      c.category === category &&
      (c.socket.includes('ANY') || c.socket.includes(socketId))
    )
    .sort((a, b) => a.releaseYear - b.releaseYear || a.name.localeCompare(b.name));
}

/**
 * 依 ID 取得單一零件
 * @param {string} id
 * @returns {Object|undefined}
 */
function getComponentById(id) {
  return COMPONENTS.find(c => c.id === id);
}

/**
 * 取得類別定義列表
 * @returns {Array}
 */
function getCategoryList() {
  return CATEGORY_LIST;
}

/**
 * 搜尋零件（模糊比對名稱）
 * @param {string} socketId
 * @param {string} query
 * @returns {Array}
 */
function searchComponents(socketId, query) {
  const q = query.toLowerCase().trim();
  if (!q) return getComponentsBySocket(socketId);
  return COMPONENTS.filter(c =>
    (c.socket.includes('ANY') || c.socket.includes(socketId)) &&
    c.name.toLowerCase().includes(q)
  );
}
