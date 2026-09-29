import '../styles/main.css';
import './lab.css';

function initLab() {
  // 1. Theme sync with main portfolio
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

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      const next = active === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('shami_theme', next);
      updateThemeIcon(next);
    });
  }

  // 2. Tab Navigation
  const tabBtns = document.querySelectorAll('.lab-tab-btn');
  const tabPanels = document.querySelectorAll('.lab-tab-panel');

  function activateTab(tabId: string) {
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === tabId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    if (tabId === 'neural-tab') {
      setTimeout(renderDecisionBoundary, 50);
    }
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
  }

  // ==========================================================================
  // MODEL 1: Revive Clinical Disease Predictor (XGBoost + SHAP)
  // ==========================================================================
  const ageSlider = document.getElementById('reviveAge') as HTMLInputElement | null;
  const bmiSlider = document.getElementById('reviveBmi') as HTMLInputElement | null;
  const bpSlider = document.getElementById('reviveBp') as HTMLInputElement | null;
  const glucoseSlider = document.getElementById('reviveGlucose') as HTMLInputElement | null;

  function updateRevive() {
    if (!ageSlider || !bmiSlider || !bpSlider || !glucoseSlider) return;
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

    // XGBoost synthetic clinical risk attribution
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

    // Status interpretation
    if (risk < 35) {
      if (badgeEl) {
        badgeEl.textContent = 'Low Clinical Risk';
        badgeEl.className = 'gauge-status-badge status-low';
      }
      if (recEl) recEl.textContent = 'Biomarkers are within optimal clinical thresholds. Routine preventive follow-up recommended.';
    } else if (risk < 70) {
      if (badgeEl) {
        badgeEl.textContent = 'Moderate Clinical Risk';
        badgeEl.className = 'gauge-status-badge status-moderate';
      }
      if (recEl) recEl.textContent = 'Elevated metrics detected. Recommend dietary modifications and glucose/blood pressure monitoring.';
    } else {
      if (badgeEl) {
        badgeEl.textContent = 'High Clinical Risk';
        badgeEl.className = 'gauge-status-badge status-high';
      }
      if (recEl) recEl.textContent = 'Critical threshold exceeded. Recommend comprehensive cardiovascular and metabolic screening.';
    }

    // SHAP Attribution
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
  }

  [ageSlider, bmiSlider, bpSlider, glucoseSlider].forEach(s => {
    s?.addEventListener('input', updateRevive);
  });
  updateRevive();

  // ==========================================================================
  // MODEL 2: HamOrSpam NLP Classifier (TF-IDF + SMOTE)
  // ==========================================================================
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

    if (badge) {
      if (prob >= 50) {
        badge.textContent = 'SPAM / PHISHING DETECTED';
        badge.className = 'gauge-status-badge status-high';
      } else {
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
  }

  if (runSpamBtn) runSpamBtn.addEventListener('click', runSpamAnalysis);
  runSpamAnalysis();

  // ==========================================================================
  // MODEL 3: FarmAIQ Crop Advisor (NPK & Rainfall)
  // ==========================================================================
  const nSlider = document.getElementById('cropN') as HTMLInputElement | null;
  const pSlider = document.getElementById('cropP') as HTMLInputElement | null;
  const kSlider = document.getElementById('cropK') as HTMLInputElement | null;
  const rainSlider = document.getElementById('cropRain') as HTMLInputElement | null;

  function updateCropAdvisor() {
    if (!nSlider || !pSlider || !kSlider || !rainSlider) return;
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

    if (cropNameEl) cropNameEl.textContent = crop;
    if (cropReasonEl) cropReasonEl.textContent = reason;
    if (cropIconEl) cropIconEl.innerHTML = `<i class="fas ${icon}" style="font-size: 2.5rem; color: var(--accent-color);"></i>`;
    if (cropMatchEl) cropMatchEl.textContent = `${Math.min(99, 86 + (n % 12))}%`;
  }

  [nSlider, pSlider, kSlider, rainSlider].forEach(s => {
    s?.addEventListener('input', updateCropAdvisor);
  });
  updateCropAdvisor();

  // ==========================================================================
  // MODEL 4: Neural Lab (2D Canvas Decision Boundary)
  // ==========================================================================
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
          ? `rgba(37, 99, 235, ${Math.min(0.4, (prob - 0.5) * 0.8)})`
          : `rgba(239, 68, 68, ${Math.min(0.4, (0.5 - prob) * 0.8)})`;
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

      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.arc(px1, py1, 3.5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
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

  // ==========================================================================
  // MODEL 5: Emotion & Sentiment NLP Analyzer
  // ==========================================================================
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

  // ==========================================================================
  // MODEL 6: Vector RAG & Semantic Embedding Search
  // ==========================================================================
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

  // ==========================================================================
  // [NEW FEATURE 1]: ChurnShield AI Customer Churn Predictor
  // ==========================================================================
  const churnTenure = document.getElementById('churnTenure') as HTMLInputElement | null;
  const churnCharges = document.getElementById('churnCharges') as HTMLInputElement | null;
  const churnContract = document.getElementById('churnContract') as HTMLSelectElement | null;
  const churnTickets = document.getElementById('churnTickets') as HTMLInputElement | null;

  function updateChurnModel() {
    if (!churnTenure || !churnCharges || !churnContract || !churnTickets) return;
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

    // Churn Risk Scoring formula
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

    if (score < 30) {
      if (churnBadgeEl) {
        churnBadgeEl.textContent = 'Low Churn Risk';
        churnBadgeEl.className = 'gauge-status-badge status-low';
      }
      if (churnRecEl) churnRecEl.textContent = 'Account demonstrates healthy tenure stability. Candidate for product tier upsell.';
    } else if (score < 65) {
      if (churnBadgeEl) {
        churnBadgeEl.textContent = 'Moderate Churn Risk';
        churnBadgeEl.className = 'gauge-status-badge status-moderate';
      }
      if (churnRecEl) churnRecEl.textContent = 'Tenure or charge sensitivity noted. Offer annual commitment incentive with loyalty discount.';
    } else {
      if (churnBadgeEl) {
        churnBadgeEl.textContent = 'High Churn Risk';
        churnBadgeEl.className = 'gauge-status-badge status-high';
      }
      if (churnRecEl) churnRecEl.textContent = 'Multiple unresolved support friction points. Schedule immediate customer success retention outreach.';
    }
  }

  [churnTenure, churnCharges, churnContract, churnTickets].forEach(el => {
    el?.addEventListener('input', updateChurnModel);
  });
  updateChurnModel();

  // ==========================================================================
  // [NEW FEATURE 2]: SQL Data Analytics Query Sandbox
  // ==========================================================================
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

    sqlResultsWrap.innerHTML = `
      <div style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
        <span>${querySummary}</span>
        <span style="color: var(--accent-color); font-weight: 600;">Execution Time: 1.4ms</span>
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLab);
} else {
  initLab();
}

