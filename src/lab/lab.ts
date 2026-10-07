// ==========================================================================
// Super Intelligence Lab — Master Laboratory Controller
// 100% Preserved Models + Advanced GitHub-Inspired AI/ML Engineering Suites
// ==========================================================================

import '../styles/main.css';
import './lab.css';

import { LabTabId, PredictionHistoryItem, ScenarioItem } from './types';
import { labState } from './state';
import { SYSTEM_MODEL_CARDS } from './modelsData';
import { computeReviveExplainability, computeCounterfactualComparison } from './explainability';
import { initCommandPalette } from './commandPalette';
import { initHistoryDrawer, renderTimelineSparkline } from './historyTimeline';
import { renderScenariosComparison, runBatchAnalysisSuite, renderBatchResultsTable } from './scenarioBatch';
import { validateReviveFeatures, renderDataInspectorTable } from './dataInspector';
import { renderDeveloperModeInspector } from './developerMode';
import { initExportModal, ExportPayload } from './exportCenter';
import { renderModelComparisonTable, renderModelCard } from './modelComparison';
import { renderApiExplorer } from './apiExplorer';
import { initSystemHealthAndActivity, renderSystemHealthBar } from './systemHealth';

function initLab() {
  // --------------------------------------------------------------------------
  // 1. Theme Sync with Main Portfolio
  // --------------------------------------------------------------------------
  const currentTheme = localStorage.getItem('shami_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeToggle = document.getElementById('labThemeToggle');
  const themeIcon = document.getElementById('labThemeIcon');

  function updateThemeIcon(t: string) {
    if (themeIcon) {
      themeIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
  updateThemeIcon(currentTheme);

  function toggleTheme() {
    const active = document.documentElement.getAttribute('data-theme') || 'light';
    const next = active === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('shami_theme', next);
    updateThemeIcon(next);
    labState.showToast(`Switched to GitHub ${next === 'dark' ? 'Dark' : 'Light'} theme`, 'info');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // --------------------------------------------------------------------------
  // 2. Tab Navigation & System Switcher
  // --------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.lab-tab-btn');
  const tabPanels = document.querySelectorAll('.lab-tab-panel');

  function activateTab(tabId: string) {
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === tabId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    labState.setTab(tabId as LabTabId);

    // Update Command Center ribbon
    updateCommandCenterHeader(tabId as LabTabId);

    // Render active model card
    renderModelCard('siModelCardWrap', tabId as LabTabId);

    // Render scenarios
    renderScenariosComparison(restoreScenarioInputs);

    if (tabId === 'neural-tab') {
      setTimeout(renderDecisionBoundary, 50);
    }

    // Trigger active analysis update
    triggerCurrentTabUpdate();
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab') || 'disease-tab';
      activateTab(target);
      window.location.hash = target;
    });
  });

  // Handle URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    activateTab(hash);
  } else {
    updateCommandCenterHeader('disease-tab');
    renderModelCard('siModelCardWrap', 'disease-tab');
  }

  // Subnav Tabs inside Extended Intelligence Suite
  const subnavBtns = document.querySelectorAll('.gh-subnav-btn');
  const subnavPanels = document.querySelectorAll('.gh-subnav-panel');

  subnavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('data-subtab');
      subnavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      subnavPanels.forEach(p => {
        if (p.id === targetPanelId) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });

  // Search Filter Bar
  const searchFilterInput = document.getElementById('ghSearchFilter') as HTMLInputElement | null;
  searchFilterInput?.addEventListener('input', () => {
    const q = searchFilterInput.value.toLowerCase().trim();
    tabBtns.forEach(btn => {
      const text = btn.textContent?.toLowerCase() || '';
      const tabId = btn.getAttribute('data-tab') || '';
      const match = text.includes(q) || tabId.includes(q);
      (btn as HTMLElement).style.display = match ? 'inline-flex' : 'none';
    });
  });

  // Shortcut key '/' to focus filter
  window.addEventListener('keydown', e => {
    const target = e.target as HTMLElement;
    if (e.key === '/' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchFilterInput?.focus();
    }
  });

  // --------------------------------------------------------------------------
  // 3. Command Center Dynamic Header
  // --------------------------------------------------------------------------
  function updateCommandCenterHeader(tabId: LabTabId) {
    const card = SYSTEM_MODEL_CARDS[tabId] || SYSTEM_MODEL_CARDS['disease-tab'];
    const sysNameEl = document.getElementById('siCommandSysName');
    const sysArchEl = document.getElementById('siCommandArch');
    const modelTypeEl = document.getElementById('siMetaModelType');
    const metricEl = document.getElementById('siMetaMetric');
    const featCountEl = document.getElementById('siMetaFeatureCount');

    if (sysNameEl) sysNameEl.textContent = card.title;
    if (sysArchEl) sysArchEl.textContent = card.badge;
    if (modelTypeEl) modelTypeEl.textContent = card.algorithm.split('(')[0].trim();
    if (featCountEl) featCountEl.textContent = `${card.features.length} Features`;

    const firstMetricKey = Object.keys(card.keyMetrics)[0];
    if (metricEl && firstMetricKey) {
      metricEl.textContent = `${card.keyMetrics[firstMetricKey]} (${firstMetricKey})`;
    }
  }

  // --------------------------------------------------------------------------
  // MODEL 1: Revive Clinical Disease Predictor (XGBoost + SHAP)
  // --------------------------------------------------------------------------
  const ageSlider = document.getElementById('reviveAge') as HTMLInputElement | null;
  const bmiSlider = document.getElementById('reviveBmi') as HTMLInputElement | null;
  const bpSlider = document.getElementById('reviveBp') as HTMLInputElement | null;
  const glucoseSlider = document.getElementById('reviveGlucose') as HTMLInputElement | null;

  function updateRevive() {
    if (!ageSlider || !bmiSlider || !bpSlider || !glucoseSlider) return;
    const t0 = performance.now();

    const age = parseFloat(ageSlider.value);
    const bmi = parseFloat(bmiSlider.value);
    const bp = parseFloat(bpSlider.value);
    const glucose = parseFloat(glucoseSlider.value);

    const ageVal = document.getElementById('ageVal');
    const bmiVal = document.getElementById('bmiVal');
    const bpVal = document.getElementById('bpVal');
    const glucoseVal = document.getElementById('glucoseVal');

    if (ageVal) ageVal.textContent = String(age);
    if (bmiVal) bmiVal.textContent = String(bmi);
    if (bpVal) bpVal.textContent = String(bp);
    if (glucoseVal) glucoseVal.textContent = String(glucose);

    // XGBoost synthetic clinical risk attribution (100% PRESERVED EXACT FORMULA)
    let risk = Math.round(
      (age * 0.22) +
      (Math.max(0, bmi - 22) * 2.3) +
      (Math.max(0, bp - 120) * 0.55) +
      (Math.max(0, glucose - 95) * 0.45)
    );
    risk = Math.min(98, Math.max(6, risk));

    const scoreEl = document.getElementById('diseaseScore');
    const badgeEl = document.getElementById('diseaseBadge');
    const recEl = document.getElementById('diseaseRec');

    if (scoreEl) scoreEl.textContent = `${risk}%`;

    let statusLabel = 'Low Clinical Risk';
    let statusClass = 'status-low';

    // Status interpretation (100% PRESERVED)
    if (risk < 35) {
      statusLabel = 'Low Clinical Risk';
      statusClass = 'status-low';
      if (badgeEl) {
        badgeEl.textContent = 'Low Clinical Risk';
        badgeEl.className = 'gauge-status-badge status-low';
      }
      if (recEl) recEl.textContent = 'Biomarkers are within optimal clinical thresholds. Routine preventive follow-up recommended.';
    } else if (risk < 70) {
      statusLabel = 'Moderate Clinical Risk';
      statusClass = 'status-moderate';
      if (badgeEl) {
        badgeEl.textContent = 'Moderate Clinical Risk';
        badgeEl.className = 'gauge-status-badge status-moderate';
      }
      if (recEl) recEl.textContent = 'Elevated metrics detected. Recommend dietary modifications and glucose/blood pressure monitoring.';
    } else {
      statusLabel = 'High Clinical Risk';
      statusClass = 'status-high';
      if (badgeEl) {
        badgeEl.textContent = 'High Clinical Risk';
        badgeEl.className = 'gauge-status-badge status-high';
      }
      if (recEl) recEl.textContent = 'Critical threshold exceeded. Recommend comprehensive cardiovascular and metabolic screening.';
    }

    // SHAP Attribution (100% PRESERVED)
    const shapG = ((glucose - 95) / 155 * 0.42).toFixed(2);
    const shapBp = ((bp - 120) / 60 * 0.32).toFixed(2);
    const shapBmi = ((bmi - 22) / 23 * 0.26).toFixed(2);

    const shapGVal = document.getElementById('shapGVal');
    const shapBpVal = document.getElementById('shapBpVal');
    const shapBmiVal = document.getElementById('shapBmiVal');
    const shapGBar = document.getElementById('shapGBar');
    const shapBpBar = document.getElementById('shapBpBar');
    const shapBmiBar = document.getElementById('shapBmiBar');

    if (shapGVal) shapGVal.textContent = (parseFloat(shapG) >= 0 ? '+' : '') + shapG;
    if (shapBpVal) shapBpVal.textContent = (parseFloat(shapBp) >= 0 ? '+' : '') + shapBp;
    if (shapBmiVal) shapBmiVal.textContent = (parseFloat(shapBmi) >= 0 ? '+' : '') + shapBmi;

    if (shapGBar) shapGBar.style.width = `${Math.min(100, Math.max(10, Math.abs(parseFloat(shapG)) * 200))}%`;
    if (shapBpBar) shapBpBar.style.width = `${Math.min(100, Math.max(10, Math.abs(parseFloat(shapBp)) * 200))}%`;
    if (shapBmiBar) shapBmiBar.style.width = `${Math.min(100, Math.max(10, Math.abs(parseFloat(shapBmi)) * 200))}%`;

    const latency = performance.now() - t0;
    const latencyEl = document.getElementById('siMetaLatency');
    if (latencyEl) latencyEl.textContent = `${latency.toFixed(2)} ms`;

    // ------------------------------------------------------------------------
    // Advanced Intelligence Upgrades: Explainability, What-If, Validation
    // ------------------------------------------------------------------------
    const xaiReport = computeReviveExplainability(age, bmi, bp, glucose, risk);
    renderXaiSection(xaiReport);

    // Update What-If Counterfactual Comparison
    renderWhatIfSection(risk, { reviveAge: age, reviveBmi: bmi, reviveBp: bp, reviveGlucose: glucose }, statusLabel);

    // Update Data Inspector & Validation
    const validationResult = validateReviveFeatures(age, bmi, bp, glucose);
    renderDataInspectorTable('siDataInspectorWrap', validationResult);

    // Update Developer Mode Inspector
    const normalizedVector = [
      (age - 18) / (80 - 18),
      (bmi - 15) / (45 - 15),
      (bp - 90) / (180 - 90),
      (glucose - 70) / (250 - 70)
    ];

    renderDeveloperModeInspector({
      systemId: 'revive',
      rawInputs: { age, bmi, bp, glucose },
      featureVector: [age, bmi, bp, glucose],
      normalizedVector,
      modelInfo: {
        name: 'Revive Clinical AI',
        algorithm: 'XGBoost Histogram Trees (5-Fold)',
        framework: 'Python Scikit-Learn Pipeline / XGBoost',
        accuracy: '85.4% (0.91 AUC-ROC)'
      },
      predictionOutput: {
        risk_score_pct: risk,
        classification: statusLabel,
        confidence_pct: xaiReport.confidencePct,
        uncertainty_margin: `±${xaiReport.uncertaintyMarginPct}%`
      },
      apiEndpoint: '/api/v1/predict/revive',
      latencyMs: latency
    });

    // Record into history
    labState.recordPrediction({
      systemId: 'disease-tab',
      systemName: 'Revive Clinical AI',
      inputs: { age, bmi, bp, glucose },
      resultScore: `${risk}%`,
      resultLabel: statusLabel,
      statusClass: statusClass as any,
      confidencePct: xaiReport.confidencePct,
      inferenceTimeMs: latency
    });
  }

  [ageSlider, bmiSlider, bpSlider, glucoseSlider].forEach(s => {
    s?.addEventListener('input', updateRevive);
  });
  updateRevive();

  // Snapshot Baseline button
  const snapshotBtn = document.getElementById('siSnapshotBaselineBtn');
  const snapshotInnerBtn = document.getElementById('siCaptureBaselineInnerBtn');
  function captureCurrentBaseline() {
    if (!ageSlider || !bmiSlider || !bpSlider || !glucoseSlider) return;
    const age = parseFloat(ageSlider.value);
    const bmi = parseFloat(bmiSlider.value);
    const bp = parseFloat(bpSlider.value);
    const glucose = parseFloat(glucoseSlider.value);
    const risk = parseInt(document.getElementById('diseaseScore')?.textContent || '18');
    const label = document.getElementById('diseaseBadge')?.textContent || 'Low Clinical Risk';

    labState.setWhatIfBaseline({
      systemId: labState.activeTab,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      inputs: { reviveAge: age, reviveBmi: bmi, reviveBp: bp, reviveGlucose: glucose },
      score: risk,
      label
    });
    labState.showToast('Captured baseline snapshot for What-If comparison', 'success');
    updateRevive();
  }
  snapshotBtn?.addEventListener('click', captureCurrentBaseline);
  snapshotInnerBtn?.addEventListener('click', captureCurrentBaseline);

  // --------------------------------------------------------------------------
  // MODEL 2: HamOrSpam NLP Classifier (TF-IDF + SMOTE)
  // --------------------------------------------------------------------------
  const spamInput = document.getElementById('spamInput') as HTMLTextAreaElement | null;
  const runSpamBtn = document.getElementById('runSpamBtn');
  const spamPresets = document.querySelectorAll('.spam-preset');

  spamPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      if (spamInput) {
        spamInput.value = btn.getAttribute('data-text') || '';
        runSpamAnalysis();
      }
    });
  });

  function runSpamAnalysis() {
    if (!spamInput) return;
    const t0 = performance.now();
    const text = spamInput.value.toLowerCase();
    const spamLexicon = [
      'won', 'lottery', 'cash', 'claim', 'prize', 'free', 'http', 'click', 'urgent',
      'verify', 'password', 'compromised', 'transfer', 'crypto', 'bonus', 'dollar'
    ];

    let hits = 0;
    const matchedTokens: string[] = [];

    spamLexicon.forEach(term => {
      if (text.includes(term)) {
        hits++;
        matchedTokens.push(term);
      }
    });

    let prob = Math.round((hits / 3.5) * 100);
    if (text.includes('http') || text.includes('verify') || text.includes('password')) {
      prob += 25;
    }
    prob = Math.min(99, Math.max(2, prob));

    const probVal = document.getElementById('spamProbVal');
    const badge = document.getElementById('spamStatusBadge');
    const tokensWrap = document.getElementById('spamTokensWrap');

    if (probVal) probVal.textContent = `${prob}%`;

    let statusClass = 'status-low';
    let statusLabel = 'HAM (CLEAN COMMUNICATION)';

    if (prob >= 50) {
      statusLabel = 'SPAM / PHISHING DETECTED';
      statusClass = 'status-high';
      if (badge) {
        badge.textContent = 'SPAM / PHISHING DETECTED';
        badge.className = 'gauge-status-badge status-high';
      }
    } else {
      if (badge) {
        badge.textContent = 'HAM (CLEAN COMMUNICATION)';
        badge.className = 'gauge-status-badge status-low';
      }
    }

    if (tokensWrap) {
      if (matchedTokens.length > 0) {
        tokensWrap.innerHTML = matchedTokens.map(t => `<span class="tech-tag">${t}</span>`).join('');
      } else {
        tokensWrap.innerHTML = `<span class="tech-tag">clean</span><span class="tech-tag">authentic</span>`;
      }
    }

    const latency = performance.now() - t0;
    const latencyEl = document.getElementById('siMetaLatency');
    if (latencyEl) latencyEl.textContent = `${latency.toFixed(2)} ms`;

    // Developer mode update for HamOrSpam
    renderDeveloperModeInspector({
      systemId: 'hamspam',
      rawInputs: { text: spamInput.value.substring(0, 100) + '...' },
      featureVector: [hits, text.length, matchedTokens.length],
      normalizedVector: [hits / 10, Math.min(1, text.length / 500), matchedTokens.length / 5],
      modelInfo: {
        name: 'HamOrSpam NLP',
        algorithm: 'TF-IDF + SMOTE + Logistic Regression',
        framework: 'Scikit-Learn NLP Pipeline',
        accuracy: '97.8% (0.988 AUC)'
      },
      predictionOutput: {
        spam_probability_pct: prob,
        classification: statusLabel,
        matched_tokens: matchedTokens
      },
      apiEndpoint: '/api/v1/predict/spam',
      latencyMs: latency
    });

    labState.recordPrediction({
      systemId: 'spam-tab',
      systemName: 'HamOrSpam NLP',
      inputs: { text: spamInput.value.substring(0, 45) + '...' },
      resultScore: `${prob}%`,
      resultLabel: statusLabel,
      statusClass: statusClass as any,
      confidencePct: 97,
      inferenceTimeMs: latency
    });
  }

  if (runSpamBtn) runSpamBtn.addEventListener('click', runSpamAnalysis);
  runSpamAnalysis();

  // --------------------------------------------------------------------------
  // MODEL 3: FarmAIQ Crop Advisor (NPK & Rainfall)
  // --------------------------------------------------------------------------
  const nSlider = document.getElementById('cropN') as HTMLInputElement | null;
  const pSlider = document.getElementById('cropP') as HTMLInputElement | null;
  const kSlider = document.getElementById('cropK') as HTMLInputElement | null;
  const rainSlider = document.getElementById('cropRain') as HTMLInputElement | null;

  function updateCropAdvisor() {
    if (!nSlider || !pSlider || !kSlider || !rainSlider) return;
    const t0 = performance.now();

    const n = parseFloat(nSlider.value);
    const p = parseFloat(pSlider.value);
    const k = parseFloat(kSlider.value);
    const rain = parseFloat(rainSlider.value);

    const nVal = document.getElementById('nVal');
    const pVal = document.getElementById('pVal');
    const kVal = document.getElementById('kVal');
    const rainVal = document.getElementById('rainVal');

    if (nVal) nVal.textContent = String(n);
    if (pVal) pVal.textContent = String(p);
    if (kVal) kVal.textContent = String(k);
    if (rainVal) rainVal.textContent = String(rain);

    let crop = 'Rice (Oryza sativa)';
    let reason = 'High water retention and nitrogen availability optimal for paddy cereals.';
    let icon = 'fa-seedling';

    if (rain < 80) {
      crop = 'Chickpea / Pulses';
      reason = 'Arid-tolerant leguminous crop with high nitrogen-fixing capacity.';
      icon = 'fa-leaf';
    } else if (n > 100 && rain > 180) {
      crop = 'Sugarcane / Jute';
      reason = 'Heavy nutrient consumption matched with prolonged tropical rainfall.';
      icon = 'fa-tree';
    } else if (k > 80) {
      crop = 'Cotton / Orchard Fruit';
      reason = 'Potassium-rich composition maximizes fiber density and fruit caliber.';
      icon = 'fa-apple-alt';
    } else if (p > 75) {
      crop = 'Maize / Corn';
      reason = 'High phosphorus demand for robust root development and grain fill.';
      icon = 'fa-wheat-awn';
    }

    const cropNameEl = document.getElementById('cropPredictedName');
    const cropReasonEl = document.getElementById('cropPredictedReason');
    const cropIconEl = document.getElementById('cropIconHolder');
    const cropMatchEl = document.getElementById('cropSuitabilityPct');

    const matchPct = Math.min(99, 86 + (n % 12));
    if (cropNameEl) cropNameEl.textContent = crop;
    if (cropReasonEl) cropReasonEl.textContent = reason;
    if (cropIconEl) cropIconEl.innerHTML = `<i class="fas ${icon}" style="font-size: 2.5rem; color: var(--accent-color);"></i>`;
    if (cropMatchEl) cropMatchEl.textContent = `${matchPct}%`;

    const latency = performance.now() - t0;
    const latencyEl = document.getElementById('siMetaLatency');
    if (latencyEl) latencyEl.textContent = `${latency.toFixed(2)} ms`;

    if (labState.activeTab === 'crop-tab') {
      renderDeveloperModeInspector({
        systemId: 'farmaiq',
        rawInputs: { nitrogen: n, phosphorus: p, potassium: k, rainfall: rain },
        featureVector: [n, p, k, rain],
        normalizedVector: [n / 140, p / 140, k / 140, rain / 300],
        modelInfo: {
          name: 'FarmAIQ Soil Advisor',
          algorithm: 'Random Forest Ensemble (Gini)',
          framework: 'Scikit-Learn Agronomy Engine',
          accuracy: '93.0% (2,200 records)'
        },
        predictionOutput: {
          recommended_crop: crop,
          suitability_pct: matchPct,
          reason
        },
        apiEndpoint: '/api/v1/recommend/crop',
        latencyMs: latency
      });
    }
  }

  [nSlider, pSlider, kSlider, rainSlider].forEach(s => {
    s?.addEventListener('input', updateCropAdvisor);
  });
  updateCropAdvisor();

  // --------------------------------------------------------------------------
  // MODEL 4: Neural Lab (2D Decision Boundary Canvas)
  // --------------------------------------------------------------------------
  const neuralCanvas = document.getElementById('neuralCanvas') as HTMLCanvasElement | null;
  const neuronsSlider = document.getElementById('neuralNeurons') as HTMLInputElement | null;
  const epochsSlider = document.getElementById('neuralEpochs') as HTMLInputElement | null;
  let currentDataset = 'moons';
  let currentActivation = 'relu';

  document.querySelectorAll('.dataset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.dataset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentDataset = chip.getAttribute('data-dataset') || 'moons';
      renderDecisionBoundary();
    });
  });

  document.querySelectorAll('.act-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.act-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentActivation = chip.getAttribute('data-act') || 'relu';
      renderDecisionBoundary();
    });
  });

  [neuronsSlider, epochsSlider].forEach(s => {
    s?.addEventListener('input', () => {
      const neuronsVal = document.getElementById('neuronsVal');
      const epochsVal = document.getElementById('epochsVal');
      if (neuronsVal && neuronsSlider) neuronsVal.textContent = neuronsSlider.value;
      if (epochsVal && epochsSlider) epochsVal.textContent = epochsSlider.value;
      renderDecisionBoundary();
    });
  });

  function renderDecisionBoundary() {
    if (!neuralCanvas) return;
    const ctx = neuralCanvas.getContext('2d');
    if (!ctx) return;

    const w = neuralCanvas.width;
    const h = neuralCanvas.height;
    ctx.clearRect(0, 0, w, h);

    const neurons = neuronsSlider ? parseInt(neuronsSlider.value) : 16;
    const epochs = epochsSlider ? parseInt(epochsSlider.value) : 80;

    // Background Surface
    const step = 10;
    for (let px = 0; px < w; px += step) {
      for (let py = 0; py < h; py += step) {
        const nx = (px / w) * 2.8 - 1.4;
        const ny = (py / h) * 2.8 - 1.4;

        let val = 0;
        if (currentDataset === 'moons') {
          val = Math.sin(nx * 2.4) - ny * 1.6;
        } else if (currentDataset === 'circles') {
          val = Math.sqrt(nx * nx + ny * ny) - 0.7;
        } else if (currentDataset === 'xor') {
          val = nx * ny * 3.5;
        } else {
          val = ny - 0.5 * nx;
        }

        const complexity = neurons / 16;
        const prob = 1 / (1 + Math.exp(-val * complexity * 2.2));

        ctx.fillStyle = prob > 0.5
          ? `rgba(9, 105, 218, ${Math.min(0.35, (prob - 0.5) * 0.7)})`
          : `rgba(17, 24, 39, ${Math.min(0.25, (0.5 - prob) * 0.5)})`;
        ctx.fillRect(px, py, step, step);
      }
    }

    // Points
    const n = 50;
    for (let i = 0; i < n; i++) {
      let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
      if (currentDataset === 'moons') {
        const angle = (i / n) * Math.PI;
        x1 = Math.cos(angle) + (Math.random() - 0.5) * 0.15;
        y1 = Math.sin(angle) + (Math.random() - 0.5) * 0.15;
        x2 = 1 - Math.cos(angle) + (Math.random() - 0.5) * 0.15;
        y2 = 0.5 - Math.sin(angle) + (Math.random() - 0.5) * 0.15;
      } else if (currentDataset === 'circles') {
        const angle = (i / n) * 2 * Math.PI;
        x1 = 0.4 * Math.cos(angle) + (Math.random() - 0.5) * 0.1;
        y1 = 0.4 * Math.sin(angle) + (Math.random() - 0.5) * 0.1;
        x2 = 0.9 * Math.cos(angle) + (Math.random() - 0.5) * 0.1;
        y2 = 0.9 * Math.sin(angle) + (Math.random() - 0.5) * 0.1;
      } else {
        x1 = (Math.random() - 0.5) * 2;
        y1 = (Math.random() - 0.5) * 2;
        x2 = (Math.random() - 0.5) * 2;
        y2 = (Math.random() - 0.5) * 2;
      }

      const px1 = ((x1 + 1.4) / 2.8) * w;
      const py1 = ((y1 + 1.4) / 2.8) * h;
      const px2 = ((x2 + 1.4) / 2.8) * w;
      const py2 = ((y2 + 1.4) / 2.8) * h;

      ctx.fillStyle = '#0969DA';
      ctx.beginPath();
      ctx.arc(px1, py1, 3.5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#1F2328';
      ctx.beginPath();
      ctx.arc(px2, py2, 3.5, 0, 2 * Math.PI);
      ctx.fill();
    }

    const loss = (0.012 + (1 / epochs) * 0.7 + (1 / neurons) * 0.2).toFixed(4);
    const acc = Math.min(99.1, (91 + (neurons / 32) * 5 + (epochs / 200) * 3)).toFixed(1);

    const lossEl = document.getElementById('trainLossVal');
    const accEl = document.getElementById('valAccVal');
    if (lossEl) lossEl.textContent = loss;
    if (accEl) accEl.textContent = `${acc}%`;
  }

  // --------------------------------------------------------------------------
  // MODEL 5: Emotion NLP
  // --------------------------------------------------------------------------
  const sentInput = document.getElementById('sentInput') as HTMLTextAreaElement | null;
  const runSentBtn = document.getElementById('runSentBtn');
  const sentPresets = document.querySelectorAll('.sent-preset');

  sentPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      if (sentInput) {
        sentInput.value = btn.getAttribute('data-text') || '';
        runSentimentAnalysis();
      }
    });
  });

  function runSentimentAnalysis() {
    if (!sentInput) return;
    const text = sentInput.value.toLowerCase();

    const joyWords = ['stunning', 'thrilled', 'love', 'great', 'awesome', 'excellent', 'amazing', 'happy', 'superb', 'best', 'flawless'];
    const optWords = ['accuracy', 'latency', 'optimize', 'clean', 'improved', 'scale', 'reliable', 'effective', 'achieved', 'production'];
    const urgWords = ['urgent', 'alert', 'spike', 'failover', 'critical', 'immediate', 'emergency', 'security', 'compromised'];
    const frustWords = ['frustrated', 'timeout', 'breaking', 'error', 'bug', 'terrible', 'worst', 'failed', 'slow', 'crash', 'bad'];

    let joy = 0, opt = 0, urg = 0, frust = 0;
    joyWords.forEach(w => { if (text.includes(w)) joy += 30; });
    optWords.forEach(w => { if (text.includes(w)) opt += 25; });
    urgWords.forEach(w => { if (text.includes(w)) urg += 35; });
    frustWords.forEach(w => { if (text.includes(w)) frust += 35; });

    joy = Math.min(95, Math.max(8, joy || 12));
    opt = Math.min(92, Math.max(10, opt || 16));
    urg = Math.min(98, Math.max(3, urg || 5));
    frust = Math.min(96, Math.max(2, frust || 4));

    const joyBar = document.getElementById('joyBar');
    const optBar = document.getElementById('optBar');
    const urgBar = document.getElementById('urgBar');
    const frustBar = document.getElementById('frustBar');

    const joyVal = document.getElementById('joyVal');
    const optVal = document.getElementById('optVal');
    const urgVal = document.getElementById('urgVal');
    const frustVal = document.getElementById('frustVal');

    if (joyBar) joyBar.style.width = `${joy}%`;
    if (optBar) optBar.style.width = `${opt}%`;
    if (urgBar) urgBar.style.width = `${urg}%`;
    if (frustBar) frustBar.style.width = `${frust}%`;

    if (joyVal) joyVal.textContent = `${joy}%`;
    if (optVal) optVal.textContent = `${opt}%`;
    if (urgVal) urgVal.textContent = `${urg}%`;
    if (frustVal) frustVal.textContent = `${frust}%`;

    const badge = document.getElementById('sentStatusBadge');
    if (badge) {
      if (frust > 40) {
        badge.textContent = 'NEGATIVE / DISSATISFACTION';
        badge.className = 'gauge-status-badge status-high';
      } else if (urg > 40) {
        badge.textContent = 'URGENT ATTENTION REQUIRED';
        badge.className = 'gauge-status-badge status-moderate';
      } else {
        badge.textContent = 'POSITIVE / HIGH CONFIDENCE';
        badge.className = 'gauge-status-badge status-low';
      }
    }
  }

  if (runSentBtn) runSentBtn.addEventListener('click', runSentimentAnalysis);
  runSentimentAnalysis();

  // --------------------------------------------------------------------------
  // MODEL 6: Vector RAG & Cosine Similarity
  // --------------------------------------------------------------------------
  const vectorInput = document.getElementById('vectorInput') as HTMLInputElement | null;
  const runVectorBtn = document.getElementById('runVectorBtn');
  const vectorPresets = document.querySelectorAll('.vector-preset');
  const vectorResults = document.getElementById('vectorResults');

  const corpus = [
    {
      title: 'Real-Time Edge Perception via Convolutional Neural Networks',
      keywords: ['computer', 'vision', 'object', 'detection', 'cnn', 'image', 'neural', 'opencv'],
      summary: 'High-throughput feature representation and spatial bounding box estimation optimized for autonomous inference.'
    },
    {
      title: 'Multi-Head Self-Attention Architectures for Generative NLP',
      keywords: ['transformer', 'attention', 'nlp', 'language', 'generation', 'llm', 'bert', 'token'],
      summary: 'Contextual dense embeddings and retrieval-augmented generation frameworks for conversational semantic reasoning.'
    },
    {
      title: 'Automated MLOps Lifecycles & Containerized API Serving',
      keywords: ['mlops', 'pipeline', 'cicd', 'monitoring', 'deployment', 'docker', 'inference', 'kubernetes'],
      summary: 'Zero-downtime microservices architecture with data-drift monitoring, model registry, and automated integration.'
    },
    {
      title: 'Actor-Critic Reinforcement Learning for Robotic Policy Control',
      keywords: ['reinforcement', 'learning', 'reward', 'policy', 'optimization', 'robotics', 'q-learning'],
      summary: 'Continuous action-space policy gradients with entropy regularization for dynamic trajectory adaptation.'
    }
  ];

  vectorPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      if (vectorInput) {
        vectorInput.value = btn.getAttribute('data-q') || '';
        runVectorSearch();
      }
    });
  });

  function runVectorSearch() {
    if (!vectorInput || !vectorResults) return;
    const tokens = vectorInput.value.toLowerCase().split(/[\s,]+/);

    const scored = corpus.map(doc => {
      let matches = 0;
      tokens.forEach(t => {
        if (t.length > 2 && doc.keywords.some(k => k.includes(t) || t.includes(k))) {
          matches++;
        }
      });
      const score = matches > 0 ? Math.min(99.2, 68 + matches * 8.5) : Math.floor(Math.random() * 20) + 15;
      return { ...doc, score: score.toFixed(1) };
    });

    scored.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    vectorResults.innerHTML = scored
      .map(
        (doc, i) => `
      <div style="padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background-color: var(--bg-secondary); margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
          <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary);">#${i + 1} ${doc.title}</h4>
          <span style="font-size: 0.8125rem; font-weight: 700; color: var(--accent-color); font-family: var(--font-mono);">${doc.score}%</span>
        </div>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">${doc.summary}</p>
        <div class="shap-bar-bg" style="margin-top: 0.5rem;">
          <div class="shap-bar-fill" style="width: ${doc.score}%;"></div>
        </div>
      </div>
    `
      )
      .join('');
  }

  if (runVectorBtn) runVectorBtn.addEventListener('click', runVectorSearch);
  runVectorSearch();

  // --------------------------------------------------------------------------
  // MODEL 7: ChurnShield AI
  // --------------------------------------------------------------------------
  const churnTenure = document.getElementById('churnTenure') as HTMLInputElement | null;
  const churnCharges = document.getElementById('churnCharges') as HTMLInputElement | null;
  const churnContract = document.getElementById('churnContract') as HTMLSelectElement | null;
  const churnTickets = document.getElementById('churnTickets') as HTMLInputElement | null;

  function updateChurnModel() {
    if (!churnTenure || !churnCharges || !churnContract || !churnTickets) return;
    const t0 = performance.now();

    const tenure = parseFloat(churnTenure.value);
    const charges = parseFloat(churnCharges.value);
    const contract = churnContract.value;
    const tickets = parseFloat(churnTickets.value);

    const tenureVal = document.getElementById('churnTenureVal');
    const chargesVal = document.getElementById('churnChargesVal');
    const ticketsVal = document.getElementById('churnTicketsVal');

    if (tenureVal) tenureVal.textContent = `${tenure} mo`;
    if (chargesVal) chargesVal.textContent = `$${charges}`;
    if (ticketsVal) ticketsVal.textContent = String(tickets);

    let contractPenalty = contract === 'monthly' ? 35 : contract === 'one-year' ? 10 : 2;
    let tenureFactor = Math.max(0, 45 - tenure * 0.7);
    let chargeFactor = (charges / 120) * 18;
    let ticketFactor = tickets * 8.5;

    let score = Math.round(contractPenalty + tenureFactor + chargeFactor + ticketFactor);
    score = Math.min(96, Math.max(4, score));

    const churnScoreEl = document.getElementById('churnScore');
    const churnBadgeEl = document.getElementById('churnBadge');
    const churnRecEl = document.getElementById('churnRec');

    if (churnScoreEl) churnScoreEl.textContent = `${score}%`;

    let statusClass = 'status-low';
    let statusLabel = 'Low Churn Risk';

    if (score < 30) {
      statusLabel = 'Low Churn Risk';
      statusClass = 'status-low';
      if (churnBadgeEl) {
        churnBadgeEl.textContent = 'Low Churn Risk';
        churnBadgeEl.className = 'gauge-status-badge status-low';
      }
      if (churnRecEl) churnRecEl.textContent = 'Account demonstrates healthy tenure stability. Candidate for product tier upsell.';
    } else if (score < 65) {
      statusLabel = 'Moderate Churn Risk';
      statusClass = 'status-moderate';
      if (churnBadgeEl) {
        churnBadgeEl.textContent = 'Moderate Churn Risk';
        churnBadgeEl.className = 'gauge-status-badge status-moderate';
      }
      if (churnRecEl) churnRecEl.textContent = 'Tenure or charge sensitivity noted. Offer annual commitment incentive with loyalty discount.';
    } else {
      statusLabel = 'High Churn Risk';
      statusClass = 'status-high';
      if (churnBadgeEl) {
        churnBadgeEl.textContent = 'High Churn Risk';
        churnBadgeEl.className = 'gauge-status-badge status-high';
      }
      if (churnRecEl) churnRecEl.textContent = 'Multiple unresolved support friction points. Schedule immediate customer success retention outreach.';
    }

    const latency = performance.now() - t0;
    const latencyEl = document.getElementById('siMetaLatency');
    if (latencyEl) latencyEl.textContent = `${latency.toFixed(2)} ms`;

    if (labState.activeTab === 'churn-tab') {
      renderDeveloperModeInspector({
        systemId: 'churnshield',
        rawInputs: { tenure_months: tenure, monthly_charges: charges, contract, support_tickets: tickets },
        featureVector: [tenure, charges, tickets],
        normalizedVector: [tenure / 72, charges / 150, tickets / 8],
        modelInfo: {
          name: 'ChurnShield AI',
          algorithm: 'Gradient Boosted Decision Trees',
          framework: 'XGBoost Telemetry Hazard Engine',
          accuracy: '88.2% (0.924 AUC)'
        },
        predictionOutput: {
          churn_risk_pct: score,
          classification: statusLabel
        },
        apiEndpoint: '/api/v1/predict/churn',
        latencyMs: latency
      });

      labState.recordPrediction({
        systemId: 'churn-tab',
        systemName: 'ChurnShield AI',
        inputs: { tenure: `${tenure}mo`, charges: `$${charges}`, contract, tickets },
        resultScore: `${score}%`,
        resultLabel: statusLabel,
        statusClass: statusClass as any,
        confidencePct: 88,
        inferenceTimeMs: latency
      });
    }
  }

  [churnTenure, churnCharges, churnContract, churnTickets].forEach(el => {
    el?.addEventListener('input', updateChurnModel);
  });
  updateChurnModel();

  // --------------------------------------------------------------------------
  // MODEL 8: SQL Sandbox
  // --------------------------------------------------------------------------
  const sqlEditor = document.getElementById('sqlEditor') as HTMLTextAreaElement | null;
  const runSqlBtn = document.getElementById('runSqlBtn');
  const sqlResultsWrap = document.getElementById('sqlResultsWrap');
  const sqlPresets = document.querySelectorAll('.sql-preset');

  const sampleDatabase = [
    { id: 101, customer: 'Alpha Corp', region: 'North', monthly_spend: 1850, tenure_months: 24, status: 'Active' },
    { id: 102, customer: 'Beta Healthcare', region: 'South', monthly_spend: 3400, tenure_months: 36, status: 'Active' },
    { id: 103, customer: 'Gamma Logistics', region: 'West', monthly_spend: 920, tenure_months: 6, status: 'At-Risk' },
    { id: 104, customer: 'Delta Retail', region: 'North', monthly_spend: 2150, tenure_months: 18, status: 'Active' },
    { id: 105, customer: 'Epsilon FinTech', region: 'East', monthly_spend: 4800, tenure_months: 42, status: 'Active' },
    { id: 106, customer: 'Zeta Media', region: 'West', monthly_spend: 640, tenure_months: 3, status: 'At-Risk' },
    { id: 107, customer: 'Theta Tech', region: 'South', monthly_spend: 2900, tenure_months: 28, status: 'Active' }
  ];

  sqlPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      if (sqlEditor) {
        sqlEditor.value = btn.getAttribute('data-sql') || '';
        executeSqlSimulation();
      }
    });
  });

  function executeSqlSimulation() {
    if (!sqlEditor || !sqlResultsWrap) return;
    const t0 = performance.now();
    const query = sqlEditor.value.trim();

    let outputRows = [...sampleDatabase];
    let querySummary = 'Executed SELECT query across 7 customer records.';

    if (query.toUpperCase().includes('AT-RISK')) {
      outputRows = sampleDatabase.filter(r => r.status === 'At-Risk');
      querySummary = 'Filter applied: status = "At-Risk". Found 2 accounts.';
    } else if (query.toUpperCase().includes('NORTH')) {
      outputRows = sampleDatabase.filter(r => r.region === 'North');
      querySummary = 'Filter applied: region = "North". Found 2 accounts.';
    } else if (query.toUpperCase().includes('ORDER BY')) {
      outputRows = [...sampleDatabase].sort((a, b) => b.monthly_spend - a.monthly_spend);
      querySummary = 'Sorted by monthly_spend DESC. 7 accounts ordered.';
    }

    const latency = performance.now() - t0;

    sqlResultsWrap.innerHTML = `
      <div style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>${querySummary}</span>
        <span style="color: var(--accent-color); font-weight: 600;">Execution Time: ${latency.toFixed(2)}ms</span>
      </div>
      <div class="sql-table-wrap">
        <table class="sql-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Region</th>
              <th>Monthly Spend</th>
              <th>Tenure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${outputRows
              .map(
                r => `
              <tr>
                <td>${r.id}</td>
                <td><strong>${r.customer}</strong></td>
                <td>${r.region}</td>
                <td>$${r.monthly_spend.toLocaleString()}</td>
                <td>${r.tenure_months} mo</td>
                <td>
                  <span class="gauge-status-badge ${r.status === 'Active' ? 'status-low' : 'status-high'}" style="padding: 2px 6px; font-size: 0.7rem;">
                    ${r.status}
                  </span>
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  if (runSqlBtn) runSqlBtn.addEventListener('click', executeSqlSimulation);
  executeSqlSimulation();

  // --------------------------------------------------------------------------
  // MODEL 9: CorOrbit Python Snippet Switcher (100% PRESERVED)
  // --------------------------------------------------------------------------
  const cororbitSnippets: Record<string, string> = {
    'binary-search': `def binary_search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Time Complexity: O(log N) | Space: O(1)`,
    'two-pointers': `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        w = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, w * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water

# Time Complexity: O(N) | Space: O(1)`,
    'dp-fib': `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev1, prev2 = 2, 1
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1

# Time Complexity: O(N) | Space: O(1) Dynamic Programming`,
    'graph-bfs': `from collections import deque

def bfs(graph: dict[str, list[str]], start: str) -> list[str]:
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

# Time Complexity: O(V + E) | Space: O(V)`
  };

  const snippetBox = document.getElementById('cororbitCodeSnippet');
  document.querySelectorAll('.cororbit-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cororbit-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pyKey = btn.getAttribute('data-py') || 'binary-search';
      if (snippetBox && cororbitSnippets[pyKey]) {
        snippetBox.textContent = cororbitSnippets[pyKey];
      }
    });
  });

  // --------------------------------------------------------------------------
  // MODEL 10: DSAos Company Category Switcher (100% PRESERVED)
  // --------------------------------------------------------------------------
  const dsaosCategories: Record<string, string> = {
    faang: `
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">#01 · Two Sum / Pair Hash:</span> O(N) Hash Map Lookup [Google, Amazon, Meta]
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">#02 · Longest Substring Without Repeating:</span> Sliding Window + Dynamic Set [Microsoft, Uber]
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">#03 · Number of Islands:</span> Disjoint Set Union &amp; BFS Grid Traversal [Amazon, Bloomberg]
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">#04 · Coin Change:</span> Unbounded Knapsack Bottom-Up DP [Goldman Sachs, Atlassian]
      </div>
    `,
    patterns: `
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">Pattern 01 · Sliding Window:</span> Fixed &amp; Variable size sub-arrays (Max Sum, Anagrams)
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">Pattern 02 · Two Pointers:</span> Converging bounds &amp; fast/slow runners (Cycle Detection)
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">Pattern 03 · Top K Elements:</span> Min-Heap &amp; Max-Heap priority queues in O(N log K)
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">Pattern 04 · Topological Sort:</span> Directed Acyclic Graph (DAG) Kahn's algorithm
      </div>
    `,
    mock: `
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">Checklist 01:</span> Clarify constraints &amp; input bounds (N <= 10^5 indicates O(N log N) or O(N)).
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">Checklist 02:</span> State brute-force solution upfront, then optimize with hash-table or two pointers.
      </div>
      <div style="padding: 0.65rem 0.85rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.8125rem;">
        <span style="color: var(--accent-color); font-weight: 600;">Checklist 03:</span> Write edge test cases: empty array, single element, negative numbers, duplicates.
      </div>
    `
  };

  const dsaosListBox = document.getElementById('dsaosPreviewList');
  document.querySelectorAll('.dsaos-company').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dsaos-company').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const coKey = btn.getAttribute('data-co') || 'faang';
      if (dsaosListBox && dsaosCategories[coKey]) {
        dsaosListBox.innerHTML = dsaosCategories[coKey];
      }
    });
  });

  // --------------------------------------------------------------------------
  // MODEL 11: GateDA Syllabus Switcher (100% PRESERVED)
  // --------------------------------------------------------------------------
  const gatedaSyllabusContent: Record<string, string> = {
    math: `
      <p><strong>Core Mathematical Foundations:</strong></p>
      <ul style="padding-left: 1.25rem; margin-top: 0.35rem;">
        <li><strong>Linear Algebra:</strong> Vector spaces, matrices, rank, eigenvalues/eigenvectors, SVD, PCA projection.</li>
        <li><strong>Calculus &amp; Optimization:</strong> Gradients, directional derivatives, maxima/minima, convex optimization.</li>
        <li><strong>Probability &amp; Statistics:</strong> Bayes theorem, conditional probability, expectation, distributions (Gaussian, Bernoulli), central limit theorem.</li>
      </ul>
    `,
    ml: `
      <p><strong>Machine Learning (Supervised &amp; Unsupervised):</strong></p>
      <ul style="padding-left: 1.25rem; margin-top: 0.35rem;">
        <li><strong>Supervised:</strong> Linear/Logistic Regression, Ridge &amp; Lasso regularization, Decision Trees, Random Forests, XGBoost, Support Vector Machines (SVM).</li>
        <li><strong>Unsupervised:</strong> K-Means Clustering, Hierarchical clustering, Gaussian Mixture Models (EM algorithm), Dimensionality Reduction (PCA, t-SNE).</li>
        <li><strong>Deep Learning:</strong> Multi-layer Perceptrons (MLP), backpropagation, activation functions, loss surfaces, vanishing gradient treatment.</li>
      </ul>
    `,
    ai: `
      <p><strong>Artificial Intelligence (Search &amp; Reasoning):</strong></p>
      <ul style="padding-left: 1.25rem; margin-top: 0.35rem;">
        <li><strong>Search Algorithms:</strong> Informed search (A*, Greedy Best-First), Uninformed search (BFS, DFS, Uniform Cost Search), Adversarial search (Minimax, Alpha-Beta pruning).</li>
        <li><strong>Logic &amp; Reasoning:</strong> Propositional logic, First-order predicate calculus, resolution refutation, forward/backward chaining.</li>
      </ul>
    `,
    db: `
      <p><strong>Database Management Systems &amp; Warehousing:</strong></p>
      <ul style="padding-left: 1.25rem; margin-top: 0.35rem;">
        <li><strong>Relational Model:</strong> Relational algebra, tuple calculus, entity-relationship (ER) mapping, SQL DDL/DML/DQL queries, sub-queries, joins, aggregations.</li>
        <li><strong>Normalization:</strong> Functional dependencies, 1NF, 2NF, 3NF, BCNF, lossless join decomposition.</li>
      </ul>
    `
  };

  const gatedaBox = document.getElementById('gatedaSyllabusBox');
  document.querySelectorAll('.gateda-sub').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gateda-sub').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const subKey = btn.getAttribute('data-sub') || 'math';
      if (gatedaBox && gatedaSyllabusContent[subKey]) {
        gatedaBox.innerHTML = gatedaSyllabusContent[subKey];
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Extended Views Handlers: XAI & What-If Rendering
  // --------------------------------------------------------------------------
  function renderXaiSection(report: any) {
    const narrativeEl = document.getElementById('siXaiNarrative');
    const confidenceEl = document.getElementById('siXaiConfidence');
    const uncertaintyEl = document.getElementById('siXaiUncertainty');
    const listEl = document.getElementById('siXaiImpactsList');

    if (confidenceEl) confidenceEl.textContent = `${report.confidencePct}%`;
    if (uncertaintyEl) uncertaintyEl.textContent = `${report.uncertaintyMarginPct}%`;
    if (narrativeEl) narrativeEl.innerHTML = report.narrative;

    if (listEl) {
      listEl.innerHTML = report.featureImpacts
        .map(
          (imp: any) => `
        <div class="gh-feature-impact-row">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${imp.direction === 'elevating' ? 'fa-arrow-trend-up' : imp.direction === 'protective' ? 'fa-arrow-trend-down' : 'fa-minus'}"
               style="color: ${imp.direction === 'elevating' ? '#dc2626' : imp.direction === 'protective' ? '#059669' : 'var(--text-muted)'}; font-size: 0.9rem;"></i>
            <div>
              <strong>${imp.name}</strong> (${imp.rawValue} ${imp.unit})
              <div style="font-size: 0.75rem; color: var(--text-secondary);">${imp.explanation}</div>
            </div>
          </div>
          <div style="font-family: var(--font-mono); font-weight: 700; color: ${imp.contributionPct > 0 ? '#dc2626' : '#059669'};">
            ${imp.contributionPct > 0 ? '+' : ''}${imp.contributionPct}% impact
          </div>
        </div>
      `
        )
        .join('');
    }
  }

  function renderWhatIfSection(currentScore: number, currentInputs: Record<string, any>, currentLabel: string) {
    const container = document.getElementById('siWhatIfDiffContainer');
    if (!container) return;

    const baseline = labState.whatIfBaseline;
    if (!baseline) {
      container.innerHTML = `
        <div class="gh-snapshot-card">
          <div style="text-align: center; padding: 1.25rem 0;">
            <i class="fas fa-camera" style="font-size: 1.75rem; color: var(--text-muted); margin-bottom: 0.5rem;"></i>
            <p style="font-weight: 600; color: var(--text-primary); margin: 0;">No Baseline Snapshot Captured</p>
            <p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 0.35rem 0 1rem 0;">
              Click "Snapshot Baseline" above to freeze current parameters and observe how individual feature perturbations impact prediction probability.
            </p>
            <button class="gh-btn gh-btn-primary gh-btn-sm" onclick="document.getElementById('siSnapshotBaselineBtn')?.click()">
              <i class="fas fa-camera"></i> Snapshot Baseline Now
            </button>
          </div>
        </div>
      `;
      return;
    }

    const diff = computeCounterfactualComparison(baseline, currentScore, currentInputs, currentLabel);

    container.innerHTML = `
      <div class="gh-counterfactual-grid">
        <!-- Baseline Snapshot Card -->
        <div class="gh-snapshot-card">
          <div class="gh-snapshot-score-row">
            <div>
              <span class="gh-badge">Baseline Snapshot (${baseline.timestamp})</span>
              <div style="font-size: 1.75rem; font-weight: 800; font-family: var(--font-mono); color: var(--text-primary); margin-top: 0.25rem;">
                ${diff.baselineScore}%
              </div>
            </div>
            <span class="gauge-status-badge status-low" style="font-size: 0.7rem;">${diff.baselineLabel}</span>
          </div>

          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Baseline Parameters:
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem;">
            ${Object.entries(baseline.inputs)
              .map(([k, v]) => `<div><span>${k.replace('revive', '')}:</span> <strong>${v}</strong></div>`)
              .join('')}
          </div>
        </div>

        <!-- Current / Counterfactual Card -->
        <div class="gh-snapshot-card">
          <div class="gh-snapshot-score-row">
            <div>
              <span class="gh-badge" style="color: var(--accent-color); border-color: var(--accent-color);">Current State</span>
              <div style="font-size: 1.75rem; font-weight: 800; font-family: var(--font-mono); color: var(--accent-color); margin-top: 0.25rem;">
                ${diff.currentScore}%
              </div>
            </div>
            <span class="gh-delta-pill ${diff.scoreDelta > 0 ? 'gh-delta-up' : 'gh-delta-down'}">
              ${diff.scoreDelta >= 0 ? '+' : ''}${diff.scoreDelta}% Delta
            </span>
          </div>

          <div style="font-size: 0.8125rem; color: var(--text-primary); line-height: 1.5; margin-bottom: 0.75rem;">
            ${diff.impactSummary}
          </div>

          <div style="font-size: 0.75rem; color: var(--text-secondary);">
            <strong>Feature Mutations:</strong>
            ${
              diff.changedFeatures.length === 0
                ? '<div style="margin-top: 0.25rem; color: var(--text-muted);">No input differences.</div>'
                : diff.changedFeatures
                    .map(
                      f => `
                  <div style="display: flex; justify-content: space-between; padding: 0.15rem 0; border-bottom: 1px dashed var(--border-light);">
                    <span>${f.name}:</span>
                    <span>${f.from} &rarr; <strong>${f.to}</strong> (${f.delta})</span>
                  </div>
                `
                    )
                    .join('')
            }
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 5. Smart Presets Execution Engine
  // --------------------------------------------------------------------------
  const presetNormalBtn = document.getElementById('presetNormalBtn');
  const presetLowRiskBtn = document.getElementById('presetLowRiskBtn');
  const presetHighRiskBtn = document.getElementById('presetHighRiskBtn');
  const presetRandomBtn = document.getElementById('presetRandomBtn');
  const presetResetBtn = document.getElementById('presetResetBtn');

  function applyPreset(type: 'normal' | 'low' | 'high' | 'random' | 'reset') {
    const tab = labState.activeTab;

    if (tab === 'disease-tab' && ageSlider && bmiSlider && bpSlider && glucoseSlider) {
      if (type === 'normal') {
        ageSlider.value = '28';
        bmiSlider.value = '24.5';
        bpSlider.value = '120';
        glucoseSlider.value = '95';
      } else if (type === 'low') {
        ageSlider.value = '22';
        bmiSlider.value = '21.0';
        bpSlider.value = '112';
        glucoseSlider.value = '86';
      } else if (type === 'high') {
        ageSlider.value = '64';
        bmiSlider.value = '35.5';
        bpSlider.value = '165';
        glucoseSlider.value = '175';
      } else if (type === 'random') {
        ageSlider.value = String(Math.floor(Math.random() * (75 - 20) + 20));
        bmiSlider.value = String((Math.random() * (40 - 18) + 18).toFixed(1));
        bpSlider.value = String(Math.floor(Math.random() * (175 - 95) + 95));
        glucoseSlider.value = String(Math.floor(Math.random() * (220 - 75) + 75));
      } else if (type === 'reset') {
        ageSlider.value = '28';
        bmiSlider.value = '24.5';
        bpSlider.value = '120';
        glucoseSlider.value = '95';
      }
      updateRevive();
      labState.addLog('PRESET', `Applied ${type} preset to Revive`);
      labState.showToast(`Applied ${type.toUpperCase()} preset to Revive`, 'success');
    } else if (tab === 'churn-tab' && churnTenure && churnCharges && churnContract && churnTickets) {
      if (type === 'normal' || type === 'reset') {
        churnTenure.value = '12';
        churnCharges.value = '75';
        churnContract.value = 'monthly';
        churnTickets.value = '1';
      } else if (type === 'low') {
        churnTenure.value = '48';
        churnCharges.value = '60';
        churnContract.value = 'two-year';
        churnTickets.value = '0';
      } else if (type === 'high') {
        churnTenure.value = '3';
        churnCharges.value = '130';
        churnContract.value = 'monthly';
        churnTickets.value = '5';
      } else if (type === 'random') {
        churnTenure.value = String(Math.floor(Math.random() * 60 + 2));
        churnCharges.value = String(Math.floor(Math.random() * 120 + 25));
        churnContract.value = Math.random() > 0.5 ? 'monthly' : 'one-year';
        churnTickets.value = String(Math.floor(Math.random() * 7));
      }
      updateChurnModel();
      labState.addLog('PRESET', `Applied ${type} preset to ChurnShield`);
      labState.showToast(`Applied ${type.toUpperCase()} preset to ChurnShield`, 'success');
    } else if (tab === 'crop-tab' && nSlider && pSlider && kSlider && rainSlider) {
      if (type === 'normal' || type === 'reset') {
        nSlider.value = '90';
        pSlider.value = '42';
        kSlider.value = '43';
        rainSlider.value = '200';
      } else if (type === 'low') {
        nSlider.value = '40';
        pSlider.value = '30';
        kSlider.value = '30';
        rainSlider.value = '60';
      } else if (type === 'high') {
        nSlider.value = '130';
        pSlider.value = '90';
        kSlider.value = '95';
        rainSlider.value = '260';
      } else if (type === 'random') {
        nSlider.value = String(Math.floor(Math.random() * 120 + 15));
        pSlider.value = String(Math.floor(Math.random() * 120 + 15));
        kSlider.value = String(Math.floor(Math.random() * 120 + 15));
        rainSlider.value = String(Math.floor(Math.random() * 250 + 40));
      }
      updateCropAdvisor();
      labState.addLog('PRESET', `Applied ${type} preset to FarmAIQ`);
      labState.showToast(`Applied ${type.toUpperCase()} preset to FarmAIQ`, 'success');
    } else if (tab === 'spam-tab' && spamInput) {
      if (type === 'high') {
        spamInput.value = 'URGENT: Your account password has been compromised. Verify your security details at http://secure-portal-verify.net';
      } else {
        spamInput.value = 'Hi Shami, could you please review the updated Python ETL pipeline script before our morning standup meeting? Thanks!';
      }
      runSpamAnalysis();
      labState.showToast(`Loaded ${type.toUpperCase()} text sample`, 'info');
    }
  }

  presetNormalBtn?.addEventListener('click', () => applyPreset('normal'));
  presetLowRiskBtn?.addEventListener('click', () => applyPreset('low'));
  presetHighRiskBtn?.addEventListener('click', () => applyPreset('high'));
  presetRandomBtn?.addEventListener('click', () => applyPreset('random'));
  presetResetBtn?.addEventListener('click', () => applyPreset('reset'));

  // --------------------------------------------------------------------------
  // 6. Scenario Builder & Batch Suite Handlers
  // --------------------------------------------------------------------------
  const saveScenarioBtn = document.getElementById('siSaveCurrentScenarioBtn');
  const saveScenarioInnerBtn = document.getElementById('siSaveScenarioInnerBtn');

  function triggerSaveScenario() {
    const tab = labState.activeTab;
    let inputs: Record<string, any> = {};
    let score = '18%';
    let label = 'Low Clinical Risk';
    let statusClass = 'status-low';

    if (tab === 'disease-tab' && ageSlider && bmiSlider && bpSlider && glucoseSlider) {
      inputs = {
        Age: `${ageSlider.value}y`,
        BMI: bmiSlider.value,
        BP: `${bpSlider.value}mmHg`,
        Glucose: `${glucoseSlider.value}mg/dL`
      };
      score = document.getElementById('diseaseScore')?.textContent || '18%';
      label = document.getElementById('diseaseBadge')?.textContent || 'Low Risk';
      statusClass = document.getElementById('diseaseBadge')?.className || 'status-low';
    } else if (tab === 'churn-tab' && churnTenure && churnCharges && churnTickets) {
      inputs = {
        Tenure: `${churnTenure.value}mo`,
        Charges: `$${churnCharges.value}`,
        Contract: churnContract?.value || 'monthly',
        Tickets: churnTickets.value
      };
      score = document.getElementById('churnScore')?.textContent || '42%';
      label = document.getElementById('churnBadge')?.textContent || 'Moderate Risk';
      statusClass = document.getElementById('churnBadge')?.className || 'status-moderate';
    }

    const defaultName = `Profile #${labState.savedScenarios.length + 1} (${score})`;
    const name = prompt('Enter a label for this saved scenario:', defaultName);
    if (!name) return;

    labState.saveScenario({
      name,
      systemId: tab,
      inputs,
      resultScore: score,
      resultLabel: label,
      statusClass
    });

    renderScenariosComparison(restoreScenarioInputs);
    labState.showToast(`Scenario "${name}" saved`, 'success');
  }

  saveScenarioBtn?.addEventListener('click', triggerSaveScenario);
  saveScenarioInnerBtn?.addEventListener('click', triggerSaveScenario);

  function restoreScenarioInputs(item: ScenarioItem | PredictionHistoryItem) {
    if (item.systemId === 'disease-tab' && ageSlider && bmiSlider && bpSlider && glucoseSlider) {
      activateTab('disease-tab');
      if (item.inputs.reviveAge || item.inputs.Age || item.inputs.age) {
        ageSlider.value = String(parseFloat(String(item.inputs.reviveAge || item.inputs.Age || item.inputs.age)));
      }
      if (item.inputs.reviveBmi || item.inputs.BMI || item.inputs.bmi) {
        bmiSlider.value = String(parseFloat(String(item.inputs.reviveBmi || item.inputs.BMI || item.inputs.bmi)));
      }
      if (item.inputs.reviveBp || item.inputs.BP || item.inputs.bp) {
        bpSlider.value = String(parseFloat(String(item.inputs.reviveBp || item.inputs.BP || item.inputs.bp)));
      }
      if (item.inputs.reviveGlucose || item.inputs.Glucose || item.inputs.glucose) {
        glucoseSlider.value = String(parseFloat(String(item.inputs.reviveGlucose || item.inputs.Glucose || item.inputs.glucose)));
      }
      updateRevive();
    } else if (item.systemId === 'churn-tab' && churnTenure && churnCharges && churnTickets) {
      activateTab('churn-tab');
      if (item.inputs.churnTenure || item.inputs.Tenure) {
        churnTenure.value = String(parseFloat(String(item.inputs.churnTenure || item.inputs.Tenure)));
      }
      if (item.inputs.churnCharges || item.inputs.Charges) {
        churnCharges.value = String(parseFloat(String(item.inputs.churnCharges || item.inputs.Charges).replace('$', '')));
      }
      if (churnContract && (item.inputs.churnContract || item.inputs.Contract)) {
        churnContract.value = String(item.inputs.churnContract || item.inputs.Contract);
      }
      if (item.inputs.churnTickets || item.inputs.Tickets) {
        churnTickets.value = String(parseFloat(String(item.inputs.churnTickets || item.inputs.Tickets)));
      }
      updateChurnModel();
    }
  }

  // Batch Test Suite Runner
  const runBatchBtn = document.getElementById('siRunBatchSuiteBtn');
  runBatchBtn?.addEventListener('click', () => {
    const tab = labState.activeTab;
    if (tab === 'churn-tab') {
      const res = runBatchAnalysisSuite('churn-tab', inputs => {
        const tenure = Number(inputs.churnTenure);
        const charges = Number(inputs.churnCharges);
        const contract = String(inputs.churnContract);
        const tickets = Number(inputs.churnTickets);

        const penalty = contract === 'monthly' ? 35 : contract === 'one-year' ? 10 : 2;
        const tenureF = Math.max(0, 45 - tenure * 0.7);
        const chargeF = (charges / 120) * 18;
        const ticketF = tickets * 8.5;
        let score = Math.round(penalty + tenureF + chargeF + ticketF);
        score = Math.min(96, Math.max(4, score));

        const label = score < 30 ? 'Low Churn Risk' : score < 65 ? 'Moderate Churn Risk' : 'High Churn Risk';
        const statusClass = score < 30 ? 'status-low' : score < 65 ? 'status-moderate' : 'status-high';
        return { score: `${score}%`, label, statusClass };
      });
      renderBatchResultsTable('siBatchResultsWrap', res);
    } else {
      const res = runBatchAnalysisSuite('disease-tab', inputs => {
        const age = Number(inputs.reviveAge);
        const bmi = Number(inputs.reviveBmi);
        const bp = Number(inputs.reviveBp);
        const glucose = Number(inputs.reviveGlucose);

        let risk = Math.round(
          (age * 0.22) +
          (Math.max(0, bmi - 22) * 2.3) +
          (Math.max(0, bp - 120) * 0.55) +
          (Math.max(0, glucose - 95) * 0.45)
        );
        risk = Math.min(98, Math.max(6, risk));

        const label = risk < 35 ? 'Low Clinical Risk' : risk < 70 ? 'Moderate Clinical Risk' : 'High Clinical Risk';
        const statusClass = risk < 35 ? 'status-low' : risk < 70 ? 'status-moderate' : 'status-high';
        return { score: `${risk}%`, label, statusClass };
      });
      renderBatchResultsTable('siBatchResultsWrap', res);
    }
    labState.showToast('Completed batch evaluation run', 'success');
  });

  // --------------------------------------------------------------------------
  // 7. Developer Mode Header Switch
  // --------------------------------------------------------------------------
  const headerDevToggle = document.getElementById('siHeaderDevToggle');
  const devBtnLabel = document.getElementById('siDevBtnLabel');

  function updateDevModeUI() {
    const isDev = labState.isDevMode;
    if (devBtnLabel) {
      devBtnLabel.textContent = `Dev Mode: ${isDev ? 'ON' : 'OFF'}`;
    }
    if (headerDevToggle) {
      if (isDev) {
        headerDevToggle.classList.add('gh-btn-primary');
      } else {
        headerDevToggle.classList.remove('gh-btn-primary');
      }
    }
  }

  headerDevToggle?.addEventListener('click', () => {
    const next = labState.toggleDevMode();
    updateDevModeUI();
    if (next) {
      // Switch subnav to dev mode tab
      document.getElementById('subtab-btn-devmode')?.click();
      labState.showToast('Developer Mode Enabled: Raw tensors & schemas active', 'info');
    } else {
      labState.showToast('Developer Mode Disabled', 'info');
    }
  });
  updateDevModeUI();

  // --------------------------------------------------------------------------
  // 8. Command Palette, History, Export Center & Telemetry Init
  // --------------------------------------------------------------------------
  initCommandPalette(
    tabId => activateTab(tabId),
    () => triggerCurrentTabUpdate(),
    () => applyPreset('reset'),
    () => applyPreset('random'),
    () => toggleTheme()
  );

  initHistoryDrawer(item => restoreScenarioInputs(item));
  initSystemHealthAndActivity();

  initExportModal(() => getExportPayload());

  function getExportPayload(): ExportPayload {
    const tab = labState.activeTab;
    const card = SYSTEM_MODEL_CARDS[tab] || SYSTEM_MODEL_CARDS['disease-tab'];

    let inputs: Record<string, any> = {};
    let score = '18%';
    let label = 'Low Clinical Risk';

    if (tab === 'disease-tab' && ageSlider && bmiSlider && bpSlider && glucoseSlider) {
      inputs = {
        age: parseFloat(ageSlider.value),
        bmi: parseFloat(bmiSlider.value),
        bp: parseFloat(bpSlider.value),
        glucose: parseFloat(glucoseSlider.value)
      };
      score = document.getElementById('diseaseScore')?.textContent || '18%';
      label = document.getElementById('diseaseBadge')?.textContent || 'Low Risk';
    } else if (tab === 'churn-tab' && churnTenure && churnCharges && churnTickets) {
      inputs = {
        tenure: churnTenure.value,
        charges: churnCharges.value,
        contract: churnContract?.value,
        tickets: churnTickets.value
      };
      score = document.getElementById('churnScore')?.textContent || '42%';
      label = document.getElementById('churnBadge')?.textContent || 'Moderate Risk';
    } else if (tab === 'spam-tab' && spamInput) {
      inputs = { text: spamInput.value };
      score = document.getElementById('spamProbVal')?.textContent || '4%';
      label = document.getElementById('spamStatusBadge')?.textContent || 'HAM';
    }

    return {
      systemId: tab,
      systemTitle: card.title,
      timestamp: new Date().toISOString(),
      inputs,
      prediction: {
        score,
        label,
        confidence: '91.2%'
      },
      metrics: card.keyMetrics,
      disclaimer: card.ethicalNotice
    };
  }

  function triggerCurrentTabUpdate() {
    const tab = labState.activeTab;
    if (tab === 'disease-tab') updateRevive();
    else if (tab === 'spam-tab') runSpamAnalysis();
    else if (tab === 'crop-tab') updateCropAdvisor();
    else if (tab === 'neural-tab') renderDecisionBoundary();
    else if (tab === 'sentiment-tab') runSentimentAnalysis();
    else if (tab === 'vector-tab') runVectorSearch();
    else if (tab === 'churn-tab') updateChurnModel();
    else if (tab === 'sql-tab') executeSqlSimulation();
  }

  // --------------------------------------------------------------------------
  // 9. Global Static Tables Rendering (Comparison, API, Sparkline)
  // --------------------------------------------------------------------------
  renderModelComparisonTable('siModelComparisonTableWrap');
  renderApiExplorer('siApiExplorerWrap');
  renderTimelineSparkline();
  renderSystemHealthBar();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLab);
} else {
  initLab();
}
